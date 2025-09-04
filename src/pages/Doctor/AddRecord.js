// src/pages/Doctor/AddRecord.js
import React, { useState } from "react";
import { Card, Button, Form, Row, Col, InputGroup } from "react-bootstrap";
import {
  FaNotesMedical,
  FaUser,
  FaCalendarAlt,
  FaStethoscope,
  FaHeartbeat,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// ✅ Import Toastify
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddRecord = () => {
  const [formData, setFormData] = useState({
    patient: "",
    date: "",
    type: "Consultation",
    provider: "",
    diagnosis: "",
    treatment: "",
    vitals: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("authUser"); // adjust if token stored differently
      await axios.post(
        "http://localhost:5000/doctor/addRecord",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // ✅ Success Toast
      toast.success("Health Record Added Successfully!", {
        position: "top-right",
        autoClose: 2000,
        theme: "colored",
      });

      setTimeout(() => {
        navigate("/doctor/healthRecords");
      }, 2500);
    } catch (error) {
      // ✅ Error Toast
      toast.error(
        error.response?.data?.message || "Failed to add health record",
        {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4">
      {/* Toastify container */}
      <ToastContainer />

      <Card className="shadow-lg border-0 rounded-4">
        <Card.Body className="p-4">
          <h3 className="fw-bold text-success d-flex align-items-center mb-3">
            <FaNotesMedical className="me-2" />
            Add Health Record
          </h3>
          <p className="text-muted">
            Fill in the details below to create a new patient health record.
          </p>

          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Label>Patient</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <FaUser />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Enter patient name"
                    name="patient"
                    value={formData.patient}
                    onChange={handleChange}
                    required
                  />
                </InputGroup>
              </Col>

              <Col md={6}>
                <Form.Label>Date</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <FaCalendarAlt />
                  </InputGroup.Text>
                  <Form.Control
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </InputGroup>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Label>Type</Form.Label>
                <Form.Select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                >
                  <option value="Consultation">Consultation</option>
                  <option value="Lab Results">Lab Results</option>
                </Form.Select>
              </Col>

              <Col md={6}>
                <Form.Label>Provider</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <FaStethoscope />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Enter provider/doctor name"
                    name="provider"
                    value={formData.provider}
                    onChange={handleChange}
                    required
                  />
                </InputGroup>
              </Col>
            </Row>

            <Form.Label>Diagnosis</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter diagnosis"
              className="mb-3"
              name="diagnosis"
              value={formData.diagnosis}
              onChange={handleChange}
              required
            />

            <Form.Label>Treatment</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter treatment details"
              className="mb-3"
              name="treatment"
              value={formData.treatment}
              onChange={handleChange}
              required
            />

            <Form.Label>Vitals</Form.Label>
            <InputGroup className="mb-3">
              <InputGroup.Text>
                <FaHeartbeat />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="BP: 120/80, HR: 75, Temp: 98.6°F"
                name="vitals"
                value={formData.vitals}
                onChange={handleChange}
              />
            </InputGroup>
            <p className="text-danger fs-6">
              Ex : BP: 120/80, HR: 75, Temp: 98.6°F
            </p>

            <div className="d-flex justify-content-end gap-2">
              <Button
                variant="secondary"
                onClick={() => navigate("/doctor/healthRecords")}
              >
                Cancel
              </Button>
              <Button
                style={{ backgroundColor: "#28a745", border: "none" }}
                type="submit"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Record"}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AddRecord;
