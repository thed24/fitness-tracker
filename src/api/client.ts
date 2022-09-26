import axios from "axios";
import Constants from "expo-constants";

const { manifest } = Constants;

const isDev = manifest?.packagerOpts?.dev ?? true;
const host = "http://13.238.79.62/";

export const client = axios.create({
  baseURL: host
});
