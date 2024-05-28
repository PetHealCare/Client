import React from "react";

export default function Footer() {
  return (
    <div>
      <footer className="">
        <div className="container">
          <div className="row">
            <div className="col-xl-5 col-lg-4 mb-0 mb-md-4 pb-0 pb-md-2">
              <a href="#" className="logo-footer">
                <img src="../assets/images/logo-light.png" height="22" alt="" />
              </a>
              <p className="mt-4 me-xl-5">
                Great doctor if you need your family member to get effective
                immediate assistance, emergency treatment or a simple
                consultation.
              </p>
            </div>

            <div className="col-xl-7 col-lg-8 col-md-12">
              <div className="row">
                <div className="col-md-4 col-12 mt-4 mt-sm-0 pt-2 pt-sm-0">
                  <h5 className="footer-head">Company</h5>
                  <ul className="list-unstyled footer-list mt-4">
                    <li>
                      <a href="aboutus.html" className="text-foot">
                        <i className="mdi mdi-chevron-right me-1"></i> About us
                      </a>
                    </li>
                    <li>
                      <a href="departments.html" className="text-foot">
                        <i className="mdi mdi-chevron-right me-1"></i> Services
                      </a>
                    </li>
                    <li>
                      <a href="doctor-team-two.html" className="text-foot">
                        <i className="mdi mdi-chevron-right me-1"></i> Team
                      </a>
                    </li>
                    <li>
                      <a href="blog-detail.html" className="text-foot">
                        <i className="mdi mdi-chevron-right me-1"></i> Project
                      </a>
                    </li>
                    <li>
                      <a href="blogs.html" className="text-foot">
                        <i className="mdi mdi-chevron-right me-1"></i> Blog
                      </a>
                    </li>
                    <li>
                      <a href="login.html" className="text-foot">
                        <i className="mdi mdi-chevron-right me-1"></i> Login
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="col-md-4 col-12 mt-4 mt-sm-0 pt-2 pt-sm-0">
                  <h5 className="footer-head">Departments</h5>
                  <ul className="list-unstyled footer-list mt-4">
                    <li>
                      <a href="departments.html" className="text-foot">
                        <i className="mdi mdi-chevron-right me-1"></i> Eye Care
                      </a>
                    </li>
                    <li>
                      <a href="departments.html" className="text-foot">
                        <i className="mdi mdi-chevron-right me-1"></i>{" "}
                        Psychotherapy
                      </a>
                    </li>
                    <li>
                      <a href="departments.html" className="text-foot">
                        <i className="mdi mdi-chevron-right me-1"></i> Dental
                        Care
                      </a>
                    </li>
                    <li>
                      <a href="departments.html" className="text-foot">
                        <i className="mdi mdi-chevron-right me-1"></i>{" "}
                        Orthopedic
                      </a>
                    </li>
                    <li>
                      <a href="departments.html" className="text-foot">
                        <i className="mdi mdi-chevron-right me-1"></i>{" "}
                        Cardiology
                      </a>
                    </li>
                    <li>
                      <a href="departments.html" className="text-foot">
                        <i className="mdi mdi-chevron-right me-1"></i>{" "}
                        Gynecology
                      </a>
                    </li>
                    <li>
                      <a href="departments.html" className="text-foot">
                        <i className="mdi mdi-chevron-right me-1"></i> Neurology
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="col-md-4 col-12 mt-4 mt-sm-0 pt-2 pt-sm-0">
                  <h5 className="footer-head">Contact us</h5>
                  <ul className="list-unstyled footer-list mt-4">
                    <li className="d-flex align-items-center">
                      <i
                        data-feather="mail"
                        className="fea icon-sm text-foot align-middle"
                      ></i>
                      <a
                        href="mailto:contact@example.com"
                        className="text-foot ms-2"
                      >
                        contact@example.com
                      </a>
                    </li>

                    <li className="d-flex align-items-center">
                      <i
                        data-feather="phone"
                        className="fea icon-sm text-foot align-middle"
                      ></i>
                      <a href="tel:+152534-468-854" className="text-foot ms-2">
                        +152 534-468-854
                      </a>
                    </li>

                    <li className="d-flex align-items-center">
                      <i
                        data-feather="map-pin"
                        className="fea icon-sm text-foot align-middle"
                      ></i>
                      <a
                        href="javascript:void(0)"
                        className="video-play-icon text-foot ms-2"
                      >
                        View on Google map
                      </a>
                    </li>
                  </ul>

                  <ul className="list-unstyled social-icon footer-social mb-0 mt-4">
                    <li className="list-inline-item">
                      <a href="#" className="rounded-pill">
                        <i
                          data-feather="facebook"
                          className="fea icon-sm fea-social"
                        ></i>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#" className="rounded-pill">
                        <i
                          data-feather="instagram"
                          className="fea icon-sm fea-social"
                        ></i>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#" className="rounded-pill">
                        <i
                          data-feather="twitter"
                          className="fea icon-sm fea-social"
                        ></i>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#" className="rounded-pill">
                        <i
                          data-feather="linkedin"
                          className="fea icon-sm fea-social"
                        ></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mt-5">
          <div className="pt-4 footer-bar">
            <div className="row align-items-center">
              <div className="col-sm-6">
                <div className="text-sm-start text-center">
                  <p className="mb-0">
                    <script>document.write(new Date().getFullYear())</script> ©
                    Doctris. Design with{" "}
                    <i className="mdi mdi-heart text-danger"></i> by{" "}
                    <a
                      href="https://shreethemes.in/"
                      target="_blank"
                      className="text-reset"
                    >
                      Shreethemes
                    </a>
                    .
                  </p>
                </div>
              </div>

              <div className="col-sm-6 mt-4 mt-sm-0">
                <ul className="list-unstyled footer-list text-sm-end text-center mb-0">
                  <li className="list-inline-item">
                    <a href="terms.html" className="text-foot me-2">
                      Terms
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="privacy.html" className="text-foot me-2">
                      Privacy
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="aboutus.html" className="text-foot me-2">
                      About
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="contact.html" className="text-foot me-2">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
