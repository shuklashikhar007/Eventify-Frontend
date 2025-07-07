package db

import (
	"log"
	"strings"

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
	
	if strings.HasSuffix(path, ".db") {
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

	sqlDB, err := database.DB()
	if err != nil {
		log.Fatalf("cannot get sql.DB from GORM: %v", err)
	}

	sqlDB.SetMaxOpenConns(25)                  // max open connections
	sqlDB.SetMaxIdleConns(5)                   // max idle connections

	if err := database.AutoMigrate(&models.User{}, &models.Event{}, &models.EventUpdater{}); err != nil {
		log.Fatalf("auto-migrate failed: %v", err)
	}

	DB = database
}
