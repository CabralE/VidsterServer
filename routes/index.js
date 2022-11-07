import { Router } from "express";
// import studentRoutes from "./students.js";
import usersRoutes from "./users.js";
// import blogsRoutes from "./blogs.js";

const router = Router();

router.get("/", (req, res) => res.send("This is the api root!"));

router.use("/", usersRoutes);
// router.use("/", blogsRoutes);
// router.use("/students", studentRoutes);

export default router;
