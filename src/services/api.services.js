import axios from "axios";

const api = axios.create({
  baseURL: "https://node-app-files.herokuapp.com"
});

export default api;
