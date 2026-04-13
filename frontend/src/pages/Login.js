import { useState } from "react";
import API from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      alert("Login Successful");

      // Redirect based on role after successful login
      if (res.data.role === "ADMIN") {
        window.location.href = "/admin";
      } else if (res.data.role === "OWNER") {
        window.location.href = "/owner";
      } else {
        window.location.href = "/user";
      }

    } catch (err) {
      alert("Login Failed");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <input className="form-control" placeholder="Email"
        onChange={(e) => setEmail(e.target.value)} />
      <br />
      <input className="form-control" type="password" placeholder="Password"
        onChange={(e) => setPassword(e.target.value)} />
      <br />
      <button className="btn btn-primary" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}

export default Login;