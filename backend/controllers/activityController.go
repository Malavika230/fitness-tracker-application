package controllers

import (
	"strconv"
	"time"

	"github.com/MalavikaS2000/Golang-poc/FitnessTrackerApplication/backend/database"
	"github.com/MalavikaS2000/Golang-poc/FitnessTrackerApplication/backend/models"
	"github.com/gofiber/fiber/v2"
)

type InputData struct {
	ActivityType string    `json:"activityType"`
	UserID       uint      `json:"userId"`
	ActivityDate time.Time `json:"activityDate"`
	Calories     string    `json:"calories"`
}

func CreateActivity(c *fiber.Ctx) error {
	var input InputData

	if err := c.BodyParser(&input); err != nil {
		return err
	}

	activity := models.Activity{
		ActivityType: input.ActivityType,
		UserID:       input.UserID,
		ActivityDate: input.ActivityDate,
		Calories:     input.Calories,
	}

	database.DB.Create(&activity)

	return c.JSON(activity)
}

func GetActivitiesByUser(c *fiber.Ctx) error {
	userIdParam := c.Params("id")
	if userIdParam == "" {
		return c.Status(400).JSON(fiber.Map{
			"error": "userId parameter is required",
		})
	}

	userId, err := strconv.Atoi(userIdParam)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{
			"error": "Invalid userId parameter",
		})
	}

	var activities []models.Activity
	if err := database.DB.Where("user_id = ?", userId).Find(&activities).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{
			"error": "Failed to retrieve activities",
		})
	}

	return c.JSON(activities)
}
