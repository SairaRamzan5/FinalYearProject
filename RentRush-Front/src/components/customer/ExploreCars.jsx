import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Link } from "react-router-dom";

const Base_Url = import.meta.env.VITE_API_URL;

const ExploreCars = () => {
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // ✅ Use PUBLIC API call - no authentication needed
  const fetchVehicles = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await axios.get(`${Base_Url}/api/car/public/cars`);
      setCars(response.data.data); // Note: using response.data.data for the new structure
      console.log("Public cars data:", response.data.data);
    } catch (err) {
      console.log("Error fetching cars:", err);
      setError("Failed to load cars. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const filteredCars = cars
    .filter((car) =>
      `${car.carBrand} ${car.carModel} ${car.color} ${car.plateNumber || ''}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
    .filter((car) => car.availability === "Available"); // Only show available cars

  const handleBookNow = (carId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      // Redirect to login with return URL
      navigate('/login', { 
        state: { 
          from: `/booking/${carId}`,
          message: 'Please login to book this car'
        } 
      });
    } else {
      navigate(`/booking/${carId}`);
    }
  };

  const handleViewDetails = (carId) => {
    navigate(`/cars/${carId}`);
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 py-10 flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      
      {/* Page Background */}
      <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 py-10 pt-20">

        {/* Header Section */}
        <div className="max-w-7xl mx-auto text-center mb-8 px-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Explore Our Car Collection
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse our complete collection of rental cars. Sign in to book your favorite car instantly.
          </p>
          
          {/* Guest User Notice */}
          {!localStorage.getItem('token') && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4 max-w-2xl mx-auto">
              <p className="text-blue-800">
                🔒 <strong>Guest Access:</strong> You're browsing as a guest. Please login to book cars.
              </p>
            </div>
          )}
        </div>

        {/* Search Bar - Centered */}
        <div className="max-w-4xl mx-auto mb-8 px-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by brand, model, color, or plate number"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-gray-300 text-gray-700 py-3 pl-6 pr-12 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-5">
              <Search size={22} className="text-gray-500" />
            </div>
          </div>
        </div>

        {/* Login/Signup Buttons for Guest Users - Centered */}
        {!localStorage.getItem('token') && (
          <div className="max-w-7xl mx-auto flex justify-center mb-8 px-6">
            <div className="flex gap-4">
              <Link to="/login">
                <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-full shadow-md font-semibold transition-colors">
                  Login to Book
                </button>
              </Link>
              <Link to="/signup">
                <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-full shadow-md font-semibold transition-colors">
                  Sign Up
                </button>
              </Link>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="max-w-7xl mx-auto mb-6 px-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800">{error}</p>
              <button 
                onClick={fetchVehicles}
                className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Cars Grid */}
        <div className="bg-white mx-6 rounded-xl p-6 shadow-md">
          {filteredCars.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">  
              {filteredCars.map((car, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-200">
                  
                  {/* Car Image */}
                  <div className="relative h-48 bg-gray-200">
                    <img
                      src={car.images && car.images.length > 0 
                        ? `${Base_Url}/uploads/${car.images[0]}`
                        : '/src/assets/car-placeholder.jpg'
                      }
                      alt={`${car.carBrand} ${car.carModel}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = '/src/assets/car-placeholder.jpg';
                      }}
                    />
                    <div className="absolute top-3 right-3 text-white px-2 py-1 rounded-full text-xs font-semibold bg-green-500">
                      Available
                    </div>
                  </div>

                  {/* Car Details */}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {car.carBrand} {car.carModel}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-2">
                      {car.year} • {car.variant} • {car.color}
                    </p>

                    {car.plateNumber && (
                      <p className="text-gray-500 text-xs mb-2">
                        Plate: {car.plateNumber}
                      </p>
                    )}
                    
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl font-bold text-blue-600">
                        Rs {car.rentRate}/day
                      </span>
                    </div>

                    {/* Car Features */}
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-4">
                      <div>Fuel: {car.fuelType}</div>
                      <div>Seats: {car.seatCapacity}</div>
                      <div>{car.transmission}</div>
                      <div>{car.bodyType}</div>
                    </div>

                    {/* Showroom Info */}
                    {car.userId && (
                      <div className="border-t pt-3 mb-4">
                        <div className="text-sm text-gray-600">
                          <span className="font-medium">{car.userId.showroomName}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{car.userId.address}</p>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleBookNow(car._id)}
                        className="flex-1 bg-[#C17D3C] text-white py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300"
                      >
                        Book Now
                      </button>
                    </div>
                    
                    {/* Guest User Message */}
                    {!localStorage.getItem('token') && (
                      <p className="text-xs text-gray-500 text-center mt-2">
                        Sign in required to book
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🚗</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                {searchTerm 
                  ? "No available cars found matching your search"
                  : "No available cars found"
                }
              </h3>
              <p className="text-gray-500">
                {searchTerm 
                  ? `No available cars found for "${searchTerm}". Try different search terms.`
                  : "All cars are currently rented out. Please check back later."
                }
              </p>
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  Clear Search
                </button>
              )}
            </div>
          )}
        </div>

      </div>

      <Footer />
    </>
  );
};

export default ExploreCars;