import axios from "axios";
const baseUrl = "https://dummyjson.com/";
const API = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});
export default API;
