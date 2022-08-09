import axios from "axios";
// eslint-disable-next-line import/no-unresolved
import { API_URL } from "@env";

export const client = axios.create({
  baseURL: API_URL
});
