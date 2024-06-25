import React, { useState, useEffect } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { useParams } from "react-router-dom";
import { SERVICE_API } from "../../apiEndpoint";
import { Link } from "react-router-dom";
import { useAuth } from "../../Components/Login/Authen";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TopHeader from "../../Components/Sidebar/TopHeader";

export default function UpdateService() {
  const { id } = useParams();
  const [service, setService] = useState({});
  const [serviceName, setServiceName] = useState("");
  const [description, setDescription] = useState("");
  const [limitTime, setLimitTime] = useState("");
  const [price, setPrice] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    fetchDoctorDetails(id);
  }, [id]);

  const fetchDoctorDetails = async (serviceId) => {
    try {
      const response = await fetch(`${SERVICE_API.MASTER}/${serviceId}`);
      const data = await response.json();
      const serviceData = data;
      setService(serviceData);
      setServiceName(serviceData.serviceName);
      setDescription(serviceData.description);
      setLimitTime(serviceData.limitTime);
      setPrice(serviceData.price);
    } catch (error) {
      console.log("Error fetching service details: ", error);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const updatedService = {
      serviceId: id,
      serviceName,
      description,
      limitTime,
      price,
    };

    try {
      const response = await fetch(`${SERVICE_API.MASTER}`, {
        method: "PUT",
        headers: {
          "Content-Type":
            "application/json;odata.metadata=minimal;odata.streaming=true",
        },
        body: JSON.stringify(updatedService),
      });

      console.log("Data update: ", updatedService);

      if (response.ok) {
        const data = await response.json();
        console.log("Service updated successfully:", data);
        toast.success("Service updated successfully!");
        setTimeout(() => navigate("/manage-service"), 1000);

        // Clear form fields after successful update
        setServiceName("");
        setDescription("");
        setLimitTime("");
        setPrice("");
      } else {
        console.log("Error updating service:", response.statusText);
        toast.error("Error updating service");
      }
    } catch (error) {
      console.error("Error updating service:", error);
      toast.error("Error updating service: " + error.message);
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="page-wrapper doctris-theme toggled">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="page-content bg-light" style={{ marginTop: "10px" }}>
          <TopHeader />
          <div className="layout-specing">
            <div className="row">
              <div className="col-xl-9 col-md-6">
                <h5 className="mb-0">Services</h5>
                <nav aria-label="breadcrumb" className="d-inline-block mt-2">
                  <ul className="breadcrumb breadcrumb-muted bg-transparent rounded mb-0 p-0">
                    <li className="breadcrumb-item">
                      <a href="index.html">PetHealthCare</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Update Service
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="col-xl-3 col-md-6 mt-4 mt-md-0 text-md-end">
                <Link to="/manage-service" className="btn btn-primary">
                  Back to Services
                </Link>
              </div>
              <h2>Update Service</h2>
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "40vh" }}
              >
                <div className="rounded shadow mt-4">
                  <div className="p-4">
                    <form onSubmit={handleFormSubmit}>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Service Name</label>
                            <input
                              name="serviceName"
                              type="text"
                              className="form-control"
                              value={serviceName}
                              onChange={(e) => setServiceName(e.target.value)}
                            />
                          </div>
                        </div>
                        {/* <!--end col--> */}

                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Description</label>
                            <input
                              name="description"
                              type="text"
                              className="form-control"
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                            />
                          </div>
                        </div>
                        {/* <!--end col--> */}

                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Limit Time</label>
                            <input
                              name="limitTime"
                              type="number"
                              className="form-control"
                              value={limitTime}
                              onChange={(e) => setLimitTime(e.target.value)}
                            />
                          </div>
                        </div>
                        {/* <!--end col--> */}

                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Price</label>
                            <input
                              name="price"
                              type="number"
                              className="form-control"
                              value={price}
                              onChange={(e) => setPrice(e.target.value)}
                            />
                          </div>
                        </div>
                        {/* <!--end col--> */}
                      </div>
                      {/* <!--end row--> */}

                      <div className="row">
                        <div className="col-md-12 text-end">
                          <button type="submit" className="btn btn-primary">
                            Update Service
                          </button>
                        </div>
                      </div>
                      {/* <!--end row--> */}
                    </form>
                    {/* <!--end form--> */}
                  </div>
                </div>
              </div>
              {/* <!--end col--> */}
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
    </div>
  );
}
