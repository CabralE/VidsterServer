import { Router } from "express";
import * as controllers from "../controllers/playlists.js";
import { restrict } from "../middleware/restrict.js";

const router = Router();

router.get("/playlists", controllers.getPlaylists);
router.get("/playlists/:playlist_id", controllers.getPlaylist);
router.post("/playlists", restrict, controllers.createPlaylist);
router.put("/playlists/:playlist_id", restrict, controllers.updatePlaylist);
router.delete("/playlists/:playlist_id", restrict, controllers.deletePlaylist);

export default router;
