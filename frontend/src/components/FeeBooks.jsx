import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function BooksPage() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetch('https://gutendex.com/books?search=fiction&limit=12');
                const data = await response.json();

                const formattedBooks = data.results.map(book => ({
                    id: book.id,
                    title: book.title,
                    author: book.authors?.[0]?.name || "Unknown Author",
                    cover: book.formats['image/jpeg'] || "https://via.placeholder.com/200x300",
                    gutenbergId: book.gutenberg_id || book.id
                }));

                setBooks(formattedBooks);
            } catch (error) {
                console.error("Error fetching books:", error);
            }
        };

        fetchBooks();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-8 text-center">Popular Books</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {books.map(book => (
                    <div key={book.id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
                        <img
                            src={book.cover}
                            alt={book.title}
                            className="w-full h-64 object-cover mb-4 rounded-lg"
                            onError={(e) => e.target.src = "https://via.placeholder.com/200x300"}
                        />
                        <h2 className="text-xl font-bold mb-2">{book.title}</h2>
                        <p className="text-gray-600 mb-4">{book.author}</p>
                        <Link
                            to={`/books/${book.gutenbergId}`}
                            className="block text-center bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
                        >
                            Read Now
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BooksPage;