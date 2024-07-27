import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BOOKING_API } from "../../apiEndpoint";
import { useAuth } from "../../Components/Login/Authen";
import TopHeader from "../../Components/Sidebar/TopHeader";
import SidebarDoctor from "../../Components/Sidebar/SidebarDoctor";
import { fetchWithAuth } from "../../utils/apiUtils";

const ITEMS_PER_PAGE = 10;

export default function DoctorSchedule() {
  const { user, logout } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        doctorId: user.data.doctorId,
      }));
    }
  }, [user]);

  useEffect(() => {
    if (user && filters.doctorId) {
      fetchFilteredBookings();
    }
  }, [user, filters, currentPage]);

  const fetchFilteredBookings = async () => {
    try {
      const queryParams = new URLSearchParams({
        page: currentPage,
        limit: ITEMS_PER_PAGE,
        doctorId: filters.doctorId,
      }).toString();

      const response = await fetchWithAuth(
        `${BOOKING_API.MASTER}?${queryParams}`
      );
      const data = await response.json();

      if (Array.isArray(data)) {
        // Sort bookings from newest to oldest based on startTime
        const sortedBookings = data.sort(
          (a, b) =>
            new Date(b.schedule.startTime) - new Date(a.schedule.startTime)
        );
        setBookings(sortedBookings);
        setTotalPages(Math.ceil(data.total / ITEMS_PER_PAGE)); // Adjust as needed
      } else {
        console.error("Data is not in expected format:", data);
        setBookings([]);
        setTotalPages(1);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setBookings([]);
      setTotalPages(1);
      toast.error("Error fetching bookings");
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  const indexOfLastBooking = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstBooking = indexOfLastBooking - ITEMS_PER_PAGE;
  const currentBookings = bookings.slice(
    indexOfFirstBooking,
    indexOfLastBooking
  );

  return (
    <div className="page-wrapper doctris-theme toggled">
      <SidebarDoctor />
      <main className="page-content bg-light">
        <TopHeader />
        <div className="container-fluid">
          <div className="layout-specing">
            <div className="row">
              <div className="col-xl-9 col-lg-6 col-md-4">
                <h5 className="mb-0">Schedule</h5>
                <nav aria-label="breadcrumb" className="d-inline-block mt-2">
                  <ul className="breadcrumb breadcrumb-muted bg-transparent rounded mb-0 p-0">
                    <li className="breadcrumb-item">
                      <Link to="/doctor-schedule">Doctris</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Schedule
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="col-xl-3 col-lg-6 col-md-8 mt-4 mt-md-0">
                <div className="justify-content-md-end">
                  <div className="d-grid">
                    {/* Add Schedule button or other actions */}
                  </div>
                </div>
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
                          style={{ minWidth: "150px" }}
                        >
                          Room No
                        </th>
                        <th
                          className="border-bottom p-3"
                          style={{ minWidth: "150px" }}
                        >
                          Date
                        </th>
                        <th
                          className="border-bottom p-3"
                          style={{ minWidth: "180px" }}
                        >
                          Time
                        </th>
                        <th
                          className="border-bottom p-3"
                          style={{ minWidth: "150px" }}
                        >
                          Pet Name
                        </th>
                        <th
                          className="border-bottom p-3"
                          style={{ minWidth: "150px" }}
                        >
                          Pet Specie
                        </th>
                        <th
                          className="border-bottom p-3"
                          style={{ minWidth: "220px" }}
                        >
                          Services
                        </th>
                        <th
                          className="border-bottom p-3"
                          style={{ minWidth: "220px" }}
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentBookings.map((booking, index) => (
                        <tr key={booking.bookingId}>
                          <td className="p-3">
                            {indexOfFirstBooking + index + 1}
                          </td>
                          <td className="p-3">{booking.schedule.roomNo}</td>
                          <td className="p-3">
                            {formatDate(booking.schedule.startTime)}
                          </td>
                          <td className="p-3">
                            {formatTime(booking.schedule.startTime)} -{" "}
                            {formatTime(booking.schedule.endTime)}
                          </td>
                          <td className="p-3">{booking.pet.name}</td>
                          <td className="p-3">{booking.pet.species}</td>
                          <td className="p-3">
                            {booking.services.map(
                              (service) => service.serviceName
                            )}
                          </td>
                          <td className="p-3">
                            {isToday(booking.schedule.startTime) && (
                              <button
                                className="btn btn-primary"
                                onClick={() =>
                                  navigate(
                                    `/doctor-medical/${booking.pet.petId}`
                                  )
                                }
                              >
                                Add Medical Record
                              </button>
                            )}
                          </td>
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
                    Showing {indexOfFirstBooking + 1} -{" "}
                    {Math.min(indexOfLastBooking, bookings.length)} out of{" "}
                    {bookings.length}
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
                    {Array.from({ length: totalPages }, (_, index) => (
                      <li
                        key={index}
                        className={`page-item ${
                          currentPage === index + 1 && "active"
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => handlePageChange(index + 1)}
                        >
                          {index + 1}
                        </button>
                      </li>
                    ))}
                    <li
                      className={`page-item ${
                        currentPage === totalPages && "disabled"
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
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

const isToday = (dateString) => {
  const today = new Date();
  const date = new Date(dateString);
  return (
    today.getDate() === date.getDate() &&
    today.getMonth() === date.getMonth() &&
    today.getFullYear() === date.getFullYear()
  );
};
