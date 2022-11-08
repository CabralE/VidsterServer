import { Router } from "express";
import * as controllers from "../controllers/playlists.js";

const router = Router();

router.get("/playlists", controllers.getPlaylists);
router.get("/playlists/:playlist_id", controllers.getPlaylist);
router.post("/playlists", controllers.createPlaylist);
router.put("/playlists/:playlist_id", controllers.updatePlaylist);
router.delete("/playlists/:playlist_id", controllers.deletePlaylist);

export default router;
