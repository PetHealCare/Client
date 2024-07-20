import React, { useEffect, useState } from "react";
import { CUSTOMER_API } from "../../apiEndpoint";
import { Link } from "react-router-dom";
import { useAuth } from "../../Components/Login/Authen";
import TopHeader from "../../Components/Sidebar/TopHeader";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchWithAuth } from "../../utils/apiUtils";

export default function ManageCustomer() {
  const [customers, setCustomers] = useState([]);
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await fetchWithAuth(CUSTOMER_API.MASTER);
      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      console.log("Error fetching doctors:", error);
    }
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
                <h5 className="mb-0">Customers</h5>
                <nav aria-label="breadcrumb" className="d-inline-block mt-2">
                  <ul className="breadcrumb breadcrumb-muted bg-transparent rounded mb-0 p-0">
                    <li className="breadcrumb-item">
                      <Link to="/">PetHealthCare</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Customers
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="col-xl-3 col-md-6 mt-4 mt-md-0 text-md-end">
                <Link to="/add-customer" className="btn btn-primary">
                  Add New Customer
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
                          Full Name
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
                          Address
                        </th>
                        <th
                          className="border-bottom p-3"
                          style={{ minWidth: "150px" }}
                        ></th>
                      </tr>
                    </thead>
                    <tbody>
                      {customers.map((customer, index) => (
                        <tr key={index}>
                          <th className="p-3">{index + 1}</th>
                          <td className="p-3">
                            <Link
                              to={`/update-customer/${customer.customerId}`}
                              className="text-dark"
                            >
                              <div className="d-flex align-items-center">
                                <span className="ms-2">
                                  {customer.fullName}
                                </span>
                              </div>
                            </Link>
                          </td>
                          <td className="p-3">{customer.phoneNumber}</td>
                          <td className="p-3">{customer.address}</td>
                          <td className="text-end p-3">
                            <Link
                              to={`/update-customer/${customer.customerId}`}
                              className="btn btn-icon btn-pills btn-soft-primary"
                            >
                              <i className="uil uil-eye"></i>
                            </Link>
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
