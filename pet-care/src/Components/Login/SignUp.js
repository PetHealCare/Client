import React from "react";
import { Link } from "react-router-dom";
export default function SignUp() {
  return (
    <div>
      <body>
        <div className="back-to-home rounded d-none d-sm-block">
          <a href="index.html" className="btn btn-icon btn-primary">
            <i data-feather="home" className="icons"></i>
          </a>
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
                    <form
                      action="https://shreethemes.in/doctris/layouts/landing/doctor-dashboard.html"
                      className="login-form mt-4"
                    >
                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">
                              First name <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="First Name"
                              name="s"
                              required=""
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">
                              Last name <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Last Name"
                              name="s"
                              required=""
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="mb-3">
                            <label className="form-label">
                              Your Email <span className="text-danger">*</span>
                            </label>
                            <input
                              type="email"
                              className="form-control"
                              placeholder="Email"
                              name="email"
                              required=""
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="mb-3">
                            <label className="form-label">
                              Password <span className="text-danger">*</span>
                            </label>
                            <input
                              type="password"
                              className="form-control"
                              placeholder="Password"
                              required=""
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="mb-3">
                            <div className="form-check">
                              <input
                                className="form-check-input align-middle"
                                type="checkbox"
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
                            <button className="btn btn-primary">
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
