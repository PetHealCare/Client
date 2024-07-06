import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SCHEDULE_API } from "../../apiEndpoint";
import { useAuth } from "../../Components/Login/Authen";
import TopHeader from "../../Components/Sidebar/TopHeader";
import Sidebar from "../../Components/Sidebar/Sidebar";

const ITEMS_PER_PAGE = 10;

export default function ManageSchedule() {
  const { user, logout } = useAuth();
  const [schedules, setSchedules] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchSchedules();
    }
  }, [user, currentPage]); // Reload schedules when user or currentPage changes

  const fetchSchedules = async () => {
    try {
      const response = await fetch(
        `${SCHEDULE_API.MASTER}?page=${currentPage}&limit=${ITEMS_PER_PAGE}`
      );
      const data = await response.json();
      if (Array.isArray(data.items)) {
        setSchedules(data.items);
        setTotalPages(data.totalPages);
      } else {
        console.error("Fetched data is not an array:", data);
        setSchedules([]);
        setTotalPages(1);
      }
    } catch (error) {
      console.error("Error fetching schedules: ", error);
      setSchedules([]);
      setTotalPages(1);
      toast.error("Error fetching schedules");
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  const indexOfLastSchedule = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstSchedule = indexOfLastSchedule - ITEMS_PER_PAGE;
  const currentSchedules = schedules.slice(
    indexOfFirstSchedule,
    indexOfLastSchedule
  );

  return (
    <div className="page-wrapper doctris-theme toggled">
      <Sidebar />
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
                      <a href="index.html">Doctris</a>
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
                    <Link to="/add-schedule" className="btn btn-primary">
                      Add Schedule
                    </Link>
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
                          style={{ minWidth: "180px" }}
                        >
                          Doctor
                        </th>
                        <th
                          className="border-bottom p-3"
                          style={{ minWidth: "150px" }}
                        >
                          Room No
                        </th>
                        <th
                          className="border-bottom p-3"
                          style={{ minWidth: "220px" }}
                        >
                          Start Time
                        </th>
                        <th
                          className="border-bottom p-3"
                          style={{ minWidth: "220px" }}
                        >
                          End Time
                        </th>
                        <th
                          className="border-bottom p-3"
                          style={{ minWidth: "220px" }}
                        >
                          Slot Booking
                        </th>
                        <th
                          className="border-bottom p-3"
                          style={{ minWidth: "150px" }}
                        ></th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentSchedules.map((schedule, index) => (
                        <tr key={index}>
                          <td className="p-3">
                            {indexOfFirstSchedule + index + 1}
                          </td>
                          <td className="p-3">{schedule.doctorName}</td>
                          <td className="p-3">{schedule.roomNo}</td>
                          <td className="p-3">{schedule.startTime}</td>
                          <td className="p-3">{schedule.endTime}</td>
                          <td className="p-3">{schedule.slotBooking}</td>
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
                    Showing {indexOfFirstSchedule + 1} -{" "}
                    {Math.min(indexOfLastSchedule, schedules.length)} out of{" "}
                    {schedules.length}
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
