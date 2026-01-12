import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RoleProtectedRoute({ allowedRoles, children }) {
	const { user, loading } = useAuth();

	if (loading) return null; // or loader

	if (!user) return <Navigate to="/login" replace />;

	if (!allowedRoles.includes(user.role))
		return <Navigate to="/unauthorized" replace />;

	return children;
}
