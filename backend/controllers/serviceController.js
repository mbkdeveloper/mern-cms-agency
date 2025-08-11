import servicesSectionModel from "../models/serviceModel.js";

// Add a new service section
const addServiceSection = async (req, res) => {
  try {
    const { sectionTitle, sectionDescription, services } = req.body;

    if (!sectionTitle || !sectionDescription) {
      return res.status(400).json({
        success: false,
        message: "Title and description are required",
      });
    }

    const newServiceSection = new servicesSectionModel({
      sectionTitle,
      sectionDescription,
      services,
    });

    await newServiceSection.save();
    res.status(201).json({
      success: true,
      message: "Service Section Added",
      data: newServiceSection,
    });
  } catch (error) {
    console.error("Error creating service section:", error);
    res
      .status(500)
      .json({ success: false, message: "Error creating service section" });
  }
};

// Get all service sections
const listServiceSections = async (req, res) => {
  try {
    const serviceSections = await servicesSectionModel.find({});
    res.status(200).json({ success: true, data: serviceSections });
  } catch (error) {
    console.error("Error fetching service sections:", error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching service sections" });
  }
};

// Update an existing service section
const updateServiceSection = async (req, res) => {
  const { id } = req.params;
  const { sectionTitle, sectionDescription, services } = req.body;

  try {
    const updatedSection = await servicesSectionModel.findByIdAndUpdate(
      id,
      { sectionTitle, sectionDescription, services },
      { new: true }
    );

    if (!updatedSection) {
      return res
        .status(404)
        .json({ success: false, message: "Service section not found" });
    }

    res.status(200).json({
      success: true,
      message: "Service Section Updated",
      data: updatedSection,
    });
  } catch (error) {
    console.error("Error updating service section:", error);
    res
      .status(500)
      .json({ success: false, message: "Error updating service section" });
  }
};

// Remove a service section
const removeServiceSection = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedSection = await servicesSectionModel.findByIdAndDelete(id);

    if (!deletedSection) {
      return res
        .status(404)
        .json({ success: false, message: "Service section not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Service section removed successfully" });
  } catch (error) {
    console.error("Error removing service section:", error);
    res
      .status(500)
      .json({ success: false, message: "Error removing service section" });
  }
};

const listServiceItems = async (req, res) => {
  const { sectionId } = req.params;

  try {
    const section = await servicesSectionModel.findById(sectionId);

    if (!section) {
      return res
        .status(404)
        .json({ success: false, message: "Service section not found" });
    }

    res.status(200).json({ success: true, data: section.services });
  } catch (error) {
    console.error("Error fetching service items:", error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching service items" });
  }
};

// Add a service item to an existing service section
const addServiceItem = async (req, res) => {
  const { sectionId } = req.params;
  const { icon, title, paragraph } = req.body;

  try {
    const updatedSection = await servicesSectionModel.findByIdAndUpdate(
      sectionId,
      {
        $push: {
          services: { icon, title, paragraph },
        },
      },
      { new: true }
    );

    if (!updatedSection) {
      return res
        .status(404)
        .json({ success: false, message: "Service section not found" });
    }

    res.status(200).json({
      success: true,
      message: "Service item added",
      data: updatedSection,
    });
  } catch (error) {
    console.error("Error adding service item:", error);
    res
      .status(500)
      .json({ success: false, message: "Error adding service item" });
  }
};

const editServiceItem = async (req, res) => {
  const { sectionId, itemId } = req.params;
  const { icon, title, paragraph } = req.body;

  try {
    // Trouver la section par ID
    const section = await servicesSectionModel.findById(sectionId);
    if (!section) {
      return res
        .status(404)
        .json({ success: false, message: "Service section not found" });
    }

    // Trouver l'item à modifier dans le tableau services
    const item = section.services.id(itemId);
    if (!item) {
      return res
        .status(404)
        .json({ success: false, message: "Service item not found" });
    }

    // Mettre à jour les champs (uniquement si fournis)
    if (icon !== undefined) item.icon = icon;
    if (title !== undefined) item.title = title;
    if (paragraph !== undefined) item.paragraph = paragraph;

    // Sauvegarder la section entière avec l'item modifié
    await section.save();

    res
      .status(200)
      .json({ success: true, message: "Service item updated", data: section });
  } catch (error) {
    console.error("Error editing service item:", error);
    res
      .status(500)
      .json({ success: false, message: "Error editing service item" });
  }
};

// Remove a service item from an existing service section
const removeServiceItem = async (req, res) => {
  const { sectionId, itemId } = req.params;

  try {
    const updatedSection = await servicesSectionModel.findByIdAndUpdate(
      sectionId,
      {
        $pull: {
          services: { _id: itemId },
        },
      },
      { new: true }
    );

    if (!updatedSection) {
      return res
        .status(404)
        .json({ success: false, message: "Service section not found" });
    }

    res.status(200).json({
      success: true,
      message: "Service item removed",
      data: updatedSection,
    });
  } catch (error) {
    console.error("Error removing service item:", error);
    res
      .status(500)
      .json({ success: false, message: "Error removing service item" });
  }
};

export {
  addServiceSection,
  listServiceSections,
  updateServiceSection,
  removeServiceSection,
  listServiceItems,
  addServiceItem,
  editServiceItem,
  removeServiceItem,
};
