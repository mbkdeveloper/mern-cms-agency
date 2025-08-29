import mongoose from "mongoose";

const headerSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    paragraph: { type: String, required: true },
    visibility: {
      type: Boolean,
      default: false,
    },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

const headerModel =
  mongoose.models.header || mongoose.model("header", headerSchema);

export default headerModel;
