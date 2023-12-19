import axios from "axios";

// const apiURL = "http://localhost:3001/api/v1";
const apiURL = "https://sji-task-manager-api.vercel.app/api/v1";

export const axiosOpen = axios.create({
  baseURL: apiURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const axiosSecure = axios.create({
  baseURL: apiURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${localStorage.getItem("userToken")}`,
  },
});
