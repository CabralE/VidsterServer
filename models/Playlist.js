import mongoose from "mongoose";
const Schema = mongoose.Schema;

let Playlist = new Schema({
  playlistName: { type: String },
  playlistTag: { type: String },
});
