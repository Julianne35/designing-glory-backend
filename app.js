const cors = require("cors");
const mongoose = require("mongoose");
const express = require("express");
const logger = require("morgan");
require("./models/Email");
const routes = require("./routes/routes");

const app = express();

//---------use for node over secure server - add this when you start aws instance 
// const https = require("https"),
//     fs = require("fs");

// const sslServer =  https.createServer (
// {
//   key: fs.readFileSync('/var/www/cert/privkey.pem'),
//   cert: fs.readFileSync('/var/www/cert/fullchain.pem'),
// },
// app
// )
//--------end code block

app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "DELETE, PUT, GET, POST");
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
app.use(express.json());
app.use(logger("dev"));
app.use("/", routes);
app.use("/search", express.static("search"));
app.get("*", (request, response) => {
  response.sendFile(path.join(__dirname, "client/build", "index.html"));
});

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


const server = app.listen(3001, (sslServer) => {console.log(`Express running PORT ${server.address().port}`)
});

// --------use for aws instance only (connected to 11-20)
// sslServer.listen(3001, () => { console.log(`working!`) });
//---------end code block