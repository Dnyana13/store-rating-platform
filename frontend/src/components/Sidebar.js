import { Link } from "react-router-dom";
import { getRole } from "../utils/auth";

function Sidebar() {
  const role = getRole();

  return (
    <div className="sidebar">
      <h4>Dashboard</h4>

      {role === "ADMIN" && (
        <>
          <Link to="/dashboard">Overview</Link>
          <Link to="/users">Users</Link>
          <Link to="/admin/stores">Stores</Link>
          <Link to="/user/stores">Browse Stores</Link>
        </>
      )}

      {role === "USER" && (
        <>
          <Link to="/dashboard">Home</Link>
          <Link to="/stores">Browse Stores</Link>
        </>
      )}

      {role === "OWNER" && (
        <>
          <Link to="/dashboard">Overview</Link>
        </>
      )}
    </div>
  );
}

export default Sidebar;