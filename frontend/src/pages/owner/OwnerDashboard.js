import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { getOwnerDashboard } from "../../api/ownerApi";

function OwnerDashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const res = await getOwnerDashboard();
    setData(res.data.data);
  };

  return (
    <MainLayout>
      <h3>Owner Dashboard</h3>

      {data.map((store, index) => (
        <div className="card p-3 mb-3" key={index}>
          <h5>{store.storeName}</h5>
          <p>{store.address}</p>

          <p>⭐ Avg: {store.averageRating}</p>
          <p>Total Ratings: {store.totalRatings}</p>

          <table className="table">
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Rating</th>
              </tr>
            </thead>

            <tbody>
              {store.users.map((u, i) => (
                <tr key={i}>
                  <td>{u.userName}</td>
                  <td>{u.email}</td>
                  <td>{u.rating}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </MainLayout>
  );
}

export default OwnerDashboard;