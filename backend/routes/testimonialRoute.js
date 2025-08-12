import express from "express";
import {
  addTestimonialSection,
  updateTestimonialSection,
  removeTestimonialSection,
  listTestimonialItems,
  addTestimonialItem,
  editTestimonialItem,
  removeTestimonialItem,
  listTestimonialSections,
} from "../controllers/testimonialController.js";

const testimonialRouter = express.Router();

testimonialRouter.get("/", listTestimonialSections);
testimonialRouter.post("/add", addTestimonialSection);
testimonialRouter.put("/edit/:id", updateTestimonialSection);
testimonialRouter.delete("/remove/:id", removeTestimonialSection);

// testimonial items
testimonialRouter.post("/:sectionId/item/add", addTestimonialItem);
testimonialRouter.get("/:sectionId/items", listTestimonialItems);
testimonialRouter.put("/:sectionId/item/edit/:itemId", editTestimonialItem);
testimonialRouter.delete("/:sectionId/item/remove/:itemId", removeTestimonialItem);

export default testimonialRouter;
