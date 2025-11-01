import React, { useState, useEffect } from "react";
import { Button, Card, Form, Row, Col } from "react-bootstrap";
import { FaUserDoctor, FaHeartPulse, FaBolt, FaCalendarCheck, FaClock } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SetAvailability = () => {
  const [days, setDays] = useState([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [emergency, setEmergency] = useState(false);
  const [loading, setLoading] = useState(true);

  const daysOfWeek = [
    "Monday", "Tuesday", "Wednesday", "Thursday",
    "Friday", "Saturday", "Sunday",
  ];

  // Toggle day selection
  const toggleDay = (day) => {
    setDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  // Fetch availability from backend
  const fetchAvailability = async () => {
    try {
      const res = await fetch("http://localhost:5000/doctor/getAvailability");
      if (!res.ok) throw new Error("Failed to fetch availability");
      const data = await res.json();
      if (data) {
        setDays(data.days || []);
        setStartTime(data.startTime || "");
        setEndTime(data.endTime || "");
        setEmergency(data.emergency || false);
      }
    } catch (error) {
      toast.error(`❌ Error fetching availability: ${error.message}`, {
        position: "top-right",
        autoClose: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAvailability();
  }, []);

  // Save availability to backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      days,
      startTime,
      endTime,
      emergency,
    };

    try {
      const res = await fetch("http://localhost:5000/doctor/setAvailability", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to save");

      toast.success("Availability saved successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      toast.error(`${error.message}`, {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  if (loading) return <p className="text-center mt-5">Loading...</p>;

  return (
    <section className="d-flex align-items-center">
      <div className="container">
        <Card className="shadow-lg border-0">
          <Card.Body className="p-5">
            {/* Header */}
            <div className="text-center mb-5">
              <FaUserDoctor size={60} className="text-success mb-3" />
              <h1 className="fw-bold">Set Doctor Availability</h1>
              <p className="text-muted fs-5">
                Define your working days and timings for patients to book easily.
              </p>
            </div>

            {/* Emergency Mode */}
            <div className="text-center mb-5">
              <Button
                variant={emergency ? "danger" : "secondary"}
                className="rounded-pill fw-bold px-4 py-2"
                onClick={() => setEmergency(!emergency)}
                size="lg"
              >
                {emergency ? (
                  <><FaBolt className="me-2" /> Emergency Mode: Active ⚡</>
                ) : (
                  <><FaHeartPulse className="me-2" /> Enable Emergency Mode</>
                )}
              </Button>
            </div>

            <Form onSubmit={handleSubmit}>
              {!emergency && (
                <>
                  {/* Days */}
                  <div className="mb-4">
                    <h5 className="fw-semibold mb-3">
                      <FaCalendarCheck className="text-success me-2" /> Working Days
                    </h5>
                    <div className="d-flex flex-wrap gap-2">
                      {daysOfWeek.map((day) => (
                        <Button
                          key={day}
                          type="button"
                          variant={days.includes(day) ? "success" : "outline-success"}
                          className="rounded-pill px-3 py-2"
                          onClick={() => toggleDay(day)}
                        >
                          {day}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Time */}
                  <Row className="mb-4">
                    <Col md={6} className="mb-3">
                      <Form.Label className="fw-semibold">
                        <FaClock className="text-success me-2" /> Start Time
                      </Form.Label>
                      <Form.Control
                        type="time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        required
                      />
                    </Col>
                    <Col md={6} className="mb-3">
                      <Form.Label className="fw-semibold">
                        <FaClock className="text-danger me-2" /> End Time
                      </Form.Label>
                      <Form.Control
                        type="time"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        required
                      />
                    </Col>
                  </Row>
                </>
              )}

              <div className="text-center mt-4">
                <Button
                  type="submit"
                  className="px-5 py-2 fw-bold rounded-pill shadow"
                  style={{ backgroundColor: "#28a745", border: "none", fontSize: "1.2rem" }}
                >
                  Save Availability
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </section>
  );
};

export default SetAvailability;
