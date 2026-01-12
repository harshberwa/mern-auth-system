import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import RoleProtectedRoute from "./components/RoleProtectedRoute";
import Unauthorized from "./pages/Unauthorized";

function App() {
	return (
		<Router>
			<Routes>
				{/* Default route */}
				<Route path="/" element={<Navigate to="/login" replace />} />

				{/* Public routes */}
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/unauthorized" element={<Unauthorized />} />

				{/* Protected routes */}
				<Route
					path="/dashboard"
					element={
						<RoleProtectedRoute allowedRoles={[0, 1]}>
							<Dashboard />
						</RoleProtectedRoute>
					}
				/>

				<Route
					path="/admin"
					element={
						<RoleProtectedRoute allowedRoles={[1]}>
							<AdminDashboard />
						</RoleProtectedRoute>
					}
				/>

				{/* Catch all route */}
				<Route path="*" element={<Navigate to="/login" replace />} />
			</Routes>
		</Router>
	);
}

export default App;
