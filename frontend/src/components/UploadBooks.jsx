import axios from 'axios';
import React, { useState, useContext } from 'react';
import { useDarkMode } from './DarkModeProvider';

const UploadBooks = () => {
    const [formData, setFormData] = useState({
        name: '',
        author: '',
        image: '',
        pdfLink: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const { isDarkMode } = useDarkMode();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const res = await axios.post('http://localhost:5000/api/books', formData);

            setSuccess(true);
            setFormData({ name: '', author: '', image: '', pdfLink: '' });
        } catch (err) {
            console.error(err);
            setError('Failed to upload book. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`max-w-lg mx-auto p-6 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} shadow-md rounded-lg`}>
            <h2 className="text-2xl font-semibold mb-4">Upload New Book</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`} htmlFor="name">Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className={`w-full border rounded p-2 focus:outline-none focus:ring-2 ${
                            isDarkMode 
                            ? 'bg-gray-700 border-gray-600 text-white focus:ring-pink-400' 
                            : 'bg-white border-gray-300 focus:ring-pink-200'
                        }`}
                    />
                </div>

                <div>
                    <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`} htmlFor="author">Author</label>
                    <input
                        type="text"
                        name="author"
                        id="author"
                        value={formData.author}
                        onChange={handleChange}
                        required
                        className={`w-full border rounded p-2 focus:outline-none focus:ring-2 ${
                            isDarkMode 
                            ? 'bg-gray-700 border-gray-600 text-white focus:ring-pink-400' 
                            : 'bg-white border-gray-300 focus:ring-pink-200'
                        }`}
                    />
                </div>

                <div>
                    <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`} htmlFor="image">Image URL</label>
                    <input
                        type="url"
                        name="image"
                        id="image"
                        value={formData.image}
                        onChange={handleChange}
                        required
                        className={`w-full border rounded p-2 focus:outline-none focus:ring-2 ${
                            isDarkMode 
                            ? 'bg-gray-700 border-gray-600 text-white focus:ring-pink-400' 
                            : 'bg-white border-gray-300 focus:ring-pink-200'
                        }`}
                    />
                </div>

                <div>
                    <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`} htmlFor="pdfLink">PDF Link</label>
                    <input
                        type="url"
                        name="pdfLink"
                        id="pdfLink"
                        value={formData.pdfLink}
                        onChange={handleChange}
                        required
                        className={`w-full border rounded p-2 focus:outline-none focus:ring-2 ${
                            isDarkMode 
                            ? 'bg-gray-700 border-gray-600 text-white focus:ring-pink-400' 
                            : 'bg-white border-gray-300 focus:ring-pink-200'
                        }`}
                    />
                </div>

                {error && <p className="text-red-600">{error}</p>}
                {success && <p className="text-green-600">Book uploaded successfully!</p>}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-pink-500 text-white p-2 rounded hover:bg-pink-600 disabled:opacity-50"
                >
                    {loading ? 'Uploading...' : 'Upload Book'}
                </button>
            </form>
        </div>
    );
};

export default UploadBooks;
