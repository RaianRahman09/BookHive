"use client";

import axios from "axios";
import { BookOpen, Coffee, Gift, ShoppingCart, Users } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { AuthContext } from "./AuthProvider";
import BookCard from "./BookCard";

function HomePage() {
  const [books, setBooks] = useState([]);
  const [displayBooks, setDisplayBooks] = useState([]);
  const [isSignedIn, setIsSignedIn] = useState(false); // State to track if user is signed in
  const { user } = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {

    // Fetch books
    ; (async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/books");
        setBooks(response.data);
        setDisplayBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    })();
  }, []);

  const handleRedirectToSignup = () => {
    history.push('/signup');
  };

  return (
    <div className="dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-blue-100 dark:bg-gray-800 py-20 text-center">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white">Welcome to BookHive</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mt-4">Explore our collection of free and premium books</p>
        <button 
          className="bg-pink-500 text-white py-2 px-6 rounded-lg mt-6 hover:bg-pink-600 duration-200"
          onClick={handleRedirectToSignup}
        >
          Get Started
        </button>
      </section>

      {/* Featured Categories Section */}
      <section className="py-16 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold text-center mb-10 text-gray-800 dark:text-white">Popular Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <CategoryCard
              icon={<BookOpen size={40} className="text-pink-500" />}
              title="Fiction"
              description="Explore worlds of imagination and adventure"
            />
            <CategoryCard
              icon={<BookOpen size={40} className="text-pink-500" />}
              title="Non-Fiction"
              description="Discover knowledge and real-world insights"
            />
            <CategoryCard
              icon={<Coffee size={40} className="text-pink-500" />}
              title="Self-Help"
              description="Transform your life with practical wisdom"
            />
          </div>
        </div>
      </section>

      {/* Books Collection */}
      {user?.email && (
        <section className="bg-gray-50 dark:bg-gray-800 py-20">
          <h2 className="text-2xl font-semibold text-center mb-10 text-gray-800 dark:text-white">Browse Our Collection</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-5 container mx-auto">
            {displayBooks?.length > 0 ? (
              displayBooks.slice(0, 3).map((book) => <BookCard key={book._id} book={book} />)
            ) : (
              <p className="text-center col-span-full text-gray-500 dark:text-gray-400">No books found.</p>
            )}
          </div>
        </section>
      )}

      {/* Book Club Section */}
      <section className="py-16 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="bg-blue-100 dark:bg-gray-800 rounded-lg p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Join Our Book Club</h2>
              <p className="mb-6 text-gray-600 dark:text-gray-300">
                Connect with fellow readers, participate in discussions, and get exclusive access to author events and
                special discounts.
              </p>
              <button 
                className="bg-pink-500 text-white py-2 px-6 rounded-lg hover:bg-pink-600 duration-200"
                onClick={handleRedirectToSignup}
              >
                Join Now
              </button>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <Users size={128} className="text-blue-500 dark:text-blue-400" />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold text-center mb-10 text-gray-800 dark:text-white">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ServiceCard
              icon={<Gift size={40} className="text-pink-500" />}
              title="Gift Cards"
              description="Perfect for any occasion. Give the gift of reading."
            />
            <ServiceCard
              icon={<ShoppingCart size={40} className="text-pink-500" />}
              title="Free Shipping"
              description="On orders over $35. Delivered right to your door."
            />
            <ServiceCard
              icon={<Coffee size={40} className="text-pink-500" />}
              title="In-Store Café"
              description="Enjoy a coffee while browsing our collection."
            />
          </div>
        </div>
      </section>
    </div>
  );
}

// Category Card Component
function CategoryCard({ icon, title, description }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
}

// Service Card Component
function ServiceCard({ icon, title, description }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
}

export default HomePage;
