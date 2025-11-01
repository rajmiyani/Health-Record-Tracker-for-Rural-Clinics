// src/pages/AboutUs.js
import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import {
  FaHeartbeat,
  FaUserMd,
  FaHospitalUser,
  FaClinicMedical,
  FaUsers,
  FaBullseye,
  FaRegLightbulb,
  FaHandHoldingHeart,
  FaQuoteLeft,
  FaQuoteRight,
} from "react-icons/fa";

const AboutUs = () => {
  return (
    <div
      style={{
        backgroundColor: "rgb(232, 245, 233)",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {/* Hero Section */}
      <section
        style={{
          background: "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://st.depositphotos.com/1907633/2184/i/450/depositphotos_21841631-stock-photo-success-smart-medical-doctor-with.jpg') center/cover no-repeat",
          color: "#fff",
          padding: "100px 0",
          textAlign: "center",
        }}
      >
        <Container>
          <h1 className="display-4 fw-bold">About HealthTracker</h1>
          <p className="lead mt-3">
            Empowering Rural Communities with Accessible, Reliable & Modern
            Healthcare Solutions
          </p>
          <Button variant="light" size="lg" className="mt-4 px-5 py-3 rounded-pill shadow">
            Get Started
          </Button>
        </Container>
      </section>

      {/* Our Story */}
      <section className="py-5">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <img
                src="https://tweakyourbiz.com/wp-content/uploads/2022/05/doctor-patient-app.jpg"
                alt="Our Story"
                className="img-fluid rounded shadow"
              />
            </Col>
            <Col md={6}>
              <h2 className="fw-bold mb-4">Our Story</h2>
              <p>
                HealthTracker was founded with a simple but powerful mission –
                to bridge the healthcare gap between urban hospitals and rural
                communities. We realized that patients in rural areas often face
                challenges like long travel distances, lack of proper records,
                and limited access to doctors.
              </p>
              <p>
                With HealthTracker, we bring a digital clinic management system
                directly to rural areas, ensuring that every patient receives
                timely, organized, and affordable medical care.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Mission & Vision */}
      <section className="py-5 bg-light">
        <Container>
          <Row>
            <Col md={6}>
              <Card className="border-0 shadow-lg h-100">
                <Card.Body className="text-center p-5">
                  <FaBullseye className="display-3 text-success mb-3" />
                  <h3 className="fw-bold">Our Mission</h3>
                  <p>
                    To provide easy, affordable, and modern healthcare access
                    for every patient in rural communities through technology
                    and innovation.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="border-0 shadow-lg h-100">
                <Card.Body className="text-center p-5">
                  <FaRegLightbulb className="display-4 text-warning mb-3" />
                  <h3 className="fw-bold">Our Vision</h3>
                  <p>
                    A future where no patient is left untreated due to lack of
                    facilities - where every rural clinic operates with the same
                    efficiency as urban hospitals.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Core Values */}
      <section className="py-5">
        <Container>
          <h2 className="fw-bold text-center mb-5">Our Core Values</h2>
          <Row>
            {[
              {
                icon: <FaHeartbeat />,
                title: "Compassion",
                text: "We care deeply about patient well-being and provide healthcare with empathy.",
              },
              {
                icon: <FaUserMd />,
                title: "Excellence",
                text: "We maintain the highest standards in healthcare delivery and patient management.",
              },
              {
                icon: <FaHandHoldingHeart />,
                title: "Accessibility",
                text: "We ensure healthcare is reachable to even the remotest rural communities.",
              },
              {
                icon: <FaClinicMedical />,
                title: "Innovation",
                text: "We use modern tools and technology to transform rural healthcare systems.",
              },
            ].map((value, idx) => (
              <Col md={3} sm={6} key={idx} className="mb-4">
                <Card className="h-100 text-center border-0 shadow-sm hover-shadow-lg">
                  <Card.Body>
                    <div className="display-4 text-success mb-3">
                      {value.icon}
                    </div>
                    <h5 className="fw-bold">{value.title}</h5>
                    <p className="text-muted">{value.text}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Statistics */}
      <section className="py-5 bg-light text-black">
        <Container>
          <Row className="text-center">
            {[
              { number: "120+", label: "Clinics Digitized" },
              { number: "10k+", label: "Patients Served" },
              { number: "500+", label: "Doctors Registered" },
              { number: "95%", label: "Patient Satisfaction" },
            ].map((stat, idx) => (
              <Col md={3} sm={6} key={idx} className="mb-4">
                <h2 className="fw-bold">{stat.number}</h2>
                <p>{stat.label}</p>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="py-5">
        <Container>
          <h2 className="fw-bold text-center mb-5">What Our Patients Say</h2>
          <Row>
            {[
              {
                quote:
                  "Earlier I had to travel hours to consult a doctor. Now, HealthTracker has made treatment available in my own village.",
                name: "Nevil Kathiriya",
                role: "Patient",
              },
              {
                quote:
                  "Managing patient records was always a challenge. With HealthTracker, everything is digital and hassle-free.",
                name: "Dr. Raj Miyani",
                role: "Clinic Doctor",
              },
              {
                quote:
                  "The system is simple, efficient, and saves us so much time. It’s truly a blessing for rural communities.",
                name: "Sunita Ben",
                role: "Community Health Worker",
              },
            ].map((t, idx) => (
              <Col md={4} key={idx} className="mb-4">
                <Card className="h-100 shadow border-0">
                  <Card.Body className="text-center">
                    <FaQuoteLeft className="text-success mb-3" size={24} />
                    <p>"{t.quote}"</p>
                    <FaQuoteRight className="text-success mb-3" size={24} />
                    <h6 className="fw-bold">{t.name}</h6>
                    <small className="text-muted">{t.role}</small>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section
        className="py-5 text-center bg-light text-black" >
        <Container>
          <h2 className="fw-bold mb-3">Join Us in Transforming Rural Healthcare</h2>
          <p>
            Be part of a movement that brings modern healthcare to rural
            communities. Together, we can make a difference.
          </p>
          <Button
            size="sm"
            className="mt-3 px-5 py-3 rounded shadow border-0" style={{backgroundColor: "rgb(40, 167, 69)"}}
          >
            Contact Us
          </Button>
        </Container>
      </section>
    </div>
  );
};

export default AboutUs;
