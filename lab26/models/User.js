const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  age: {
    type: Number,
  },
  password: {
    type: String,
  },
});

module.exports = mongoose.model("User", UserSchema);
