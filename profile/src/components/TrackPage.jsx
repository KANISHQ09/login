"use client"

import { useEffect, useState } from "react"
import BottomNavigation from "../components/BottomNavigation"

export function TrackPage() {
  const [complaints, setComplaints] = useState([])

  const statusColor = {
    Pending: "bg-yellow-100 text-yellow-800",
    "In Progress": "bg-blue-100 text-blue-800",
    Resolved: "bg-green-100 text-green-800",
  }

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/complaints")
        const data = await res.json()
        setComplaints(data)
      } catch (error) {
        console.error("Error fetching complaints:", error)
      }
    }

    fetchComplaints()
  }, [])

  return (
    <div className="main-screen bg-black flex flex-col relative">
      <h2 className="text-3xl text-white p-10 font-semibold text-center">Complaint Tracking</h2>

      <div className="complaint-container overflow-y-auto bg-white rounded-t-3xl h-full shadow-lg p-6 pb-20">
        <div className="space-y-4">
          {complaints.map((complaint) => (
            <div key={complaint._id} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">{complaint.title}</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor[complaint.status]}`}>
                  {complaint.status}
                </span>
              </div>
              <p className="text-sm text-gray-500">Complaint ID: {complaint.complaintId}</p>
              <p className="text-sm text-gray-500">
                Submitted On: {new Date(complaint.createdAt).toLocaleDateString("en-GB")}
              </p>
            </div>
          ))}
        </div>
      </div>

      <BottomNavigation />
    </div>
  )
}
