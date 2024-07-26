import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Components/Login/Authen";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchWithAuth } from "../../utils/apiUtils";
import SidebarDoctor from "../../Components/Sidebar/SidebarDoctor";
import TopHeader from "../../Components/Sidebar/TopHeader";
import { DOCTOR_API } from "../../apiEndpoint";

const ProfileDoctor = () => {
  const [doctor, setDoctor] = useState({});
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [speciality, setSpeciality] = useState("");
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const doctorId = user.data.doctorId;

  useEffect(() => {
    if (doctorId) {
      fetchDoctorDetails(doctorId);
    }
  }, [doctorId]);

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
      doctorId: doctorId,
      fullName,
      phoneNumber,
      speciality,
      password, // Include password in the update payload
    };

    try {
      const response = await fetch(`${DOCTOR_API.MASTER}/${doctorId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedDoctor),
      });
      if (response.ok) {
        const data = await response.json();
        toast.success("Doctor updated successfully!");
        setTimeout(() => navigate("/doctor-schedule"), 1000);
      } else {
        toast.error("Error updating doctor. Please try again.");
        console.log("Error updating doctor:", response.statusText);
      }
    } catch (error) {
      toast.error("Error updating doctor. Please try again.");
      console.log("Error updating doctor:", error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/signin"); // Redirect to sign-in page
  };

  return (
    <div className="page-wrapper doctris-theme toggled">
      <SidebarDoctor />
      <main className="page-content bg-light">
        <TopHeader />
        <div className="container-fluid">
          <div className="layout-specing">
            <div className="row">
              <div className="col-xl-9 col-lg-6 col-md-4">
                <h5 className="mb-0">Profile</h5>
                <nav aria-label="breadcrumb" className="d-inline-block mt-2">
                  <ul className="breadcrumb breadcrumb-muted bg-transparent rounded mb-0 p-0">
                    <li className="breadcrumb-item">
                      <Link to="/doctor-schedule">Doctors</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Profile
                    </li>
                  </ul>
                </nav>
              </div>
            </div>

            <div className="row">
              <div className="col-12 mt-4">
                <div className="rounded shadow mt-4">
                  <div className="p-4 border-bottom">
                    <h5 className="mb-0 text-center">Personal Information:</h5>
                  </div>

                  <div className="p-4">
                    <form
                      onSubmit={handleFormSubmit}
                      className="mx-auto"
                      style={{ maxWidth: "600px" }}
                    >
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

                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Phone Number</label>
                            <input
                              name="phoneNumber"
                              type="text"
                              className="form-control"
                              value={phoneNumber}
                              onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                          </div>
                        </div>

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
                      </div>

                      <div className="row">
                        <div className="col-sm-12 text-center">
                          <input
                            type="submit"
                            id="submit"
                            name="send"
                            className="btn btn-primary"
                            value="Save Changes"
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
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
      <ToastContainer />
    </div>
  );
};

export default ProfileDoctor;
