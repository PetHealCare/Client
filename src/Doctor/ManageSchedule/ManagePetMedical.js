import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MEDICAL_RECORD_API } from "../../apiEndpoint"; // Ensure this is the correct endpoint
import { useAuth } from "../../Components/Login/Authen";
import TopHeader from "../../Components/Sidebar/TopHeader";
import SidebarDoctor from "../../Components/Sidebar/SidebarDoctor";
import { fetchWithAuth } from "../../utils/apiUtils";

export default function ManagePetMedical() {
  const { user, logout } = useAuth();
  const [medicals, setMedicals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.data && user.data.doctorId) {
      fetchMedicals();
    } else {
      console.error("User data or doctorId is missing.");
    }
  }, [user]);

  const fetchMedicals = async () => {
    try {
      const response = await fetchWithAuth(
        `${MEDICAL_RECORD_API.MASTER}?DoctorId=${user.data.doctorId}`
      );
      const data = await response.json();
      console.log("Fetched medical data:", data);

      if (Array.isArray(data)) {
        setMedicals(data);
      } else if (data && typeof data === "object") {
        setMedicals([data]);
      } else if (data && Array.isArray(data.data)) {
        setMedicals(data.data);
      } else {
        console.error("Unexpected data format:", data);
        setMedicals([]);
      }
    } catch (error) {
      console.error("Error fetching medical records:", error);
      setMedicals([]);
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
                <h5 className="mb-0">Pet Medical Records</h5>
                <nav aria-label="breadcrumb" className="d-inline-block mt-2">
                  <ul className="breadcrumb breadcrumb-muted bg-transparent rounded mb-0 p-0">
                    <li className="breadcrumb-item">
                      <Link to="/doctor-schedule">Doctris</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Medical Records
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
                          style={{ minWidth: "150px" }}
                        >
                          Pet ID
                        </th>
                        <th
                          className="border-bottom p-3"
                          style={{ minWidth: "150px" }}
                        >
                          Visit Date
                        </th>
                        <th
                          className="border-bottom p-3"
                          style={{ minWidth: "150px" }}
                        >
                          Diagnosis
                        </th>
                        <th
                          className="border-bottom p-3"
                          style={{ minWidth: "150px" }}
                        >
                          Treatment
                        </th>
                        <th
                          className="border-bottom p-3"
                          style={{ minWidth: "150px" }}
                        >
                          Notes
                        </th>
                        <th
                          className="border-bottom p-3"
                          style={{ minWidth: "150px" }}
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {medicals.map((record, index) => (
                        <tr key={record.recordId}>
                          <td className="p-3">{index + 1}</td>
                          <td className="p-3">{record.petId}</td>
                          <td className="p-3">
                            {new Date(record.visitDate).toLocaleDateString()}
                          </td>
                          <td className="p-3">{record.diagnosis || "N/A"}</td>
                          <td className="p-3">{record.treatment || "N/A"}</td>
                          <td className="p-3">{record.notes || "N/A"}</td>
                          <td className="p-3">
                            <button
                              className="btn btn-primary"
                              onClick={() =>
                                navigate(
                                  `/doctor-update-medical/${record.recordId}`
                                )
                              }
                            >
                              Update
                            </button>
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
