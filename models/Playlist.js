import mongoose from "mongoose";
const Schema = mongoose.Schema;

let Playlist = new Schema({
  playlistName: { type: String, require: true },
  playlistTag: { type: String },
  image: { type: String },
  videos: [{ type: Schema.Types.ObjectId, ref: "videos" }],
});

export default mongoose.model("playlists", Playlist);
