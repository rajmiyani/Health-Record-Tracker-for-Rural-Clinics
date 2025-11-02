import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUserDoctor, FaCalendarCheck, FaClock } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const doctor = {
  name: "Dr. Raj Miyani",
  avatar:
    "https://media.istockphoto.com/id/1467553187/photo/portrait-of-handsome-smiling-young-man-looking-at-camera.jpg?s=612x612&w=0&k=20&c=Vj5uyriPr8XlhRoFvEmIPBKwevab6aqMlMYjYyYTQfs=",
  specialty: "Primary Care Physician",
  hospital: "City Hospital, New York",
  bio: "Board-certified Cardiologist with 12+ years of clinical/research experience. Specializes in cardiac surgery, preventive cardiology, and patient education.",
  email: "dr.raj@cityhospital.com",
  phone: "(123) 456-7890",
  address: "123 Main St, New York, NY",
  certifications: [
    "Board Certified",
    "Fellow, American College of Cardiology",
    "PhD, Columbia University",
  ],
  stats: {
    patients: 1730,
    experience: 12,
    rating: 4.9,
  },
  reviews: [
    { name: "Yash Kareliya", text: "Very compassionate and knowledgeable. Highly recommend!", rating: 5 },
    { name: "Nevil Kathiriya", text: "Helped me understand my condition like no other.", rating: 4 },
  ],
};

const DoctorProfile = () => {
  const [availability, setAvailability] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const res = await fetch("https://health-record-tracker-for-rural-clinics.onrender.com/doctor/getAvailability");
        if (!res.ok) throw new Error("Failed to fetch availability");
        const data = await res.json();
        setAvailability(data);
      } catch (err) {
        toast.error(`❌ ${err.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchAvailability();
  }, []);

  return (
    <section style={{ background: "#f8fdf9", minHeight: "100vh", fontFamily: "'Inter', sans-serif" }}>
      <ToastContainer />
      <div className="container py-5">

        {/* Hero */}
        <div className="row align-items-center mb-5">
          <div className="col-md-4 text-center mb-3">
            <img
              src={doctor.avatar}
              alt="doctor"
              className="rounded-circle shadow-lg border border-4"
              style={{ width: "200px", height: "200px", borderColor: "#28a745", transition: "transform 0.3s" }}
              onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
            />
          </div>
          <div className="col-md-8 text-center text-md-start">
            <h2 className="fw-bold text-dark">{doctor.name}</h2>
            <h5 className="text-secondary mb-2">{doctor.specialty}</h5>
            <span className="badge me-2 px-3 py-2" style={{ backgroundColor: "#28a745", fontSize: "0.85rem", fontWeight: "500" }}>
              {doctor.hospital}
            </span>
            <span className="badge bg-light text-dark border">Available for consultation</span>
          </div>
        </div>

        {/* Stats */}
        <div className="row text-center g-4 mb-5">
          {[
            { label: "Patients", value: `${doctor.stats.patients}+` },
            { label: "Experience", value: `${doctor.stats.experience}+ yrs` },
            { label: "Rating", value: `${doctor.stats.rating} ★` },
          ].map((stat, idx) => (
            <div className="col-12 col-md-4" key={idx}>
              <div className="p-4 bg-white shadow-sm rounded-4 h-100" style={{ transition: "transform 0.3s" }}
                   onMouseOver={(e) => (e.currentTarget.style.transform = "translateY(-5px)")}
                   onMouseOut={(e) => (e.currentTarget.style.transform = "none")}>
                <h4 className="fw-bold text-success mb-1">{stat.value}</h4>
                <p className="text-muted mb-0">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="row gx-4 gy-4">
          {/* Left Column: About + Contact + Availability */}
          <div className="col-lg-6">

            {/* About */}
            <div className="card shadow-sm border-0 mb-4 rounded-4">
              <div className="card-body">
                <h5 className="fw-bold text-success mb-3">About</h5>
                <p className="text-muted">{doctor.bio}</p>
                <div className="mt-3">
                  {doctor.certifications.map((cert) => (
                    <span key={cert} className="badge bg-light text-dark border me-2 mb-2">🎓 {cert}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Availability */}
            <div className="card shadow-sm border-0 mb-4 rounded-4">
              <div className="card-body">
                <h5 className="fw-bold text-success mb-3">Availability</h5>
                {loading ? (
                  <p>Loading availability...</p>
                ) : availability ? (
                  availability.emergency ? (
                    <span className="badge bg-danger">Emergency Mode Active ⚡</span>
                  ) : (
                    <div>
                      <p className="mb-1">
                        <FaCalendarCheck className="me-2 text-success" />
                        <strong>Working Days:</strong> {availability.days.join(", ")}
                      </p>
                      <p className="mb-0">
                        <FaClock className="me-2 text-success" />
                        <strong>Time:</strong> {availability.startTime} - {availability.endTime}
                      </p>
                    </div>
                  )
                ) : (
                  <p>No availability data found.</p>
                )}
              </div>
            </div>

            {/* Contact */}
            <div className="card shadow-sm border-0 rounded-4">
              <div className="card-body">
                <h5 className="fw-bold text-success mb-3">Contact</h5>
                <ul className="list-unstyled small text-muted mb-3">
                  <li><strong>Email:</strong> {doctor.email}</li>
                  <li><strong>Phone:</strong> {doctor.phone}</li>
                  <li><strong>Address:</strong> {doctor.address}</li>
                </ul>
                <div className="d-flex flex-wrap gap-2">
                  <a href="#" className="btn btn-success shadow-sm px-4 py-2 rounded-pill">Book Appointment</a>
                  <a href="#" className="btn btn-outline-secondary shadow-sm px-4 py-2 rounded-pill">Send Message</a>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Testimonials */}
          <div className="col-lg-6">
            <div className="card shadow-sm border-0 rounded-4">
              <div className="card-body">
                <h5 className="fw-bold text-success mb-3">Patient Testimonials</h5>
                {doctor.reviews.map((review, idx) => (
                  <div key={idx} className="p-3 mb-3 rounded-4" style={{ background: "#f8fdf9", border: "1px solid #e8f5e9" }}>
                    <p className="mb-2 text-dark fst-italic">“{review.text}”</p>
                    <div className="d-flex justify-content-between">
                      <small className="text-muted">{review.name}</small>
                      <small className="text-warning">{Array(review.rating).fill("⭐").join("")}</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default DoctorProfile;
