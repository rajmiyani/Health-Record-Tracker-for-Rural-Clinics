import React, { useState } from "react";
import { Card, Button, Form, Row, Col, InputGroup } from "react-bootstrap";
import {
  FaCalendarAlt, FaUser, FaPhone, FaEnvelope,
  FaNotesMedical, FaVenusMars, FaBirthdayCake, FaStethoscope, FaClock
} from "react-icons/fa";
import { BookAppointment } from "../../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      toast.success("Appointment Booked successfully!");

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
    <div className="appointment-section py-5">
      <Card className="shadow-lg border-0 rounded-4 p-4 mx-auto" style={{ maxWidth: "850px" }}>
        <h2 className="text-center mb-4 text-success fw-bold">
          <FaCalendarAlt className="me-2" />
          Book Your Appointment
        </h2>
        <p className="text-center text-muted mb-4">
          Please fill in your details to schedule an appointment with <b>Dr. Raj Miyani</b>.
        </p>

        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <InputGroup>
                  <InputGroup.Text><FaUser /></InputGroup.Text>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </InputGroup>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <InputGroup>
                  <InputGroup.Text><FaEnvelope /></InputGroup.Text>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <InputGroup>
                  <InputGroup.Text><FaPhone /></InputGroup.Text>
                  <Form.Control
                    type="tel"
                    name="phone"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </InputGroup>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Gender</Form.Label>
                <InputGroup>
                  <InputGroup.Text><FaVenusMars /></InputGroup.Text>
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
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Date of Birth</Form.Label>
                <InputGroup>
                  <InputGroup.Text><FaBirthdayCake /></InputGroup.Text>
                  <Form.Control
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                  />
                </InputGroup>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Department</Form.Label>
                <InputGroup>
                  <InputGroup.Text><FaStethoscope /></InputGroup.Text>
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
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Date</Form.Label>
                <InputGroup>
                  <InputGroup.Text><FaCalendarAlt /></InputGroup.Text>
                  <Form.Control
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </InputGroup>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Time</Form.Label>
                <InputGroup>
                  <InputGroup.Text><FaClock /></InputGroup.Text>
                  <Form.Control
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Reason for Visit</Form.Label>
            <InputGroup>
              <InputGroup.Text><FaNotesMedical /></InputGroup.Text>
              <Form.Control
                as="textarea"
                name="reason"
                rows={3}
                placeholder="Describe your symptoms or reason for visit"
                value={formData.reason}
                onChange={handleChange}
                required
              />
            </InputGroup>
          </Form.Group>

          <div className="d-grid mt-3">
            <Button type="submit" size="lg" className="fw-bold" style={{ backgroundColor: "#28a745", border: "none" }}>
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
