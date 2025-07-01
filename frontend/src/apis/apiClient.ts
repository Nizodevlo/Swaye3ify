import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";

const apiClient: AxiosInstance = axios.create({
  baseURL: "http://localhost:5001/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Ensure cookies are sent along with requests
});

// Request interceptor to attach the access token
apiClient.interceptors.request.use(
  (config) => {
    const accessToken = sessionStorage.getItem("accessToken");

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
