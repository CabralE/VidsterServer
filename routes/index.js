import { Router } from "express";

import usersRoutes from "./users.js";
import playlistsRoutes from "./playlists.js";
import videosRoutes from "./videos.js";

const router = Router();

router.get("/", (req, res) => res.send("This is the api root!"));

router.use("/", usersRoutes);
router.use("/", playlistsRoutes);
router.use("/", videosRoutes);
// router.use("/students", studentRoutes);

export default router;
