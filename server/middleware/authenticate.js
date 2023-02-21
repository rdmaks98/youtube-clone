import userModel from "../models/User.js"
import { createError } from "../error.js";
import jwt from "jsonwebtoken";

const Authentication = async (req, res, next) => {
    try {
        let authToken = req.headers.authorization;
        console.log(authToken,"from header...........");
        if (!authToken) {
            console.log("token not found");
            return res.json(createError("Please Login to access this resources", 401)
            );
        }

        const token = authToken.split(" ")[1];
        console.log(token,"split.......... token")
        if (token === undefined) {
            return res.json(createError("Please Login to access this resources", 401));
        }
        const decodeData = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = await userModel.findById(decodeData.id).select("-password");
        if (!req.user) {
            return next(createError("User not found",404))
        }
        next();
    } catch (error) {
        return res.json(createError(error, 401));
    }
};

export default Authentication;
