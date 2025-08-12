import headerModel from "../models/headerModel.js";
import fs from "fs";
import sharp from "sharp";
import path from "path";

// List all headers
const listHeaders = async (req, res) => {
  try {
    const headers = await headerModel.find({});
    res.status(200).json({ success: true, data: headers });
  } catch (error) {
    console.error("Error fetching headers:", error);
    res.status(500).json({ success: false, message: "Error fetching headers" });
  }
};

// Helper to resize + compress image
const resizeAndCompressImage = async (filePath) => {
  const tempPath = filePath + "_tmp";

  await sharp(filePath)
    .resize(426, 607, { fit: "cover" }) // fixed dimensions
    .jpeg({ quality: 80 }) // compress JPEG to 80% quality
    .toFile(tempPath);

  // Replace original file with optimized one
  fs.renameSync(tempPath, filePath);
};

// Add header
const addHeader = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "Image is required" });
    }

    const filePath = path.join("uploads", req.file.filename);
    await resizeAndCompressImage(filePath);

    const image = `/uploads/${req.file.filename}`;
    const header = new headerModel({
      title: req.body.title,
      paragraph: req.body.paragraph,
      image: image,
    });

    await header.save();
    res.status(200).json({ success: true, message: "Header added", data: header });
  } catch (error) {
    console.error("Error adding header:", error);
    res.status(500).json({ success: false, message: "Error adding header" });
  }
};

// Edit header
const editHeader = async (req, res) => {
  try {
    const id = req.params.id;
    const header = await headerModel.findById(id);

    if (!header) {
      return res.status(404).json({ success: false, message: "Header not found" });
    }

    if (req.file) {
      // Remove old image
      if (header.image) {
        const oldImagePath = header.image.startsWith("/uploads/")
          ? header.image.substring(1)
          : header.image;
        fs.unlink(oldImagePath, (err) => {
          if (err) console.error("Error deleting old image:", err);
        });
      }

      const filePath = path.join("uploads", req.file.filename);
      await resizeAndCompressImage(filePath);

      header.image = `/uploads/${req.file.filename}`;
    }

    if (req.body.title) header.title = req.body.title;
    if (req.body.paragraph) header.paragraph = req.body.paragraph;

    await header.save();
    res.status(200).json({ success: true, message: "Header updated", data: header });
  } catch (error) {
    console.error("Error updating header:", error);
    res.status(500).json({ success: false, message: "Error updating header" });
  }
};

// Remove header
const removeHeader = async (req, res) => {
  try {
    const id = req.params.id;
    const header = await headerModel.findById(id);

    if (header?.image) {
      const oldImagePath = header.image.startsWith("/uploads/")
        ? header.image.substring(1)
        : header.image;
      fs.unlink(oldImagePath, (err) => {
        if (err) console.error("Error deleting image:", err);
      });
    }

    await headerModel.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Header removed" });
  } catch (error) {
    console.error("Error removing header:", error);
    res.status(500).json({ success: false, message: "Error removing header" });
  }
};

export { listHeaders, addHeader, editHeader, removeHeader };