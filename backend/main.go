package main

import (
	"log"
	"os"

	"vehicle-rental/config"
	"vehicle-rental/handlers"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	// Load environment variables
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}

	// Initialize database
	config.InitDB()

	// Set up Gin
	r := gin.Default()

	// CORS middleware
	r.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	})

	// API Routes
	api := r.Group("/api")
	{
		// Auth routes
		auth := api.Group("/auth")
		{
			auth.POST("/register", handlers.Register)
			auth.POST("/login", handlers.Login)
		}

		// Vehicle routes
		vehicles := api.Group("/vehicles")
		{
			vehicles.GET("/", handlers.GetAllVehicles)
			vehicles.GET("/:id", handlers.GetVehicle)
			vehicles.POST("/", handlers.CreateVehicle)
			vehicles.PUT("/:id", handlers.UpdateVehicle)
			vehicles.DELETE("/:id", handlers.DeleteVehicle)
			vehicles.GET("/:id/availability", handlers.GetVehicleAvailability)
			vehicles.GET("/:id/location", handlers.GetVehicleLocation)
			vehicles.PUT("/:id/location", handlers.UpdateVehicleLocation)
			vehicles.GET("/location", handlers.GetVehiclesByLocation)
		}

		// Branch routes
		branches := api.Group("/branches")
		{
			branches.GET("/", handlers.GetAllBranches)
			branches.GET("/:id", handlers.GetBranch)
			branches.POST("/", handlers.CreateBranch)
			branches.PUT("/:id", handlers.UpdateBranch)
			branches.DELETE("/:id", handlers.DeleteBranch)
		}

		// Booking routes
		bookings := api.Group("/bookings")
		{
			bookings.GET("/", handlers.GetAllBookings)
			bookings.GET("/:id", handlers.GetBooking)
			bookings.POST("/", handlers.CreateBooking)
			bookings.PUT("/:id", handlers.UpdateBooking)
			bookings.DELETE("/:id", handlers.DeleteBooking)
		}

		// Membership routes
		memberships := api.Group("/memberships")
		{
			memberships.GET("/", handlers.GetAllMemberships)
			memberships.GET("/:id", handlers.GetMembership)
			memberships.POST("/", handlers.CreateMembership)
			memberships.PUT("/:id", handlers.UpdateMembership)
		}
	}

	// WebSocket endpoint for real-time updates
	r.GET("/ws", handlers.HandleWebSocket)

	// Get port from environment variable or use default
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	// Start server
	if err := r.Run(":" + port); err != nil {
		log.Fatal("Failed to start server: ", err)
	}
}
