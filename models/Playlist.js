import mongoose from "mongoose";
const Schema = mongoose.Schema;

let Playlist = new Schema({
  playlistName: { type: String, require: true },
  playlistTag: { type: String },
  image: { type: String },
  user: { type: Schema.Types.ObjectId, ref: "users" },
});

export default mongoose.model("playlists", Playlist);
