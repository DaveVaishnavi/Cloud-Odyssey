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
			c.JSON(http.StatusInternalServerError, gin.H{"error": "error accured while listing user items"})
		}
		var allUsers []bson.M
		if err = result.All(ctx, &allUsers); err != nil {
			log.Fatal(err)
		}
		c.JSON(http.StatusOK, allUsers[0])
		//either pass an error
		//ideally want to return all the user based oon the various query paramets
	}
}
func GetUser() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 100*time.Second)
		defer cancel()

		userId := c.Param("_id")

		var user models.User
		objID, err := primitive.ObjectIDFromHex(userId)
        err = userCollection.FindOne(ctx, bson.M{"_id": objID}).Decode(&user)
		if err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "User not found", "details": err.Error()})
			return
		}

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
			c.JSON(http.StatusBadRequest, gin.H{"error": validationErr.Error()})
			return
		}

		// Check if email already exists
		count, err := userCollection.CountDocuments(ctx, bson.M{"email": user.Email})
		if err != nil {
			log.Panic(err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "error occurred while checking for the email"})
			return
		}

		// Hash password
		password := HashPassword(*user.Password)
		user.Password = &password

		// Check if phone number already exists
		count, err = userCollection.CountDocuments(ctx, bson.M{"phone": user.Phone})
		if err != nil {
			log.Panic(err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "error occurred while checking for the phone number"})
			return
		}
		if count > 0 {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "email or phone number already in use"})
			return
		}

		// Add timestamps and user ID
		user.ID = primitive.NewObjectID()
        user.User_id = user.ID.Hex()
		user.Created_at, _ = time.Parse(time.RFC3339, time.Now().Format(time.RFC3339))
		user.Updated_at, _ = time.Parse(time.RFC3339, time.Now().Format(time.RFC3339))
		user.User_id = user.ID.Hex()

		// Generate tokens
		token, refreshToken := helper.GenerateAllTokens(*user.Email, *user.First_name, *user.Last_name, user.User_id)
		user.Token = &token
		user.Refresh_Token = &refreshToken

		// Insert user
		resultInsertionNumber, insertErr := userCollection.InsertOne(ctx, user)
		if insertErr != nil {
			// MongoDB Command Error
			if commandErr, ok := insertErr.(mongo.CommandError); ok {
				log.Printf("MongoDB Command Error: Code=%d, Message=%s", commandErr.Code, commandErr.Message)
				c.JSON(http.StatusInternalServerError, gin.H{
					"error":   "Database command failed",
					"details": commandErr.Message,
				})
				return
			}

			// MongoDB Write Exception
			if writeErr, ok := insertErr.(mongo.WriteException); ok {
				log.Printf("MongoDB Write Error: %+v", writeErr)
				c.JSON(http.StatusInternalServerError, gin.H{
					"error":   "Database write failed",
					"details": writeErr.WriteErrors,
				})
				return
			}

			// General MongoDB Error
			log.Printf("MongoDB Insert Error: %v", insertErr)
			c.JSON(http.StatusInternalServerError, gin.H{
				"error":   "User item was not created due to a database issue",
				"details": insertErr.Error(),
			})
			return
		}

		// Success
		c.JSON(http.StatusOK, resultInsertionNumber)
	}
}


func Login() gin.HandlerFunc {
	return func(c *gin.Context) {
		var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)
		var user models.User
		var foundUser models.User
		//convert the login data from postman which is in json to holang format
		if err := c.BindJSON(&user); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		//find a user with that email see if that user een exits
		err := userCollection.FindOne(ctx, bson.M{"email": user.Email}).Decode(&foundUser)
		defer cancel()
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "user not found,login seems to be incorrect"})
			return
		}
		//then you will verify the password
		passwordIsValid, msg := verifyPassword(*user.Password, *foundUser.Password)
		defer cancel()
		if passwordIsValid != true {
			c.JSON(http.StatusInternalServerError, gin.H{"error": msg})
			return
		}

		//if all goes well ,then u will generate tokens
		token, refreshToken := helper.GenerateAllTokens(*foundUser.Email, *foundUser.First_name, *foundUser.Last_name, foundUser.User_id)

		//update all the  token- tokens and trefersh tokens
		helper.UpdateAllTokens(token, refreshToken, foundUser.User_id)

		//return status ok
		c.JSON(http.StatusOK, foundUser)

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
		msg = fmt.Sprintf("login or password is incorrect")
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
