// Files
import database from "./database/connection.js";
import routes from "./routes/index.js";

// Dependencies
import express from "express";
import cors from "cors";
import logger from "morgan";
import chalk from "chalk";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // enable json parsing
app.use(cors()); // enable cors
app.use(logger("dev")); // log requests to console

app.use("/", routes);

database.on("connected", () => {
  console.clear();
  console.log(chalk.blue("Connected to MongoDB!"));
  app.listen(PORT, () => {
    console.log(
      `Express server running in development on http://localhost:${PORT}`
    );
  });
});
/*
// ________________________
// MODELS
// ________________________

const VidPlaylistSchema = new mongoose.Schema({
  userName: String,
  playlistName: String,
  playlistTags: String,
});

const VidPlaylist = mongoose.model("VidPlaylist", VidPlaylistSchema);

const VideoSchema = new mongoose.Schema({
  vidName: String,
  vidUrl: String,
  vidChannel: String,
  vidCategories: String,
  playlistID: String,
  vidComments: String,
  vidRating: String,
});

const Video = mongoose.model("Video", VideoSchema);

// ________________________
// ROUTES
// ________________________

// get request to root
app.get("/", (req, res) => {
  res.send("Lets do this!!");
}); // end get request to root

// Playlist index route
app.get("/playlist", async (req, res) => {
  const playlists = await VidPlaylist.find();
  console.log(playlists);
  res.json(playlists);
});

// Playlist create route
app.post("/playlist", async (req, res) => {
  const playlist = await VidPlaylist.create(req.body);
  res.json(playlist);
});

// Playlist update route
app.put("/playlist/:id", async (req, res) => {
  const playlist = await VidPlaylist.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(playlist);
});

// Playlist delete route
app.delete("/playlist/:id", async (req, res) => {
  await VidPlaylist.findByIdAndDelete(req.params.id);
  res.json({ message: "Playlist deleted" });
});

//Playlist Show Route & Video Index Route
app.get("/playlist/:id/", async (req, res) => {
  const videos = await Video.find({ playlistID: req.params.id });

  res.json(videos);
});

// Video create route
app.post(`/playlist/newvideo`, async (req, res) => {
  const video = await Video.create(req.body);
  res.json(video);
});

//TODO Remaining video routes
// Video update route
app.put("/playlist/update/:vidID", async (req, res) => {
  const video = await Video.findByIdAndUpdate(req.params.vidID, req.body, {
    new: true,
  });
  res.json(video);
});

//Video delete route
app.delete("/playlist/:id/:vidID", async (req, res) => {
  await Video.findByIdAndDelete(req.params.vidID);
  res.json({ message: "Video deleted" });
});

// ________________________
// Listener
// ________________________
// listen on port
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
}); // end app.listen

*/
