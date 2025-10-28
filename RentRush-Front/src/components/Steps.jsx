import React from "react";

function Steps() {
  return (
    <div 
      id="howitwork" className="py-16 px-4 sm:px-6 lg:px-8 relative bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/src/assets/how it works.png')" }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/30"></div>
      
      <div className="relative z-10">
        {/* Heading */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">How it works</h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            A high-performing web-based car rental system for any rent-a-car company and website
          </p>
        </div>

        {/* Steps Section */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div className="bg-[#C17D3C] p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6 mx-auto">
              <img
                src="/src/assets/work/gps.png"
                alt="Choose Location"
                className="w-8 h-8"
              />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 text-center mb-4">Choose Location</h2>
            <p className="text-gray-700 text-center">
              Enable car rentals across various locations.<br/>
              Flexible Book and Return Locations
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div className="bg-[#C17D3C] p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6 mx-auto">
              <img
                src="/src/assets/work/celender.png"
                alt="Pick-up Date"
                className="w-8 h-8"
              />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 text-center mb-4">Pick-up Date</h2>
            <p className="text-gray-700 text-center">
              Any time, Anywhere, Pick your Date and Enjoy your Trip.<br/>
              Select your pick-up date for your rental car.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div className="bg-[#C17D3C] p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6 mx-auto">
              <img
                src="/src/assets/work/caricon.png"
                alt="Book your car"
                className="w-8 h-8"
              />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 text-center mb-4">Book your car</h2>
            <p className="text-gray-700 text-center">
              Offer updated car information and models.<br/>
              Allow users to choose their preferred car models.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="max-w-7xl mx-auto mt-16 mb-16 border-t border-white/30"></div>
      </div>
    </div>
  );
}

export default Steps;
