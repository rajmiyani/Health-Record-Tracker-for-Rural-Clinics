// File: src/pages/Auth/PatientLogin.js
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEnvelope, FaLock, FaGoogle, FaFacebook } from "react-icons/fa";
import { GoogleLogin } from "@react-oauth/google";

export default function PatientLogin() {
  const [form, setForm] = useState({ email: "", password: "", rememberMe: false });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.message);

      const storageData = {
        token: data.token,
        user: data.data, // user info
      };

      if (form.rememberMe) localStorage.setItem("authUser", JSON.stringify(storageData));
      else sessionStorage.setItem("authUser", JSON.stringify(storageData));

      toast.success("Login successful!");
      setTimeout(() => navigate("/patient/dashboard"), 1200);
    } catch (err) {
      setError(err.message || "Login failed");
      toast.error(err.message || "Login failed");
    }
  };


  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const token = credentialResponse.credential;

      const res = await fetch("http://localhost:5000/auth/google-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.message);

      const storageData = {
        token: data.token,
        user: data.data, // user info
      };

      if (form.rememberMe) localStorage.setItem("authUser", JSON.stringify(storageData));
      else sessionStorage.setItem("authUser", JSON.stringify(storageData));

      toast.success("Google login successful!");
      setTimeout(() => navigate("/patient/dashboard"), 1200);
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Google login failed");
    }
  };

  const handleGoogleFailure = (err) => {
    console.error("Google login error:", err);
    toast.error("Google login failed");
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ background: "linear-gradient(135deg, #2196f3, hsla(158, 64%, 52%, 1))" }}>
      <ToastContainer position="top-center" />
      <div className="card shadow-lg p-4" style={{ width: "450px", borderRadius: "15px", background: "#fff" }}>
        <div className="text-center mb-4">
          <div style={{ fontSize: "40px", color: "hsla(158, 64%, 52%, 1)" }}>❤</div>
          <h3 className="fw-bold">Welcome Back</h3>
          <p className="text-muted small">Sign in to your HealthTracker account</p>
        </div>

        {error && <div className="text-center p-2 mb-3" style={{ backgroundColor: "rgba(255,0,0,0.1)", border: "1px solid red", borderRadius: "15px", color: "red", fontWeight: 500 }}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Email Address</label>
            <div className="input-group">
              <span className="input-group-text bg-light"><FaEnvelope /></span>
              <input type="email" name="email" className="form-control" placeholder="Enter your email" value={form.email} onChange={handleChange} required />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <div className="input-group">
              <span className="input-group-text bg-light"><FaLock /></span>
              <input type="password" name="password" className="form-control" placeholder="Enter your password" value={form.password} onChange={handleChange} required />
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="form-check">
              <input type="checkbox" name="rememberMe" className="form-check-input" checked={form.rememberMe} onChange={handleChange} />
              <label className="form-check-label">Remember me</label>
            </div>
            <Link to="/patient/forgot-password" className="text-decoration-none text-primary small">Forgot password?</Link>
          </div>

          <button type="submit" className="btn w-100 fw-semibold" style={{ backgroundColor: "hsla(158, 64%, 52%, 1)", color: "#fff", borderRadius: "25px" }}>
            Sign In
          </button>
        </form>

        <div className="text-center my-3 text-muted fw-semibold">OR</div>

        <div className="d-flex gap-2">
          {/* Google Button */}
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleFailure}
            text="signin_with"
            useOneTap
            render={(renderProps) => (
              <button
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                className="btn btn-outline-primary w-50 rounded-pill d-flex align-items-center justify-content-center"
                style={{ height: "45px", gap: "8px" }}
              >
                <FaGoogle /> Google
              </button>
            )}
          />

          {/* Facebook Button - same design as Google */}
          <button
            className="btn btn-outline-primary w-50 rounded-pill d-flex align-items-center justify-content-center"
            style={{ height: "45px", gap: "8px" }}
            onClick={() => alert("Facebook login not implemented yet")} // replace with your FB login handler
          >
            <FaFacebook /> Facebook
          </button>
        </div>

        <p className="text-center mt-4 small">
          Don’t have an account? <Link to="/patient/register" className="fw-semibold text-primary">Sign up here</Link>
        </p>
      </div>
    </div>
  );
}
