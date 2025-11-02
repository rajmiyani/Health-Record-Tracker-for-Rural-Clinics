// src/pages/Dashboard/DoctorDashboard.js
import React, { useEffect, useState } from "react";
import { FaUsers, FaHeartbeat, FaExclamationTriangle, FaCalendarAlt } from "react-icons/fa";
import MainIMG from "../../public/IMG/Dashboard-main.png";
import axios from "axios";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalPatients: 0,
    activePatients: 0,
    criticalPatients: 0,
    upcomingAppointments: 0,
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const { data } = await axios.get("https://health-record-tracker-for-rural-clinics.onrender.com/doctor/dashboard");
      setStats(data.stats);
      setRecentActivity(data.recentActivity);
      setAppointments(data.upcomingAppointments);
    } catch (error) {
      console.error("Error fetching dashboard:", error);
    }
  };

  return (
    <div className="container-fluid p-4">
      {/* Header Banner */}
      <div
        className="p-4 mb-4 text-white d-flex align-items-center"
        style={{
          background: `linear-gradient(135deg, #1976d2cc, #26a69acc), url(${MainIMG})`,
          borderRadius: "12px",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "150px",
        }}
      >
        <div>
          <h2 className="fw-bold">Welcome to HealthTracker</h2>
          <p className="mb-0">Comprehensive health record management for rural clinics</p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <div className="card shadow-sm p-3">
            <p className="fs-6 fw-semibold d-flex align-items-center gap-2">
              Total Patients <FaUsers className="text-primary" />
            </p>
            <h3  className="mt-2 text-primary">{stats.totalPatients}</h3>
            <p className="text-muted small">Registered in system</p>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm p-3">
            <p className="fs-6 fw-semibold d-flex align-items-center gap-2">
              Active Patients <FaHeartbeat className="text-success" />
            </p>
            <h3 className="mt-2 text-success">{stats.activePatients}</h3>
            <p className="text-muted small">Currently under care</p>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm p-3">
            <p className="fs-6 fw-semibold d-flex align-items-center gap-2">
              Critical Patients <FaExclamationTriangle className="text-danger" />
            </p>
            <h3 className="mt-2 text-danger">{stats.criticalPatients}</h3>
            <p className="text-muted small">Require immediate attention</p>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm p-3">
            <p className="fs-6 fw-semibold d-flex align-items-center gap-2">
              Upcoming Appointments <FaCalendarAlt className="text-warning" />
            </p>
            <h3 className="mt-2 text-warning">{stats.upcomingAppointments}</h3>
            <p className="text-muted small">Scheduled this month</p>
          </div>
        </div>
      </div>

      {/* Activity & Appointments Row */}
      <div className="row g-3">
        {/* Recent Activity */}
        <div className="col-md-6">
          <div className="card shadow-sm p-3">
            <p className="fs-6 fw-bold mb-3">Recent Activity</p>
            {recentActivity .length > 0 ? (
              recentActivity.map((activity, idx) => (
                <div key={idx} className="p-2 border-bottom">
                  <strong>{activity.patient?.name}</strong>
                  <div className="text-muted small">{activity.diagnosis}</div>
                  <div className="text-muted small">
                    {new Date(activity.date).toLocaleString()}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted small">No recent activity</p>
            )}
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="col-md-6">
          <div className="card shadow-sm p-3">
            <p className="fs-6 fw-bold mb-3">Upcoming Appointments</p>
            {appointments .length > 0 ? (
              appointments.map((appt, idx) => (
                <div key={idx} className="p-2 mb-2 rounded" style={{ background: "#e8f5e9" }}>
                  <strong>{appt.patient?.name}</strong>
                  <div className="text-muted small">{appt.reason}</div>
                  <div className="text-muted small">
                    {new Date(appt.date).toLocaleString()}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted small">No upcoming appointments</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
