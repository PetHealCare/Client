import React from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
// import { DOCTOR_API } from "../../apiEndpoint";

export default function ManageDoctor() {
  const [doctors, setDoctors] = useState([]);
  const [selectedDate, setSelectedDate] = useState("Today");

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await fetch("https://localhost:7083/api/doctor");
      const data = await response.json();
      setDoctors(data.data.items);
    } catch (error) {
      console.log("Error fetching doctor: ", error);
    }
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  return (
    <div className="page-wrapper doctris-theme toggled">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="page-content bg-light" style={{ marginTop: "10px" }}>
        <div className="top-header">
          <div className="header-bar d-flex justify-content-between border-bottom">
            <div className="d-flex align-items-center">
              <a href="#" className="logo-icon">
                <img
                  src="../assets/images/logo-icon.png"
                  height="30"
                  className="small"
                  alt=""
                />
                <span className="big">
                  <img
                    src="../assets/images/logo-dark.png"
                    height="22"
                    className="logo-light-mode"
                    alt=""
                  />
                  <img
                    src="../assets/images/logo-light.png"
                    height="22"
                    className="logo-dark-mode"
                    alt=""
                  />
                </span>
              </a>
              <a
                id="close-sidebar"
                className="btn btn-icon btn-pills btn-soft-primary ms-2"
                href="#"
              >
                <i className="uil uil-bars"></i>
              </a>
              <div className="search-bar p-0 d-none d-lg-block ms-2">
                <div id="search" className="menu-search mb-0">
                  <form
                    role="search"
                    method="get"
                    id="searchform"
                    className="searchform"
                  >
                    <div>
                      <input
                        type="text"
                        className="form-control border rounded-pill"
                        name="s"
                        id="s"
                        placeholder="Search Keywords..."
                      />
                      <input type="submit" id="searchsubmit" value="Search" />
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <ul className="list-unstyled mb-0">
              <li className="list-inline-item mb-0 ms-1">
                <div className="dropdown dropdown-primary">
                  <button
                    type="button"
                    className="btn btn-pills btn-soft-primary dropdown-toggle p-0"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <img
                      src="../assets/images/doctors/01.jpg"
                      className="avatar avatar-ex-small rounded-circle"
                      alt=""
                    />
                  </button>
                  <div
                    className="dropdown-menu dd-menu dropdown-menu-end shadow border-0 mt-3 py-3"
                    style={{ minWidth: "200px" }}
                  >
                    <a
                      className="dropdown-item d-flex align-items-center text-dark"
                      href="profile.html"
                    >
                      <img
                        src="../assets/images/doctors/01.jpg"
                        className="avatar avatar-md-sm rounded-circle border shadow"
                        alt=""
                      />
                      <div className="flex-1 ms-2">
                        <span className="d-block mb-1">Calvin Carlo</span>
                        <small className="text-muted">Orthopedic</small>
                      </div>
                    </a>
                    <a
                      className="dropdown-item text-dark"
                      href="dr-profile.html"
                    >
                      <span className="mb-0 d-inline-block me-1">
                        <i className="uil uil-setting align-middle h6"></i>
                      </span>{" "}
                      Profile Settings
                    </a>
                    <div className="dropdown-divider border-top"></div>
                    <a
                      className="dropdown-item text-dark"
                      href="lock-screen.html"
                    >
                      <span className="mb-0 d-inline-block me-1">
                        <i className="uil uil-sign-out-alt align-middle h6"></i>
                      </span>{" "}
                      Logout
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
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
                        style={{ minWidth: "150px" }}
                      >
                        Email
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
                          <a href="#" className="text-dark">
                            <div className="d-flex align-items-center">
                              <img
                                src="../assets/images/doctors/02.jpg"
                                className="avatar avatar-md-sm rounded-circle shadow"
                                alt=""
                              />
                              <span className="ms-2">{doctor.fullName}</span>
                            </div>
                          </a>
                        </td>
                        <td className="p-3">{doctor.phoneNumber}</td>
                        <td className="p-3">{doctor.email}</td>
                        <td className="p-3">{doctor.speciality}</td>
                        <td className="text-end p-3">
                          <Link
                            to="/create-slot-booking"
                            className="btn btn-icon btn-pills btn-soft-primary"
                          >
                            <i className="uil uil-eye"></i>
                          </Link>

                          <a
                            href="#"
                            className="btn btn-icon btn-pills btn-soft-danger"
                            data-bs-toggle="modal"
                            data-bs-target="#deleteDoctor"
                          >
                            <i className="uil uil-times-circle"></i>
                          </a>
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
