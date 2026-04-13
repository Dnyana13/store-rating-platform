import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { getStores as getAdminStores, deleteStore } from "../../api/adminApi";

function Stores() {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    loadStores();
  }, []);

  const loadStores = async () => {
    const res = await getAdminStores();
    setStores(res.rows);
  };

  const handleDelete = async (id) => {
    await deleteStore(id);
    loadStores();
  };

  return (
    <MainLayout>
      <h3>Stores</h3>

      <table className="table mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {stores.map((s) => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>{s.address}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(s.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </MainLayout>
  );
}

export default Stores;