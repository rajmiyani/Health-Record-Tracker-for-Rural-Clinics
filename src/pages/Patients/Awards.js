// src/pages/Awards.js
import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FaAward, FaMedal, FaStar, FaTrophy } from "react-icons/fa";

const awardsData = [
  {
    id: 1,
    title: "PM-JAY Recognition",
    description: "Certified under Ayushman Bharat PM-JAY Scheme",
    icon: <FaMedal size={50} color="rgb(40,167,69)" />,
  },
  {
    id: 2,
    title: "Best Clinic in COVID-19",
    description: "Recognized for outstanding healthcare during pandemic",
    icon: <FaTrophy size={50} color="rgb(40,167,69)" />,
  },
  {
    id: 3,
    title: "Health Innovation of the Year",
    description: "Awarded for adopting latest medical technologies",
    icon: <FaStar size={50} color="rgb(40,167,69)" />,
  },
  {
    id: 4,
    title: "Nursing Excellence",
    description: "Recognized for outstanding nursing services",
    icon: <FaAward size={50} color="rgb(40,167,69)" />,
  },
];

const Awards = () => {
  return (
    <div style={{ backgroundColor: "#f8f9fa" }}>
      {/* Banner Section */}
      <div
        style={{
          backgroundImage: `url('https://static.vecteezy.com/system/resources/thumbnails/039/349/571/small_2x/ai-generated-gleaming-trophy-cup-symbolizing-achievement-and-excellence-on-a-sparkling-background-free-photo.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
          padding: "80px 0",
          textAlign: "center",
          position: "relative",
        }}
      >
        {/* Dark Overlay for Text Readability */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        ></div>

        <div style={{ position: "relative", zIndex: 2 }}>
          <h2 className="fw-bold">🏆 Our Achievements & Awards</h2>
          <p className="mb-0">
            We are proud to be recognized for our dedication and excellence in
            healthcare services.
          </p>
        </div>
      </div>

      {/* Awards Section */}
      <Container className="py-5">
        <Row className="g-4">
          {awardsData.map((award) => (
            <Col key={award.id} md={6} lg={3}>
              <Card className="shadow-sm border-0 text-center rounded-4 h-100 award-card">
                <Card.Body>
                  <div className="mb-3">{award.icon}</div>
                  <h5 className="fw-bold">{award.title}</h5>
                  <p className="text-muted small">{award.description}</p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Custom CSS for Hover Effect */}
      <style>{`
        .award-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .award-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.15);
        }
      `}</style>
    </div>
  );
};

export default Awards;
