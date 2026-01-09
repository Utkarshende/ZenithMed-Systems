import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const getMedicines = () => API.get("/medicines");

export default API;
