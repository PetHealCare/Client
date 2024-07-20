import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DOCTOR_API } from "../../apiEndpoint";
import { useAuth } from "../../Components/Login/Authen";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TopHeader from "../../Components/Sidebar/TopHeader";
import { fetchWithAuth } from "../../utils/apiUtils";

export default function ManageDoctor() {
  const [doctors, setDoctors] = useState([]);
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await fetchWithAuth(DOCTOR_API.MASTER);
      const data = await response.json();
      setDoctors(data.data.items);
    } catch (error) {
      console.log("Error fetching doctors:", error);
    }
  };

  const handleDeleteDoctor = async (doctorId) => {
    try {
      const response = await fetchWithAuth(`${DOCTOR_API.MASTER}/${doctorId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Remove the deleted doctor from the local state
        setDoctors(doctors.filter((doctor) => doctor.doctorId !== doctorId));
        toast.success("Doctor deleted successfully!");
        setTimeout(() => window.location.reload(), 1000);
      } else {
        console.error("Failed to delete doctor");
      }
    } catch (error) {
      console.error("Error deleting doctor:", error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/signin"); // Redirect to sign-in page
  };

  return (
    <div>
      <ToastContainer />
      <div className="page-wrapper doctris-theme toggled">
        <Sidebar />
        <div className="page-content bg-light" style={{ marginTop: "10px" }}>
          <TopHeader />
          <div className="layout-specing">
            <div className="row">
              <div className="col-xl-9 col-md-6">
                <h5 className="mb-0">Doctors</h5>
                <nav aria-label="breadcrumb" className="d-inline-block mt-2">
                  <ul className="breadcrumb breadcrumb-muted bg-transparent rounded mb-0 p-0">
                    <li className="breadcrumb-item">
                      <Link to="/">PetHealthCare</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Doctors
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="col-xl-3 col-md-6 mt-4 mt-md-0 text-md-end">
                <Link to="/add-doctor" className="btn btn-primary">
                  Add New Doctor
                </Link>
              </div>
            </div>
            <div className="row">
              <div className="col-12 mt-4">
                <div className="table-responsive bg-white shadow rounded">
                  <table className="table mb-0 table-center">
                    <thead>
                      <tr>
                        <th
                          className="border-bottom p-3"
                          style={{ minWidth: "50px" }}
                        >
                          #
                        </th>
                        <th
                          className="border-bottom p-3"
                          style={{ minWidth: "180px" }}
                        >
                          Name
                        </th>
                        <th
                          className="border-bottom p-3"
                          style={{ minWidth: "150px" }}
                        >
                          Phone
                        </th>
                        <th
                          className="border-bottom p-3"
                          style={{ minWidth: "220px" }}
                        >
                          Speciality
                        </th>
                        <th
                          className="border-bottom p-3"
                          style={{ minWidth: "150px" }}
                        ></th>
                      </tr>
                    </thead>
                    <tbody>
                      {doctors.map((doctor, index) => (
                        <tr key={index}>
                          <th className="p-3">{index + 1}</th>
                          <td className="p-3">
                            <Link
                              to={`/update-doctor/${doctor.doctorId}`}
                              className="text-dark"
                            >
                              <div className="d-flex align-items-center">
                                <img
                                  src="../assets/images/doctors/02.jpg"
                                  className="avatar avatar-md-sm rounded-circle shadow"
                                  alt=""
                                />
                                <span className="ms-2">{doctor.fullName}</span>
                              </div>
                            </Link>
                          </td>
                          <td className="p-3">{doctor.phoneNumber}</td>
                          <td className="p-3">{doctor.speciality}</td>
                          <td className="text-end p-3">
                            <Link
                              to={`/update-doctor/${doctor.doctorId}`}
                              className="btn btn-icon btn-pills btn-soft-primary"
                            >
                              <i className="uil uil-eye"></i>
                            </Link>
                            <button
                              className="btn btn-icon btn-pills btn-soft-danger"
                              onClick={() =>
                                handleDeleteDoctor(doctor.doctorId)
                              }
                            >
                              <i className="uil uil-times-circle"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
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
      </div>
    </div>
  );
}
