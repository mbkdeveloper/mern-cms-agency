// routes/messageRoutes.js
import express from "express";
import { sendMessage } from "../controllers/messageController.js";

const messageRouter = express.Router();

messageRouter.post("/", sendMessage);

export default messageRouter;
