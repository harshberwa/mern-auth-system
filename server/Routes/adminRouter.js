import express from "express";
import { protect } from "../Middleware/authMiddleware.js";
import { isAdmin } from "../Middleware/adminMiddleware.js";
import User from "../Model/User.js";

const router = express.Router();

// 🔐 ADMIN ONLY: GET ALL USERS
router.get("/users", protect, isAdmin, async (req, res) => {
	const users = await User.find().select("-password");
	res.json(users);
});

export default router;
