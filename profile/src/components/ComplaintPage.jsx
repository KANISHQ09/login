"use client"

import { useState } from "react"
import BottomNavigation from "../components/BottomNavigation"

export function ComplaintPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    title: "",
    description: "",
    location: "",
  })
  const [imageFile, setImageFile] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const form = new FormData()
    Object.entries(formData).forEach(([key, value]) => {
      form.append(key, value)
    })
    if (imageFile) form.append("image", imageFile)

    try {
      const res = await fetch("http://localhost:5000/api/complaints", {
        method: "POST",
        body: form,
      })

      if (res.ok) {
        alert("✅ Complaint submitted successfully!")
        setFormData({
          fullName: "",
          email: "",
          title: "",
          description: "",
          location: "",
        })
        setImageFile(null)
        document.getElementById("file-upload").value = "" // Reset file input
      } else {
        const err = await res.json()
        alert("❌ Error: " + (err.message || "Failed to submit complaint."))
      }
    } catch (err) {
      console.error(err)
      alert("❌ Failed to connect to server.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="main-screen bg-black flex flex-col relative">
      <h2 className="text-3xl font-bold p-12 text-center text-white">Report a Complaint</h2>

      <form
        onSubmit={handleSubmit}
        className="feed-container flex flex-col p-5 relative rounded-t-3xl bg-white h-full overflow-y-auto"
      >
        {/* Image Upload */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Upload Image</label>
          <div className="mt-1 flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-blue-500 hover:bg-gray-50">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="file-upload"
              onChange={handleFileChange}
            />
            <label
              htmlFor="file-upload"
              className="flex flex-col items-center justify-center text-gray-500 cursor-pointer"
            >
              <svg width="45" height="45" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
                <path d="M600 175C610 175 619 181 623 191L650 275C655 285 660 299 675 300H825C850 300 875 325 875 350V750C875 775 850 800 825 800H175C150 800 125 775 125 750V350C125 325 150 300 175 300H325C337 300 346 286 350 275L377 191C381 181 390 175 400 175H600ZM312 525C312 628 397 713 500 713C603 713 688 628 688 525C688 422 603 337 500 337C397 337 312 422 312 525ZM613 525C613 588 563 638 500 638C437 638 387 588 387 525C387 462 437 412 500 412C563 412 613 462 613 525Z" />
              </svg>
              <span className="text-sm mt-2">Click to upload or drag and drop</span>
              {imageFile && <p className="text-xs mt-1 text-green-500">{imageFile.name}</p>}
            </label>
          </div>
        </div>

        {/* Input Fields */}
        {[
          { id: "fullName", label: "Full Name", type: "text" },
          { id: "email", label: "Email", type: "email" },
          { id: "title", label: "Issue Title", type: "text" },
          { id: "description", label: "Description", type: "textarea" },
          { id: "location", label: "Location", type: "text" },
        ].map((field) => (
          <div className="mb-4" key={field.id}>
            <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 mb-1">
              {field.label}
            </label>
            {field.type === "textarea" ? (
              <textarea
                id={field.id}
                name={field.id}
                rows={4}
                value={formData[field.id]}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 p-2 border"
              />
            ) : (
              <input
                id={field.id}
                name={field.id}
                type={field.type}
                value={formData[field.id]}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 p-2 border"
              />
            )}
          </div>
        ))}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-red-500 text-white py-2 px-4 rounded-md transition mb-16 ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-red-600"
          }`}
        >
          {loading ? "Submitting..." : "Submit Complaint"}
        </button>
      </form>

      <BottomNavigation />
    </div>
  )
}
