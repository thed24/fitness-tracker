import axios from "axios";

const host = "http://13.238.79.62/";

export const client = axios.create({
  baseURL: host
});
