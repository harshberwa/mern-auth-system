import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
	const { user, logout } = useAuth();
	const navigate = useNavigate();

	return (
		<nav className="flex justify-between p-4 bg-gray-800 text-white">
			<h1 className="font-bold">MyApp</h1>

			<div>
				{user?.role === 1 && (
					<button
						className="bg-purple-600 px-3 py-1 rounded mr-2"
						onClick={() => navigate("/admin")}
					>
						Admin Dashboard
					</button>
				)}

				<button
					className="bg-red-600 px-3 py-1 rounded"
					onClick={logout}
				>
					Logout
				</button>
			</div>
		</nav>
	);
};

export default Navbar;
