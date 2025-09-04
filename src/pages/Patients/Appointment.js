import React, { useState } from "react";
import { Card, Button, Form, Row, Col } from "react-bootstrap";
import {
  FaCalendarAlt, FaUser, FaPhone, FaEnvelope,
  FaNotesMedical, FaVenusMars, FaBirthdayCake, FaStethoscope
} from "react-icons/fa";
import { BookAppointment } from "../../services/api";
import { ToastContainer, toast } from "react-toastify";

const Appointment = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    department: "",
    doctor: "Dr. Raj Miyani",
    date: "",
    time: "",
    reason: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        doctorName: formData.doctor,
        date: `${formData.date}T${formData.time}`,
        reason: formData.reason,
      };

      const res = await BookAppointment(payload);

      toast.success("Appointment booked successfully!");

      console.log("Appointment response:", res.data);

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        gender: "",
        dob: "",
        department: "",
        doctor: "Dr. Raj Miyani",
        date: "",
        time: "",
        reason: "",
      });
    } catch (err) {
      console.error("Booking error:", err);
      toast.error(`${err.response?.data?.message || "Something went wrong"}`);
    }
  };

  return (
    <div className="py-5" style={{ backgroundColor: "rgb(232, 245, 233)" }}>
      <Card className="shadow-lg border-0 rounded-4 p-4 mx-auto" style={{ maxWidth: "800px" }}>
        <h2 className="text-center mb-4 text-success fw-bold">📅 Book Your Appointment</h2>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label><FaUser className="me-2" />Full Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label><FaEnvelope className="me-2" />Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label><FaPhone className="me-2" />Phone Number</Form.Label>
                <Form.Control
                  type="tel"
                  name="phone"
                  placeholder="Enter your phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label><FaVenusMars className="me-2" />Gender</Form.Label>
                <Form.Select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label><FaBirthdayCake className="me-2" />Date of Birth</Form.Label>
                <Form.Control
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label><FaStethoscope className="me-2" />Department</Form.Label>
                <Form.Select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Department</option>
                  <option>General Medicine</option>
                  <option>Pediatrics</option>
                  <option>Gynecology</option>
                  <option>Urology</option>
                  <option>Emergency Care</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label><FaCalendarAlt className="me-2" />Date</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>⏰ Time</Form.Label>
                <Form.Control
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label><FaNotesMedical className="me-2" />Reason for Visit</Form.Label>
            <Form.Control
              as="textarea"
              name="reason"
              rows={3}
              placeholder="Describe your symptoms or reason for visit"
              value={formData.reason}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <div className="d-grid mt-3">
            <Button type="submit" variant="success" size="lg" className="fw-bold">
              Book Appointment
            </Button>
          </div>
        </Form>
      </Card>

      {/* Toastify container */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop />
    </div>
  );
};

export default Appointment;
