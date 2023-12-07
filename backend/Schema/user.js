const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  password: String,
  email: { type: String, lowercase: true },
});

const userModel = mongoose.model("User", userSchema);
export default userModel;
