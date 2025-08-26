import galerieModel from "../models/galerieModel.js";
import fs from "fs";
import path from "path"; 
import sharp from "sharp";



// All galerie list
const listgalerie = async (req, res) => {
  try {
    const galeries = await galerieModel.find({});
    res.status(200).json({ success: true, data: galeries });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error" });
  }
};

// Helper function to process image
const processImage = async (filePath, width, height) => {
  const outputFilePath = path.join(
    path.dirname(filePath),
    `resized-${path.basename(filePath)}`
  );

  let transformer = sharp(filePath).jpeg({ quality: 70 });

  // Only resize if width and height are provided
  if (width && height) {
    transformer = transformer.resize(width, height, {
      fit: sharp.fit.cover,
      position: sharp.strategy.entropy,
    });
  }

  await transformer.toFile(outputFilePath);
  fs.unlinkSync(filePath); // delete original
  return `/uploads/${path.basename(outputFilePath)}`;
};

// Add galerie
const addgalerie = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }

    const width = req.body.width ? parseInt(req.body.width) : null;
    const height = req.body.height ? parseInt(req.body.height) : null;

    const processedImage = await processImage(req.file.path, width, height);

    const galerie = new galerieModel({
      identifiant: req.body.identifiant,
      alt: req.body.alt,
      image: processedImage,
      width,
      height,
    });

    await galerie.save();
    res
      .status(200)
      .json({ success: true, message: "Galerie added", data: galerie });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error" });
  }
};

// Edit galerie
const editgalerie = async (req, res) => {
  try {
    const id = req.params.id;
    const galerie = await galerieModel.findById(id);
    if (!galerie) {
      return res
        .status(404)
        .json({ success: false, message: "Galerie not found" });
    }

    const width = req.body.width ? parseInt(req.body.width) : null;
    const height = req.body.height ? parseInt(req.body.height) : null;

    if (req.file) {
      if (galerie.image) fs.unlink(`.${galerie.image}`, () => {});
      const processedImage = await processImage(req.file.path, width, height);
      galerie.image = processedImage;
      galerie.width = width;
      galerie.height = height;
    }

    if (req.body.identifiant) galerie.identifiant = req.body.identifiant;
    if (req.body.alt) galerie.alt = req.body.alt;

    await galerie.save();
    res
      .status(200)
      .json({ success: true, message: "Galerie updated", data: galerie });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error" });
  }
};


const removegalerie = async (req, res) => {
  try {
    const id = req.params.id;
    const galerie = await galerieModel.findById(id);
    if (galerie?.image) {
      fs.unlink(`uploads/${galerie.image}`, () => {});
    }
    await galerieModel.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Galerie removed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error" });
  }
};

export { addgalerie, listgalerie, removegalerie, editgalerie };
