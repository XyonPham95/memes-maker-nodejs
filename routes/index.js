var express = require("express");
var router = express.Router();
const upload = require("../utils/upload.js");

const { saveData, loadData } = require("./utils/data");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/browse", (req, res) => {
  res.render("allImages");
});

router.post("/upload", upload, (req, res) => {
  const file = req.file;
  const data = loadData();
  try {
    if (!file) {
      throw new Error("You need to upload an image!");
    }
    data.push(file);
    saveData(data);
    return res.render("allImages", { images: data });
  } catch (e) {
    return res.render("index", {
      error: e.message,
    });
  }
});

module.exports = router;
