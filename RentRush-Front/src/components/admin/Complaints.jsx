// import { useEffect, useState } from "react";
// import axios from "axios";

// const Base_Url = import.meta.env.VITE_API_URL || "http://localhost:5000";

// const Complaints = () => {
//   const [complaints, setComplaints] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedComplaint, setSelectedComplaint] = useState(null);
//   const [selectedBooking, setSelectedBooking] = useState(null);
//   const [filter, setFilter] = useState("all");

//   // Fetch complaints
//   const fetchComplaints = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get(`${Base_Url}/api/complaints/all`, {
//         withCredentials: true,
//       });

//       if (response.data.success) {
//         const complaintsData = response.data.complaints || [];
//         setComplaints(complaintsData);
//       } else {
//         setComplaints([]);
//       }
//     } catch (err) {
//       console.error("Error fetching complaints:", err);
//       setComplaints([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch booking details
//   const fetchBookingDetails = async (bookingId) => {
//     try {
//       const response = await axios.get(
//         `${Base_Url}/api/bookcar/my-bookings/${bookingId}`,
//         { withCredentials: true }
//       );
      
//       if (response.data.success) {
//         setSelectedBooking(response.data.booking || response.data);
//       } else {
//         // Try alternative endpoint
//         const altResponse = await axios.get(
//           `${Base_Url}/api/bookcar/bookings/${bookingId}`,
//           { withCredentials: true }
//         );
//         if (altResponse.data.success) {
//           setSelectedBooking(altResponse.data.booking || altResponse.data);
//         }
//       }
//     } catch (error) {
//       console.error("Error fetching booking details:", error);
//       setSelectedBooking({ error: "Could not fetch booking details" });
//     }
//   };

//   // Mark complaint as resolved
//   const resolveComplaint = async (id) => {
//     try {
//       const response = await axios.put(
//         `${Base_Url}/api/complaints/${id}/resolve`,
//         {},
//         { withCredentials: true }
//       );

//       if (response.data.success) {
//         alert("Complaint resolved successfully!");
//         fetchComplaints(); // Refresh list
//       } else {
//         alert("Failed to resolve complaint.");
//       }
//     } catch (err) {
//       console.error("Error resolving complaint:", err);
//       alert("Something went wrong.");
//     }
//   };

//   useEffect(() => {
//     fetchComplaints();
//   }, []);

//   // Counts
//   const total = complaints.length;
//   const resolved = complaints.filter((c) => c.resolved).length;
//   const pending = total - resolved;

//   // Filter complaints
//   const filteredComplaints = complaints.filter((c) => {
//     if (filter === "resolved") return c.resolved;
//     if (filter === "pending") return !c.resolved;
//     return true; // all
//   });

//   // Extract car name from booking data
//   const getCarName = (booking) => {
//     if (!booking) return "Unknown Car";
//     return booking.carDetails?.carBrand ||
//            booking.car?.carBrand ||
//            booking.car?.brand ||
//            booking.carName ||
//            booking.carDetails?.carName ||
//            booking.car?.name ||
//            "Unknown Car";
//   };

//   // Extract showroom name from booking data
//   const getShowroomName = (booking) => {
//     if (!booking) return "Unknown Showroom";
//     return booking.showroomDetails?.showroomName ||
//            booking.showroom?.name ||
//            booking.showroomDetails?.name ||
//            booking.showroomName ||
//            "Unknown Showroom";
//   };

//   return (
//     <div className="bg-white shadow rounded-xl p-6">
//       <h2 className="text-2xl font-bold text-[#394A9A] mb-4">
//         Customer Complaints
//       </h2>

//       {/* Stats Cards with onClick filter */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//         <div
//           onClick={() => setFilter("all")}
//           className={`cursor-pointer p-4 rounded-lg shadow text-center ${
//             filter === "all"
//               ? "bg-blue-600 text-white"
//               : "bg-blue-100 text-blue-800"
//           }`}
//         >
//           <h3 className="text-lg font-semibold">Total Complaints</h3>
//           <p className="text-2xl font-bold">{total}</p>
//         </div>

//         <div
//           onClick={() => setFilter("resolved")}
//           className={`cursor-pointer p-4 rounded-lg shadow text-center ${
//             filter === "resolved"
//               ? "bg-green-600 text-white"
//               : "bg-green-100 text-green-800"
//           }`}
//         >
//           <h3 className="text-lg font-semibold">Resolved</h3>
//           <p className="text-2xl font-bold">{resolved}</p>
//         </div>

