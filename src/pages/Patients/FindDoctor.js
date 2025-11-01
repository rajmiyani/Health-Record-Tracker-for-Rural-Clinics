// src/pages/FindDoctor.js
import React from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { FaMapMarkerAlt, FaGraduationCap, FaCalendarCheck } from "react-icons/fa";
import { Link } from "react-router-dom";

const FindDoctor = () => {
  return (
    <div style={{ backgroundColor: "rgb(232, 245, 233)", minHeight: "100vh", padding: "40px 0" }}>
      <Container>
        <Row className="align-items-start">
          {/* Left Side - Doctor Info */}
          <Col md={7} className="mb-4">
            <h2 className="fw-bold text-success">Dr. Raj Miyani</h2>
            <p className="text-muted mb-1">MBBS, DNB (General Surgery), MCh (Urology)</p>
            <p className="text-muted">
              <FaMapMarkerAlt className="me-2 text-success" />
              123 Medical Street, Surat, India.
            </p>

            <div className="mt-4">
              <h5 className="fw-bold">
                <FaGraduationCap className="me-2 text-success" /> Qualifications
              </h5>
              <ul className="text-muted">
                <li>MBBS</li>
                <li>DNB (General Surgery)</li>
                <li>MCh (Urology)</li>
              </ul>
            </div>

            <div className="mt-4">
              <h5 className="fw-bold">
                <FaCalendarCheck className="me-2 text-success" /> Availability
              </h5>
              <p className="text-muted">On-call and emergency available Doctor</p>
            </div>
          </Col>

          {/* Right Side - Image + Appointment */}
          <Col md={5}>
            <Card className="shadow border-0 rounded-4 mb-3 text-center">
              <Card.Body>
                <img
                  src="https://www.shutterstock.com/image-photo/portrait-handsome-male-doctor-stethoscope-600nw-2480850611.jpg"
                  alt="Doctor"
                  className="img-fluid rounded-3 mb-3"
                />
                <Link to="/patients/my-appointments">
                  <Button variant="success" className="w-100 fw-bold">
                    Book an Appointment
                  </Button>
                </Link>
              </Card.Body>
            </Card>

            {/* Call Back Form */}
            <Card className="shadow border-0 rounded-4 p-3">
              <h5 className="fw-bold text-success text-center">Get a Call Back</h5>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Control type="text" placeholder="Enter Name*" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control type="text" placeholder="Enter Mobile Number*" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Check type="checkbox" label="I agree to the terms and conditions" />
                </Form.Group>
                <Button variant="success" className="w-100 fw-bold">
                  Book an Appointment
                </Button>
              </Form>
              <p className="text-center mt-2 small text-muted">
                healthtrackerclinic@gmail.com
              </p>
            </Card>
          </Col>
        </Row>
      </Container>
    </div >
  );
};

export default FindDoctor;
