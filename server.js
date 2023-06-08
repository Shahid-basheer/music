const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./routes/route");
const expressFileUpload = require("express-fileupload");
const mongoose = require("mongoose");
const mongoString = process.env.DATABASE_URL;
const path = require("path");
const app = express();

// Database connection
mongoose.connect(mongoString);
const database = mongoose.connection;
database.on("error", (error) => {
  throw error;
});
database.once("connected", () => {
  console.log("Database connected");
});

// Middleware
app.use(
  "/public",
  express.static("public", {
    setHeaders: (res, filePath) => {
      const ext = path.extname(filePath);
      if (ext === ".mp3") {
        res.setHeader("Content-Type", "audio/mpeg");
      }
    },
  })
);
app.use(expressFileUpload());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://127.0.0.1:5173",
  })
);
app.use("/music", routes);

if (process.env.NODE_URL === "production") {
  app.use(express.static("music-player/build"));
}
const PORT = process.env.port | 5000;
app.listen(PORT, () => {
  console.log("Server is running on http://localhost:5000");
});
