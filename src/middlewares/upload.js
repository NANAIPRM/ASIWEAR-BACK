const multer = require("multer");

const storage = multer.diskStorage({
  // ตำแหน่ง
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  // ชื่อไฟล์ ตอนนี้ใส่เป็นเวลา
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().getTime() +
        "" +
        Math.round(Math.random() * 100000) +
        "." +
        file.mimetype.split("/")[1]
    );
  },
});

module.exports = multer({ storage });
