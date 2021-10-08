const mongoose = require("mongoose");

require("./models/Email");
const routes = require("./routes/routes");

// const app = require("./app");

const express = require("express");
const cors = require("cors");
const logger = require("morgan");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.json());
app.use(logger("dev"));
app.use("/", routes);

app.use("/search", express.static("search"));

const mongoURI =
  "mongodb+srv://Julianne:Shareverse1234@svcluster.hlmba.mongodb.net/svs_data?retryWrites=true&w=majority";

const conn = mongoose.createConnection(mongoURI);

mongoose.connect(
  mongoURI,
  { useNewUrlParser: true },
  { useUnifiedTopology: true }
);

conn.once("open", () => {
  console.log("Connection Successful");
});

conn.on("error", console.error.bind(console, "MongoDB connection error:"));

const server = app.listen(5005, () => {
  console.log(`Express running PORT ${server.address().port}`);
});
