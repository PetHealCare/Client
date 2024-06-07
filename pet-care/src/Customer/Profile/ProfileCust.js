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
            <Link className="logo" to="/">
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
            </Link>
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
                <div className="col-md-6 col-lg-4">
<div className="rounded shadow overflow-hidden sticky-bar">
    <div className="card border-0">
        <img src="../assets/images/bg/bg-profile.jpg" className="img-fluid" alt=""/>
    </div>

    <div className="text-center avatar-profile margin-nagative mt-n5 position-relative pb-4 border-bottom">
        <img src="../assets/images/client/09.jpg" className="rounded-circle shadow-md avatar avatar-md-md" alt=""/>
        <h5 className="mt-3 mb-1">Christopher Burrell</h5>
        <p className="text-muted mb-0">25 Years old</p>
    </div>

    <div className="list-unstyled p-4">
        <div className="progress-box mb-4">
            <h6 className="title">Complete your profile</h6>
            <div className="progress">
                <div className="progress-bar position-relative bg-primary" style={{width: "89%"}}>
                    <div className="progress-value d-block text-muted h6">89%</div>
                </div>
            </div>
        </div>
        {/* <!--end process box--> */}

        <div className="d-flex align-items-center mt-2">
            <i className="uil uil-user align-text-bottom text-primary h5 mb-0 me-2"></i>
            <h6 className="mb-0">Gender</h6>
            <p className="text-muted mb-0 ms-2">Female</p>
        </div>
        
        <div className="d-flex align-items-center mt-2">
            <i className="uil uil-envelope align-text-bottom text-primary h5 mb-0 me-2"></i>
            <h6 className="mb-0">Birthday</h6>
            <p className="text-muted mb-0 ms-2">19th January 1995</p>
        </div>
        
        <div className="d-flex align-items-center mt-2">
            <i className="uil uil-book-open align-text-bottom text-primary h5 mb-0 me-2"></i>
            <h6 className="mb-0">Phone No.</h6>
            <p className="text-muted mb-0 ms-2">+(125) 458-8547</p>
        </div>
        
        <div className="d-flex align-items-center mt-2">
            <i className="uil uil-italic align-text-bottom text-primary h5 mb-0 me-2"></i>
            <h6 className="mb-0">Address</h6>
            <p className="text-muted mb-0 ms-2">Sydney, Australia</p>
        </div>
        
        <div className="d-flex align-items-center mt-2">
            <i className="uil uil-medical-drip align-text-bottom text-primary h5 mb-0 me-2"></i>
            <h6 className="mb-0">Blood Group</h6>
            <p className="text-muted mb-0 ms-2">B +</p>
        </div>
    </div>
</div>
</div>
{/* <!--end col--> */}

                    <div className="col-xl-8 col-lg-8 col-md-7 mt-4 pt-2 mt-sm-0 pt-sm-0">
                        <div className="rounded shadow mt-4">
                            <div className="p-4 border-bottom">
                                <h5 className="mb-0" style={{textAlign: "start"}}>Personal Information :</h5>
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