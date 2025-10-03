import React from "react";

const VisitorGuidelines = () => {
  return (
    <div className="container my-5">
      {/* Page Title */}
      <div className="text-center mb-5">
        <h2 className="fw-bold text-success">Visitor Guidelines</h2>
        <p className="text-muted">
          To ensure a safe and comfortable environment for patients, visitors are requested to follow these guidelines.
        </p>
      </div>

      <div className="row g-4">
        {/* Visiting Hours */}
        <div className="col-md-6">
          <div className="card shadow-sm h-100 border-0">
            <div className="card-body">
              <h5 className="card-title text-success">🕒 Visiting Hours</h5>
              <p className="card-text">
                Visitors are welcome between <strong>10:00 AM – 12:00 PM</strong> 
                and <strong>5:00 PM – 7:00 PM</strong>.
              </p>
              <p className="small text-muted">
                Please respect these timings to allow patients to rest and recover.
              </p>
            </div>
          </div>
        </div>

        {/* Safety Protocols */}
        <div className="col-md-6">
          <div className="card shadow-sm h-100 border-0">
            <div className="card-body">
              <h5 className="card-title text-success">🛡 Safety Protocols</h5>
              <ul className="list-unstyled">
                <li>✅ Wear a face mask at all times inside the hospital.</li>
                <li>✅ Use hand sanitizers available at entry points.</li>
                <li>✅ Maintain social distancing where possible.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Patient Care */}
        <div className="col-md-6">
          <div className="card shadow-sm h-100 border-0">
            <div className="card-body">
              <h5 className="card-title text-success">❤️ Patient Care</h5>
              <ul className="list-unstyled">
                <li>✔️ Keep noise to a minimum.</li>
                <li>✔️ Avoid bringing outside food without permission.</li>
                <li>✔️ Children under 12 should be accompanied by adults.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Emergency Guidelines */}
        <div className="col-md-6">
          <div className="card shadow-sm h-100 border-0">
            <div className="card-body">
              <h5 className="card-title text-success">🚨 Emergency Guidelines</h5>
              <p className="card-text">
                In case of emergencies, follow staff instructions immediately. 
                Emergency exits and fire safety equipment are marked throughout the hospital.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="alert alert-info mt-5 text-center shadow-sm">
        <strong>Note:</strong> These guidelines are in place for the well-being of our patients. 
        We appreciate your cooperation. 🙏
      </div>
    </div>
  );
};

export default VisitorGuidelines;
