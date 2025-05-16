import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import Avatar from 'react-avatar';
import { useParams } from 'react-router-dom';
import { AuthContext } from './AuthProvider';
export default function BookDetails() {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [comment, setComment] = useState("");
    const { user } = useContext(AuthContext);

    const [comments, setComments] = useState([]);

    useEffect(() => {
        async function fetchBook() {
            try {
                const res = await fetch(`/api/books/${id}`);
                if (!res.ok) throw new Error('Network response was not ok');
                const data = await res.json();
                setBook(data);
                setComments(data.comments);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchBook();
    }, [id]);

    if (loading) {
        return (
            <div className="container mx-auto p-4 text-center">
                Loading...
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto p-4 text-red-500 text-center">
                Error: {error}
            </div>
        );
    }

    if (!book) {
        return (
            <div className="container mx-auto p-4 text-center">
                Book not found.
            </div>
        );
    }

    const handleComment = async () => {
        const name = user?.name;
        const email = user?.email;

        const newBook = { ...book, comments: [...book.comments, { name, email, comment }] };
        try {
            const res = await axios.put(`http://localhost:5000/api/books/${book._id}`, newBook);
            if (res.status === 200) {
                alert("Comment added successfully");
            }
            // eslint-disable-next-line no-unused-vars
        } catch (error) {
            alert("Error adding comment");
        }
    };

    return (
        <div className="container mx-auto p-6">
            <div >
                <h1 className="text-3xl font-bold mb-2">{book.name}</h1>
                <p className="text-lg text-gray-700 mb-4">by {book.author}</p>
                <div className="border rounded overflow-hidden" style={{ height: '80vh' }}>
                    <iframe
                        src={book.pdfLink}
                        title={book.name}
                        width="100%"
                        height="100%"
                        frameBorder="0"
                    ></iframe>
                </div>
            </div>
            <div>
                <h1 className='text-2xl my-2'>Comments</h1>

                <div>
                    {
                        comments?.length > 0 ? comments.map((comment, index) => (
                            <div key={index} className=' p-2 my-2 '>
                                <div className='flex gap-x-2'>
                                    <Avatar name={comment?.name} size="30" round={true} />
                                    <div>

                                        <h1 className='text-lg'>{comment?.name}</h1>
                                        <p>{comment?.comment}</p>
                                    </div>
                                </div>
                            </div>
                        )) : <p>No comments yet.</p>
                    }
                </div>
                <div>
                    <input type="text" placeholder='Write Comment' value={comment} onChange={(e) => setComment(e.target.value)} className=' px-4 py-2 border' />
                    <button onClick={handleComment} className='p-2 border'>{">"}</button>
                </div>
            </div>
        </div>
    );
}
