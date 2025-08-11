import express from "express";
import {
  addServiceSection,
  updateServiceSection,
  removeServiceSection,listServiceItems,
  addServiceItem,
  editServiceItem,
  removeServiceItem,
  listServiceSections,
} from "../controllers/serviceController.js";

const serviceRouter = express.Router();

serviceRouter.get("/", listServiceSections);
serviceRouter.post("/add", addServiceSection);
serviceRouter.put("/edit/:id", updateServiceSection);
serviceRouter.delete("/remove/:id", removeServiceSection);
serviceRouter.post("/:sectionId/item/add", addServiceItem);
serviceRouter.get("/:sectionId/items", listServiceItems);
serviceRouter.put("/:sectionId/item/edit/:itemId", editServiceItem);
serviceRouter.delete("/:sectionId/item/remove/:itemId", removeServiceItem);

export default serviceRouter;
