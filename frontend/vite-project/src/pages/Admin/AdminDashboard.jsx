import { useState, useEffect } from "react";
import API from "../../api/api";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchUsers();
    fetchStores();
  }, []);

  const fetchUsers = async () => {
    const res = await API.get("/admin/users", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUsers(res.data);
  };

  const fetchStores = async () => {
    const res = await API.get("/admin/stores", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setStores(res.data);
  };

  return (
    <div>
      <Navbar />
      <h2>Admin Dashboard</h2>

      {/* Buttons to Add User / Store */}
      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={() => navigate("/admin/add-user")}
          style={{
            marginRight: "10px",
            padding: "10px 15px",
            backgroundColor: "#3498db",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Add New User
        </button>
        <button
          onClick={() => navigate("/admin/add-store")}
          style={{
            padding: "10px 15px",
            backgroundColor: "#27ae60",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Add New Store
        </button>
      </div>

      {/* Users Table */}
      <h3>Users</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Address</th><th>Role</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.address}</td>
              <td>{u.role}</td>
              <td>
                <button onClick={() => deleteUser(u.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Stores Table */}
      <h3>Stores</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Address</th><th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {stores.map(s => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>{s.address}</td>
              <td>{s.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
