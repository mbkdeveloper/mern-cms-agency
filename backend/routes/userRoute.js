import express from "express";
import {
  loginUser,
  registerUser,
  updateProfile,
  deleteProfile,
  getProfile,
} from "../controllers/userController.js";
import authMiddleware from "../middleware/auth.js";
 import multer from "multer"

const userRouter = express.Router();

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

userRouter.post("/login", loginUser);
userRouter.post("/register", registerUser);
userRouter.get("/profile/me", authMiddleware,  upload.single("photo"), getProfile);
userRouter.put("/profile/me", authMiddleware, upload.single("photo"), updateProfile);
userRouter.delete("/profile/me", authMiddleware, deleteProfile);

export default userRouter;
