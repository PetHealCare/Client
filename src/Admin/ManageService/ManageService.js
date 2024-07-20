import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SERVICE_API } from "../../apiEndpoint";
import { useAuth } from "../../Components/Login/Authen";
import TopHeader from "../../Components/Sidebar/TopHeader";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { fetchWithAuth } from "../../utils/apiUtils";

const ITEMS_PER_PAGE = 10;

export default function ManageSchedule() {
  const { user, logout } = useAuth();
  const [services, setServices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchServices();
    }
  }, [user, currentPage]);

  const fetchServices = async () => {
    try {
      const response = await fetchWithAuth(
        `${SERVICE_API.MASTER}?page=${currentPage}&limit=${ITEMS_PER_PAGE}`
      );
      const data = await response.json();
      if (Array.isArray(data)) {
        setServices(data);
        setTotalPages(data.totalPages);
      } else {
        console.error("Fetched data is not an array:", data);
        setServices([]);
        setTotalPages(1);
      }
    } catch (error) {
      console.error("Error fetching services: ", error);
      setServices([]);
      setTotalPages(1);
      toast.error("Error fetching services");
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDeleteService = async (serviceId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this service?"
    );

    if (confirmDelete) {
      try {
        const response = await fetchWithAuth(
          `${SERVICE_API.MASTER}/${serviceId}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          setServices(
            services.filter((service) => service.serviceId !== serviceId)
          );
          toast.success("Service deleted successfully!");
          setTimeout(() => window.location.reload(), 1000); // Optional: Refresh page after deletion
        } else {
          console.error("Failed to delete service");
        }
      } catch (error) {
        console.error("Error deleting service:", error);
      }
    }
  };

  const indexOfLastService = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstService = indexOfLastService - ITEMS_PER_PAGE;
  const currentServices = services.slice(
    indexOfFirstService,
    indexOfLastService
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
                <h5 className="mb-0">Services</h5>
                <nav aria-label="breadcrumb" className="d-inline-block mt-2">
                  <ul className="breadcrumb breadcrumb-muted bg-transparent rounded mb-0 p-0">
                    <li className="breadcrumb-item">
                      <Link to="/">Doctris</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Services
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="col-xl-3 col-lg-6 col-md-8 mt-4 mt-md-0">
                <div className="justify-content-md-end">
                  <div className="d-grid">
                    <Link to="/add-service" className="btn btn-primary">
                      Add Service
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
                          Service Name
                        </th>
                        <th
                          className="border-bottom p-3"
                          style={{ minWidth: "220px" }}
                        >
                          Description
                        </th>
                        <th
                          className="border-bottom p-3"
                          style={{ minWidth: "100px" }}
                        >
                          Limit Time
                        </th>
                        <th
                          className="border-bottom p-3"
                          style={{ minWidth: "100px" }}
                        >
                          Price
                        </th>
                        <th
                          className="border-bottom p-3"
                          style={{ minWidth: "150px" }}
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentServices.map((service, index) => (
                        <tr key={service.serviceId}>
                          <td className="p-3">
                            {indexOfFirstService + index + 1}
                          </td>
                          <td className="p-3">
                            <Link
                              to={`/update-service/${service.serviceId}`}
                              className="text-dark"
                            >
                              {service.serviceName}
                            </Link>
                          </td>
                          <td className="p-3">{service.description}</td>
                          <td className="p-3">{service.limitTime}</td>
                          <td className="p-3">{service.price}</td>
                          <td className="text-end p-3">
                            <Link
                              to={`/update-service/${service.serviceId}`}
                              className="btn btn-icon btn-pills btn-soft-primary"
                            >
                              <i className="uil uil-eye"></i>
                            </Link>
                            <button
                              className="btn btn-icon btn-pills btn-soft-danger ms-2"
                              onClick={() =>
                                handleDeleteService(service.serviceId)
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

            <div className="row text-center">
              <div className="col-12 mt-4">
                <div className="d-md-flex align-items-center text-center justify-content-between">
                  <span className="text-muted me-3">
                    Showing {indexOfFirstService + 1} -{" "}
                    {Math.min(indexOfLastService, services.length)} out of{" "}
                    {services.length}
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
