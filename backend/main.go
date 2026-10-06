package main

import (
	"log"

	"github.com/MalavikaS2000/Golang-poc/FitnessTrackerApplication/backend/database"
	"github.com/MalavikaS2000/Golang-poc/FitnessTrackerApplication/backend/routes"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {

	database.Connect()

	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowOrigins:     "http://localhost:3000",
		AllowCredentials: true,
	}))

	routes.Setup(app)
	log.Fatal(app.Listen(":8000"))
}
