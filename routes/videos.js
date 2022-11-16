import { Router } from "express";
import * as controllers from "../controllers/videos.js";

const router = Router();

router.get("/videos", controllers.getVideos);
router.get("/videos/:video_id", controllers.getVideo);
router.post("/videos", controllers.createVideo);
router.put("/videos/:video_id", controllers.editVideo);
router.delete("/videos/:video_id", controllers.deleteVideo);

export default router;
