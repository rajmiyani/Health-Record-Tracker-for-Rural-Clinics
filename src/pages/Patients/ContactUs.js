// src/pages/ContactUs.js
import React from "react";
import { Card, Button, Form, Row, Col, InputGroup } from "react-bootstrap";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaUser, FaRegCommentDots } from "react-icons/fa";

const ContactUs = () => {
    return (
        <div>
            <div className="container py-5">
                {/* Contact Info */}
                <Row className="g-4 mb-5">
                    {/* Phone */}
                    <Col md={4}>
                        <Card className="shadow-lg border-0 text-center p-4 h-100 contact-card">
                            <div className="d-flex justify-content-center align-items-center mb-3">
                                <FaPhoneAlt className="fs-2 text-success" />
                            </div>
                            <h5 className="fw-bold">Call Us</h5>
                            <p className="text-muted">+91 98765 43210</p>
                        </Card>
                    </Col>

                    {/* Email */}
                    <Col md={4}>
                        <Card className="shadow-lg border-0 text-center p-4 h-100 contact-card">
                            <div className="d-flex justify-content-center align-items-center mb-3">
                                <FaEnvelope className="fs-2 text-success" />
                            </div>
                            <h5 className="fw-bold">Email Us</h5>
                            <p className="text-muted">support@healthtracker.com</p>
                        </Card>
                    </Col>

                    {/* Address */}
                    <Col md={4}>
                        <Card className="shadow-lg border-0 text-center p-4 h-100 contact-card">
                            <div className="d-flex justify-content-center align-items-center mb-3">
                                <FaMapMarkerAlt className="fs-2 text-success" />
                            </div>
                            <h5 className="fw-bold">Visit Us</h5>
                            <p className="text-muted">123 Rural Health Road, Surat, India</p>
                        </Card>
                    </Col>
                </Row>


                {/* Form + Map */}
                <Row className="g-5 align-items-center">
                    {/* Contact Form */}
                    <Col md={6}>
                        <Card className="shadow-lg border-0 p-4">
                            <h4 className="mb-4 fw-bold text-success">Send Us a Message</h4>
                            <Form>
                                {/* Full Name */}
                                <Form.Group className="mb-3">
                                    <Form.Label>Full Name</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text>
                                            <FaUser />
                                        </InputGroup.Text>
                                        <Form.Control type="text" placeholder="Enter your name" />
                                    </InputGroup>
                                </Form.Group>

                                {/* Email */}
                                <Form.Group className="mb-3">
                                    <Form.Label>Email Address</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text>
                                            <FaEnvelope />
                                        </InputGroup.Text>
                                        <Form.Control type="email" placeholder="Enter your email" />
                                    </InputGroup>
                                </Form.Group>

                                {/* Message */}
                                <Form.Group className="mb-3">
                                    <Form.Label>Your Message</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text>
                                            <FaRegCommentDots />
                                        </InputGroup.Text>
                                        <Form.Control
                                            as="textarea"
                                            rows={4}
                                            placeholder="Type your message here..."
                                        />
                                    </InputGroup>
                                </Form.Group>

                                <Button
                                    style={{ backgroundColor: "rgb(40,167,69)", border: "none" }}
                                    className="w-100 py-2 fw-bold"
                                >
                                    Send Message
                                </Button>
                            </Form>
                        </Card>
                    </Col>

                    {/* Google Map */}
                    <Col md={6}>
                        <Card className="shadow-lg border-0">
                            <iframe
                                title="clinic-map"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3717.153743151465!2d72.8311!3d21.1702!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04eefd28d5c39%3A0x1c2bbd0cf7cbaff7!2sSurat%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1670000000000!5m2!1sen!2sin"
                                width="100%"
                                height="400"
                                style={{ border: 0, borderRadius: "10px" }}
                                allowFullScreen=""
                                loading="lazy"
                            ></iframe>
                        </Card>
                    </Col>
                </Row>
            </div>

            {/* Custom CSS */}
            <style>{`
        .contact-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .contact-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.15);
        }
      `}</style>
        </div>
    );
};

export default ContactUs;
