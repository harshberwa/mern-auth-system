import { useState } from "react";
import API from "../services/Api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const { login } = useAuth();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");

		// Simple frontend validation
		if (!name || !email || !password) {
			setError("All fields are required");
			return;
		}

		try {
			const res = await API.post("/users/register", {
				name,
				email,
				password,
			});

			// 🔑 Auto login after registration
			localStorage.setItem("token", res.data.accessToken);
			localStorage.setItem("refreshToken", res.data.refreshToken);

			login(res.data.user, res.data.accessToken);

			navigate("/dashboard");
		} catch (err) {
			setError(err.response?.data?.message || "Registration failed");
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-600">
			<form
				className="bg-white p-8 rounded-xl shadow-xl w-96"
				onSubmit={handleSubmit}
			>
				<h2 className="text-3xl font-bold text-center mb-6">
					Register
				</h2>

				{error && (
					<p className="text-center text-red-600 bg-red-100 p-2 rounded mb-4">
						{error}
					</p>
				)}

				<input
					className="w-full p-3 border rounded mb-4 focus:ring-2 focus:ring-purple-500 outline-none"
					placeholder="Name"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>

				<input
					className="w-full p-3 border rounded mb-4 focus:ring-2 focus:ring-purple-500 outline-none"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>

				<input
					type="password"
					className="w-full p-3 border rounded mb-6 focus:ring-2 focus:ring-purple-500 outline-none"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>

				<button className="w-full bg-purple-600 text-white py-3 rounded font-semibold hover:bg-purple-700 transition">
					Register
				</button>

				<p
					className="text-center mt-4 text-sm text-purple-600 cursor-pointer hover:underline"
					onClick={() => navigate("/login")}
				>
					Already have an account? Login
				</p>
			</form>
		</div>
	);
}
