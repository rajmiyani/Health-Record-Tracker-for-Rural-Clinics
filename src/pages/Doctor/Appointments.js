import React, { useState, useEffect } from "react";
import { Modal, Button, Table, Form, InputGroup, Row, Col } from "react-bootstrap";
import { FaCalendarAlt, FaUser, FaPhone } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify"; // ✅ Toastify
import "react-toastify/dist/ReactToastify.css";

const DoctorAppointments = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("view"); // view or edit
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [appointments, setAppointments] = useState([]);

  // controlled form state for edit modal
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    reason: "",
    status: "Scheduled",
  });

  const navigate = useNavigate();

  // ✅ Fetch all appointments
  const fetchAppointments = async () => {
    try {
      const res = await axios.get("http://localhost:5000/patient/getAppointments");
      const updatedAppointments = res.data.map((appt) => {
        if (appt.status === "Scheduled") {
          const apptDate = new Date(appt.date);
          const today = new Date();
          if (apptDate < today) {
            appt.status = "Completed"; // auto-mark past scheduled as completed
          }
        }
        return appt;
      });
      setAppointments(updatedAppointments || []);
    } catch (err) {
      console.error("Error fetching appointments:", err);
      toast.error("Failed to fetch appointments");
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // ✅ handle modal open
  const handleModalOpen = (appt, type) => {
    setSelectedAppointment(appt);
    setModalType(type);

    if (type === "edit" && appt) {
      setFormData({
        date: appt.date ? appt.date.split("T")[0] : "",
        time: appt.date ? appt.date.split("T")[1]?.slice(0, 5) : "",
        reason: appt.reason || "",
        status: appt.status || "Scheduled",
      });
    }
    setShowModal(true);
  };

  // handle modal close
  const handleModalClose = () => {
    setShowModal(false);
    setSelectedAppointment(null);
  };

  // handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ update appointment
  const handleUpdate = async () => {
    if (!selectedAppointment) return;

    try {
      await axios.put(
        `http://localhost:5000/patient/updateAppointment/${selectedAppointment._id}`,
        {
          date: formData.date,
          time: formData.time,
          reason: formData.reason,
          status: formData.status,
        }
      );

      toast.success("Appointment updated successfully ✅");
      fetchAppointments();
      setShowModal(false);
      setSelectedAppointment(null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update appointment ❌");
    }
  };

  // ✅ filter appointments
  const filteredAppointments = appointments.filter((appt) => {
    const patientName = appt.patient?.name || "";
    const matchSearch =
      patientName.toLowerCase().includes(search.toLowerCase()) ||
      (appt.reason || "").toLowerCase().includes(search.toLowerCase()) ||
      (appt.doctorName || "").toLowerCase().includes(search.toLowerCase());

    const matchStatus = statusFilter === "All" || appt.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const formatDateTime = (dateStr) => {
    if (!dateStr) return "-";
    const dateObj = new Date(dateStr);
    const optionsDate = { day: "2-digit", month: "2-digit", year: "numeric" };
    const optionsTime = { hour: "2-digit", minute: "2-digit", hour12: true };
    return `${dateObj.toLocaleDateString("en-GB", optionsDate)} ${dateObj.toLocaleTimeString("en-US", optionsTime)}`;
  };

  return (
    <div className="container py-4">
      {/* ✅ Toastify Container */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold mb-0">Doctor Appointments</h3>
          <p className="text-muted mb-0">View and manage patient appointments</p>
        </div>
        <Button
          style={{ backgroundColor: "#28a745", border: "none" }}
          onClick={() => navigate("/doctor/scheduleAppointments")}
        >
          + New Appointment
        </Button>
      </div>

      {/* Search & Filter */}
      <Row className="g-2 mb-3">
        <Col md={9} sm={12}>
          <InputGroup>
            <Form.Control
              placeholder="Search appointments by patient, reason, or doctor..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col md={3} sm={12}>
          <Form.Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="All">All Status</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </Form.Select>
        </Col>
      </Row>

      {/* Table */}
      <div className="card shadow-sm border-0 rounded-3">
        <div className="card-body p-0">
          <h5 className="p-3 border-bottom mb-0 d-flex align-items-center">
            <FaCalendarAlt className="me-2 text-success" />
            Appointments ({filteredAppointments.length})
          </h5>
          {filteredAppointments.length === 0 ? (
            <p className="text-center text-muted py-4 mb-0">No appointments found</p>
          ) : (
            <Table responsive hover className="mb-0">
              <thead className="table-light">
                <tr>
                  <th>Patient</th>
                  <th>Date & Time</th>
                  <th>Reason</th>
                  <th>Doctor</th>
                  <th>Status</th>
                  <th>Contact</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.map((appt) => (
                  <tr key={appt._id}>
                    <td>
                      <FaUser className="me-2 text-muted" />
                      {appt.patient?.name || "-"}
                    </td>
                    <td>
                      <FaCalendarAlt className="me-2 text-muted" />
                      {formatDateTime(appt.date)}
                    </td>
                    <td>{appt.reason || "-"}</td>
                    <td>{appt.doctorName || "-"}</td>
                    <td>
                      <span
                        className={`badge ${
                          appt.status === "Completed"
                            ? "bg-secondary"
                            : appt.status === "Scheduled"
                            ? "bg-success"
                            : "bg-danger"
                        }`}
                      >
                        {appt.status}
                      </span>
                    </td>
                    <td>
                      <FaPhone className="me-2 text-muted" />
                      {appt.patient?.phone || "-"}
                    </td>
                    <td>
                      <div className="d-flex gap-2">
                        <Button
                          variant="outline-success"
                          size="sm"
                          onClick={() => handleModalOpen(appt, "edit")}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          onClick={() => handleModalOpen(appt, "view")}
                        >
                          View
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={handleModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalType === "view" ? "View Appointment" : "Edit Appointment"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedAppointment && modalType === "view" && (
            <div>
              <p><strong>Patient:</strong> {selectedAppointment.patient?.name}</p>
              <p><strong>Date & Time:</strong> {formatDateTime(selectedAppointment.date)}</p>
              <p><strong>Reason:</strong> {selectedAppointment.reason || "-"}</p>
              <p><strong>Doctor:</strong> {selectedAppointment.doctorName || "-"}</p>
              <p><strong>Status:</strong> {selectedAppointment.status}</p>
              <p><strong>Contact:</strong> {selectedAppointment.patient?.phone || "-"}</p>
            </div>
          )}

          {selectedAppointment && modalType === "edit" && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Appointment Date</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Appointment Time</Form.Label>
                <Form.Control
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Reason for Visit</Form.Label>
                <Form.Control
                  type="text"
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="Scheduled">Scheduled</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </Form.Select>
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          {modalType === "edit" && (
            <Button
              style={{ backgroundColor: "#28a745", border: "none" }}
              onClick={handleUpdate}
            >
              Save Changes
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DoctorAppointments;
