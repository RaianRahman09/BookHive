import React from "react";

function Banner() {
  return (
    <div className="flex justify-between items-center max-w-screen-xl mx-auto">
      <div className="text-center md:text-left md:w-1/2">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Hello, welcome here to learn something new everyday!!!
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor, et
          totam. Tempora amet atque expedita, quae corrupti totam sed pariatur
          corporis at veniam est voluptas animi!
        </p>
        <button className="mt-6 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all">
          Get Started
        </button>
      </div>

      {/* Banner Image Section */}
      <div className="md:w-1/2">
        <img
          src="/Banner.png"  // Banner image source from public folder
          alt="Books Banner"
          className="w-full h-auto"
        />
      </div>
    </div>
  );
}

export default Banner;
