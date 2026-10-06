package routes

import (
	"github.com/MalavikaS2000/Golang-poc/FitnessTrackerApplication/backend/controllers"
	"github.com/gofiber/fiber/v2"
)

func Setup(app *fiber.App) {

	//user
	app.Post("/api/signup", controllers.Signup)
	app.Post("/api/login", controllers.Login)
	app.Get("/api/user", controllers.User)
	app.Post("/api/logout", controllers.Logout)
	app.Put("/api/updateUser/:id", controllers.UserUpdate)

	//activity
	app.Post("/api/addActivity", controllers.CreateActivity)
	app.Get("/api/getActivity/:id", controllers.GetActivitiesByUser)

}
