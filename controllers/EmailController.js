const mongoose = require("mongoose");
const CreateEmail = mongoose.model("email");

//function baseRoute
exports.baseRoute = async (req, res) => {
  res.send("Server Running");
};

// gets all emails in array
exports.displayEmail = async (req, res) => {
  const getEmail = await CreateEmail.find();
  if (!getEmail) res.status(400).send({ error: "No data were found" });
  res.status(200).send(getEmail);
};
