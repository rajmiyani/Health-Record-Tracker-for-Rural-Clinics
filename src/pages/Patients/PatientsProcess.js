import React from "react";

const PatientsProcess = () => {
  const steps = [
    {
      id: 1,
      title: "Step 1: Registration",
      desc: "Patients provide personal details and receive a unique patient ID.",
      icon: "📝",
      color: "primary",
    },
    {
      id: 2,
      title: "Step 2: Consultation",
      desc: "Meet the doctor for a detailed discussion about symptoms and medical history.",
      icon: "👨‍⚕️",
      color: "success",
    },
    {
      id: 3,
      title: "Step 3: Diagnosis",
      desc: "Doctors may recommend tests or scans for accurate diagnosis.",
      icon: "🧪",
      color: "warning",
    },
    {
      id: 4,
      title: "Step 4: Treatment",
      desc: "Based on diagnosis, treatment plans and prescriptions are provided.",
      icon: "💊",
      color: "danger",
    },
    {
      id: 5,
      title: "Step 5: Follow-up",
      desc: "Patients are scheduled for follow-up visits to track recovery.",
      icon: "📅",
      color: "info",
    },
  ];

  return (
    <div className="container my-5">
      {/* Header */}
      <div className="text-center mb-5">
        <h2 className="fw-bold text-success">Patients Process</h2>
        <p className="text-muted">
          A step-by-step process to ensure smooth treatment and recovery for every patient.
        </p>
      </div>

      {/* Process Steps */}
      <div className="row g-4">
        {steps.map((step) => (
          <div key={step.id} className="col-12 col-md-6 col-lg-4">
            <div className={`card shadow-sm border-0 h-100 border-top border-4 border-${step.color}`}>
              <div className="card-body text-center">
                <div className="fs-1 mb-3">{step.icon}</div>
                <h5 className="fw-bold">{step.title}</h5>
                <p className="text-muted">{step.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Note */}
      <div className="alert alert-success text-center mt-5 shadow-sm">
        💡 <strong>Tip:</strong> Our staff will guide patients through every step for a smooth and safe experience.
      </div>
    </div>
  );
};

export default PatientsProcess;
