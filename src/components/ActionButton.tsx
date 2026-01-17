import React from "react";
import { FaRoute } from "react-icons/fa6";
import { MdAddCircle } from "react-icons/md";
import { TiThMenu } from "react-icons/ti";
import { Link } from "react-router-dom";
import "../styles/ActionBtn.css"

export default function ActionButton() {
  return (
    <div className="dropdown" >
      <button
        className="btn btn-primary btn-lg rounded-circle action-btn"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        
      >
        <TiThMenu size={20} />
      </button>

      <ul className="dropdown-menu dropdown-menu-end text-center p-2">
        {/* <li>
          <Link to="/dashboard" className="dropdown-item d-flex align-items-center gap-2">
            <FaRoute size={20} /> Home
          </Link>
        </li> */}
        {/* <li>
          <Link to="/map" className="dropdown-item d-flex align-items-center gap-2">
            <FaRoute size={20} /> See Map
          </Link>
        </li> */}

        <li>
          <Link to="/createhabit" className="dropdown-item d-flex align-items-center gap-2">
            <MdAddCircle size={20} /> Add Habit
          </Link>
        </li>
      </ul>
    </div>
  );
}
