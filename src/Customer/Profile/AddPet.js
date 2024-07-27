import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../../Components/Login/Authen";
import "react-toastify/dist/ReactToastify.css";
import { PET_API } from "../../apiEndpoint";
import SidebarCustomer from "../../Components/Sidebar/SidebarCustomer";
import { fetchWithAuth } from "../../utils/apiUtils";

export default function AddPet() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [species, setSpecies] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [generic, setGeneric] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    // Fetch species options if needed
  }, []);

  const calculateAge = (dobString) => {
    const dob = new Date(dobString);
    const currentDate = new Date();
    let age = currentDate.getFullYear() - dob.getFullYear();
    const monthDifference = currentDate.getMonth() - dob.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && currentDate.getDate() < dob.getDate())) {
      age--;
    }

    return age;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!name || !species || !dob || !gender || !generic || !description) {
      toast.error("Please fill out all fields");
      return;
    }

    try {
      const petData = {
        name: name,
        species: species,
        status: true, // Assuming status is always true for new registrations
        customerId: user.customerId,
        age: calculateAge(dob),
        dob: dob,
        gender: gender === "true", // Convert gender to boolean
        generic: generic,
        description: description,
      };

      const response = await fetchWithAuth(PET_API.MASTER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(petData),
      });

      if (response.ok) {
        toast.success("Pet registered successfully!");
        setTimeout(() => navigate("/customer-pet"), 1000);
      } else {
        const errorText = await response.text();
        console.error("Error registering pet:", response.status, errorText);
        toast.error("Error registering pet: " + errorText); // Display error message from backend
      }
    } catch (error) {
      console.error("Error registering pet:", error);
      toast.error("Error registering pet: " + error.message); // Display error message
    }
  };

  return (
    <div className="page-wrapper doctris-theme toggled">
      {/* Sidebar */}
      <SidebarCustomer />

      {/* Main Content */}
      <div className="page-content bg-light" style={{ marginTop: "10px" }}>
        <div className="top-header">
          <div className="header-bar d-flex justify-content-between border-bottom">
            <div className="d-flex align-items-center">
              <a href="#" className="logo-icon">
                <img
                  src="../assets/images/logo-icon.png"
                  height="30"
                  className="small"
                  alt=""
                />
                <span className="big">
                  <img
                    src="../assets/images/logo-dark.png"
                    height="22"
                    className="logo-light-mode"
                    alt=""
                  />
                  <img
                    src="../assets/images/logo-light.png"
                    height="22"
                    className="logo-dark-mode"
                    alt=""
                  />
                </span>
              </a>
              <a
                id="close-sidebar"
                className="btn btn-icon btn-pills btn-soft-primary ms-2"
                href="#"
              >
                <i className="uil uil-bars"></i>
              </a>
              <div className="search-bar p-0 d-none d-lg-block ms-2">
                <div id="search" className="menu-search mb-0">
                  <form
                    role="search"
                    method="get"
                    id="searchform"
                    className="searchform"
                  >
                    <div>
                      <input
                        type="text"
                        className="form-control border rounded-pill"
                        name="s"
                        id="s"
                        placeholder="Search Keywords..."
                      />
                      <input type="submit" id="searchsubmit" value="Search" />
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <ul className="dropdowns list-inline mb-0">
              {user ? (
                <li className="list-inline-item mb-0 ms-1">
                  <div className="dropdown dropdown-primary">
                    <a
                      type="text"
                      className=""
                      href=""
                      style={{ color: "black" }}
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Welcome, {user.fullName}
                    </a>
                    <div className="dropdown-menu dd-menu dropdown-menu-end shadow border-0 mt-3 py-3">
                      <Link
                        className="dropdown-item text-dark"
                        to="/profile-customer"
                      >
                        Profile Settings
                      </Link>
                      <div className="dropdown-divider border-top"></div>
                      <Link className="dropdown-item text-dark" to="/signin">
                        Logout
                      </Link>
                    </div>
                  </div>
                </li>
              ) : (
                <Link to="/signin" className="btn btn-primary">
                  Login
                </Link>
              )}
            </ul>
          </div>
        </div>
        <div className="layout-specing">
          <div className="row">
            <div className="col-xl-9 col-md-6">
              <h5 className="mb-0">Register New Pet</h5>
              <nav aria-label="breadcrumb" className="d-inline-block mt-2">
                <ul className="breadcrumb breadcrumb-muted bg-transparent rounded mb-0 p-0">
                  <li className="breadcrumb-item">
                    <a href="index.html">Doctris</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Register New Pet
                  </li>
                </ul>
              </nav>
            </div>
            <div className="col-xl-3 col-md-6 mt-4 mt-md-0 text-md-end">
              <Link to="/customer-pet" className="btn btn-primary">
                Back to Pets
              </Link>
            </div>
          </div>

          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "40vh", marginTop: "100px" }}
          >
            <div className="rounded shadow mt-4">
              <div className="p-4" style={{ width: "700px" }}>
                <form onSubmit={handleFormSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Pet Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Species</label>
                      <select
                        className="form-select"
                        value={species}
                        onChange={(e) => setSpecies(e.target.value)}
                      >
                        <option value="">Select Species</option>
                        <option value="dog">Dog</option>
                        <option value="cat">Cat</option>
                        <option value="bird">Bird</option>
                        <option value="parrot">Parrot</option>
                        <option value="rabbit">Rabbit</option>
                        <option value="hamster">Hamster</option>
                        <option value="another">Another</option>
                      </select>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Date of Birth</label>
                      <input
                        type="date"
                        className="form-control"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Gender</label>
                      <select
                        className="form-select"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                      >
                        <option value="">Select Gender</option>
                        <option value="true">Male</option>
                        <option value="false">Female</option>
                      </select>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Generic</label>
                      <input
                        type="text"
                        className="form-control"
                        value={generic}
                        onChange={(e) => setGeneric(e.target.value)}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Description</label>
                      <textarea
                        className="form-control"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                  <div className="col-md-12 text-end">
                    <button type="submit" className="btn btn-primary">
                      Add New Pet
                    </button>
                  </div>
                </form>
              </div>
            </div>
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
  );
}