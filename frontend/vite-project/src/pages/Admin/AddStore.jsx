import { useState } from "react";
import API from "../../api/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

export default function AddStore() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/admin/stores", { name, email, address }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Store added successfully");
      navigate("/admin/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add store");
    }
  };

  return (
    <div>
      <Navbar />
      <form onSubmit={handleSubmit}>
        <h2>Add New Store</h2>
        <input placeholder="Store Name" value={name} onChange={e => setName(e.target.value)} required />
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input placeholder="Address" value={address} onChange={e => setAddress(e.target.value)} required />
        <button type="submit">Add Store</button>
      </form>
    </div>
  );
}
