import galerieModel from "../models/galerieModel.js";
import fs from "fs";

// Add galerie
const addgalerie = async (req, res) => {
  try {
    const image = `/uploads/${req.file.filename}`;
    const galerie = new galerieModel({
      title: req.body.title,
      alt: req.body.alt,
      image: image,
    });

    await galerie.save();
    res.status(200).json({ success: true, message: "Galerie added" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error" });
  }
};

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

const editgalerie = async (req, res) => {
  try {
    const id = req.params.id;
    const galerie = await galerieModel.findById(id);
    if (!galerie) {
      return res
        .status(404)
        .json({ success: false, message: "Galerie not found" });
    }
    if (req.file) {
      if (galerie.image) {
        fs.unlink(`uploads/${galerie.image}`, () => {});
      }
      galerie.image = req.file.filename;
    }
    if (req.body.title) galerie.title = req.body.title;
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
