import { useEffect, useState } from "react";
import API from "../services/api";

function OwnerDashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      const res = await API.get("/owner/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setData(res.data.data);
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <h2>Owner Dashboard</h2>

      {data.map((store, index) => (
        <div key={index} className="card p-3 m-2">
          <h4>{store.storeName}</h4>
          <p>Avg Rating: {store.averageRating}</p>
          <p>Total Ratings: {store.totalRatings}</p>
        </div>
      ))}
    </div>
  );
}

export default OwnerDashboard;