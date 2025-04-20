package controllers

import (
	"context"
	"fmt"
	"cloud-project/database"
	helper "cloud-project/helpers"
	"cloud-project/models"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"github.com/go-playground/validator/v10"
	"log"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"golang.org/x/crypto/bcrypt"
)

var userCollection *mongo.Collection = database.OpenCollection(database.Client, "user")
var validate = validator.New()

func GetUsers() gin.HandlerFunc {
	return func(c *gin.Context) {
		var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)
		recordPerPage, err := strconv.Atoi(c.Query("recordPerPage"))
		if err != nil || recordPerPage < 1 {
			recordPerPage = 10
		}

		page, err1 := strconv.Atoi(c.Query("page"))
		if err1 != nil || page < 1 {
			page = 1
		}
		startIndex := (page - 1) * recordPerPage
		startIndex, err = strconv.Atoi(c.Query("startIndex"))

		matchStage := bson.D{{Key: "$match", Value: bson.D{{}}}}
		projectStage := bson.D{
			bson.E{Key: "$project", Value: bson.D{
				bson.E{Key: "_id", Value: 0},
				bson.E{Key: "total_count", Value: 1},
				bson.E{Key: "user_items", Value: bson.D{
					bson.E{Key: "$slice", Value: bson.A{"$data", startIndex, recordPerPage}},
				}},
			}},
		}

		result, err := userCollection.Aggregate(ctx, mongo.Pipeline{
			matchStage, projectStage})
		defer cancel()
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "error occurred while listing user items"})
			return
		}
		var allUsers []bson.M
		if err = result.All(ctx, &allUsers); err != nil {
			log.Fatal(err)
		}
		if len(allUsers) > 0 {
			c.JSON(http.StatusOK, allUsers[0])
		} else {
			c.JSON(http.StatusOK, gin.H{"data": []interface{}{}})
		}
	}
}

func GetUser() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 100*time.Second)
		defer cancel()

		userId := c.Param("_id")

		var user models.User
		objID, err := primitive.ObjectIDFromHex(userId)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID format"})
			return
		}

        err = userCollection.FindOne(ctx, bson.M{"_id": objID}).Decode(&user)
		if err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "User not found", "details": err.Error()})
			return
		}

		// Remove sensitive information
		user.Password = nil
		user.Refresh_Token = nil

		c.JSON(http.StatusOK, user)
	}
}

