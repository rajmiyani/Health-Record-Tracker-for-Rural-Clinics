import React, { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyOtp } from "../../services/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function VerifyOtp() {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputsRef = useRef([]);
  const location = useLocation();
  const navigate = useNavigate();

  // Get email passed from ForgotPassword
  const email = location.state?.email;

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, ""); // allow only digits
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1].focus(); // move to next box
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus(); // move back on delete
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 6) {
      toast.error("Please enter 6-digit OTP!");
      return;
    }

    try {
      const res = await verifyOtp({ email, otp: enteredOtp });
      toast.success(res.data.message || "OTP verified!");
      setTimeout(
        () => navigate("/patient/reset-password", { state: { email } }),
        1500
      );
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP!");
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
          width: "420px",
          borderRadius: "15px",
          background: "#fff",
        }}
      >
        <div className="text-center mb-4">
          <h3 className="fw-bold">Verify OTP</h3>
          <p className="small">
            Enter the 6-digit OTP sent to <br />
            <span className="fw-semibold">{email}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="d-flex justify-content-between mb-4">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => (inputsRef.current[index] = el)}
                className="form-control text-center"
                style={{
                  width: "50px",
                  height: "55px",
                  fontSize: "22px",
                  fontWeight: "bold",
                  borderRadius: "10px",
                }}
                required
              />
            ))}
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
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
}
