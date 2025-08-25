import express from "express";
import {
  addServiceSection,
  updateServiceSection,
  removeServiceSection,
  listServiceItems,
  addServiceItem,
  editServiceItem,
  removeServiceItem,
  listServiceSections,
  getServiceDetails,
  addServiceDetails,
  updateServiceDetails,
  removeServiceDetails,
} from "../controllers/serviceController.js";

const serviceRouter = express.Router();

/* ----------------- Service Section Routes ----------------- */
serviceRouter.get("/", listServiceSections);
serviceRouter.post("/add", addServiceSection);
serviceRouter.put("/edit/:id", updateServiceSection);
serviceRouter.delete("/remove/:id", removeServiceSection);

/* ----------------- Service Item Routes ----------------- */
serviceRouter.get("/:sectionId/items", listServiceItems);
serviceRouter.post("/:sectionId/item/add", addServiceItem);
serviceRouter.put("/:sectionId/item/edit/:itemId", editServiceItem);
serviceRouter.delete("/:sectionId/item/remove/:itemId", removeServiceItem);

/* ----------------- Service Details Routes ----------------- */
serviceRouter.get("/:sectionId/item/:itemId/details", getServiceDetails);
serviceRouter.post("/:sectionId/item/:itemId/details/add", addServiceDetails);
serviceRouter.put("/:sectionId/item/:itemId/details/edit", updateServiceDetails);
serviceRouter.delete("/:sectionId/item/:itemId/details/remove", removeServiceDetails);

export default serviceRouter;
