import { useEffect, useState } from "react";
import API from "../../api/api";
import Navbar from "../../components/Navbar";


export default function StoreOwnerDashboard() {
const [dashboard, setDashboard] = useState(null);


useEffect(() => { fetchDashboard(); }, []);


const fetchDashboard = async () => {
try {
const res = await API.get("/store-owner/dashboard");
setDashboard(res.data);
} catch (err) {
alert(err.response?.data?.message || 'Failed to fetch dashboard');
}
};


if (!dashboard) return <div><Navbar /><p>Loading...</p></div>;


return (
<div>
<Navbar />
<h2>{dashboard.storeName} Dashboard</h2>
<p>Average Rating: {dashboard.averageRating}</p>
<h3>User Ratings</h3>
<table border="1" cellPadding="5">
<thead>
<tr><th>User Name</th><th>Rating</th></tr>
</thead>
<tbody>
{dashboard.ratings.map((r, index) => (
<tr key={index}><td>{r.userName}</td><td>{r.rating}</td></tr>
))}
</tbody>
</table>
</div>
);
}