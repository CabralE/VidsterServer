import mongoose from "mongoose";
const Schema = mongoose.Schema;

const User = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password_digest: { type: String, required: true, select: false },
    // playlists: [{ type: Schema.Types.ObjectId, ref: "playlists" }],
  },
  { timestamp: true }
);

export default mongoose.model("users", User);
