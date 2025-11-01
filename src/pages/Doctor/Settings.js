// src/pages/Settings/SettingsPage.js
import React from "react";
import { FaTools } from "react-icons/fa";
// import ComingSoonIMG from "../../public/IMG/coming-soon.png"; // optional image

export default function SettingsPage() {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center text-center"
      style={{
        minHeight: "100vh",
        backgroundColor: "rgb(232, 245, 233)",
        color: "#fff",
        padding: "2rem",
      }}
    >
      {/* Optional image */}
      {/* {ComingSoonIMG && (
        <img
          src={ComingSoonIMG}
          alt="Coming Soon"
          style={{ width: "200px", marginBottom: "2rem" }}
        />
      )} */}

      {/* Title */}
      <h1 className="fw-bold mb-3" style={{ fontSize: "3rem", color: "#26a69a" }}>
        Coming Soon...
      </h1>

      {/* Subtitle */}
      <p className="text-muted mb-4" style={{ fontSize: "1.2rem", color: "#aaa" }}>
        We are working hard to bring you this feature. Stay tuned for updates!
      </p>

      {/* Icon Animation */}
      <div
        style={{
          fontSize: "4rem",
          color: "#26a69a",
          animation: "bounce 2s infinite",
        }}
      >
        <FaTools />
      </div>

      {/* CSS for bounce animation */}
      <style>
        {`
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-15px); }
            60% { transform: translateY(-7px); }
          }
        `}
      </style>
    </div>
  );
}
