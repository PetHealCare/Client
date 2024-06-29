import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PET_API } from "../../apiEndpoint";
import { useAuth } from "../../Components/Login/Authen";
import TopHeader from "../../Components/Sidebar/TopHeader";
import Sidebar from "../../Components/Sidebar/Sidebar";

const ITEMS_PER_PAGE = 10;

export default function ManagePet() {
  const { user, logout } = useAuth();
  const [pets, setPets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchPets();
    }
  }, [user, currentPage]);

  const fetchPets = async () => {
    try {
      const response = await fetch(
        `${PET_API.MASTER}?page=${currentPage}&limit=${ITEMS_PER_PAGE}`
      );
      const data = await response.json();
      console.log("Pet data", data);
      if (data.pets && Array.isArray(data.pets)) {
        setPets(data.pets);
        setTotalPages(data.totalPages);
      } else {
        console.error("Fetched data is not valid:", data);
        setPets([]);
        setTotalPages(1);
      }
    } catch (error) {
      console.error("Error fetching pets: ", error);
      setPets([]);
      setTotalPages(1);
      toast.error("Error fetching pets");
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDeletePet = async (petId) => {
    try {
      const response = await fetch(`${PET_API.MASTER}/${petId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setPets(pets.filter((pet) => pet.petId !== petId));
        toast.success("Pet deleted successfully!");
      } else {
        console.error("Failed to delete pet");
      }
    } catch (error) {
      console.error("Error deleting pet:", error);
    }
  };

  return (
    <div className="page-wrapper doctris-theme toggled">
      <Sidebar />
      <main className="page-content bg-light">
        <TopHeader />
        <div className="container-fluid">
          <div className="layout-specing">
            <div className="row">
              <div className="col-xl-9 col-lg-6 col-md-4">
                <h5 className="mb-0">Pets</h5>
                <nav aria-label="breadcrumb" className="d-inline-block mt-2">
                  <ul className="breadcrumb breadcrumb-muted bg-transparent rounded mb-0 p-0">
                    <li className="breadcrumb-item">
                      <Link to="/">Doctris</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Pets
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="col-xl-3 col-lg-6 col-md-8 mt-4 mt-md-0">
                <div className="justify-content-md-end">
                  <div className="d-grid">
                    <Link to="/add-pet" className="btn btn-primary">
                      Add New Pet
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
                          Name
                        </th>
                        <th
                          className="border-bottom p-3"
                          style={{ minWidth: "220px" }}
                        >
                          Species
                        </th>
                        <th
                          className="border-bottom p-3"
                          style={{ minWidth: "100px" }}
                        >
                          Status
                        </th>
                        <th
                          className="border-bottom p-3"
                          style={{ minWidth: "100px" }}
                        >
                          Customer
                        </th>
                        <th
                          className="border-bottom p-3"
                          style={{ minWidth: "100px" }}
                        >
                          Age
                        </th>
                        <th
                          className="border-bottom p-3"
                          style={{ minWidth: "100px" }}
                        >
                          Gender
                        </th>
                        <th
                          className="border-bottom p-3"
                          style={{ minWidth: "100px" }}
                        >
                          Generic
                        </th>
                        <th
                          className="border-bottom p-3"
                          style={{ minWidth: "100px" }}
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
                      {pets.map((pet, index) => (
                        <tr key={pet.petId}>
                          <td className="p-3">
                            {index + 1 + (currentPage - 1) * ITEMS_PER_PAGE}
                          </td>
                          <td className="p-3">
                            <Link
                              to={`/update-pet/${pet.petId}`}
                              className="text-dark"
                            >
                              {pet.name}
                            </Link>
                          </td>
                          <td className="p-3">{pet.species}</td>
                          <td className="p-3">{pet.status}</td>
                          <td className="p-3">{pet.customerId}</td>
                          <td className="p-3">{pet.age}</td>
                          <td className="p-3">{pet.gender}</td>
                          <td className="p-3">{pet.generic}</td>
                          <td className="p-3">{pet.description}</td>
                          <td className="text-end p-3">
                            <Link
                              to={`/update-pet/${pet.petId}`}
                              className="btn btn-icon btn-pills btn-soft-primary"
                            >
                              <i className="uil uil-eye"></i>
                            </Link>
                            <button
                              className="btn btn-icon btn-pills btn-soft-danger ms-2"
                              onClick={() => handleDeletePet(pet.petId)}
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
                    Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} -{" "}
                    {Math.min(currentPage * ITEMS_PER_PAGE, pets.length)} out of{" "}
                    {pets.length}
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
