import express from "express";
import {
  addgalerie,
  editgalerie,
  listgalerie,
  removegalerie,
} from "../controllers/galerieController.js";
import multer from "multer";

const galerieRouter = express.Router();

// image storage Engine
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

galerieRouter.get("/", listgalerie);
galerieRouter.post("/add", upload.single("image"), addgalerie);
galerieRouter.put("/edit/:id", upload.single("image"), editgalerie);
galerieRouter.delete("/remove/:id", removegalerie);

export default galerieRouter;
