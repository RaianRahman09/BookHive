import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthProvider';

const LovedBooks = () => {
    const { user } = useContext(AuthContext);
    const [lovedBooks, setLovedBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLovedBooks = async () => {
            if (!user) return;

            try {
                const res = await axios.get(`http://localhost:5000/api/users/${user._id}`);
                setLovedBooks(res.data.lovedBooks || []);
            } catch (error) {
                console.error("Error fetching loved books:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchLovedBooks();
    }, [user]);

    if (!user) {
        return <p className="text-center text-red-500">Please log in to view your loved books.</p>;
    }

    if (loading) {
        return <p className="text-center">Loading loved books...</p>;
    }

    if (lovedBooks.length === 0) {
        return <p className="text-center">You haven't loved any books yet.</p>;
    }

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-center">Your Loved Books</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {lovedBooks.map(book => (
                    <div key={book._id} className="bg-white shadow rounded-lg p-4">
                        <img
                            src={book.image}
                            alt={book.name}
                            className="w-full h-48 object-cover mb-2 rounded"
                            onError={(e) => e.target.src = "https://via.placeholder.com/200x300"}
                        />
                        <h3 className="text-lg font-semibold">{book.name}</h3>
                        <p className="text-gray-500 mb-2">{book.author}</p>

                    </div>
                ))}
            </div>
        </div>
    );
};

export default LovedBooks;
