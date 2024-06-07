import React from "react";

export default function ManageAppointment() {
return(
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
            <main className="page-content bg-light">
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

                <div className="container-fluid">
                    <div className="layout-specing">
                        <div className="row">
                            <div className="col-xl-9 col-lg-6 col-md-4">
                                <h5 className="mb-0">Appointment</h5>
                                <nav aria-label="breadcrumb" className="d-inline-block mt-2">
                                    <ul className="breadcrumb breadcrumb-muted bg-transparent rounded mb-0 p-0">
                                        <li className="breadcrumb-item"><a href="index.html">Doctris</a></li>
                                        <li className="breadcrumb-item active" aria-current="page">Appointment</li>
                                    </ul>
                                </nav>
                            </div>
                            {/* <!--end col--> */}

                            <div className="col-xl-3 col-lg-6 col-md-8 mt-4 mt-md-0">
                                <div className="justify-content-md-end">
                                    <form>
                                        <div className="row justify-content-between align-items-center">
                                            <div className="col-sm-12 col-md-5">
                                                <div className="mb-0 position-relative">
                                                    <select className="form-select form-control">
                                                        <option value="EY">Today</option>
                                                        <option value="GY">Tomorrow</option>
                                                        <option value="PS">Yesterday</option>
                                                    </select>
                                                </div>
                                            </div>
                                            {/* <!--end col--> */}
                                            
                                            <div className="col-sm-12 col-md-7 mt-4 mt-sm-0">
                                                <div className="d-grid">
                                                    <a href="#" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#appointmentform">Appointment</a>
                                                </div>
                                            </div>
                                            {/* <!--end col--> */}
                                        </div>
                                        {/* <!--end row--> */}
                                    </form>
                                    {/* <!--end form--> */}
                                </div>
                            </div>
                            {/* <!--end col--> */}
                        </div>
                        {/* <!--end row--> */}
                        
                        <div className="row">
                            <div className="col-12 mt-4">
                                <div className="table-responsive bg-white shadow rounded">
                                    <table className="table mb-0 table-center">
                                        <thead>
                                            <tr>
                                                <th className="border-bottom p-3" style={{minWidth: "50px"}}>#</th>
                                                <th className="border-bottom p-3" style={{minWidth: "180px"}}>Name</th>
                                                <th className="border-bottom p-3" style={{minWidth: "150px"}}>Email</th>
                                                <th className="border-bottom p-3">Age</th>
                                                <th className="border-bottom p-3">Gender</th>
                                                <th className="border-bottom p-3">Department</th>
                                                <th className="border-bottom p-3" style={{minWidth: "150px"}}>Date</th>
                                                <th className="border-bottom p-3">Time</th>
                                                <th className="border-bottom p-3" style={{minWidth: "220px"}}>Doctor</th>
                                                <th className="border-bottom p-3">Fees</th>
                                                <th className="border-bottom p-3" style={{minWidth: "150px"}}></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th className="p-3">1</th>
                                                <td className="p-3">
                                                    <a href="#" className="text-dark">
                                                        <div className="d-flex align-items-center">
                                                            <img src="../assets/images/client/01.jpg" className="avatar avatar-md-sm rounded-circle shadow" alt=""/>
                                                            <span className="ms-2">Howard Tanner</span>
                                                        </div>
                                                    </a>
                                                </td>
                                                <td className="p-3">howard@contact.com</td>
                                                <td className="p-3">25</td>
                                                <td className="p-3">Male</td>
                                                <td className="p-3">Cardiology</td>
                                                <td className="p-3">20th Dec 2020</td>
                                                <td className="p-3">11:00AM</td>
                                                <td className="p-3">
                                                    <a href="#" className="text-dark">
                                                        <div className="d-flex align-items-center">
                                                            <img src="../assets/images/doctors/01.jpg" className="avatar avatar-md-sm rounded-circle border shadow" alt=""/>
                                                            <span className="ms-2">Dr. Calvin Carlo</span>
                                                        </div>
                                                    </a>
                                                </td>
                                                <td className="p-3">$50/Patient</td>
                                                <td className="text-end p-3">
                                                    <a href="#" className="btn btn-icon btn-pills btn-soft-primary" data-bs-toggle="modal" data-bs-target="#viewappointment"><i className="uil uil-eye"></i></a>
                                                    <a href="#" className="btn btn-icon btn-pills btn-soft-success" data-bs-toggle="modal" data-bs-target="#acceptappointment"><i className="uil uil-check-circle"></i></a>
                                                    <a href="#" className="btn btn-icon btn-pills btn-soft-danger" data-bs-toggle="modal" data-bs-target="#cancelappointment"><i className="uil uil-times-circle"></i></a>
                                                </td>
                                            </tr>
                                            
                                            <tr>
                                                <th className="p-3">2</th>
                                                <td className="p-3">
                                                    <a href="#" className="text-dark">
                                                        <div className="d-flex align-items-center">
                                                            <img src="../assets/images/client/02.jpg" className="avatar avatar-md-sm rounded-circle shadow" alt=""/>
                                                            <span className="ms-2">Wendy Filson</span>
                                                        </div>
                                                    </a>
                                                </td>
                                                <td className="p-3">wendy@contact.com</td>
                                                <td className="p-3">28</td>
                                                <td className="p-3">Female</td>
                                                <td className="p-3">Gynecology</td>
                                                <td className="p-3">20th Dec 2020</td>
                                                <td className="p-3">11:00AM</td>
                                                <td className="p-3">
                                                    <a href="#" className="text-dark">
                                                        <div className="d-flex align-items-center">
                                                            <img src="../assets/images/doctors/02.jpg" className="avatar avatar-md-sm rounded-circle border shadow" alt=""/>
                                                            <span className="ms-2">Dr. Cristino Murphy</span>
                                                        </div>
                                                    </a>
                                                </td>
                                                <td className="p-3">$50/Patient</td>
                                                <td className="text-end p-3">
                                                    <a href="#" className="btn btn-icon btn-pills btn-soft-primary" data-bs-toggle="modal" data-bs-target="#viewappointment"><i className="uil uil-eye"></i></a>
                                                    <a href="#" className="btn btn-icon btn-pills btn-soft-success" data-bs-toggle="modal" data-bs-target="#acceptappointment"><i className="uil uil-check-circle"></i></a>
                                                    <a href="#" className="btn btn-icon btn-pills btn-soft-danger" data-bs-toggle="modal" data-bs-target="#cancelappointment"><i className="uil uil-times-circle"></i></a>
                                                </td>
                                            </tr>
                                            
                                            <tr>
                                                <th className="p-3">3</th>
                                                <td className="p-3">
                                                    <a href="#" className="text-dark">
                                                        <div className="d-flex align-items-center">
                                                            <img src="../assets/images/client/03.jpg" className="avatar avatar-md-sm rounded-circle shadow" alt=""/>
                                                            <span className="ms-2">Faye Bridger</span>
                                                        </div>
                                                    </a>
                                                </td>
                                                <td className="p-3">faye@contact.com</td>
                                                <td className="p-3">28</td>
                                                <td className="p-3">Female</td>
                                                <td className="p-3">Psychotherapy</td>
                                                <td className="p-3">20th Dec 2020</td>
                                                <td className="p-3">11:00AM</td>
                                                <td className="p-3">
                                                    <a href="#" className="text-dark">
                                                        <div className="d-flex align-items-center">
                                                            <img src="../assets/images/doctors/03.jpg" className="avatar avatar-md-sm rounded-circle border shadow" alt=""/>
                                                            <span className="ms-2">Dr. Alia Reddy</span>
                                                        </div>
                                                    </a>
                                                </td>
                                                <td className="p-3">$50/Patient</td>
                                                <td className="text-end p-3">
                                                    <a href="#" className="btn btn-icon btn-pills btn-soft-primary" data-bs-toggle="modal" data-bs-target="#viewappointment"><i className="uil uil-eye"></i></a>
                                                    <a href="#" className="btn btn-icon btn-pills btn-soft-success" data-bs-toggle="modal" data-bs-target="#acceptappointment"><i className="uil uil-check-circle"></i></a>
                                                    <a href="#" className="btn btn-icon btn-pills btn-soft-danger" data-bs-toggle="modal" data-bs-target="#cancelappointment"><i className="uil uil-times-circle"></i></a>
                                                </td>
                                            </tr>
                                            
                                            <tr>
                                                <th className="p-3">4</th>
                                                <td className="p-3">
                                                    <a href="#" className="text-dark">
                                                        <div className="d-flex align-items-center">
                                                            <img src="../assets/images/client/04.jpg" className="avatar avatar-md-sm rounded-circle shadow" alt=""/>
                                                            <span className="ms-2">Ronald Curtis</span>
                                                        </div>
                                                    </a>
                                                </td>
                                                <td className="p-3">ronald@contact.com</td>
                                                <td className="p-3">25</td>
                                                <td className="p-3">Male</td>
                                                <td className="p-3">Orthopedic</td>
                                                <td className="p-3">20th Dec 2020</td>
                                                <td className="p-3">11:00AM</td>
                                                <td className="p-3">
                                                    <a href="#" className="text-dark">
                                                        <div className="d-flex align-items-center">
                                                            <img src="../assets/images/doctors/04.jpg" className="avatar avatar-md-sm rounded-circle border shadow" alt=""/>
                                                            <span className="ms-2">Dr. Toni Kovar</span>
                                                        </div>
                                                    </a>
                                                </td>
                                                <td className="p-3">$50/Patient</td>
                                                <td className="text-end p-3">
                                                    <a href="#" className="btn btn-icon btn-pills btn-soft-primary" data-bs-toggle="modal" data-bs-target="#viewappointment"><i className="uil uil-eye"></i></a>
                                                    <a href="#" className="btn btn-icon btn-pills btn-soft-success" data-bs-toggle="modal" data-bs-target="#acceptappointment"><i className="uil uil-check-circle"></i></a>
                                                    <a href="#" className="btn btn-icon btn-pills btn-soft-danger" data-bs-toggle="modal" data-bs-target="#cancelappointment"><i className="uil uil-times-circle"></i></a>
                                                </td>
                                            </tr>
                                            
                                            <tr>
                                                <th className="p-3">5</th>
                                                <td className="p-3">
                                                    <a href="#" className="text-dark">
                                                        <div className="d-flex align-items-center">
                                                            <img src="../assets/images/client/05.jpg" className="avatar avatar-md-sm rounded-circle shadow" alt=""/>
                                                            <span className="ms-2">Melissa Hibner</span>
                                                        </div>
                                                    </a>
                                                </td>
                                                <td className="p-3">melissa@contact.com</td>
                                                <td className="p-3">28</td>
                                                <td className="p-3">Female</td>
                                                <td className="p-3">Dental</td>
                                                <td className="p-3">20th Dec 2020</td>
                                                <td className="p-3">11:00AM</td>
                                                <td className="p-3">
                                                    <a href="#" className="text-dark">
                                                        <div className="d-flex align-items-center">
                                                            <img src="../assets/images/doctors/05.jpg" className="avatar avatar-md-sm rounded-circle border shadow" alt=""/>
                                                            <span className="ms-2">Dr. Jessica McFarlane</span>
                                                        </div>
                                                    </a>
                                                </td>
                                                <td className="p-3">$50/Patient</td>
                                                <td className="text-end p-3">
                                                    <a href="#" className="btn btn-icon btn-pills btn-soft-primary" data-bs-toggle="modal" data-bs-target="#viewappointment"><i className="uil uil-eye"></i></a>
                                                    <a href="#" className="btn btn-icon btn-pills btn-soft-success" data-bs-toggle="modal" data-bs-target="#acceptappointment"><i className="uil uil-check-circle"></i></a>
                                                    <a href="#" className="btn btn-icon btn-pills btn-soft-danger" data-bs-toggle="modal" data-bs-target="#cancelappointment"><i className="uil uil-times-circle"></i></a>
                                                </td>
                                            </tr>
                                            
                                            <tr>
                                                <th className="p-3">6</th>
                                                <td className="p-3">
                                                    <a href="#" className="text-dark">
                                                        <div className="d-flex align-items-center">
                                                            <img src="../assets/images/client/06.jpg" className="avatar avatar-md-sm rounded-circle shadow" alt=""/>
                                                            <span className="ms-2">Randall Case</span>
                                                        </div>
                                                    </a>
                                                </td>
                                                <td className="p-3">randall@contact.com</td>
                                                <td className="p-3">25</td>
                                                <td className="p-3">Male</td>
                                                <td className="p-3">Orthopedic</td>
                                                <td className="p-3">20th Dec 2020</td>
                                                <td className="p-3">11:00AM</td>
                                                <td className="p-3">
                                                    <a href="#" className="text-dark">
                                                        <div className="d-flex align-items-center">
                                                            <img src="../assets/images/doctors/04.jpg" className="avatar avatar-md-sm rounded-circle border shadow" alt=""/>
                                                            <span className="ms-2">Dr. Toni Kovar</span>
                                                        </div>
                                                    </a>
                                                </td>
                                                <td className="p-3">$50/Patient</td>
                                                <td className="text-end p-3">
                                                    <a href="#" className="btn btn-icon btn-pills btn-soft-primary" data-bs-toggle="modal" data-bs-target="#viewappointment"><i className="uil uil-eye"></i></a>
                                                    <a href="#" className="btn btn-icon btn-pills btn-soft-success" data-bs-toggle="modal" data-bs-target="#acceptappointment"><i className="uil uil-check-circle"></i></a>
                                                    <a href="#" className="btn btn-icon btn-pills btn-soft-danger" data-bs-toggle="modal" data-bs-target="#cancelappointment"><i className="uil uil-times-circle"></i></a>
                                                </td>
                                            </tr>

                                            <tr>
                                                <th className="p-3">7</th>
                                                <td className="p-3">
                                                    <a href="#" className="text-dark">
                                                        <div className="d-flex align-items-center">
                                                            <img src="../assets/images/client/07.jpg" className="avatar avatar-md-sm rounded-circle shadow" alt=""/>
                                                            <span className="ms-2">Jerry Morena</span>
                                                        </div>
                                                    </a>
                                                </td>
                                                <td className="p-3">jerry@contact.com</td>
                                                <td className="p-3">25</td>
                                                <td className="p-3">Male</td>
                                                <td className="p-3">Dentist</td>
                                                <td className="p-3">20th Dec 2020</td>
                                                <td className="p-3">11:00AM</td>
                                                <td className="p-3">
                                                    <a href="#" className="text-dark">
                                                        <div className="d-flex align-items-center">
                                                            <img src="../assets/images/doctors/05.jpg" className="avatar avatar-md-sm rounded-circle border shadow" alt=""/>
                                                            <span className="ms-2">Dr. Jessica McFarlane</span>
                                                        </div>
                                                    </a>
                                                </td>
                                                <td className="p-3">$50/Patient</td>
                                                <td className="text-end p-3">
                                                    <a href="#" className="btn btn-icon btn-pills btn-soft-primary" data-bs-toggle="modal" data-bs-target="#viewappointment"><i className="uil uil-eye"></i></a>
                                                    <a href="#" className="btn btn-icon btn-pills btn-soft-success" data-bs-toggle="modal" data-bs-target="#acceptappointment"><i className="uil uil-check-circle"></i></a>
                                                    <a href="#" className="btn btn-icon btn-pills btn-soft-danger" data-bs-toggle="modal" data-bs-target="#cancelappointment"><i className="uil uil-times-circle"></i></a>
                                                </td>
                                            </tr>
                                            
                                            <tr>
                                                <th className="p-3">8</th>
                                                <td className="p-3">
                                                    <a href="#" className="text-dark">
                                                        <div className="d-flex align-items-center">
                                                            <img src="../assets/images/client/08.jpg" className="avatar avatar-md-sm rounded-circle shadow" alt=""/>
                                                            <span className="ms-2">Lester McNally</span>
                                                        </div>
                                                    </a>
                                                </td>
                                                <td className="p-3">jessica@contact.com</td>
                                                <td className="p-3">25</td>
                                                <td className="p-3">Male</td>
                                                <td className="p-3">Gastrology</td>
                                                <td className="p-3">20th Dec 2020</td>
                                                <td className="p-3">11:00AM</td>
                                                <td className="p-3">
                                                    <a href="#" className="text-dark">
                                                        <div className="d-flex align-items-center">
                                                            <img src="../assets/images/doctors/06.jpg" className="avatar avatar-md-sm rounded-circle border shadow" alt=""/>
                                                            <span className="ms-2">Dr. Elsie Sherman</span>
                                                        </div>
                                                    </a>
                                                </td>
                                                <td className="p-3">$50/Patient</td>
                                                <td className="text-end p-3">
                                                    <a href="#" className="btn btn-icon btn-pills btn-soft-primary" data-bs-toggle="modal" data-bs-target="#viewappointment"><i className="uil uil-eye"></i></a>
                                                    <a href="#" className="btn btn-icon btn-pills btn-soft-success" data-bs-toggle="modal" data-bs-target="#acceptappointment"><i className="uil uil-check-circle"></i></a>
                                                    <a href="#" className="btn btn-icon btn-pills btn-soft-danger" data-bs-toggle="modal" data-bs-target="#cancelappointment"><i className="uil uil-times-circle"></i></a>
                                                </td>
                                            </tr>
                                            
                                            <tr>
                                                <th className="p-3">9</th>
                                                <td className="p-3">
                                                    <a href="#" className="text-dark">
                                                        <div className="d-flex align-items-center">
                                                            <img src="../assets/images/client/09.jpg" className="avatar avatar-md-sm rounded-circle shadow" alt=""/>
                                                            <span className="ms-2">Christopher Burrell</span>
                                                        </div>
                                                    </a>
                                                </td>
                                                <td className="p-3">christopher@contact.com</td>
                                                <td className="p-3">28</td>
                                                <td className="p-3">Female</td>
                                                <td className="p-3">Urology</td>
                                                <td className="p-3">20th Dec 2020</td>
                                                <td className="p-3">11:00AM</td>
                                                <td className="p-3">
                                                    <a href="#" className="text-dark">
                                                        <div className="d-flex align-items-center">
                                                            <img src="../assets/images/doctors/07.jpg" className="avatar avatar-md-sm rounded-circle border shadow" alt=""/>
                                                            <span className="ms-2">Dr. Bertha Magers</span>
                                                        </div>
                                                    </a>
                                                </td>
                                                <td className="p-3">$50/Patient</td>
                                                <td className="text-end p-3">
                                                    <a href="#" className="btn btn-icon btn-pills btn-soft-primary" data-bs-toggle="modal" data-bs-target="#viewappointment"><i className="uil uil-eye"></i></a>
                                                    <a href="#" className="btn btn-icon btn-pills btn-soft-success" data-bs-toggle="modal" data-bs-target="#acceptappointment"><i className="uil uil-check-circle"></i></a>
                                                    <a href="#" className="btn btn-icon btn-pills btn-soft-danger" data-bs-toggle="modal" data-bs-target="#cancelappointment"><i className="uil uil-times-circle"></i></a>
                                                </td>
                                            </tr>
                                            
                                            <tr>
                                                <th className="p-3">10</th>
                                                <td className="p-3">
                                                    <a href="#" className="text-dark">
                                                        <div className="d-flex align-items-center">
                                                            <img src="../assets/images/client/10.jpg" className="avatar avatar-md-sm rounded-circle shadow" alt=""/>
                                                            <span className="ms-2">Mary Skeens</span>
                                                        </div>
                                                    </a>
                                                </td>
                                                <td className="p-3">mary@contact.com</td>
                                                <td className="p-3">28</td>
                                                <td className="p-3">Female</td>
                                                <td className="p-3">Neurology</td>
                                                <td className="p-3">20th Dec 2020</td>
                                                <td className="p-3">11:00AM</td>
                                                <td className="p-3">
                                                    <a href="#" className="text-dark">
                                                        <div className="d-flex align-items-center">
                                                            <img src="../assets/images/doctors/08.jpg" className="avatar avatar-md-sm rounded-circle border shadow" alt=""/>
                                                            <span className="ms-2">Dr. Louis Batey</span>
                                                        </div>
                                                    </a>
                                                </td>
                                                <td className="p-3">$50/Patient</td>
                                                <td className="text-end p-3">
                                                    <a href="#" className="btn btn-icon btn-pills btn-soft-primary" data-bs-toggle="modal" data-bs-target="#viewappointment"><i className="uil uil-eye"></i></a>
                                                    <a href="#" className="btn btn-icon btn-pills btn-soft-success" data-bs-toggle="modal" data-bs-target="#acceptappointment"><i className="uil uil-check-circle"></i></a>
                                                    <a href="#" className="btn btn-icon btn-pills btn-soft-danger" data-bs-toggle="modal" data-bs-target="#cancelappointment"><i className="uil uil-times-circle"></i></a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        {/* <!--end row--> */}
                        

                        <div className="row text-center">
                            {/* <!-- PAGINATION START --> */}
                            <div className="col-12 mt-4">
                                <div className="d-md-flex align-items-center text-center justify-content-between">
                                    <span className="text-muted me-3">Showing 1 - 10 out of 50</span>
                                    <ul className="pagination justify-content-center mb-0 mt-3 mt-sm-0">
                                        <li className="page-item"><a className="page-link" href="javascript:void(0)" aria-label="Previous">Prev</a></li>
                                        <li className="page-item active"><a className="page-link" href="javascript:void(0)">1</a></li>
                                        <li className="page-item"><a className="page-link" href="javascript:void(0)">2</a></li>
                                        <li className="page-item"><a className="page-link" href="javascript:void(0)">3</a></li>
                                        <li className="page-item"><a className="page-link" href="javascript:void(0)" aria-label="Next">Next</a></li>
                                    </ul>
                                </div>
                            </div>
                            {/* <!--end col--> */}
                            
                            {/* <!-- PAGINATION END --> */}
                        </div>
                        {/* <!--end row--> */}
                    </div>
                </div>
                {/* <!--end container--> */}

            </main>
            {/* <!--End page-content" --> */}
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