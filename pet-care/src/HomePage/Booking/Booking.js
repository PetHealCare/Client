import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Components/Login/Authen";
import Footer from "../../Components/Footer/Footer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Booking() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [userPets, setUserPets] = useState([]);
  const [selectedPetId, setSelectedPetId] = useState("");
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    if (user) {
      fetchUserPets();
    } else {
      navigate('/signin'); // Redirect to login if user is not authenticated
    }
  }, [user, navigate]);

  const fetchUserPets = async () => {
    try {
      const response = await fetch(`https://localhost:7083/api/pet?CustomerId=${user.customerId}`);
      const data = await response.json();
      setUserPets(data.data.items || []);
    } catch (error) {
      console.error("Error fetching user pets:", error);
      // toast.error("Error fetching user pets");
    }
  };

  const handleAppointmentSubmit = async (e) => {
    e.preventDefault();
    if (userPets.length === 0) {    
      setTimeout(() => navigate("/register-pet"), 1000);
    }
    if (!selectedPetId) {
      toast.error("Currently, you haven't information of Pet. Please, register!");
      return;
    }

    try {
      const formData = {
        petId: parseInt(selectedPetId, 10),
        customerId: user.customerId,
        bookingDate: new Date(date).toISOString(),
        note: note
      };
      console.log("Form Data: ", formData); 

      const response = await fetch("https://localhost:7083/api/Booking/create-booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        console.log("Booking successful!");
        toast.success('Booking successful!');
      } else {
        const errorText = await response.text();
        console.error("Error booking appointment:", response.status, errorText);
        toast.error('Error booking appointment');
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
      toast.error('Error booking appointment');
    }
  };

  return (
    <div>
      <ToastContainer />
      <header id="topnav" className="defaultscroll sticky">
        <div className="container">
          <div>
            <Link className="logo" to="/" style={{ marginRight: "130px" }}>
              <img src="../assets/images/logo-light.png" className="l-dark" height="22" alt="" />
              <img src="../assets/images/logo-dark.png" className="l-light" height="22" alt="" />
            </Link>
          </div>
          <ul className="dropdowns list-inline mb-0">
            {user ? (
              <li className="list-inline-item mb-0 ms-1">
                <div className="dropdown dropdown-primary">
                  <button type="button" className="btn" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Welcome, {user.fullName}
                  </button>
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
              <Link to="/signin" className="btn btn-primary">Login</Link>
            )}
          </ul>
          <div id="navigation">
            <ul className="navigation-menu nav-left nav-black">
              <li className="has-submenu parent-parent-menu-item">
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

      <section className="bg-half-170 d-table w-100 bg-light">
        <div className="container">
          <div className="row mt-5 justify-content-center">
            <div className="col-12">
              <div className="section-title text-center">
                <h3 className="sub-title mb-4">Book an appointment</h3>
                <p className="para-desc mx-auto text-muted">
                  Great doctor if you need your family member to get effective immediate assistance, emergency treatment or a simple consultation.
                </p>
                <nav aria-label="breadcrumb" className="d-inline-block mt-3">
                  <ul className="breadcrumb bg-transparent mb-0 py-1">
                    <li className="breadcrumb-item">
                      <Link to="/">PetHealthCare</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">Appointment</li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="position-relative">
        <div className="shape overflow-hidden text-color-white">
          <svg viewBox="0 0 2880 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z" fill="currentColor"></path>
          </svg>
        </div>
      </div>

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
                            <label className="form-label" htmlFor="select-pet">Select Pet</label>
                            <select className="form-select form-control" id="select-pet" value={selectedPetId} onChange={(e) => setSelectedPetId(e.target.value)}>
                              <option value="" disabled>Select Pet</option>
                              {userPets.map((pet) => (
                                <option key={pet.petId} value={pet.petId}>
                                  {pet.name} - {pet.species}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label" htmlFor="input-date">Date</label>
                            <input name="date" type="date" className="form-control" id="input-date" value={date} onChange={(e) => setDate(e.target.value)} />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="mb-3">
                            <label className="form-label" htmlFor="note">Note</label>
                            <textarea name="note" id="note" rows="4" className="form-control" placeholder="Your Note :" value={note} onChange={(e) => setNote(e.target.value)}></textarea>
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="d-grid">
                            <button type="submit" className="btn btn-primary">Book An Appointment</button>
                          </div>
                        </div>
                        <div className="col-lg-12 mt-2">
                    <small className="text-dark me-2">Do you need to register information for a new pet?</small>
                    <Link to="/register-pet" className="text-dark fw-bold">Register New Pet</Link>
                  </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
