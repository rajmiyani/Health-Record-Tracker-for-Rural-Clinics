// src/pages/Auth/DoctorLogin.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaUserMd, FaLock } from "react-icons/fa";

export default function DoctorLogin() {
    const [form, setForm] = useState({ username: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        // Static credentials
        if (form.username === "doctor" && form.password === "Doctor@1") {
            localStorage.setItem("authDoctor", "true");
            toast.success("Doctor logged in successfully!");
            setTimeout(() => navigate("/doctor/dashboard"), 1000);
        } else {
            setError("Invalid username or password!");
            toast.error("Login failed!");
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
                    <div style={{ fontSize: "40px", color: "hsla(158, 64%, 52%, 1)" }}>
                        🩺
                    </div>
                    <h3 className="fw-bold">Doctor Login</h3>
                    <p className="text-muted small">
                        Sign in to access your Doctor Dashboard
                    </p>
                </div>

                {/* Error Box */}
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
                    {/* Username */}
                    <div className="mb-3">
                        <label className="form-label fw-semibold">Username</label>
                        <div className="input-group">
                            <span className="input-group-text bg-light">
                                <FaUserMd />
                            </span>
                            <input
                                type="text"
                                name="username"
                                className="form-control"
                                placeholder="Enter username"
                                value={form.username}
                                onChange={(e) =>
                                    setForm({ ...form, username: e.target.value })
                                }
                                required
                            />
                        </div>
                    </div>

                    {/* Password */}
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
                                placeholder="Enter password"
                                value={form.password}
                                onChange={(e) =>
                                    setForm({ ...form, password: e.target.value })
                                }
                                required
                            />
                        </div>
                    </div>

                    {/* Submit */}
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
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
}
