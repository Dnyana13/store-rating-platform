import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { getStats } from "../../api/adminApi";

function AdminDashboard() {
  const [stats, setStats] = useState({});

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const res = await getStats();
    setStats(res);
  };

  return (
    <MainLayout>
      <h3 className="mb-4">Admin Dashboard</h3>

      <div className="row">
        <div className="col-md-4">
          <div className="card p-3">
            <h5>Total Users</h5>
            <h2>{stats.totalUsers}</h2>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3">
            <h5>Total Stores</h5>
            <h2>{stats.totalStores}</h2>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3">
            <h5>Total Ratings</h5>
            <h2>{stats.totalRatings}</h2>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default AdminDashboard;