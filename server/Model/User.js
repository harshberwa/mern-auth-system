import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		userType: {
			type: Number,
			enum: [0, 1], // 0 = user, 1 = admin
			default: 0,
		},
	},
	{ timestamps: true }
);

export default mongoose.model("User", userSchema);
