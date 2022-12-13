const multer = require("multer");
const path = require("path");
const fs = require("fs");

const fileValidation = {
  image: ["image/png", "image/jpeg"],
};

const upload = function (customPath, customValidation) {
  if (!customPath) {
    customPath = "general";
  }
  const fullPath = path.join(__dirname, `../uploads/${customPath}`);
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `/uploads/${customPath}`);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + "_" + file.originalname);
    },
  });
  const fileFilter = function (req, file, cb) {
    if (customValidation.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  const uplodas = multer({ dest: fullPath, fileFilter, storage });
  return uplodas;
};

module.exports = {
  upload,
  fileValidation,
};
