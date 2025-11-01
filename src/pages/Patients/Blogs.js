import React, { useState } from "react";
import { Card, Button, Row, Col, Form, InputGroup, Badge } from "react-bootstrap";
import { FaSearch, FaUserMd, FaHeartbeat, FaStethoscope } from "react-icons/fa";

const Blogs = () => {
  const [search, setSearch] = useState("");

  const blogPosts = [
    {
      id: 1,
      title: "How Rural Clinics Can Improve Healthcare Access",
      author: "Dr. Asha Patel",
      date: "Aug 20, 2025",
      category: "Healthcare",
      icon: <FaHeartbeat />,
      content:
        "Rural clinics play a vital role in bridging the healthcare gap. Digital solutions like HealthTracker improve patient record management, appointment scheduling, and follow-ups."
    },
    {
      id: 2,
      title: "The Role of Technology in Rural Health",
      author: "Dr. Ramesh Kumar",
      date: "Aug 15, 2025",
      category: "Technology",
      icon: <FaStethoscope />,
      content:
        "With the adoption of HealthTracker, clinics can streamline processes and provide efficient healthcare even in remote areas."
    },
    {
      id: 3,
      title: "Why Preventive Care is Important in Villages",
      author: "Dr. Neha Shah",
      date: "Aug 10, 2025",
      category: "Wellness",
      icon: <FaUserMd />,
      content:
        "Preventive care reduces long-term costs and improves the overall health of rural populations. Digital health platforms can assist in tracking vaccination and regular checkups."
    }
  ];

  const filteredBlogs = blogPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4" style={{ color: "rgb(40, 167, 69)" }}>
        HealthTracker Blogs
      </h2>

      {/* Search Bar */}
      <InputGroup className="mb-4">
        <InputGroup.Text>
          <FaSearch />
        </InputGroup.Text>
        <Form.Control
          placeholder="Search blogs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </InputGroup>

      {/* Blog Cards */}
      <Row>
        {filteredBlogs.map((post) => (
          <Col md={6} lg={4} key={post.id} className="mb-4">
            <Card className="h-100 shadow border-0">
              <Card.Body>
                <div
                  className="d-flex align-items-center mb-2"
                  style={{ color: "rgb(40, 167, 69)", fontSize: "1.5rem" }}
                >
                  {post.icon}
                  <h5 className="ms-2">{post.title}</h5>
                </div>
                <Card.Text style={{ fontSize: "0.95rem", minHeight: "100px" }}>
                  {post.content}
                </Card.Text>
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <small className="text-muted">
                    By {post.author} <br />
                    {post.date}
                  </small>
                  <Badge bg="success">{post.category}</Badge>
                </div>
              </Card.Body>
              <Card.Footer className="bg-white border-0">
                <Button
                  variant="success"
                  style={{ backgroundColor: "rgb(40, 167, 69)" }}
                >
                  Read More
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Blogs;
