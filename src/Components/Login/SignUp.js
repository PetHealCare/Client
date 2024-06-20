import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AUTH_API, CUSTOMER_API } from "../../apiEndpoint";
export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    password: "",
    address: "",
    termsAccepted: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        'https://localhost:7083/api/Customer/Register',
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        console.log("Register Successfully");
        toast.success("Registered successfully!");
        setTimeout(() => navigate("/signin"), 1000);
      } else {
        console.log("Register Failure");
        toast.error("Registered Failure! Email already exists!");
      }
    } catch (err) {
      toast.error("Registered Failure!");
      console.log("Error: ", err);
    }
  };
  return (
    <div>
      <ToastContainer />
      <body>
        <div className="back-to-home rounded d-none d-sm-block">
          <Link to="/" className="btn btn-icon btn-primary">
            <i data-feather="home" className="icons"></i>
          </Link>
        </div>

        {/* <!-- Hero Start --> */}
        <section
          className="bg-half-150 d-table w-100 bg-light"
          style={{
            background: "url('../assets/images/bg/bg-lines-one.png') center",
          }}
        >
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-5 col-md-8">
                <img
                  src="../assets/images/logo-dark.png"
                  height="22"
                  className="mx-auto d-block"
                  alt=""
                />
                <div className="card login-page shadow mt-4 rounded border-0">
                  <div className="card-body">
                    <h4 className="text-center">Sign Up</h4>
                    <form onSubmit={handleSubmit} className="login-form mt-4">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="mb-3">
                            <label
                              className="form-label"
                              style={{ textAlign: "start", display: "block" }}
                            >
                              Full Name <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Full Name"
                              name="fullName"
                              value={formData.fullName}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="mb-3">
                            <label
                              className="form-label"
                              style={{ textAlign: "start", display: "block" }}
                            >
                              Phone Number{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              type="tel"
                              className="form-control"
                              placeholder="0901949239"
                              name="phoneNumber"
                              pattern="\d{10}"
                              maxLength="10"
                              value={formData.phoneNumber}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="mb-3">
                            <label
                              className="form-label"
                              style={{ textAlign: "start", display: "block" }}
                            >
                              Your Email <span className="text-danger">*</span>
                            </label>
                            <input
                              type="email"
                              className="form-control"
                              placeholder="Email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="mb-3">
                            <label
                              className="form-label"
                              style={{ textAlign: "start", display: "block" }}
                            >
                              Password <span className="text-danger">*</span>
                            </label>
                            <input
                              type="password"
                              className="form-control"
                              name="password"
                              value={formData.password}
                              onChange={handleChange}
                              placeholder="Password"
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="mb-3">
                            <label
                              className="form-label"
                              style={{ textAlign: "start", display: "block" }}
                            >
                              Address <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name="address"
                              value={formData.address}
                              onChange={handleChange}
                              placeholder="Address"
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="mb-3">
                            <div className="form-check">
                              <input
                                className="form-check-input align-middle"
                                type="checkbox"
                                name="termsAccepted"
                                checked={formData.checked}
                                onChange={handleChange}
                                value=""
                                id="accept-tnc-check"
                              />
                              <label
                                className="form-check-label"
                                for="accept-tnc-check"
                              >
                                I Accept{" "}
                                <a href="#" className="text-primary">
                                  Terms And Condition
                                </a>
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="d-grid">
                            <button className="btn btn-primary" type="submit">
                              Register
                            </button>
                          </div>
                        </div>

                        {/* <div className="col-lg-12 mt-3 text-center">
                                            <h6 className="text-muted">Or</h6>
                                        </div><!--end col-->
                                        
                                        <div className="col-6 mt-3">
                                            <div className="d-grid">
                                                <a href="javascript:void(0)" className="btn btn-soft-primary"><i className="uil uil-facebook"></i> Facebook</a>
                                            </div>
                                        </div>
                                        
                                        <div className="col-6 mt-3">
                                            <div className="d-grid">
                                                <a href="javascript:void(0)" className="btn btn-soft-primary"><i className="uil uil-google"></i> Google</a>
                                            </div>
                                        </div> */}

                        <div className="mx-auto">
                          <p className="mb-0 mt-3">
                            <small className="text-dark me-2">
                              Already have an account ?
                            </small>{" "}
                            <Link to="/signin" className="text-dark fw-bold">
                              Sign in
                            </Link>
                          </p>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- Hero End --> */}
      </body>
    </div>
  );
}
