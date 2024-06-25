import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div>
      {/* Sidebar */}
      <nav id="sidebar" className="sidebar-wrapper">
        <div
          className="sidebar-content"
          data-simplebar
          style={{ height: "calc(100% - 60px)" }}
        >
          <div className="sidebar-brand">
            <a href="index.html">
              <img
                src="../assets/images/logo-dark.png"
                height="22"
                className="logo-light-mode"
                alt=""
              />
              <img
                src="../assets/images/logo-light.png"
                height="22"
                className="logo-dark-mode"
                alt=""
              />
              <span className="sidebar-colored">
                <img src="../assets/images/logo-light.png" height="22" alt="" />
              </span>
            </a>
          </div>
          <ul className="sidebar-menu">
            <li>
              <a href="index.html">
                <i className="uil uil-dashboard me-2 d-inline-block"></i>
                Dashboard
              </a>
            </li>
            <li>
              <Link to="/manage-appointment">
                <i className="uil uil-bookmark-full me-2 d-inline-block"></i>{" "}
                Manage Appointment
              </Link>
            </li>
            <li>
              <Link to="/manage-doctor">
                <i className="uil uil-stethoscope me-2 d-inline-block"></i>
                Manage Doctor
              </Link>
            </li>
            <li>
              <Link to="/manage-schedule">
                <i className="uil uil-schedule me-2 d-inline-block"></i> Manage
                Schedule
              </Link>
            </li>
            <li>
              <Link to="/manage-customer">
                <i className="uil uil-user me-2 d-inline-block"></i> Manage
                Customer
              </Link>
            </li>
            <li>
              <Link to="/manage-service">
                <i className="uil uil-server me-2 d-inline-block"></i> Manage
                Service
              </Link>
            </li>
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
    </div>
  );
}
