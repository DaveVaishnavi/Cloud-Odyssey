package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct {
	ID            primitive.ObjectID `bson:"_id"`
	First_name    *string            `json:"first_name" validate:"required,min=2,max=100"`
	Last_name     *string            `json:"last_name" validate:"required,min=2,max=100"`
	Password      *string            `json:"Password" validate:"required"`
	Email         *string            `json:"email" validate:"email,required"`
	Phone         *string            `json:"phone" validate:"required"`
	Token         *string            `json:"token"`
	Refresh_Token *string            `json:"refresh_token"`
	Created_at    time.Time          `json:"created_at"`
	Updated_at    time.Time          `json:"updated_at"`
	User_id       string             `json:"user_id"`
	Role          string             `json:"user_role"`
}

type Patient struct {
	User         
	Medical       []string           `json:"medical_history"`
	DoctorID      primitive.ObjectID `json:"doctor_id"`
	AdmissionDate *time.Time         `json:"admission_date"`
	DischargeDate *time.Time         `json:"discharge_date"`
}
type Doctor struct {
	User `bson:",inline"` // Embed the User struct
	// Doctor-specific fields
	Specialization string   `json:"specialization"`
	Availability   []string `json:"availability"` // E.g., ["Monday", "Wednesday"]
}

