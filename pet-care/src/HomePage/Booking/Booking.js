import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import { useAuth } from "../../Components/Login/Authen";
import Footer from "../../Components/Footer/Footer";

export default function Booking() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [userPets, setUserPets] = useState([]);
  const [selectedPetId, setSelectedPetId] = useState("");
  const [time, setTime] = useState("");
  const [comments, setComments] = useState("");

  useEffect(() => {
    if (user) {
      fetchUserPets();
    }
  }, [user]);

  const fetchAllPets = async () => {
    try {
      const response = await fetch(`https://localhost:7083/api/pet`);
      const data = await response.json();
      setUserPets(data.items);
    } catch (error) {
      console.error("Error fetching user pets:", error);
      return [];
    }
  };

  const fetchUserPets = async () => {
    try {
      if (!user) {
        return []; 
      }
      const allPets = await fetchAllPets();
      console.log("user-pet", userPets);
      const userPets = allPets.filter(pet => pet.customerId === user.id);
      console.log("user-pet", userPets);
      return userPets;

    } catch (error) {
      console.error("Error fetching user pets:", error);
      return [];
    }
  };

  const handleAppointmentSubmit = async (e) => {
    e.preventDefault();
    if (userPets.length === 0) {
      alert("Please login and register a pet before booking an appointment");
      // navigate("/register-pet");
      navigate('/signin');
    } else {
      try {
        const formData = {
          petId: selectedPetId,
          time: time,
          comments: comments,
          userId: user.id
        };
        const response = await fetch("https://localhost:7083/api/Booking/create-booking", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        });
        if (response.ok) {
          console.log("Booking successful!");
        } else {
        }
      } catch (error) {
        console.error("Error booking appointment:", error);
      }
    }
  };

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

      {/* Start Body */}
      <section className="bg-half-170 d-table w-100 bg-light">
        <div className="container">
          <div className="row mt-5 justify-content-center">
            <div className="col-12">
              <div className="section-title text-center">
                <h3 className="sub-title mb-4">Book an appointment</h3>
                <p className="para-desc mx-auto text-muted">
                  Great doctor if you need your family member to get effective
                  immediate assistance, emergency treatment or a simple
                  consultation.
                </p>

                <nav aria-label="breadcrumb" className="d-inline-block mt-3">
                  <ul className="breadcrumb bg-transparent mb-0 py-1">
                    <li className="breadcrumb-item">
                      <Link to="/">PetHealthCare</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Appointment
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="position-relative">
        <div className="shape overflow-hidden text-color-white">
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
      {/* End Body */}

      {/* Start */}
      <section className="section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card border-0 shadow rounded overflow-hidden">
                <div className="tab-content p-4" id="pills-tabContent">
                  <div className="tab-pane fade show active" id="pills-clinic" role="tabpanel" aria-labelledby="clinic-booking">
                    <form onSubmit={handleAppointmentSubmit}>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Select Pet</label>
                            <select className="form-select form-control" value={selectedPetId} onChange={(e) => setSelectedPetId(e.target.value)}>
                              <option value="" disabled>Select Pet</option>
                              {userPets.map((pet) => (
                                <option key={pet.petId} value={pet.petId}>
                                  {pet.name} - {pet.species}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        {/* end col */}

                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label" htmlFor="input-time">
                              Time :
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
                        {/* end col */}

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
                        {/* end col */}

                        <div className="col-lg-12">
                          <div className="d-grid">
                            <button type="submit" className="btn btn-primary">
                              Book An Appointment
                            </button>
                          </div>
                        </div>
                        {/* end col */}
                      </div>
                      {/* end row */}
                    </form>
                  </div>
                </div>
              </div>
            </div>
            {/* end col */}
          </div>
          {/* end row */}
        </div>
        {/* end container */}
      </section>
      {/* end section */}
      {/* End */}

      {/* Start Footer */}
      <Footer />
      {/* End Footer */}
    </div>
  );
}
