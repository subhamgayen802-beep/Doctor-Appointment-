const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");

router.post("/upload", upload.single("file"), (req, res) => {
  try {
    res.json({
      message: "Upload successful",
      file: req.file.path,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
