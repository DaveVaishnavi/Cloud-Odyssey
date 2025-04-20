package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct {
	ID            primitive.ObjectID `bson:"_id"`
	First_name    *string            `json:"first_name" validate:"required,min=2,max=100"`
	Last_name     *string            `json:"last_name" validate:"required,min=2,max=100"`
	Password      *string            `json:"Password" validate:"required,min=6"`
	Email         *string            `json:"email" validate:"email,required"`
	Phone         *string            `json:"phone" validate:"required"`
	Token         *string            `json:"token"`
	Refresh_Token *string            `json:"refresh_token"`
	Created_at    time.Time          `json:"created_at"`
	Updated_at    time.Time          `json:"updated_at"`
	User_id       string             `json:"user_id"`
	Role          string             `json:"role" validate:"required,oneof=Master Worker Guest"`
}

// LoginRequest defines the structure for login requests
type LoginRequest struct {
	Email    *string `json:"email" validate:"email,required"`
	Password *string `json:"password" validate:"required"`
}

// LoginResponse defines the structure for login responses
type LoginResponse struct {
	ID        string  `json:"id"`
	Email     string  `json:"email"`
	FirstName string  `json:"first_name"`
	LastName  string  `json:"last_name"`
	Token     string  `json:"token"`
	Role      string  `json:"role"`
	UserID    string  `json:"user_id"`
}