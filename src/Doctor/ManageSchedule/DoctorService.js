import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DOCTOR_API } from "../../apiEndpoint";
import { useAuth } from "../../Components/Login/Authen";
import TopHeader from "../../Components/Sidebar/TopHeader";
import SidebarDoctor from "../../Components/Sidebar/SidebarDoctor";
import { fetchWithAuth } from "../../utils/apiUtils";

export default function DoctorService() {
  const { user, logout } = useAuth();
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchServices();
    }
  }, [user]);

  const fetchServices = async () => {
    try {
      const response = await fetchWithAuth(
        `${DOCTOR_API.MASTER}/${user.data.doctorId}`
      );

      const data = await response.json();
      console.log("data", data);
      if (data.success && data.data) {
        setServices(data.data.serviceList || []);
      } else {
        console.error("Data is not in expected format:", data);
        setServices([]);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
      setServices([]);
      toast.error("Error fetching services");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/signin");
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
                <h5 className="mb-0">Services</h5>
                <nav aria-label="breadcrumb" className="d-inline-block mt-2">
                  <ul className="breadcrumb breadcrumb-muted bg-transparent rounded mb-0 p-0">
                    <li className="breadcrumb-item">
                      <Link to="/doctor-schedule">Doctris</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Services
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="col-xl-3 col-md-6 mt-4 mt-md-0 text-md-end">
                <Link to="/doctor-add-service" className="btn btn-primary">
                  Add Service
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
                          style={{ minWidth: "150px" }}
                        >
                          Service Name
                        </th>
                        <th
                          className="border-bottom p-3"
                          style={{ minWidth: "150px" }}
                        >
                          Description
                        </th>
                        <th
                          className="border-bottom p-3"
                          style={{ minWidth: "150px" }}
                        >
                          Limit Time (mins)
                        </th>
                        <th
                          className="border-bottom p-3"
                          style={{ minWidth: "220px" }}
                        >
                          Price ($)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {services.map((service, index) => (
                        <tr key={service.serviceId}>
                          <td className="p-3">{index + 1}</td>
                          <td className="p-3">{service.serviceName}</td>
                          <td className="p-3">{service.description}</td>
                          <td className="p-3">{service.limitTime}</td>
                          <td className="p-3">{service.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
