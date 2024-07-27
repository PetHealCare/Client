import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BOOKING_API } from "../../apiEndpoint";
import { useAuth } from "../../Components/Login/Authen";
import TopHeader from "../../Components/Sidebar/TopHeader";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { fetchWithAuth } from "../../utils/apiUtils";

export default function ManageAppointment() {
  const { user, logout } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/signin"); // Redirect to sign-in page
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
        const sortedAppointments = data.sort((a, b) => {
          return new Date(b.bookingDate) - new Date(a.bookingDate);
        });
        setAppointments(sortedAppointments); // Set sorted appointments
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
      <Sidebar />
      <main className="page-content bg-light">
        <TopHeader />

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
              {/* <!--end col--> */}

              <div className="col-xl-3 col-lg-6 col-md-8 mt-4 mt-md-0">
                <div className="justify-content-md-end">
                  <form>
                    <div className="row justify-content-between align-items-center">
                      <div className="col-sm-12 col-md-5">
                        <div className="mb-0 position-relative"></div>
                      </div>
                      {/* <!--end col--> */}
                      <div className="col-sm-12 col-md-7 mt-4 mt-sm-0">
                        <div className="d-grid">
                          <Link
                            to="/create-appointment"
                            className="btn btn-primary"
                          >
                            Appointment
                          </Link>
                        </div>
                      </div>
                      {/* <!--end col--> */}
                    </div>
                    {/* <!--end row--> */}
                  </form>
                  {/* <!--end form--> */}
                </div>
              </div>
              {/* <!--end col--> */}
            </div>
            {/* <!--end row--> */}

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
                          Customer
                        </th>
                        <th
                          className="border-bottom p-3"
                          style={{ minWidth: "150px" }}
                        >
                          Phone
                        </th>
                        <th className="border-bottom p-3">PetName</th>
                        <th
                          className="border-bottom p-3"
                          style={{ minWidth: "150px" }}
                        >
                          Booking Date
                        </th>
                        <th
                          className="border-bottom p-3"
                          style={{ minWidth: "150px" }}
                        >
                          Doctor
                        </th>
                        <th
                          className="border-bottom p-3"
                          style={{ minWidth: "150px" }}
                        >
                          Room
                        </th>
                        <th
                          className="border-bottom p-3"
                          style={{ minWidth: "150px" }}
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
                          <td className="p-3">
                            {appointment.customer.fullName}
                          </td>
                          <td className="p-3">
                            {appointment.customer.phoneNumber}
                          </td>
                          <td className="p-3">{appointment.pet.name}</td>
                          <td className="p-3">
                            {formatDate(appointment.bookingDate)}
                          </td>
                          <td className="p-3">{appointment.doctor.fullName}</td>
                          <td className="p-3">{appointment.schedule.roomNo}</td>
                          <td className="p-3">{appointment.note}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            {/* <!--end row--> */}

            <div className="row text-center">
              {/* <!-- PAGINATION START --> */}
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
              {/* <!--end col--> */}
              {/* <!-- PAGINATION END --> */}
            </div>
            {/* <!--end row--> */}
          </div>
        </div>
        {/* <!--end container--> */}
      </main>
      {/* <!--End page-content" --> */}
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
      <ToastContainer />
    </div>
  );
}

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleDateString();
};
