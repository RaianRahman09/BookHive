import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

const EditBook = () => {
    const { id } = useParams();
    const history = useHistory();
    const [formData, setFormData] = useState({
        name: '',
        author: '',
        image: '',
        pdfLink: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    // Fetch existing book data
    useEffect(() => {
        const fetchBook = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`http://localhost:5000/api/books/${id}`);
                setFormData({
                    name: res.data.name,
                    author: res.data.author,
                    image: res.data.image,
                    pdfLink: res.data.pdfLink
                });
            } catch (err) {
                console.error(err);
                setError('Failed to load book data.');
            } finally {
                setLoading(false);
            }
        };
        fetchBook();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            await axios.put(`http://localhost:5000/api/books/${id}`, formData);
            setSuccess(true);
            // Redirect back to book list
            setTimeout(() => history.push('/books'), 1000);
        } catch (err) {
            console.error(err);
            setError('Failed to update book.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Edit Book</h2>
            {error && <p className="text-red-600 mb-2">{error}</p>}
            {success && <p className="text-green-600 mb-2">Book updated successfully!</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
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
                    <label htmlFor="author" className="block text-sm font-medium mb-1">Author</label>
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
                    <label htmlFor="image" className="block text-sm font-medium mb-1">Image URL</label>
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
                    <label htmlFor="pdfLink" className="block text-sm font-medium mb-1">PDF Link</label>
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

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700 disabled:opacity-50"
                >
                    {loading ? 'Updating...' : 'Update Book'}
                </button>
            </form>
        </div>
    );
};

export default EditBook;
