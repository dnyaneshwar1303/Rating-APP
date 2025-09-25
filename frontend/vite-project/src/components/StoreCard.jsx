export default function StoreCard({ store, onRate }) {
const handleRate = () => {
const rating = prompt("Enter rating (1-5):", store.userRating || 1);
if (rating >= 1 && rating <= 5) onRate(store.id, Number(rating));
};


return (
<div style={{border: '1px solid #ccc', margin: '10px', padding: '10px'}}>
<h3>{store.name}</h3>
<p>{store.address}</p>
<p>Overall Rating: {store.overallRating}</p>
<p>Your Rating: {store.userRating || 'Not Rated'}</p>
<button onClick={handleRate}>Submit/Update Rating</button>
</div>
);
}