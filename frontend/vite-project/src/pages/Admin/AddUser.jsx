import { useState } from "react";
import API from "../../api/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

export default function AddUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("normal");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/admin/users", { name, email, address, password, role }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("User added successfully");
      navigate("/admin/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add user");
    }
  };

  return (
    <div>
      <Navbar />
      <form onSubmit={handleSubmit}>
        <h2>Add New User</h2>
        <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input placeholder="Address" value={address} onChange={e => setAddress(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <select value={role} onChange={e => setRole(e.target.value)}>
          <option value="normal">Normal User</option>
          <option value="admin">Admin</option>
          <option value="store_owner">Store Owner</option>
        </select>
        <button type="submit">Add User</button>
      </form>
    </div>
  );
}
