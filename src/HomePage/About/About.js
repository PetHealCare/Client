import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div>
      {/*Navbar Start*/}
      <Navbar />
      {/* <!-- Navbar End --> */}
      {/* <!-- Start Hero --> */}
      <section
        className="bg-half-170 d-table w-100"
        style={{
          background:
            "url('../assets/images/blog/petHealth.png') center center",
        }}
      >
        <div className="bg-overlay bg-overlay-dark"></div>
        <div className="container">
          <div className="row mt-5 justify-content-center">
            <div className="col-12">
              <div className="section-title text-center">
                <h3 className="sub-title mb-4 text-white title-dark">
                  About Us
                </h3>
                <p className="para-desc mx-auto text-white-50">
                  Welcome to PetHealthCare, where we believe that every pet
                  deserves the best care possible. Founded with a passion for
                  animals and a commitment to their well-being, our mission is
                  to provide compassionate and comprehensive veterinary services
                  tailored to meet the unique needs of each furry friend.
                </p>

                <nav aria-label="breadcrumb" className="d-inline-block mt-3">
                  <ul className="breadcrumb bg-light rounded mb-0 py-1 px-2">
                    <li className="breadcrumb-item">
                      <Link to="/">PetHealthCare</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      AboutUs
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
      {/*Navbar End*/}
      {/* <!-- Start --> */}
      <section class="section">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-lg-5 col-md-6">
              <div class="position-relative">
                <img
                  src="../assets/images/about/about-2.png"
                  class="img-fluid"
                  alt=""
                />
                <div class="play-icon">
                  <a
                    href="#!"
                    data-type="youtube"
                    data-id="yba7hPeTSjk"
                    class="play-btn lightbox video-play-icon"
                  >
                    <i class="mdi mdi-play text-primary rounded-circle shadow"></i>
                  </a>
                </div>
              </div>
            </div>

            <div class="col-lg-7 col-md-6 mt-4 mt-lg-0 pt- pt-lg-0">
              <div class="ms-lg-4">
                <div class="section-title me-lg-5">
                  <span class="badge rounded-pill bg-soft-primary">
                    About Doctris
                  </span>
                  <h4 class="title mt-3 mb-4">
                    Good Services And Better <br /> Health By Our Specialists
                  </h4>
                  <p class="para-desc text-muted">
                    Great doctor if you need your family member to get effective
                    immediate assistance, emergency treatment or a simple
                    consultation.
                  </p>
                  <p class="para-desc text-muted">
                    The most well-known dummy text is the 'Lorem Ipsum', which
                    is said to have originated in the 16th century. Lorem Ipsum
                    is composed in a pseudo-Latin language which more or less
                    corresponds to 'proper' Latin. It contains a series of real
                    Latin words.
                  </p>
                  <div class="mt-4">
                    <a href="javascript:void(0)" class="btn btn-soft-primary">
                      Read More
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/* <!--end col--> */}
          </div>
          {/* <!--end row--> */}
        </div>
        {/* <!--end container--> */}

        <div class="container mt-100 mt-60">
          <div class="row justify-content-center">
            <div class="col-12">
              <div class="section-title mb-4 pb-2 text-center">
                <span class="badge rounded-pill bg-soft-primary mb-3">
                  Departments
                </span>
                <h4 class="title mb-4">Our Medical Services</h4>
                <p class="text-muted mx-auto para-desc mb-0">
                  Great doctor if you need your family member to get effective
                  immediate assistance, emergency treatment or a simple
                  consultation.
                </p>
              </div>
            </div>
            {/* <!--end col--> */}
          </div>
          {/* <!--end row--> */}

          <div class="row">
            <div class="col-xl-3 col-md-4 col-12 mt-4 pt-2">
              <div class="card features feature-primary border-0">
                <div class="icon text-center rounded-md">
                  <i class="ri-eye-fill h3 mb-0"></i>
                </div>
                <div class="card-body p-0 mt-3">
                  <a href="#" class="title text-dark h5">
                    Eye Care
                  </a>
                  <p class="text-muted mt-3">
                    There is now an abundance of readable dummy texts required
                    purely to fill a space.
                  </p>
                  <a href="#" class="link">
                    Read More <i class="ri-arrow-right-line align-middle"></i>
                  </a>
                </div>
              </div>
            </div>
            {/* <!--end col--> */}

            <div class="col-xl-3 col-md-4 col-12 mt-4 pt-2">
              <div class="card features feature-primary border-0">
                <div class="icon text-center rounded-md">
                  <i class="ri-psychotherapy-fill h3 mb-0"></i>
                </div>
                <div class="card-body p-0 mt-3">
                  <a href="#" class="title text-dark h5">
                    Psychotherapy
                  </a>
                  <p class="text-muted mt-3">
                    There is now an abundance of readable dummy texts required
                    purely to fill a space.
                  </p>
                  <a href="#" class="link">
                    Read More <i class="ri-arrow-right-line align-middle"></i>
                  </a>
                </div>
              </div>
            </div>
            {/* <!--end col--> */}

            <div class="col-xl-3 col-md-4 col-12 mt-4 pt-2">
              <div class="card features feature-primary border-0">
                <div class="icon text-center rounded-md">
                  <i class="ri-stethoscope-fill h3 mb-0"></i>
                </div>
                <div class="card-body p-0 mt-3">
                  <a href="#" class="title text-dark h5">
                    Primary Care
                  </a>
                  <p class="text-muted mt-3">
                    There is now an abundance of readable dummy texts required
                    purely to fill a space.
                  </p>
                  <a href="#" class="link">
                    Read More <i class="ri-arrow-right-line align-middle"></i>
                  </a>
                </div>
              </div>
            </div>
            {/* <!--end col--> */}

            <div class="col-xl-3 col-md-4 col-12 mt-4 pt-2">
              <div class="card features feature-primary border-0">
                <div class="icon text-center rounded-md">
                  <i class="ri-capsule-fill h3 mb-0"></i>
                </div>
                <div class="card-body p-0 mt-3">
                  <a href="#" class="title text-dark h5">
                    Dental Care
                  </a>
                  <p class="text-muted mt-3">
                    There is now an abundance of readable dummy texts required
                    purely to fill a space.
                  </p>
                  <a href="#" class="link">
                    Read More <i class="ri-arrow-right-line align-middle"></i>
                  </a>
                </div>
              </div>
            </div>

            {/* <!--end col--> */}

            <div class="col-xl-3 col-md-4 col-12 mt-4 pt-2">
              <div class="card features feature-primary border-0">
                <div class="icon text-center rounded-md">
                  <i class="ri-microscope-fill h3 mb-0"></i>
                </div>
                <div class="card-body p-0 mt-3">
                  <a href="#" class="title text-dark h5">
                    Orthopedic
                  </a>
                  <p class="text-muted mt-3">
                    There is now an abundance of readable dummy texts required
                    purely to fill a space.
                  </p>
                  <a href="#" class="link">
                    Read More <i class="ri-arrow-right-line align-middle"></i>
                  </a>
                </div>
              </div>
            </div>
            {/* <!--end col--> */}

            <div class="col-xl-3 col-md-4 col-12 mt-4 pt-2">
              <div class="card features feature-primary border-0">
                <div class="icon text-center rounded-md">
                  <i class="ri-pulse-fill h3 mb-0"></i>
                </div>
                <div class="card-body p-0 mt-3">
                  <a href="#" class="title text-dark h5">
                    Cardiology
                  </a>
                  <p class="text-muted mt-3">
                    There is now an abundance of readable dummy texts required
                    purely to fill a space.
                  </p>
                  <a href="#" class="link">
                    Read More <i class="ri-arrow-right-line align-middle"></i>
                  </a>
                </div>
              </div>
            </div>
            {/* <!--end col--> */}

            <div class="col-xl-3 col-md-4 col-12 mt-4 pt-2">
              <div class="card features feature-primary border-0">
                <div class="icon text-center rounded-md">
                  <i class="ri-empathize-fill h3 mb-0"></i>
                </div>
                <div class="card-body p-0 mt-3">
                  <a href="#" class="title text-dark h5">
                    Gynecology
                  </a>
                  <p class="text-muted mt-3">
                    There is now an abundance of readable dummy texts required
                    purely to fill a space.
                  </p>
                  <a href="#" class="link">
                    Read More <i class="ri-arrow-right-line align-middle"></i>
                  </a>
                </div>
              </div>
            </div>
            {/* <!--end col--> */}

            <div class="col-xl-3 col-md-4 col-12 mt-4 pt-2">
              <div class="card features feature-primary border-0">
                <div class="icon text-center rounded-md">
                  <i class="ri-mind-map h3 mb-0"></i>
                </div>
                <div class="card-body p-0 mt-3">
                  <a href="#" class="title text-dark h5">
                    Neurology
                  </a>
                  <p class="text-muted mt-3">
                    There is now an abundance of readable dummy texts required
                    purely to fill a space.
                  </p>
                  <a href="#" class="link">
                    Read More <i class="ri-arrow-right-line align-middle"></i>
                  </a>
                </div>
              </div>
            </div>
            {/* <!--end col--> */}
          </div>
          {/* <!--end row--> */}
        </div>
        {/* <!--end container--> */}

        <div class="container mt-100 mt-60">
          <div class="row justify-content-center">
            <div class="col-12">
              <div class="section-title text-center mb-4 pb-2">
                <h4 class="title mb-4">Doctors</h4>
                <p class="text-muted mx-auto para-desc mb-0">
                  Great doctor if you need your family member to get effective
                  immediate assistance, emergency treatment or a simple
                  consultation.
                </p>
              </div>
            </div>
            {/* <!--end col--> */}
          </div>
          {/* <!--end row--> */}

          <div class="row align-items-center">
            <div class="col-xl-3 col-lg-3 col-md-6 mt-4 pt-2">
              <div class="card team border-0 rounded shadow overflow-hidden">
                <div class="team-img position-relative">
                  <img
                    src="../assets/images/doctors/01.jpg"
                    class="img-fluid"
                    alt=""
                  />
                  <ul class="list-unstyled team-social mb-0">
                    <li>
                      <a
                        href="#"
                        class="btn btn-icon btn-pills btn-soft-primary"
                      >
                        <i data-feather="facebook" class="icons"></i>
                      </a>
                    </li>
                    <li class="mt-2">
                      <a
                        href="#"
                        class="btn btn-icon btn-pills btn-soft-primary"
                      >
                        <i data-feather="linkedin" class="icons"></i>
                      </a>
                    </li>
                    <li class="mt-2">
                      <a
                        href="#"
                        class="btn btn-icon btn-pills btn-soft-primary"
                      >
                        <i data-feather="github" class="icons"></i>
                      </a>
                    </li>
                    <li class="mt-2">
                      <a
                        href="#"
                        class="btn btn-icon btn-pills btn-soft-primary"
                      >
                        <i data-feather="twitter" class="icons"></i>
                      </a>
                    </li>
                  </ul>
                </div>
                <div class="card-body content text-center">
                  <a href="#" class="title text-dark h5 d-block mb-0">
                    Calvin Carlo
                  </a>
                  <small class="text-muted speciality">Eye Care</small>
                </div>
              </div>
            </div>
            {/* <!--end col--> */}

            <div class="col-xl-3 col-lg-3 col-md-6 mt-4 pt-2">
              <div class="card team border-0 rounded shadow overflow-hidden">
                <div class="team-img position-relative">
                  <img
                    src="../assets/images/doctors/02.jpg"
                    class="img-fluid"
                    alt=""
                  />
                  <ul class="list-unstyled team-social mb-0">
                    <li>
                      <a
                        href="#"
                        class="btn btn-icon btn-pills btn-soft-primary"
                      >
                        <i data-feather="facebook" class="icons"></i>
                      </a>
                    </li>
                    <li class="mt-2">
                      <a
                        href="#"
                        class="btn btn-icon btn-pills btn-soft-primary"
                      >
                        <i data-feather="linkedin" class="icons"></i>
                      </a>
                    </li>
                    <li class="mt-2">
                      <a
                        href="#"
                        class="btn btn-icon btn-pills btn-soft-primary"
                      >
                        <i data-feather="github" class="icons"></i>
                      </a>
                    </li>
                    <li class="mt-2">
                      <a
                        href="#"
                        class="btn btn-icon btn-pills btn-soft-primary"
                      >
                        <i data-feather="twitter" class="icons"></i>
                      </a>
                    </li>
                  </ul>
                </div>
                <div class="card-body content text-center">
                  <a href="#" class="title text-dark h5 d-block mb-0">
                    Cristino Murphy
                  </a>
                  <small class="text-muted speciality">Gynecology</small>
                </div>
              </div>
            </div>
            {/* <!--end col--> */}

            <div class="col-xl-3 col-lg-3 col-md-6 mt-4 pt-2">
              <div class="card team border-0 rounded shadow overflow-hidden">
                <div class="team-img position-relative">
                  <img
                    src="../assets/images/doctors/03.jpg"
                    class="img-fluid"
                    alt=""
                  />
                  <ul class="list-unstyled team-social mb-0">
                    <li>
                      <a
                        href="#"
                        class="btn btn-icon btn-pills btn-soft-primary"
                      >
                        <i data-feather="facebook" class="icons"></i>
                      </a>
                    </li>
                    <li class="mt-2">
                      <a
                        href="#"
                        class="btn btn-icon btn-pills btn-soft-primary"
                      >
                        <i data-feather="linkedin" class="icons"></i>
                      </a>
                    </li>
                    <li class="mt-2">
                      <a
                        href="#"
                        class="btn btn-icon btn-pills btn-soft-primary"
                      >
                        <i data-feather="github" class="icons"></i>
                      </a>
                    </li>
                    <li class="mt-2">
                      <a
                        href="#"
                        class="btn btn-icon btn-pills btn-soft-primary"
                      >
                        <i data-feather="twitter" class="icons"></i>
                      </a>
                    </li>
                  </ul>
                </div>
                <div class="card-body content text-center">
                  <a href="#" class="title text-dark h5 d-block mb-0">
                    Alia Reddy
                  </a>
                  <small class="text-muted speciality">Psychotherapy</small>
                </div>
              </div>
            </div>

            <div class="col-xl-3 col-lg-3 col-md-6 mt-4 pt-2">
              <div class="card team border-0 rounded shadow overflow-hidden">
                <div class="team-img position-relative">
                  <img
                    src="../assets/images/doctors/04.jpg"
                    class="img-fluid"
                    alt=""
                  />
                  <ul class="list-unstyled team-social mb-0">
                    <li>
                      <a
                        href="#"
                        class="btn btn-icon btn-pills btn-soft-primary"
                      >
                        <i data-feather="facebook" class="icons"></i>
                      </a>
                    </li>
                    <li class="mt-2">
                      <a
                        href="#"
                        class="btn btn-icon btn-pills btn-soft-primary"
                      >
                        <i data-feather="linkedin" class="icons"></i>
                      </a>
                    </li>
                    <li class="mt-2">
                      <a
                        href="#"
                        class="btn btn-icon btn-pills btn-soft-primary"
                      >
                        <i data-feather="github" class="icons"></i>
                      </a>
                    </li>
                    <li class="mt-2">
                      <a
                        href="#"
                        class="btn btn-icon btn-pills btn-soft-primary"
                      >
                        <i data-feather="twitter" class="icons"></i>
                      </a>
                    </li>
                  </ul>
                </div>
                <div class="card-body content text-center">
                  <a href="#" class="title text-dark h5 d-block mb-0">
                    Toni Kovar
                  </a>
                  <small class="text-muted speciality">Orthopedic</small>
                </div>
              </div>
            </div>

            <div class="col-12 mt-4 pt-2 text-center">
              <a href="doctor-team-one.html" class="btn btn-primary">
                See More
              </a>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
