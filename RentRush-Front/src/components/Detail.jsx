import React from "react";
import DetailCard from "./DetailCard";

function Detail() {
  const items = [
    {
      title: "Proof of Identity",
      requirements: "Passport, Driver's License or National ID",
      img: "img1",
      tip: "Required for age verification and identity confirmation"
    },
    {
      title: "Car Registration Book",
      requirements: "Original or certified copy",
      img: "img2",
      tip: "Verifies vehicle ownership and legal status"
    },
    {
      title: "Valid Driver's License",
      requirements: "Must be valid for vehicle category",
      img: "img5",
      tip: "International licenses accepted with translation"
    },
    // {
    //   title: "Reservation Confirmation",
    //   requirements: "Email or printed voucher",
    //   img: "img3",
    //   tip: "Contains your booking reference and details"
    // },
  ];

  return (
    <div id="rentaldetail" className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Necessary Documents for Renting
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Have these documents ready to ensure a smooth rental process
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/2">
            <img
              src="/src/assets/aboutcar.png"
              className="w-full rounded-xl shadow-lg"
              alt="Car rental documents"
            />
            <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-[#C17D3C]">Pro Tip</h3>
              <p className="mt-2 text-gray-600">
                Scan and upload these documents in advance!
              </p>
            </div>
          </div>
          
          <div className="lg:w-1/2 space-y-6">
            {items.map((item) => (
              <DetailCard
                key={item.img}
                title={item.title}
                requirement={item.requirements}
                img={item.img}
                tip={item.tip}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;
