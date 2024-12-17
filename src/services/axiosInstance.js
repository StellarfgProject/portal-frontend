import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: API_URL,
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Get token and email from sessionStorage
    const authData = JSON.parse(sessionStorage.getItem("auth"));

    if (authData) {
      const { token, userDetails } = authData;

      // Add Authorization and email headers to all requests except specific endpoints
      if (!config.url.includes("/auth/login") && !config.url.includes("/auth/verify-mfa")) {
        config.headers["Authorization"] = `Bearer ${token}`;
        config.headers["email"] = userDetails?.email;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor (Optional: Global Error Handling)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally (e.g., Unauthorized)
    if (error.response?.status === 401) {
      sessionStorage.clear(); // Clear session on unauthorized
      window.location.href = "/login"; // Redirect to login
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
