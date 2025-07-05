package db

import (
	"log"

	"github.com/shuklashikhar007/Eventify/backend/internal/models"
	"gorm.io/driver/postgres"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var DB *gorm.DB

// new connection to local sqlite database, with connection presist
func NewDbConnection(path string) {
	var dialector gorm.Dialector
	if path == "" {
		log.Fatal("database path cannot be empty")
	}
	
	if path[len(path)-3:] == ".db" {
		log.Println("using sqlite database")
		dialector = sqlite.Open(path)
	} else {
		log.Println("using postgres database")
		dialector = postgres.Open(path)
	}

	database, err := gorm.Open(dialector, &gorm.Config{})
	if err != nil {
		log.Fatalf("cannot open db: %v", err)
	}

	if err := database.AutoMigrate(models.User{}); err != nil {
		log.Fatalf("auto-migrate failed: %v", err)
	}

	DB = database
}
