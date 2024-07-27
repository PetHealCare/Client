import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DOCTOR_API, SERVICE_API } from "../../apiEndpoint";
import { useAuth } from "../../Components/Login/Authen";
import TopHeader from "../../Components/Sidebar/TopHeader";
import SidebarDoctor from "../../Components/Sidebar/SidebarDoctor";
import { fetchWithAuth } from "../../utils/apiUtils";

export default function UpdateServiceDoctor() {
  const { user } = useAuth();
  const [services, setServices] = useState([]);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchServices();
    }
  }, [user]);

  const fetchServices = async () => {
    try {
      const response = await fetchWithAuth(SERVICE_API.MASTER);
      const data = await response.json();

      if (Array.isArray(data)) {
        setServices(data); // Set the services if the response is an array
      } else {
        console.error("Unexpected response format:", data);
        toast.error("Unexpected response format");
      }
    } catch (error) {
      console.error("Error fetching services:", error);
      toast.error("Error fetching services");
    }
  };

  const handleServiceChange = (event) => {
    setSelectedServiceId(Number(event.target.value));
  };

  const handleUpdateService = async () => {
    if (selectedServiceId === null) {
      toast.error("Please select a service");
      return;
    }

    try {
      const response = await fetchWithAuth(`${DOCTOR_API.UPDATE_SERVICE}`, {
        method: "POST", // Change from PUT to POST if required
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          doctorId: user.data.doctorId,
          listServiceIds: [selectedServiceId],
        }),
      });
      const data = await response.json();
      console.log("data", data);
      if (data.success) {
        toast.success("Service updated successfully");
        setTimeout(() => navigate("/doctor-service"), 1000);
      } else {
        toast.error("Failed to update service");
      }
    } catch (error) {
      console.error("Error updating service:", error);
      toast.error("Error updating service");
    }
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
                <h5 className="mb-0">Update Service</h5>
                <nav aria-label="breadcrumb" className="d-inline-block mt-2">
                  <ul className="breadcrumb breadcrumb-muted bg-transparent rounded mb-0 p-0">
                    <li className="breadcrumb-item">
                      <Link to="/doctor-schedule">Doctris</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Update Service
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="col-xl-3 col-md-6 mt-4 mt-md-0 text-md-end">
                <button
                  className="btn btn-primary"
                  onClick={handleUpdateService}
                >
                  Save Changes
                </button>
              </div>
            </div>

            <div className="row">
              <div className="col-12 mt-4">
                <div className="bg-white shadow rounded p-4">
                  <div className="form-group">
                    <label htmlFor="serviceSelect">Select Service</label>
                    <select
                      id="serviceSelect"
                      className="form-select"
                      value={selectedServiceId || ""}
                      onChange={handleServiceChange}
                    >
                      <option value="" disabled>
                        Select a service
                      </option>
                      {services.map((service) => (
                        <option
                          key={service.serviceId}
                          value={service.serviceId}
                        >
                          {service.serviceName}
                        </option>
                      ))}
                    </select>
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
}
