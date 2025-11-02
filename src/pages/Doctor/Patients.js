// src/pages/Doctor/Patients.js
import React, { useState, useEffect } from "react";
import { FaPhone, FaEnvelope, FaExclamationTriangle, FaCalendarAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Patients = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All Patients");
  const [patients, setPatients] = useState([]);

  // Get localStorage profile as fallback
  const localProfile = JSON.parse(localStorage.getItem("PatientData") || "{}");

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await fetch("https://health-record-tracker-for-rural-clinics.onrender.com/doctor/allPatient");
        const data = await res.json();
        // Ensure array
        setPatients(Array.isArray(data) ? data : data.patients || []);
      } catch (err) {
        console.error("Error fetching patients", err);
      }
    };
    fetchPatients();
  }, []);

  // Filter patients
  const filteredPatients = patients.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.phone.toLowerCase().includes(search.toLowerCase());
    const matchesFilter =
      filter === "All Patients" ? true : p.status === filter;
    return matchesSearch && matchesFilter;
  });

  // Format date & time
  const formatDateTime = (dateStr) => {
    if (!dateStr) return "-";
    const dateObj = new Date(dateStr);
    const optionsDate = { day: "2-digit", month: "2-digit", year: "numeric" };
    const optionsTime = { hour: "2-digit", minute: "2-digit", hour12: true };
    const formattedDate = dateObj.toLocaleDateString("en-GB", optionsDate); // DD-MM-YYYY
    const formattedTime = dateObj.toLocaleTimeString("en-US", optionsTime); // hh:mm AM/PM
    return `${formattedDate} ${formattedTime}`;
  };

  // Get Next appointment date (latest one in appointments array)
  const getNextAppointmentDate = (appointments = []) => {
    if (!appointments.length) return null;
    const sorted = [...appointments].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    return sorted[0].date; // latest appointment
  };


  return (
    <div className="container-fluid p-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold">Patient Directory</h3>
          <p className="text-muted mb-0">Manage and view all patient records</p>
        </div>
        <button
          className="p-2 rounded text-white"
          style={{ backgroundColor: "#28a745", border: "none" }}
          onClick={() => navigate("/doctor/patients/addPatients")}
        >
          + Add Patient
        </button>
      </div>

      {/* Search + Filter */}
      <div className="d-flex flex-wrap gap-2 mb-4">
        <input
          type="text"
          className="form-control search-input"
          placeholder="Search patients by name or phone..."
          style={{ maxWidth: "970px" }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="form-select"
          style={{ maxWidth: "185px" }}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option>All Patients</option>
          <option>Active</option>
          <option>Critical</option>
        </select>
      </div>

      {/* Patient Cards */}
      <div className="row g-3">
        {filteredPatients.length > 0 ? (
          filteredPatients.map((patient) => {
            const patientImage =
              patient.profileImage ||
              patient.img ||
              localProfile.profileImage ||
              "https://via.placeholder.com/50";

            return (
              <div key={patient._id} className="col-12 col-md-6 col-lg-4">
                <div className="card shadow-sm h-100 border-0 patient-card">
                  <div className="card-body">
                    {/* Header with Image */}
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div className="d-flex align-items-center">
                        <img
                          src={patientImage}
                          alt={patient.name}
                          className="rounded-circle me-3"
                          style={{ width: "50px", height: "50px", objectFit: "cover" }}
                        />
                        <div>
                          <h5 className="mb-0 fw-bold">{patient.name}</h5>
                          <small className="text-muted">
                            Age {patient.age} • {patient.gender}
                          </small>
                        </div>
                      </div>
                      <span
                        className={`badge rounded-pill ${patient.status === "Active"
                          ? "bg-success"
                          : patient.status === "Critical"
                            ? "bg-danger"
                            : "bg-secondary"
                          }`}
                      >
                        {patient.status}
                      </span>
                    </div>

                    {/* Contact */}
                    <p className="mb-1 text-muted">
                      <FaPhone className="me-2 text-primary" /> {patient.phone}
                    </p>
                    <p className="mb-1 text-muted">
                      <FaEnvelope className="me-2 text-primary" /> {patient.email}
                    </p>

                    {/* Allergies */}
                    {patient.allergies && (
                      <p className="mb-1 text-danger">
                        <FaExclamationTriangle className="me-2" /> Allergies:{" "}
                        <strong>{patient.allergies}</strong>
                      </p>
                    )}

                    <hr />

                    {/* Next Visit */}
                    <p className="mb-3">
                      <FaCalendarAlt className="me-2 text-primary" /> Next Appointment:{" "}
                      <strong>{formatDateTime(getNextAppointmentDate(patient.appointments))}</strong>
                    </p>

                    {/* Buttons */}
                    <div className="d-flex justify-content-between">
                      <button
                        className="btn btn-outline-primary w-100 me-2"
                        onClick={() => navigate(`/doctor/patients/${patient._id}`)}
                      >
                        View Records
                      </button>
                      <button
                        className="btn btn-outline-secondary w-100"
                        onClick={() =>
                          navigate(`/doctor/patients/${patient._id}/schedule`)
                        }
                      >
                        Schedule
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-muted">No patients found.</p>
        )}
      </div>

      {/* Styling */}
      <style>{`
        .patient-card {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .patient-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 6px 16px rgba(0,0,0,0.15);
        }
        .btn-primary:hover {
          background-color: #004aad !important;
          border-color: #004aad !important;
        }
        .btn-outline-primary:hover {
          background-color: #1976d2 !important;
          color: white !important;
        }
        .btn-outline-secondary:hover {
          background-color: #6c757d !important;
          color: white !important;
        }
        .search-input:focus {
          border-color: #1976d2 !important;
          box-shadow: 0 0 0 0.25rem rgba(25, 118, 210, 0.25) !important;
        }
      `}</style>
    </div>
  );
};

export default Patients;
