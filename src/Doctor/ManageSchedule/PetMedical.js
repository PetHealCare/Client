import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchWithAuth } from "../../utils/apiUtils";
import SidebarDoctor from "../../Components/Sidebar/SidebarDoctor";
import TopHeader from "../../Components/Sidebar/TopHeader";
import { MEDICAL_RECORD_API } from "../../apiEndpoint";
import { useAuth } from "../../Components/Login/Authen";

const PetMedical = () => {
  const { petId } = useParams();
  const [visitDateTime, setVisitDateTime] = useState(getCurrentDateTime());
  const [diagnosis, setDiagnosis] = useState("");
  const [treatment, setTreatment] = useState("");
  const [notes, setNotes] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    setVisitDateTime(getCurrentDateTime());
  }, []);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const newMedicalRecord = {
      petId,
      doctorId: user.data.doctorId,
      visitDate: visitDateTime,
      diagnosis,
      treatment,
      notes,
    };

    try {
      const response = await fetchWithAuth(`${MEDICAL_RECORD_API.MASTER}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMedicalRecord),
      });
      if (response.ok) {
        toast.success("Medical record created successfully!");
        setTimeout(() => navigate("/medical-records"), 1000);
      } else {
        toast.error("Error creating medical record. Please try again.");
        console.log("Error creating medical record:", response.statusText);
      }
    } catch (error) {
      toast.error("Error creating medical record. Please try again.");
      console.log("Error creating medical record:", error);
    }
  };

  const handleDateChange = (event) => {
    setVisitDateTime(event.target.value);
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
                <h5 className="mb-0">Create Medical Record</h5>
                <nav aria-label="breadcrumb" className="d-inline-block mt-2">
                  <ul className="breadcrumb breadcrumb-muted bg-transparent rounded mb-0 p-0">
                    <li className="breadcrumb-item">
                      <Link to="/medical-records">Medical Records</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Create
                    </li>
                  </ul>
                </nav>
              </div>
            </div>

            <div className="row">
              <div className="col-12 mt-4">
                <div className="rounded shadow mt-4">
                  <div className="p-4 border-bottom">
                    <h5 className="mb-0 text-center">
                      Medical Record Information:
                    </h5>
                  </div>

                  <div className="p-4">
                    <form
                      onSubmit={handleFormSubmit}
                      className="mx-auto"
                      style={{ maxWidth: "600px" }}
                    >
                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Visit Date</label>
                            <input
                              name="visitDate"
                              type="datetime-local"
                              className="form-control"
                              value={visitDateTime}
                              onChange={handleDateChange}
                              required
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Diagnosis</label>
                            <input
                              name="diagnosis"
                              type="text"
                              className="form-control"
                              value={diagnosis}
                              onChange={(e) => setDiagnosis(e.target.value)}
                              required
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Treatment</label>
                            <input
                              name="treatment"
                              type="text"
                              className="form-control"
                              value={treatment}
                              onChange={(e) => setTreatment(e.target.value)}
                              required
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Notes</label>
                            <input
                              name="notes"
                              type="text"
                              className="form-control"
                              value={notes}
                              onChange={(e) => setNotes(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-sm-12 text-center">
                          <input
                            type="submit"
                            id="submit"
                            name="send"
                            className="btn btn-primary"
                            value="Create Medical Record"
                          />
                        </div>
                      </div>
                    </form>
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
};

export default PetMedical;

const getCurrentDateTime = () => {
  const now = new Date();
  return now.toISOString();
};
