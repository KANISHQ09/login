import { useEffect, useState } from "react";
import BottomNavigation from "../components/BottomNavigation";

const ImageIcon = () => (
  <svg
    className="icon image-placeholder-icon"
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
    <circle cx="8.5" cy="8.5" r="1.5"></circle>
    <polyline points="21 15 16 10 5 21"></polyline>
  </svg>
);

const FeedItem = ({ fullName, location, createdAt, description, imageUrl }) => {
  const timeAgo = new Date(createdAt).toLocaleString();

  return (
    <div className="feed-item mb-6 pb-4 border-b border-gray-200 animate-fadeIn">
      <div className="feed-item-header flex items-center mb-2">
        <div className="profile-pic-placeholder w-10 h-10 bg-gray-300 rounded-lg mr-2 flex justify-center items-center text-gray-500">
          <ImageIcon />
        </div>
        <div className="user-info flex flex-col">
          <span className="user-name font-semibold text-base">{fullName}</span>
          <span className="location text-sm text-gray-500">{location}</span>
        </div>
        <span className="time-ago ml-auto text-xs text-gray-400">{timeAgo}</span>
      </div>

      {imageUrl ? (
        <img
          src={`http://localhost:5000${imageUrl}`}
          alt="Complaint"
          className="feed-item-image w-full h-48 object-cover rounded-xl my-3"
        />
      ) : (
        <div className="feed-item-image-placeholder w-full h-48 bg-gray-200 rounded-xl my-3 flex justify-center items-center">
          <ImageIcon />
        </div>
      )}

      <p className="feed-item-text text-sm leading-relaxed text-gray-800 mt-2">{description}</p>
    </div>
  );
};

export function HomePage() {
  const [feedData, setFeedData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/complaints")
      .then((res) => res.json())
      .then((data) => {
        setFeedData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch complaints:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="main-screen bg-black text-white flex flex-col relative">
      <h1 className="app-title text-3xl font-bold p-11 text-center">Explore Feeds</h1>

      <main className="feed-container flex-grow bg-white text-black rounded-t-3xl p-4 pb-20 overflow-y-auto">
        {loading ? (
          <p className="text-center text-gray-500">Loading feeds...</p>
        ) : feedData.length === 0 ? (
          <p className="text-center text-gray-500">No complaints found.</p>
        ) : (
          feedData.map((item) => <FeedItem key={item._id} {...item} />)
        )}
      </main>

      <BottomNavigation />
    </div>
  );
}
