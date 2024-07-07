import React, { useEffect, useState } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { Link } from "react-router-dom";
import { PET_API, CUSTOMER_API } from "../../apiEndpoint";
import { useAuth } from "../../Components/Login/Authen";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TopHeader from "../../Components/Sidebar/TopHeader";
import Select from "react-select";

export default function AddNewPet() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [customers, setCustomers] = useState([]);
  const [customerId, setCustomerId] = useState("");
  const [name, setName] = useState("");
  const [species, setSpecies] = useState("");
  const [speciesOptions, setSpeciesOptions] = useState([]);
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [generic, setGeneric] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/signin"); // Redirect to login if user is not authenticated
    } else {
      fetchCustomers();
      fetchSpeciesOptions(); // Fetch species options
    }
  }, [user, navigate]);

  const fetchCustomers = async () => {
    try {
      const response = await fetch(`${CUSTOMER_API.MASTER}`);
      const data = await response.json();
      setCustomers(data || []);
    } catch (error) {
      console.error("Error fetching customers:", error);
      // toast.error("Error fetching customers");
    }
  };

  const fetchSpeciesOptions = async () => {
    // Replace with your API call logic to fetch species options
    const options = [
      { value: "dog", label: "Dog" },
      { value: "cat", label: "Cat" },
      { value: "bird", label: "Bird" },
      { value: "parrot", label: "Parrot" },
      { value: "rabbit", label: "Rabbit" },
      { value: "hamster", label: "Hamster" },
      { value: "another", label: "Another" },
    ];
    setSpeciesOptions(options);
  };

  const handlePetRegistration = async (e) => {
    e.preventDefault();

    if (
      !name ||
      !species ||
      !age ||
      !gender ||
      !generic ||
      !description ||
      !customerId
    ) {
      toast.error("Please fill out all fields");
      return;
    }

    try {
      const petData = {
        name: name,
        species: species,
        status: true,
        customerId: parseInt(customerId), // Ensure customerId is converted to an integer
        age: parseInt(age),
        gender: gender === "true",
        generic: generic,
        description: description,
      };

      const response = await fetch(PET_API.MASTER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(petData),
      });

      if (response.ok) {
        toast.success("Pet registered successfully!");
        setTimeout(() => navigate("/manage-pet"), 1000);
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

  const handleCustomerChange = (customerId) => {
    setCustomerId(customerId);
  };

  return (
    <div className="page-wrapper doctris-theme toggled">
      <ToastContainer />

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="page-content bg-light" style={{ marginTop: "10px" }}>
        <TopHeader />
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
              <Link to="/manage-pet" className="btn btn-primary">
                Back to Pets
              </Link>
            </div>
          </div>

          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "40vh", marginTop: "100px" }}
          >
            <div className="rounded shadow mt-4">
              <div className="p-4">
                <form onSubmit={handlePetRegistration}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Customer</label>
                        <Select
                          options={customers.map((customer) => ({
                            value: customer.customerId,
                            label: customer.fullName,
                          }))}
                          onChange={(option) =>
                            handleCustomerChange(option.value)
                          }
                          isSearchable
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label" htmlFor="pet-name">
                          Pet Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="pet-name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label" htmlFor="pet-age">
                          Pet Age
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id="pet-age"
                          value={age}
                          onChange={(e) => setAge(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label" htmlFor="pet-species">
                          Species
                        </label>
                        <select
                          className="form-select form-control"
                          id="pet-species"
                          value={species}
                          onChange={(e) => setSpecies(e.target.value)}
                          required
                        >
                          <option value="" disabled>
                            Select Species
                          </option>
                          {speciesOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label" htmlFor="pet-gender">
                          Gender
                        </label>
                        <select
                          className="form-select"
                          id="pet-gender"
                          value={gender}
                          onChange={(e) => setGender(e.target.value)}
                          required
                        >
                          <option value="">Select Gender</option>
                          <option value="false">Male</option>
                          <option value="true">Female</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label" htmlFor="pet-generic">
                          Generic
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="pet-generic"
                          value={generic}
                          onChange={(e) => setGeneric(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label className="form-label" htmlFor="pet-description">
                          Description
                        </label>
                        <textarea
                          className="form-control"
                          id="pet-description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          rows="3"
                          required
                        ></textarea>
                      </div>
                    </div>
                    <div className="col-md-12 text-end">
                      <button type="submit" className="btn btn-primary">
                        Add New Pet
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
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
  );
}
