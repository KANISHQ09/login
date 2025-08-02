import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { auth } from "../lib/firebase";

export function Verification() {
  const navigate = useNavigate();
  const [status, setStatus] = useState("Verifying...");
  const [error, setError] = useState("");

  useEffect(() => {
    const email = window.localStorage.getItem("emailForSignIn");

    if (isSignInWithEmailLink(auth, window.location.href)) {
      if (!email) {
        const inputEmail = window.prompt("Please confirm your Gmail:");
        if (inputEmail) {
          signIn(inputEmail);
        } else {
          setStatus("No email provided.");
        }
      } else {
        signIn(email);
      }
    } else {
      setStatus("Invalid link or already used.");
    }

    async function signIn(email) {
      try {
        await signInWithEmailLink(auth, email, window.location.href);
        window.localStorage.removeItem("emailForSignIn");
        setStatus("Verified! Redirecting...");
        setTimeout(() => navigate("/profile"), 1500);
      } catch (err) {
        console.error("Error verifying link:", err);
        setError("Verification failed.");
        setStatus("Failed to verify.");
      }
    }
  }, []);

  return (
    <div className="main-screen flex flex-col justify-center items-center p-6">
      <h2 className="text-2xl font-semibold mb-4">Email Verification</h2>
      <p className="text-gray-600 mb-2">{status}</p>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
