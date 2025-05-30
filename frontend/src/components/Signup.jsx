// src/pages/LoginPage.jsx
import axios from 'axios';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const { data } = await axios.post('http://localhost:5000/api/signup', { name, email, password });
            if (data.success) {

                history.push('/signin');
            } else {
                setError(data.message || 'Sign Up failed');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'An unexpected error occurred.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-semibold text-center text-gray-800 dark:text-white mb-6">
                    Sign Up
                </h2>
                <div className="max-w-md mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-300 dark:border-gray-700">
                    <form onSubmit={handleSubmit}>
                        {error && (
                            <div className="mb-4 text-red-600 dark:text-red-400 text-sm">
                                {error}
                            </div>
                        )}
                        <input
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-3 mb-4 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-md focus:ring-2 focus:ring-pink-500 dark:focus:ring-pink-600"
                            required
                        />
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 mb-4 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-md focus:ring-2 focus:ring-pink-500 dark:focus:ring-pink-600"
                            required
                        />
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 mb-4 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-md focus:ring-2 focus:ring-pink-500 dark:focus:ring-pink-600"
                            required
                        />
                        <button
                            type="submit"
                            className="w-full bg-pink-500 text-white py-3 rounded-md hover:bg-pink-600"
                        >
                            Sign up
                        </button>
                        <div className="text-center mt-4">
                            <span className="text-gray-600 dark:text-gray-400">Already have an account? </span>
                            <Link to="/signin" className="text-pink-500 hover:text-pink-600">
                                Sign in
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signup;
