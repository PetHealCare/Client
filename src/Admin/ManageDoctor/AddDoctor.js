import React, { useState, useEffect } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { Link } from "react-router-dom";
import { DOCTOR_API } from "../../apiEndpoint";
import { useAuth } from "../../Components/Login/Authen";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TopHeader from "../../Components/Sidebar/TopHeader";
import { fetchWithAuth } from "../../utils/apiUtils";

export default function AddDoctor() {
  const { user, logout } = useAuth();
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/signin"); // Redirect to sign-in page
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!fullName || !phoneNumber || !speciality || !email || !password) {
      toast.error("Please fill out all fields");
      return;
    }

    try {
      const newDoctor = {
        fullName,
        phoneNumber,
        speciality,
        email,
        password,
        status: true,
      };
      console.log("New Doctor Data:", newDoctor);

      const response = await fetchWithAuth(DOCTOR_API.MASTER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newDoctor),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Doctor registered successfully!");
        console.log("Doctor Registration Response:", result);
        setTimeout(() => navigate("/manage-doctor"), 1000);
      } else {
        console.error(
          "Error registering doctor:",
          response.status,
          response.statusText,
          result.message
        );
        toast.error("Error registering doctor: " + result.message);
      }
    } catch (error) {
      console.error("Error registering doctor:", error);
      toast.error("Error registering doctor: " + error.message);
    }
  };

  return (
    <div className="page-wrapper doctris-theme toggled">
      <ToastContainer />

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="page-content bg-light" style={{ marginTop: "10px" }}>
        <TopHeader />
        <div className="layout-specing">
          <div className="row">
            <div className="col-xl-9 col-md-6">
              <h5 className="mb-0">Doctors</h5>
              <nav aria-label="breadcrumb" className="d-inline-block mt-2">
                <ul className="breadcrumb breadcrumb-muted bg-transparent rounded mb-0 p-0">
                  <li className="breadcrumb-item">
                    <a href="index.html">Doctris</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Doctors
                  </li>
                </ul>
              </nav>
            </div>
            <div className="col-xl-3 col-md-6 mt-4 mt-md-0 text-md-end">
              <Link to="/manage-doctor" className="btn btn-primary">
                Back to Doctors
              </Link>
            </div>
            <h2>Add New Doctor</h2>
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: "40vh" }}
            >
              <div className="rounded shadow mt-4">
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
                          <label className="form-label">Phone no.</label>
                          <input
                            name="phoneNumber"
                            type="text"
                            className="form-control"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                          />
                        </div>
                      </div>
                      {/* <!--end col--> */}

                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Speciality</label>
                          <input
                            name="speciality"
                            type="text"
                            className="form-control"
                            value={speciality}
                            onChange={(e) => setSpeciality(e.target.value)}
                          />
                        </div>
                      </div>
                      {/* <!--end col--> */}
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Email</label>
                          <input
                            name="email"
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      </div>
                      {/* <!--end col--> */}
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Password</label>
                          <input
                            name="password"
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                      </div>
                      {/* <!--end col--> */}
                    </div>
                    {/* <!--end row--> */}
                    <div className="row">
                      <div className="col-md-12 text-end">
                        <button type="submit" className="btn btn-primary">
                          Add New Doctor
                        </button>
                      </div>
                    </div>
                    {/* <!--end row--> */}
                  </form>
                  {/* <!--end form--> */}
                </div>
              </div>
            </div>
            {/* <!--end col--> */}
          </div>
        </div>
      </div>
      {/* Footer Start */}
      <footer className="bg-footer-color shadow py-3">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col">
              <div className="text-sm-start text-center">
                <p className="mb-0 text-muted">
                  {new Date().getFullYear()} © Doctris.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
      {/* Footer End */}
    </div>
  );
}
