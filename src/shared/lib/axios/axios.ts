
import axios from 'axios';

const API = axios.create({
  baseURL: 'https://genbiadmin1.vercel.app/api/v1/openapi.json', 
  headers: {'Content-Type': 'application/json' },
});

export default API;

