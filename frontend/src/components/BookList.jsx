import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDarkMode } from './DarkModeProvider';

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { isDarkMode } = useDarkMode();

    // Fetch all books from API
    const fetchBooks = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:5000/api/books');
            setBooks(response.data);
        } catch (err) {
            setError('Failed to fetch books.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    // Delete a book by id
    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this book?')) return;
        try {
            await axios.delete(`http://localhost:5000/api/books/${id}`);
            // Update state to remove deleted book
            setBooks(prev => prev.filter(book => book._id !== id));
        } catch (err) {
            console.error('Error deleting book:', err);
            alert('Failed to delete book.');
        }
    };


    if (loading) return <div className={`p-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Loading books...</div>;
    if (error) return <div className="p-4 text-red-600">{error}</div>;

    return (
        <div className={`p-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            <h2 className="text-2xl font-semibold mb-4">Book List</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {books.map(book => (
                    <div key={book._id} className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg rounded-2xl overflow-hidden`}>
                        <img src={book.image} alt={book.name} className="w-full h-48 object-cover" />
                        <div className="p-4">
                            <h3 className="text-xl font-bold mb-2">{book.name}</h3>
                            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>By {book.author}</p>
                            <div className="flex justify-between">
                                <Link
                                    to={`/books/edit/${book._id}`}
                                    className={`px-4 py-2 rounded-2xl border ${
                                        isDarkMode 
                                        ? 'border-pink-400 text-pink-400 hover:bg-pink-900' 
                                        : 'border-pink-500 text-pink-500 hover:bg-pink-50'
                                    } transition`}
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => handleDelete(book._id)}
                                    className={`px-4 py-2 rounded-2xl border ${
                                        isDarkMode 
                                        ? 'border-red-400 text-red-400 hover:bg-red-900' 
                                        : 'border-red-500 text-red-500 hover:bg-red-50'
                                    } transition`}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BookList;
