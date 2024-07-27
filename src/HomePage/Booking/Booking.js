import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Components/Login/Authen";
import Footer from "../../Components/Footer/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import {
  BILL_API,
  BOOKING_API,
  DOCTOR_API,
  PAYMENT_API,
  PET_API,
  SCHEDULE_API,
  SERVICE_API,
} from "../../apiEndpoint";
import { fetchWithAuth } from "../../utils/apiUtils";

const timeslots = [
  { start: "08:00", end: "10:00", slotBooking: 1, label: "8:00 - 10:00" },
  { start: "10:00", end: "12:00", slotBooking: 2, label: "10:00 - 12:00" },
  { start: "13:00", end: "15:00", slotBooking: 3, label: "13:00 - 15:00" },
  { start: "15:00", end: "17:00", slotBooking: 4, label: "15:00 - 17:00" },
];

const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export default function Booking() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [userPets, setUserPets] = useState([]);
  const [selectedPetId, setSelectedPetId] = useState("");
  const [date, setDate] = useState(getTodayDate());
  const [note, setNote] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [availableSchedules, setAvailableSchedules] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
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
      navigate("/signin");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (selectedDoctorId) {
      fetchServices(selectedDoctorId);
    }
  }, [selectedDoctorId]);

  useEffect(() => {
    if (selectedDoctorId && date) {
      fetchAvailableSchedules(selectedDoctorId, date);
    }
  }, [selectedDoctorId, date]);

  const fetchServices = async (doctorId) => {
    try {
      const response = await fetchWithAuth(`${DOCTOR_API.MASTER}/${doctorId}`);
      const data = await response.json();
      setServices(data.data.serviceList || []);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  const fetchDoctors = async () => {
    try {
      const response = await fetchWithAuth(DOCTOR_API.MASTER);
      const data = await response.json();
      setDoctors(data.data.items || []);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const fetchUserPets = async () => {
    try {
      const response = await fetchWithAuth(
        `${PET_API.MASTER}?CustomerId=${user.customerId}`
      );
      const data = await response.json();
      setUserPets(data.data.items || []);
    } catch (error) {
      console.error("Error fetching user pets:", error);
    }
  };

  const fetchAvailableSchedules = async (doctorId, date) => {
    try {
      const response = await fetchWithAuth(
        `${SCHEDULE_API.MASTER}?doctorId=${doctorId}`
      );
      const data = await response.json();
      console.log("data schedule", data);

      if (!response.ok) {
        throw new Error(data.message || "Error fetching schedules");
      }

      const bookedSlots = data
        .filter((schedule) => {
          const scheduleDate = new Date(schedule.startTime)
            .toISOString()
            .split("T")[0];
          return scheduleDate === date;
        })
        .map((schedule) => ({
          startTime: new Date(schedule.startTime).toLocaleString("sv-SE", {
            timeZone: "Asia/Ho_Chi_Minh",
            hour12: false,
          }),
          endTime: new Date(schedule.endTime).toLocaleString("sv-SE", {
            timeZone: "Asia/Ho_Chi_Minh",
            hour12: false,
          }),
        }));

      filterAvailableTimeslots(bookedSlots, date);
    } catch (error) {
      console.error("Error fetching schedules:", error);
    }
  };

  const filterAvailableTimeslots = (bookedSlots, selectedDate) => {
    // Convert booked slots to Date objects
    const bookedTimes = bookedSlots.map((slot) => ({
      start: new Date(slot.startTime),
      end: new Date(slot.endTime),
    }));

    console.log("Booked Times:", bookedTimes); // Log booked times for debugging

    // Filter available timeslots
    const availableSlots = timeslots.filter((timeslot) => {
      // Convert timeslot start and end times to Date objects using the selected date
      const timeslotStart = new Date(`${selectedDate}T${timeslot.start}:00`);
      const timeslotEnd = new Date(`${selectedDate}T${timeslot.end}:00`);

      console.log("Timeslot Start:", timeslotStart);
      console.log("Timeslot End:", timeslotEnd);

      // Check if the timeslot is not overlapping with any booked slot
      const isAvailable = !bookedTimes.some(
        (bookedSlot) =>
          timeslotStart < bookedSlot.end && timeslotEnd > bookedSlot.start
      );

      console.log("Is Timeslot Available:", isAvailable);

      return isAvailable;
    });

    console.log("Available Slots:", availableSlots); // Log available slots for debugging
    setAvailableSchedules(availableSlots);
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

  const getRoomNo = (doctorId) => {
    const roomMap = {
      1: "Room 101",
      2: "Room 102",
      3: "Room 103",
      4: "Room 104",
    };
    return roomMap[doctorId] || "Room 105";
  };

  const handleAppointmentSubmit = async (e) => {
    e.preventDefault();

    if (!selectedPetId || !selectedDoctorId || !date || !selectedSchedule) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      const response = await fetchWithAuth(BOOKING_API.CREATE_BOOKING_SERVICE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerId: user.customerId,
          petId: selectedPetId,
          doctorId: selectedDoctorId,
          note: note,
          serviceIds: selectedServices,
          roomNo: getRoomNo(selectedDoctorId),
          startTime: date + "T" + selectedSchedule.start,
          endTime: date + "T" + selectedSchedule.end,
          slotBooking: selectedSchedule.slotBooking,
          status: true,
        }),
      });

      const result = await response.json();

      console.log("data", result);

      if (response.ok) {
        console.log("Booking created with ID:", result.bookingId); // Add this line
        toast.success("Appointment booked successfully!");
        navigate("/create-bill");
      } else {
        toast.error(result.message || "Error booking appointment");
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
      toast.error("Error booking appointment");
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
                              {userPets
                                .filter((pet) => pet.status === true)
                                .map((pet) => (
                                  <option key={pet.petId} value={pet.petId}>
                                    {pet.name} - {pet.species}
                                  </option>
                                ))}
                            </select>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Select Date</label>
                            <input
                              type="date"
                              className="form-control"
                              value={date}
                              onChange={(e) => setDate(e.target.value)}
                              required
                              min={getTodayDate()}
                            />
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
                            <label className="form-label">Available Time</label>
                            <Select
                              name="time"
                              options={availableSchedules.map((schedule) => ({
                                value: schedule,
                                label: schedule.label,
                              }))}
                              onChange={(selectedOption) =>
                                setSelectedSchedule(selectedOption.value)
                              }
                              isClearable
                            />
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
