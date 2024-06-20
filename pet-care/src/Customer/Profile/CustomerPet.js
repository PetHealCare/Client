import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SidebarCustomer from "../../Components/Sidebar/SidebarCustomer";
import { useAuth } from "../../Components/Login/Authen";

export default function ManagePet() {
  const { user } = useAuth();
  const [userPets, setUserPets] = useState([]);

  useEffect(() => {
    fetchUserPets();
  }, []);

  const fetchUserPets = async () => {
    try {
      const response = await fetch(
        `https://localhost:7083/api/pet?CustomerId=${user.customerId}`
      );
      const data = await response.json();
      setUserPets(data.data.items || []);
    } catch (error) {
      console.error("Error fetching user pets:", error);
      // toast.error("Error fetching user pets");
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
              <h5 className="mb-0">Pets</h5>
              <nav aria-label="breadcrumb" className="d-inline-block mt-2">
                <ul className="breadcrumb breadcrumb-muted bg-transparent rounded mb-0 p-0">
                  <li className="breadcrumb-item">
                    <Link to="/customer-pet">Pets</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Manage Pets
                  </li>
                </ul>
              </nav>
            </div>
            <div className="col-xl-3 col-md-6 mt-4 mt-md-0 text-md-end">
              <Link to="/customer-new-pet" className="btn btn-primary">
                Add New Pet
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
                        Name
                      </th>
                      <th
                        className="border-bottom p-3"
                        style={{ minWidth: "150px" }}
                      >
                        Species
                      </th>
                      <th
                        className="border-bottom p-3"
                        style={{ minWidth: "150px" }}
                      >
                        Age
                      </th>
                      <th
                        className="border-bottom p-3"
                        style={{ minWidth: "150px" }}
                      >
                        Gender
                      </th>
                      <th
                        className="border-bottom p-3"
                        style={{ minWidth: "220px" }}
                      >
                        Generic
                      </th>
                      <th
                        className="border-bottom p-3"
                        style={{ minWidth: "250px" }}
                      >
                        Description
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
                    {userPets.map((pet, index) => (
                      <tr key={index}>
                        <th className="p-3">{index + 1}</th>
                        <td className="p-3">{pet.name}</td>
                        <td className="p-3">{pet.species}</td>
                        <td className="p-3">{pet.age}</td>
                        <td className="p-3">
                          {pet.gender ? "Female" : "Male"}
                        </td>
                        <td className="p-3">{pet.generic}</td>
                        <td className="p-3">{pet.description}</td>
                        <td className="p-3">
                          <a
                            href="#"
                            className="btn btn-icon btn-pills btn-soft-danger"
                            data-bs-toggle="modal"
                            data-bs-target="#deleteDoctor"
                          >
                            <i className="uil uil-times-circle"></i>
                          </a>
                        </td>
                      </tr>
                    ))}
                    {/* Placeholder for No Pets Found */}
                    {userPets.length === 0 && (
                      <tr>
                        <td colSpan="8" className="text-center p-3">
                          No pets found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
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
