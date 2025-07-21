package handlers

import (
	"net/http"

	"vehicle-rental/config"
	"vehicle-rental/models"

	"github.com/gin-gonic/gin"
)

// GetAllBranches returns all branches
func GetAllBranches(c *gin.Context) {
	var branches []models.Branch
	result := config.DB.Find(&branches)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error fetching branches"})
		return
	}

	c.JSON(http.StatusOK, branches)
}

// GetBranch returns a specific branch
func GetBranch(c *gin.Context) {
	id := c.Param("id")
	var branch models.Branch

	result := config.DB.First(&branch, id)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Branch not found"})
		return
	}

	c.JSON(http.StatusOK, branch)
}

// CreateBranch creates a new branch
func CreateBranch(c *gin.Context) {
	var branch models.Branch
	if err := c.ShouldBindJSON(&branch); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	result := config.DB.Create(&branch)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error creating branch"})
		return
	}

	c.JSON(http.StatusCreated, branch)
}

// UpdateBranch updates a branch
func UpdateBranch(c *gin.Context) {
	id := c.Param("id")
	var branch models.Branch

	if err := config.DB.First(&branch, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Branch not found"})
		return
	}

	if err := c.ShouldBindJSON(&branch); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	config.DB.Save(&branch)
	c.JSON(http.StatusOK, branch)
}

// DeleteBranch deletes a branch
func DeleteBranch(c *gin.Context) {
	id := c.Param("id")
	var branch models.Branch

	if err := config.DB.First(&branch, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Branch not found"})
		return
	}

	config.DB.Delete(&branch)
	c.JSON(http.StatusOK, gin.H{"message": "Branch deleted successfully"})
}
