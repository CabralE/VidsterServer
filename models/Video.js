import mongoose from "mongoose";
const Schema = mongoose.Schema;

let Video = new Schema({
  videoName: { type: String, require: true },
  videoUrl: { type: String },
  videoChannel: { type: String },
  videoCategories: { type: String },
  // playlist: { type: Schema.Types.ObjectId, ref: "playlists" },
});

export default mongoose.model("videos", Video);
