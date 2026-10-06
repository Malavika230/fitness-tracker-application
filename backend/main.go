package main

import (
	"log"

	"github.com/Malavika230/fitness-tracker-application/backend/database"
	"github.com/Malavika230/fitness-tracker-application/backend/routes"
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
