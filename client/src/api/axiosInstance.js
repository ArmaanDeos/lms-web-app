import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:2212",
  // withCredentials: true,
  // headers: {
  //   "Content-Type": "application/json",
  // },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken =
      JSON.parse(sessionStorage.getItem("accessToken")) || " ";
    // console.log(accessToken);
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default axiosInstance;
