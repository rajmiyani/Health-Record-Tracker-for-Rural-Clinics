// src/pages/FAQs.js
import React from "react";
import { Accordion, Card, Button, Container } from "react-bootstrap";

const FAQs = () => {
  return (
    <Container className="py-5">
      <h2 className="text-center mb-4" style={{ color: "rgb(40, 167, 69)" }}>
        Frequently Asked Questions
      </h2>
      <p className="text-center text-muted mb-5">
        Here are some of the most common questions about HealthTracker – Rural
        Clinic Management.
      </p>

      <Accordion defaultActiveKey="0" flush>
        <Accordion.Item eventKey="0">
          <Accordion.Header>What is HealthTracker?</Accordion.Header>
          <Accordion.Body>
            HealthTracker is a rural clinic management solution that helps
            doctors, staff, and patients to manage health records, appointments,
            and treatment processes more efficiently.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header>
            How can patients book appointments?
          </Accordion.Header>
          <Accordion.Body>
            Patients can easily book appointments through the HealthTracker web
            portal or via the clinic’s registration desk. Confirmation and
            reminders are sent automatically.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="2">
          <Accordion.Header>
            Is my health data secure in HealthTracker?
          </Accordion.Header>
          <Accordion.Body>
            Yes, all health records are encrypted and stored securely. We follow
            HIPAA-compliant practices to ensure patient privacy and security.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="3">
          <Accordion.Header>
            Can rural clinics manage staff and inventory?
          </Accordion.Header>
          <Accordion.Body>
            Absolutely. HealthTracker provides tools for staff scheduling,
            medicine stock management, and resource allocation to streamline
            clinic operations.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="4">
          <Accordion.Header>
            Does HealthTracker work offline in remote areas?
          </Accordion.Header>
          <Accordion.Body>
            Yes. HealthTracker offers offline mode for remote rural areas with
            limited internet. Data automatically syncs when connectivity is
            restored.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="5">
          <Accordion.Header>
            How can I get support if I face issues?
          </Accordion.Header>
          <Accordion.Body>
            Our support team is available 24/7 through email, phone, and live
            chat. You can also access our detailed help center for guidance.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
};

export default FAQs;
