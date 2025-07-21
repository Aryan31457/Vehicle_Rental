package handlers

import (
	"net/http"

	"vehicle-rental/config"
	"vehicle-rental/models"

	"github.com/gin-gonic/gin"
)

// GetAllMemberships returns all memberships
func GetAllMemberships(c *gin.Context) {
	var memberships []models.Membership
	result := config.DB.Find(&memberships)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error fetching memberships"})
		return
	}

	c.JSON(http.StatusOK, memberships)
}

// GetMembership returns a specific membership
func GetMembership(c *gin.Context) {
	id := c.Param("id")
	var membership models.Membership

	result := config.DB.First(&membership, id)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Membership not found"})
		return
	}

	c.JSON(http.StatusOK, membership)
}

// CreateMembership creates a new membership
func CreateMembership(c *gin.Context) {
	var membership models.Membership
	if err := c.ShouldBindJSON(&membership); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	result := config.DB.Create(&membership)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error creating membership"})
		return
	}

	c.JSON(http.StatusCreated, membership)
}

// UpdateMembership updates a membership
func UpdateMembership(c *gin.Context) {
	id := c.Param("id")
	var membership models.Membership

	if err := config.DB.First(&membership, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Membership not found"})
		return
	}

	if err := c.ShouldBindJSON(&membership); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	config.DB.Save(&membership)
	c.JSON(http.StatusOK, membership)
}
