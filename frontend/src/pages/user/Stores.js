import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { getStores, rateStore } from "../../api/userApi";

function Stores() {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    loadStores();
  }, []);

  const loadStores = async () => {
    const res = await getStores();
    setStores(res.data);
  };

  const handleRating = async (store_id, rating) => {
    await rateStore({ store_id, rating: Number(rating) });
    loadStores();
  };

  return (
    <MainLayout>
      <h3>Browse Stores</h3>

      {stores.map((s) => (
        <div key={s.id} className="card p-3 mb-3 shadow-sm">
          <h5>{s.name}</h5>
          <p>{s.address}</p>

          <p>⭐ Avg Rating: {s.averageRating || 0}</p>

          <select
            className="form-select w-25"
            onChange={(e) => handleRating(s.id, e.target.value)}
          >
            <option>Rate Store</option>
            {[1,2,3,4,5].map(r => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </div>
      ))}
    </MainLayout>
  );
}

export default Stores;