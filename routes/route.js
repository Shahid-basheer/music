const express = require("express");
const router = express.Router();
const Model = require("../models/models");
const path = require("path");
let id;
let title;
// Handling file-upload
router.post("/upload-file", async (req, res) => {
  const imgFile = req.files.image;
  const audioFile = req.files.audio;
  const uploadPathImg = "./public/images/" + id + ".jpg";
  const uploadPathAudio = "./public/songs/" + id + ".mp3";
  imgFile.mv(uploadPathImg, (err) => {
    if (err) throw err;
  });
  audioFile.mv(uploadPathAudio, (err) => {
    if (err) throw err;
  });
  res.status(200).json("Successfully added song and image");
});

// Handling file json data
router.post("/file-details", async (req, res) => {
  const data = new Model({
    artist: req.body.artist,
    title: req.body.title,
  });
  try {
    dataToSave = await data.save();
    id = dataToSave.id;
    title = dataToSave.title;
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all file data
router.get("/get-file-data", async (req, res) => {
  try {
    const data = await Model.find();
    res.status(200).json(data);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});
module.exports = router;
