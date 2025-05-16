import { BookOpen, Loader, Search } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import BookCard from "./BookCard";

function BooksPage() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOption, setSortOption] = useState("none");
  const { user } = useContext(AuthContext);

  if (!user?.email) {
    return <Redirect to="/signin" />;
  }

  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:5000/api/books/");
        const data = await response.json();
        setBooks(data);
        setFilteredBooks(data); // initially show all
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Sort and filter books
  useEffect(() => {
    let result = [...books];
    
    // Apply search filter
    if (searchTerm.trim()) {
      const lowercased = searchTerm.toLowerCase();
      result = result.filter((book) => 
        book.name.toLowerCase().includes(lowercased)
      );
    }
    
    // Apply sorting
    if (sortOption === "alphabetical") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }
    
    setFilteredBooks(result);
  }, [searchTerm, books, sortOption]);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen pt-20 pb-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-700 dark:from-gray-900 dark:to-gray-800 text-white rounded-lg shadow-lg p-8 mb-10">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Explore Our Collection</h1>
              <p className="text-gray-200 dark:text-gray-300 max-w-xl">
                Discover a world of knowledge and adventure through our carefully curated selection of books.
              </p>
            </div>
            <div className="flex-shrink-0">
              <BookOpen size={80} className="text-pink-400 opacity-80" />
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-10">
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={20} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by book name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                          bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                          focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent 
                          transition-all duration-200"
              />
            </div>
            
            <div className="flex justify-end">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                         focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent 
                         transition-all duration-200 cursor-pointer"
              >
                <option value="none">Sort</option>
                <option value="alphabetical">A to Z</option>
              </select>
            </div>
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            <div className="col-span-full flex justify-center items-center py-12">
              <Loader size={40} className="animate-spin text-pink-500" />
            </div>
          ) : filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <BookCard key={book._id} book={book} />
            ))
          ) : (
            <div className="col-span-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-10 text-center">
              <div className="flex justify-center mb-4">
                <Search size={48} className="text-gray-300 dark:text-gray-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">No books found</h3>
              <p className="text-gray-500 dark:text-gray-400">
                We couldn't find any books matching your search. Try different keywords or browse our categories.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BooksPage;
