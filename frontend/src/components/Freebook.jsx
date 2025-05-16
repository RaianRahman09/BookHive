import React from "react";
import Slider from "react-slick"; // Import the Slider component
import Cards from "./Cards"; // Import the Cards component
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function Freebook({ books }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-semibold mb-6">Browse Our Collection</h2>
      <Slider {...settings}>
        {books && books.length > 0 ? (
          books.map((item, index) => (
            <Cards key={index} item={item} />
          ))
        ) : (
          <p>No books available</p>
        )}
      </Slider>
    </div>
  );
}

export default Freebook;

