import React from "react";
import { Card, Button } from "react-bootstrap";
import {
    FaPlay,
    FaHeartbeat,
    FaProcedures,
    FaCapsules,
    FaUserMd,
    FaBone,
    FaEye,
    FaMedal,
    FaBuilding,
    FaHospital,
    FaBed,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const Dashboard = () => {
    const specialties = [
        { icon: <FaHeartbeat />, title: "Cardiology" },
        { icon: <FaUserMd />, title: "Cardiac Surgery" },
        { icon: <FaCapsules />, title: "Medicine" },
        { icon: <FaProcedures />, title: "General Surgery" },
        { icon: <FaBone />, title: "Orthopedic" },
        { icon: <FaEye />, title: "Ophthalmology" },
    ];

    const stats = [
        { icon: <FaMedal />, number: "15+", text: "Year of Expertise" },
        { icon: <FaBuilding />, number: "25+", text: "Departments" },
        { icon: <FaUserMd />, number: "100+", text: "Medical Specialities" },
        { icon: <FaHospital />, number: "15+", text: "Modern Room" },
        { icon: <FaBed />, number: "100", text: "Bedded Hospital" },
    ];

    return (
        <>
            {/* Hero Section */}
            <section
                className="hero-section d-flex align-items-center"
                style={{
                    backgroundImage: "url('/IMG/heroImg.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    minHeight: "90vh",
                    color: "#fff",
                    position: "relative",
                }}
            >
                {/* Dark overlay */}
                <div
                    style={{
                        position: "absolute",
                        // inset: 0,
                        // backgroundColor: "rgba(0,0,0,0.4)",
                    }}
                ></div>

                <div className="container" style={{ position: "relative", zIndex: 2 }}>
                    <div className="row align-items-center">
                        <div className="col-md-7">
                            <h5 className="fw-bold mb-2" style={{ color: "#28a745" }}>
                                The Best Medical & General Clinic
                            </h5>
                            <h1 className="fw-bold display-4 text-black mb-3">
                                Medical & Health Care <br /> Solutions For You.
                            </h1>
                            <p className="lead text-light fs-6 mb-4 text-black">
                                Leading multi-specialty hospital in Surat, offering advanced
                                medical care, <br /> state-of-the-art facilities, and compassionate
                                patient care. Book an appointment <br /> today!
                            </p>
                            <div className="d-flex align-items-center">
                                <Button
                                    style={{ backgroundColor: "#28a745", border: "none" }}
                                    className="me-3 px-4 py-2 fw-bold rounded-pill shadow"
                                >
                                    See All Services
                                </Button>
                                <div className="d-flex align-items-center">
                                    <Button
                                        variant="light"
                                        className="rounded-circle shadow me-2"
                                        style={{ width: "55px", height: "55px" }}
                                    >
                                        <FaPlay className="text-success" />
                                    </Button>
                                    <span className="fw-semibold text-white">Watch Video</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Specialties Section */}
            <section className="py-5" style={{backgroundColor: "rgb(232, 245, 233)"}}>
                <div className="container">
                    <div className="text-center mb-5">
                        <h6 className="text-uppercase text-muted fw-bold">What We Do</h6>
                        <h2 className="fw-bold mb-3" style={{ color: "#28a745" }}>
                            Specialties & Procedures
                        </h2>
                        <p className="text-muted mx-auto" style={{ maxWidth: "700px" }}>
                            At our hospital, we provide multi-specialty healthcare services
                            to meet all your medical needs. High-quality care delivered
                            by experienced professionals in every department.
                        </p>
                    </div>
                    <div className="row g-4">
                        {specialties.map((item, index) => (
                            <div className="col-lg-4 col-md-6" key={index}>
                                <Card
                                    className="h-100 shadow-sm border-0 text-center p-4 specialty-card"
                                    style={{
                                        borderRadius: "20px",
                                        transition: "all 0.3s ease",
                                        background: "#fff",
                                    }}
                                >
                                    <div
                                        className="mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle"
                                        style={{
                                            width: "70px",
                                            height: "70px",
                                            backgroundColor: "rgba(40, 167, 69, 0.1)",
                                        }}
                                    >
                                        <div className="fs-2" style={{ color: "#28a745" }}>
                                            {item.icon}
                                        </div>
                                    </div>
                                    <h5 className="fw-bold mb-2">{item.title}</h5>
                                    <a
                                        href="#"
                                        className="fw-semibold text-decoration-none"
                                        style={{ color: "#28a745" }}
                                    >
                                        Learn More →
                                    </a>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Prefer Section */}
            <section className="py-5">
                <div className="container text-center">
                    <h2 className="fw-bold mb-4">
                        Why Prefer <span style={{ color: "#28a745" }}>Our Hospital?</span>
                    </h2>
                    <p className="text-muted mx-auto mb-5" style={{ maxWidth: "750px" }}>
                        We deliver top-notch medical care with advanced technology and
                        compassionate service. Our experts are here to provide exceptional
                        treatment for every patient, every time.
                    </p>
                    <div className="row g-4 justify-content-center">
                        {stats.map((item, index) => (
                            <div className="col-lg-2 col-md-4 col-sm-6" key={index}>
                                <Card
                                    className="h-100 border-0 shadow-sm stat-card"
                                    style={{
                                        borderRadius: "20px",
                                        padding: "20px",
                                        transition: "all 0.3s ease",
                                        background: "#fff",
                                    }}
                                >
                                    <div
                                        className="d-flex align-items-center justify-content-center rounded-circle mx-auto mb-3"
                                        style={{
                                            width: "65px",
                                            height: "65px",
                                            backgroundColor: "rgba(40, 167, 69, 0.1)",
                                        }}
                                    >
                                        <div className="fs-2" style={{ color: "#28a745" }}>
                                            {item.icon}
                                        </div>
                                    </div>
                                    <h4 className="fw-bold mb-1" style={{ color: "#28a745" }}>
                                        {item.number}
                                    </h4>
                                    <p className="mb-0 text-muted small">{item.text}</p>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Patients Experience Section */}
            <section className="py-5" style={{backgroundColor: "rgb(232, 245, 233)"}}>
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 className="fw-bold" style={{ color: "#28a745" }}>
                            Patients Experience
                        </h2>
                        <p className="text-muted mx-auto" style={{ maxWidth: "700px" }}>
                            Hear from our patients about the compassionate care and advanced
                            treatment they received at our hospital.
                        </p>
                    </div>

                    <div
                        id="testimonialCarousel"
                        className="carousel slide"
                        data-bs-ride="carousel"
                    >
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <Card className="p-4 border-0 shadow-sm text-center mx-auto" style={{ maxWidth: "700px", borderRadius: "20px" }}>
                                    <p className="fst-italic text-muted">
                                        "The doctors and staff were extremely professional and caring.
                                        The facilities are world-class, and I felt safe throughout my
                                        treatment."
                                    </p>
                                    <h6 className="fw-bold mt-3"> - Yash Kareliya</h6>
                                </Card>
                            </div>
                            <div className="carousel-item">
                                <Card className="p-4 border-0 shadow-sm text-center mx-auto" style={{ maxWidth: "700px", borderRadius: "20px" }}>
                                    <p className="fst-italic text-muted">
                                        "Exceptional service and personal care. They treated me like
                                        family and explained every step of the process clearly."
                                    </p>
                                    <h6 className="fw-bold mt-3"> - Nevil Kathiriya</h6>
                                </Card>
                            </div>
                            <div className="carousel-item">
                                <Card className="p-4 border-0 shadow-sm text-center mx-auto" style={{ maxWidth: "700px", borderRadius: "20px" }}>
                                    <p className="fst-italic text-muted">
                                        "Best hospital in the city! The environment is clean, the staff
                                        is supportive, and the treatment is top-notch."
                                    </p>
                                    <h6 className="fw-bold mt-3"> - Vasu Antala </h6>
                                </Card>
                            </div>
                        </div>

                        {/* Carousel controls */}
                        <button
                            className="carousel-control-prev"
                            type="button"
                            data-bs-target="#testimonialCarousel"
                            data-bs-slide="prev"
                        >
                            <span className="carousel-control-prev-icon bg-dark rounded-circle p-2"></span>
                        </button>
                        <button
                            className="carousel-control-next"
                            type="button"
                            data-bs-target="#testimonialCarousel"
                            data-bs-slide="next"
                        >
                            <span className="carousel-control-next-icon bg-dark rounded-circle p-2"></span>
                        </button>
                    </div>
                </div>
            </section>

            {/* Our Doctors Section */}
            <section className="py-5">
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 className="fw-bold" style={{ color: "#28a745" }}>
                            Meet Our Medical Team
                        </h2>
                        <p className="text-muted mx-auto" style={{ maxWidth: "700px" }}>
                            Our dedicated doctor and supporting staff ensure you receive the best
                            healthcare experience with compassion and expertise.
                        </p>
                    </div>

                    <div className="row g-4 justify-content-center">
                        {/* Doctor */}
                        <div className="col-md-3">
                            <Card
                                className="border-0 shadow-sm text-center p-4 h-100 team-card"
                                style={{ borderRadius: "20px" }}
                            >
                                <div
                                    className="d-flex align-items-center justify-content-center rounded-circle mx-auto mb-3"
                                    style={{
                                        width: "80px",
                                        height: "80px",
                                        backgroundColor: "rgba(40,167,69,0.1)",
                                    }}
                                >
                                    <FaUserMd className="fs-1" style={{ color: "#28a745" }} />
                                </div>
                                <h5 className="fw-bold mb-1">Dr. Raj Miyani</h5>
                                <p className="text-muted small">General Physician</p>
                            </Card>
                        </div>

                        {/* Nurse */}
                        <div className="col-md-3">
                            <Card
                                className="border-0 shadow-sm text-center p-4 h-100 team-card"
                                style={{ borderRadius: "20px" }}
                            >
                                <div
                                    className="d-flex align-items-center justify-content-center rounded-circle mx-auto mb-3"
                                    style={{
                                        width: "80px",
                                        height: "80px",
                                        backgroundColor: "rgba(40,167,69,0.1)",
                                    }}
                                >
                                    <FaHeartbeat className="fs-1" style={{ color: "#28a745" }} />
                                </div>
                                <h5 className="fw-bold mb-1">Nurse Staff</h5>
                                <p className="text-muted small">24/7 Patient Care</p>
                            </Card>
                        </div>

                        {/* Lab Technician */}
                        <div className="col-md-3">
                            <Card
                                className="border-0 shadow-sm text-center p-4 h-100 team-card"
                                style={{ borderRadius: "20px" }}
                            >
                                <div
                                    className="d-flex align-items-center justify-content-center rounded-circle mx-auto mb-3"
                                    style={{
                                        width: "80px",
                                        height: "80px",
                                        backgroundColor: "rgba(40,167,69,0.1)",
                                    }}
                                >
                                    <FaCapsules className="fs-1" style={{ color: "#28a745" }} />
                                </div>
                                <h5 className="fw-bold mb-1">Lab Technician</h5>
                                <p className="text-muted small">Diagnostics & Reports</p>
                            </Card>
                        </div>

                        {/* Receptionist */}
                        <div className="col-md-3">
                            <Card
                                className="border-0 shadow-sm text-center p-4 h-100 team-card"
                                style={{ borderRadius: "20px" }}
                            >
                                <div
                                    className="d-flex align-items-center justify-content-center rounded-circle mx-auto mb-3"
                                    style={{
                                        width: "80px",
                                        height: "80px",
                                        backgroundColor: "rgba(40,167,69,0.1)",
                                    }}
                                >
                                    <FaHospital className="fs-1" style={{ color: "#28a745" }} />
                                </div>
                                <h5 className="fw-bold mb-1">Reception Staff</h5>
                                <p className="text-muted small">Appointments & Support</p>
                            </Card>
                        </div>
                    </div>
                </div>

                {/* Extra Styling */}
                <style>{`
    .team-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 15px 30px rgba(0,0,0,0.1);
      transition: all 0.3s ease;
    }
  `}</style>
            </section>




            {/* Extra Styling */}
            <style>{`
  .specialty-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 30px rgba(0,0,0,0.1);
  }
  .stat-card:hover {
    transform: scale(1.05);
    box-shadow: 0 12px 28px rgba(0,0,0,0.12);
  }
`}</style>

        </>
    );
};

export default Dashboard;
