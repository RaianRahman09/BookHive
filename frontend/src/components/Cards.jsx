import React from "react";
import { Link } from "react-router-dom";
function Cards({ item }) {
  return (
    <Link to={`/books/${item?._id}`} >
      <div className="p-4 rounded-lg">
        <div className="card bg-white shadow-lg hover:scale-105 duration-200">
          <img
            src={item.image}
            alt="Book"
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <div className="p-4 rounded-lg">
            <h3 className="text-lg font-semibold">{item.name}</h3>
            <p className="text-sm text-gray-500">{item.title}</p>
            <div className="flex justify-between items-center mt-4">
              <span className="text-pink-500">${item.price}</span>
              <button className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 duration-200">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>

  );
}

export default Cards;

