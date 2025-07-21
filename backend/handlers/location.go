package handlers

import (
	"net/http"
	"time"

	"vehicle-rental/config"
	"vehicle-rental/models"

	"github.com/gin-gonic/gin"
)

// UpdateVehicleLocation updates a vehicle's location
func UpdateVehicleLocation(c *gin.Context) {
	vehicleID := c.Param("id")
	var vehicle models.Vehicle

	if err := config.DB.First(&vehicle, vehicleID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Vehicle not found"})
		return
	}

	var locationData struct {
		Location string `json:"location" binding:"required"`
	}

	if err := c.ShouldBindJSON(&locationData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	vehicle.Location = locationData.Location
	vehicle.LastUpdated = time.Now()

	if err := config.DB.Save(&vehicle).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error updating vehicle location"})
		return
	}

	c.JSON(http.StatusOK, vehicle)
}

// GetVehicleLocation gets a vehicle's current location
func GetVehicleLocation(c *gin.Context) {
	vehicleID := c.Param("id")
	var vehicle models.Vehicle

	if err := config.DB.First(&vehicle, vehicleID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Vehicle not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"location":     vehicle.Location,
		"last_updated": vehicle.LastUpdated,
	})
}

// GetVehiclesByLocation gets all vehicles at a specific location
func GetVehiclesByLocation(c *gin.Context) {
	location := c.Query("location")
	var vehicles []models.Vehicle

	result := config.DB.Where("location = ?", location).Find(&vehicles)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error fetching vehicles"})
		return
	}

	c.JSON(http.StatusOK, vehicles)
}
