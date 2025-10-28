import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Toast from "../Toast";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { FileText, User, Paperclip, X } from "lucide-react";
import { Link } from "react-router-dom"; // ✅ ADD THIS IMPORT

const Base_Url = import.meta.env.VITE_API_URL;

function CustomerComplaints() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [showComplaintModal, setShowComplaintModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [complaintForm, setComplaintForm] = useState({
    compl_Against: "", // ✅ Must match backend exactly
    description: "",   // ✅ Must match backend exactly
    proof: null,       // ✅ Must match backend exactly
  });
  const [errors, setErrors] = useState({});
  const [userData, setUserData] = useState({
    email: "",
    contact: ""
  });

  // ✅ Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${Base_Url}/api/getuser`, {
          withCredentials: true,
        });
        if (res.data && res.data.userdata) {
          setUserData({
            contact: res.data.userdata.contactNumber || "",
            email: res.data.userdata.email || "",
          });
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };
    fetchUser();
  }, []);

  // ✅ Fetch user bookings
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(`${Base_Url}/api/bookcar/my-bookings`, {
          withCredentials: true,
        });
        setBookings(res.data || []);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };
    fetchBookings();
  }, []);

  const validateComplaintField = (name, value) => {
    let error = "";
    switch (name) {
      case "compl_Against":
        if (!value.trim()) error = "Please select a complaint type";
        break;
      case "description":
        if (!value.trim()) error = "Description is required";
        break;
      case "proof":
        if (!value) error = "Please attach a proof file";
        break;
      default:
        break;
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
    return !error;
  };

  const handleComplaintChange = (e) => {
    const { name, value, files } = e.target;
    const fieldValue = name === "proof" ? files[0] : value;
    setComplaintForm((prev) => ({ ...prev, [name]: fieldValue }));
    validateComplaintField(name, fieldValue);
  };

  const handleBookingSelect = (booking) => {
    setSelectedBooking(booking);
    setShowComplaintModal(true);
    // Reset complaint form when opening modal
    setComplaintForm({
      compl_Against: "",
      description: "",
      proof: null,
    });
    setErrors({});
  };

  const handleCloseModal = () => {
    setShowComplaintModal(false);
    setSelectedBooking(null);
    setComplaintForm({
      compl_Against: "",
      description: "",
      proof: null,
    });
    setErrors({});
  };

  const handleSubmitComplaint = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate complaint fields
    const requiredFields = ["compl_Against", "description", "proof"];
    let isValid = true;
    
    requiredFields.forEach((field) => {
      if (!validateComplaintField(field, complaintForm[field])) isValid = false;
    });

    if (!isValid) {
      Toast("Please fill all required fields", "error");
      setIsSubmitting(false);
      return;
    }

    // Check if user data is loaded
    if (!userData.email || !userData.contact) {
      Toast("User information not loaded. Please refresh the page.", "error");
      setIsSubmitting(false);
      return;
    }

    try {
      const formDataToSend = new FormData();
      
      // ✅ Append data with EXACT field names that backend expects
      formDataToSend.append("email", userData.email);
      formDataToSend.append("contact", userData.contact);
      formDataToSend.append("compl_Against", complaintForm.compl_Against);
      formDataToSend.append("description", complaintForm.description);
      formDataToSend.append("proof", complaintForm.proof);
      
      // Only append bookingId if it exists and is valid
      if (selectedBooking && selectedBooking._id) {
        formDataToSend.append("bookingId", selectedBooking._id);
      }

      console.log("📤 Submitting complaint with data:");
      console.log("Email:", userData.email);
      console.log("Contact:", userData.contact);
      console.log("Complaint Type:", complaintForm.compl_Against);
      console.log("Description:", complaintForm.description);
      console.log("Booking ID:", selectedBooking?._id);
      console.log("Proof File:", complaintForm.proof);

      // Log FormData contents for debugging
      for (let [key, value] of formDataToSend.entries()) {
        console.log(`${key}:`, value);
      }

      const response = await axios.post(
        `${Base_Url}/api/complaints`,
        formDataToSend,
        {
          headers: { 
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      console.log("✅ Response:", response.data);

      if (response.status === 201) {
        Toast("Complaint submitted successfully", "success");
        handleCloseModal();
      }
    } catch (error) {
      console.error("❌ Error submitting complaint:");
      console.error("Full error:", error);
      console.error("Response data:", error.response?.data);
      console.error("Response status:", error.response?.status);
      
      let errorMessage = "Failed to submit complaint";
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      Toast(errorMessage, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen py-16 background">
        <div className="w-screen h-fit max-w-4xl p-6 bg-gray-300 backdrop-blur-lg bg-white/30 border border-white/10 rounded-3xl shadow-lg">
          <h2 className="text-2xl font-bold text-[#02073F] text-center mb-6">
            Customer Complaint Form
          </h2>

          {/* Booking Selection Section */}
          <div className="mb-6">
            <label className="font-bold text-lg text-[#02073F] block mb-4">
              Select Booking to Complain About
            </label>
            
            {bookings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {bookings.map((booking) => {
                  const carName =
                    booking.carDetails?.carBrand ||
                    booking.car?.carBrand ||
                    booking.car?.brand ||
                    booking.carName ||
                    "Unknown Car";

                  const showroom =
                    booking.showroomDetails?.showroomName ||
                    booking.showroom?.name ||
                    "Unknown Showroom";

                  return (
                    <button
                      type="button"
                      key={booking._id}
                      onClick={() => handleBookingSelect(booking)}
                      className="p-4 bg-white border border-gray-300 rounded-lg hover:border-[#C17D3C] hover:bg-[#f7eadf] transition-all text-left"
                    >
                      <p className="font-semibold text-[#02073F] text-lg">
                        {carName}
                      </p>
                      <p className="text-gray-600 text-sm mt-1">
                        {showroom}
                      </p>
                      <p className="text-gray-500 text-xs mt-2">
                        {booking.rentalStartDate} → {booking.rentalEndDate}
                      </p>
                      <div className="mt-3">
                        <span className="inline-block bg-[#C17D3C] text-white text-xs px-3 py-1 rounded-full">
                          File Complaint
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 text-lg">
                  No active bookings found
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  You need to have a booking to file a complaint
                </p>
              </div>
            )}
          </div>

          {/* Additional Links Section */}
          <div className="mt-8 pt-6 border-t border-gray-300">
            <h3 className="text-lg font-semibold text-[#02073F] mb-3">Quick Links</h3>
            <div className="grid grid-cols-1 gap-2">
              {/* ✅ FIXED: Use React Router Link instead of anchor tag */}
              <Link 
                to="/customer/my-complaints" 
                className="text-[#C17D3C] hover:text-[#B06F35] transition-colors text-sm flex items-center"
              >
                📋 View My Complaints
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Complaint Modal */}
      {showComplaintModal && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-[#02073F]">
                File Complaint
              </h3>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {/* Selected Booking Info */}
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <p className="font-semibold text-[#02073F]">
                  {selectedBooking.carDetails?.carBrand || selectedBooking.car?.carBrand || "Car"}
                </p>
                <p className="text-sm text-gray-600">
                  {selectedBooking.showroomDetails?.showroomName || selectedBooking.showroom?.name || "Showroom"}
                </p>
                <p className="text-xs text-gray-500">
                  {selectedBooking.rentalStartDate} → {selectedBooking.rentalEndDate}
                </p>
              </div>

              <form onSubmit={handleSubmitComplaint} className="space-y-4">
                {/* Complaint Type - Field name must be "compl_Against" */}
                <div>
                  <label className="font-bold text-[#02073F]">Complaint Type *</label>
                  <div className="relative">
                    <select
                      name="compl_Against" // ✅ Exact backend field name
                      value={complaintForm.compl_Against}
                      onChange={handleComplaintChange}
                      className={`w-full px-4 py-2 border rounded-lg appearance-none focus:outline-none ${
                        errors.compl_Against
                          ? "border-red-500"
                          : "focus:ring-2 focus:ring-[#C17D3C]"
                      }`}
                    >
                      <option value="">Select Complaint Type</option>
                      <option value="Staff">Staff</option>
                      <option value="Service">Service</option>
                    </select>
                    <User
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                      size={18}
                    />
                  </div>
                  {errors.compl_Against && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.compl_Against}
                    </p>
                  )}
                </div>

                {/* Description - Field name must be "description" */}
                <div>
                  <label className="font-bold text-[#02073F]">Description *</label>
                  <div className="relative">
                    <textarea
                      name="description" // ✅ Exact backend field name
                      value={complaintForm.description}
                      onChange={handleComplaintChange}
                      placeholder="Please describe your complaint in detail..."
                      rows="4"
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
                        errors.description
                          ? "border-red-500"
                          : "focus:ring-2 focus:ring-[#C17D3C]"
                      }`}
                    />
                    <FileText
                      className="absolute right-3 top-3 text-gray-400"
                      size={18}
                    />
                  </div>
                  {errors.description && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.description}
                    </p>
                  )}
                </div>

                {/* Proof - Field name must be "proof" */}
                <div>
                  <label className="font-bold text-[#02073F]">Proof (Attachment) *</label>
                  <div className="relative">
                    <input
                      name="proof" // ✅ Exact backend field name
                      type="file"
                      accept="image/*,.pdf,.doc,.docx"
                      onChange={handleComplaintChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
                        errors.proof
                          ? "border-red-500"
                          : "focus:ring-2 focus:ring-[#C17D3C]"
                      }`}
                    />
                    <Paperclip
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                  </div>
                  {errors.proof && (
                    <p className="text-red-500 text-xs mt-1">{errors.proof}</p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    Supported formats: Images, PDF, Word documents
                  </p>
                </div>

                {/* Submit Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`flex-1 px-4 py-2 bg-[#C17D3C] text-white rounded-lg transition-colors ${
                      isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:bg-[#B06F35]"
                    }`}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Complaint"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default CustomerComplaints;

//Submission of complaints