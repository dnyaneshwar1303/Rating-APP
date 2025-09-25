import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";


export default function Signup() {
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [address, setAddress] = useState("");
const navigate = useNavigate();


const handleSubmit = async (e) => {
e.preventDefault();
try {
await API.post("/user/signup", { name, email, password, address });
alert("Signup successful! Please login.");
navigate("/");
} catch (err) {
alert(err.response?.data?.message || 'Signup failed');
}
};


return (
<form onSubmit={handleSubmit} style={{padding: '20px'}}>
<h2>Signup</h2>
<input placeholder="Name" value={name} onChange={e => setName(e.target.value)} /><br />
<input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} /><br />
<input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} /><br />
<input placeholder="Address" value={address} onChange={e => setAddress(e.target.value)} /><br />
<button type="submit">Signup</button>
</form>
);
}