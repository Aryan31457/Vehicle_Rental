package handlers

import (
	"net/http"

	"vehicle-rental/config"
	"vehicle-rental/models"

	"github.com/gin-gonic/gin"
)

// GetAllVehicles returns all vehicles
func GetAllVehicles(c *gin.Context) {
	var vehicles []models.Vehicle
	result := config.DB.Preload("Branch").Find(&vehicles)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error fetching vehicles"})
		return
	}

	c.JSON(http.StatusOK, vehicles)
}

// GetVehicle returns a specific vehicle
func GetVehicle(c *gin.Context) {
	id := c.Param("id")
	var vehicle models.Vehicle

	result := config.DB.Preload("Branch").First(&vehicle, id)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Vehicle not found"})
		return
	}

	c.JSON(http.StatusOK, vehicle)
}

// CreateVehicle creates a new vehicle
func CreateVehicle(c *gin.Context) {
	var vehicle models.Vehicle
	if err := c.ShouldBindJSON(&vehicle); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	result := config.DB.Create(&vehicle)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error creating vehicle"})
		return
	}

	c.JSON(http.StatusCreated, vehicle)
}

// UpdateVehicle updates a vehicle
func UpdateVehicle(c *gin.Context) {
	id := c.Param("id")
	var vehicle models.Vehicle

	if err := config.DB.First(&vehicle, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Vehicle not found"})
		return
	}

	if err := c.ShouldBindJSON(&vehicle); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	config.DB.Save(&vehicle)
	c.JSON(http.StatusOK, vehicle)
}

// DeleteVehicle deletes a vehicle
func DeleteVehicle(c *gin.Context) {
	id := c.Param("id")
	var vehicle models.Vehicle

	if err := config.DB.First(&vehicle, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Vehicle not found"})
		return
	}

	config.DB.Delete(&vehicle)
	c.JSON(http.StatusOK, gin.H{"message": "Vehicle deleted successfully"})
}
