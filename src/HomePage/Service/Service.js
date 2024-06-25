import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { Link } from "react-router-dom";

export default function Service() {
  return (
    <div>
      {/* <!-- Navbar STart --> */}
      <Navbar />
      {/* <!-- Navbar End --> */}
      {/* <!-- Start Hero --> */}
      <section
        className="bg-half-170 d-table w-100"
        style={{
          background: "url('../assets/images/bg/02.png') center center",
        }}
      >
        <div className="bg-overlay bg-overlay-dark"></div>
        <div className="container">
          <div className="row mt-5 justify-content-center">
            <div className="col-12">
              <div className="section-title text-center">
                <h3 className="sub-title mb-4 text-white title-dark">
                  Services
                </h3>
                <p className="para-desc mx-auto text-white-50">
                  Your pet's well-being is our top priority. From emergencies to
                  routine check-ups, we're here to provide compassionate and
                  effective healthcare tailored to their needs.
                </p>

                <nav aria-label="breadcrumb" className="d-inline-block mt-3">
                  <ul className="breadcrumb bg-light rounded mb-0 py-1 px-2">
                    <li className="breadcrumb-item">
                      <Link to="/">PetHealthCare</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Services
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
      {/* <!-- End Hero --> */}

      {/* <!-- Start --> */}
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6 col-12 mb-4 pb-2">
              <div className="card blog blog-primary border-0 shadow rounded overflow-hidden">
                <img
                  src="../assets/images/blog/1.png"
                  className="img-fluid"
                  alt=""
                />
                <div className="card-body p-4">
                  <Link to="/booking" className="text-dark title h5">
                    Veterinary x-ray for Pet
                  </Link>
                </div>
              </div>
            </div>
            {/* <!--end col--> */}

            <div className="col-lg-4 col-md-6 col-12 mb-4 pb-2">
              <div className="card blog blog-primary border-0 shadow rounded overflow-hidden">
                <img
                  src="../assets/images/blog/2.png"
                  className="img-fluid"
                  alt=""
                />
                <div className="card-body p-4">
                  <Link to="/booking" className="text-dark title h5">
                    Protect and effective vaccinations
                  </Link>
                </div>
              </div>
            </div>
            {/* <!--end col--> */}

            <div className="col-lg-4 col-md-6 col-12 mb-4 pb-2">
              <div className="card blog blog-primary border-0 shadow rounded overflow-hidden">
                <img
                  src="../assets/images/blog/3.png"
                  className="img-fluid"
                  alt=""
                />
                <div className="card-body p-4">
                  <Link to="/booking" className="text-dark title h5">
                    Health check-ups and treatment
                  </Link>
                </div>
              </div>
            </div>
            {/* <!--end col--> */}

            <div className="col-lg-4 col-md-6 col-12 mb-4 pb-2">
              <div className="card blog blog-primary border-0 shadow rounded overflow-hidden">
                <img
                  src="../assets/images/blog/4.png"
                  className="img-fluid"
                  alt=""
                />
                <div className="card-body p-4">
                  <Link to="/booking" className="text-dark title h5">
                    Blood testing
                  </Link>
                </div>
              </div>
            </div>
            {/* <!--end col--> */}

            <div className="col-lg-4 col-md-6 col-12 mb-4 pb-2">
              <div className="card blog blog-primary border-0 shadow rounded overflow-hidden">
                <img
                  src="../assets/images/blog/5.png"
                  className="img-fluid"
                  alt=""
                />
                <div className="card-body p-4">
                  <Link to="/booking" className="text-dark title h5">
                    24/7 emergency care
                  </Link>
                </div>
              </div>
            </div>
            {/* <!--end col--> */}

            <div className="col-lg-4 col-md-6 col-12 mb-4 pb-2">
              <div className="card blog blog-primary border-0 shadow rounded overflow-hidden">
                <img
                  src="../assets/images/blog/06.jpg"
                  className="img-fluid"
                  alt=""
                />
                <div className="card-body p-4">
                  <Link to="/booking" className="text-dark title h5">
                    C-Section surgery
                  </Link>
                </div>
              </div>
            </div>
            {/* <!--end col--> */}

            <div className="col-lg-4 col-md-6 col-12 mb-4 pb-2">
              <div className="card blog blog-primary border-0 shadow rounded overflow-hidden">
                <img
                  src="../assets/images/blog/6.png"
                  className="img-fluid"
                  alt=""
                />
                <div className="card-body p-4">
                  <Link to="/booking" className="text-dark title h5">
                    Complex surgery
                  </Link>
                </div>
              </div>
            </div>
            {/* <!--end col--> */}

            <div className="col-lg-4 col-md-6 col-12 mb-4 pb-2">
              <div className="card blog blog-primary border-0 shadow rounded overflow-hidden">
                <img
                  src="../assets/images/blog/7.png"
                  className="img-fluid"
                  alt=""
                />
                <div className="card-body p-4">
                  <Link to="/booking" className="text-dark title h5">
                    Medical boarding
                  </Link>
                </div>
              </div>
            </div>
            {/* <!--end col--> */}

            <div className="col-lg-4 col-md-6 col-12 mb-4 pb-2">
              <div className="card blog blog-primary border-0 shadow rounded overflow-hidden">
                <img
                  src="../assets/images/blog/10.png"
                  className="img-fluid"
                  alt=""
                />
                <div className="card-body p-4">
                  <Link to="/booking" className="text-dark title h5">
                    Bone surgery
                  </Link>
                </div>
              </div>
            </div>
            {/* <!--end col--> */}
          </div>
          {/* <!--end row--> */}

          {/* <!--end row--> */}
        </div>
        {/* <!--end container--> */}
      </section>
      {/* <!--end section--> */}
      {/* <!-- End --> */}
    </div>
  );
}
