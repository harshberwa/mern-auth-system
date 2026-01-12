import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
	const user = JSON.parse(localStorage.getItem("user"));
	return user?.role === 1 ? children : <Navigate to="/dashboard" />;
}
