const mongoose = require("mongoose");

//create schema
const EmailSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  name: {
    type: String,
  },
  textarea: {
    type: String,
  },
});

module.exports = mongoose.model("email", EmailSchema);
