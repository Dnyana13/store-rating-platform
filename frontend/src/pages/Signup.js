import { useState } from "react";
import { signupUser } from "../api/authApi";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    role: "USER",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (form.name.length < 20) return "Name must be at least 20 characters";
    if (form.password.length < 8) return "Password must be 8+ characters";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validate();
    if (validationError) return setError(validationError);

    try {
      await signupUser(form);
      alert("Signup successful");
      navigate("/");
    } catch (err) {
      setError("Signup failed");
    }
  };

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center bg-light">
      <div className="card p-4 shadow" style={{ width: "350px" }}>
        <h4 className="text-center mb-3">Create Account</h4>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <input name="name" className="form-control mb-2" placeholder="Full Name (min 20 chars)" onChange={handleChange} required />
          <input name="email" className="form-control mb-2" placeholder="Email" onChange={handleChange} required />
          <input name="password" type="password" className="form-control mb-2" placeholder="Password" onChange={handleChange} required />
          <input name="address" className="form-control mb-3" placeholder="Address" onChange={handleChange} required />

          <select name="role" className="form-select mb-3" value={form.role} onChange={handleChange}>
            <option value="USER">User</option>
            <option value="OWNER">Store Owner</option>
          </select>

          <button className="btn btn-success w-100">Signup</button>
        </form>

        <p className="text-center mt-3">
          Already have account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;