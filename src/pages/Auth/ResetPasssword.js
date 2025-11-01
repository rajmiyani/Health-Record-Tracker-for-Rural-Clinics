import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { resetPassword } from "../../services/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaLock } from "react-icons/fa";

export default function ResetPassword() {
    const [form, setForm] = useState({ password: "", confirmPassword: "" });
    const location = useLocation();
    const navigate = useNavigate();

    const email = location.state?.email;

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.password !== form.confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        try {
            const res = await resetPassword({
                email, // 🔑 pass email to backend
                newPassword: form.password,
                confirmPassword: form.confirmPassword,
            });
            toast.success(res.data.message || "Password reset successful!");
            setTimeout(() => navigate("/patient/login"), 1500);
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to reset password!");
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
                className="card shadow-lg p-5 border-0"
                style={{
                    width: "420px",
                    borderRadius: "20px",
                    background: "#ffffff",
                }}
            >
                <div className="text-center mb-4">
                    <h3 className="fw-bold text-dark">🔑 Reset Password</h3>
                    <p className="text-muted small">Enter and confirm your new password</p>
                </div>

                <form onSubmit={handleSubmit}>
                    {/* New Password */}
                    <div className="mb-3 position-relative">
                        <FaLock
                            style={{
                                position: "absolute",
                                top: "50%",
                                left: "12px",
                                transform: "translateY(-50%)",
                                color: "#888",
                            }}
                        />
                        <input
                            type="password"
                            name="password"
                            className="form-control ps-5 py-2"
                            placeholder="New Password"
                            value={form.password}
                            onChange={handleChange}
                            required
                            style={{
                                borderRadius: "12px",
                                border: "1px solid #ddd",
                                fontSize: "15px",
                            }}
                        />
                    </div>

                    {/* Confirm Password */}
                    <div className="mb-4 position-relative">
                        <FaLock
                            style={{
                                position: "absolute",
                                top: "50%",
                                left: "12px",
                                transform: "translateY(-50%)",
                                color: "#888",
                            }}
                        />
                        <input
                            type="password"
                            name="confirmPassword"
                            className="form-control ps-5 py-2"
                            placeholder="Confirm Password"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            required
                            style={{
                                borderRadius: "12px",
                                border: "1px solid #ddd",
                                fontSize: "15px",
                            }}
                        />
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        className="btn w-100 fw-semibold py-2"
                        style={{
                            backgroundColor: "hsla(158, 64%, 52%, 1)",
                            color: "#fff",
                            borderRadius: "12px",
                            fontSize: "16px",
                            transition: "0.3s",
                        }}
                        onMouseOver={(e) =>
                            (e.target.style.backgroundColor = "#1aa374")
                        }
                        onMouseOut={(e) =>
                            (e.target.style.backgroundColor = "hsla(158, 64%, 52%, 1)")
                        }
                    >
                        Reset Password
                    </button>
                </form>
            </div>
        </div>
    );
}
