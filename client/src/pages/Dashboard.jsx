import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
	const { user } = useAuth();
	const navigate = useNavigate();

	return (
		<div className="min-h-screen bg-gray-100 flex items-center justify-center">
			<div className="bg-white p-10 rounded-xl shadow-lg text-center">
				<h1 className="text-3xl font-bold mb-2">
					Welcome, {user?.name} 🎉
				</h1>
				<p className="text-gray-600 mb-4">{user?.email}</p>

				<span className="inline-block px-4 py-1 rounded-full bg-indigo-100 text-indigo-600 text-sm">
					User Dashboard
				</span>
			</div>
			{user?.role === 1 && (
				<button
					onClick={() => navigate("/admin")}
					className="bg-purple-600 text-white px-4 py-2 rounded"
				>
					Go to Admin Panel
				</button>
			)}
		</div>
	);
}
