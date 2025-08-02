import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { ForgotPassword } from './components/ForgotPassword';
import { Verification } from './components/VerificationPage';
import { ProfilePage } from './components/ProfilePage.jsx';
import { HomePage } from './components/Home.jsx';
import { ComplaintPage } from './components/ComplaintPage.jsx';
import { TrackPage } from './components/TrackPage.jsx';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verification" element={<Verification />} />
          <Route path="/home" element={<HomePage />} />
          <Route path='/complaint' element={<ComplaintPage />} />
          <Route path='/track' element={<TrackPage />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/profile" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;