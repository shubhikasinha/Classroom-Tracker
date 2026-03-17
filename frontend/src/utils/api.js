import axios from 'axios';

// Create a base API instance with the correct port
const API = axios.create({
  baseURL: 'http://localhost:8081',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

export default API; 