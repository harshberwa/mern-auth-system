import axios from "axios";

const API = axios.create({
	baseURL: "http://localhost:7000/api",
});

// Request interceptor: attach token
API.interceptors.request.use((config) => {
	const token = localStorage.getItem("token");
	if (token) config.headers.Authorization = `Bearer ${token}`;
	return config;
});

// Response interceptor: handle expired token
API.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		// 401 = token expired / invalid
		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;
			const refreshToken = localStorage.getItem("refreshToken");

			if (!refreshToken) {
				localStorage.clear();
				window.location.href = "/login";
				return Promise.reject(error);
			}

			try {
				const res = await axios.post(
					"http://localhost:7000/api/users/refresh-token",
					{ refreshToken }
				);

				localStorage.setItem("token", res.data.accessToken);

				originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`;
				return API(originalRequest); // retry original request
			} catch (err) {
				// refresh token invalid → logout
				localStorage.clear();
				window.location.href = "/login";
				return Promise.reject(err);
			}
		}

		return Promise.reject(error);
	}
);

export default API;
