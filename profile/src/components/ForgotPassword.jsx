import { useState } from "react";
import { Mail, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { sendSignInLinkToEmail } from "firebase/auth";
import { auth } from "../lib/firebase";

export function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/^[a-zA-Z0-9._%+\-]+@gmail\.com$/.test(email)) {
      alert("Enter a valid Gmail address.");
      return;
    }

    const actionCodeSettings = {
      url: window.location.origin + "/verification", // Redirect after email click
      handleCodeInApp: true,
    };

    try {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem("emailForSignIn", email);
      alert("Magic link sent! Check your Gmail.");
    } catch (error) {
      console.error("Error sending email link:", error);
      alert("Failed to send verification link.");
    }
  };

  return (
    <div className="main-screen bg-white flex flex-col justify-center items-center">
      <div className="w-full flex items-center justify-center mb-8">
        <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mx-auto">
          <Mail className="w-8 h-8 text-white" />
        </div>
      </div>

      <div className="text-center mb-10 px-6">
        <h2 className="text-3xl font-bold text-gray-900">Login via Gmail</h2>
        <p className="text-gray-600 mt-2">We'll send you a secure login link</p>
      </div>

      <div className="w-full max-w-lg px-8">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 mb-1">Gmail Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your Gmail address"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-600 transition"
          >
            Send Login Link
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link to="/login" className="text-black hover:underline flex items-center justify-center">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
