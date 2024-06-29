import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Components/Login/Authen";
import Footer from "../../Components/Footer/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import {
  BOOKING_API,
  DOCTOR_API,
  PET_API,
  SCHEDULE_API,
  SERVICE_API,
} from "../../apiEndpoint";

export default function Booking() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [userPets, setUserPets] = useState([]);
  const [selectedPetId, setSelectedPetId] = useState("");
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [availableSchedules, setAvailableSchedules] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  const handleLogout = () => {
    logout();
    navigate("/signin"); // Redirect to sign-in page
  };

  useEffect(() => {
    if (user) {
      fetchUserPets();
      fetchDoctors();
    } else {
      navigate("/signin"); // Redirect to login if user is not authenticated
    }
  }, [user, navigate]);

  useEffect(() => {
    if (selectedDoctorId) {
      fetchServices(selectedDoctorId);
    }
  }, [selectedDoctorId]);

  const fetchAvailableSchedules = async (doctorId, selectedDate) => {
    try {
      const response = await fetch(
        `${SCHEDULE_API.MASTER}?DoctorId=${doctorId}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();

      // Filter schedules by selected date and doctorId
      const filteredSchedules = data.filter((schedule) => {
        // Assuming schedule.startTime is in ISO string format
        const scheduleDate = new Date(schedule.startTime)
          .toISOString()
          .split("T")[0]; // Extract date part in ISO format
        const selectedDateString = new Date(selectedDate)
          .toISOString()
          .split("T")[0]; // Convert selectedDate to ISO format

        return scheduleDate === selectedDateString && schedule.status === true;
      });

      setAvailableSchedules(filteredSchedules);

      if (filteredSchedules.length === 0) {
        setSelectedSchedule(""); // Clear selected schedule if no schedules available
      } else {
        setSelectedSchedule(filteredSchedules[0].scheduleId); // Set default to first available schedule
      }
    } catch (error) {
      console.error("Error fetching schedules:", error);
      toast.error("Error fetching schedules");
    }
  };

  const fetchServices = async (doctorId) => {
    try {
      console.log("DoctorID service", doctorId);
      const response = await fetch(`${DOCTOR_API.MASTER}/${doctorId}`);
      const data = await response.json();

      if (data.data.serviceList) {
        setServices(data.data.serviceList);
        console.log("data serviceList", data.data.serviceList);
      } else {
        setServices([]);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
      toast.error("Error fetching services");
    }
  };

  const fetchDoctors = async () => {
    try {
      const response = await fetch(DOCTOR_API.MASTER);
      const data = await response.json();
      setDoctors(data.data.items || []);
    } catch (error) {
      console.error("Error fetching doctors:", error);
      toast.error("Error fetching doctors");
    }
  };

  const fetchUserPets = async () => {
    try {
      console.log("userID", user.customerId);
      const response = await fetch(
        `${PET_API.MASTER}?CustomerId=${user.customerId}`
      );
      const data = await response.json();
      console.log("data user pet", data);
      setUserPets(data.data.items || []);
    } catch (error) {
      console.error("Error fetching user pets:", error);
      // toast.error("Error fetching user pets");
    }
  };

  const handleAppointmentSubmit = async (e) => {
    e.preventDefault();
    if (userPets.length === 0) {
      setTimeout(() => navigate("/register-pet"), 1000);
    }
    if (!selectedPetId) {
      toast.error(
        "Currently, you haven't information of Pet. Please, register!"
      );
      return;
    }

    try {
      const formData = {
        petId: parseInt(selectedPetId, 10),
        customerId: user.customerId,
        doctorId: parseInt(selectedDoctorId, 10),
        serviceIds: selectedServices,
        note: note,
        scheduleId: parseInt(selectedSchedule, 10),
      };
      console.log("Form Data: ", formData);

      const response = await fetch(BOOKING_API.CREATE_BOOKING_SERVICE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Booking successful!");
        toast.success("Booking successful!");
        setTimeout(() => window.location.reload(), 2000);
      } else {
        const errorText = await response.text();
        console.error("Error booking appointment:", response.status, errorText);
        toast.error("Error booking appointment");
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
      toast.error("Error booking appointment");
    }
  };

  const handleServiceChange = (selectedOptions) => {
    if (selectedOptions.length > 5) {
      toast.error("You can only select up to 5 services.");
      return;
    }
    setSelectedServices(selectedOptions.map((option) => option.value));
    const total = selectedOptions.reduce(
      (acc, option) =>
        acc +
        services.find((service) => service.serviceId === option.value).price,
      0
    );
    setTotalPrice(total);
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setDate(selectedDate);
    if (selectedDoctorId) {
      fetchAvailableSchedules(selectedDoctorId, selectedDate);
    }
  };
  return (
    <div>
      <ToastContainer />
      <header id="topnav" className="defaultscroll sticky">
        <div className="container">
          <div>
            <Link className="logo" to="/" style={{ marginRight: "130px" }}>
              <img
                src="../assets/images/logo-light.png"
                className="l-dark"
                height="22"
                alt=""
              />
              <img
                src="../assets/images/logo-dark.png"
                className="l-light"
                height="22"
                alt=""
              />
            </Link>
          </div>
          <ul className="dropdowns list-inline mb-0">
            {user ? (
              <li className="list-inline-item mb-0 ms-1">
                <div className="dropdown dropdown-primary">
                  <button
                    type="button"
                    className="btn"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Welcome, {user.fullName}
                  </button>
                  <div className="dropdown-menu dd-menu dropdown-menu-end shadow border-0 mt-3 py-3">
                    <Link
                      className="dropdown-item text-dark"
                      to="/profile-customer"
                    >
                      Profile Settings
                    </Link>
                    <Link
                      className="dropdown-item text-dark"
                      to="/customer-pet"
                    >
                      Dashboard Manage
                    </Link>
                    <div className="dropdown-divider border-top"></div>
                    <button
                      className="dropdown-item text-dark"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </li>
            ) : (
              <Link to="/signin" className="btn btn-primary">
                Login
              </Link>
            )}
          </ul>
          <div id="navigation">
            <ul className="navigation-menu nav-left nav-black">
              <li className="has-submenu parent-parent-menu-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/service">Services</Link>
              </li>
              <li className="has-submenu parent-parent-menu-item">
                <Link to="/booking">Book Appointment</Link>
              </li>
              <li className="has-submenu parent-parent-menu-item">
                <Link to="/blog">Blog</Link>
              </li>
              <li className="has-submenu parent-parent-menu-item">
                <Link to="/about">About</Link>
              </li>
            </ul>
          </div>
        </div>
      </header>

      <section className="bg-half-170 d-table w-100 bg-light">
        <div className="container">
          <div className="row mt-5 justify-content-center">
            <div className="col-12">
              <div className="section-title text-center">
                <h3 className="sub-title mb-4">Book an appointment</h3>
                <p className="para-desc mx-auto text-muted">
                  Great doctor if you need your family member to get effective
                  immediate assistance, emergency treatment or a simple
                  consultation.
                </p>
                <nav aria-label="breadcrumb" className="d-inline-block mt-3">
                  <ul className="breadcrumb bg-transparent mb-0 py-1">
                    <li className="breadcrumb-item">
                      <Link to="/">PetHealthCare</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Appointment
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="position-relative">
        <div className="shape overflow-hidden text-color-white">
          <svg
            viewBox="0 0 2880 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card border-0 shadow rounded overflow-hidden">
                <div className="tab-content p-4" id="pills-tabContent">
                  <div
                    className="tab-pane fade show active"
                    id="pills-clinic"
                    role="tabpanel"
                    aria-labelledby="clinic-booking"
                  >
                    <form onSubmit={handleAppointmentSubmit}>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label" htmlFor="select-pet">
                              Select Pet
                            </label>
                            <select
                              className="form-select form-control"
                              id="select-pet"
                              value={selectedPetId}
                              onChange={(e) => setSelectedPetId(e.target.value)}
                            >
                              <option value="" disabled>
                                Select Pet
                              </option>
                              {userPets.map((pet) => (
                                <option key={pet.petId} value={pet.petId}>
                                  {pet.name} - {pet.species}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label
                              className="form-label"
                              htmlFor="select-doctor"
                            >
                              Select Doctor
                            </label>
                            <select
                              className="form-select form-control"
                              id="select-doctor"
                              value={selectedDoctorId}
                              onChange={(e) =>
                                setSelectedDoctorId(e.target.value)
                              }
                            >
                              <option value="" disabled>
                                Select Doctor
                              </option>
                              {doctors.map((doctor) => (
                                <option
                                  key={doctor.doctorId}
                                  value={doctor.doctorId}
                                >
                                  {doctor.fullName} - {doctor.speciality}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label" htmlFor="input-date">
                              Date
                            </label>
                            <input
                              name="date"
                              type="date"
                              className="form-control"
                              id="input-date"
                              value={date}
                              onChange={handleDateChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">
                              Available Schedule
                            </label>
                            <select
                              className="form-select form-control"
                              value={selectedSchedule}
                              onChange={(e) =>
                                setSelectedSchedule(e.target.value)
                              }
                            >
                              <option value="" disabled>
                                Select a schedule
                              </option>
                              {availableSchedules.map((schedule) => (
                                <option
                                  key={schedule.scheduleId}
                                  value={schedule.scheduleId}
                                >
                                  {new Date(
                                    schedule.startTime
                                  ).toLocaleTimeString()}{" "}
                                  -{" "}
                                  {new Date(
                                    schedule.endTime
                                  ).toLocaleTimeString()}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">
                              Select Services (Up to 5)
                            </label>
                            <Select
                              options={services.map((service) => ({
                                value: service.serviceId,
                                label: `${service.serviceName} - $${service.price}`,
                              }))}
                              value={selectedServices.map((serviceId) => ({
                                value: serviceId,
                                label: services.find(
                                  (service) => service.serviceId === serviceId
                                )?.serviceName,
                              }))}
                              isMulti
                              onChange={handleServiceChange}
                              maxMenuHeight={150} // Set maximum height to limit number of visible options
                            />
                          </div>
                          <div className="mt-3">
                            <label className="form-label">
                              Total Price: ${totalPrice}
                            </label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label" htmlFor="note">
                              Note
                            </label>
                            <textarea
                              name="note"
                              id="note"
                              rows="4"
                              className="form-control"
                              placeholder="Your Note :"
                              value={note}
                              onChange={(e) => setNote(e.target.value)}
                            ></textarea>
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="d-grid">
                            <button type="submit" className="btn btn-primary">
                              Book An Appointment
                            </button>
                          </div>
                        </div>
                        <div className="col-lg-12 mt-2">
                          <small className="text-dark me-2">
                            Do you need to register information for a new pet?
                          </small>
                          <Link
                            to="/register-pet"
                            className="text-dark fw-bold"
                          >
                            Register New Pet
                          </Link>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
