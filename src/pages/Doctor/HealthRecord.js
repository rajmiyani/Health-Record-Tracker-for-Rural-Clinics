import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  InputGroup,
  Row,
  Col,
} from "react-bootstrap";
import { FaUser, FaNotesMedical } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const HealthRecords = () => {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("view");
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [records, setRecords] = useState([]);
  const [patients, setPatients] = useState([]); // ✅ store all patients with IDs

  const navigate = useNavigate();

  // ✅ Fetch records and patients
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [recordsRes, patientsRes] = await Promise.all([
          axios.get("http://localhost:5000/doctor/allRecords"),
          axios.get("http://localhost:5000/doctor/allPatient"),
        ]);

        setRecords(recordsRes.data);
        setPatients(patientsRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  // ✅ Searching & Filtering
  const filteredRecords = records.filter((rec) => {
    const patientName = rec.patient?.name?.toLowerCase() || "";
    const provider = rec.provider?.toLowerCase() || "";
    const diagnosis = rec.diagnosis?.toLowerCase() || "";
    const type = rec.type?.toLowerCase() || "";

    const matchSearch =
      patientName.includes(search.toLowerCase()) ||
      provider.includes(search.toLowerCase()) ||
      diagnosis.includes(search.toLowerCase()) ||
      type.includes(search.toLowerCase());

    const matchType = typeFilter === "All" || rec.type === typeFilter;

    return matchSearch && matchType;
  });

  const handleModalOpen = (rec, type) => {
    setSelectedRecord(rec);
    setModalType(type);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedRecord(null);
  };

  // ✅ Update record in backend
  const handleSaveChanges = async () => {
    try {
      await axios.put(
        `http://localhost:5000/doctor/updateRecord/${selectedRecord._id}`,
        {
          ...selectedRecord,
          patientId: selectedRecord.patient?._id || selectedRecord.patientId, // send correct ObjectId
        }
      );

      setRecords((prev) =>
        prev.map((r) => (r._id === selectedRecord._id ? selectedRecord : r))
      );
      handleModalClose();
    } catch (err) {
      console.error("Error updating record:", err);
    }
  };

  return (
    <div className="container py-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold mb-0">Health Records</h3>
          <p className="text-muted mb-0">
            View and manage patient health records and medical history
          </p>
        </div>
        <Button
          style={{ backgroundColor: "#28a745", border: "none" }}
          onClick={() => navigate("/doctor/newRecord")}
        >
          + New Record
        </Button>
      </div>

      {/* Search & Filter */}
      <Row className="g-2 mb-3">
        <Col md={9} sm={12}>
          <InputGroup>
            <Form.Control
              placeholder="Search records by patient, provider, diagnosis..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col md={3} sm={12}>
          <Form.Select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="All">All Types</option>
            <option value="Consultation">Consultation</option>
            <option value="Lab Results">Lab Results</option>
          </Form.Select>
        </Col>
      </Row>

      {/* Table */}
      <div className="card shadow-sm border-0 rounded-3">
        <div className="card-body p-0">
          <h5 className="p-3 border-bottom mb-0 d-flex align-items-center">
            <FaNotesMedical className="me-2 text-success" />
            Health Records ({filteredRecords.length})
          </h5>
          {filteredRecords.length === 0 ? (
            <p className="text-center text-muted py-4 mb-0">
              No records found
            </p>
          ) : (
            <Table responsive hover className="mb-0">
              <thead className="table-light">
                <tr>
                  <th>Patient</th>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Provider</th>
                  <th>Diagnosis</th>
                  <th>Treatment</th>
                  <th>Vitals</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRecords.map((rec) => (
                  <tr key={rec._id}>
                    <td>
                      <FaUser className="me-2 text-muted" />
                      {rec.patient?.name || "Unknown"}
                    </td>
                    <td>{new Date(rec.date).toLocaleDateString()}</td>
                    <td>
                      {rec.type === "Consultation" ? (
                        <span className="badge bg-primary">Consultation</span>
                      ) : (
                        <span className="badge bg-success">Lab Results</span>
                      )}
                    </td>
                    <td>{rec.provider}</td>
                    <td>{rec.diagnosis}</td>
                    <td>{rec.treatment}</td>
                    <td>{rec.vitals}</td>
                    <td>
                      <div className="d-flex gap-2">
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          onClick={() => handleModalOpen(rec, "view")}
                        >
                          View
                        </Button>
                        <Button
                          variant="outline-success"
                          size="sm"
                          onClick={() => handleModalOpen(rec, "edit")}
                        >
                          Edit
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
            {modalType === "view" ? "View Record" : "Edit Record"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedRecord && modalType === "view" && (
            <div>
              <p>
                <strong>Patient:</strong> {selectedRecord.patient?.name || "Unknown"}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(selectedRecord.date).toLocaleDateString()}
              </p>
              <p>
                <strong>Type:</strong> {selectedRecord.type}
              </p>
              <p>
                <strong>Provider:</strong> {selectedRecord.provider}
              </p>
              <p>
                <strong>Diagnosis:</strong> {selectedRecord.diagnosis}
              </p>
              <p>
                <strong>Treatment:</strong> {selectedRecord.treatment}
              </p>
              <p>
                <strong>Vitals:</strong> {selectedRecord.vitals}
              </p>
            </div>
          )}

          {selectedRecord && modalType === "edit" && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Patient</Form.Label>
                <Form.Select
                  value={selectedRecord.patient?._id || ""}
                  onChange={(e) => {
                    const patientObj = patients.find(
                      (p) => p._id === e.target.value
                    );
                    setSelectedRecord({
                      ...selectedRecord,
                      patient: patientObj,
                      patientId: patientObj?._id,
                    });
                  }}
                >
                  <option value="">Select Patient</option>
                  {patients.map((p) => (
                    <option key={p._id} value={p._id}>
                      {p.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Diagnosis</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedRecord.diagnosis}
                  onChange={(e) =>
                    setSelectedRecord({
                      ...selectedRecord,
                      diagnosis: e.target.value,
                    })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Treatment</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedRecord.treatment}
                  onChange={(e) =>
                    setSelectedRecord({
                      ...selectedRecord,
                      treatment: e.target.value,
                    })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Vitals</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedRecord.vitals}
                  onChange={(e) =>
                    setSelectedRecord({
                      ...selectedRecord,
                      vitals: e.target.value,
                    })
                  }
                />
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
              onClick={handleSaveChanges}
            >
              Save Changes
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default HealthRecords;
