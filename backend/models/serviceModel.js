import mongoose from "mongoose";


const serviceItemSchema = new mongoose.Schema({
  icon: {
    type: String, // nom ou URL de l'icône
    required: true
  },
  title: {
    type: String,
    required: true
  },
  paragraph: {
    type: String,
    required: true
  }
});

const servicesSectionSchema = new mongoose.Schema({
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
  services: [serviceItemSchema]
});

const servicesSectionModel = mongoose.models.servicesSection || mongoose.model("servicesSection", servicesSectionSchema);

export default servicesSectionModel;


/* {
  "sectionTitle": "Our Awesome Services",
  "sectionDescription": "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor...",
  "services": [
    {
      "icon": "paint-roller-icon.svg",
      "title": "Graphic Design",
      "paragraph": "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor..."
    },
    {
      "icon": "monitor-icon.svg",
      "title": "Web Design",
      "paragraph": "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor..."
    },
    {
      "icon": "browser-icon.svg",
      "title": "Development",
      "paragraph": "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor..."
    },
    {
      "icon": "printer-icon.svg",
      "title": "Print",
      "paragraph": "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor..."
    }
  ]
}
*/