//         <div
//           onClick={() => setFilter("pending")}
//           className={`cursor-pointer p-4 rounded-lg shadow text-center ${
//             filter === "pending"
//               ? "bg-red-600 text-white"
//               : "bg-red-100 text-red-800"
//           }`}
//         >
//           <h3 className="text-lg font-semibold">Pending</h3>
//           <p className="text-2xl font-bold">{pending}</p>
//         </div>
//       </div>

//       {loading ? (
//         <p>Loading complaints...</p>
//       ) : filteredComplaints.length === 0 ? (
//         <p className="text-gray-500">No complaints found.</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="w-full border border-gray-200">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="px-4 py-2 border">Email</th>
//                 <th className="px-4 py-2 border">Contact</th>
//                 <th className="px-4 py-2 border">Against</th>
//                 <th className="px-4 py-2 border">Description</th>
//                 <th className="px-4 py-2 border">Proof</th>
//                 <th className="px-4 py-2 border">Status</th>
//                 <th className="px-4 py-2 border">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredComplaints.map((c) => (
//                 <tr key={c._id} className="text-center">
//                   <td className="px-4 py-2 border">{c.email}</td>
//                   <td className="px-4 py-2 border">{c.contact || "N/A"}</td>
//                   <td className="px-4 py-2 border">{c.compl_Against}</td>
//                   <td className="px-4 py-2 border max-w-xs truncate">
//                     {c.description}
//                   </td>
//                   <td className="px-4 py-2 border">
//                     {c.proof ? (
//                       <button
//                         onClick={() => setSelectedComplaint(c)}
//                         className="text-blue-600 underline hover:text-blue-800"
//                       >
//                         View Details
//                       </button>
//                     ) : (
//                       "No Proof"
//                     )}
//                   </td>
//                   <td className="px-4 py-2 border">
//                     {c.resolved ? (
//                       <span className="text-green-600 font-semibold">
//                         Resolved
//                       </span>
//                     ) : (
//                       <span className="text-red-600 font-semibold">Pending</span>
//                     )}
//                   </td>
//                   <td className="px-4 py-2 border">
//                     {!c.resolved && (
//                       <button
//                         onClick={() => resolveComplaint(c._id)}
//                         className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
//                       >
//                         Resolve
//                       </button>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* Popup Modal for Proof and Booking Details Only */}
//       {selectedComplaint && (
//         <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
//           <div className="relative bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-2xl max-h-[90vh] overflow-y-auto">
//             <button
//               onClick={() => setSelectedComplaint(null)}
//               className="absolute top-2 right-2 text-gray-600 hover:text-black text-2xl"
//             >
//               ✖
//             </button>

//             <h3 className="text-xl font-bold mb-4 text-[#394A9A]">
//               Proof Attachment
//             </h3>

//             {selectedComplaint.proof && (
//               <div className="flex flex-col items-center">
//                 {/* Proof Image */}
//                 <img
//                   src={`${Base_Url}/uploads/complaints/${selectedComplaint.proof}`}
//                   alt="Proof"
//                   className="max-w-full max-h-96 rounded-lg border shadow-md mb-6"
//                 />
                
//                 {/* Booking Details Section - Only show if booking exists */}
//                 {selectedComplaint.bookingId && (
//                   <div className="w-full bg-gray-50 p-4 rounded-lg border">
//                     <h4 className="font-semibold text-lg mb-3 text-[#394A9A] text-center">
//                       Associated Booking Details
//                     </h4>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div>
//                         <p className="text-sm"><strong>Booking ID:</strong> {typeof selectedComplaint.bookingId === 'object' 
//                           ? selectedComplaint.bookingId._id 
//                           : selectedComplaint.bookingId}
//                         </p>
//                         {typeof selectedComplaint.bookingId === 'object' && (
//                           <>
//                             <p className="text-sm"><strong>Car:</strong> {selectedComplaint.bookingId.carName || "N/A"}</p>
//                             <p className="text-sm"><strong>Showroom:</strong> {selectedComplaint.bookingId.showroomName || "N/A"}</p>
//                           </>
//                         )}
//                       </div>
//                       <div>
//                         {typeof selectedComplaint.bookingId === 'object' && (
//                           <>
//                             <p className="text-sm"><strong>Start Date:</strong> {selectedComplaint.bookingId.startDate || "N/A"}</p>
//                             <p className="text-sm"><strong>End Date:</strong> {selectedComplaint.bookingId.endDate || "N/A"}</p>
//                             <p className="text-sm"><strong>Status:</strong> {selectedComplaint.bookingId.status || "N/A"}</p>
//                           </>
//                         )}
//                       </div>
//                     </div>
                    
                  
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Popup Modal for Full Booking Details */}
//       {selectedBooking && (
//         <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
//           <div className="relative bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-2xl max-h-[90vh] overflow-y-auto">
//             <button
//               onClick={() => setSelectedBooking(null)}
//               className="absolute top-2 right-2 text-gray-600 hover:text-black text-2xl"
//             >
//               ✖
//             </button>

