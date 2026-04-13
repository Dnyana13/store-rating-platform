import { useState } from "react";
import { loginUser } from "../api/authApi";
import { useNavigate, Link } from "react-router-dom";
import { saveAuth } from "../utils/auth";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "USER",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser(form);

      saveAuth(res.token, res.role || form.role);

      // Role-based navigation
      if (form.role === "ADMIN") navigate("/dashboard");
      else if (form.role === "OWNER") navigate("/dashboard");
      else navigate("/dashboard");

    } catch (err) {
      setError("Invalid credentials or role mismatch");
    }
  };

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center bg-light">
      <div className="card p-4 shadow" style={{ width: "350px" }}>
        <h4 className="text-center mb-3">Welcome to Store Rating App</h4>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <input name="email" className="form-control mb-3" placeholder="Email" onChange={handleChange} required />
          <input name="password" type="password" className="form-control mb-3" placeholder="Password" onChange={handleChange} required />

          <select name="role" className="form-select mb-3" value={form.role} onChange={handleChange}>
            <option value="USER">User</option>
            <option value="OWNER">Store Owner</option>
            <option value="ADMIN">Admin</option>
          </select>

          <button className="btn btn-primary w-100">Login</button>
        </form>

        <p className="text-center mt-3">
          No account? <Link to="/signup">Signup</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;