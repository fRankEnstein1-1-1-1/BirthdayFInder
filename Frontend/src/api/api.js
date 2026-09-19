import axios from "axios";

// import.meta.env.DEV is built into Vite (no .env file needed):
// true when you run `npm run dev`, false in the Vercel build.
const BASE_URL = import.meta.env.DEV
  ? "http://localhost:5000"
  : "https://birthdayfinder.onrender.com"; // replace with your Render URL

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 60000, // Render's free tier can take up to 60s to wake up
  headers: { "Content-Type": "application/json" },
});

export default api;