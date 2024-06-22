import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Login/Authen";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/signin"); // Redirect to sign-in page
  };

  return (
    <div>
      <header id="topnav" className="navigation sticky">
        <div className="container">
          <div>
            <Link className="logo" to="/">
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
            </Link>
          </div>

          <ul className="dropdowns list-inline mb-0">
            {user ? (
              <li className="list-inline-item mb-0 ms-1">
                <div className="dropdown dropdown-primary">
                  <a
                    type="text"
                    className=""
                    href="#"
                    style={{ color: "white" }}
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Welcome, {user.fullName}
                  </a>
                  <div className="dropdown-menu dd-menu dropdown-menu-end shadow border-0 mt-3 py-3">
                    <Link
                      className="dropdown-item text-dark"
                      to="/profile-customer"
                    >
                      Profile Settings
                    </Link>
                    <Link
                      className="dropdown-item text-dark"
                      to="/customer-pet"
                    >
                      Dashboard Manage
                    </Link>
                    <div className="dropdown-divider border-top"></div>
                    <button
                      className="dropdown-item text-dark"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
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
                <Link to="/">Home</Link>
              </li>
              <li className="has-submenu parent-parent-menu-item">
                <Link to="/service">Services</Link>
              </li>
              <li className="has-submenu parent-parent-menu-item">
                <Link to="/booking">Book Appointment</Link>
              </li>
              <li className="has-submenu parent-parent-menu-item">
                <Link to="/blog">Blog</Link>
              </li>
              <li className="has-submenu parent-parent-menu-item">
                <Link to="/about">About</Link>
              </li>
            </ul>
          </div>
        </div>
      </header>
    </div>
  );
}
