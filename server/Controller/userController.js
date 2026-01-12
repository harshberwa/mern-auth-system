import User from "../Model/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateAccessToken = (user) => {
	return jwt.sign(
		{ id: user._id, role: user.userType },
		process.env.JWT_SECRET,
		{ expiresIn: "15m" }
	);
};

const generateRefreshToken = (user) => {
	return jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET, {
		expiresIn: "7d",
	});
};

// REGISTER
export const registerUser = async (req, res) => {
	try {
		const { name, email, password } = req.body;

		if (!name || !email || !password) {
			return res.status(400).json({ message: "All fields required" });
		}

		const exists = await User.findOne({ email });
		if (exists) {
			return res.status(400).json({ message: "User already exists" });
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const user = await User.create({
			name,
			email,
			password: hashedPassword,
		});

		const token = generateToken(user);

		res.status(201).json({
			message: "Registered successfully",
			token,
			user: {
				id: user._id,
				name: user.name,
				email: user.email,
				role: user.userType,
			},
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// LOGIN
export const loginUser = async (req, res) => {
	try {
		let { email, password } = req.body;

		email = email?.trim();
		password = password?.trim();

		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({ message: "Invalid credentials" });
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).json({ message: "Invalid credentials" });
		}

		const accessToken = generateAccessToken(user);
		const refreshToken = generateRefreshToken(user);

		res.json({
			message: "Login successful",
			accessToken,
			refreshToken,
			user: {
				id: user._id,
				name: user.name,
				email: user.email,
				role: user.userType,
			},
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
