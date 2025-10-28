// components/guest/CarDetails.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Base_Url = import.meta.env.VITE_API_URL;

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCarDetails();
  }, [id]);

  const fetchCarDetails = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await axios.get(`${Base_Url}/api/car/public/cars/${id}`);
      setCar(response.data.data);
    } catch (err) {
      console.log("Error fetching car details:", err);
      setError("Failed to load car details. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleBookNow = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login', { 
        state: { 
          from: `/cars/${id}`,
          message: 'Please login to book this car'
        } 
      });
    } else {
      navigate(`/booking/${id}`);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-100 py-10 pt-20 flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-100 py-10 pt-20 flex items-center justify-center">
          <div className="text-center">
            <div className="text-red-500 text-xl mb-4">{error}</div>
            <button 
              onClick={fetchCarDetails}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </>
    );
  }

  if (!car) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-100 py-10 pt-20 flex items-center justify-center">
          <div className="text-center">
            <div className="text-xl text-gray-700 mb-4">Car not found</div>
            <Link to="/cars" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Back to Cars
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 py-10 pt-20">
        <div className="max-w-6xl mx-auto px-6">
          {/* Guest Notice */}
          {!localStorage.getItem('token') && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-blue-800 text-center">
                🔒 You're viewing as a guest. Please login to book this car.
              </p>
            </div>
          )}

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="md:flex">
              {/* Car Images */}
              <div className="md:w-1/2">
                {car.images && car.images.length > 0 ? (
                  <img 
                    src={`${Base_Url}/uploads/${car.images[0]}`}
                    alt={`${car.carBrand} ${car.carModel}`}
                    className="w-full h-96 object-cover"
                  />
                ) : (
                  <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">No Image Available</span>
                  </div>
                )}
              </div>

              {/* Car Details */}
              <div className="md:w-1/2 p-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {car.carBrand} {car.carModel} ({car.year})
                </h1>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <strong>Variant:</strong>
                    <p>{car.variant}</p>
                  </div>
                  <div>
                    <strong>Color:</strong>
                    <p>{car.color}</p>
                  </div>
                  <div>
                    <strong>Fuel Type:</strong>
                    <p>{car.fuelType}</p>
                  </div>
                  <div>
                    <strong>Transmission:</strong>
                    <p>{car.transmission}</p>
                  </div>
                  <div>
                    <strong>Body Type:</strong>
                    <p>{car.bodyType}</p>
                  </div>
                  <div>
                    <strong>Seat Capacity:</strong>
                    <p>{car.seatCapacity}</p>
                  </div>
                  <div>
                    <strong>Mileage:</strong>
                    <p>{car.mileage} km/l</p>
                  </div>
                  <div>
                    <strong>Plate Number:</strong>
                    <p>{car.plateNumber}</p>
                  </div>
                </div>

                {/* Features */}
                {car.carFeatures && car.carFeatures.length > 0 && (
                  <div className="mb-6">
                    <strong>Features:</strong>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {car.carFeatures.map((feature, index) => (
                        <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Showroom Info */}
                {car.userId && (
                  <div className="border-t pt-4 mb-6">
                    <h3 className="font-semibold mb-2">Showroom Information</h3>
                    <p><strong>Name:</strong> {car.userId.showroomName}</p>
                    <p><strong>Owner:</strong> {car.userId.ownerName}</p>
                    <p><strong>Address:</strong> {car.userId.address}</p>
                  </div>
                )}

                {/* Price and Booking */}
                <div className="border-t pt-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-3xl font-bold text-green-600">
                        Rs {car.rentRate} / day
                      </p>
                      <p className="text-gray-600">Rental Rate</p>
                    </div>
                    <button
                      onClick={handleBookNow}
                      className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition text-lg font-semibold"
                    >
                      {localStorage.getItem('token') ? 'Book Now' : 'Login to Book'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CarDetails;