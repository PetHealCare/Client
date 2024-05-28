// src/Components/Navbar/Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Login/Authen";

export default function Navbar() {
  const { user } = useAuth();

  return (
    <div>
      <header id="topnav" className="navigation sticky">
        <div className="container">
          <div>
            <a className="logo" href="index.html">
              <span
                className="logo-light-mode"
                style={{ marginRight: "130px" }}
              >
                <img
                  src="../assets/images/logo-dark.png"
                  className="l-dark"
                  height="22"
                  alt=""
                />
                <img
                  src="../assets/images/logo-light.png"
                  className="l-light"
                  height="22"
                  alt=""
                />
              </span>
              <img
                src="../assets/images/logo-light.png"
                height="22"
                className="logo-dark-mode"
                alt=""
              />
            </a>
          </div>

          {/* <div className="menu-extras">
            <div className="menu-item">
              <a
                className="navbar-toggle"
                id="isToggle"
                onClick={() => toggleMenu()}
              >
                <div className="lines">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </a>
            </div>
          </div> */}

          <ul className="dropdowns list-inline mb-0">
            {user ? (
              <li className="list-inline-item mb-0 ms-1">
                <div className="dropdown dropdown-primary">
                  <a
                    type="text"
                    className=""
                    href=""
                    style={{ color: "white" }}
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Welcome, {user}
                  </a>
                  <div className="dropdown-menu dd-menu dropdown-menu-end shadow border-0 mt-3 py-3">
                    <a
                      className="dropdown-item text-dark"
                      href="doctor-dashboard.html"
                    >
                      Dashboard
                    </a>
                    <a
                      className="dropdown-item text-dark"
                      href="doctor-profile-setting.html"
                    >
                      Profile Settings
                    </a>
                    <div className="dropdown-divider border-top"></div>
                    <Link className="dropdown-item text-dark" to="/signin">
                      Logout
                    </Link>
                  </div>
                </div>
              </li>
            ) : (
              <Link to="/signin" className="btn btn-primary">
                Login
              </Link>
            )}
          </ul>

          <div id="navigation">
            <ul className="navigation-menu nav-left nav-light">
              <li className="has-submenu parent-parent-menu-item">
                <a href="index.html">Home</a>
              </li>
              <li className="has-submenu parent-parent-menu-item">
                <a href="">Services</a>
              </li>
              <li className="has-submenu parent-parent-menu-item">
                <a href="">Book Apointment</a>
              </li>
              <li className="has-submenu parent-parent-menu-item">
                <a href="">Blog</a>
              </li>
              <li className="has-submenu parent-parent-menu-item">
                <a href="">About</a>
              </li>
            </ul>
          </div>
        </div>
      </header>
    </div>
  );
}