func SignUp() gin.HandlerFunc {
	return func(c *gin.Context) {
		var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)
		defer cancel()

		var user models.User

		// Convert JSON to struct
		if err := c.BindJSON(&user); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		// Validate user struct
		if validationErr := validate.Struct(user); validationErr != nil {
			c.JSON(http.StatusBadRequest, gin.H{"errors": validationErr.Error()})
			return
		}

		// Check if email already exists
		count, err := userCollection.CountDocuments(ctx, bson.M{"email": user.Email})
		if err != nil {
			log.Panic(err)
			c.JSON(http.StatusInternalServerError, gin.H{"errors": gin.H{"email": []string{"error occurred while checking for the email"}}})
			return
		}
		if count > 0 {
			c.JSON(http.StatusBadRequest, gin.H{"errors": gin.H{"email": []string{"email already exists"}}})
			return
		}

		// Check if phone number already exists
		if user.Phone != nil {
			count, err = userCollection.CountDocuments(ctx, bson.M{"phone": user.Phone})
			if err != nil {
				log.Panic(err)
				c.JSON(http.StatusInternalServerError, gin.H{"errors": gin.H{"phone": []string{"error occurred while checking for the phone number"}}})
				return
			}
			if count > 0 {
				c.JSON(http.StatusBadRequest, gin.H{"errors": gin.H{"phone": []string{"phone number already in use"}}})
				return
			}
		}

		// Set default role if not provided
		if user.Role == "" {
			user.Role = "Guest"
		}

		// Validate role
		if user.Role != "Master" && user.Role != "Worker" && user.Role != "Guest" {
			c.JSON(http.StatusBadRequest, gin.H{"errors": gin.H{"role": []string{"role must be Master, Worker, or Guest"}}})
			return
		}

		// Hash password
		password := HashPassword(*user.Password)
		user.Password = &password

		// Add timestamps and user ID
		user.ID = primitive.NewObjectID()
        user.User_id = user.ID.Hex()
		user.Created_at, _ = time.Parse(time.RFC3339, time.Now().Format(time.RFC3339))
		user.Updated_at, _ = time.Parse(time.RFC3339, time.Now().Format(time.RFC3339))

		// Generate tokens
		token, refreshToken := helper.GenerateAllTokens(*user.Email, *user.First_name, *user.Last_name, user.User_id)
		user.Token = &token
		user.Refresh_Token = &refreshToken

		// Insert user
		resultInsertionNumber, insertErr := userCollection.InsertOne(ctx, user)
		fmt.Println("Inserted user with ID:", resultInsertionNumber.InsertedID)
		if insertErr != nil {
			msg := "Registration failed"
			if mongoErr, ok := insertErr.(mongo.WriteException); ok {
				if len(mongoErr.WriteErrors) > 0 {
					msg = mongoErr.WriteErrors[0].Message
				}
			}
			c.JSON(http.StatusInternalServerError, gin.H{
				"errors": gin.H{"non_field_errors": []string{msg}},
			})
			return
		}

		// Success
		c.JSON(http.StatusOK, gin.H{
			"token": token,
			"user": gin.H{
				"id": user.ID.Hex(),
				"first_name": user.First_name,
				"last_name": user.Last_name,
				"email": user.Email,
				"role": user.Role,
			},
		})
	}
}
func Login() gin.HandlerFunc {
	return func(c *gin.Context) {
		var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)
		defer cancel()

		var loginRequest models.LoginRequest
		var foundUser models.User

fmt.Println("Debug info") // This will stop the compiler error

		// Convert JSON to login request struct
		if err := c.BindJSON(&loginRequest); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"errors": gin.H{"non_field_errors": []string{err.Error()}}})
			return
		}

		// Find user by email
		err := userCollection.FindOne(ctx, bson.M{"email": loginRequest.Email}).Decode(&foundUser)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"errors": gin.H{"non_field_errors": []string{"Invalid email or password"}}})
			return
		}

		// Verify password
		passwordIsValid, msg := verifyPassword(*loginRequest.Password, *foundUser.Password)
		if !passwordIsValid {
			c.JSON(http.StatusUnauthorized, gin.H{"errors": gin.H{"non_field_errors": []string{msg}}})
			return
		}

		// Generate new tokens
		token, refreshToken := helper.GenerateAllTokens(*foundUser.Email, *foundUser.First_name, *foundUser.Last_name, foundUser.User_id)

		// Update tokens in database
		helper.UpdateAllTokens(token, refreshToken, foundUser.User_id)

		// Create response without sensitive data
		response := gin.H{
			"id": foundUser.ID.Hex(),
			"email": *foundUser.Email,
			"first_name": *foundUser.First_name,
			"last_name": *foundUser.Last_name,
			"role": foundUser.Role,
			"user_id": foundUser.User_id,
			"token": token,
		}

		c.JSON(http.StatusOK, response)
	}
}

func HashPassword(password string) string {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	if err != nil {
		log.Panic(err)
	}
	return string(bytes)
}

func verifyPassword(userPassword string, providePassword string) (bool, string) {
	err := bcrypt.CompareHashAndPassword([]byte(providePassword), []byte(userPassword))
	check := true
	msg := ""
	if err != nil {
		msg = "Invalid email or password"
		check = false
	}
	return check, msg
}

func Logout() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 100*time.Second)
		defer cancel()

		clientToken := c.Request.Header.Get("token")
		if clientToken == "" {
			c.JSON(http.StatusBadRequest, gin.H{"error": "No token provided"})
			return
		}

		// Find user with this token and clear tokens
		filter := bson.M{"token": clientToken}
		update := bson.M{
			"$set": bson.M{
				"token":         "",
				"refresh_token": "",
				"updated_at":    time.Now(),
			},
		}

		result, err := userCollection.UpdateOne(ctx, filter, update)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Logout failed", "details": err.Error()})
			return
		}

		if result.MatchedCount == 0 {
			c.JSON(http.StatusNotFound, gin.H{"error": "No matching user found for the provided token"})
			return
		}

		c.JSON(http.StatusOK, gin.H{"message": "Logout successful"})
	}
}

func GetCurrentUser() gin.HandlerFunc {
	return func(c *gin.Context) {
		userClaims, exists := c.Get("userClaims")
		if !exists {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "User not authenticated"})
			return
		}

		claims := userClaims.(*helper.SignedDetails)

		ctx, cancel := context.WithTimeout(context.Background(), 100*time.Second)
		defer cancel()

		var user models.User
		err := userCollection.FindOne(ctx, bson.M{"user_id": claims.Uid}).Decode(&user)
		if err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
			return
		}

		// Remove sensitive information
		user.Password = nil
		user.Refresh_Token = nil

		c.JSON(http.StatusOK, user)
	}
}