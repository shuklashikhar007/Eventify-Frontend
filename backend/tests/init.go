package tests

import (
	"log"

	"github.com/gin-gonic/gin"
	"github.com/shuklashikhar007/Eventify/backend/internal/config"
	"github.com/shuklashikhar007/Eventify/backend/internal/db"
	"github.com/shuklashikhar007/Eventify/backend/internal/handlers"
	"github.com/shuklashikhar007/Eventify/backend/internal/repository"
)

var router *gin.Engine

func InitializeTestEnvironment() {
	config.LoadEnvVariables(".env.test")

	db.NewDbConnection(config.Env.DatabaseUrl)

	repository.InitializeRepositories()
	
	router = gin.Default()
	router.Use(config.CorsConfig())

	handlers.SetupHomeRoutes(router)

	if err := router.Run(":3000"); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}