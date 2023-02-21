import express from "express";
import Authentication from "../middleware/authenticate.js";
import userController from "../controllers/user.js";


const router = express.Router() 

// PARTICULAR USER
router.get("/singleUser", Authentication, (req, res) => {
    return res.json({
        data: req.user,
        status: true,
        statusCode: 200,
        message:"user get suucessfully"
    })
})
// UPDATE USER 
router.put("/:id", Authentication,userController.updateUser)

// DELETE USER
router.delete("/:id", Authentication, userController.deleteUser)

// GET USER
router.get("/find/:id", userController.getUSer)

// SUBSCRIBE USER
router.put("/subscribe/:id", Authentication, userController.subscribeUser)

// UNSUBSCRIBE USER
router.put("/unsubscribe/:id", Authentication, userController.unSubscribeUser)

// LIKE VIDEO
router.put("/like/:videoId", Authentication,userController.likeVideo)

// UNLIKE VIDEOs
router.put("/dislike/:videoId", Authentication, userController.dislikeVideo)


export default router;