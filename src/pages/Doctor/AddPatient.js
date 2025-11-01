import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddPatient = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    phone: "",
    email: "",
    allergies: "",
    nextVisit: "",
    status: "Active",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const authUser = localStorage.getItem("authUser");
      const token = authUser ? JSON.parse(authUser).token : null; 

      const res = await fetch("http://localhost:5000/doctor/addPatient", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Patient added successfully!", { position: "top-right" });
        navigate("/doctor/Patients"); // redirect to patients list
      } else {
        toast.error(data.message || "❌ Failed to add patient", { position: "top-right" });
      }
    } catch (error) {
      console.error("Error adding patient:", error);
      toast.error("⚠️ Server error while adding patient", { position: "top-right" });
    }
  };

  return (
    <div className="container py-2">
      <div
        className="card shadow-sm border-0 mx-auto"
        style={{ maxWidth: "1500px", borderRadius: "16px" }}
      >
        <div className="card-body p-5">
          <h3 className="fw-bold">🩺 Add New Patient</h3>

          <form onSubmit={handleSubmit} className="mt-5">
            <div className="row g-3">
              {/* Full Name */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">Full Name</label>
                <input
                  type="text"
                  className="form-control custom-input"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  required
                />
              </div>

              {/* Age */}
              <div className="col-md-3">
                <label className="form-label fw-semibold">Age</label>
                <input
                  type="number"
                  className="form-control custom-input"
                  name="age"
                  value={form.age}
                  onChange={handleChange}
                  placeholder="Age"
                  required
                />
              </div>

              {/* Gender */}
              <div className="col-md-3">
                <label className="form-label fw-semibold">Gender</label>
                <select
                  className="form-select custom-input"
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select...</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>

              {/* Phone */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">Phone</label>
                <input
                  type="text"
                  className="form-control custom-input"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="e.g. +91 98765 43210"
                  required
                />
              </div>

              {/* Email */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">Email</label>
                <input
                  type="email"
                  className="form-control custom-input"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter email address"
                  required
                />
              </div>

              {/* Allergies */}
              <div className="col-md-12">
                <label className="form-label fw-semibold">Allergies</label>
                <input
                  type="text"
                  className="form-control custom-input"
                  name="allergies"
                  value={form.allergies}
                  onChange={handleChange}
                  placeholder="List known allergies (if any)"
                />
              </div>

              {/* Next Visit */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">Next Visit</label>
                <input
                  type="date"
                  className="form-control custom-input"
                  name="nextVisit"
                  value={form.nextVisit}
                  onChange={handleChange}
                />
              </div>

              {/* Status */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">Status</label>
                <select
                  className="form-select custom-input"
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                >
                  <option>Active</option>
                  <option>Critical</option>
                </select>
              </div>
            </div>

            {/* Buttons */}
            <div className="d-flex justify-content-end gap-3 mt-4">
              <button
                type="button"
                className="btn btn-outline-secondary px-4"
                onClick={() => navigate("/doctor/Patients")}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn px-4"
                style={{
                  backgroundColor: "hsla(158, 64%, 52%, 1)",
                  color: "white",
                  borderRadius: "8px",
                  transition: "0.3s",
                }}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor = "hsla(158, 64%, 42%, 1)")
                }
                onMouseOut={(e) =>
                  (e.target.style.backgroundColor = "hsla(158, 64%, 52%, 1)")
                }
              >
                Save Patient
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Extra CSS for input styling */}
      <style>{`
        .custom-input {
          border-radius: 8px;
          transition: 0.3s ease-in-out;
        }
        .custom-input:focus {
          border-color: hsla(158, 64%, 52%, 1);
          box-shadow: 0 0 0 0.2rem hsla(158, 64%, 52%, 0.25);
        }
      `}</style>
    </div>
  );
};

export default AddPatient;
