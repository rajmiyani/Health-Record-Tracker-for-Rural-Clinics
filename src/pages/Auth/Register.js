import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerPatient } from "../../services/api";   // ✅ fixed import
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaHome,
  FaBirthdayCake,
  FaVenusMars,
} from "react-icons/fa";

export default function PatientRegister() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    address: "",
    dob: "",
    gender: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      // ✅ Map frontend fields → backend expects { name, email, phone, password }
      const payload = {
        name: `${form.firstName} ${form.lastName}`,
        email: form.email,
        phone: form.mobile,
        password: form.password,
      };

      await registerPatient(payload);

      setLoading(false);
      toast.success("Patient registered successfully!");
      setTimeout(() => navigate("/patient/login"), 1200);
    } catch (err) {
      setLoading(false);
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(135deg, #2196f3, hsla(158, 64%, 52%, 1))",
      }}
    >
      <ToastContainer position="top-center" />

      <div
        className="card shadow-lg p-4"
        style={{
          width: "560px",
          borderRadius: "15px",
          background: "#fff",
        }}
      >
        <div className="text-center mb-4">
          <div style={{ fontSize: "40px", color: "hsla(158, 64%, 52%, 1)" }}>
            ❤
          </div>
          <h3 className="fw-bold">Patient Registration</h3>
          <p className="text-muted small">Create your HealthTracker account</p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* First + Last Name */}
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">First Name</label>
              <div className="input-group">
                <span className="input-group-text bg-light">
                  <FaUser />
                </span>
                <input
                  type="text"
                  name="firstName"
                  className="form-control"
                  placeholder="First name"
                  required
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Last Name</label>
              <div className="input-group">
                <span className="input-group-text bg-light">
                  <FaUser />
                </span>
                <input
                  type="text"
                  name="lastName"
                  className="form-control"
                  placeholder="Last name"
                  required
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Email + Mobile */}
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Email</label>
              <div className="input-group">
                <span className="input-group-text bg-light">
                  <FaEnvelope />
                </span>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter email"
                  required
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Mobile No</label>
              <div className="input-group">
                <span className="input-group-text bg-light">
                  <FaPhone />
                </span>
                <input
                  type="tel"
                  name="mobile"
                  className="form-control"
                  placeholder="Enter mobile"
                  required
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Address</label>
            <div className="input-group">
              <span className="input-group-text bg-light">
                <FaHome />
              </span>
              <input
                type="text"
                name="address"
                className="form-control"
                placeholder="Enter address"
                required
                onChange={handleChange}
              />
            </div>
          </div>

          {/* DOB + Gender */}
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Date of Birth</label>
              <div className="input-group">
                <span className="input-group-text bg-light">
                  <FaBirthdayCake />
                </span>
                <input
                  type="date"
                  name="dob"
                  className="form-control"
                  required
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Gender</label>
              <div className="input-group">
                <span className="input-group-text bg-light">
                  <FaVenusMars />
                </span>
                <select
                  name="gender"
                  className="form-control"
                  required
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Password + Confirm */}
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Password</label>
              <div className="input-group">
                <span className="input-group-text bg-light">
                  <FaLock />
                </span>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Enter password"
                  required
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Confirm Password</label>
              <div className="input-group">
                <span className="input-group-text bg-light">
                  <FaLock />
                </span>
                <input
                  type="password"
                  name="confirmPassword"
                  className="form-control"
                  placeholder="Confirm password"
                  required
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="btn w-100 fw-semibold"
            style={{
              backgroundColor: "hsla(158, 64%, 52%, 1)",
              color: "#fff",
              borderRadius: "25px",
              transition: "0.3s",
            }}
            onMouseOver={(e) =>
              (e.target.style.backgroundColor = "hsla(158, 64%, 42%, 1)")
            }
            onMouseOut={(e) =>
              (e.target.style.backgroundColor = "hsla(158, 64%, 52%, 1)")
            }
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-center mt-3 small">
          Already have an account?{" "}
          <Link to="/patient/login" className="fw-semibold text-primary">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
