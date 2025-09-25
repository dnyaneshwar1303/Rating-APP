import { useNavigate } from "react-router-dom";


export default function Navbar() {
const navigate = useNavigate();
const logout = () => {
localStorage.removeItem("token");
localStorage.removeItem("role");
navigate("/");
};


return (
<nav style={{padding: '10px', borderBottom: '1px solid #ccc'}}>
<button onClick={logout}>Logout</button>
</nav>
);
}