import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.collectapi.com",
  headers: {
    "Content-Type": "application/json",
    Authorization: `apikey ${process.env.API_KEY}`,
  },
  withCredentials: true,
});

export default axiosInstance;
