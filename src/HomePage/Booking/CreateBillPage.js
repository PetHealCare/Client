import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../Components/Login/Authen";
import {
  BILL_API,
  BOOKING_API,
  PAYMENT_API,
  PAYOS_API,
} from "../../apiEndpoint";

const BillPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [billDetails, setBillDetails] = useState({});
  const [bookingDetails, setBookingDetails] = useState(null);

  useEffect(() => {
    const fetchLatestBooking = async () => {
      try {
        const response = await fetch(BOOKING_API.MASTER);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Error fetching bookings");
        }

        console.log("Fetched data:", data);

        if (Array.isArray(data) && data.length > 0) {
          const latestBooking = data[data.length - 1];
          console.log("Latest booking from data:", latestBooking);

          if (latestBooking) {
            const bookingId = latestBooking.bookingId;
            console.log("Using bookingId:", bookingId);

            // Fetch booking details using the latest bookingId
            const bookingData = await fetchBookingDetails(bookingId);
            console.log("Received bookingData:", bookingData);

            if (bookingData) {
              setBookingDetails(bookingData);
            } else {
              // toast.error("No details found for the latest booking.");
            }
          }
        } else {
          toast.error("No bookings found.");
        }
      } catch (error) {
        console.error("Error fetching latest booking:", error);
        toast.error("Error fetching latest booking");
      }
    };

    fetchLatestBooking();
  }, []);

  const fetchBookingDetails = async (bookingId) => {
    try {
      console.log(("fetch detail", bookingId));
      const response = await fetch(`${BOOKING_API.MASTER}/${bookingId}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error fetching booking details");
      }

      console.log("Booking Details:", data);
      return data;
    } catch (error) {
      console.error("Error fetching booking details:", error);
      return null;
    }
  };

  const handleConfirmBill = async () => {
    try {
      const selectedServices = bookingDetails.services || [];

      // Calculate total amount from selected services
      const totalAmount = selectedServices.reduce(
        (sum, service) => sum + (service.price || 0), // Handle undefined price
        0
      );

      const billData = {
        ...billDetails,
        totalAmount: totalAmount,
        insDate: new Date().toISOString(),
        bookingId: bookingDetails.bookingId,
      };

      // Create bill
      const billResponse = await fetch(`${BILL_API.MASTER}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(billData),
      });

      if (!billResponse.ok) {
        const errorText = await billResponse.text();
        throw new Error(`Error creating bill: ${errorText}`);
      }

      const billResponseData = await billResponse.json();
      const createdBillId = billResponseData.billId;

      // Fetch the latest bills
      const latestBillResponse = await fetch(`${BILL_API.MASTER}`);
      if (!latestBillResponse.ok) {
        const errorText = await latestBillResponse.text();
        throw new Error(`Error fetching latest bill: ${errorText}`);
      }

      const bills = await latestBillResponse.json();
      const latestBill = bills[bills.length - 1];
      const latestBillId = latestBill.billId;

      console.log("latestBill: ", latestBillId);

      // Create payment
      const paymentData = {
        billId: createdBillId,
        amount: totalAmount,
        method: billDetails.paymentMethod || "Credit Card",
        status: "Pending",
      };

      console.log("paymentdata", paymentData);

      const paymentResponse = await fetch(`${PAYMENT_API.MASTER}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      });

      if (!paymentResponse.ok) {
        const errorText = await paymentResponse.text();
        throw new Error(`Error creating payment: ${errorText}`);
      }

      // Fetch the latest payments
      const latestPaymentResponse = await fetch(`${PAYMENT_API.MASTER}`);
      if (!latestPaymentResponse.ok) {
        const errorText = await latestPaymentResponse.text();
        throw new Error(`Error fetching latest payment: ${errorText}`);
      }

      const payments = await latestPaymentResponse.json();
      const latestPayment = payments[payments.length - 1];
      const latestPaymentId = latestPayment.paymentId;

      console.log("latestPaymentId: ", latestPaymentId);

      const paymentLinkResponse = await createPaymentLink(latestPaymentId);
      if (!paymentLinkResponse.ok) {
        const errorText = await paymentLinkResponse.text();
        throw new Error(`Failed to create payment link: ${errorText}`);
      }

      console.log("Payment link created");

      // Handle payment link response
      const paymentLinkData = await paymentLinkResponse.json();
      const paymentLink = paymentLinkData.url;

      // Redirect to the payment link
      window.location.href = paymentLink;

      toast.success(
        "The appointment is booked successfully! Redirecting to the payment page."
      );
    } catch (error) {
      toast.error("Error creating bill and payment: " + error.message);
    }
  };

  const createPaymentLink = async (paymentId) => {
    try {
      const response = await fetch(`${PAYOS_API.CREATE}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "*/*",
        },
        body: JSON.stringify({
          paymentId: paymentId,
          returnUrl: "http://localhost:3000",
          cancelUrl: "http://localhost:3000",
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to create payment link: ${errorText}`);
      }

      console.log("Payment link response:", response);

      return response;
    } catch (error) {
      console.error("Error creating payment link:", error.message);
      return null;
    }
  };

  const handleCancelBooking = async () => {
    if (!bookingDetails?.bookingId) {
      // toast.error("No booking to cancel");
      return;
    }

    try {
      const response = await fetch(
        `${BOOKING_API.MASTER}/${bookingDetails.bookingId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // toast.success("Booking cancelled successfully");
        navigate("/");
      } else {
        const errorText = await response.text();
        // toast.error("Error cancelling booking: " + errorText);
      }
    } catch (error) {
      // toast.error("Error cancelling booking: " + error.message);
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
                    <Link className="dropdown-item text-dark" to="/dashboard">
                      Dashboard
                    </Link>
                    <Link
                      className="dropdown-item text-dark"
                      to="/profile-settings"
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
                <h3 className="sub-title mb-4">Bill Details</h3>
                <p className="para-desc mx-auto text-muted">
                  Please review your bill details and confirm your payment
                  method.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card border-0 shadow rounded overflow-hidden">
                <div className="p-4">
                  <h5 className="mb-4">Payment Details</h5>
                  <form>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Pet</label>
                          <p className="form-control-plaintext">
                            {bookingDetails?.pet?.name || "N/A"}
                          </p>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Doctor</label>
                          <p className="form-control-plaintext">
                            {bookingDetails?.doctor?.fullName || "N/A"}
                          </p>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Date</label>
                          <p className="form-control-plaintext">
                            {formatDate(bookingDetails?.bookingDate) || "N/A"}
                          </p>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Time</label>
                          <p className="form-control-plaintext">
                            {formatTime(bookingDetails?.schedule.startTime) ||
                              "N/A"}{" "}
                            -{" "}
                            {formatTime(bookingDetails?.schedule.endTime) ||
                              "N/A"}
                          </p>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Service</label>
                          <p className="form-control-plaintext">
                            {bookingDetails?.services
                              ? bookingDetails.services
                                  .map((service) => service.serviceName)
                                  .join(", ")
                              : "N/A"}
                          </p>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Total Amount</label>
                          <p className="form-control-plaintext">
                            {bookingDetails?.services
                              ? bookingDetails.services
                                  .reduce(
                                    (sum, service) => sum + service.price,
                                    0
                                  )
                                  .toFixed(2)
                              : "0.00"}
                          </p>
                        </div>
                      </div>

                      <div className="d-flex justify-content-end mt-4">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={handleCancelBooking}
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          className="btn btn-primary me-2"
                          onClick={handleConfirmBill}
                        >
                          Confirm
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BillPage;

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

const formatTime = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours();
  return `${day}/${month}/${year} ${hours}:00`;
};
