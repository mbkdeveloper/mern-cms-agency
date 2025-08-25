import mongoose from "mongoose";

const serviceDetailsSchema = new mongoose.Schema({
  heading: { type: String, required: true },          
  subHeading: { type: String },                       
  description: { type: String, required: true },      
  additionalInfo: { type: String },                   
  media: { type: String , required: true}                     
});

const serviceItemSchema = new mongoose.Schema({
  icon: { type: String, required: true },
  title: { type: String, required: true },
  paragraph: { type: String, required: true },
  details: serviceDetailsSchema
});

const servicesSectionSchema = new mongoose.Schema({
  sectionTitle: { type: String, required: true },
  sectionDescription: { type: String, required: true },
  visibility: { type: Boolean, default: true },
  services: [serviceItemSchema]
});

const servicesSectionModel = mongoose.models.servicesSection || mongoose.model("servicesSection", servicesSectionSchema);

export default servicesSectionModel;
