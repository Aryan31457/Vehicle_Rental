package handlers

import (
	"net/http"
	"time"

	"vehicle-rental/config"
	"vehicle-rental/models"

	"github.com/gin-gonic/gin"
)

// GetAllBookings returns all bookings
func GetAllBookings(c *gin.Context) {
	var bookings []models.Booking
	result := config.DB.Preload("User").Preload("Vehicle").Find(&bookings)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error fetching bookings"})
		return
	}

	c.JSON(http.StatusOK, bookings)
}

// GetBooking returns a specific booking
func GetBooking(c *gin.Context) {
	id := c.Param("id")
	var booking models.Booking

	result := config.DB.Preload("User").Preload("Vehicle").First(&booking, id)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Booking not found"})
		return
	}

	c.JSON(http.StatusOK, booking)
}

// CreateBooking creates a new booking
func CreateBooking(c *gin.Context) {
	var booking models.Booking
	if err := c.ShouldBindJSON(&booking); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Check if vehicle is available
	var existingBookings []models.Booking
	result := config.DB.Where("vehicle_id = ? AND status != 'cancelled' AND ((start_date BETWEEN ? AND ?) OR (end_date BETWEEN ? AND ?))",
		booking.VehicleID, booking.StartDate, booking.EndDate, booking.StartDate, booking.EndDate).Find(&existingBookings)

	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error checking vehicle availability"})
		return
	}

	if len(existingBookings) > 0 {
		c.JSON(http.StatusConflict, gin.H{"error": "Vehicle is not available for the selected dates"})
		return
	}

	// Calculate total amount
	var vehicle models.Vehicle
	if err := config.DB.First(&vehicle, booking.VehicleID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Vehicle not found"})
		return
	}

	days := booking.EndDate.Sub(booking.StartDate).Hours() / 24
	booking.TotalAmount = vehicle.Rate * float64(days)
	booking.Status = "pending"
	booking.PaymentStatus = "unpaid"

	result = config.DB.Create(&booking)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error creating booking"})
		return
	}

	c.JSON(http.StatusCreated, booking)
}

// UpdateBooking updates a booking
func UpdateBooking(c *gin.Context) {
	id := c.Param("id")
	var booking models.Booking

	if err := config.DB.First(&booking, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Booking not found"})
		return
	}

	if err := c.ShouldBindJSON(&booking); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	config.DB.Save(&booking)
	c.JSON(http.StatusOK, booking)
}

// DeleteBooking cancels a booking
func DeleteBooking(c *gin.Context) {
	id := c.Param("id")
	var booking models.Booking

	if err := config.DB.First(&booking, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Booking not found"})
		return
	}

	booking.Status = "cancelled"
	config.DB.Save(&booking)
	c.JSON(http.StatusOK, gin.H{"message": "Booking cancelled successfully"})
}

// GetVehicleAvailability checks if a vehicle is available for given dates
func GetVehicleAvailability(c *gin.Context) {
	vehicleID := c.Param("id")
	startDate := c.Query("start_date")
	endDate := c.Query("end_date")

	start, err := time.Parse(time.RFC3339, startDate)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid start date format"})
		return
	}

	end, err := time.Parse(time.RFC3339, endDate)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid end date format"})
		return
	}

	var existingBookings []models.Booking
	result := config.DB.Where("vehicle_id = ? AND status != 'cancelled' AND ((start_date BETWEEN ? AND ?) OR (end_date BETWEEN ? AND ?))",
		vehicleID, start, end, start, end).Find(&existingBookings)

	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error checking availability"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"available":            len(existingBookings) == 0,
		"conflicting_bookings": existingBookings,
	})
}
