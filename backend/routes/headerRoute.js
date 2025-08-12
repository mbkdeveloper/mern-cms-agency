import express from "express";
import { addHeader, editHeader, listHeaders, removeHeader } from "../controllers/headerController.js";
import multer from "multer";

const headerRouter = express.Router();

// image storage Engine
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

headerRouter.get("/", listHeaders);
headerRouter.post("/add", upload.single("image"), addHeader);
headerRouter.put("/edit/:id", upload.single("image"), editHeader);
headerRouter.delete("/remove/:id", removeHeader);

export default headerRouter;
