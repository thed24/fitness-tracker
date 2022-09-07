import axios from "axios";
import Constants from "expo-constants";
// eslint-disable-next-line import/no-unresolved
import { API_URL } from "@env";

const { manifest } = Constants;

const isDev = manifest?.packagerOpts?.dev ?? true;
const host = isDev ? "https://5ff6-49-193-184-210.au.ngrok.io" : API_URL;

export const client = axios.create({
  baseURL: host
});
