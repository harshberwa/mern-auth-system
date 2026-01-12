import express from "express";
import { registerUser, loginUser } from "../Controller/userController.js";
import { protect, adminOnly } from "../Middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/profile", protect, (req, res) => {
	res.json(req.user);
});

router.get("/admin-data", protect, adminOnly, (req, res) => {
	res.json({ message: "Welcome Admin 👑" });
});

router.get("/admin/dashboard", protect, adminOnly, (req, res) => {
	res.json({
		message: "Welcome to Admin Dashboard",
		admin: req.user,
		stats: {
			totalUsers: 120,
			activeUsers: 87,
		},
	});
});

router.post("/refresh-token", (req, res) => {
	const { refreshToken } = req.body;

	if (!refreshToken) {
		return res.status(401).json({ message: "No refresh token" });
	}

	try {
		const decoded = jwt.verify(
			refreshToken,
			process.env.JWT_REFRESH_SECRET
		);

		const newAccessToken = jwt.sign(
			{ id: decoded.id },
			process.env.JWT_SECRET,
			{ expiresIn: "15m" }
		);

		res.json({ accessToken: newAccessToken });
	} catch (error) {
		res.status(403).json({ message: "Invalid refresh token" });
	}
});

export default router;
