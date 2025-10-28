import React from "react";
import TestContainer from "./TestContainer";

function Variety() {
  return (
    <div id="testimonials" className="bg-white py-12">
      <h1 className="text-3xl text-center font-bold">
        Trusted by Thousands of Happy Customers
      </h1>
      <p className="text-lg text-center mt-2">
        “RentRush is proud to be trusted by thousands of satisfied customers,
        ensuring quality and reliability in every rental.”
      </p>
      <TestContainer />
    </div>
  );
}

export default Variety;
