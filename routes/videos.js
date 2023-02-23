import express from "express";
import videoController from "../controllers/video.js";
import Authentication from "../middleware/authenticate.js";
const router = express.Router()

// ADD VIDEO
router.post("/", Authentication, videoController.addVideo)

// [ - ]UPDATE VIDEO
router.put("/:id", Authentication, videoController.updateVideo)

// [ - ] DELETE VIDEO
router.delete("/:id", Authentication, videoController.deleteVideo)

// GET USER BY VIDEO
router.get("/find/:id", videoController.getVideo)

// [ - ] VIEW ADD IN VIDEO
router.put("/view/:id", videoController.addView)

// TREND VIDEO
router.get("/trend", videoController.trending)

// RANDOM VIDEO
router.get("/random",videoController.random)

// SUBSCRIBE USER BY VIDEO
router.get("/subscribe", Authentication, videoController.subScriber)

// FIND VIDEO USING TAGS
router.get("/tags", videoController.findByTag)

// FIND VIDEO USING SEARCH
router.get("/search", videoController.searchVideo)

export default router;