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

  useEffect(() => {
    if (selectedDoctorId || date) {
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
      const response = await fetch(DOCTOR_API.MASTER);
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

  const fetchAvailableSchedules = async (doctorId, selectedDate) => {
    try {
      const response = await fetchWithAuth(
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
          const response = await fetchWithAuth(
            `${DOCTOR_API.MASTER}/${doctorId}`
          );
          const data = await response.json();
          return data.data;
        })
      );

      setDoctors(doctorsData);
    } catch (error) {
      console.error("Error fetching schedules:", error);
    }
  };

  const updateScheduleStatus = async (schedule) => {
    try {
      // Ensure `schedule` includes all required fields
      const response = await fetchWithAuth(`${SCHEDULE_API.MASTER}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          scheduleId: schedule.scheduleId,
          doctorId: schedule.doctorId,
          roomNo: schedule.roomNo,
          startTime: schedule.startTime,
          endTime: schedule.endTime,
          slotBooking: schedule.slotBooking,
          status: false,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Schedule status updated successfully:", result);
    } catch (error) {
      console.error("Error updating schedule status:", error);
      // toast.error("Error updating schedule status: " + error.message);
    }
  };

  const fetchLatestBooking = async () => {
    try {
      const response = await fetchWithAuth(BOOKING_API.MASTER);
      if (response.ok) {
        const bookings = await response.json();
        if (Array.isArray(bookings) && bookings.length > 0) {
          const latestBooking = bookings[bookings.length - 1];
          return latestBooking.bookingId;
        } else {
          //toast.error("No bookings found");
          return null;
        }
      } else {
        const errorText = await response.text();
        //toast.error("Error fetching bookings: " + errorText);
        console.error("Error response:", errorText);
        return null;
      }
    } catch (error) {
      //toast.error("Error fetching bookings: " + error.message);
      console.error("Fetch error:", error);
      return null;
    }
  };

  const fetchLatestBill = async () => {
    try {
      const response = await fetchWithAuth(BILL_API.MASTER);
      if (response.ok) {
        const bills = await response.json();
        console.log("payment latest: " + bills);
        if (Array.isArray(bills) && bills.length > 0) {
          const latestBill = bills[bills.length - 1];
          return latestBill.bookingId;
        } else {
          //toast.error("No bills found");
          return null;
        }
      } else {
        const errorText = await response.text();
        //toast.error("Error fetching bills: " + errorText);
        return null;
      }
    } catch (error) {
      //toast.error("Error fetching bills: " + error.message);
      return null;
    }
  };

  const fetchLatestPayment = async () => {
    try {
      const response = await fetchWithAuth(PAYMENT_API.MASTER);
      if (response.ok) {
        const payments = await response.json();
        console.log("payment latest: " + payments);
        if (Array.isArray(payments) && payments.length > 0) {
          const latestPayment = payments[payments.length - 1];
          return latestPayment.paymentId;
        } else {
          //toast.error("No payments found");
          return null;
        }
      } else {
        const errorText = await response.text();
        //toast.error("Error fetching payments: " + errorText);
        return null;
      }
    } catch (error) {
      //toast.error("Error fetching payments: " + error.message);
      return null;
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

      const response = await fetchWithAuth(BOOKING_API.CREATE_BOOKING_SERVICE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        toast.success("Booking successful!");

        await updateScheduleStatus(selectedSchedule);

        const latestBookingId = await fetchLatestBooking();
        if (!latestBookingId) return;

        // Create Bill
        const billData = {
          bookingId: latestBookingId,
          totalAmount: totalPrice,
          insDate: new Date().toISOString(),
        };

        const billResponse = await fetchWithAuth(BILL_API.MASTER, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(billData),
        });

        if (billResponse.ok) {
          const billResult = await billResponse.json();
          console.log("bill Result: ", billResult);
          const latestBillId = await fetchLatestBill();
          if (!latestBillId) return;

          // Create Payment
          const paymentData = {
            amount: totalPrice,
            method: "Credit Card",
            status: "Pending",
            billId: latestBillId,
          };
          console.log("Payment Data:", paymentData);

          const paymentResponse = await fetch(PAYMENT_API.MASTER, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(paymentData),
          });

          if (paymentResponse.ok) {
            const paymentResult = await paymentResponse.json();
            const latestPaymentId = await fetchLatestPayment();
            if (!latestPaymentId) return;

            // Generate Payment Link
            const paymentLinkData = {
              paymentId: latestPaymentId,
              returnUrl: window.location.origin + "/payment-success",
              cancelUrl: window.location.origin + "/payment-cancel",
            };

            const paymentLinkResponse = await fetch(
              `https://localhost:7083/create-payment-link`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(paymentLinkData),
              }
            );

            if (paymentLinkResponse.ok) {
              const paymentLinkResult = await paymentLinkResponse.json();
              console.log(
                "Payment link created successfully!",
                paymentLinkResult
              );
              window.location.href = paymentLinkResult.url; // Redirect to payment link
            } else {
              const errorText = await paymentLinkResponse.text();
              //toast.error("Error creating payment link: " + errorText);
            }
          } else {
            const errorText = await paymentResponse.text();
            //toast.error("Error creating payment: " + errorText);
          }
        } else {
          const errorText = await billResponse.text();
          //toast.error("Error creating bill: " + errorText);
        }
      } else {
        const errorText = await response.text();
        //toast.error("Error creating booking: " + errorText);
      }
    } catch (error) {
      //toast.error("Error creating booking: " + error.message);
    }
  };

  const handleServiceChange = (selectedOptions) => {
    if (selectedOptions.length > 5) {
      //toast.error("You can only select up to 5 services.");
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

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
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
                            <label className="form-label" htmlFor="input-date">
                              Date
                            </label>
                            <input
                              name="date"
                              type="date"
                              className="form-control"
                              id="input-date"
                              value={date}
                              min={getTodayDate()}
                              onChange={handleDateChange}
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
