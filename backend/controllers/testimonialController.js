import testimonialsSectionModel from "../models/testimonialModel.js";

// Add a new testimonials section
const addTestimonialSection = async (req, res) => {
  try {
    const { sectionTitle, sectionDescription, testimonials } = req.body;

    if (!sectionTitle || !sectionDescription) {
      return res.status(400).json({
        success: false,
        message: "Title and description are required",
      });
    }

    const newTestimonialSection = new testimonialsSectionModel({
      sectionTitle,
      sectionDescription,
      testimonials,
    });

    await newTestimonialSection.save();
    res.status(201).json({
      success: true,
      message: "Testimonial Section Added",
      data: newTestimonialSection,
    });
  } catch (error) {
    console.error("Error creating testimonial section:", error);
    res.status(500).json({
      success: false,
      message: "Error creating testimonial section",
    });
  }
};

// Get all testimonial sections
const listTestimonialSections = async (req, res) => {
  try {
    const testimonialSections = await testimonialsSectionModel.find({});
    res.status(200).json({ success: true, data: testimonialSections });
  } catch (error) {
    console.error("Error fetching testimonial sections:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching testimonial sections",
    });
  }
};

// Update a testimonial section
const updateTestimonialSection = async (req, res) => {
  const { id } = req.params;
  const { sectionTitle, sectionDescription, testimonials } = req.body;

  try {
    const updatedSection = await testimonialsSectionModel.findByIdAndUpdate(
      id,
      { sectionTitle, sectionDescription, testimonials },
      { new: true }
    );

    if (!updatedSection) {
      return res
        .status(404)
        .json({ success: false, message: "Testimonial section not found" });
    }

    res.status(200).json({
      success: true,
      message: "Testimonial Section Updated",
      data: updatedSection,
    });
  } catch (error) {
    console.error("Error updating testimonial section:", error);
    res.status(500).json({
      success: false,
      message: "Error updating testimonial section",
    });
  }
};

// Remove a testimonial section
const removeTestimonialSection = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedSection = await testimonialsSectionModel.findByIdAndDelete(id);

    if (!deletedSection) {
      return res
        .status(404)
        .json({ success: false, message: "Testimonial section not found" });
    }

    res.status(200).json({
      success: true,
      message: "Testimonial section removed successfully",
    });
  } catch (error) {
    console.error("Error removing testimonial section:", error);
    res.status(500).json({
      success: false,
      message: "Error removing testimonial section",
    });
  }
};

// List testimonial items in a section
const listTestimonialItems = async (req, res) => {
  const { sectionId } = req.params;

  try {
    const section = await testimonialsSectionModel.findById(sectionId);

    if (!section) {
      return res
        .status(404)
        .json({ success: false, message: "Testimonial section not found" });
    }

    res.status(200).json({ success: true, data: section.testimonials });
  } catch (error) {
    console.error("Error fetching testimonial items:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching testimonial items",
    });
  }
};

// Add a testimonial item to a section
const addTestimonialItem = async (req, res) => {
  const { sectionId } = req.params;
  const { writer, paragraph } = req.body;

  try {
    const updatedSection = await testimonialsSectionModel.findByIdAndUpdate(
      sectionId,
      {
        $push: {
          testimonials: { writer, paragraph },
        },
      },
      { new: true }
    );

    if (!updatedSection) {
      return res
        .status(404)
        .json({ success: false, message: "Testimonial section not found" });
    }

    res.status(200).json({
      success: true,
      message: "Testimonial item added",
      data: updatedSection,
    });
  } catch (error) {
    console.error("Error adding testimonial item:", error);
    res.status(500).json({
      success: false,
      message: "Error adding testimonial item",
    });
  }
};

// Edit a testimonial item
const editTestimonialItem = async (req, res) => {
  const { sectionId, itemId } = req.params;
  const { writer, paragraph } = req.body;

  try {
    const section = await testimonialsSectionModel.findById(sectionId);
    if (!section) {
      return res
        .status(404)
        .json({ success: false, message: "Testimonial section not found" });
    }

    const item = section.testimonials.id(itemId);
    if (!item) {
      return res
        .status(404)
        .json({ success: false, message: "Testimonial item not found" });
    }

    if (writer !== undefined) item.writer = writer;
    if (paragraph !== undefined) item.paragraph = paragraph;

    await section.save();

    res.status(200).json({
      success: true,
      message: "Testimonial item updated",
      data: section,
    });
  } catch (error) {
    console.error("Error editing testimonial item:", error);
    res.status(500).json({
      success: false,
      message: "Error editing testimonial item",
    });
  }
};

// Remove a testimonial item
const removeTestimonialItem = async (req, res) => {
  const { sectionId, itemId } = req.params;

  try {
    const updatedSection = await testimonialsSectionModel.findByIdAndUpdate(
      sectionId,
      {
        $pull: {
          testimonials: { _id: itemId },
        },
      },
      { new: true }
    );

    if (!updatedSection) {
      return res
        .status(404)
        .json({ success: false, message: "Testimonial section not found" });
    }

    res.status(200).json({
      success: true,
      message: "Testimonial item removed",
      data: updatedSection,
    });
  } catch (error) {
    console.error("Error removing testimonial item:", error);
    res.status(500).json({
      success: false,
      message: "Error removing testimonial item",
    });
  }
};

export {
  addTestimonialSection,
  listTestimonialSections,
  updateTestimonialSection,
  removeTestimonialSection,
  listTestimonialItems,
  addTestimonialItem,
  editTestimonialItem,
  removeTestimonialItem,
};
