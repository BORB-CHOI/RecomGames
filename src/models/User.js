import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: "Name is required" },
  email: { type: String, match: /.+@.+@..+/ },
  avatarUrl: String,
  tags: Array,
  steamId: Number,
});

const model = mongoose.model("User", UserSchema);
export default model;
