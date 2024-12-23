import "dotenv/config";
import express, { json } from "express";
import cors from "cors";
import usersRoutes from "./routes/usersRouter.js";
import admin from "firebase-admin";
import { config as dotenvConfig } from "dotenv";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });
}
const app = express();
const PORT = process.env.PORT || 3001;
app.use(cors());
app.use(json());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ success: true });
});
app.use("/users", usersRoutes);

dotenvConfig();

app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);
});
