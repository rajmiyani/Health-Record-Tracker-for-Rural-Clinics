import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaStickyNote, FaUserMd } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Schedule = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    date: "",
    doctor: "",
    notes: "",
    status: "Scheduled",
  });

  const token = localStorage.getItem("authToken"); // your saved token

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:5000/doctor/addAppointment/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to add appointment");
      }

      const data = await res.json();
      toast.success(" Appointment saved successfully!");
      setTimeout(() => {
        navigate("/doctor/Patients");
      }, 1500);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="container py-4">
      <ToastContainer position="top-right" autoClose={3000} />

      <h3 className="fw-bold mb-4" style={{ color: "#28a745" }}>
        📅 Schedule Appointment{" "}
        <span className="text-dark fs-5">(Patient ID: {id})</span>
      </h3>

      <div className="card shadow-lg border-0 rounded-3">
        <div
          className="card-header text-white fw-semibold"
          style={{ backgroundColor: "#28a745" }}
        >
          Appointment Details
        </div>

        <div className="card-body p-4">
          <form onSubmit={handleSubmit}>
            {/* Appointment Date */}
            <div className="mb-3">
              <label className="form-label fw-semibold">
                <FaCalendarAlt className="me-2" style={{ color: "#28a745" }} />
                Appointment Date
              </label>
              <input
                type="date"
                name="date"
                className="form-control shadow-sm"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>

            {/* Doctor Name */}
            <div className="mb-3">
              <label className="form-label fw-semibold">
                <FaUserMd className="me-2" style={{ color: "#28a745" }} />
                Doctor
              </label>
              <input
                type="text"
                name="doctor"
                className="form-control shadow-sm"
                placeholder="Enter doctor name"
                value={formData.doctor}
                onChange={handleChange}
                required
              />
            </div>

            {/* Notes */}
            <div className="mb-3">
              <label className="form-label fw-semibold">
                <FaStickyNote className="me-2" style={{ color: "#28a745" }} />
                Notes
              </label>
              <textarea
                name="notes"
                className="form-control shadow-sm"
                rows="3"
                placeholder="Add important notes for the appointment..."
                value={formData.notes}
                onChange={handleChange}
              ></textarea>
            </div>

            {/* Status */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Status</label>
              <select
                name="status"
                className="form-select shadow-sm"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Scheduled">Scheduled</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            {/* Buttons */}
            <div className="d-flex justify-content-end">
              <button
                type="button"
                className="btn btn-outline-secondary me-2 px-4"
                onClick={() => navigate("/doctor/patients")}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn px-4"
                style={{ backgroundColor: "#28a745", color: "white" }}
              >
                Save Appointment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
