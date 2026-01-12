import { useEffect, useState } from "react";
import API from "../services/Api";
import { useAuth } from "../context/AuthContext";

const AdminDashboard = () => {
	const [users, setUsers] = useState([]);
	const { user } = useAuth();

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const res = await API.get("/admin/users"); // backend admin API
				setUsers(res.data);
			} catch (err) {
				alert("Access denied");
			}
		};

		fetchUsers();
	}, []);

	return (
		<div className="p-8">
			<h1 className="text-3xl font-bold mb-6">Admin Dashboard 👑</h1>

			<p className="mb-4">
				Welcome, {user?.name} (Role:{" "}
				{user?.role === 1 ? "Admin" : "User"})
			</p>

			<h2 className="text-2xl font-semibold mb-4">All Users</h2>

			<table className="min-w-full bg-white border">
				<thead>
					<tr>
						<th className="border px-4 py-2">ID</th>
						<th className="border px-4 py-2">Name</th>
						<th className="border px-4 py-2">Email</th>
						<th className="border px-4 py-2">Role</th>
					</tr>
				</thead>
				<tbody>
					{users.map((u) => (
						<tr key={u._id}>
							<td className="border px-4 py-2">{u._id}</td>
							<td className="border px-4 py-2">{u.name}</td>
							<td className="border px-4 py-2">{u.email}</td>
							<td className="border px-4 py-2">
								{u.userType === 1 ? "Admin" : "User"}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default AdminDashboard;
