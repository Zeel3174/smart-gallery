const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const mediaRoutes = require("./routes/mediaRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ IMPORTANT
app.use("/uploads", express.static("uploads"));
app.use("/api/media", mediaRoutes);

mongoose.connect("mongodb://127.0.0.1:27017/smartGallery")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});