import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDarkMode } from './DarkModeProvider';
import axios from 'axios';

export const AdminLogin = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const history = useHistory();
    const { isDarkMode } = useDarkMode();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post('http://localhost:5000/api/admin/login', formData);
            if (response.data) {
                history.push('/admin/dashboard');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`min-h-screen flex items-center justify-center px-4 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <div className={`max-w-md w-full p-8 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <h2 className={`text-center text-3xl font-bold mb-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Admin Login
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                        <div className="text-red-600 text-center text-sm">
                            {error}
                        </div>
                    )}
                    <div>
                        <label htmlFor="username" className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                            Username
                        </label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            required
                            value={formData.username}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 rounded-md border ${
                                isDarkMode 
                                ? 'bg-gray-700 border-gray-600 text-white focus:border-pink-500' 
                                : 'border-gray-300 text-gray-900 focus:border-pink-500'
                            } focus:outline-none focus:ring-1 focus:ring-pink-500`}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 rounded-md border ${
                                isDarkMode 
                                ? 'bg-gray-700 border-gray-600 text-white focus:border-pink-500' 
                                : 'border-gray-300 text-gray-900 focus:border-pink-500'
                            } focus:outline-none focus:ring-1 focus:ring-pink-500`}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-pink-500 text-white py-2 rounded-md hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 disabled:opacity-50 mt-4"
                    >
                        {loading ? 'Signing in...' : 'Sign in'}
                    </button>
                </form>
            </div>
        </div>
    );
};
