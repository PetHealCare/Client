import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { Link } from "react-router-dom";

export default function Blog() {
  return (
    <div>
      {/* <!-- Navbar STart --> */}
      <Navbar />
      {/* <!-- Navbar End --> */}
      {/* <!-- Start Hero --> */}
      <section
        className="bg-half-170 d-table w-100"
        style={{
          background: "url('../assets/images/blog/blogPet.png') center center",
        }}
      >
        <div className="bg-overlay bg-overlay-dark"></div>
        <div className="container">
          <div className="row mt-5 justify-content-center">
            <div className="col-12">
              <div className="section-title text-center">
                <h3 className="sub-title mb-4 text-white title-dark">
                  Blogs & News
                </h3>
                <p className="para-desc mx-auto text-white-50">
                  At PetHealthCare, we're excited to bring you the latest
                  updates, informative articles, and heartwarming stories about
                  pet care, health, and happiness. Whether you're a dedicated
                  pet parent, an animal lover, or simply curious about the world
                  of pets, you'll find something of interest here.
                </p>

                <nav aria-label="breadcrumb" className="d-inline-block mt-3">
                  <ul className="breadcrumb bg-light rounded mb-0 py-1 px-2">
                    <li className="breadcrumb-item">
                      <Link to="/">PetHealthCare</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Blogs
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
                  <ul className="list-unstyled mb-2">
                    <li className="list-inline-item text-muted small me-3">
                      <i className="uil uil-calendar-alt text-dark h6 me-1"></i>
                      30th May, 2024
                    </li>
                    <li className="list-inline-item text-muted small">
                      <i className="uil uil-clock text-dark h6 me-1"></i>5 min
                      read
                    </li>
                  </ul>
                  <a href="blog-detail.html" className="text-dark title h5">
                    Veterinary x-ray for Pet
                  </a>
                  <p style={{ textAlign: "start" }}>
                    Veterinary X-rays are essential diagnostic tools that help
                    in visualizing the internal structures of your pet's body,
                    such as bones, joints, and internal organs.
                  </p>
                  <div className="post-meta d-flex justify-content-between mt-3">
                    <ul className="list-unstyled mb-0">
                      <li className="list-inline-item me-2 mb-0">
                        <a href="#" className="text-muted like">
                          <i className="mdi mdi-heart-outline me-1"></i>33
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a href="#" className="text-muted comments">
                          <i className="mdi mdi-comment-outline me-1"></i>08
                        </a>
                      </li>
                    </ul>
                    <a href="blog-detail.html" className="link">
                      Read More{" "}
                      <i className="mdi mdi-chevron-right align-middle"></i>
                    </a>
                  </div>
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
                  <ul className="list-unstyled mb-2">
                    <li className="list-inline-item text-muted small me-3">
                      <i className="uil uil-calendar-alt text-dark h6 me-1"></i>
                      30th May, 2024
                    </li>
                    <li className="list-inline-item text-muted small">
                      <i className="uil uil-clock text-dark h6 me-1"></i>5 min
                      read
                    </li>
                  </ul>
                  <a href="blog-detail.html" className="text-dark title h5">
                    Protect and effective vaccinations
                  </a>
                  <p style={{ textAlign: "start" }}>
                    Vaccinations play a crucial role in safeguarding your pet's
                    health by preventing a wide range of infectious diseases.
                    Ensuring your pet stays healthy and active.
                  </p>
                  <div className="post-meta d-flex justify-content-between mt-3">
                    <ul className="list-unstyled mb-0">
                      <li className="list-inline-item me-2 mb-0">
                        <a href="#" className="text-muted like">
                          <i className="mdi mdi-heart-outline me-1"></i>21
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a href="#" className="text-muted comments">
                          <i className="mdi mdi-comment-outline me-1"></i>08
                        </a>
                      </li>
                    </ul>
                    <a href="blog-detail.html" className="link">
                      Read More{" "}
                      <i className="mdi mdi-chevron-right align-middle"></i>
                    </a>
                  </div>
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
                  <ul className="list-unstyled mb-2">
                    <li className="list-inline-item text-muted small me-3">
                      <i className="uil uil-calendar-alt text-dark h6 me-1"></i>
                      20th November, 2020
                    </li>
                    <li className="list-inline-item text-muted small">
                      <i className="uil uil-clock text-dark h6 me-1"></i>5 min
                      read
                    </li>
                  </ul>
                  <a href="blog-detail.html" className="text-dark title h5">
                    Health check-ups and treatment
                  </a>
                  <p style={{ textAlign: "start" }}>
                    Regular health check-ups are vital for the early detection
                    and prevention of potential health issues in pets. Our
                    thorough examination process ensures.
                  </p>
                  <div className="post-meta d-flex justify-content-between mt-3">
                    <ul className="list-unstyled mb-0">
                      <li className="list-inline-item me-2 mb-0">
                        <a href="#" className="text-muted like">
                          <i className="mdi mdi-heart-outline me-1"></i>33
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a href="#" className="text-muted comments">
                          <i className="mdi mdi-comment-outline me-1"></i>08
                        </a>
                      </li>
                    </ul>
                    <a href="blog-detail.html" className="link">
                      Read More{" "}
                      <i className="mdi mdi-chevron-right align-middle"></i>
                    </a>
                  </div>
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
                  <ul className="list-unstyled mb-2">
                    <li className="list-inline-item text-muted small me-3">
                      <i className="uil uil-calendar-alt text-dark h6 me-1"></i>
                      20th November, 2020
                    </li>
                    <li className="list-inline-item text-muted small">
                      <i className="uil uil-clock text-dark h6 me-1"></i>5 min
                      read
                    </li>
                  </ul>
                  <a href="blog-detail.html" className="text-dark title h5">
                    Blood testing
                  </a>
                  <p style={{ textAlign: "start" }}>
                    Blood testing is an essential tool in veterinary
                    diagnostics, providing crucial insights into your pet's
                    overall health. It helps in identifying underlying.
                  </p>
                  <div className="post-meta d-flex justify-content-between mt-3">
                    <ul className="list-unstyled mb-0">
                      <li className="list-inline-item me-2 mb-0">
                        <a href="#" className="text-muted like">
                          <i className="mdi mdi-heart-outline me-1"></i>33
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a href="#" className="text-muted comments">
                          <i className="mdi mdi-comment-outline me-1"></i>08
                        </a>
                      </li>
                    </ul>
                    <a href="blog-detail.html" className="link">
                      Read More{" "}
                      <i className="mdi mdi-chevron-right align-middle"></i>
                    </a>
                  </div>
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
                  <ul className="list-unstyled mb-2">
                    <li className="list-inline-item text-muted small me-3">
                      <i className="uil uil-calendar-alt text-dark h6 me-1"></i>
                      20th November, 2020
                    </li>
                    <li className="list-inline-item text-muted small">
                      <i className="uil uil-clock text-dark h6 me-1"></i>5 min
                      read
                    </li>
                  </ul>
                  <a href="blog-detail.html" className="text-dark title h5">
                    24/7 emergency care
                  </a>
                  <p style={{ textAlign: "start" }}>
                    Our 24/7 emergency care service ensures that your pets
                    receive immediate and expert medical attention at any time
                    of the day or night.
                  </p>
                  <div className="post-meta d-flex justify-content-between mt-3">
                    <ul className="list-unstyled mb-0">
                      <li className="list-inline-item me-2 mb-0">
                        <a href="#" className="text-muted like">
                          <i className="mdi mdi-heart-outline me-1"></i>33
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a href="#" className="text-muted comments">
                          <i className="mdi mdi-comment-outline me-1"></i>08
                        </a>
                      </li>
                    </ul>
                    <a href="blog-detail.html" className="link">
                      Read More{" "}
                      <i className="mdi mdi-chevron-right align-middle"></i>
                    </a>
                  </div>
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
                  <ul className="list-unstyled mb-2">
                    <li className="list-inline-item text-muted small me-3">
                      <i className="uil uil-calendar-alt text-dark h6 me-1"></i>
                      20th November, 2020
                    </li>
                    <li className="list-inline-item text-muted small">
                      <i className="uil uil-clock text-dark h6 me-1"></i>5 min
                      read
                    </li>
                  </ul>
                  <a href="blog-detail.html" className="text-dark title h5">
                    C-Section surgery
                  </a>
                  <p style={{ textAlign: "start" }}>
                    C-Section surgery, or cesarean section, is a vital procedure
                    for pets experiencing complications during labor. This
                    surgical intervention can save the lives of both.
                  </p>
                  <div className="post-meta d-flex justify-content-between mt-3">
                    <ul className="list-unstyled mb-0">
                      <li className="list-inline-item me-2 mb-0">
                        <a href="#" className="text-muted like">
                          <i className="mdi mdi-heart-outline me-1"></i>33
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a href="#" className="text-muted comments">
                          <i className="mdi mdi-comment-outline me-1"></i>08
                        </a>
                      </li>
                    </ul>
                    <a href="blog-detail.html" className="link">
                      Read More{" "}
                      <i className="mdi mdi-chevron-right align-middle"></i>
                    </a>
                  </div>
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
                  <ul className="list-unstyled mb-2">
                    <li className="list-inline-item text-muted small me-3">
                      <i className="uil uil-calendar-alt text-dark h6 me-1"></i>
                      20th November, 2020
                    </li>
                    <li className="list-inline-item text-muted small">
                      <i className="uil uil-clock text-dark h6 me-1"></i>5 min
                      read
                    </li>
                  </ul>
                  <a href="blog-detail.html" className="text-dark title h5">
                    Complex surgery
                  </a>
                  <p style={{ textAlign: "start" }}>
                    Complex surgeries are advanced procedures that address
                    severe or intricate medical conditions in pets. These
                    surgeries require a high level of expertise, specialized
                    equipment.
                  </p>
                  <div className="post-meta d-flex justify-content-between mt-3">
                    <ul className="list-unstyled mb-0">
                      <li className="list-inline-item me-2 mb-0">
                        <a href="#" className="text-muted like">
                          <i className="mdi mdi-heart-outline me-1"></i>33
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a href="#" className="text-muted comments">
                          <i className="mdi mdi-comment-outline me-1"></i>08
                        </a>
                      </li>
                    </ul>
                    <a href="blog-detail.html" className="link">
                      Read More{" "}
                      <i className="mdi mdi-chevron-right align-middle"></i>
                    </a>
                  </div>
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
                  <ul className="list-unstyled mb-2">
                    <li className="list-inline-item text-muted small me-3">
                      <i className="uil uil-calendar-alt text-dark h6 me-1"></i>
                      20th November, 2020
                    </li>
                    <li className="list-inline-item text-muted small">
                      <i className="uil uil-clock text-dark h6 me-1"></i>5 min
                      read
                    </li>
                  </ul>
                  <a href="blog-detail.html" className="text-dark title h5">
                    Medical boarding
                  </a>
                  <p style={{ textAlign: "start" }}>
                    Medical boarding provides a safe and comfortable environment
                    for pets requiring medical supervision while their owners
                    are away.
                  </p>
                  <div className="post-meta d-flex justify-content-between mt-3">
                    <ul className="list-unstyled mb-0">
                      <li className="list-inline-item me-2 mb-0">
                        <a href="#" className="text-muted like">
                          <i className="mdi mdi-heart-outline me-1"></i>33
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a href="#" className="text-muted comments">
                          <i className="mdi mdi-comment-outline me-1"></i>08
                        </a>
                      </li>
                    </ul>
                    <a href="blog-detail.html" className="link">
                      Read More{" "}
                      <i className="mdi mdi-chevron-right align-middle"></i>
                    </a>
                  </div>
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
                  <ul className="list-unstyled mb-2">
                    <li className="list-inline-item text-muted small me-3">
                      <i className="uil uil-calendar-alt text-dark h6 me-1"></i>
                      20th November, 2020
                    </li>
                    <li className="list-inline-item text-muted small">
                      <i className="uil uil-clock text-dark h6 me-1"></i>5 min
                      read
                    </li>
                  </ul>
                  <a href="blog-detail.html" className="text-dark title h5">
                    Bone surgery
                  </a>
                  <p style={{ textAlign: "start" }}>
                    Bone surgery is a specialized service offered to address
                    fractures, deformities, and other bone-related conditions in
                    pets. Our veterinary team utilizes advanced.
                  </p>
                  <div className="post-meta d-flex justify-content-between mt-3">
                    <ul className="list-unstyled mb-0">
                      <li className="list-inline-item me-2 mb-0">
                        <a href="#" className="text-muted like">
                          <i className="mdi mdi-heart-outline me-1"></i>33
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a href="#" className="text-muted comments">
                          <i className="mdi mdi-comment-outline me-1"></i>08
                        </a>
                      </li>
                    </ul>
                    <a href="blog-detail.html" className="link">
                      Read More{" "}
                      <i className="mdi mdi-chevron-right align-middle"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/* <!--end col--> */}
          </div>
          {/* <!--end row--> */}

          <div className="row text-center">
            <div className="col-12">
              <ul className="pagination justify-content-center mb-0 list-unstyled">
                <li className="page-item">
                  <a
                    className="page-link"
                    href="javascript:void(0)"
                    aria-label="Previous"
                  >
                    Prev
                  </a>
                </li>
                <li className="page-item active">
                  <a className="page-link" href="javascript:void(0)">
                    1
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="javascript:void(0)">
                    2
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="javascript:void(0)">
                    3
                  </a>
                </li>
                <li className="page-item">
                  <a
                    className="page-link"
                    href="javascript:void(0)"
                    aria-label="Next"
                  >
                    Next
                  </a>
                </li>
              </ul>
              {/* <!--end pagination--> */}
            </div>
            {/* <!--end col--> */}
          </div>
          {/* <!--end row--> */}
        </div>
        {/* <!--end container--> */}
      </section>
      {/* <!--end section--> */}
      {/* <!-- End --> */}
    </div>
  );
}
