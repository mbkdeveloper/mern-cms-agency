import mongoose from "mongoose";

const testimonialItemSchema = new mongoose.Schema({
  writer: {
    type: String,
    required: true
  },
  paragraph: {
    type: String,
    required: true
  }
});

const testimonialsSectionSchema = new mongoose.Schema({
  sectionTitle: {
    type: String,
    required: true
  },
  sectionDescription: {
    type: String,
    required: true
  },
  visibility: {
    type: Boolean,
    default: true 
  },
  testimonials: [testimonialItemSchema]
});

const testimonialsSectionModel =
  mongoose.models.testimonialsSection ||
  mongoose.model("testimonialsSection", testimonialsSectionSchema);

export default testimonialsSectionModel;
