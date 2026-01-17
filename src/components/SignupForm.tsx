import "../styles/Forms.css";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { signup } from "../services/AuthServices";
import { Link, useNavigate } from "react-router-dom";

export default function Signupform() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Username and Password are required",
      });
      return;
    }
    try {
      const data = await signup(username, password);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Signup Successful",
      });
      navigate("/");
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.error || error.message || "Sign Up Failed",
      });
    }
  };

  return (
    <div className="form-box">
      <form className="form" onSubmit={handleSubmit}>
        <span className="title">Sign up</span>
        <span className="subtitle text-white">
          Create a free account with your email.
        </span>

        <div className="form-container">
          <input
            type="text"
            className="input"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            className="input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit">Sign up</button>
      </form>

      <div className="form-section">
        <p>
          Have an account?
          <Link to="/">Log in</Link>
        </p>
      </div>
    </div>
  );
}
