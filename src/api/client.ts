import axios from "axios";
import Constants from "expo-constants";
// eslint-disable-next-line import/no-unresolved
import { API_URL } from "@env";

const { manifest } = Constants;

const isDev = manifest?.packagerOpts?.dev ?? true;
const host = isDev ? "https://408a-49-193-154-29.au.ngrok.io" : API_URL;

export const client = axios.create({
  baseURL: host
});
