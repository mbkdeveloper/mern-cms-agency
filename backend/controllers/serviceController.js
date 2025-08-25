import servicesSectionModel from "../models/serviceModel.js";

// Add a new service section
const addServiceSection = async (req, res) => {
  try {
    const { sectionTitle, sectionDescription, visibility, services } = req.body;

    if (!sectionTitle || !sectionDescription) {
      return res.status(400).json({
        success: false,
        message: "Title and description are required",
      });
    }

    const newServiceSection = new servicesSectionModel({
      sectionTitle,
      sectionDescription,
      visibility: visibility !== undefined ? visibility : true, // ✅ handles visibility
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
  const { sectionTitle, sectionDescription, visibility, services } = req.body;

  try {
    const updatedSection = await servicesSectionModel.findByIdAndUpdate(
      id,
      {
        ...(sectionTitle !== undefined && { sectionTitle }),
        ...(sectionDescription !== undefined && { sectionDescription }),
        ...(visibility !== undefined && { visibility }), // ✅ handle visibility update
        ...(services !== undefined && { services }),
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
    const section = await servicesSectionModel.findById(sectionId);
    if (!section) {
      return res
        .status(404)
        .json({ success: false, message: "Service section not found" });
    }

    const item = section.services.id(itemId);
    if (!item) {
      return res
        .status(404)
        .json({ success: false, message: "Service item not found" });
    }

    if (icon !== undefined) item.icon = icon;
    if (title !== undefined) item.title = title;
    if (paragraph !== undefined) item.paragraph = paragraph;

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

/* ----------------- SERVICE DETAILS (inside service item) ------------------ */

// Get details of a specific service item
const getServiceDetails = async (req, res) => {
  const { sectionId, itemId } = req.params;

  try {
    const section = await servicesSectionModel.findById(sectionId);
    if (!section)
      return res
        .status(404)
        .json({ success: false, message: "Service section not found" });

    const item = section.services.id(itemId);
    if (!item)
      return res
        .status(404)
        .json({ success: false, message: "Service item not found" });

    res.status(200).json({ success: true, data: item.details || null });
  } catch (error) {
    console.error("Error fetching service details:", error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching service details" });
  }
};

// Add details to a service item (only if not already present)
const addServiceDetails = async (req, res) => {
  const { sectionId, itemId } = req.params;
  const { heading, subHeading, description, additionalInfo, media } = req.body;

  try {
    const section = await servicesSectionModel.findById(sectionId);
    if (!section)
      return res
        .status(404)
        .json({ success: false, message: "Service section not found" });

    const item = section.services.id(itemId);
    if (!item)
      return res
        .status(404)
        .json({ success: false, message: "Service item not found" });

    if (item.details && Object.keys(item.details.toObject()).length > 0) {
      return res.status(400).json({
        success: false,
        message: "Details already exist. Use update instead.",
      });
    }

    item.details = { heading, subHeading, description, additionalInfo, media };
    await section.save();

    res.status(201).json({
      success: true,
      message: "Service details added",
      data: item.details,
    });
  } catch (error) {
    console.error("Error adding service details:", error);
    res
      .status(500)
      .json({ success: false, message: "Error adding service details" });
  }
};

// Update details of a service item (creates if not exists)
const updateServiceDetails = async (req, res) => {
  const { sectionId, itemId } = req.params;
  const { heading, subHeading, description, additionalInfo, media } = req.body;

  try {
    const section = await servicesSectionModel.findById(sectionId);
    if (!section)
      return res
        .status(404)
        .json({ success: false, message: "Service section not found" });

    const item = section.services.id(itemId);
    if (!item)
      return res
        .status(404)
        .json({ success: false, message: "Service item not found" });

    if (!item.details) {
      // auto-create details if missing
      item.details = {};
    }

    if (heading !== undefined) item.details.heading = heading;
    if (subHeading !== undefined) item.details.subHeading = subHeading;
    if (description !== undefined) item.details.description = description;
    if (additionalInfo !== undefined)
      item.details.additionalInfo = additionalInfo;
    if (media !== undefined) item.details.media = media;

    await section.save();

    res.status(200).json({
      success: true,
      message: "Service details updated",
      data: item.details,
    });
  } catch (error) {
    console.error("Error updating service details:", error);
    res
      .status(500)
      .json({ success: false, message: "Error updating service details" });
  }
};

// Remove details from a service item
const removeServiceDetails = async (req, res) => {
  const { sectionId, itemId } = req.params;

  try {
    const section = await servicesSectionModel.findById(sectionId);
    if (!section)
      return res
        .status(404)
        .json({ success: false, message: "Service section not found" });

    const item = section.services.id(itemId);
    if (!item)
      return res
        .status(404)
        .json({ success: false, message: "Service item not found" });

    item.details = undefined;
    await section.save();

    res.status(200).json({
      success: true,
      message: "Service details removed",
    });
  } catch (error) {
    console.error("Error removing service details:", error);
    res
      .status(500)
      .json({ success: false, message: "Error removing service details" });
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
  getServiceDetails,
  addServiceDetails,
  updateServiceDetails,
  removeServiceDetails,
};
