package config

import (
	"log"
	"vehicle-rental/models"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var DB *gorm.DB

func InitDB() {
	var err error

	// Connect to database
	DB, err = gorm.Open(sqlite.Open("gorm.db"), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database: ", err)
	}

	// Auto migrate models
	err = DB.AutoMigrate(
		&models.User{},
		&models.Vehicle{},
		&models.Branch{},
		&models.Booking{},
		&models.Membership{},
		&models.Notification{},
	)
	if err != nil {
		log.Fatal("Failed to migrate database: ", err)
	}

	log.Println("Database connected and migrated successfully")
}
