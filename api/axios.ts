import axios from "axios";

export const baseURL = "https://allra-front-assignment.vercel.app";

const axiosInstance = axios.create({
  baseURL,
});

export default axiosInstance;
