// required packaged import here....

import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import videoRoutes from "./routes/videos.js";
import commentRoutes from "./routes/comment.js";
import connect from "./database/index.js"
import cookieParser from "cookie-parser";


dotenv.config()
const app = express();
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: false }));


// declare routing based on module
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/comments", commentRoutes)
app.use("/api/videos", videoRoutes)

// custom error handler from server 
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something Went wrong !.....";
    return res.status(status).json({
        success: false,
        status,
        message: message
    })
})

// listen port
app.listen(process.env.PORT, () => {
    connect();
    console.log(`port is working on ${process.env.PORT}`)
})

