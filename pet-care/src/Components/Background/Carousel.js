import React from "react";

export default function Carousel() {
  return (
    <div>
      <section
        className="bg-half-260 d-table w-100"
        style={{ background: "url('../assets/images/bg/01.jpg') center" }}
      >
        <div className="bg-overlay bg-overlay-dark"></div>
        <div className="container">
          <div className="row mt-5 mt-lg-0">
            <div className="col-12">
              <div className="heading-title">
                <img src="../assets/images/logo-icon.png" height="50" alt="" />
                <h4 className="display-4 fw-bold text-white title-dark mt-3 mb-4">
                  Meet The <br /> Best Doctor
                </h4>
                <p className="para-desc text-white-50 mb-0">
                  Great doctor if you need your family member to get effective
                  immediate assistance, emergency treatment or a simple
                  consultation.
                </p>

                <div className="mt-4 pt-2">
                  <a
                    href="booking-appointment.html"
                    className="btn btn-primary"
                  >
                    Make Appointment
                  </a>
                  <p className="text-white-50 mb-0 mt-2">
                    T&C apply. Please read{" "}
                    <a href="#" className="text-white-50">
                      Terms and Conditions{" "}
                      <i className="ri-arrow-right-line align-middle"></i>
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
