import { createError } from "../error";
import User from "../models/User";
import jwt from "jsonwebtoken"

export const JWTService = {
    async genrateToken(payload,res,next) {
        let token = jwt.sign({ id: payload }, process.env.JWT_SECRET_KEY);
        let user = await User.findOne(payload);
        if (!user) {
            next(createError(404,"user not found"))
        }
        const { password, ...others } = user._doc
        others.password = "";
        res.cookie("access_token", token, {
            httpOnly: true
        })
        next(others)
    },
    
    async verifyToken(req, res, next) {
        const token = req.cookies.access_token;
        if (!token) {
            return next(createError(401, "you are not authenticated"))
        }
        jwt.verify(token,process.env.JWT_SECRET_KEY,(err,user) => {
            if (err) {
                return next(createError(403, "invalid token"))
                
            }  
            req.user = user;
            next()
        })
    }
}

// export default JWTService;

/** @format */

// import jwt from 'jsonwebtoken';

// class JwtService {
//     static sign(payload, expiry = '8000s', secret = process.env.JWT_SECRET_KEY) {
//         return jwt.sign(payload, secret, { expiresIn: expiry });
//     }

//     static verify(token, secret = process.env.JWT_SECRET_KEY) {
//         // console.log(token);
//         return jwt.verify(token, secret);
//     }
// }

// export default JwtService;
