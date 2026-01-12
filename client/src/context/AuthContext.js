import {
	createContext,
	useContext,
	useEffect,
	useState,
	useCallback,
} from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [token, setToken] = useState(null);
	const [loading, setLoading] = useState(true);

	// 🚪 LOGOUT FUNCTION
	const logout = useCallback(() => {
		setUser(null);
		setToken(null);
		localStorage.removeItem("user");
		localStorage.removeItem("token");
		localStorage.removeItem("refreshToken");
	}, []);

	// 🔁 PAGE REFRESH PE DATA WAPAS LOAD + TOKEN EXPIRY CHECK
	useEffect(() => {
		let interval;
		const storedUser = localStorage.getItem("user");
		const storedToken = localStorage.getItem("token");

		if (storedUser && storedToken) {
			setUser(JSON.parse(storedUser));
			setToken(storedToken);

			// Token expiry auto logout
			const decoded = JSON.parse(atob(storedToken.split(".")[1]));
			const expiresIn = decoded.exp * 1000 - Date.now();

			if (expiresIn <= 0) {
				logout();
			} else {
				interval = setTimeout(() => {
					logout();
					alert("Session expired. Please login again.");
				}, expiresIn);
			}
		}

		setLoading(false);

		return () => clearTimeout(interval);
	}, [logout]);

	// 🔐 LOGIN FUNCTION
	const login = (userData, accessToken) => {
		setUser(userData);
		setToken(accessToken);

		localStorage.setItem("user", JSON.stringify(userData));
		localStorage.setItem("token", accessToken);
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				token,
				login,
				logout,
				isAuth: !!user,
				loading,
			}}
		>
			{!loading && children}
		</AuthContext.Provider>
	);
};

// 🔥 CUSTOM HOOK
export const useAuth = () => useContext(AuthContext);
