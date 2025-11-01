import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../../services/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEnvelope } from "react-icons/fa";

export default function PatientForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email!");
      return;
    }

    try {
      const res = await forgotPassword({ email });
      toast.success(res.data.message || "OTP sent to your email!");
      // after OTP is sent, navigate to Verify OTP page
      setTimeout(() => navigate("/patient/verify-otp", { state: { email } }), 1500);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Something went wrong, try again!"
      );
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
          width: "450px",
          borderRadius: "15px",
          background: "#fff",
        }}
      >
        <div className="text-center mb-4">
          <h3 className="fw-bold">Forgot Password</h3>
          <p className="text-muted small">
            Enter your email to receive OTP
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Email Address</label>
            <div className="input-group">
              <span className="input-group-text bg-light">
                <FaEnvelope />
              </span>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
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
          >
            Send OTP
          </button>
        </form>
      </div>
    </div>
  );
}
