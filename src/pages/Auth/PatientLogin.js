import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginPatient } from "../../services/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEnvelope, FaLock, FaGoogle, FaFacebook } from "react-icons/fa";

export default function PatientLogin() {
  const [form, setForm] = useState({ email: "", password: "", rememberMe: false });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await loginPatient({ email: form.email, password: form.password });
      if (form.rememberMe) {
        localStorage.setItem("authUser", JSON.stringify(res.data));
      } else {
        sessionStorage.setItem("authUser", JSON.stringify(res.data));
      }
      toast.success("Login successful!");
      setTimeout(() => navigate("/patient/dashboard"), 1200);
    } catch (err) {
      setError("Invalid email or password!");
      toast.error("Login failed!");
    }
  };

  const handleSocialLogin = (provider) => {
    toast.info(`${provider} login not implemented yet`);
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
          width: "450px",
          borderRadius: "15px",
          background: "#fff",
        }}
      >
        <div className="text-center mb-4">
          <div
            style={{
              fontSize: "40px",
              color: "hsla(158, 64%, 52%, 1)",
            }}
          >
            ❤
          </div>
          <h3 className="fw-bold">Welcome Back</h3>
          <p className="text-muted small">Sign in to your HealthTracker account</p>
        </div>

        {error && (
          <div
            className="text-center p-2 mb-3"
            style={{
              backgroundColor: "rgba(255,0,0,0.1)",
              border: "1px solid red",
              borderRadius: "15px",
              color: "red",
              fontWeight: "500",
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Email Address</label>
            <div className="input-group">
              <span className="input-group-text bg-light">
                <FaEnvelope />
              </span>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <div className="input-group">
              <span className="input-group-text bg-light">
                <FaLock />
              </span>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="form-check">
              <input
                type="checkbox"
                name="rememberMe"
                className="form-check-input"
                checked={form.rememberMe}
                onChange={handleChange}
              />
              <label className="form-check-label">Remember me</label>
            </div>
            <Link to="/patient/forgot-password" className="text-decoration-none text-primary small">
              Forgot password?
            </Link>
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
            onMouseOver={(e) => (e.target.style.backgroundColor = "hsla(158, 64%, 42%, 1)")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "hsla(158, 64%, 52%, 1)")}
          >
            Sign In
          </button>
        </form>

        {/* Divider */}
        <div className="text-center my-3 text-muted fw-semibold">OR</div>

        {/* Social Buttons */}
        <div className="d-flex gap-2">
          <button
            className="btn btn-outline-danger w-50 rounded-pill d-flex align-items-center justify-content-center"
            onClick={() => handleSocialLogin("Google")}
          >
            <FaGoogle className="me-2" /> Google
          </button>
          <button
            className="btn btn-outline-primary w-50 rounded-pill d-flex align-items-center justify-content-center"
            onClick={() => handleSocialLogin("Facebook")}
          >
            <FaFacebook className="me-2" /> Facebook
          </button>
        </div>

        <p className="text-center mt-4 small">
          Don’t have an account?{" "}
          <Link to="/patient/register" className="fw-semibold text-primary">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
}
