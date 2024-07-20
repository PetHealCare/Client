import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../Components/Login/Authen";
import { BOOKING_API } from "../../apiEndpoint";
import { fetchWithAuth } from "../../utils/apiUtils";

const BillPage = () => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("");
  const [billDetails, setBillDetails] = useState(location.state || {});
  const [latestBookingId, setLatestBookingId] = useState(null);

  useEffect(() => {
    const fetchLatestBooking = async () => {
      try {
        const response = await fetchWithAuth(BOOKING_API.MASTER);
        if (response.ok) {
          const bookings = await response.json();
          if (Array.isArray(bookings) && bookings.length > 0) {
            const latestBooking = bookings[bookings.length - 1];
            setLatestBookingId(latestBooking.bookingId);
          } else {
            toast.error("No bookings found");
          }
        } else {
          const errorText = await response.text();
          toast.error("Error fetching bookings: " + errorText);
        }
      } catch (error) {
        toast.error("Error fetching bookings: " + error.message);
      }
    };

    fetchLatestBooking();
  }, []);

  const handleConfirmBill = async () => {
    if (!paymentMethod) {
      toast.error("Please select a payment method");
      return;
    }

    try {
      const billData = {
        ...billDetails,
        paymentMethod,
        insDate: new Date().toISOString(),
        bookingId: latestBookingId, // Include the latestBookingId
      };

      // Replace with your API endpoint for creating a bill
      const response = await fetch("/api/create-bill", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(billData),
      });

      if (response.ok) {
        toast.success("Bill created successfully!");
        navigate("/dashboard"); // Redirect to a dashboard or another page after success
      } else {
        const errorText = await response.text();
        toast.error("Error creating bill: " + errorText); // Display error message from backend
      }
    } catch (error) {
      toast.error("Error creating bill: " + error.message); // Display error message
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
          <div className="row">
            <div className="col-lg-8">
              <div className="card border-0 shadow rounded overflow-hidden">
                <div className="p-4">
                  <h5 className="mb-4">Payment Details</h5>
                  <form>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="payment-method">
                        Payment Method
                        <select
                          className="form-select form-control"
                          id="payment-method"
                          value={paymentMethod}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                        >
                          <option value="" disabled>
                            Select Payment Method
                          </option>
                          <option value="Cash">Cash</option>
                          <option value="Credit Card">Credit Card</option>
                        </select>
                      </label>
                      {/* <select
                        className="form-select form-control"
                        id="payment-method"
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      >
                        <option value="" disabled>
                          Select Payment Method
                        </option>
                        <option value="Cash">Cash</option>
                        <option value="Credit Card">Credit Card</option>
                      </select> */}
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Total Amount</label>
                      <p className="form-control-plaintext">
                        ${billDetails.totalAmount || 0}
                      </p>
                    </div>
                    <div className="d-grid">
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleConfirmBill}
                      >
                        Confirm Bill
                      </button>
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
