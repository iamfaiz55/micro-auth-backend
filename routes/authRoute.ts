import express from "express"
import * as authController from "../controllers/authController"
import Protected from "../middlewares/passport.config"

const authRoutes = express.Router()

authRoutes
    .post("/register", authController.register)
    .post("/login", authController.login)
    .post("/logout", authController.logout)
    .post("/its-me", Protected, authController.itsme)


export default authRoutes