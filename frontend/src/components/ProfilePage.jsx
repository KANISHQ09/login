import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import BottomNavigation from '../components/BottomNavigation';
import { LogOut } from 'lucide-react';

export function ProfilePage() {
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  const user = {
    name: currentUser?.displayName || 'Anonymous User',
    email: currentUser?.email,
    createdAt: currentUser?.metadata?.creationTime || 'Unknown',
    profileUrl: currentUser?.photoURL || '',
    role: 'Citizen',
  };

  return (
    <div className="main-screen bg-black text-white flex flex-col">
      <div className="profile-img flex">
        <div className="img w-32 h-32 rounded-full bg-white text-black flex items-center justify-center text-center text-xs font-semibold shadow-inner">
          Profile
        </div>
        <h2 className="mt-4 text-xl font-semibold">{user.name}</h2>
        <p className="text-gray-400 text-sm">{user.role}</p>
      </div>
      <div className="profile-content">
        <div className="w-full space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm w-full">
            <span className="text-sm text-gray-600 font-medium block">Email:</span>
            <p className="text-gray-800 break-words">{user.email}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm w-full">
            <span className="text-sm text-gray-600 font-medium block">Created At:</span>
            <p className="text-gray-800">{user.createdAt}</p>
          </div>
        </div>
        <div className="mt-6">
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 px-6 py-2 text-white bg-red-500 hover:bg-red-600 rounded-md shadow transition"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>
      <BottomNavigation />
    </div>
  );
}
