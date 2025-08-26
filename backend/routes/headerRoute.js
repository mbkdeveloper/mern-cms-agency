import express from "express";
import { addHeader, editHeader, listHeaders, removeHeader } from "../controllers/headerController.js";

const headerRouter = express.Router();

headerRouter.get("/", listHeaders);
headerRouter.post("/add", addHeader);
headerRouter.put("/edit/:id", editHeader);
headerRouter.delete("/remove/:id", removeHeader);

export default headerRouter;
