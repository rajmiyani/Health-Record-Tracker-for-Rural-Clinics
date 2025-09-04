// src/pages/Speciality.js
import React from "react";
import {
  FaStethoscope,
  FaUserNurse,
  FaHeartbeat,
  FaChild,
  FaXRay,
  FaSyringe,
  FaHospitalUser,
  FaClinicMedical,
  FaAmbulance,
  FaMicroscope,
  FaBrain,
  FaBone,
  FaLungs,
  FaEye,
  FaUserMd,
} from "react-icons/fa";
import { Container, Row, Col, Card, Accordion, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Speciality = () => {
  return (
    <div
      style={{
        background: "rgb(232, 245, 233)",
        minHeight: "100vh",
        paddingTop: "50px",
      }}
    >
      {/* ================= Header Section ================= */}
      <section className="text-center mb-5">
        <h1 className="fw-bold display-5 text-success">
          Our Medical Specialities
        </h1>
        <p className="text-muted fs-5 w-75 mx-auto">
          At <span className="fw-bold">HealthTracker Rural Clinic</span>, we
          provide specialized healthcare services designed to serve patients in
          rural areas. Our focus is to make healthcare accessible, affordable,
          and reliable for every patient.
        </p>
        <div className="d-flex justify-content-center mt-4">
          <div
            style={{
              width: "120px",
              height: "5px",
              background: "green",
              borderRadius: "10px",
            }}
          ></div>
        </div>
      </section>

      {/* ================== Speciality Cards ================== */}
      <Container className="mb-5">
        <Row className="gy-4">
          {[
            {
              icon: <FaStethoscope size={40} className="text-success" />,
              title: "General Medicine",
              desc: "Comprehensive care for all age groups, diagnosing and treating common illnesses and ensuring wellness.",
            },
            {
              icon: <FaHeartbeat size={40} className="text-danger" />,
              title: "Cardiology",
              desc: "Expert care for heart and vascular health, ensuring early detection and effective treatment.",
            },
            {
              icon: <FaChild size={40} className="text-warning" />,
              title: "Pediatrics",
              desc: "Dedicated care for children, from newborns to adolescents, ensuring growth and development.",
            },
            {
              icon: <FaUserNurse size={40} className="text-info" />,
              title: "Nursing & Care",
              desc: "Professional nursing support for patient recovery, long-term care, and health management.",
            },
            {
              icon: <FaXRay size={40} className="text-primary" />,
              title: "Radiology & Imaging",
              desc: "Advanced X-rays, scans, and imaging to support accurate diagnosis and treatment plans.",
            },
            {
              icon: <FaSyringe size={40} className="text-success" />,
              title: "Vaccination",
              desc: "Affordable and timely vaccinations for children, adults, and elderly to prevent diseases.",
            },
            {
              icon: <FaHospitalUser size={40} className="text-danger" />,
              title: "Gynecology & Maternity",
              desc: "Comprehensive women’s healthcare including prenatal, maternity, and reproductive health services.",
            },
            {
              icon: <FaClinicMedical size={40} className="text-secondary" />,
              title: "Emergency & Trauma",
              desc: "24/7 emergency response services for accidents, trauma, and critical care.",
            },
            {
              icon: <FaAmbulance size={40} className="text-dark" />,
              title: "Ambulance Services",
              desc: "Well-equipped ambulances to ensure quick and safe transport for patients in emergencies.",
            },
            {
              icon: <FaMicroscope size={40} className="text-primary" />,
              title: "Pathology & Lab Tests",
              desc: "In-house laboratory tests with accurate results for faster treatment decisions.",
            },
            {
              icon: <FaBrain size={40} className="text-warning" />,
              title: "Neurology",
              desc: "Diagnosis and treatment of brain, nerves, and spinal cord disorders with specialist support.",
            },
            {
              icon: <FaBone size={40} className="text-success" />,
              title: "Orthopedics",
              desc: "Bone and joint care including fractures, arthritis, and rehabilitation therapy.",
            },
            {
              icon: <FaLungs size={40} className="text-danger" />,
              title: "Pulmonology",
              desc: "Specialized care for lung diseases, breathing disorders, and asthma management.",
            },
            {
              icon: <FaEye size={40} className="text-info" />,
              title: "Eye Care",
              desc: "Eye checkups, surgeries, and vision care facilities to protect your eyesight.",
            },
            {
              icon: <FaUserMd size={40} className="text-primary" />,
              title: "Specialist Consultation",
              desc: "Direct access to experienced doctors across multiple specialities for rural patients.",
            },
          ].map((item, index) => (
            <Col key={index} md={6} lg={4}>
              <Card className="h-100 shadow border-0 rounded-4 speciality-card">
                <Card.Body className="text-center p-4">
                  <div className="mb-3">{item.icon}</div>
                  <Card.Title className="fw-bold fs-4 mb-2">
                    {item.title}
                  </Card.Title>
                  <Card.Text className="text-muted">{item.desc}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <section className="py-5 bg-light">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/2966/2966484.png"
                alt="Speciality"
                className="img-fluid"
              />
            </Col>
            <Col md={6} className="mt-4 mt-md-0">
              <h2 className="fw-bold text-success">Why Choose Us?</h2>
              <p className="text-muted fs-5">
                Our clinic combines advanced medical expertise with the mission
                to serve rural communities. We believe every patient deserves
                the best care regardless of their location or financial
                background.
              </p>
              <ul className="list-unstyled fs-6">
                <li>✔️ Experienced doctors and nursing staff</li>
                <li>✔️ Affordable treatments & medicines</li>
                <li>✔️ 24/7 emergency and ambulance service</li>
                <li>✔️ Specialized care for rural communities</li>
                <li>✔️ Trusted by thousands of patients</li>
              </ul>
              <Link to="/patients/my-appointments">
                <Button variant="success" className="mt-3 px-4">
                  Book Appointment
                </Button>
              </Link>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="py-5">
        <Container>
          <h2 className="text-center fw-bold mb-4 text-success">
            Frequently Asked Questions
          </h2>
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                Do you provide free consultations?
              </Accordion.Header>
              <Accordion.Body>
                Yes, for rural patients with financial difficulties, we provide
                free or highly subsidized consultations and treatments.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>
                How can I book a specialist appointment?
              </Accordion.Header>
              <Accordion.Body>
                You can book an appointment online via our patient panel or
                visit the clinic reception. Emergency cases are prioritized
                immediately.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>
                Do you offer home visits or telemedicine?
              </Accordion.Header>
              <Accordion.Body>
                Yes, telemedicine consultations and home visit facilities are
                available for elderly and remote patients.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Container>
      </section>
    </div>
  );
};

export default Speciality;
