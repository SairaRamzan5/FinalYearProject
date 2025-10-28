import { useState, useEffect } from "react";
import axios from "axios";
import BookingCard from "./BookingCard.jsx";
import { FiX } from "react-icons/fi";

// ✅ Reusable Toast Component
const Toast = ({ message, type, onClose }) => {
  if (!message) return null;

  return (
    <div
      className={`fixed top-5 right-5 px-4 py-2 rounded-lg shadow-lg text-white z-[1000] transition-all duration-300
        ${type === "success" ? "bg-green-600" : "bg-red-600"}`}
    >
      <div className="flex items-center gap-2">
        <span>{message}</span>
        <button onClick={onClose} className="ml-2 font-bold">×</button>
      </div>
    </div>
  );
};

const SOSComplaint = () => {
  const [openReport, setOpenReport] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ✅ Confirmation modal state
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  // ✅ Toast state
  const [toast, setToast] = useState({ message: "", type: "" });

  const Base_Url = import.meta.env.VITE_API_URL;

  // ✅ Auto-fill customerName + CNIC from backend
  const [customerName, setCustomerName] = useState("");
  const [cnic, setCnic] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${Base_Url}/api/getuser`, {
          withCredentials: true,
        });

        if (res.data && res.data.userdata) {
          setCustomerName(res.data.userdata.ownerName || "");
          setCnic(res.data.userdata.cnic || "");
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchUser();
  }, []);

  // ✅ Fetch only current bookings
  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get(`${Base_Url}/api/bookcar/my-bookings`, {
        withCredentials: true,
      });

      const allBookings = res.data || [];
      const now = new Date();

      // Filter sirf current (active) bookings
      const currentBookings = allBookings.filter((booking) => {
        const start = new Date(`${booking.rentalStartDate} ${booking.rentalStartTime}`);
        const end = new Date(`${booking.rentalEndDate} ${booking.rentalEndTime}`);
        return now >= start && now <= end;
      });

      setBookings(currentBookings);
    } catch (err) {
      console.error("Failed to load bookings:", err);
      setError("Failed to load bookings.");
    } finally {
      setLoading(false);
    }
  };

  const prepareReportData = (booking) => {
    const carBrand =
      booking.carDetails?.carBrand ||
      booking.car?.carBrand ||
      booking.car?.brand ||
      booking.carName ||
      booking.car?.name ||
      "Unknown Brand";

    const carModel =
      booking.carDetails?.carModel ||
      booking.car?.carModel ||
      booking.car?.model ||
      booking.carModel ||
      "";

    const carFullName = `${carBrand}${carModel ? " " + carModel : ""}`.trim();

    // ✅ ADDED: Plate Number
    const plateNumber =
      booking.carDetails?.plateNumber ||
      booking.car?.plateNumber ||
      booking.plateNumber ||
      "N/A";

    const showroomName =
      booking.showroomDetails?.showroomName ||
      booking.showroom?.name ||
      booking.showroomName ||
      "Unknown Showroom";

    const rentalStart = booking.rentalStartDate || booking.startDate || booking.from || "N/A";
    const rentalEnd = booking.rentalEndDate || booking.endDate || booking.to || "N/A";

    return {
      bookingId: booking._id,
      car: { 
        name: carFullName,
        plateNumber: plateNumber
      },
      showroom: { name: showroomName },
      rental: { start: rentalStart, end: rentalEnd },
    };
  };

  // When card is clicked, show confirmation modal and CLOSE bookings modal
  const handleCardClick = (booking) => {
    setSelectedBooking(booking);
    setConfirmationOpen(true);
    setOpenReport(false); // Close the active bookings modal
  };

  // 🚨 CONFIRM AND SUBMIT REPORT
  const handleConfirmReport = async () => {
    if (!selectedBooking || !customerName || !cnic) {
      setToast({ message: "⚠ User information not found. Please try again.", type: "error" });
      setConfirmationOpen(false);
      return;
    }

    try {
      const reportData = prepareReportData(selectedBooking);
      
      const payload = {
        customerName,
        cnic,
        rentalDetails: {
          carName: reportData.car.name,
          plateNumber: reportData.car.plateNumber,
          rentalStartDate: reportData.rental.start,
          rentalEndDate: reportData.rental.end,
          showroomName: reportData.showroom.name,
        },
      };

      await axios.post(`${Base_Url}/api/theft-report`, payload, {
        withCredentials: true,
      });

      setToast({ 
        message: "🚨 Theft report submitted successfully! Showroom has been notified.", 
        type: "success" 
      });

      // Close confirmation modal after successful submission
      setConfirmationOpen(false);
      setSelectedBooking(null);
      
    } catch (err) {
      console.error("Error submitting report:", err);
      setToast({ 
        message: "❌ Failed to submit theft report. Please try again.", 
        type: "error" 
      });
      setConfirmationOpen(false);
    }
  };

  // Cancel the report - reopen bookings modal
  const handleCancelReport = () => {
    setConfirmationOpen(false);
    setSelectedBooking(null);
    setOpenReport(true); // Reopen the active bookings modal
  };

  // ✅ Auto-hide toast after 3s
  useEffect(() => {
    if (toast.message) {
      const timer = setTimeout(() => setToast({ message: "", type: "" }), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  return (
    <div>
      {/* Toast Notification */}
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: "", type: "" })}
      />

      {/* SOS Button */}
      <button
        className="bg-red-600 hover:bg-red-700 text-white text-2xl font-bold w-24 h-24 rounded-full shadow-xl flex items-center justify-center transition-transform hover:scale-105"
        onClick={() => {
          setOpenReport(true);
          fetchBookings();
        }}
        title="SOS - Report Vehicle Theft"
      >
        🚨
      </button>

      {/* Current Bookings Modal */}
      {openReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start overflow-y-auto p-6 z-50">
          <div className="bg-white rounded-2xl shadow-2xl relative w-full max-w-6xl p-6">
            <button
              onClick={() => setOpenReport(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition p-2 rounded-full hover:bg-gray-100"
            >
              <FiX className="text-2xl" />
            </button>

            <h2 className="text-3xl font-bold text-center text-[#C17D3C] mb-2">
               Report Car Theft
            </h2>
            <p className="text-center text-gray-600 mb-6">
              Select the Car you want to report as stolen
            </p>

            {loading ? (
              <div className="text-center py-8">
                <p className="text-gray-600 text-lg">Loading your current bookings...</p>
              </div>
            ) : error ? (
              <div className="text-center py-8">
                <p className="text-red-600">{error}</p>
              </div>
            ) : bookings.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600 text-lg">🚘 No active bookings found.</p>
                <p className="text-gray-500 text-sm mt-2">You don't have any currently rented Cars.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {bookings.map((booking) => (
                  <div
                    key={booking._id}
                    className="cursor-pointer transform transition-transform hover:scale-105"
                    onClick={() => handleCardClick(booking)}
                    role="button"
                    tabIndex={0}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        handleCardClick(booking);
                      }
                    }}
                  >
                    <BookingCard booking={booking} />
                    {/* <div className="mt-2 text-center">
                      <span className="text-red-600 text-sm font-medium">
                        🚨 Click to Report Theft
                      </span>
                    </div> */}
                  </div>
                ))}
              </div>
            )}

            {/* Instructions */}
            {bookings.length > 0 && (
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-yellow-800 text-sm text-center">
                  <strong>Note:</strong> Clicking on a Car will open a confirmation dialog to submit the theft report.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {confirmationOpen && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-6 z-60">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
            <h3 className="text-xl font-bold mb-4 text-[#C17D3C]"> Confirm Theft Report</h3>
            
            <div className="mb-6">
              <p className="text-gray-700 mb-4">
                Are you sure you want to report this vehicle as stolen? This action will immediately notify the showroom.
              </p>
              
              <div className=" border text-gray-700 rounded-lg p-4">
                <p className="font-semibold text-gray-800">
                  {prepareReportData(selectedBooking).car.name}
                </p>
                <p className="text-sm text-gray-700 mt-1">
                  Plate: {prepareReportData(selectedBooking).car.plateNumber}
                </p>
                <p className="text-sm text-gray-700">
                  Showroom: {prepareReportData(selectedBooking).showroom.name}
                </p>
              </div>
              
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-yellow-800 text-sm">
                  <strong>Warning:</strong> This is a serious action. Only report if the vehicle is actually stolen.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={handleCancelReport}
                className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReport}
                className="px-4 py-2 rounded-lg bg-[#C17D3C] transition-colors font-medium text-white"
              >
                Send Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SOSComplaint;