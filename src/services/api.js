// services/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "https://health-record-tracker-for-rural-clinics.onrender.com/", // Backend API
});

// const API = axios.create({
//   baseURL: "http://localhost:5000/", // Backend API
// });

// Automatically attach token if exists
API.interceptors.request.use((config) => {
  const storedUser = localStorage.getItem("authUser");

  if (storedUser) {
    try {
      const parsedUser = JSON.parse(storedUser); // convert string → object
      const token = parsedUser?.token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (err) {
      console.error("Error parsing authUser from localStorage", err);
    }
  }

  return config;
});


// ====================== AUTH ======================
// Patient register
export const registerPatient = (data) => API.post("/auth/register", data);

// Patient login
export const loginPatient = (data) => API.post("/auth/login", data);
export const forgotPassword = (data) => API.post("/auth/forgot-password", data);
export const verifyOtp = (data) => API.post("/auth/verify-otp", data);
export const resetPassword = (data) => API.post("/auth/update-password", data);

// Doctor login
export const loginDoctor = (data) => API.post("/auth/doctor/login", data);

// ====================== PATIENT ======================
// Book Appointment
export const BookAppointment = (data) => API.post("/patient/bookAppointment", data);

// Get Appointments
export const GetAppointments = () => API.get("/patient/getAppointments");

export const getPatientProfile = () => API.get("patient/getProfile");
export const updatePatientProfile = (data) => API.put("/patient/updateProfile", data);

export default API;
