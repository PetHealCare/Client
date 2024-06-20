import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { Link } from "react-router-dom";
import { useAuth } from "../../Components/Login/Authen";

const Profile = () => {
    const {user} = useAuth();
  return (
    <div>
              {/* Navbar Start */}
      <header id="topnav" className="defaultscroll sticky">
        <div className="container">
          <div>
            <a className="logo" href="index.html">
              <span className="logo-light-mode" style={{ marginRight: "130px" }}>
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

          <ul className="dropdowns list-inline mb-0">
            {user ? (
              <li className="list-inline-item mb-0 ms-1">
                <div className="dropdown dropdown-primary">
                  <a
                    type="text"
                    className=""
                    href=""
                    style={{ color: "black" }}
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Welcome, {user.fullName}
                  </a>
                  <div className="dropdown-menu dd-menu dropdown-menu-end shadow border-0 mt-3 py-3">
                    <a className="dropdown-item text-dark" href="doctor-dashboard.html">
                      Dashboard
                    </a>
                    <a className="dropdown-item text-dark" href="doctor-profile-setting.html">
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
              <li className="has-submenu parent-parent-menu-item" style={{ color: "blue" }}>
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/service">Services</Link>
              </li>
              <li className="has-submenu parent-parent-menu-item">
                <Link to="/booking">Book Appointment</Link>
              </li>
              <li className="has-submenu parent-parent-menu-item">
                <Link to="/blog">Blog</Link>
              </li>
              <li className="has-submenu parent-parent-menu-item">
                <Link to="/about">About</Link>
              </li>
            </ul>
          </div>
        </div>
      </header>
      {/* Navbar End */}
              {/* <!-- Start --> */}
        <section className="bg-dashboard">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-4 col-lg-4 col-md-5 col-12">
                        <div className="rounded shadow overflow-hidden sticky-bar">
                            <div className="card border-0">
                                <img src="../assets/images/doctors/profile-bg.jpg" className="img-fluid" alt=""/>
                            </div>

                            <div className="text-center avatar-profile margin-nagative mt-n5 position-relative pb-4 border-bottom">
                                <img src="../assets/images/doctors/01.jpg" className="rounded-circle shadow-md avatar avatar-md-md" alt=""/>
                                <h5 className="mt-3 mb-1">Dr. Calvin Carlo</h5>
                                <p className="text-muted mb-0">Orthopedic</p>
                            </div>

                            <ul className="list-unstyled sidebar-nav mb-0">
                                <li className="navbar-item"><a href="doctor-dashboard.html" className="navbar-link"><i className="ri-airplay-line align-middle navbar-icon"></i> Dashboard</a></li>
                                <li className="navbar-item"><a href="doctor-appointment.html" className="navbar-link"><i className="ri-calendar-check-line align-middle navbar-icon"></i> Appointment</a></li>
                                <li className="navbar-item"><a href="doctor-schedule.html" className="navbar-link"><i className="ri-timer-line align-middle navbar-icon"></i> Schedule Timing</a></li>
                                <li className="navbar-item"><a href="invoices.html" className="navbar-link"><i className="ri-pages-line align-middle navbar-icon"></i> Invoices</a></li>
                                <li className="navbar-item"><a href="doctor-messages.html" className="navbar-link"><i className="ri-mail-unread-line align-middle navbar-icon"></i> Messages</a></li>
                                <li className="navbar-item"><a href="doctor-profile.html" className="navbar-link"><i className="ri-user-line align-middle navbar-icon"></i> Profile</a></li>
                                <li className="navbar-item"><a href="doctor-profile-setting.html" className="navbar-link"><i className="ri-user-settings-line align-middle navbar-icon"></i> Profile Settings</a></li>
                                <li className="navbar-item"><a href="patient-list.html" className="navbar-link"><i className="ri-empathize-line align-middle navbar-icon"></i> Patients</a></li>
                                <li className="navbar-item"><a href="patient-review.html" className="navbar-link"><i className="ri-chat-1-line align-middle navbar-icon"></i> Patients Review</a></li>
                                <li className="navbar-item"><a href="doctor-chat.html" className="navbar-link"><i className="ri-chat-voice-line align-middle navbar-icon"></i> Chat</a></li>
                                <li className="navbar-item"><a href="login.html" className="navbar-link"><i className="ri-login-circle-line align-middle navbar-icon"></i> Login</a></li>
                            </ul>
                        </div>
                    </div>
                    {/* <!--end col--> */}

                    <div className="col-xl-8 col-lg-8 col-md-7 mt-4 pt-2 mt-sm-0 pt-sm-0">
                        <h5 className="mb-0 pb-2">Schedule Timing</h5>
                        <div className="rounded shadow mt-4">
                            <div className="p-4 border-bottom">
                                <h5 className="mb-0">Personal Information :</h5>
                            </div>

                            <div className="p-4 border-bottom">
                                <div className="row align-items-center">
                                    <div className="col-lg-2 col-md-4">
                                        <img src="../assets/images/doctors/01.jpg" className="avatar avatar-md-md rounded-pill shadow mx-auto d-block" alt=""/>
                                    </div>
                                    {/* <!--end col--> */}

                                    <div className="col-lg-5 col-md-8 text-center text-md-start mt-4 mt-sm-0">
                                        <h5 className="">Upload your picture</h5>
                                        <p className="text-muted mb-0">For best results, use an image at least 256px by 256px in either .jpg or .png format</p>
                                    </div>
                                    {/* <!--end col--> */}

                                    <div className="col-lg-5 col-md-12 text-lg-end text-center mt-4 mt-lg-0">                                        
                                        <a href="#" className="btn btn-primary">Upload</a>
                                        <a href="#" className="btn btn-soft-primary ms-2">Remove</a>
                                    </div>
                                    {/* <!--end col--> */}
                                </div>
                                {/* <!--end row--> */}
                            </div>

                            <div className="p-4">
                                <form>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label">First Name</label>
                                                <input name="name" id="name" type="text" className="form-control" placeholder="First Name :"/>
                                            </div>
                                        </div>
                                        {/* <!--end col--> */}

                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label">Last Name</label>
                                                <input name="name" id="name2" type="text" className="form-control" placeholder="Last Name :"/>
                                            </div>
                                        </div>
                                        {/* <!--end col--> */}

                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label">Your Email</label>
                                                <input name="email" id="email" type="email" className="form-control" placeholder="Your email :"/>
                                            </div> 
                                        </div>
                                        {/* <!--end col--> */}

                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label">Phone no.</label>
                                                <input name="number" id="number" type="text" className="form-control" placeholder="Phone no. :"/>
                                            </div>                                                                               
                                        </div>
                                        {/* <!--end col--> */}

                                        <div className="col-md-12">
                                            <div className="mb-3">
                                                <label className="form-label">Your Bio Here</label>
                                                <textarea name="comments" id="comments" rows="4" className="form-control" placeholder="Bio :"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <!--end row--> */}
                                    
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <input type="submit" id="submit" name="send" className="btn btn-primary" value="Save changes"/>
                                        </div>
                                        {/* <!--end col--> */}
                                    </div>
                                    {/* <!--end row--> */}
                                </form>
                                {/* <!--end form-->  */}
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
    </div>
  );
};

export default Profile;