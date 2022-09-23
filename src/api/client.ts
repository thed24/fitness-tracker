import axios from "axios";
import Constants from "expo-constants";
import { API_URL } from "@env";

const { manifest } = Constants;

const isDev = manifest?.packagerOpts?.dev ?? true;
const host = isDev ? "http://13.238.79.62/" : API_URL;

export const client = axios.create({
  baseURL: host
});
