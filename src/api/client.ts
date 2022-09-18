import axios from "axios";
import Constants from "expo-constants";
// eslint-disable-next-line import/no-unresolved
import { API_URL } from "@env";

const { manifest } = Constants;

const isDev = manifest?.packagerOpts?.dev ?? true;
const host = isDev
  ? "http://ec2-13-238-79-62.ap-southeast-2.compute.amazonaws.com/"
  : API_URL;

export const client = axios.create({
  baseURL: host
});
