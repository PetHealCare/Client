import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CUSTOMER_API, PET_API, BOOKING_API } from "../../apiEndpoint";
import { useAuth } from "../../Components/Login/Authen";
import SidebarCustomer from "../../Components/Sidebar/SidebarCustomer";
import { fetchWithAuth } from "../../utils/apiUtils";

export default function CustomerBooking() {
  const { user, logout } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  useEffect(() => {
    if (user) {
      fetchAppointments();
    }
  }, [user]);

  const fetchAppointments = async () => {
    try {
      const response = await fetchWithAuth(BOOKING_API.MASTER);
      const data = await response.json();

      if (Array.isArray(data)) {
        const filteredData = user.customerId
          ? data.filter(
              (appointment) => appointment.customerId === user.customerId
            )
          : data;

        const appointmentsWithData = filteredData.map((appointment) => {
          const services = appointment.services.map(
            (service) => service.serviceName
          );
          console.log(
            `Appointment ${appointment.bookingId} Services:`,
            services
          );
          return {
            ...appointment,
            startTime: appointment.schedule.startTime,
            endTime: appointment.schedule.endTime,
            doctor: appointment.doctor.fullName,
            services,
            petName: appointment.pet.name,
          };
        });

        setAppointments(appointmentsWithData);
      } else {
        console.error("Fetched data is not an array:", data);
        setAppointments([]);
      }
    } catch (error) {
      console.error("Error fetching appointments: ", error);
      setAppointments([]);
      toast.error("Error fetching appointments");
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastAppointment = currentPage * itemsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - itemsPerPage;
  const currentAppointments = appointments.slice(
    indexOfFirstAppointment,
    indexOfLastAppointment
  );

  const totalItems = appointments.length;

  return (
    <div className="page-wrapper doctris-theme toggled">
      {/* Sidebar */}
      <SidebarCustomer />

      <main className="page-content bg-light">
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
          </div>
        </div>

        <div className="container-fluid">
          <div className="layout-specing">
            <div className="row">
              <div className="col-xl-9 col-lg-6 col-md-4">
                <h5 className="mb-0">Appointment</h5>
                <nav aria-label="breadcrumb" className="d-inline-block mt-2">
                  <ul className="breadcrumb breadcrumb-muted bg-transparent rounded mb-0 p-0">
                    <li className="breadcrumb-item">
                      <a href="index.html">Doctris</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Appointment
                    </li>
                  </ul>
                </nav>
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
                          PetName
                        </th>
                        <th
                          className="border-bottom p-3"
                          style={{ minWidth: "150px" }}
                        >
                          Doctor
                        </th>
                        <th className="border-bottom p-3">Services</th>
                        <th
                          className="border-bottom p-3"
                          style={{ minWidth: "150px" }}
                        >
                          Appointment Date
                        </th>
                        <th
                          className="border-bottom p-3"
                          style={{ minWidth: "150px" }}
                        >
                          Time
                        </th>
                        <th
                          className="border-bottom p-3"
                          style={{ minWidth: "220px" }}
                        >
                          Note
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentAppointments.map((appointment, index) => (
                        <tr key={index}>
                          <td className="p-3">
                            {indexOfFirstAppointment + index + 1}
                          </td>
                          <td className="p-3">{appointment.petName}</td>
                          <td className="p-3">{appointment.doctor}</td>
                          <td className="p-3">
                            {appointment.services.join(", ")}
                          </td>
                          <td className="p-3">
                            {formatDate(appointment.startTime)}
                          </td>
                          <td className="p-3">
                            {formatTime(appointment.startTime)} -{" "}
                            {formatTime(appointment.endTime)}
                          </td>
                          <td className="p-3">{appointment.note}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="row text-center">
              <div className="col-12 mt-4">
                <div className="d-md-flex align-items-center text-center justify-content-between">
                  <span className="text-muted me-3">
                    Showing {indexOfFirstAppointment + 1} -{" "}
                    {Math.min(indexOfLastAppointment, totalItems)} out of{" "}
                    {totalItems}
                  </span>
                  <ul className="pagination justify-content-center mb-0 mt-3 mt-sm-0">
                    <li
                      className={`page-item ${currentPage === 1 && "disabled"}`}
                    >
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        Prev
                      </button>
                    </li>
                    {[
                      ...Array(Math.ceil(totalItems / itemsPerPage)).keys(),
                    ].map((page) => (
                      <li
                        className={`page-item ${
                          currentPage === page + 1 ? "active" : ""
                        }`}
                        key={page}
                      >
                        <button
                          className="page-link"
                          onClick={() => handlePageChange(page + 1)}
                        >
                          {page + 1}
                        </button>
                      </li>
                    ))}
                    <li
                      className={`page-item ${
                        currentPage === Math.ceil(totalItems / itemsPerPage) &&
                        "disabled"
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={
                          currentPage === Math.ceil(totalItems / itemsPerPage)
                        }
                      >
                        Next
                      </button>
                    </li>
                  </ul>
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
}

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

const formatTime = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  const hours = date.getHours();
  return ` ${hours}:00`;
};
