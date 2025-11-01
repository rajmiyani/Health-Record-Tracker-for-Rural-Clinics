import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import {
  FaFilePdf,
  FaFileExcel,
  FaHeartbeat,
  FaDownload,
  FaImage,
} from "react-icons/fa";
import { Dropdown } from "react-bootstrap";

const MedicalRecord = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const [patientId, setPatientId] = useState(null); // ✅ Now controlled by backend
  const [tokenReady, setTokenReady] = useState(false);

  // 🔑 Get token from localStorage
  const storedAuth = localStorage.getItem("authUser");
  let token = null;
  if (storedAuth) {
    try {
      const parsed = JSON.parse(storedAuth);
      token = parsed.token || parsed.accessToken || parsed; // support all cases
    } catch {
      token = storedAuth; // in case it's stored directly
    }
  }

  // console.log("🔑 Token used:", token);

  // ✅ Step 1: Fetch patientId from backend using /patient/getByAuth
  useEffect(() => {
    const fetchPatientId = async () => {
      if (!token) {
        console.warn("⚠️ No token found in localStorage");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(
          "http://localhost:5000/patient/getByAuth",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setPatientId(res.data.patientId);
        setTokenReady(true);
      } catch (err) {
        console.error("❌ Error fetching patient ID:", err);
        setLoading(false);
      }
    };

    fetchPatientId();
  }, [token]);

  // ✅ Step 2: Fetch medical records when patientId is ready
  useEffect(() => {
    if (!patientId || !tokenReady) return;

    const fetchHistory = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/patient/history/${patientId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setRecords(res.data);
      } catch (err) {
        console.error("⚠️ Error fetching medical history:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [patientId, tokenReady, token]);

  // 📥 Handle downloads
  const handleDownload = (type) => {
    if (!patientId || !token) return;
    const base = `http://localhost:5000/patient/history`;

    switch (type) {
      case "pdf":
        window.open(`${base}/pdf/${patientId}?token=${token}`);
        break;
      case "excel":
        window.open(`${base}/excel/${patientId}?token=${token}`);
        break;
      case "img":
        window.open(`${base}/image/${patientId}?token=${token}`);
        break;
      default:
        break;
    }
  };

  return (
    <div
      className="container my-5"
      style={{
        backgroundColor: "#fff",
        borderRadius: "20px",
        boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
        padding: "40px",
      }}
    >
      {/* Header */}
      <div className="text-center mb-5">
        <div
          className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
          style={{
            width: "90px",
            height: "90px",
            background: "rgba(40,167,69,0.1)",
            boxShadow: "0 3px 8px rgba(40,167,69,0.15)",
          }}
        >
          <FaHeartbeat size={42} color="#28a745" />
        </div>
        <h2
          className="fw-bold mb-2"
          style={{
            color: "#28a745",
            fontFamily: "Poppins, sans-serif",
            letterSpacing: "0.5px",
          }}
        >
          My Medical Records
        </h2>
        <p className="text-muted mb-0" style={{ fontSize: "15px" }}>
          Access and download your complete medical history securely.
        </p>
      </div>

      {/* Download Dropdown */}
      <div className="text-center mb-4">
        <Dropdown
          show={showDropdown}
          onToggle={(isOpen) => setShowDropdown(isOpen)}
          className="d-inline-block"
        >
          <Dropdown.Toggle
            variant="success"
            id="download-records"
            className="px-4 py-2 rounded-pill shadow-sm fw-semibold"
            style={{
              backgroundColor: "#28a745",
              border: "none",
              transition: "all 0.3s ease",
            }}
          >
            <FaDownload className="me-2" /> Download Records
          </Dropdown.Toggle>

          <Dropdown.Menu
            className="shadow-lg border-0 rounded-3"
            style={{ minWidth: "200px", animation: "fadeIn 0.3s ease" }}
          >
            <Dropdown.Item
              className="d-flex align-items-center fw-semibold"
              onClick={() => handleDownload("pdf")}
            >
              <FaFilePdf className="me-2 text-danger" /> Download as PDF
            </Dropdown.Item>
            <Dropdown.Item
              className="d-flex align-items-center fw-semibold"
              onClick={() => handleDownload("excel")}
            >
              <FaFileExcel className="me-2 text-success" /> Download as Excel
            </Dropdown.Item>
            <Dropdown.Item
              className="d-flex align-items-center fw-semibold"
              onClick={() => handleDownload("img")}
            >
              <FaImage className="me-2 text-primary" /> Download as Image
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      {/* Records Table */}
      <div
        className="table-responsive rounded"
        style={{
          border: "1px solid #eaeaea",
          overflow: "hidden",
          boxShadow: "0 3px 15px rgba(0,0,0,0.05)",
        }}
      >
        <table className="table table-bordered table-hover align-middle mb-0">
          <thead style={{ backgroundColor: "#28a745", color: "white" }}>
            <tr>
              <th>Date</th>
              <th>Diagnosis</th>
              <th>Treatment</th>
              <th>Vitals</th>
              <th>Provider</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" className="text-center py-5 text-muted">
                  Loading records...
                </td>
              </tr>
            ) : records.length > 0 ? (
              records.map((r) => (
                <tr key={r._id}>
                  <td>{new Date(r.date).toLocaleDateString()}</td>
                  <td>{r.diagnosis}</td>
                  <td>{r.treatment}</td>
                  <td>{r.vitals || "N/A"}</td>
                  <td>{r.provider}</td>
                  <td>{r.type}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center text-muted py-4">
                  <em>No medical records found</em>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Health Tip */}
      <div
        className="mt-5 p-4 rounded-4 shadow-sm"
        style={{
          background: "linear-gradient(90deg, #28a745 0%, #34ce57 100%)",
          color: "white",
        }}
      >
        <h5 className="fw-bold mb-3">💡 Health Tip</h5>
        <p className="mb-0">
          Keep your medical records updated and review your health trends
          monthly. Consistent tracking helps early detection and better care.
        </p>
      </div>

      {/* Footer */}
      <div className="text-center mt-5 text-muted small">
        <p className="mb-0">
          Your medical data is protected under HIPAA-compliant secure storage.
        </p>
        <p className="mt-1">
          Need assistance?{" "}
          <a href="/patients/contact" className="text-success fw-semibold">
            Contact our support team
          </a>
        </p>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .table-hover tbody tr:hover {
          background-color: rgba(40,167,69,0.05);
          transition: background-color 0.3s ease;
        }
        .dropdown-item:hover {
          background-color: rgba(40,167,69,0.1) !important;
          transition: 0.3s ease;
        }
        button.btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(40,167,69,0.2);
        }
        th, td {
          text-align: center;
          vertical-align: middle;
        }
      `}</style>
    </div>
  );
};

export default MedicalRecord;
