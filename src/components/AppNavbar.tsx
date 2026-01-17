import React from "react";
import { CiLogout } from "react-icons/ci";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/AppNavbar.css";

export default function AppNavbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Navbar className="bg-custom px-2">
      {/* Left spacer */}
      <div className="flex-grow-1" />

      {/* Center brand */}
        <Navbar.Brand className="mx-auto fw-bold" onClick={()=>navigate("/dashboard")}>Habit Tracker</Navbar.Brand>

      {/* Right username dropdown */}
      <div className="flex-grow-1 text-end">
        {user ? (
          <div className="dropdown">
            <span
              role="button"
              className="fw-bold dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{ cursor: "pointer" }}
            >
              {user.username}
            </span>

            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <button
                  className="dropdown-item text-danger"
                  onClick={handleLogout}
                >
                  <div className="d-flex justify-content-space-evenely align-items-center">
                    <div className="ps-2">
                      <CiLogout size={25} />
                    </div>
                    <div>Log out</div>
                  </div>
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <span className="fw-bold">Guest</span>
        )}
      </div>
    </Navbar>
  );
}
