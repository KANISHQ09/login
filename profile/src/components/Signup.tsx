import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { User, Mail, Lock, Loader2 } from 'lucide-react';

type AuthContextType = {
    signup: (email: string, password: string, displayName: string) => Promise<void>;
};

export function Signup() {
    const [email, setEmail] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const auth = useAuth() as AuthContextType | undefined;
    const signup = auth?.signup;
    const navigate = useNavigate();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        if (typeof signup !== 'function') {
            setError('Signup function is not available.');
            return;
        }

        try {
            setError('');
            setLoading(true);
            await signup(email, password, displayName);
            navigate('/profile');
        } catch (error: any) {
            setError(error?.message || 'Failed to create account');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="main-screen flex items-center justify-center">
            <div className="w-full max-w-lg px-8">
                <div className="text-center w-full">
                    <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <User className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
                    <p className="text-gray-600 mt-2">Sign up for a new account</p>
                </div>

                {error && (
                    <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg mb-4 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4 mt-6">
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
                            required
                        />
                    </div>

                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
                            required
                        />
                    </div>

                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
                            required
                        />
                    </div>

                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-black hover:bg-gray-600 text-white font-semibold py-2 rounded-lg transition duration-200 disabled:opacity-50 flex items-center justify-center"
                    >
                        {loading ? <Loader2 className="animate-spin w-5 h-5" /> : 'Create Account'}
                    </button>
                </form>

                <div className="text-center text-gray-500 mt-4">
                    Already have an account?{' '}
                    <Link to="/login" className="text-gray-700 hover:underline font-medium">
                        Sign in
                    </Link>
                </div>
            </div>
        </div>
    );
}
