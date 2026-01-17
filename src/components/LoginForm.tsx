import { Link, useNavigate } from "react-router-dom";
import "../styles/Forms.css";
import { login } from "../services/AuthServices";
import Swal from "sweetalert2";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function LoginForm() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {login: setAuthUser}=useAuth()

  const handelLogin = async (e: React.FormEvent) => {
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
      const data = await login(username, password);
      Swal.fire({
        icon: "success",
        title: "Sucess",
        text: `Hello ${username}`,
      });
      setAuthUser(data.user)
      navigate("/dashboard");
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.error || error.message || "Login Failed",
      });
    }
  };



  return (
      <div className="form-box" onSubmit={handelLogin}>
        <form className="form">
          <span className="title">Login</span>

          <div className="form-container">
            <input
              type="text"
              className="input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
            />
            <input
              type="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>

          <button type="submit">Log in</button>
        </form>

        <div className="form-section">
          <p>
            Don't have an account?
            <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </div>
  );
}
