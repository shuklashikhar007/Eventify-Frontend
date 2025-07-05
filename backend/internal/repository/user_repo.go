package repository

import (
	"time"

	"gorm.io/gorm"

	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
	"github.com/shuklashikhar007/Eventify/backend/internal/helpers"
	"github.com/shuklashikhar007/Eventify/backend/internal/models"
)

type UserRepository struct {
	db *gorm.DB
}

func NewUserRepository(db *gorm.DB) *UserRepository {
	return &UserRepository{db: db}
}

// All returns all users from the database.
func (r *UserRepository) All() ([]models.User, error) {
	var list []models.User
	return list, r.db.Find(&list).Error
}

// GetById returns a user by its ID, along with their login methods.
func (r *UserRepository) GetById(uid string) (models.User, error) {
	var user models.User
	return user, r.db.First(&user, "id = ?", uid).Error
}

// CreateNewUser creates a new user with the provided login method.
func (r *UserRepository) CreateNewUserOrToken(user *models.User) (string, error) {
	var token string

	err := r.db.Transaction(func(tx *gorm.DB) error {
		// search the user, if found then generate token, else create a new user
		if err := tx.Where("email = ? OR provider_id = ?", user.Email, user.ProviderID).First(&user).Error; err != nil {
			// user does not exist, so create a new user
			user.ID = uuid.New().String()
			
			if err := tx.Create(&user).Error; err != nil {
				return err
			}
		}

		claims := jwt.MapClaims{
			"user": user,
			"iat":  time.Now().Unix(),
			"exp":  time.Now().Add(7 * 24 * time.Hour).Unix(), // after 1 week this token will expire
		}

		tokenString, err := helpers.CreateToken(&claims)
		if err != nil {
			return err
		}

		token = tokenString
		return nil
	})

	return token, err
}

// DeleteUser removes a user from the database by their ID.
func (r *UserRepository) DeleteUser(userID string) (string, error) {
	err := r.db.Transaction(func(tx *gorm.DB) error {
		if err := tx.Delete(&models.User{}, "id = ?", userID).Error; err != nil {
			return err
		}
		
		return nil
	})

	return userID, err
}