import Video from "../models/Video.js";
import fetch from "node-fetch";
let YOUTUBE_API = process.env.YOUTUBE_KEY || "no key";
let youtubeURL = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=`;

export const getVideos = async (req, res) => {
  try {
    const videos = await Video.find();
    res.json(videos);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const getVideo = async (req, res) => {
  try {
    const { video_id } = req.params;
    const video = await Video.findById(video_id);

    if (video) {
      res.json(video);
    }
    res.status(400).json({ message: "Video not found" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const createVideo = async (req, res) => {
  try {
    const video = new Video(req.body);
    await video.save();
    res.status(201).json(video);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const editVideo = async (req, res) => {
  try {
    const { video_id } = req.params;
    const video = await Video.findByIdAndUpdate(video_id, req.body);
    res.status(200).json(video);
  } catch (error) {
    console.log(error);
    res.send(500).json({ error: error.message });
  }
};

export const deleteVideo = async (req, res) => {
  try {
    const { video_id } = req.params;
    const deleted = await Video.findByIdAndDelete(video_id);
    if (deleted) {
      return res.status(200).send("Video has been deleted");
    }
    throw new Error("Video not found!");
  } catch (error) {
    console.log(error);
    res.send(500).json({ error: error.message });
  }
};

export const searchVideos = async (req, res) => {
  try {
    let { word_id } = req.params;
    let key = `&key=${YOUTUBE_API}`;
    let fullURL = youtubeURL + word_id + key;
    await fetch(fullURL)
      .then((response) => response.json())
      .then((data) => res.send(data));
  } catch (error) {
    console.log(error);
    res.send(500).json({ error: error.message });
  }
};
