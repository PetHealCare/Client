import React from "react";

export default function ManageDoctor() {
    return (
        <div className="page-wrapper doctris-theme toggled">
            {/* Sidebar */}
            <nav id="sidebar" className="sidebar-wrapper">
                <div className="sidebar-content" data-simplebar style={{ height: "calc(100% - 60px)" }}>
                    <div className="sidebar-brand">
                        <a href="index.html">
                            <img src="../assets/images/logo-dark.png" height="22" className="logo-light-mode" alt=""/>
                            <img src="../assets/images/logo-light.png" height="22" className="logo-dark-mode" alt=""/>
                            <span className="sidebar-colored">
                                <img src="../assets/images/logo-light.png" height="22" alt=""/>
                            </span>
                        </a>
                    </div>
                    <ul className="sidebar-menu">
                        <li><a href="index.html"><i className="uil uil-dashboard me-2 d-inline-block"></i>Dashboard</a></li>
                        <li><a href="appointment.html"><i className="uil uil-stethoscope me-2 d-inline-block"></i>Appointment</a></li>
                        <li><a href="manage-doctor.html"><i className="uil uil-user me-2 d-inline-block"></i>Manage Doctor</a></li>
                        <li><a href="manage-pet.html"><i className="uil uil-wheelchair me-2 d-inline-block"></i>Manage Pet</a></li>
                        <li><a href="manage-booking.html"><i className="uil uil-apps me-2 d-inline-block"></i>Manage Booking</a></li>
                    </ul>
                </div>
                <ul className="sidebar-footer list-unstyled mb-0">
                    <li className="list-inline-item mb-0 ms-1">
                        <a href="#" className="btn btn-icon btn-pills btn-soft-primary">
                            <i className="uil uil-comment"></i>
                        </a>
                    </li>
                </ul>
            </nav>

            {/* Main Content */}
            <div className="page-content bg-light" style={{marginTop: "10px"}}>
            <div className="top-header">
                    <div className="header-bar d-flex justify-content-between border-bottom">
                        <div className="d-flex align-items-center">
                            <a href="#" className="logo-icon">
                                <img src="../assets/images/logo-icon.png" height="30" className="small" alt=""/>
                                <span className="big">
                                    <img src="../assets/images/logo-dark.png" height="22" className="logo-light-mode" alt=""/>
                                    <img src="../assets/images/logo-light.png" height="22" className="logo-dark-mode" alt=""/>
                                </span>
                            </a>
                            <a id="close-sidebar" className="btn btn-icon btn-pills btn-soft-primary ms-2" href="#">
                                <i className="uil uil-bars"></i>
                            </a>
                            <div className="search-bar p-0 d-none d-lg-block ms-2">
                                <div id="search" className="menu-search mb-0">
                                    <form role="search" method="get" id="searchform" className="searchform">
                                        <div>
                                            <input type="text" className="form-control border rounded-pill" name="s" id="s" placeholder="Search Keywords..."/>
                                            <input type="submit" id="searchsubmit" value="Search"/>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <ul className="list-unstyled mb-0">

                            <li className="list-inline-item mb-0 ms-1">
                                <div className="dropdown dropdown-primary">
                                    <button type="button" className="btn btn-pills btn-soft-primary dropdown-toggle p-0" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img src="../assets/images/doctors/01.jpg" className="avatar avatar-ex-small rounded-circle" alt=""/></button>
                                    <div className="dropdown-menu dd-menu dropdown-menu-end shadow border-0 mt-3 py-3" style={{minWidth: "200px"}}>
                                        <a className="dropdown-item d-flex align-items-center text-dark" href="profile.html">
                                            <img src="../assets/images/doctors/01.jpg" className="avatar avatar-md-sm rounded-circle border shadow" alt=""/>
                                            <div className="flex-1 ms-2">
                                                <span className="d-block mb-1">Calvin Carlo</span>
                                                <small className="text-muted">Orthopedic</small>
                                            </div>
                                        </a>
                                        <a className="dropdown-item text-dark" href="dr-profile.html"><span className="mb-0 d-inline-block me-1"><i className="uil uil-setting align-middle h6"></i></span> Profile Settings</a>
                                        <div className="dropdown-divider border-top"></div>
                                        <a className="dropdown-item text-dark" href="lock-screen.html"><span className="mb-0 d-inline-block me-1"><i className="uil uil-sign-out-alt align-middle h6"></i></span> Logout</a>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="layout-specing">
                    <div className="row">
                        <div className="col-xl-9 col-md-6">
                            <h5 className="mb-0">Doctors</h5>
                            <nav aria-label="breadcrumb" className="d-inline-block mt-2">
                                <ul className="breadcrumb breadcrumb-muted bg-transparent rounded mb-0 p-0">
                                    <li className="breadcrumb-item"><a href="index.html">Doctris</a></li>
                                    <li className="breadcrumb-item active" aria-current="page">Doctors</li>
                                </ul>
                            </nav>
                        </div>
                        <div className="col-xl-3 col-md-6 mt-4 mt-md-0 text-md-end">
                            <a href="add-doctor.html" className="btn btn-primary">Add New Doctor</a>
                        </div>
                    </div>
                    <div className="row row-cols-md-2 row-cols-lg-5">
                        {/* Doctor Cards */}
                        {[
                            { name: "Calvin Carlo", speciality: "Eye Care", image: "01.jpg" },
                            { name: "Cristino Murphy", speciality: "Gynecology", image: "02.jpg" },
                            { name: "Alia Reddy", speciality: "Psychotherapy", image: "03.jpg" },
                            { name: "Toni Kovar", speciality: "Orthopedic", image: "04.jpg" },
                            { name: "Jessica McFarlane", speciality: "Dentist", image: "05.jpg" },
                            { name: "Elsie Sherman", speciality: "Gastrologist", image: "06.jpg" },
                            { name: "Bertha Magers", speciality: "Urologist", image: "07.jpg" },
                            { name: "Louis Batey", speciality: "Neurologist", image: "08.jpg" },
                            { name: "Julie Rosario", speciality: "Psychotherapy", image: "09.jpg" },
                            { name: "Scott Guzman", speciality: "Nutritionists", image: "10.jpg" },
                        ].map((doctor, index) => (
                            <div className="col mt-4" key={index}>
                                <div className="card team border-0 rounded shadow overflow-hidden">
                                    <div className="team-img position-relative">
                                        <img src={`../assets/images/doctors/${doctor.image}`} className="img-fluid" alt=""/>
    
                                    </div>
                                    <div className="card-body content text-center">
                                        <a href="doctor-profile.html" className="title text-dark h5 d-block mb-0">{doctor.name}</a>
                                        <small className="text-muted speciality">{doctor.speciality}</small>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
 {/* Footer Start */}
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
            {/* Footer End */}
        </div>
    );
}
