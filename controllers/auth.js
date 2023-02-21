import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../error.js";
import jwt from "jsonwebtoken"
const authController = {
    async signup(req, res, next) {
        try {
            let saltRounds = 10;
            let salt = bcrypt.genSaltSync(10);
            let hash = bcrypt.hashSync(req.body.password, salt)
            let newUser = new User({ ...req.body, password: hash });
            await newUser.save();
            console.log(req.body)
            return res.status(200).send({
                message: "user is created successfully"
            })
        } catch (err) {
            next(err);
        }
    },

    async signin(req, res, next) {
        try {
            const user = await User.findOne({ name: req.body.name })
            if (!user) {
                return next(createError(404,"User is not found"))
            }
            const isCOrrect = await bcrypt.compare(req.body.password, user.password)
            if (!isCOrrect) {
                return next(createError(404,"Wrong Credentials"))
            }
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
            const { password, ...others } = user._doc
            others.password = ""
            res.cookie("access_token", token, {
                httpOnly:false
            }).status(200).json(others)
            // return res.status(200).send({
            //     message: "user is created successfully"
            // })
        } catch (err) {
            next(err);
        }
    }
}
export default authController;