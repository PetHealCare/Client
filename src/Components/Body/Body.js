import React from "react";

export default function Body() {
  return (
    <div>
      {/* <!--start section--> */}
      <section className="section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-10">
              <div className="features-absolute bg-white shadow rounded overflow-hidden card-group">
                <div className="card border-0 bg-light p-4">
                  <i className="ri-heart-pulse-fill text-primary h2 mb-0"></i>
                  <h5 className="mt-1">Emergency Cases</h5>
                  <p className="text-muted mt-2">
                    This is required when, for example, the is not yet
                    available. Dummy text is also known as 'fill text'.
                  </p>
                  <a href="departments.html" className="text-primary">
                    Read More{" "}
                    <i className="ri-arrow-right-line align-middle"></i>
                  </a>
                </div>

                <div className="card border-0 p-4">
                  <i className="ri-dossier-fill text-primary h2 mb-0"></i>
                  <h5 className="mt-1">Doctors Timetable</h5>
                  <p className="text-muted mt-2">
                    This is required when, for example, the is not yet
                    available. Dummy text is also known as 'fill text'.
                  </p>
                  <a href="departments.html" className="text-primary">
                    Read More{" "}
                    <i className="ri-arrow-right-line align-middle"></i>
                  </a>
                </div>

                <div className="card border-0 bg-light p-4">
                  <i className="ri-time-fill text-primary h2 mb-0"></i>
                  <h5 className="mt-1">Opening Hours</h5>
                  <ul className="list-unstyled mt-2">
                    <li className="d-flex justify-content-between">
                      <p className="text-muted mb-0">Monday - Friday</p>
                      <p className="text-primary mb-0">8.00 - 20.00</p>
                    </li>
                    <li className="d-flex justify-content-between">
                      <p className="text-muted mb-0">Saturday</p>
                      <p className="text-primary mb-0">8.00 - 18.00</p>
                    </li>
                    <li className="d-flex justify-content-between">
                      <p className="text-muted mb-0">Sunday</p>
                      <p className="text-primary mb-0">8.00 - 14.00</p>
                    </li>
                  </ul>
                  <a href="departments.html" className="text-primary">
                    Read More{" "}
                    <i className="ri-arrow-right-line align-middle"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mt-100 mt-60">
          <div className="row align-items-center">
            <div className="col-lg-5 col-md-6">
              <div className="position-relative">
                <img
                  src="../assets/images/about/about-2.png"
                  className="img-fluid"
                  alt=""
                />
                <div className="play-icon">
                  <a
                    href="#!"
                    data-type="youtube"
                    data-id="yba7hPeTSjk"
                    className="play-btn lightbox video-play-icon"
                  >
                    <i className="mdi mdi-play text-primary rounded-circle shadow"></i>
                  </a>
                </div>
              </div>
            </div>

            <div className="col-lg-7 col-md-6 mt-4 mt-lg-0 pt- pt-lg-0">
              <div className="ms-lg-4">
                <div className="section-title">
                  <h4 className="title mb-4">About Our Treatments</h4>
                  <p className="text-muted para-desc">
                    Great doctor if you need your family member to get effective
                    immediate assistance, examination, emergency treatment or a
                    simple consultation. Thank you.
                  </p>
                  <p className="text-muted para-desc mb-0">
                    The most well-known dummy text is the 'Lorem Ipsum', which
                    is said to have originated in the 16th century. Lorem Ipsum
                    is composed in a pseudo-Latin language which more or less
                    corresponds to 'proper' Latin. It contains a series of real
                    Latin words.
                  </p>
                </div>

                <div className="mt-4">
                  <a href="aboutus.html" className="btn btn-primary">
                    Read More{" "}
                    <i className="ri-arrow-right-line align-middle"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mt-100 mt-60">
          <div className="row justify-content-center">
            <div className="col-12">
              <div className="section-title mb-4 pb-2 text-center">
                <span className="badge rounded-pill bg-soft-primary mb-3">
                  Departments
                </span>
                <h4 className="title mb-4">Our Medical Services</h4>
                <p className="text-muted mx-auto para-desc mb-0">
                  Great doctor if you need your family member to get effective
                  immediate assistance, emergency treatment or a simple
                  consultation.
                </p>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xl-3 col-md-4 col-12 mt-5">
              <div className="card features feature-primary border-0">
                <div className="icon text-center rounded-md">
                  <i className="ri-eye-fill h3 mb-0"></i>
                </div>
                <div className="card-body p-0 mt-3">
                  <a href="departments.html" className="title text-dark h5">
                    Eye Care
                  </a>
                  <p className="text-muted mt-3">
                    There is now an abundance of readable dummy texts required
                    purely to fill a space.
                  </p>
                  <a href="departments.html" className="link">
                    Read More{" "}
                    <i className="ri-arrow-right-line align-middle"></i>
                  </a>
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-md-4 col-12 mt-5">
              <div className="card features feature-primary border-0">
                <div className="icon text-center rounded-md">
                  <i className="ri-psychotherapy-fill h3 mb-0"></i>
                </div>
                <div className="card-body p-0 mt-3">
                  <a href="departments.html" className="title text-dark h5">
                    Psychotherapy
                  </a>
                  <p className="text-muted mt-3">
                    There is now an abundance of readable dummy texts required
                    purely to fill a space.
                  </p>
                  <a href="departments.html" className="link">
                    Read More{" "}
                    <i className="ri-arrow-right-line align-middle"></i>
                  </a>
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-md-4 col-12 mt-5">
              <div className="card features feature-primary border-0">
                <div className="icon text-center rounded-md">
                  <i className="ri-stethoscope-fill h3 mb-0"></i>
                </div>
                <div className="card-body p-0 mt-3">
                  <a href="departments.html" className="title text-dark h5">
                    Primary Care
                  </a>
                  <p className="text-muted mt-3">
                    There is now an abundance of readable dummy texts required
                    purely to fill a space.
                  </p>
                  <a href="departments.html" className="link">
                    Read More{" "}
                    <i className="ri-arrow-right-line align-middle"></i>
                  </a>
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-md-4 col-12 mt-5">
              <div className="card features feature-primary border-0">
                <div className="icon text-center rounded-md">
                  <i className="ri-capsule-fill h3 mb-0"></i>
                </div>
                <div className="card-body p-0 mt-3">
                  <a href="departments.html" className="title text-dark h5">
                    Dental Care
                  </a>
                  <p className="text-muted mt-3">
                    There is now an abundance of readable dummy texts required
                    purely to fill a space.
                  </p>
                  <a href="departments.html" className="link">
                    Read More{" "}
                    <i className="ri-arrow-right-line align-middle"></i>
                  </a>
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-md-4 col-12 mt-5">
              <div className="card features feature-primary border-0">
                <div className="icon text-center rounded-md">
                  <i className="ri-microscope-fill h3 mb-0"></i>
                </div>
                <div className="card-body p-0 mt-3">
                  <a href="departments.html" className="title text-dark h5">
                    Orthopedic
                  </a>
                  <p className="text-muted mt-3">
                    There is now an abundance of readable dummy texts required
                    purely to fill a space.
                  </p>
                  <a href="departments.html" className="link">
                    Read More{" "}
                    <i className="ri-arrow-right-line align-middle"></i>
                  </a>
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-md-4 col-12 mt-5">
              <div className="card features feature-primary border-0">
                <div className="icon text-center rounded-md">
                  <i className="ri-pulse-fill h3 mb-0"></i>
                </div>
                <div className="card-body p-0 mt-3">
                  <a href="departments.html" className="title text-dark h5">
                    Cardiology
                  </a>
                  <p className="text-muted mt-3">
                    There is now an abundance of readable dummy texts required
                    purely to fill a space.
                  </p>
                  <a href="departments.html" className="link">
                    Read More{" "}
                    <i className="ri-arrow-right-line align-middle"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-4 col-12 mt-5">
              <div className="card features feature-primary border-0">
                <div className="icon text-center rounded-md">
                  <i className="ri-empathize-fill h3 mb-0"></i>
                </div>
                <div className="card-body p-0 mt-3">
                  <a href="departments.html" className="title text-dark h5">
                    Gynecology
                  </a>
                  <p className="text-muted mt-3">
                    There is now an abundance of readable dummy texts required
                    purely to fill a space.
                  </p>
                  <a href="departments.html" className="link">
                    Read More{" "}
                    <i className="ri-arrow-right-line align-middle"></i>
                  </a>
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-md-4 col-12 mt-5">
              <div className="card features feature-primary border-0">
                <div className="icon text-center rounded-md">
                  <i className="ri-mind-map h3 mb-0"></i>
                </div>
                <div className="card-body p-0 mt-3">
                  <a href="departments.html" className="title text-dark h5">
                    Neurology
                  </a>
                  <p className="text-muted mt-3">
                    There is now an abundance of readable dummy texts required
                    purely to fill a space.
                  </p>
                  <a href="departments.html" className="link">
                    Read More{" "}
                    <i className="ri-arrow-right-line align-middle"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!--end section--> */}
    </div>
  );
}
