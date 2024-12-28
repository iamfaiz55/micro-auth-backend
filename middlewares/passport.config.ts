import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import dotenv from "dotenv";
dotenv.config()

const KEY = process.env.JWT_KEY || "secretKey"
// Passport JWT strategy configuration
const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: KEY,
};
console.log("-------", KEY);

passport.use(
    new JwtStrategy(options, (jwtPayload, done) => {
        try {
            return done(null, jwtPayload.user);
        } catch (error) {
            return done(error, false);
        }
    })
);



import { Request, Response, NextFunction } from "express";
// import { dot } from "node:test/reporters";



const Protected = (req: Request, res: Response, next: NextFunction): void => {
    passport.authenticate("jwt", { session: false }, (err: Error, user: string, info: any) => {
        if (err) {
            res.status(500).json({ message: "Error during authentication", error: err });
            return;
        }
        if (!user) {
            res.status(401).json({ message: "Unauthorized", info });
            return;
        }
        (req as any).user = user;
        next();
    })(req, res, next);
};

export default Protected;
