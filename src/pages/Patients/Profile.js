// src/pages/Patient/ProfilePage.js
import React, { useState, useEffect, useRef } from "react";
import {
    FaUserCircle,
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
    FaBirthdayCake,
    FaVenusMars,
    FaBriefcaseMedical,
    FaEdit,
    FaSave,
    FaTimes,
    FaIdBadge,
    FaShieldAlt,
    FaHeartbeat,
} from "react-icons/fa";
import { Card, Button, Form, Row, Col, Container } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
    getPatientProfile,
    updatePatientProfile,
} from "../../services/api.js";

// Format date to DD/MM/YYYY
const formatDate = (dateString) => {
    if (!dateString || dateString === "N/A") return "N/A";
    const date = new Date(dateString);
    if (isNaN(date)) return "N/A";
    return date.toLocaleDateString("en-GB"); // DD/MM/YYYY
};

const ProfilePage = () => {
    const [patientData, setPatientData] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [updatedData, setUpdatedData] = useState({});
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);

    const BASE_URL = "http://localhost:5000";

    // Normalize patient data -> fallback to "N/A"
    const normalizePatientData = (data) => {
        return {
            name: data?.name || "N/A",
            email: data?.email || "N/A",
            phone: data?.phone || "N/A",
            dob: data?.dob ? formatDate(data.dob) : "N/A",
            gender: data?.gender || "N/A",
            address: data?.address || "N/A",
            bloodGroup: data?.bloodGroup || "N/A",
            medicalHistory: data?.medicalHistory || "N/A",
            allergies: data?.allergies || "N/A",
            emergencyContact: data?.emergencyContact || "N/A",
            insurance: data?.insurance || "N/A",
            profileImage: data?.profileImage
                ? `${BASE_URL}${data.profileImage}` // ✅ full URL
                : null,
        };
    };

    // Fetch profile on mount
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await getPatientProfile();
                const normalized = normalizePatientData(res.data.patient);

                setPatientData(normalized);
                setUpdatedData(normalized);
                localStorage.setItem("PatientData", JSON.stringify(normalized));
            } catch (err) {
                console.error(err);
                const errorMsg =
                    err.response?.data?.message || "Failed to load profile";
                toast.error(errorMsg);
            }
        };

        fetchProfile();
    }, []);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle profile image selection
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setUpdatedData((prev) => ({
                ...prev,
                profileImage: URL.createObjectURL(file), // Preview image
            }));
        }
    };

    // Trigger file input
    const handleEditImage = () => {
        fileInputRef.current.click();
    };

    // Save profile
    const handleSave = async () => {
        try {
            const formData = createFormData(updatedData);
            if (selectedFile) {
                formData.append("profileImage", selectedFile);
            }

            const res = await updatePatientProfile(formData);
            const normalized = normalizePatientData(res.data.patient);

            toast.success("Profile updated successfully");
            setPatientData(normalized);
            localStorage.setItem("PatientData", JSON.stringify(normalized));
            setEditMode(false);
            setSelectedFile(null);
        } catch (err) {
            console.error(err);
            const errorMsg =
                err.response?.data?.message || "Failed to update profile";
            toast.error(errorMsg);
        }
    };

    // Cancel edit
    const handleCancel = () => {
        setUpdatedData({ ...patientData });
        setEditMode(false);
        setSelectedFile(null);
    };

    // Convert object to FormData
    const createFormData = (obj) => {
        const formData = new FormData();
        Object.keys(obj).forEach((key) => {
            if (obj[key] !== "N/A") {
                formData.append(key, obj[key]);
            }
        });
        return formData;
    };

    // if (loading) {
    //     return <p className="text-center mt-5">Loading profile...</p>;
    // }

    return (
        <div
            className="profile-page min-vh-100"
            style={{
                backgroundColor: "rgb(232, 245, 233)",
            }}
        >
            <ToastContainer position="top-right" autoClose={3000} />

            {/* Banner */}
            <div
                className="profile-banner text-white"
                style={{
                    backgroundImage:
                        "url('https://static.vecteezy.com/system/resources/previews/001/330/423/non_2x/stethoscope-and-face-mask-with-hearts-on-light-blue-vector.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    padding: "70px 30px",
                    borderBottomLeftRadius: "40px",
                    borderBottomRightRadius: "40px",
                    boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                <div
                    style={{
                        background:
                            "linear-gradient(to bottom right, rgba(255,255,255,0.4), rgba(255,255,255,0.1))",
                        position: "absolute",
                        inset: 0,
                        borderBottomLeftRadius: "40px",
                        borderBottomRightRadius: "40px",
                        backdropFilter: "brightness(0.9)",
                    }}
                ></div>

                <Container style={{ position: "relative", zIndex: 2 }}>
                    <Row className="align-items-center text-white">
                        <Col md={2} className="text-center mb-3 mb-md-0 position-relative">
                            {patientData?.profileImage ? (
                                <div className="position-relative d-inline-block">
                                    <img
                                        src={patientData.profileImage}
                                        alt="profile"
                                        className="rounded-circle shadow"
                                        style={{
                                            width: "120px",
                                            height: "120px",
                                            objectFit: "cover",
                                        }}
                                    />
                                    <FaEdit
                                        onClick={handleEditImage}
                                        className="position-absolute bottom-0 end-0 bg-success text-white rounded-circle p-2 shadow"
                                        size={30}
                                        style={{ cursor: "pointer" }}
                                    />
                                </div>
                            ) : (
                                <div className="position-relative d-inline-block">
                                    <FaUserCircle
                                        size={120}
                                        className="bg-white rounded-circle p-2 text-success shadow"
                                    />
                                    <FaEdit
                                        onClick={handleEditImage}
                                        className="position-absolute bottom-0 end-0 bg-success text-white rounded-circle p-2 shadow"
                                        size={30}
                                        style={{ cursor: "pointer" }}
                                    />
                                </div>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                className="d-none"
                                onChange={handleFileChange}
                            />
                        </Col>

                        <Col md={7}>
                            <h1 className="fw-bold">{patientData?.name || "Unnamed"}</h1>
                            <p className="mb-1">
                                <FaEnvelope className="me-2" /> {patientData?.email}
                            </p>
                            <p className="mb-0">
                                <FaPhone className="me-2" /> {patientData?.phone}
                            </p>
                        </Col>
                        <Col md={3} className="text-md-end text-center">
                            {!editMode && (
                                <Button
                                    variant="light"
                                    className="rounded-pill px-4 py-2 shadow-sm fw-semibold"
                                    onClick={() => setEditMode(true)}
                                >
                                    <FaEdit className="me-2" /> Edit Profile
                                </Button>
                            )}
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* Content */}
            <Container className="py-5">
                {!editMode ? (
                    <Row>
                        {/* Personal Info */}
                        <Col md={6} className="mb-4">
                            <Card className="shadow border-0 rounded-4 card-hover">
                                <Card.Body>
                                    <h5 className="fw-bold text-success mb-3">
                                        <FaIdBadge className="me-2" /> Personal Information
                                    </h5>
                                    <p>
                                        <FaBirthdayCake className="me-2 text-danger" />
                                        <strong>DOB:</strong> {patientData?.dob}
                                    </p>
                                    <p>
                                        <FaVenusMars className="me-2 text-warning" />
                                        <strong>Gender:</strong> {patientData?.gender}
                                    </p>
                                    <p>
                                        <FaMapMarkerAlt className="me-2 text-success" />
                                        <strong>Address:</strong> {patientData?.address}
                                    </p>
                                </Card.Body>
                            </Card>
                        </Col>

                        {/* Medical Info */}
                        <Col md={6} className="mb-4">
                            <Card className="shadow border-0 rounded-4 card-hover">
                                <Card.Body>
                                    <h5 className="fw-bold text-success mb-3">
                                        <FaHeartbeat className="me-2" /> Medical Information
                                    </h5>
                                    <p>
                                        <FaBriefcaseMedical className="me-2 text-danger" />
                                        <strong>Blood Group:</strong> {patientData?.bloodGroup}
                                    </p>
                                    <p>
                                        <strong>Medical History:</strong>{" "}
                                        {patientData?.medicalHistory}
                                    </p>
                                    <p>
                                        <strong>Allergies:</strong> {patientData?.allergies}
                                    </p>
                                </Card.Body>
                            </Card>
                        </Col>

                        {/* Emergency Contact */}
                        <Col md={6} className="mb-4">
                            <Card className="shadow border-0 rounded-4 card-hover">
                                <Card.Body>
                                    <h5 className="fw-bold text-success mb-3">
                                        <FaPhone className="me-2" /> Emergency Contact
                                    </h5>
                                    <p>
                                        Dr. Raj Miyani {patientData?.emergencyContact ? ` - ${patientData.emergencyContact}` : ""}
                                    </p>
                                </Card.Body>
                            </Card>
                        </Col>

                        {/* Insurance */}
                        <Col md={6} className="mb-4">
                            <Card className="shadow border-0 rounded-4 card-hover">
                                <Card.Body>
                                    <h5 className="fw-bold text-success mb-3">
                                        <FaShieldAlt className="me-2" /> Insurance Details
                                    </h5>
                                    <p>{patientData?.insurance}</p>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                ) : (
                    /* Edit Form */
                    <Card className="shadow-lg border-0 rounded-4 p-4">
                        <Form>
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-bold">Full Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="name"
                                            value={
                                                updatedData.name !== "N/A" ? updatedData.name : ""
                                            }
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-bold">Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            value={
                                                updatedData.email !== "N/A" ? updatedData.email : ""
                                            }
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-bold">Phone</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="phone"
                                            value={
                                                updatedData.phone !== "N/A" ? updatedData.phone : ""
                                            }
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-bold">Gender</Form.Label>
                                        <Form.Select
                                            name="gender"
                                            value={
                                                updatedData.gender !== "N/A" ? updatedData.gender : ""
                                            }
                                            onChange={handleChange}
                                        >
                                            <option value="">Select Gender</option>
                                            <option>Male</option>
                                            <option>Female</option>
                                            <option>Other</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-bold">Date of Birth</Form.Label>
                                        <Form.Control
                                            type="date"
                                            name="dob"
                                            value={
                                                updatedData.dob !== "N/A"
                                                    ? new Date(updatedData.dob)
                                                        .toISOString()
                                                        .split("T")[0]
                                                    : ""
                                            }
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-bold">Blood Group</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="bloodGroup"
                                            value={
                                                updatedData.bloodGroup !== "N/A"
                                                    ? updatedData.bloodGroup
                                                    : ""
                                            }
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold">Address</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={2}
                                    name="address"
                                    value={
                                        updatedData.address !== "N/A" ? updatedData.address : ""
                                    }
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold">Medical History</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={2}
                                    name="medicalHistory"
                                    value={
                                        updatedData.medicalHistory !== "N/A"
                                            ? updatedData.medicalHistory
                                            : ""
                                    }
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold">Allergies</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={2}
                                    name="allergies"
                                    value={
                                        updatedData.allergies !== "N/A"
                                            ? updatedData.allergies
                                            : ""
                                    }
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold">Emergency Contact</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="emergencyContact"
                                    value={
                                        updatedData.emergencyContact !== "N/A"
                                            ? updatedData.emergencyContact
                                            : ""
                                    }
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold">Insurance Details</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="insurance"
                                    value={
                                        updatedData.insurance !== "N/A"
                                            ? updatedData.insurance
                                            : ""
                                    }
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <div className="d-flex justify-content-end mt-3">
                                <Button
                                    variant="secondary"
                                    className="me-2 px-4"
                                    onClick={handleCancel}
                                >
                                    <FaTimes className="me-1" /> Cancel
                                </Button>
                                <Button
                                    variant="success"
                                    className="px-4"
                                    onClick={handleSave}
                                >
                                    <FaSave className="me-1" /> Save Changes
                                </Button>
                            </div>
                        </Form>
                    </Card>
                )}
            </Container>
        </div>
    );
};

export default ProfilePage;