//             <h3 className="text-xl font-bold mb-4 text-[#394A9A]">
//               Booking Details
//             </h3>

//             {selectedBooking.error ? (
//               <div className="bg-red-50 p-4 rounded-lg">
//                 <p className="text-red-600">{selectedBooking.error}</p>
//               </div>
//             ) : (
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div className="bg-gray-50 p-4 rounded-lg">
//                   <h4 className="font-semibold text-lg mb-3 text-[#394A9A]">Car Information</h4>
//                   <div className="space-y-2">
//                     <p><strong>Car:</strong> {getCarName(selectedBooking)}</p>
//                     <p><strong>Showroom:</strong> {getShowroomName(selectedBooking)}</p>
//                     <p><strong>Booking ID:</strong> {selectedBooking._id}</p>
//                   </div>
//                 </div>

//                 <div className="bg-gray-50 p-4 rounded-lg">
//                   <h4 className="font-semibold text-lg mb-3 text-[#394A9A]">Rental Information</h4>
//                   <div className="space-y-2">
//                     <p><strong>Start Date:</strong> {selectedBooking.rentalStartDate || selectedBooking.startDate || "N/A"}</p>
//                     <p><strong>End Date:</strong> {selectedBooking.rentalEndDate || selectedBooking.endDate || "N/A"}</p>
//                     <p><strong>Total Amount:</strong> ${selectedBooking.totalAmount || selectedBooking.amount || "N/A"}</p>
//                     <p><strong>Status:</strong> {selectedBooking.status || "N/A"}</p>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Complaints;

// components/Complaints.js (Admin View)
import { useEffect, useState } from "react";
import axios from "axios";

const Base_Url = import.meta.env.VITE_API_URL || "http://localhost:5000";

const Complaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [filter, setFilter] = useState("all");
  const [stats, setStats] = useState({
    total: 0,
    resolved: 0,
    pending: 0
  });

  // Fetch complaints with detailed booking information
  const fetchComplaints = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${Base_Url}/api/complaints/all`, {
        withCredentials: true,
      });

      if (response.data.success) {
        const complaintsData = response.data.complaints || [];
        console.log("📋 Complaints received from backend:", complaintsData);
        
        // Debug each complaint
        complaintsData.forEach((complaint, index) => {
          console.log(`🔍 Complaint ${index + 1} Details:`, {
            id: complaint._id,
            email: complaint.email,
            contact: complaint.contact,
            type: complaint.compl_Against,
            description: complaint.description,
            proof: complaint.proof,
            hasBooking: !!complaint.bookingId,
            booking: complaint.bookingId ? {
              car: complaint.bookingId.carId,
              user: complaint.bookingId.userId,
              showroom: complaint.bookingId.showroomId,
              dates: `${complaint.bookingId.rentalStartDate} to ${complaint.bookingId.rentalEndDate}`,
              price: complaint.bookingId.totalPrice
            } : 'No booking data'
          });
        });

        setComplaints(complaintsData);
        
        // Calculate stats
        const total = complaintsData.length;
        const resolved = complaintsData.filter(c => c.resolved).length;
        const pending = total - resolved;
        
        setStats({ total, resolved, pending });
      } else {
        console.log("❌ No complaints found or API error");
        setComplaints([]);
      }
    } catch (err) {
      console.error("❌ Error fetching complaints:", err);
      console.error("Error details:", err.response?.data);
      setComplaints([]);
    } finally {
      setLoading(false);
    }
  };

  // Mark complaint as resolved
  const resolveComplaint = async (id) => {
    try {
      const response = await axios.put(
        `${Base_Url}/api/complaints/${id}/resolve`,
        {},
        { withCredentials: true }
      );

      if (response.data.success) {
        alert("Complaint resolved successfully!");
        fetchComplaints(); // Refresh list
        if (selectedComplaint && selectedComplaint._id === id) {
          setSelectedComplaint(response.data.complaint);
        }
      } else {
        alert("Failed to resolve complaint.");
      }
    } catch (err) {
      console.error("Error resolving complaint:", err);
      alert("Something went wrong.");
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  // Filter complaints
  const filteredComplaints = complaints.filter((c) => {
    if (filter === "resolved") return c.resolved;
    if (filter === "pending") return !c.resolved;
    return true; // all
  });

  // ✅ FIXED: Extract car details - handles all scenarios
  const getCarDetails = (complaint) => {
    // If complaint has booking and car data
    if (complaint.bookingId && complaint.bookingId.carId) {
      const car = complaint.bookingId.carId;
      const brand = car.carBrand || "";
      const model = car.carModel || "";
      const year = car.year || "";
      
      const carInfo = `${brand} ${model} ${year}`.trim();
      return carInfo || "Car details available but incomplete";
    }
    
    // If no booking data but complaint exists
    return "No car information (Direct complaint)";
  };

  // ✅ FIXED: Extract customer details
  const getCustomerDetails = (complaint) => {
    // From booking user data
    if (complaint.bookingId && complaint.bookingId.userId) {
      const user = complaint.bookingId.userId;
      return user.name || user.email || "Customer from booking";
    }
    
    // From complaint data (what customer actually submitted)
    return complaint.email || "Unknown Customer";
  };

  // ✅ FIXED: Extract customer contact
  const getCustomerContact = (complaint) => {
    // From booking user data
    if (complaint.bookingId && complaint.bookingId.userId) {
      return complaint.bookingId.userId.contactNumber || "N/A";
    }
    
    // From complaint data (what customer actually submitted)
    return complaint.contact || "N/A";
  };

  // ✅ FIXED: Extract showroom details
  const getShowroomDetails = (complaint) => {
    if (complaint.bookingId && complaint.bookingId.showroomId) {
      const showroom = complaint.bookingId.showroomId;
      return showroom.showroomName || showroom.name || "Showroom details available";
    }
    return "No showroom information";
  };

  // ✅ FIXED: Extract car plate number
  const getCarPlateNumber = (complaint) => {
    if (complaint.bookingId && complaint.bookingId.carId) {
      return complaint.bookingId.carId.plateNumber || "N/A";
    }
    return "N/A";
  };

  // ✅ FIXED: Extract car rent rate
  const getCarRentRate = (complaint) => {
    if (complaint.bookingId && complaint.bookingId.carId) {
      return complaint.bookingId.carId.rentRate || "N/A";
    }
    return "N/A";
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Format currency
  const formatCurrency = (amount) => {
    if (!amount || isNaN(amount)) return "Rs 0";
    return `Rs ${amount}`;
  };

  // Check if complaint has booking data
  const hasBookingData = (complaint) => {
    return complaint.bookingId && complaint.bookingId._id;
  };

  return (
    <div className="bg-white shadow rounded-xl p-6">
      <h2 className="text-2xl font-bold text-[#394A9A] mb-6">
        Customer Complaints Management
      </h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div
          onClick={() => setFilter("all")}
          className={`cursor-pointer p-4 rounded-lg shadow text-center transition-all ${
            filter === "all"
              ? "bg-blue-600 text-white transform scale-105"
              : "bg-blue-100 text-blue-800 hover:bg-blue-200"
          }`}
        >
          <h3 className="text-lg font-semibold">Total Complaints</h3>
          <p className="text-2xl font-bold">{stats.total}</p>
        </div>

        <div
          onClick={() => setFilter("resolved")}
          className={`cursor-pointer p-4 rounded-lg shadow text-center transition-all ${
            filter === "resolved"
              ? "bg-green-600 text-white transform scale-105"
              : "bg-green-100 text-green-800 hover:bg-green-200"
          }`}
        >
          <h3 className="text-lg font-semibold">Resolved</h3>
          <p className="text-2xl font-bold">{stats.resolved}</p>
        </div>

        <div
          onClick={() => setFilter("pending")}
          className={`cursor-pointer p-4 rounded-lg shadow text-center transition-all ${
            filter === "pending"
              ? "bg-red-600 text-white transform scale-105"
              : "bg-red-100 text-red-800 hover:bg-red-200"
          }`}
        >
          <h3 className="text-lg font-semibold">Pending</h3>
          <p className="text-2xl font-bold">{stats.pending}</p>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-500 mt-2">Loading complaints...</p>
        </div>
      ) : filteredComplaints.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 text-lg">No complaints found.</p>
          <p className="text-gray-400 text-sm mt-1">
            {filter !== "all" ? `No ${filter} complaints` : "No complaints in the system"}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 border text-left">Customer</th>
                {/* <th className="px-4 py-3 border text-left">Contact</th> */}
                <th className="px-4 py-3 border text-left">Complaint Type</th>
                <th className="px-4 py-3 border text-left">Car</th>
                <th className="px-4 py-3 border text-left">Showroom</th>
                <th className="px-4 py-3 border text-left">Date</th>
                <th className="px-4 py-3 border text-center">Status</th>
                <th className="px-4 py-3 border text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredComplaints.map((complaint) => (
                <tr key={complaint._id} className="hover:bg-gray-50 border-b">
                  <td className="px-4 py-3">
                    <div>
                      <div className="font-medium text-gray-900">
                        {complaint.email} {/* Show actual email from complaint */}
                      </div>
                      <div className="text-sm text-gray-500">
                        {complaint.contact} 
                      </div>
                      {hasBookingData(complaint) && (
                        <div className="text-xs text-green-600 mt-1">
                          📋 Has Booking Data
                        </div>
                      )}
                    </div>
                  </td>
                  {/* <td className="px-4 py-3 text-sm">
                    {complaint.contact || "N/A"}
                  </td> */}
                  <td className="px-4 py-3">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                      {complaint.compl_Against}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm">
                      <div className="font-medium">{getCarDetails(complaint)}</div>
                      {complaint.bookingId?.carId?.plateNumber && (
                        <div className="text-gray-500 text-xs">
                          Plate: {getCarPlateNumber(complaint)}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {getShowroomDetails(complaint)}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {formatDate(complaint.createdAt)}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {complaint.resolved ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Resolved
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex justify-center space-x-2">
                      <button
                        onClick={() => setSelectedComplaint(complaint)}
                        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
                      >
                        View Details
                      </button>
                      {/* {!complaint.resolved && (
                        <button
                          onClick={() => resolveComplaint(complaint._id)}
                          className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-sm"
                        >
                          Resolve
                        </button>
                      )} */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Detailed View Modal - SHOWS EXACT DATA FROM CUSTOMER */}
      {selectedComplaint && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedComplaint(null)}
              className="absolute top-4 right-4 text-gray-600 hover:text-black text-2xl bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center"
            >
              ✖
            </button>

            <h3 className="text-2xl font-bold mb-6 text-[#394A9A] border-b pb-2">
              Complaint Details - Customer Submitted Data
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Complaint Information - EXACT DATA FROM CUSTOMER */}
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-lg mb-3 text-[#394A9A]">
                    Complaint Information (Customer Input)
                  </h4>
                  <div className="space-y-2">
                    <p><strong>Type:</strong> 
                      <span className="ml-2 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                        {selectedComplaint.compl_Against}
                      </span>
                    </p>
                    <p><strong>Description:</strong></p>
                    <p className="text-gray-700 bg-white p-3 rounded border min-h-[80px]">
                      {selectedComplaint.description}
                    </p>
                    <p><strong>Status:</strong> 
                      <span className={`ml-2 px-2 py-1 rounded-full text-sm ${
                        selectedComplaint.resolved 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {selectedComplaint.resolved ? 'Resolved' : 'Pending'}
                      </span>
                    </p>
                    <p><strong>Submitted:</strong> 
                      {formatDate(selectedComplaint.createdAt)}
                    </p>
                    {selectedComplaint.resolved && selectedComplaint.resolvedAt && (
                      <p><strong>Resolved:</strong> 
                        {formatDate(selectedComplaint.resolvedAt)}
                      </p>
                    )}
                  </div>
                </div>

                {/* Customer Information - EXACT DATA FROM CUSTOMER */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-lg mb-3 text-[#394A9A]">
                    Customer Information (From Complaint Form)
                  </h4>
                  <div className="space-y-2">
                    <p><strong>Email:</strong> 
                      <span className="ml-2 font-mono text-sm bg-yellow-100 px-2 py-1 rounded">
                        {selectedComplaint.email}
                      </span>
                    </p>
                    <p><strong>Contact:</strong> 
                      <span className="ml-2 font-mono text-sm bg-yellow-100 px-2 py-1 rounded">
                        {selectedComplaint.contact || "N/A"}
                      </span>
                    </p>
                    <p><strong>Complaint ID:</strong> 
                      <span className="ml-2 font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                        {selectedComplaint._id}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Booking & Additional Information */}
              <div className="space-y-4">
                {/* Car Information from Booking */}
                {selectedComplaint.bookingId?.carId && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-lg mb-3 text-[#394A9A]">
                      Car Information (From Booking)
                    </h4>
                    <div className="space-y-2">
                      <p><strong>Car:</strong> {getCarDetails(selectedComplaint)}</p>
                      <p><strong>Plate Number:</strong> {getCarPlateNumber(selectedComplaint)}</p>
                      <p><strong>Color:</strong> {selectedComplaint.bookingId.carId.color || "N/A"}</p>
                      <p><strong>Fuel Type:</strong> {selectedComplaint.bookingId.carId.fuelType || "N/A"}</p>
                      <p><strong>Transmission:</strong> {selectedComplaint.bookingId.carId.transmission || "N/A"}</p>
                      <p><strong>Rent Rate:</strong> {formatCurrency(getCarRentRate(selectedComplaint))}/day</p>
                      {selectedComplaint.bookingId.carId.images?.[0] && (
                        <div className="mt-2">
                          <img 
                            src={`${Base_Url}/uploads/${selectedComplaint.bookingId.carId.images[0]}`}
                            alt="Car"
                            className="w-32 h-20 object-cover rounded border"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Booking Information */}
                {selectedComplaint.bookingId && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-lg mb-3 text-[#394A9A]">
                      Booking Information
                    </h4>
                    <div className="space-y-2">
                      <p><strong>Booking ID:</strong> 
                        <span className="text-sm font-mono ml-2 bg-gray-100 px-2 py-1 rounded">
                          {selectedComplaint.bookingId._id}
                        </span>
                      </p>
                      <p><strong>Rental Period:</strong></p>
                      <p className="text-sm bg-white p-2 rounded border">
                        📅 {selectedComplaint.bookingId.rentalStartDate} {selectedComplaint.bookingId.rentalStartTime} 
                        <br />
                        → {selectedComplaint.bookingId.rentalEndDate} {selectedComplaint.bookingId.rentalEndTime}
                      </p>
                      <p><strong>Total Price:</strong> {formatCurrency(selectedComplaint.bookingId.totalPrice)}</p>
                      <p><strong>Status:</strong> 
                        <span className="ml-2 capitalize bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm">
                          {selectedComplaint.bookingId.status || "N/A"}
                        </span>
                      </p>
                    </div>
                  </div>
                )}

                {/* Showroom Information */}
                {selectedComplaint.bookingId?.showroomId && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-lg mb-3 text-[#394A9A]">
                      Showroom Information
                    </h4>
                    <div className="space-y-2">
                      <p><strong>Showroom:</strong> {getShowroomDetails(selectedComplaint)}</p>
                      <p><strong>Owner:</strong> {selectedComplaint.bookingId.showroomId.ownerName || "N/A"}</p>
                      <p><strong>Address:</strong> {selectedComplaint.bookingId.showroomId.address || "N/A"}</p>
                    </div>
                  </div>
                )}

                {/* Proof Attachment - EXACT FILE FROM CUSTOMER */}
                {selectedComplaint.proof && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-lg mb-3 text-[#394A9A]">
                      Proof Attachment (Customer Uploaded)
                    </h4>
                    <div className="flex flex-col items-center">
                      <img
                        src={`${Base_Url}/uploads/complaints/${selectedComplaint.proof}`}
                        alt="Proof submitted by customer"
                        className="max-w-full max-h-64 rounded-lg border shadow-md"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'block';
                        }}
                      />
                      <div style={{display: 'none'}} className="text-center text-gray-500">
                        <p>Proof file: {selectedComplaint.proof}</p>
                        <p className="text-sm">File cannot be displayed</p>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        File: {selectedComplaint.proof}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Debug Information */}
            <div className="mt-4 p-3 bg-gray-100 rounded-lg">
              <h4 className="font-semibold text-sm text-gray-700 mb-2">Debug Information:</h4>
              <div className="text-xs font-mono">
                <p>Complaint ID: {selectedComplaint._id}</p>
                <p>Has Booking: {hasBookingData(selectedComplaint) ? 'Yes' : 'No'}</p>
                <p>Booking ID: {selectedComplaint.bookingId?._id || 'None'}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
              <button
                onClick={() => setSelectedComplaint(null)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              {/* {!selectedComplaint.resolved && (
                <button
                  onClick={() => {
                    resolveComplaint(selectedComplaint._id);
                  }}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Mark as Resolved
                </button>
              )} */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Complaints;