import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaUserInjured,
  FaCalendarAlt,
  FaFileMedical,
  FaChartBar,
  FaCog,
  FaQuestionCircle,
  FaBell,
  FaSignOutAlt,
  FaUserCircle,
  FaCalendarCheck,
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";

const DashboardLayout = ({ children }) => {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [totalPatients, setTotalPatients] = useState(0);
  const [totalAppointments, setTotalAppointments] = useState(0);

  useEffect(() => {
    const fetchTotalPatients = async () => {
      try {
        const res = await fetch("http://localhost:5000/doctor/allPatient");
        const data = await res.json();
        const patients = Array.isArray(data) ? data : data.patients || [];
        setTotalPatients(patients.length);
      } catch (err) {
        console.error("Error fetching patients count", err);
      }
    };

    const fetchTotalAppointments = async () => {
      try {
        const res = await fetch("http://localhost:5000/patient/getAppointments");
        const data = await res.json();
        const appointments = Array.isArray(data) ? data : [];
        setTotalAppointments(appointments.length);
      } catch (err) {
        console.error("Error fetching appointments count", err);
      }
    };

    fetchTotalPatients();
    fetchTotalAppointments();
  }, []);


  // handle logout
  const handleLogout = () => {
    alert("Logged out!");
    navigate("doctor/login");
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div
        className="bg-light border-end vh-100 d-flex flex-column p-3"
        style={{ width: "260px" }}
      >
        {/* Logo */}
        <div className="d-flex align-items-center mb-4">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2966/2966484.png"
            alt="logo"
            width="35"
            className="me-2"
          />
          <div>
            <h5 className="mb-0 text-primary">HealthTracker</h5>
            <small className="text-muted">Rural Clinic Management</small>
          </div>
        </div>

        {/* Sidebar Menu */}
        <ul className="nav flex-column flex-grow-1">
          <li className="nav-item mb-2">
            <NavLink
              to="/doctor/dashboard"
              className={({ isActive }) =>
                `nav-link d-flex align-items-center px-3 py-2 rounded ${isActive
                  ? "bg-success text-white fw-bold"
                  : "text-dark hover-bg"
                }`
              }
            >
              <FaChartBar className="me-2" /> Dashboard
            </NavLink>
          </li>

          <li className="nav-item mb-2">
            <NavLink
              to="/doctor/setAvailibility"
              className={({ isActive }) =>
                `nav-link d-flex align-items-center px-3 py-2 rounded ${isActive
                  ? "bg-success text-white fw-bold"
                  : "text-dark hover-bg"
                }`
              }
            >
              <FaCalendarCheck className="me-2" /> Set Availibility
            </NavLink>
          </li>

          {/* ✅ Dynamic Patients Count */}
          <li className="nav-item mb-2">
            <NavLink
              to="/doctor/Patients"
              className={({ isActive }) =>
                `nav-link d-flex align-items-center px-3 py-2 rounded ${isActive
                  ? "bg-success text-white fw-bold"
                  : "text-dark hover-bg"
                }`
              }
            >
              <FaUserInjured className="me-2" /> Patients
              <span className="badge bg-success ms-auto">{totalPatients}</span>
            </NavLink>
          </li>

          <li className="nav-item mb-2">
            <NavLink
              to="/doctor/appointments"
              className={({ isActive }) =>
                `nav-link d-flex align-items-center px-3 py-2 rounded ${isActive ? "bg-success text-white fw-bold" : "text-dark hover-bg"
                }`
              }
            >
              <FaCalendarAlt className="me-2" /> Appointments
              <span className="badge bg-primary ms-auto">{totalAppointments}</span>
            </NavLink>
          </li>

          <li className="nav-item mb-2">
            <NavLink
              to="/doctor/healthRecords"
              className={({ isActive }) =>
                `nav-link d-flex align-items-center px-3 py-2 rounded ${isActive
                  ? "bg-success text-white fw-bold"
                  : "text-dark hover-bg"
                }`
              }
            >
              <FaFileMedical className="me-2" /> Health Records
            </NavLink>
          </li>

          <li className="nav-item mb-2">
            <NavLink
              to="/doctor/settings"
              className={({ isActive }) =>
                `nav-link d-flex align-items-center px-3 py-2 rounded ${isActive
                  ? "bg-success text-white fw-bold"
                  : "text-dark hover-bg"
                }`
              }
            >
              <FaCog className="me-2" /> Settings
            </NavLink>
          </li>

          <li className="nav-item mb-2">
            <NavLink
              to="/doctor/help"
              className={({ isActive }) =>
                `nav-link d-flex align-items-center px-3 py-2 rounded ${isActive
                  ? "bg-success text-white fw-bold"
                  : "text-dark hover-bg"
                }`
              }
            >
              <FaQuestionCircle className="me-2" /> Help & Support
            </NavLink>
          </li>
        </ul>

        {/* Logout Button (Fixed Bottom) */}
        <div className="mt-auto">
          <button
            className="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center"
            onClick={handleLogout}
          >
            <FaSignOutAlt className="me-2" /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center border-bottom p-3 bg-white position-relative">
          <div>
            <h5 className="mb-0">Doctor Panel</h5>
          </div>

          <div className="d-flex align-items-center">
            {/* Notification */}
            <div
              className="me-4 position-relative"
              onClick={() => setShowNotifications(!showNotifications)}
              style={{ cursor: "pointer" }}
            >
              <FaBell size={20} />
              <span
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                style={{ fontSize: "10px" }}
              >
                3
              </span>

              {/* Notifications dropdown */}
              {showNotifications && (
                <div
                  className="position-absolute bg-white border shadow rounded p-2 mt-2"
                  style={{ width: "250px", right: 0, zIndex: 1000 }}
                >
                  <p className="mb-1">🔔 Appointment with James</p>
                  <p className="mb-1">🔔 New Patient Registered</p>
                  <p className="mb-1">🔔 Report Ready</p>
                  <button
                    className="btn btn-sm btn-link p-0 mt-1"
                    onClick={() => navigate("/notifications")}
                  >
                    View All
                  </button>
                </div>
              )}
            </div>

            {/* Profile Menu */}
            <div
              className="d-flex align-items-center position-relative"
              style={{ cursor: "pointer" }}
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            >
              <div className="ms-2">
                <strong>Dr. Raj Miyani</strong>
                <br />
                <small className="text-muted">Primary Care Physician</small>
              </div>

              <div
                className="rounded-circle bg-success text-white d-flex justify-content-center align-items-center ms-2"
                style={{ width: "35px", height: "35px" }}
              >
                RM
              </div>
              {/* Dropdown */}
              {showProfileMenu && (
                <div
                  className="position-absolute bg-white border shadow rounded p-2"
                  style={{
                    right: 0,
                    width: "180px",
                    zIndex: 1000,
                    marginTop: "135px",
                  }}
                >
                  <button
                    className="dropdown-item"
                    onClick={() => navigate("/doctor/profile")}
                  >
                    <FaUserCircle className="me-2" /> Profile
                  </button>
                  <button
                    className="dropdown-item"
                    onClick={() => navigate("/settings")}
                  >
                    <FaCog className="me-2" /> Settings
                  </button>
                  <button
                    className="dropdown-item text-danger"
                    onClick={handleLogout}
                  >
                    <FaSignOutAlt className="me-2" /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-4">{children}</div>
      </div>

      {/* Hover style for sidebar */}
      <style>
        {`
          .hover-bg:hover {
            background-color: rgb(232, 245, 233);
            border-radius: 6px;
          }
        `}
      </style>
    </div>
  );
};

export default DashboardLayout;
