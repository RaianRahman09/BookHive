import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { AuthContext } from './AuthProvider';

const BookCard = ({ book }) => {
    const { user } = useContext(AuthContext);
    const [loved, setLoved] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLovedBooks = async () => {
            if (!user) return;

            try {
                const res = await axios.get(`http://localhost:5000/api/users/${user?._id}`);
                const lovedBookIds = res.data.lovedBooks.map(b => typeof b === 'string' ? b : b._id);
                setLoved(lovedBookIds.includes(book?._id));
            } catch (error) {
                console.error('Error fetching loved books:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchLovedBooks();
    }, [user, book?._id]);

    const handleLove = async () => {
        if (!user) {
            alert("You must be logged in to love a book.");
            return;
        }

        try {
            await axios.put(`http://localhost:5000/api/users/${user._id}`, {
                bookId: book._id,
            });

            setLoved(prev => !prev);
        } catch (error) {
            console.error("Error loving book:", error);
        }
    };

    const handleRead = async () => {
        if (!user) {
            alert("You must be logged in to read a book.");
            return;
        }

        try {
            const res = await axios.post(`http://localhost:5000/api/check-subscription/`, {
                email: user.email,
            });

            if (res.data.active) {
                window.location.href = `/books/${book?._id}`;
            } else {
                alert("You need to subscribe to read this book.");
            }
        } catch (error) {
            alert("You need to subscribe to read this book.");
        }
    };

    if (!user || loading) return null;

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
            <img
                src={book?.image}
                alt={book?.name}
                className="w-full h-64 object-cover mb-4 rounded-lg"
                onError={(e) => e.target.src = "https://via.placeholder.com/200x300"}
            />
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h2 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">{book?.name}</h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{book?.author}</p>
                </div>
                <div onClick={handleLove} className="cursor-pointer">
                    {loved ? (
                        <FaHeart className="text-3xl text-red-500" />
                    ) : (
                        <CiHeart className="text-3xl text-gray-500 dark:text-gray-400" />
                    )}
                </div>
            </div>
            <button
                onClick={handleRead}
                className="block text-center bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 w-full"
            >
                Read Now
            </button>
        </div>
    );
};

export default BookCard;
