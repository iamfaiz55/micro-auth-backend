
import express, { Request, Response } from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cors from "cors"
import passport from "passport";

import authRoutes from "./routes/authRoute"
import "./middlewares/passport.config"
// import x from "./middlewares/passport.config";

dotenv.config({ path: "./.env" })

const MONGO_URL = process.env.MONGO_URL || ""
// console.log("env", process.env.MONGO_URL);

const PORT = process.env.PORT || 5000
mongoose.connect(MONGO_URL);

const app = express();
app.use(express.json());
app.use(passport.initialize())
app.use(cors({
    origin: "*",
    credentials: true
}));

app.use("/api", authRoutes);

app.use("*", (_req: Request, res: Response) => {
    res.status(404).json({ message: "Resource Not Found" })
});

mongoose.connection.once("open", () => {
    console.log("MONGO CONNECTED");
    app.listen(PORT, () => {
        console.log("SERVER RUNNING")
    });
});
