import express from "express";
import commentController from "../controllers/comments.js";
import Authentication from "../middleware/authenticate.js";
const router = express.Router()

router.post("/", Authentication, commentController.addComment)
router.delete("/:id", Authentication, commentController.deleteComment)
router.get("/:videoId",commentController.getComment)
export default router;