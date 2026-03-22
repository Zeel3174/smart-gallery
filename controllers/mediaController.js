const Media = require("../models/Media");
const multer = require("multer");

// 📦 Storage config
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage }).single("file");

exports.uploadMedia = (req, res) => {
  upload(req, res, async (err) => {
    try {
      console.log("UPLOAD HIT");

      if (err) {
        console.error("Multer Error:", err);
        return res.status(500).json({ error: "Upload error" });
      }

      if (!req.file) {
        return res.status(400).json({ error: "No file selected" });
      }

      const filePath = req.file.path;

     
      const fileName = req.file.originalname.split(".")[0];

      const result = {
        tags: [fileName],  
        text: "auto-generated",
        faces: []
      };

      const media = new Media({
        filename: req.file.filename,
        path: filePath,
        tags: result.tags,
        text: result.text,
        faces: result.faces
      });

      await media.save();

      res.json({
        message: "Upload successful",
        media: media
      });

    } catch (error) {
      console.error("Upload Error:", error);
      res.status(500).json({ error: "Upload failed" });
    }
  });
};


// 🔍 Search Media
exports.searchMedia = async (req, res) => {
  try {
    const query = req.query.q || "";

    const results = await Media.find({
      $or: [
        { tags: { $regex: query, $options: "i" } },
        { text: { $regex: query, $options: "i" } },
        { faces: { $regex: query, $options: "i" } }
      ]
    });

    res.json(results);

  } catch (error) {
    console.error("Search Error:", error);
    res.status(500).json({ error: "Search failed" });
  }
};
exports.deleteMedia = async (req, res) => {
  try {
    const id = req.params.id;

    console.log("Deleting:", id); // debug

    await Media.findByIdAndDelete(id);

    res.json({ message: "Deleted successfully" });

  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ error: "Delete failed" });
  }
};