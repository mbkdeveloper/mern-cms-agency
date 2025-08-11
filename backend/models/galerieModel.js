import mongoose from "mongoose";

const galerieSchema = new mongoose.Schema({
  title: { type: String, required: false },
  image: { type: String, required: true },
  alt: { type: String, required: false },
}, { timestamps: true });

const galerieModel = mongoose.models.galerie || mongoose.model("galerie", galerieSchema);

export default galerieModel;
