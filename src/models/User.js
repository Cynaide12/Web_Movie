const { Schema, model } = require("mongoose");
const User = new Schema({
  email: { type: String, unique: true, required: false },
  firstname: { type: String, required: false },
  lastname: { type: String, required: false },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  roles: [{ type: String, ref: "Role" }],
  favorites: [{type: String}]
});
module.exports = model("User", User);
