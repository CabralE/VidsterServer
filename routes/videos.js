import { Router } from "express";
import * as controllers from "../controllers/videos.js";
import { restrict } from "../middleware/restrict.js";

const router = Router();

router.get("/videos", controllers.getVideos);
router.get("/videos/:video_id", controllers.getVideo);
router.post("/videos", restrict, controllers.createVideo);
router.put("/videos/:video_id", restrict, controllers.editVideo);
router.delete("/videos/:video_id", restrict, controllers.deleteVideo);
// router.get("/search/:search", controllers.searchVideos);
router.get("/search/:word_id", controllers.searchVideos);

export default router;
