import React, { useState, useEffect } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { Link } from "react-router-dom";
import { DOCTOR_API } from "../../apiEndpoint";

export default function AddDoctor() {
    const [doctors, setDoctors] = useState([]);
    const [selectedDate, setSelectedDate] = useState("Today");
    const [fullName, setFullName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [speciality, setSpeciality] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        try {
            const response = await fetch(DOCTOR_API.MASTER);
            const data = await response.json();
            setDoctors(data.data.items);
        } catch (error) {
            console.log("Error fetching appointments: ", error);
        }
    };

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const newDoctor = {
            fullName,
            phoneNumber,
            email,
            speciality,
            password
        };

        try {
            const response = await fetch(DOCTOR_API.MASTER, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newDoctor)
            });
            if (response.ok) {
                const data = await response.json();
                console.log("Doctor created successfully:", data);
                // Optionally, clear the form or redirect to another page
                setFullName("");
                setPhoneNumber("");
                setEmail("");
                setSpeciality("");
                setPassword("");
                fetchDoctors(); // Update the list of doctors
            } else {
                console.log("Error creating doctor:", response.statusText);
            }
        } catch (error) {
            console.log("Error creating doctor:", error);
        }
    };

    return (
        <div className="page-wrapper doctris-theme toggled">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="page-content bg-light" style={{ marginTop: "10px" }}>
                <div className="top-header">
                    <div className="header-bar d-flex justify-content-between border-bottom">
                        <div className="d-flex align-items-center">
                            <a href="#" className="logo-icon">
                                <img src="../assets/images/logo-icon.png" height="30" className="small" alt="" />
                                <span className="big">
                                    <img src="../assets/images/logo-dark.png" height="22" className="logo-light-mode" alt="" />
                                    <img src="../assets/images/logo-light.png" height="22" className="logo-dark-mode" alt="" />
                                </span>
                            </a>
                            <a id="close-sidebar" className="btn btn-icon btn-pills btn-soft-primary ms-2" href="#">
                                <i className="uil uil-bars"></i>
                            </a>
                            <div className="search-bar p-0 d-none d-lg-block ms-2">
                                <div id="search" className="menu-search mb-0">
                                    <form role="search" method="get" id="searchform" className="searchform">
                                        <div>
                                            <input type="text" className="form-control border rounded-pill" name="s" id="s" placeholder="Search Keywords..." />
                                            <input type="submit" id="searchsubmit" value="Search" />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <ul className="list-unstyled mb-0">
                            <li className="list-inline-item mb-0 ms-1">
                                <div className="dropdown dropdown-primary">
                                    <button type="button" className="btn btn-pills btn-soft-primary dropdown-toggle p-0" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <img src="../assets/images/doctors/01.jpg" className="avatar avatar-ex-small rounded-circle" alt="" />
                                    </button>
                                    <div className="dropdown-menu dd-menu dropdown-menu-end shadow border-0 mt-3 py-3" style={{ minWidth: "200px" }}>
                                        <a className="dropdown-item d-flex align-items-center text-dark" href="profile.html">
                                            <img src="../assets/images/doctors/01.jpg" className="avatar avatar-md-sm rounded-circle border shadow" alt="" />
                                            <div className="flex-1 ms-2">
                                                <span className="d-block mb-1">Calvin Carlo</span>
                                                <small className="text-muted">Orthopedic</small>
                                            </div>
                                        </a>
                                        <a className="dropdown-item text-dark" href="dr-profile.html">
                                            <span className="mb-0 d-inline-block me-1"><i className="uil uil-setting align-middle h6"></i></span> Profile Settings
                                        </a>
                                        <div className="dropdown-divider border-top"></div>
                                        <a className="dropdown-item text-dark" href="lock-screen.html">
                                            <span className="mb-0 d-inline-block me-1"><i className="uil uil-sign-out-alt align-middle h6"></i></span> Logout
                                        </a>
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
                        <input type="submit" id="submit" name="send" className="btn btn-primary" value="Add New Doctor" />
                        </div>
                        <h2>Add New Doctor</h2>
                        <div className="d-flex justify-content-center align-items-center" style={{ height: "40vh" }}>
                            <div className="rounded shadow mt-4">

                                <div className="p-4">
                                    <form onSubmit={handleFormSubmit}>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Full Name</label>
                                                    <input
                                                        name="fullName"
                                                        type="text"
                                                        className="form-control"
                                                        value={fullName}
                                                        onChange={(e) => setFullName(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            {/* <!--end col--> */}

                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Email</label>
                                                    <input
                                                        name="email"
                                                        type="email"
                                                        className="form-control"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            {/* <!--end col--> */}

                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Password</label>
                                                    <input
                                                        name="password"
                                                        type="password"
                                                        className="form-control"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            {/* <!--end col--> */}

                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Phone no.</label>
                                                    <input
                                                        name="phoneNumber"
                                                        type="text"
                                                        className="form-control"
                                                        value={phoneNumber}
                                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            {/* <!--end col--> */}

                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Speciality</label>
                                                    <input
                                                        name="speciality"
                                                        type="text"
                                                        className="form-control"
                                                        value={speciality}
                                                        onChange={(e) => setSpeciality(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            {/* <!--end col--> */}
                                        </div>
                                        {/* <!--end row--> */}

                                        {/* <!--end row--> */}
                                    </form>
                                    {/* <!--end form--> */}
                                </div>
                            </div>
                        </div>
                        {/* <!--end col--> */}
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
