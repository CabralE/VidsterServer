import Playlist from "../models/Playlist.js";

export const getPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.find();
    res.json(playlists);
  } catch (error) {
    console.log(error);
    res.status(500).son({ error: error.message });
  }
};

export const getPlaylist = async (req, res) => {
  try {
    const { playlist_id } = req.params;
    const playlist = await Playlist.findById(playlist_id).populate("user");

    if (playlist) {
      return res.json(playlist);
    }

    res.status(400).json({ message: "Playlist not found!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const createPlaylist = async (req, res) => {
  try {
    const playlist = new Playlist(req.body);
    await playlist.save();
    res.status(201).json(playlist);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const updatePlaylist = async (req, res) => {
  try {
    const { playlist_id } = req.params;
    const playlist = await Playlist.findByIdAndUpdate(playlist_id, req.body);
    res.status(200).json(playlist);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const deletePlaylist = async (req, res) => {
  try {
    const { playlist_id } = req.params;
    const deleted = await Playlist.findByIdAndDelete(playlist_id);

    if (deleted) {
      return res.status(200).send("Playlist delete!");
    }
    throw new Error("Playlist not found!");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.mesage });
  }
};
