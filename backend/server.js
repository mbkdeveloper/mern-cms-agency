import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import galerieRouter from "./routes/galerieRoute.js";
import userRouter from "./routes/userRoute.js";
import serviceRouter from "./routes/serviceRoute.js";
import "dotenv/config";

const app = express();
app.use(express.json());
app.use(cors());

// DB  Connection
connectDB();

// api endpoint
app.use("/api/users", userRouter);
app.use('/uploads', express.static('uploads'));

app.use("/api/galeries", galerieRouter);
app.use("/api/services", serviceRouter);

app.get("/", (req, res) => {
  res.send("API Working ");
});

// Démarrer le serveur
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Serveur en cours sur http://localhost:${PORT}`);
});
