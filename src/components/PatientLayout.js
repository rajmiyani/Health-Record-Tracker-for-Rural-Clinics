// src/layouts/PatientLayout.js
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Dropdown,
  Row,
  Col,
} from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import {
  FaUserCircle,
  FaAmbulance,
  FaCalendarCheck,
  FaHome,
  FaInfoCircle,
  FaStethoscope,
  FaHospital,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

// Navigation Items
const navItems = [
  { name: "Home", icon: <FaHome />, link: "/patient/dashboard" },
  { name: "About Us", icon: <FaInfoCircle />, link: "/patients/about-us" },
  {
    name: "Treatment",
    icon: <FaStethoscope />,
    dropdown: [
      { name: "Cardiology", link: "/patients/treatment/cardiology" },
      { name: "Neurology", link: "/patients/treatment/neurology" },
      { name: "Orthopedics", link: "/patients/treatment/orthopedics" },
    ],
  },
  { name: "Specialties", icon: <FaHospital />, link: "/patients/specialties" },
  { name: "Find Doctors+", link: "/patients/doctors" },
  { name: "Medical Records", icon: <FaStethoscope />, link: "/patients/medical-records" },
  { name: "My Appointment+", link: "/patients/my-appointments" },
  { name: "Awards+", link: "/patients/awards" },
  { name: "Blogs+", link: "/patients/blogs" },
  { name: "FAQ’s+", link: "/patients/faqs" },
  { name: "Contact Us+", link: "/patients/contact" },
];

const PatientLayout = ({ children }) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* Header */}
      <header className="shadow-sm sticky-top bg-white">
        {/* Top Bar */}
        <div className="d-flex justify-content-between align-items-center px-3 py-2 border-bottom bg-light">
          <div className="d-flex align-items-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2966/2966484.png"
              alt="logo"
              width="40"
              className="me-2"
            />
            <div>
              <h5 className="mb-0 fw-bold text-success">HealthTracker</h5>
              <small className="text-muted">Rural Clinic Management</small>
            </div>
          </div>

          <div className="d-flex align-items-center">
            <span className="me-3 text-danger fw-bold d-none d-md-block">
              Book Online → Appointment within 24 hours
            </span>
            <Nav>
              <Nav.Link
                as={Link}
                to="/patients/visitor-gidelines"
                className="text-dark fw-semibold"
              >
                Visitor Guidelines +
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/patients/process"
                className="text-dark fw-semibold"
              >
                Patients Process +
              </Nav.Link>
            </Nav>
            <FaAmbulance size={24} className="text-success ms-3" />

            {/* Profile Dropdown */}
            <Dropdown
              show={profileOpen}
              onMouseEnter={() => setProfileOpen(true)}
              onMouseLeave={() => setProfileOpen(false)}
              align="end"
            >
              <Dropdown.Toggle
                as="span"
                style={{ cursor: "pointer" }}
                className="ms-3"
              >
                <FaUserCircle size={28} className="text-dark" />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/patients/profile">
                  Profile
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/patients/my-appointments">
                  Book Appointment
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/patient/login">
                  Login
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/patient/login">
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>

        {/* Navigation Menu */}
        <Navbar expand="lg" bg="white" className="border-bottom px-3">
          <Container fluid>
            <Navbar.Toggle aria-controls="patient-navbar" />
            <Navbar.Collapse id="patient-navbar">
              <Nav className="me-auto">
                {navItems.map((item, index) =>
                  item.dropdown ? (
                    <NavDropdown
                      title={
                        <span>
                          {item.icon && <span className="me-1">{item.icon}</span>}
                          {item.name}
                        </span>
                      }
                      id={`nav-dropdown-${index}`}
                      key={index}
                      className={
                        item.dropdown.some(
                          (sub) => sub.link === location.pathname
                        )
                          ? "fw-bold"
                          : ""
                      }
                    >
                      {item.dropdown.map((subItem, subIndex) => (
                        <NavDropdown.Item
                          as={Link}
                          to={subItem.link}
                          key={subIndex}
                          active={location.pathname === subItem.link}
                        >
                          {subItem.name}
                        </NavDropdown.Item>
                      ))}
                    </NavDropdown>
                  ) : (
                    <Nav.Link
                      as={Link}
                      key={index}
                      to={item.link}
                      className={`fw-semibold ${location.pathname === item.link
                          ? "text-white"
                          : "text-dark"
                        }`}
                      style={
                        location.pathname === item.link
                          ? { backgroundColor: "#28a745", borderRadius: "6px" }
                          : {}
                      }
                    >
                      {item.icon && <span className="me-1">{item.icon}</span>}
                      {item.name}
                    </Nav.Link>
                  )
                )}
              </Nav>
              <div
                className="d-flex align-items-center text-white px-3 py-2 rounded"
                style={{
                  backgroundColor: "#28a745",
                  cursor: "pointer",
                  fontWeight: "500",
                }}
              >
                <Link to="/patients/my-appointments" className="text-white text-decoration-none d-flex align-items-center">
                  <FaCalendarCheck className="me-2" />
                  Book Appointment
                </Link>
              </div>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>

      {/* Page Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="footer bg-dark text-light pt-5 pb-4">
        <Container>
          <Row className="gy-4">
            {/* Logo & About */}
            <Col md={4}>
              <div className="d-flex align-items-center mb-3">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2966/2966484.png"
                  alt="Logo"
                  style={{
                    width: "45px",
                    marginRight: "10px",
                    filter: "brightness(0) invert(1)",
                  }}
                />
                <h5 className="fw-bold mb-0" style={{ color: "#28a745" }}>
                  HealthTracker <br />
                  <small style={{ fontSize: "14px" }}>
                    Rural Clinic Management
                  </small>
                </h5>
              </div>
              <p className="small">
                Providing trusted healthcare services with advanced technology
                and compassionate care. Your health is our top priority.
              </p>
            </Col>

            {/* Quick Links */}
            <Col md={2}>
              <h6 className="fw-bold mb-3">Quick Links</h6>
              <ul className="list-unstyled small">
                <li>
                  <Link to="/" className="text-decoration-none text-light">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/patients/about-us" className="text-decoration-none text-light">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/patients/services" className="text-decoration-none text-light">
                    Services
                  </Link>
                </li>
                <li>
                  <Link to="/patients" className="text-decoration-none text-light">
                    Patients
                  </Link>
                </li>
                <li>
                  <Link to="/patients/contact" className="text-decoration-none text-light">
                    Contact
                  </Link>
                </li>
              </ul>
            </Col>

            {/* Contact Info */}
            <Col md={3}>
              <h6 className="fw-bold mb-3">Contact</h6>
              <p className="small mb-2">
                <FaMapMarkerAlt className="me-2 text-success" />
                123 Medical Street, Surat, India
              </p>
              <p className="small mb-2">
                <FaPhone className="me-2 text-success" /> +91 98765 43210
              </p>
              <p className="small">
                <FaEnvelope className="me-2 text-success" /> info@healthcareplus.com
              </p>
            </Col>

            {/* Social Media */}
            <Col md={3}>
              <h6 className="fw-bold mb-3">Follow Us</h6>
              <div className="d-flex gap-3">
                <a href="#" className="text-light fs-5 social-icon">
                  <FaFacebookF />
                </a>
                <a href="#" className="text-light fs-5 social-icon">
                  <FaTwitter />
                </a>
                <a href="#" className="text-light fs-5 social-icon">
                  <FaInstagram />
                </a>
                <a href="#" className="text-light fs-5 social-icon">
                  <FaLinkedinIn />
                </a>
              </div>
            </Col>
          </Row>

          <hr className="border-secondary my-4" />

          <Row>
            <Col className="text-center">
              <p className="small mb-0">
                © {new Date().getFullYear()}{" "}
                <strong style={{ color: "#28a745" }}>HealthTracker</strong>. All
                Rights Reserved.
              </p>
            </Col>
          </Row>
        </Container>

        {/* Styling */}
        <style>{`
          .footer a:hover {
            color: #28a745 !important;
          }
          .social-icon {
            transition: all 0.3s ease;
          }
          .social-icon:hover {
            color: #28a745 !important;
            transform: scale(1.2);
          }
          .navbar-nav .nav-link {
            transition: all 0.3s ease;
            border-radius: 6px;
            padding: 6px 12px;
          }
          .navbar-nav .nav-link:hover {
            background-color: rgba(40,167,69,0.1);
            color: black !important;
          }
        `}</style>
      </footer>
    </>
  );
};

export default PatientLayout;
