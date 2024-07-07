import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Components/Login/Authen";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Footer from "../../Components/Footer/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import {
  BOOKING_API,
  DOCTOR_API,
  PET_API,
  CUSTOMER_API,
  SCHEDULE_API,
  SERVICE_API,
} from "../../apiEndpoint";
import TopHeader from "../../Components/Sidebar/TopHeader";

export default function CreateAppointment() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [customers, setCustomers] = useState([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState("");
  const [customerPets, setCustomerPets] = useState([]);
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

  useEffect(() => {
    if (user) {
      fetchCustomers();
      fetchDoctors();
      fetchServices();
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
    if (selectedDoctorId || date) {
      fetchAvailableSchedules(selectedDoctorId, date);
    }
  }, [selectedDoctorId, date]);

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

  const fetchCustomerPets = async (customerId) => {
    try {
      const response = await fetch(
        `${PET_API.MASTER}?CustomerId=${customerId}`
      );
      const data = await response.json();
      setCustomerPets(data.data.items || []);
    } catch (error) {
      console.error("Error fetching customer pets:", error);
      toast.error("Customer doesn't register Pet");
    }
  };

  const fetchAvailableSchedules = async (doctorId, selectedDate) => {
    try {
      const response = await fetch(
        `${SCHEDULE_API.MASTER}?DoctorId=${doctorId}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();

      const filteredSchedules = data.filter((schedule) => {
        const scheduleDate = new Date(schedule.startTime)
          .toISOString()
          .split("T")[0];
        const selectedDateString = new Date(selectedDate)
          .toISOString()
          .split("T")[0];

        return scheduleDate === selectedDateString && schedule.status === true;
      });

      setAvailableSchedules(filteredSchedules);

      if (filteredSchedules.length === 0) {
        setSelectedSchedule("");
      } else {
        setSelectedSchedule(filteredSchedules[0].scheduleId);
      }

      const uniqueDoctorIds = Array.from(
        new Set(filteredSchedules.map((schedule) => schedule.doctorId))
      );

      const doctorsData = await Promise.all(
        uniqueDoctorIds.map(async (doctorId) => {
          const response = await fetch(`${DOCTOR_API.MASTER}/${doctorId}`);
          const data = await response.json();
          return data.data;
        })
      );
      console.log("doctor data:", doctorsData);
      setDoctors(doctorsData);
    } catch (error) {
      console.error("Error fetching schedules:", error);
      // toast.error("Error fetching schedules");
    }
  };

  const fetchServices = async (doctorId) => {
    try {
      const response = await fetch(`${DOCTOR_API.MASTER}/${doctorId}`);
      const data = await response.json();

      if (data.data.serviceList) {
        setServices(data.data.serviceList);
      } else {
        setServices([]);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  const fetchDoctors = async () => {
    try {
      const response = await fetch(DOCTOR_API.MASTER);
      const data = await response.json();
      setDoctors(data.data.items || []);
    } catch (error) {
      console.error("Error fetching doctors:", error);
      // toast.error("Error fetching doctors");
    }
  };

  const handleAppointmentSubmit = async (e) => {
    e.preventDefault();

    if (!selectedCustomerId || customerPets.length === 0) {
      toast.error("Please select a customer with registered pets.");
      return;
    }

    if (!selectedPetId) {
      toast.error("Please select a pet.");
      return;
    }

    try {
      const formData = {
        petId: parseInt(selectedPetId, 10),
        customerId: parseInt(selectedCustomerId, 10),
        doctorId: parseInt(selectedDoctorId, 10),
        serviceIds: selectedServices.map((serviceId) =>
          parseInt(serviceId, 10)
        ),
        note: note,
        scheduleId: parseInt(selectedSchedule, 10),
      };

      const response = await fetch(BOOKING_API.CREATE_BOOKING_SERVICE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Booking successful!");
        setTimeout(() => window.location.reload(), 2000);
        navigate("/manage-appointment");
      } else {
        const errorText = await response.text();
        console.error("Error booking appointment:", response.status, errorText);
        toast.error("Error booking appointment");
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
      // toast.error("Error booking appointment");
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

  const handleCustomerChange = (customerId) => {
    setSelectedCustomerId(customerId);
    fetchCustomerPets(customerId);
  };

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
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
              <h5 className="mb-0">Appointments</h5>
              <nav aria-label="breadcrumb" className="d-inline-block mt-2">
                <ul className="breadcrumb breadcrumb-muted bg-transparent rounded mb-0 p-0">
                  <li className="breadcrumb-item">
                    <Link to="/manage-appointment">Doctris</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Appointments
                  </li>
                </ul>
              </nav>
            </div>
            <div className="col-xl-3 col-md-6 mt-4 mt-md-0 text-md-end">
              <Link to="/manage-appointment" className="btn btn-primary">
                Back to Appointments
              </Link>
            </div>
          </div>

          <h2>Add New Appointment</h2>

          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "40vh" }}
          >
            <div className="rounded shadow mt-4">
              <div className="p-4 " style={{ marginTop: "150px" }}>
                <form onSubmit={handleAppointmentSubmit}>
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
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Pet</label>
                        <Select
                          options={customerPets.map((pet) => ({
                            value: pet.petId,
                            label: pet.name,
                          }))}
                          onChange={(option) => setSelectedPetId(option.value)}
                          isSearchable
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Date</label>
                        <input
                          type="date"
                          name="date"
                          className="form-control"
                          value={date}
                          min={getTodayDate()}
                          onChange={handleDateChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label" htmlFor="select-doctor">
                          Select Doctor
                        </label>
                        <select
                          className="form-select form-control"
                          id="select-doctor"
                          value={selectedDoctorId}
                          onChange={(e) => setSelectedDoctorId(e.target.value)}
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
                        <label className="form-label">Schedule</label>
                        <select
                          className="form-select form-control"
                          value={selectedSchedule}
                          onChange={(e) => setSelectedSchedule(e.target.value)}
                        >
                          <option
                            value=""
                            disabled
                            style={{ textAlign: "center" }}
                          >
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
                              {new Date(schedule.endTime).toLocaleTimeString()}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Services</label>
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
                    </div>

                    <div className="col-md-12">
                      <div className="mb-3">
                        <label className="form-label">Note</label>
                        <textarea
                          name="note"
                          className="form-control"
                          rows="3"
                          value={note}
                          onChange={(e) => setNote(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="mt-3" style={{ textAlign: "end" }}>
                      <label className="form-label">
                        Total Price: ${totalPrice}
                      </label>
                    </div>

                    <div className="col-md-12 text-end">
                      <button type="submit" className="btn btn-primary">
                        Add New Appointment
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
