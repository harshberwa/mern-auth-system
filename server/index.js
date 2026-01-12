import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";
import userRoutes from "./Routes/userRouter.js";
import adminRoutes from "./Routes/adminRouter.js";

const app = express();
const PORT = process.env.PORT || 7000;

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
