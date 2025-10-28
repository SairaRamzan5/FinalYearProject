import axios from "axios";
import React, { useEffect, useState } from "react";
import Toast from "../Toast";
import CarCard from "./carCard";
import PaymentReceivedDialog from "./PaymentReceivedDialog";
import ShowroomNavbar from "./ShowroomNavbar";

const Base_Url = import.meta.env.VITE_API_URL || "http://localhost:5000";

const PaymentsPage = () => {
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);
  const [cars, setCars] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${Base_Url}/api/car/get-all-payment-cars`,
        {
          withCredentials: true,
        }
      );
      setCars(response.data);
    } catch (err) {
      console.error(err);
      Toast(
        err.response?.data?.message || err.message || "Something went wrong",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const handlePaymentReceivedCarSelect = (car) => {
    if (car.rentalInfo && car.rentalInfo._id) {
      setSelectedBooking(car.rentalInfo._id);
      setSelectedCar(car);
    } else {
      Toast("No booking information found for this car", "error");
    }
  };

  const handleClosePaymentReceivedSelectedCar = () => {
    setSelectedBooking(null);
    setSelectedCar(null);
    fetchVehicles(); // Refresh the list after payment
  };

  const handlePaymentSuccess = () => {
    fetchVehicles(); // Refresh the list when payment is successful
  };

  const filterCarsByStatus = (cars) => {
    return cars?.filter(
      (car) => car.rentalInfo?.status === "pending payment"
    );
  };

  const filteredCars = filterCarsByStatus(cars);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C17D3C] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading payment records...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <ShowroomNavbar />
      <div className="p-8 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 min-h-screen">
        <h2 className="text-3xl font-bold text-center mb-8 text-[#0B132A]">
          Pending Car Payments
        </h2>

        {filteredCars && filteredCars.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 p-3 justify-items-center">
            {filteredCars.map((car) => (
              <div
                key={car._id}
                onClick={() => handlePaymentReceivedCarSelect(car)}
                className="cursor-pointer"
              >
                <CarCard car={car} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No pending payments found.</p>
          </div>
        )}

        {selectedBooking && (
          <PaymentReceivedDialog
            bookingId={selectedBooking}
            carData={selectedCar}
            onClose={handleClosePaymentReceivedSelectedCar}
            onPaymentSuccess={handlePaymentSuccess}
          />
        )}
      </div>
    </>
  );
};

export default PaymentsPage;