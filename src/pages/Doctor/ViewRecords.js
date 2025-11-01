// src/pages/Doctor/ViewRecords.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    Card,
    Tab,
    Nav,
    Table,
    Badge,
    Form,
    InputGroup,
    Button,
    Modal,
    Col,
    Row,
} from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEdit, FaTrash } from "react-icons/fa";

const ViewRecords = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [patient, setPatient] = useState(null);
    const [search, setSearch] = useState("");
    const [modalType, setModalType] = useState(null);
    const [formData, setFormData] = useState({});
    const [editData, setEditData] = useState(null);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("authToken"); // change if key is different

    // Fetch patient data
    const fetchPatient = async () => {
        try {
            setLoading(true);
            const res = await fetch(`http://localhost:5000/doctor/allPatient/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!res.ok) throw new Error("Failed to fetch patient data");
            const data = await res.json();
            setPatient(data);
        } catch (err) {
            toast.error(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPatient();
    }, [id]);

    if (loading) return <p className="text-center mt-5">Loading records...</p>;
    if (!patient) return <p className="text-center mt-5">No patient found.</p>;

    const filterData = (arr) =>
        arr?.filter((item) =>
            Object.values(item).some((val) =>
                String(val).toLowerCase().includes(search.toLowerCase())
            )
        ) || [];

    const handleClose = () => {
        setModalType(null);
        setFormData({});
        setEditData(null);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Save (Add / Edit)
    const handleSave = async () => {
        try {
            let url = "";
            let method = "POST";

            if (modalType === "history") url = `/doctor/addHistory/${id}`;
            if (modalType === "appointment") url = `/doctor/addAppointment/${id}`;
            if (modalType === "prescription") url = `/doctor/addPrescription/${id}`;

            // If editing, send update route
            if (editData) {
                if (modalType === "appointment") {
                    url = `/doctor/updateAppointment/${id}/${editData._id}`;
                    method = "PUT";
                }
                if (modalType === "prescription") {
                    url = `/doctor/updatePrescription/${id}/${editData._id}`;
                    method = "PUT";
                }
            }

            const res = await fetch(`http://localhost:5000${url}`, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.message || "Failed to save record");
            }

            toast.success(
                `${modalType.charAt(0).toUpperCase() + modalType.slice(1)} ${editData ? "updated" : "added"
                } successfully`
            );
            handleClose();
            fetchPatient();
        } catch (err) {
            toast.error(err.message || "Error saving record");
        }
    };

    // Delete Appointment / Prescription
    const handleDelete = async (type, itemId) => {
        try {
            const res = await fetch(
                `http://localhost:5000/doctor/delete${type}/${id}/${itemId}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.message || "Delete failed");
            }

            toast.success(`${type} deleted successfully`);
            fetchPatient();
        } catch (err) {
            toast.error(err.message || "Error deleting record");
        }
    };

    // Open modal for editing
    const handleEdit = (type, item) => {
        setModalType(type);
        setEditData(item);
        setFormData(item);
    };

    return (
        <div className="container py-4">
            <ToastContainer position="top-right" autoClose={3000} />
            <Card className="shadow-lg border-0">
                <Card.Header
                    style={{ backgroundColor: "rgb(46, 125, 50)" }}
                    className="text-white d-flex justify-content-between align-items-center"
                >
                    <h4 className="mb-0">Patient Records</h4>
                    <Button size="sm" variant="light" onClick={() => navigate("/doctor/Patients")}>
                        ← Back
                    </Button>
                </Card.Header>

                <Card.Body>
                    <Row className="mb-4">
                        <Col md={6}>
                            <p><strong>ID: {1000 + 1}</strong></p>
                            <p>
                                <strong>Status:</strong>{" "}
                                <Badge bg={patient.status === "Active" ? "success" : "danger"}>
                                    {patient.status}
                                </Badge>
                            </p>
                        </Col>
                        <Col md={6}>
                            <h5>{patient.name} <Badge bg="info">{patient.gender}</Badge></h5>
                            <p><strong>Email:</strong> {patient.email}</p>
                            <p><strong>Mobile:</strong> {patient.phone}</p>
                            <p><strong>Age:</strong> {patient.age}</p>
                        </Col>
                    </Row>

                    <InputGroup className="mb-3">
                        <Form.Control
                            placeholder="Search records..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <Button variant="outline-secondary" onClick={() => setSearch("")}>
                            Clear
                        </Button>
                    </InputGroup>

                    <Tab.Container defaultActiveKey="history">
                        <Nav variant="tabs" className="mb-3">
                            <Nav.Item><Nav.Link eventKey="history">Medical History</Nav.Link></Nav.Item>
                            <Nav.Item><Nav.Link eventKey="appointments">Appointments</Nav.Link></Nav.Item>
                            <Nav.Item><Nav.Link eventKey="prescriptions">Prescriptions</Nav.Link></Nav.Item>
                        </Nav>

                        <Tab.Content>
                            {/* History */}
                            <Tab.Pane eventKey="history">
                                {filterData(patient.history).length ? (
                                    <Table striped bordered hover responsive>
                                        <thead>
                                            <tr><th>Date</th><th>Details</th></tr>
                                        </thead>
                                        <tbody>
                                            {filterData(patient.history).map((h, i) => (
                                                <tr key={i}>
                                                    <td>{new Date(h.date).toLocaleDateString()}</td>
                                                    <td>{h.details}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                ) : <p className="text-muted">No history found.</p>}
                            </Tab.Pane>

                            {/* Appointments */}
                            <Tab.Pane eventKey="appointments">
                                {filterData(patient.appointments).length ? (
                                    <Table striped bordered hover responsive>
                                        <thead>
                                            <tr><th>Date</th><th>Doctor</th><th>Status</th><th>Actions</th></tr>
                                        </thead>
                                        <tbody>
                                            {filterData(patient.appointments).map((a) => (
                                                <tr key={a._id}>
                                                    <td>{new Date(a.date).toLocaleDateString()}</td>
                                                    <td>{a.doctor}</td>
                                                    <td>
                                                        {a.status === "Completed" ? (
                                                            <Badge bg="success">{a.status}</Badge>
                                                        ) : a.status === "Cancelled" ? (
                                                            <Badge bg="danger">{a.status}</Badge>
                                                        ) : (
                                                            <Badge bg="warning">{a.status}</Badge>
                                                        )}
                                                    </td>

                                                    <td>
                                                        <Button
                                                            size="sm"
                                                            variant="outline-primary"
                                                            onClick={() => handleEdit("appointment", a)}
                                                            className="me-2"
                                                        >
                                                            <FaEdit />
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            variant="outline-danger"
                                                            onClick={() => handleDelete("Appointment", a._id)}
                                                        >
                                                            <FaTrash />
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                ) : <p className="text-muted">No appointments found.</p>}
                            </Tab.Pane>

                            {/* Prescriptions */}
                            <Tab.Pane eventKey="prescriptions">
                                {filterData(patient.prescriptions).length ? (
                                    <Table striped bordered hover responsive>
                                        <thead>
                                            <tr><th>Date</th><th>Medicine</th><th>Duration</th><th>Actions</th></tr>
                                        </thead>
                                        <tbody>
                                            {filterData(patient.prescriptions).map((p) => (
                                                <tr key={p._id}>
                                                    <td>{new Date(p.date).toLocaleDateString()}</td>
                                                    <td>{p.medicine}</td>
                                                    <td>{p.duration}</td>
                                                    <td>
                                                        <Button
                                                            size="sm"
                                                            variant="outline-primary"
                                                            onClick={() => handleEdit("prescription", p)}
                                                            className="me-2"
                                                        >
                                                            <FaEdit />
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            variant="outline-danger"
                                                            onClick={() => handleDelete("Prescription", p._id)}
                                                        >
                                                            <FaTrash />
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                ) : <p className="text-muted">No prescriptions found.</p>}
                            </Tab.Pane>
                        </Tab.Content>
                    </Tab.Container>
                </Card.Body>
            </Card>

            {/* Floating Buttons */}
            <div className="position-fixed bottom-0 end-0 p-3 d-flex flex-column gap-2" style={{ zIndex: 1000 }}>
                <Button variant="success" onClick={() => setModalType("history")}>+ Add History</Button>
                <Button variant="info" onClick={() => setModalType("appointment")}>+ New Appointment</Button>
                <Button variant="warning" onClick={() => setModalType("prescription")}>+ Prescription</Button>
            </div>

            {/* Modal */}
            <Modal show={!!modalType} onHide={handleClose} centered size="md">
                <Modal.Header closeButton style={{ backgroundColor: "#28a745", color: "white" }}>
                    <Modal.Title>
                        {editData
                            ? `Edit ${modalType.charAt(0).toUpperCase() + modalType.slice(1)}`
                            : modalType === "history" && "Add Medical History"}
                        {modalType === "appointment" && !editData && "Schedule Appointment"}
                        {modalType === "prescription" && !editData && "Add Prescription"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-4">
                    <Form>
                        {modalType === "history" && (
                            <>
                                <Form.Group className="mb-3">
                                    <Form.Label>Date</Form.Label>
                                    <Form.Control type="date" name="date" value={formData.date || ""} onChange={handleChange} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Details</Form.Label>
                                    <Form.Control as="textarea" rows={3} name="details" value={formData.details || ""} onChange={handleChange} />
                                </Form.Group>
                            </>
                        )}

                        {modalType === "appointment" && (
                            <>
                                <Form.Group className="mb-3">
                                    <Form.Label>Date</Form.Label>
                                    <Form.Control type="date" name="date" value={formData.date || ""} onChange={handleChange} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Doctor</Form.Label>
                                    <Form.Control type="text" name="doctor" value={formData.doctor || ""} onChange={handleChange} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Status</Form.Label>
                                    <Form.Select name="status" value={formData.status || ""} onChange={handleChange}>
                                        <option value="Upcoming">Upcoming</option>
                                        <option value="Completed">Completed</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </Form.Select>
                                </Form.Group>
                            </>
                        )}

                        {modalType === "prescription" && (
                            <>
                                <Form.Group className="mb-3">
                                    <Form.Label>Date</Form.Label>
                                    <Form.Control type="date" name="date" value={formData.date || ""} onChange={handleChange} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Medicine</Form.Label>
                                    <Form.Control type="text" name="medicine" value={formData.medicine || ""} onChange={handleChange} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Duration</Form.Label>
                                    <Form.Control type="text" name="duration" value={formData.duration || ""} onChange={handleChange} />
                                </Form.Group>
                            </>
                        )}
                    </Form>
                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-between">
                    <Button variant="outline-secondary" onClick={handleClose}>Cancel</Button>
                    <Button style={{ backgroundColor: "#28a745", border: "none" }} onClick={handleSave}>Save</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ViewRecords;
