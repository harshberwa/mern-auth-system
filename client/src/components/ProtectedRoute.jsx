import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
	const { isAuth, loading } = useAuth();

	if (loading) return <h2>Loading...</h2>;

	return isAuth ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
