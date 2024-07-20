import React, { useState, useEffect } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { useParams } from "react-router-dom";
import { DOCTOR_API } from "../../apiEndpoint";
import { Link } from "react-router-dom";
import { useAuth } from "../../Components/Login/Authen";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TopHeader from "../../Components/Sidebar/TopHeader";
import { fetchWithAuth } from "../../utils/apiUtils";

export default function UpdateDoctor() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState({});
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [speciality, setSpeciality] = useState("");
  const { user, logout } = useAuth();

  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/signin"); // Redirect to sign-in page
  };

  useEffect(() => {
    fetchDoctorDetails(id);
  }, [id]);

  const fetchDoctorDetails = async (doctorId) => {
    try {
      const response = await fetchWithAuth(`${DOCTOR_API.MASTER}/${doctorId}`);
      const data = await response.json();
      const doctorData = data.data;
      setDoctor(doctorData);
      setFullName(doctorData.fullName);
      setPhoneNumber(doctorData.phoneNumber);
      setPassword(doctorData.email);
      setSpeciality(doctorData.speciality);
    } catch (error) {
      console.log("Error fetching doctor details: ", error);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const updatedDoctor = {
      doctorId: id,
      fullName,
      phoneNumber,
      speciality,
      password,
    };

    try {
      const response = await fetchWithAuth(`${DOCTOR_API.MASTER}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedDoctor),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Doctor updated successfully:", data);
        toast.success("Doctor updated successfully!");
        setTimeout(() => navigate("/manage-doctor"), 1000);

        // Optionally, clear the form or redirect to another page
        setFullName("");
        setPhoneNumber("");
        setSpeciality("");
        setPassword("");
        // Redirect to the doctor list page or show a success message
      } else {
        console.log("Error updating doctor:", response.statusText);
      }
    } catch (error) {
      console.log("Error updating doctor:", error);
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="page-wrapper doctris-theme toggled">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="page-content bg-light" style={{ marginTop: "10px" }}>
          <TopHeader />
          <div className="layout-specing">
            <div className="row">
              <div className="col-xl-9 col-md-6">
                <h5 className="mb-0">Update Doctor</h5>
                <nav aria-label="breadcrumb" className="d-inline-block mt-2">
                  <ul className="breadcrumb breadcrumb-muted bg-transparent rounded mb-0 p-0">
                    <li className="breadcrumb-item">
                      <a href="index.html">PetHealthCare</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Update Doctor
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="col-xl-3 col-md-6 mt-4 mt-md-0 text-md-end">
                <Link to="/manage-doctor" className="btn btn-primary">
                  Back to Doctors
                </Link>
              </div>
              <h2>Update Doctor</h2>
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
                            Update Doctor
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
    </div>
  );
}
