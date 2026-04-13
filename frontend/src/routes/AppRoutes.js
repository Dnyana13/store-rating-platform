import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import AdminDashboard from "../pages/admin/AdminDashboard";
import UserDashboard from "../pages/user/UserDashboard";
import OwnerDashboard from "../pages/owner/OwnerDashboard";
import Users from "../pages/admin/Users";
import Stores from "../pages/admin/Stores";
import UserStores from "../pages/user/Stores";
import { getRole } from "../utils/auth";

const AppRoutes = () => {
  const role = getRole();

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route
        path="/dashboard"
        element={
          role === "ADMIN"
            ? <AdminDashboard />
            : role === "OWNER"
            ? <OwnerDashboard />
            : <UserDashboard />
        }
      />

      <Route path="/users" element={<Users />} />
      <Route path="/admin/stores" element={<Stores />} />
      <Route path="/user/stores" element={<UserStores />} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;