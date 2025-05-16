import axios from 'axios';
import React, { useState } from 'react';

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
        <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Upload New Book</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="name">Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="author">Author</label>
                    <input
                        type="text"
                        name="author"
                        id="author"
                        value={formData.author}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="image">Image URL</label>
                    <input
                        type="url"
                        name="image"
                        id="image"
                        value={formData.image}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="pdfLink">PDF Link</label>
                    <input
                        type="url"
                        name="pdfLink"
                        id="pdfLink"
                        value={formData.pdfLink}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                    />
                </div>

                {error && <p className="text-red-600">{error}</p>}
                {success && <p className="text-green-600">Book uploaded successfully!</p>}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700 disabled:opacity-50"
                >
                    {loading ? 'Uploading...' : 'Upload Book'}
                </button>
            </form>
        </div>
    );
};

export default UploadBooks;
