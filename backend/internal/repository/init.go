package repository

import "github.com/shuklashikhar007/Eventify/backend/internal/db"

var UserRepo *UserRepository

// Creating bean of all the repositories
func InitializeRepositories() {
	UserRepo = NewUserRepository(db.DB) // bean of user repository
}