import axios from 'axios';

// const host = "http://13.238.79.62/";
const host = 'https://e0b3-49-188-120-221.au.ngrok.io/';

export const client = axios.create({
  baseURL: host,
});
