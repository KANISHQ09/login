"use client"
import { useLocation, useNavigate } from "react-router-dom"

export default function BottomNavigation() {
  const location = useLocation()
  const navigate = useNavigate()

  const isActive = (path) => location.pathname === path

  // SVG Icons
  const HomeIcon = () => (
    <svg className="icon" width="24" height="24" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
      <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>
  )

  const AddPostIcon = () => (
    <svg className="icon" width="24" height="24" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="12" y1="8" x2="12" y2="16"></line>
      <line x1="8" y1="12" x2="16" y2="12"></line>
    </svg>
  )

  const ActivityIcon = () => (
    <svg className="icon" width="24" height="24" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
    </svg>
  )

  const AccountIcon = () => (
    <svg className="icon" width="24" height="24" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  )

  return (
    <nav className="bg-black text-white p-4 flex justify-around items-center w-full">
      <button
        onClick={() => navigate("/home")}
        className={`nav-item ${isActive("/home") ? "text-white" : "text-gray-400"} hover:text-white flex flex-col items-center`}
      >
        <HomeIcon />
        <span className="text-xs mt-1">Home</span>
      </button>
      <button
        onClick={() => navigate("/complaint")}
        className={`nav-item ${isActive("/complaint") ? "text-white" : "text-gray-400"} hover:text-white flex flex-col items-center`}
      >
        <AddPostIcon />
        <span className="text-xs mt-1">Complaint</span>
      </button>
      <button
        onClick={() => navigate("/track")}
        className={`nav-item ${isActive("/track") ? "text-white" : "text-gray-400"} hover:text-white flex flex-col items-center`}
      >
        <ActivityIcon />
        <span className="text-xs mt-1">Track</span>
      </button>
      <button
        onClick={() => navigate("/profile")}
        className={`nav-item ${isActive("/profile") ? "text-white" : "text-gray-400"} hover:text-white flex flex-col items-center`}
      >
        <AccountIcon />
        <span className="text-xs mt-1">Profile</span>
      </button>
    </nav>
  )
}
