import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Login/Authen";
import { useNavigate } from "react-router-dom";

export default function TopHeader() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/signin"); // Redirect to sign-in page
  };

  return (
    <div>
      <div className="top-header">
        <div className="header-bar d-flex justify-content-between border-bottom">
          <div className="d-flex align-items-center">
            <a href="#" className="logo-icon">
              <img
                src="../assets/images/logo-icon.png"
                height="30"
                className="small"
                alt=""
              />
              <span className="big">
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
              </span>
            </a>
            <a
              id="close-sidebar"
              className="btn btn-icon btn-pills btn-soft-primary ms-2"
              href="#"
            >
              <i className="uil uil-bars"></i>
            </a>
            <div className="search-bar p-0 d-none d-lg-block ms-2">
              <div id="search" className="menu-search mb-0">
                <form
                  role="search"
                  method="get"
                  id="searchform"
                  className="searchform"
                >
                  <div>
                    <input
                      type="text"
                      className="form-control border rounded-pill"
                      name="s"
                      id="s"
                      placeholder="Search Keywords..."
                    />
                    <input type="submit" id="searchsubmit" value="Search" />
                  </div>
                </form>
              </div>
            </div>
          </div>

          <ul className="list-unstyled mb-0">
            <li className="list-inline-item mb-0 ms-1">
              <div className="dropdown dropdown-primary">
                <button
                  type="button"
                  className="btn btn-pills btn-soft-primary dropdown-toggle p-0"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <img
                    src="../assets/images/client/05.jpg"
                    className="avatar avatar-ex-small rounded-circle"
                    alt=""
                  />
                </button>
                <div
                  className="dropdown-menu dd-menu dropdown-menu-end shadow border-0 mt-3 py-3"
                  style={{ minWidth: "200px" }}
                >
                  <Link
                    className="dropdown-item text-dark"
                    to="/profile-doctor"
                  >
                    <span className="mb-0 d-inline-block me-1">
                      <i className="uil uil-setting align-middle h6"></i>
                    </span>{" "}
                    Profile Settings
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
          </ul>
        </div>
      </div>
    </div>
  );
}
