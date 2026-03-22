const express = require("express");
const router = express.Router();
const { uploadMedia, searchMedia, deleteMedia } = require("../controllers/mediaController");
router.post("/upload", uploadMedia);
router.get("/search", searchMedia);
router.delete("/delete/:id", deleteMedia);

module.exports = router;