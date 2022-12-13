import axios from 'axios';

// const host = "http://13.238.79.62/";
const host = 'https://7608-49-188-126-42.au.ngrok.io/';

export const client = axios.create({
  baseURL: host,
});
