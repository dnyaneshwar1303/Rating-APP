import { useEffect, useState } from "react";
import API from "../../api/api";
import Navbar from "../../components/Navbar";
import StoreCard from "../../components/StoreCard";


export default function UserDashboard() {
const [stores, setStores] = useState([]);


useEffect(() => { fetchStores(); }, []);


const fetchStores = async () => {
try {
const res = await API.get("/user/stores");
setStores(res.data);
} catch (err) {
alert(err.response?.data?.message || 'Failed to fetch stores');
}
};


const handleRate = async (storeId, rating) => {
try {
await API.post("/user/stores/rate", { storeId, rating });
fetchStores();
} catch (err) {
alert(err.response?.data?.message || 'Failed to submit rating');
}
};


return (
<div>
<Navbar />
<h2>Stores</h2>
{stores.map(store => <StoreCard key={store.id} store={store} onRate={handleRate} />)}
</div>
);
}