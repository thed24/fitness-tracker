import axios from "axios";
import Constants from "expo-constants";
// eslint-disable-next-line import/no-unresolved
import { API_URL } from "@env";

const { manifest } = Constants;

const isDev = manifest?.packagerOpts?.dev ?? true;
const host = isDev ? "https://fd1b-49-193-217-186.au.ngrok.io" : API_URL;

export const client = axios.create({
  baseURL: host
});
