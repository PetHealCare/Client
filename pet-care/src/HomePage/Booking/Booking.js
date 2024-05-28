import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import { useAuth } from "../../Components/Login/Authen";
import Footer from "../../Components/Footer/Footer";

export default function Booking() {
  const { user } = useAuth();
  return (
    <div>
      {/* <!-- Navbar Start --> */}
      <header id="topnav" className="defaultscroll sticky">
        <div className="container">
          <div>
            <a className="logo" href="index.html">
              <span
                className="logo-light-mode"
                style={{ marginRight: "130px" }}
              >
                <img
                  src="../assets/images/logo-light.png"
                  className="l-dark"
                  height="22"
                  alt=""
                />
                <img
                  src="../assets/images/logo-dark.png"
                  className="l-light"
                  height="22"
                  alt=""
                />
              </span>
              <img
                src="../assets/images/logo-light.png"
                height="22"
                className="logo-dark-mode"
                alt=""
              />
            </a>
          </div>

          {/* <div className="menu-extras">
            <div className="menu-item">
              <a
                className="navbar-toggle"
                id="isToggle"
                onClick={() => toggleMenu()}
              >
                <div className="lines">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </a>
            </div>
          </div> */}

          <ul className="dropdowns list-inline mb-0">
            {user ? (
              <li className="list-inline-item mb-0 ms-1">
                <div className="dropdown dropdown-primary">
                  <a
                    type="text"
                    className=""
                    href=""
                    style={{ color: "white" }}
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Welcome, {user}
                  </a>
                  <div className="dropdown-menu dd-menu dropdown-menu-end shadow border-0 mt-3 py-3">
                    <a
                      className="dropdown-item text-dark"
                      href="doctor-dashboard.html"
                    >
                      Dashboard
                    </a>
                    <a
                      className="dropdown-item text-dark"
                      href="doctor-profile-setting.html"
                    >
                      Profile Settings
                    </a>
                    <div className="dropdown-divider border-top"></div>
                    <Link className="dropdown-item text-dark" to="/signin">
                      Logout
                    </Link>
                  </div>
                </div>
              </li>
            ) : (
              <Link to="/signin" className="btn btn-primary">
                Login
              </Link>
            )}
          </ul>

          <div id="navigation">
            <ul className="navigation-menu nav-left nav-black">
              <li
                className="has-submenu parent-parent-menu-item"
                style={{ color: "blue" }}
              >
                <a>Home</a>
              </li>
              <li className="breadcrumb-item">
                <a href="">Services</a>
              </li>
              <li className="has-submenu parent-parent-menu-item">
                <a href="">Book Apointment</a>
              </li>
              <li className="has-submenu parent-parent-menu-item">
                <a href="">Blog</a>
              </li>
              <li className="has-submenu parent-parent-menu-item">
                <a href="">About</a>
              </li>
            </ul>
          </div>
        </div>
      </header>
      {/* <!-- Navbar End --> */}

      {/* <!-- Start Body --> */}
      <section class="bg-half-170 d-table w-100 bg-light">
        <div class="container">
          <div class="row mt-5 justify-content-center">
            <div class="col-12">
              <div class="section-title text-center">
                <h3 class="sub-title mb-4">Book an appointment</h3>
                <p class="para-desc mx-auto text-muted">
                  Great doctor if you need your family member to get effective
                  immediate assistance, emergency treatment or a simple
                  consultation.
                </p>

                <nav aria-label="breadcrumb" class="d-inline-block mt-3">
                  <ul class="breadcrumb bg-transparent mb-0 py-1">
                    <li class="breadcrumb-item">
                      <a href="index.html">Doctris</a>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">
                      Appointment
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div class="position-relative">
        <div class="shape overflow-hidden text-color-white">
          <svg
            viewBox="0 0 2880 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
      </div>
      {/* <!-- End Body --> */}

      {/* <!-- Start --> */}
      <section className="section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card border-0 shadow rounded overflow-hidden">
                <div className="tab-content p-4" id="pills-tabContent">
                  <div
                    className="tab-pane fade show active"
                    id="pills-clinic"
                    role="tabpanel"
                    aria-labelledby="clinic-booking"
                  >
                    <form>
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="mb-3">
                            <label className="form-label">
                              Patient Name{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              name="name"
                              id="name"
                              type="text"
                              className="form-control"
                              placeholder="Patient Name :"
                            />
                          </div>
                        </div>
                        {/* <!--end col--> */}

                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Departments</label>
                            <select className="form-select form-control">
                              <option value="EY">Eye Care</option>
                              <option value="GY">Gynecologist</option>
                              <option value="PS">Psychotherapist</option>
                              <option value="OR">Orthopedic</option>
                              <option value="DE">Dentist</option>
                              <option value="GA">Gastrologist</option>
                              <option value="UR">Urologist</option>
                              <option value="NE">Neurologist</option>
                            </select>
                          </div>
                        </div>
                        {/* <!--end col--> */}

                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Doctor</label>
                            <select className="form-select form-control">
                              <option value="CA">Dr. Calvin Carlo</option>
                              <option value="CR">Dr. Cristino Murphy</option>
                              <option value="AL">Dr. Alia Reddy</option>
                              <option value="TO">Dr. Toni Kovar</option>
                              <option value="JE">Dr. Jessica McFarlane</option>
                              <option value="EL">Dr. Elsie Sherman</option>
                              <option value="BE">Dr. Bertha Magers</option>
                              <option value="LO">Dr. Louis Batey</option>
                            </select>
                          </div>
                        </div>
                        {/* <!--end col--> */}

                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">
                              Your Email <span className="text-danger">*</span>
                            </label>
                            <input
                              name="email"
                              id="email"
                              type="email"
                              className="form-control"
                              placeholder="Your email :"
                            />
                          </div>
                        </div>
                        {/* <!--end col--> */}

                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">
                              Your Phone <span className="text-danger">*</span>
                            </label>
                            <input
                              name="phone"
                              id="phone"
                              type="tel"
                              className="form-control"
                              placeholder="Your Phone :"
                            />
                          </div>
                        </div>
                        {/* <!--end col--> */}

                        <div className="col-lg-12">
                          <div className="mb-3">
                            <label className="form-label">
                              Comments <span className="text-danger">*</span>
                            </label>
                            <textarea
                              name="comments"
                              id="comments"
                              rows="4"
                              className="form-control"
                              placeholder="Your Message :"
                            ></textarea>
                          </div>
                        </div>
                        {/* <!--end col--> */}

                        <div className="col-lg-12">
                          <div className="d-grid">
                            <button type="submit" className="btn btn-primary">
                              Book An Appointment
                            </button>
                          </div>
                        </div>
                        {/* <!--end col--> */}
                      </div>
                      {/* <!--end row--> */}
                    </form>
                  </div>

                  <div
                    className="tab-pane fade"
                    id="pills-online"
                    role="tabpanel"
                    aria-labelledby="online-booking"
                  >
                    <form>
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="mb-3">
                            <label className="form-label">
                              Patient Name{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              name="name"
                              id="name2"
                              type="text"
                              className="form-control"
                              placeholder="Patient Name :"
                            />
                          </div>
                        </div>
                        {/* <!--end col--> */}

                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Departments</label>
                            <select className="form-select form-control">
                              <option value="EY">Eye Care</option>
                              <option value="GY">Gynecologist</option>
                              <option value="PS">Psychotherapist</option>
                              <option value="OR">Orthopedic</option>
                              <option value="DE">Dentist</option>
                              <option value="GA">Gastrologist</option>
                              <option value="UR">Urologist</option>
                              <option value="NE">Neurologist</option>
                            </select>
                          </div>
                        </div>
                        {/* <!--end col--> */}

                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Doctor</label>
                            <select className="form-select form-control">
                              <option value="CA">Dr. Calvin Carlo</option>
                              <option value="CR">Dr. Cristino Murphy</option>
                              <option value="AL">Dr. Alia Reddy</option>
                              <option value="TO">Dr. Toni Kovar</option>
                              <option value="JE">Dr. Jessica McFarlane</option>
                              <option value="EL">Dr. Elsie Sherman</option>
                              <option value="BE">Dr. Bertha Magers</option>
                              <option value="LO">Dr. Louis Batey</option>
                            </select>
                          </div>
                        </div>
                        {/* <!--end col--> */}

                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">
                              Your Email <span className="text-danger">*</span>
                            </label>
                            <input
                              name="email"
                              id="email2"
                              type="email"
                              className="form-control"
                              placeholder="Your email :"
                            />
                          </div>
                        </div>
                        {/* <!--end col--> */}

                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">
                              Your Phone <span className="text-danger">*</span>
                            </label>
                            <input
                              name="phone"
                              id="phone2"
                              type="tel"
                              className="form-control"
                              placeholder="Your Phone :"
                            />
                          </div>
                        </div>
                        {/* <!--end col--> */}

                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label"> Date : </label>
                            <input
                              name="date"
                              type="text"
                              className="form-control start"
                              placeholder="Select date :"
                            />
                          </div>
                        </div>
                        {/* <!--end col--> */}

                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label" for="input-time">
                              Time :{" "}
                            </label>
                            <input
                              name="time"
                              type="text"
                              className="form-control timepicker"
                              id="input-time"
                              placeholder="03:30 PM"
                            />
                          </div>
                        </div>
                        {/* <!--end col--> */}

                        <div className="col-lg-12">
                          <div className="mb-3">
                            <label className="form-label">
                              Comments <span className="text-danger">*</span>
                            </label>
                            <textarea
                              name="comments"
                              id="comments2"
                              rows="4"
                              className="form-control"
                              placeholder="Your Message :"
                            ></textarea>
                          </div>
                        </div>
                        {/* <!--end col--> */}

                        <div className="col-lg-12">
                          <div className="d-grid">
                            <button type="submit" className="btn btn-primary">
                              Book An Appointment
                            </button>
                          </div>
                        </div>
                        {/* <!--end col--> */}
                      </div>
                      {/* <!--end row--> */}
                    </form>
                  </div>
                </div>
              </div>
            </div>
            {/* <!--end col--> */}
          </div>
          {/* <!--end row--> */}
        </div>
        {/* <!--end container--> */}
      </section>
      {/* <!--end section--> */}
      {/* <!-- End --> */}

      {/* Start Footer */}
      <Footer />
      {/* End Footer */}
    </div>
  );
}
