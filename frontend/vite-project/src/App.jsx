import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import UserDashboard from "./pages/NormalUser/UserDashboard";
import StoreOwnerDashboard from "./pages/StoreOwner/StoreOwnerDashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AddUser from "./pages/Admin/AddUser";
import AddStore from "./pages/Admin/AddStore";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/add-user" element={<AddUser />} />
        <Route path="/admin/add-store" element={<AddStore />} />
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/store-owner/dashboard" element={<StoreOwnerDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
