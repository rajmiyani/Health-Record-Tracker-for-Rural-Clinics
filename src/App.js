// src/App.js
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Layout
import DashboardLayout from "./components/DoctorDashboardLayout";

// Doctor Pages
import DoctorDashboard from "./pages/Doctor/Dashboard";
import Patients from "./pages/Doctor/Patients";
// import Appointments from "./pages/Doctor/Appointments";
// import Records from "./pages/Doctor/Records";
// import Analytics from "./pages/Doctor/Analytics";
// import Settings from "./pages/Doctor/Settings";
// import Help from "./pages/Doctor/Help";
import Profile from "./pages/Doctor/Profile";
// import Notifications from "./pages/Doctor/Notifications";

// Auth Pages
import DoctorLogin from "./pages/Auth/DoctorLogin";
import PatientRegister from "./pages/Auth/Register";
import PatientLogin from "./pages/Auth/PatientLogin";
import AddPatient from "./pages/Doctor/AddPatient";
import ViewRecords from "./pages/Doctor/ViewRecords";
import Schedule from "./pages/Doctor/Schedule";
import Appointments from "./pages/Doctor/Appointments";
import HealthRecords from "./pages/Doctor/HealthRecord";
import PatientLayout from "./components/PatientLayout";
import Dashboard from "./pages/Patients/Dashboard";
import AboutUs from "./pages/Patients/AboutUS";
import Speciality from "./pages/Patients/Speciality";
import FindDoctor from "./pages/Patients/FindDoctor";
import Appointment from "./pages/Patients/Appointment";
import Awards from "./pages/Patients/Awards";
import Blogs from "./pages/Patients/Blogs";
import FAQs from "./pages/Patients/FAQs";
import ContactUs from "./pages/Patients/ContactUs";
import ProfilePage from "./pages/Patients/Profile";
import AddRecord from "./pages/Doctor/AddRecord";
import SettingsPage from "./pages/Doctor/Settings";

function App() {
  return (
    <Routes>
      {/* Default redirect → Patient Login */}
      <Route path="/" element={<Navigate to="/patient/login" replace />} />

      {/* Doctor Auth */}
      <Route path="/doctor/login" element={<DoctorLogin />} />

      {/* Doctor Panel with Sidebar & Header */}
      <Route
        path="/doctor/dashboard"
        element={
          <DashboardLayout panel="doctor">
            <DoctorDashboard />
          </DashboardLayout>
        }
      />
      <Route
        path="doctor/patients"
        element={
          <DashboardLayout panel="doctor">
            <Patients />
          </DashboardLayout>
        }
      />
      <Route
        path="doctor/patients/addPatients"
        element={
          <DashboardLayout panel="doctor">
            <AddPatient />
          </DashboardLayout>
        }
      />
      <Route
        path="doctor/patients/:id"
        element={
          <DashboardLayout panel="doctor">
            <ViewRecords />
          </DashboardLayout>
        }
      />
      <Route
        path="doctor/patients/:id/schedule"
        element={
          <DashboardLayout panel="doctor">
            <Schedule />
          </DashboardLayout>
        }
      />
      <Route
        path="doctor/scheduleAppointments"
        element={
          <DashboardLayout panel="doctor">
            <Schedule />
          </DashboardLayout>
        }
      />
      <Route
        path="doctor/appointments"
        element={
          <DashboardLayout panel="doctor">
            <Appointments />
          </DashboardLayout>
        }
      />
      <Route
        path="doctor/healthRecords"
        element={
          <DashboardLayout panel="doctor">
            <HealthRecords />
          </DashboardLayout>
        }
      />
      <Route
        path="doctor/newRecord"
        element={
          <DashboardLayout panel="doctor">
            <AddRecord />
          </DashboardLayout>
        }
      />
      <Route
        path="doctor/Settings"
        element={
          <DashboardLayout panel="doctor">
            <SettingsPage />
          </DashboardLayout>
        }
      />
      <Route
        path="doctor/profile"
        element={
          <DashboardLayout panel="doctor">
            <Profile />
          </DashboardLayout>
        }
      />


      {/* Patient Auth */}
      <Route path="/patient/register" element={<PatientRegister />} />
      <Route path="/patient/login" element={<PatientLogin />} />

      {/* Patient Dashboard */}
      <Route
        path="/patient/dashboard"
        element={
          <PatientLayout panel="patient">
            <Dashboard />
          </PatientLayout>
        }
      />
      <Route
        path="/patients/about-us"
        element={
          <PatientLayout panel="patient">
            <AboutUs />
          </PatientLayout>
        }
      />
      <Route
        path="/patients/specialties"
        element={
          <PatientLayout panel="patient">
            <Speciality />
          </PatientLayout>
        }
      />
      <Route
        path="/patients/doctors"
        element={
          <PatientLayout panel="patient">
            <FindDoctor />
          </PatientLayout>
        }
      />
      <Route
        path="/patients/my-appointments"
        element={
          <PatientLayout panel="patient">
            <Appointment />
          </PatientLayout>
        }
      />
      <Route
        path="/patients/awards"
        element={
          <PatientLayout panel="patient">
            <Awards />
          </PatientLayout>
        }
      />
      <Route
        path="/patients/blogs"
        element={
          <PatientLayout panel="patient">
            <Blogs />
          </PatientLayout>
        }
      />
      <Route
        path="/patients/faqs"
        element={
          <PatientLayout panel="patient">
            <FAQs />
          </PatientLayout>
        }
      />
      <Route
        path="/patients/contact"
        element={
          <PatientLayout panel="patient">
            <ContactUs />
          </PatientLayout>
        }
      />
      <Route
        path="/patients/profile"
        element={
          <PatientLayout panel="patient">
            <ProfilePage />
          </PatientLayout>
        }
      />
    </Routes>
  );
}

export default App;
