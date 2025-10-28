import Card from "./Card";
import React from "react";

function Reason() {
  const arr = [
    {
      title: "Customer Support",
      desc: "At RentRush, our dedicated customer support team is here to assist you with your car rental management.",
      img: "icon1",
    },
    {
      title: "Many Locations",
      desc: "Accessible rentals across various locations. Flexible Book and Return Locations.",
      img: "icon2",
    },
    {
      title: "Best Price Guaranteed",
      desc: "At RentRush, we offer the Best Price Guarantee. If you find a lower price elsewhere for your car rental, ensuring you receive the most competitive rates for your reservations.",
      img: "icon3",
    },
  ];

  return (
    <div id="why-choose" className="relative py-20 text-white px-4">
      {/* Background Image - Full width */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="/src/assets/choose/bg.png"
          className="w-full h-full object-cover"
          alt="Background"
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header Section - Centered */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
            Why Choose Us
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Choose RentRush for our unbeatable prices, extensive location options,
            and a commitment to exceptional customer service.
          </p>
        </div>

        {/* Main Content - Right-aligned cards */}
        <div className="flex justify-end">
          <div className="w-full lg:w-1/2 space-y-8">
            {arr.map((item, index) => (
              <Card
                key={index}
                title={item.title}
                desc={item.desc}
                img={item.img}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reason;
