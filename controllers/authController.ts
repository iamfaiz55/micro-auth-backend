import { Request, Response } from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/User"

const KEY = process.env.JWT_KEY || "secretKey"


export const register = async (req: Request, res: Response): Promise<any> => {
    try {
        const { name, email, password } = req.body

        const check = await User.findOne({ email })

        if (check) {
            return res.status(508).json({ message: "Already Have An Account" })
        }

        const hashPass = await bcrypt.hash(password, 10)


        await User.create({ name, email, password: hashPass })
        res.json({ message: "User Register Successfull" })


    } catch (error) {
        return res.status(500).json({ message: "Something Wents Wrong", error })
    }
}


export const login = async (req: Request, res: Response): Promise<any> => {
    try {
        const { email, password } = req.body
        const check = await User.findOne({ email })


        if (!check) {
            return res.status(508).json({ message: "You Dont Have An Account" })
        }

        const isRight = await bcrypt.compare(password, check.password)
        if (!isRight) {
            return res.status(409).json({ message: "Password Is Wrong" })
        }
        const token = jwt.sign({ user: check._id }, KEY, { expiresIn: "1m" })


        res.json({ message: "User Login Successfull", result: { name: check.name, email: check.email, _id: check._id, token } })


    } catch (error) {
        return res.status(500).json({ message: "Something Wents Wrong", error })
    }
}



export const logout = async (_req: Request, res: Response): Promise<any> => {
    try {
        // res.clearCookie("user")

        res.json({ message: "User Logout Successfull" })


    } catch (error) {
        return res.status(500).json({ message: "Something Wents Wrong" })
    }
}

export const itsme = async (_req: Request, res: Response): Promise<any> => {
    try {
        // res.clearCookie("user")
        console.log("its from itsme controller");

        res.json({ message: "Hi My Self Shaikh Faiz" })


    } catch (error) {
        return res.status(500).json({ message: "Something Wents Wrong" })
    }
}

