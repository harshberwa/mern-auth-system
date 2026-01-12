import { useState } from "react";
import API from "../services/Api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const { login } = useAuth();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");

		try {
			const res = await API.post("/users/login", { email, password });

			// save tokens
			localStorage.setItem("token", res.data.accessToken);
			localStorage.setItem("refreshToken", res.data.refreshToken);

			login(res.data.user, res.data.accessToken);
			navigate("/dashboard");
		} catch (err) {
			setError(err.response?.data?.message || "Login failed");
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
			<form
				className="bg-white p-8 rounded-xl shadow-xl w-96"
				onSubmit={handleSubmit}
			>
				<h2 className="text-3xl font-bold text-center mb-6">Login</h2>

				{error && (
					<p className="text-center text-red-600 bg-red-100 p-2 rounded mb-4">
						{error}
					</p>
				)}

				<input
					className="w-full p-3 border rounded mb-4 focus:ring-2 focus:ring-indigo-500 outline-none"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>

				<input
					type="password"
					className="w-full p-3 border rounded mb-6 focus:ring-2 focus:ring-indigo-500 outline-none"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>

				<button className="w-full bg-indigo-600 text-white py-3 rounded font-semibold hover:bg-indigo-700 transition">
					Login
				</button>

				<p
					className="text-center mt-4 text-sm text-indigo-600 cursor-pointer hover:underline"
					onClick={() => navigate("/register")}
				>
					Create new account
				</p>
			</form>
		</div>
	);
}
