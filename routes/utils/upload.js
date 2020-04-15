const path = require("path");
const uploadPath = path.join(__dirname, "../utils/upload.js");
const { loadData } = require("./data");

const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const allows = ["image/jpg", "image/jpeg", "image/gif", "image/png"];
    if (!allows.includes(file.mimetype)) {
      const err = new Error("File type not allowed.");
      return cb(err, undefined);
    }
    const data = loadData();

    if (data.some((item) => item.originalname === file.originalname)) {
      const err = new Error("File already existed.");
      return cb(err, undefined);
    }

    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage }).single("fileUpload");

module.exports = upload;
