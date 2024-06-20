import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../Components/Login/Authen";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CUSTOMER_API } from "../../apiEndpoint";

const Profile = () => {
  const { user } = useAuth();
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
      if (user) {
          setFullName(user.fullName || "");
          setAddress(user.address || "");
          setPassword(user.password || "");
          setPhoneNumber(user.phoneNumber || "");
      }
  }, [user]);

  const handleFormSubmit = async (e) => {
      e.preventDefault();
      console.log("Updated Profile Data:", { fullName, address, password, phoneNumber });

      const formData = {
          customerId: user.customerId,
          fullName: fullName,
          phoneNumber: phoneNumber,
          password: password,
          address: address,
      };
      console.log("formdata", formData);

      try {
          const response = await fetch(CUSTOMER_API.MASTER, {
              method: "PUT",
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify(formData)
          });

          if (response.ok) {
              console.log("Profile updated successfully!");
              toast.success("Profile updated successfully!")
              setTimeout(() => {
                window.location.reload();
              }, 1000);
          } else {
              console.error("Error updating profile:", response.status);
              toast.error("Error updating profile. Please try again later.");
          }
      } catch (error) {
          console.error("Error updating profile:", error);
          toast.error("Error updating profile. Please try again later.");
      }
      
  };
  return (
    <div>
      <ToastContainer />
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
                  <Link
                      className="dropdown-item text-dark"
                      to="/profile-customer"
                    >
                      Profile Settings
                    </Link>
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
{user && (<div className="rounded shadow overflow-hidden sticky-bar">
    <div className="card border-0">
        <img src="../assets/images/bg/bg-profile.jpg" className="img-fluid" alt=""/>
    </div>

    <div className="text-center avatar-profile margin-nagative mt-n5 position-relative pb-4 border-bottom">
        <img src="../assets/images/client/09.jpg" className="rounded-circle shadow-md avatar avatar-md-md" alt=""/>
        <h5 className="mt-3 mb-1">{user.fullName}</h5>
    </div>

    <div className="list-unstyled p-4">
        
        <div className="d-flex align-items-center mt-2">
            <i className="uil uil-book-open align-text-bottom text-primary h5 mb-0 me-2"></i>
            <h6 className="mb-0">Phone No.</h6>
            <p className="text-muted mb-0 ms-2">{user.phoneNumber}</p>
        </div>
        
        <div className="d-flex align-items-center mt-2">
            <i className="uil uil-italic align-text-bottom text-primary h5 mb-0 me-2"></i>
            <h6 className="mb-0">Address</h6>
            <p className="text-muted mb-0 ms-2">{user.address}</p>
        </div>
        
    </div>
</div>)}
</div>
{/* <!--end col--> */}

                    <div className="col-xl-8 col-lg-8 col-md-7 mt-4 pt-2 mt-sm-0 pt-sm-0">
                        <div className="rounded shadow mt-4">
                            <div className="p-4 border-bottom">
                                <h5 className="mb-0" style={{textAlign: "start"}}>Personal Information :</h5>
                            </div>

                            <div className="p-4">
                                <form onSubmit={handleFormSubmit}>
                                    <div className="row">
                                        <div className="col-md-6">
                                        <div className="mb-3">
                                                    <label className="form-label">Full Name</label>
                                                    <input
                                                        name="fullName"
                                                        type="text"
                                                        className="form-control"
                                                        value={fullName}
                                                        onChange={(e) => setFullName(e.target.value)}
                                                    />
                                                </div>
                                        </div>
                                        {/* <!--end col--> */}

                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label">Address</label>
                                                <input
                                                        name="address"
                                                        type="text"
                                                        className="form-control"
                                                        value={address}
                                                        onChange={(e) => setAddress(e.target.value)}
                                                    />
                                            </div>
                                        </div>
                                        {/* <!--end col--> */}

                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label">Password</label>
                                                <input name="password" type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)}/>
                                            </div> 
                                        </div>
                                        {/* <!--end col--> */}

                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label">Phone no.</label>
                                                <input name="number" id="number" type="text" className="form-control" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}/>
                                            </div>                                                                               
                                        </div>
                                        {/* <!--end col--> */}
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