// import { useEffect, useState } from "react";
// import axios from "axios";

// const Base_Url = import.meta.env.VITE_API_URL || "http://localhost:5000";

// const Complaints = () => {
//   const [complaints, setComplaints] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedComplaint, setSelectedComplaint] = useState(null);
//   const [filter, setFilter] = useState("all");
//   const [selectedShowroom, setSelectedShowroom] = useState(null);
//   const [showrooms, setShowrooms] = useState([]);
//   const [view, setView] = useState("showrooms");

//   // Resolution Modal State
//   const [showResolutionModal, setShowResolutionModal] = useState(false);
//   const [resolutionDescription, setResolutionDescription] = useState("");
//   const [resolvingComplaintId, setResolvingComplaintId] = useState(null);
//   const [resolving, setResolving] = useState(false);

//   // Warning Modal State
//   const [showWarningModal, setShowWarningModal] = useState(false);
//   const [selectedShowroomForWarning, setSelectedShowroomForWarning] = useState(null);
//   const [sendingWarning, setSendingWarning] = useState(false);

//   // Fetch complaints with detailed booking information
//   const fetchComplaints = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get(`${Base_Url}/api/complaints/all`, {
//         withCredentials: true,
//       });

//       if (response.data.success) {
//         const complaintsData = response.data.complaints || [];
//         console.log("📋 Complaints received from backend:", complaintsData);
//         setComplaints(complaintsData);
//         calculateShowroomStats(complaintsData);
//       } else {
//         console.log("❌ No complaints found or API error");
//         setComplaints([]);
//         setShowrooms([]);
//       }
//     } catch (err) {
//       console.error("❌ Error fetching complaints:", err);
//       console.error("Error details:", err.response?.data);
//       setComplaints([]);
//       setShowrooms([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Send warning to showroom
//   const sendWarningToShowroom = async () => {
//     if (!selectedShowroomForWarning) return;

//     try {
//       setSendingWarning(true);
//       const warningData = {
//         showroomId: selectedShowroomForWarning._id,
//         warningType: "LOW_RESOLUTION_RATE",
//         title: "Low Complaint Resolution Rate",
//         message: `Your showroom has a low complaint resolution rate of ${selectedShowroomForWarning.resolutionRate}%. Please improve your response time and resolve pending complaints promptly to maintain good service quality.`,
//         resolutionRate: selectedShowroomForWarning.resolutionRate,
//         totalComplaints: selectedShowroomForWarning.totalComplaints,
//         resolvedComplaints: selectedShowroomForWarning.resolvedComplaints
//       };

//       const response = await axios.post(
//         `${Base_Url}/api/warnings/send-warning`,
//         warningData,
//         { withCredentials: true }
//       );

//       if (response.data.success) {
//         alert("⚠️ Warning sent successfully to showroom!");
//         setShowWarningModal(false);
//         setSelectedShowroomForWarning(null);
//       }
//     } catch (error) {
//       console.error("Error sending warning:", error);
//       alert("Failed to send warning");
//     } finally {
//       setSendingWarning(false);
//     }
//   };

//   // Calculate showroom statistics
//   const calculateShowroomStats = (complaintsData) => {
//     const showroomMap = {};

//     complaintsData.forEach(complaint => {
//       const showroom = complaint.bookingId?.showroomId;
      
//       if (showroom && showroom._id) {
//         const showroomId = showroom._id;
        
//         if (!showroomMap[showroomId]) {
//           showroomMap[showroomId] = {
//             _id: showroomId,
//             name: showroom.showroomName || showroom.name || "Unknown Showroom",
//             address: showroom.address || "N/A",
//             totalComplaints: 0,
//             resolvedComplaints: 0,
//             pendingComplaints: 0,
//             complaints: []
//           };
//         }

//         showroomMap[showroomId].totalComplaints++;
//         showroomMap[showroomId].complaints.push(complaint);

//         if (complaint.resolved) {
//           showroomMap[showroomId].resolvedComplaints++;
//         } else {
//           showroomMap[showroomId].pendingComplaints++;
//         }
//       }
//     });

//     // Calculate resolution rate for each showroom
//     const showroomsWithStats = Object.values(showroomMap).map(showroom => ({
//       ...showroom,
//       resolutionRate: showroom.totalComplaints > 0 
//         ? Math.round((showroom.resolvedComplaints / showroom.totalComplaints) * 100)
//         : 0
//     }));

//     // Sort showrooms by resolution rate (highest first)
//     showroomsWithStats.sort((a, b) => b.resolutionRate - a.resolutionRate);
    
//     setShowrooms(showroomsWithStats);
//   };

//   // Mark complaint as resolved with description
//   const resolveComplaint = async () => {
//     if (!resolutionDescription.trim()) {
//       alert("Please enter a resolution description");
//       return;
//     }

//     try {
//       setResolving(true);
//       const response = await axios.put(
//         `${Base_Url}/api/complaints/${resolvingComplaintId}/resolve`,
//         {
//           resolutionDescription: resolutionDescription.trim()
//         },
//         { withCredentials: true }
//       );

//       if (response.data.success) {
//         alert("Complaint resolved successfully!");
        
//         setComplaints(prevComplaints => 
//           prevComplaints.map(complaint => 
//             complaint._id === resolvingComplaintId 
//               ? response.data.complaint
//               : complaint
//           )
//         );
        
//         if (selectedComplaint && selectedComplaint._id === resolvingComplaintId) {
//           setSelectedComplaint(response.data.complaint);
//         }
        
//         fetchComplaints();
//         closeResolutionModal();
//       } else {
//         alert("Failed to resolve complaint.");
//       }
//     } catch (err) {
//       console.error("Error resolving complaint:", err);
//       alert("Something went wrong while resolving the complaint.");
//     } finally {
//       setResolving(false);
//     }
//   };

//   const openResolutionModal = (complaintId) => {
//     setResolvingComplaintId(complaintId);
//     setResolutionDescription("");
//     setShowResolutionModal(true);
//   };

//   const closeResolutionModal = () => {
//     setShowResolutionModal(false);
//     setResolvingComplaintId(null);
//     setResolutionDescription("");
//     setResolving(false);
//   };

//   const handleResolutionBackdropClick = (e) => {
//     if (e.target === e.currentTarget) {
//       closeResolutionModal();
//     }
//   };

//   // Warning modal handlers
//   const openWarningModal = (showroom) => {
//     setSelectedShowroomForWarning(showroom);
//     setShowWarningModal(true);
//   };

//   const closeWarningModal = () => {
//     setShowWarningModal(false);
//     setSelectedShowroomForWarning(null);
//     setSendingWarning(false);
//   };

//   const handleWarningBackdropClick = (e) => {
//     if (e.target === e.currentTarget) {
//       closeWarningModal();
//     }
//   };

//   useEffect(() => {
//     fetchComplaints();
//   }, []);

//   // Get complaints for selected showroom
//   const getShowroomComplaints = () => {
//     if (!selectedShowroom) return [];
    
//     return complaints.filter(complaint => 
//       complaint.bookingId?.showroomId?._id === selectedShowroom._id
//     );
//   };

//   // Filter complaints for selected showroom
//   const filteredComplaints = getShowroomComplaints().filter((c) => {
//     if (filter === "resolved") return c.resolved;
//     if (filter === "pending") return !c.resolved;
//     return true;
//   });

//   // Get stats for selected showroom
//   const getSelectedShowroomStats = () => {
//     if (!selectedShowroom) return { total: 0, resolved: 0, pending: 0 };
    
//     const showroomComplaints = getShowroomComplaints();
//     const total = showroomComplaints.length;
//     const resolved = showroomComplaints.filter(c => c.resolved).length;
//     const pending = total - resolved;
    
//     return { total, resolved, pending };
//   };

//   // Handle showroom card click
//   const handleShowroomClick = (showroom) => {
//     setSelectedShowroom(showroom);
//     setView("complaints");
//     setFilter("all");
//   };

//   // Handle back to showrooms
//   const handleBackToShowrooms = () => {
//     setSelectedShowroom(null);
//     setView("showrooms");
//     setSelectedComplaint(null);
//   };

//   // Extract car details
//   const getCarDetails = (complaint) => {
//     if (complaint.bookingId && complaint.bookingId.carId) {
//       const car = complaint.bookingId.carId;
//       const brand = car.carBrand || "";
//       const model = car.carModel || "";
//       const year = car.year || "";
      
//       const carInfo = `${brand} ${model} ${year}`.trim();
//       return carInfo || "Car details available but incomplete";
//     }
    
//     return "No car information (Direct complaint)";
//   };

//   const getShowroomDetails = (complaint) => {
//     if (complaint.bookingId && complaint.bookingId.showroomId) {
//       const showroom = complaint.bookingId.showroomId;
//       return showroom.showroomName || showroom.name || "Showroom details available";
//     }
//     return "No showroom information";
//   };

//   const getCarPlateNumber = (complaint) => {
//     if (complaint.bookingId && complaint.bookingId.carId) {
//       return complaint.bookingId.carId.plateNumber || "N/A";
//     }
//     return "N/A";
//   };

//   const getCarRentRate = (complaint) => {
//     if (complaint.bookingId && complaint.bookingId.carId) {
//       return complaint.bookingId.carId.rentRate || "N/A";
//     }
//     return "N/A";
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return "N/A";
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   const formatCurrency = (amount) => {
//     if (!amount || isNaN(amount)) return "Rs 0";
//     return `Rs ${amount}`;
//   };

//   const hasBookingData = (complaint) => {
//     return complaint.bookingId && complaint.bookingId._id;
//   };

//   const getResolutionRateColor = (rate) => {
//     if (rate >= 80) return "text-green-600";
//     if (rate >= 60) return "text-yellow-600";
//     return "text-red-600";
//   };

//   const getResolutionRateBgColor = (rate) => {
//     if (rate >= 80) return "bg-green-100";
//     if (rate >= 60) return "bg-yellow-100";
//     return "bg-red-100";
//   };

//   return (
//     <div className="bg-white shadow rounded-xl p-6">
//       <h2 className="text-2xl font-bold text-[#394A9A] mb-6">
//         {view === "showrooms" 
//           ? "Showrooms Complaint Resolution Rates" 
//           : `Complaints - ${selectedShowroom?.name}`}
//       </h2>

//       {/* Back button when in complaints view */}
//       {view === "complaints" && (
//         <button
//           onClick={handleBackToShowrooms}
//           className="mb-4 px-4 py-2 bg-[#C17D3C] text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center"
//         >
//           ← Back to Showrooms
//         </button>
//       )}

//       {/* Showroom Cards View */}
//       {view === "showrooms" && (
//         <>
//           {loading ? (
//             <div className="text-center py-8">
//               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
//               <p className="text-gray-500 mt-2">Loading showrooms...</p>
//             </div>
//           ) : showrooms.length === 0 ? (
//             <div className="text-center py-8">
//               <p className="text-gray-500 text-lg">No showrooms with complaints found.</p>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {showrooms.map((showroom) => (
//                 <div
//                   key={showroom._id}
//                   className="relative bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow p-6"
//                 >
//                   {/* Warning Button - Show only for low resolution rates */}
//                   {showroom.resolutionRate < 60 && (
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         openWarningModal(showroom);
//                       }}
//                       className="absolute top-3 right-3 p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors shadow-sm"
//                       title="Send Warning for Low Resolution Rate"
//                     >
//                       ⚠️
//                     </button>
//                   )}
                  
//                   <div
//                     onClick={() => handleShowroomClick(showroom)}
//                     className="cursor-pointer"
//                   >
//                     <div className="flex justify-between items-start mb-4">
//                       <h3 className="text-lg font-semibold text-gray-800">
//                         {showroom.name}
//                       </h3>
//                       <div className={`px-3 py-1 rounded-full text-sm font-medium ${getResolutionRateBgColor(showroom.resolutionRate)} ${getResolutionRateColor(showroom.resolutionRate)}`}>
//                         {showroom.resolutionRate}% Resolved
//                       </div>
//                     </div>
                    
//                     <p className="text-gray-600 text-sm mb-4">{showroom.address}</p>
                    
//                     <div className="grid grid-cols-3 gap-2 text-center">
//                       <div className="bg-blue-50 p-2 rounded">
//                         <div className="text-lg font-bold text-blue-700">{showroom.totalComplaints}</div>
//                         <div className="text-xs text-blue-600">Total</div>
//                       </div>
//                       <div className="bg-green-50 p-2 rounded">
//                         <div className="text-lg font-bold text-green-700">{showroom.resolvedComplaints}</div>
//                         <div className="text-xs text-green-600">Resolved</div>
//                       </div>
//                       <div className="bg-red-50 p-2 rounded">
//                         <div className="text-lg font-bold text-red-700">{showroom.pendingComplaints}</div>
//                         <div className="text-xs text-red-600">Pending</div>
//                       </div>
//                     </div>
                    
//                     <div className="mt-4 text-center">
//                       <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
//                         View Complaints →
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </>
//       )}

//       {/* Complaints Table View */}
//       {view === "complaints" && (
//         <>
//           {/* Stats Cards for Selected Showroom */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//             <div
//               onClick={() => setFilter("all")}
//               className={`cursor-pointer p-4 rounded-lg shadow text-center transition-all ${
//                 filter === "all"
//                   ? "bg-blue-600 text-white transform scale-105"
//                   : "bg-blue-100 text-blue-800 hover:bg-blue-200"
//               }`}
//             >
//               <h3 className="text-lg font-semibold">Total Complaints</h3>
//               <p className="text-2xl font-bold">{getSelectedShowroomStats().total}</p>
//             </div>

//             <div
//               onClick={() => setFilter("resolved")}
//               className={`cursor-pointer p-4 rounded-lg shadow text-center transition-all ${
//                 filter === "resolved"
//                   ? "bg-green-600 text-white transform scale-105"
//                   : "bg-green-100 text-green-800 hover:bg-green-200"
//               }`}
//             >
//               <h3 className="text-lg font-semibold">Resolved</h3>
//               <p className="text-2xl font-bold">{getSelectedShowroomStats().resolved}</p>
//             </div>

//             <div
//               onClick={() => setFilter("pending")}
//               className={`cursor-pointer p-4 rounded-lg shadow text-center transition-all ${
//                 filter === "pending"
//                   ? "bg-red-600 text-white transform scale-105"
//                   : "bg-red-100 text-red-800 hover:bg-red-200"
//               }`}
//             >
//               <h3 className="text-lg font-semibold">Pending</h3>
//               <p className="text-2xl font-bold">{getSelectedShowroomStats().pending}</p>
//             </div>
//           </div>

//           {loading ? (
//             <div className="text-center py-8">
//               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
//               <p className="text-gray-500 mt-2">Loading complaints...</p>
//             </div>
//           ) : filteredComplaints.length === 0 ? (
//             <div className="text-center py-8">
//               <p className="text-gray-500 text-lg">No complaints found for this showroom.</p>
//               <p className="text-gray-400 text-sm mt-1">
//                 {filter !== "all" ? `No ${filter} complaints` : "No complaints for this showroom"}
//               </p>
//             </div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="w-full border border-gray-200">
//                 <thead className="bg-gray-100">
//                   <tr>
//                     <th className="px-4 py-3 border text-left">Customer</th>
//                     <th className="px-4 py-3 border text-left">Complaint Type</th>
//                     <th className="px-4 py-3 border text-left">Car</th>
//                     <th className="px-4 py-3 border text-left">Date</th>
//                     <th className="px-4 py-3 border text-center">Status</th>
//                     <th className="px-4 py-3 border text-center">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredComplaints.map((complaint) => (
//                     <tr key={complaint._id} className="hover:bg-gray-50 border-b">
//                       <td className="px-4 py-3">
//                         <div>
//                           <div className="font-medium text-gray-900">
//                             {complaint.email}
//                           </div>
//                           <div className="text-sm text-gray-500">
//                             {complaint.contact} 
//                           </div>
//                           {hasBookingData(complaint) && (
//                             <div className="text-xs text-green-600 mt-1">
//                               📋 Has Booking Data
//                             </div>
//                           )}
//                         </div>
//                       </td>
//                       <td className="px-4 py-3">
//                         <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
//                           {complaint.compl_Against}
//                         </span>
//                       </td>
//                       <td className="px-4 py-3">
//                         <div className="text-sm">
//                           <div className="font-medium">{getCarDetails(complaint)}</div>
//                           {complaint.bookingId?.carId?.plateNumber && (
//                             <div className="text-gray-500 text-xs">
//                               Plate: {getCarPlateNumber(complaint)}
//                             </div>
//                           )}
//                         </div>
//                       </td>
//                       <td className="px-4 py-3 text-sm text-gray-500">
//                         {formatDate(complaint.createdAt)}
//                       </td>
//                       <td className="px-4 py-3 text-center">
//                         {complaint.resolved ? (
//                           <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
//                             Resolved
//                           </span>
//                         ) : (
//                           <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
//                             Pending
//                           </span>
//                         )}
//                       </td>
//                       <td className="px-4 py-3 text-center">
//                         <div className="flex justify-center space-x-2">
//                           <button
//                             onClick={() => setSelectedComplaint(complaint)}
//                             className="px-3 py-1 bg-[#C17D3C] text-white rounded hover:bg-blue-700 transition-colors text-sm"
//                           >
//                             View Details
//                           </button>
//                           {/* {!complaint.resolved && (
//                             <button
//                               onClick={() => openResolutionModal(complaint._id)}
//                               className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-sm"
//                             >
//                               Resolve
//                             </button>
//                           )} */}
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </>
//       )}

//       {/* Detailed View Modal */}
//       {selectedComplaint && (
//         <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
//           <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
//             <button
//               onClick={() => setSelectedComplaint(null)}
//               className="absolute top-4 right-4 text-gray-600 hover:text-black text-2xl bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center"
//             >
//               ✖
//             </button>

//             <h3 className="text-2xl font-bold mb-6 text-[#394A9A] border-b pb-2">
//               Complaint Details - Customer Submitted Data
//             </h3>

//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//               {/* Complaint Information */}
//               <div className="space-y-4">
//                 <div className="bg-gray-50 p-4 rounded-lg">
//                   <h4 className="font-semibold text-lg mb-3 text-[#394A9A]">
//                     Complaint Information (Customer Input)
//                   </h4>
//                   <div className="space-y-2">
//                     <p><strong>Type:</strong> 
//                       <span className="ml-2 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
//                         {selectedComplaint.compl_Against}
//                       </span>
//                     </p>
//                     <p><strong>Description:</strong></p>
//                     <p className="text-gray-700 bg-white p-3 rounded border min-h-[80px]">
//                       {selectedComplaint.description}
//                     </p>
//                     <p><strong>Status:</strong> 
//                       <span className={`ml-2 px-2 py-1 rounded-full text-sm ${
//                         selectedComplaint.resolved 
//                           ? 'bg-green-100 text-green-800' 
//                           : 'bg-red-100 text-red-800'
//                       }`}>
//                         {selectedComplaint.resolved ? 'Resolved' : 'Pending'}
//                       </span>
//                     </p>
//                     <p><strong>Submitted:</strong> 
//                       {formatDate(selectedComplaint.createdAt)}
//                     </p>
//                     {selectedComplaint.resolved && selectedComplaint.resolvedAt && (
//                       <p><strong>Resolved:</strong> 
//                         {formatDate(selectedComplaint.resolvedAt)}
//                       </p>
//                     )}
//                   </div>
//                 </div>

//                 {/* Customer Information */}
//                 <div className="bg-gray-50 p-4 rounded-lg">
//                   <h4 className="font-semibold text-lg mb-3 text-[#394A9A]">
//                     Customer Information (From Complaint Form)
//                   </h4>
//                   <div className="space-y-2">
//                     <p><strong>Email:</strong> 
//                       <span className="ml-2 font-mono text-sm bg-yellow-100 px-2 py-1 rounded">
//                         {selectedComplaint.email}
//                       </span>
//                     </p>
//                     <p><strong>Contact:</strong> 
//                       <span className="ml-2 font-mono text-sm bg-yellow-100 px-2 py-1 rounded">
//                         {selectedComplaint.contact || "N/A"}
//                       </span>
//                     </p>
//                     <p><strong>Complaint ID:</strong> 
//                       <span className="ml-2 font-mono text-xs bg-gray-100 px-2 py-1 rounded">
//                         {selectedComplaint._id}
//                       </span>
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {/* Booking & Additional Information */}
//               <div className="space-y-4">
//                 {/* Car Information from Booking */}
//                 {selectedComplaint.bookingId?.carId && (
//                   <div className="bg-gray-50 p-4 rounded-lg">
//                     <h4 className="font-semibold text-lg mb-3 text-[#394A9A]">
//                       Car Information (From Booking)
//                     </h4>
//                     <div className="space-y-2">
//                       <p><strong>Car:</strong> {getCarDetails(selectedComplaint)}</p>
//                       <p><strong>Plate Number:</strong> {getCarPlateNumber(selectedComplaint)}</p>
//                       <p><strong>Color:</strong> {selectedComplaint.bookingId.carId.color || "N/A"}</p>
//                       <p><strong>Fuel Type:</strong> {selectedComplaint.bookingId.carId.fuelType || "N/A"}</p>
//                       <p><strong>Transmission:</strong> {selectedComplaint.bookingId.carId.transmission || "N/A"}</p>
//                       <p><strong>Rent Rate:</strong> {formatCurrency(getCarRentRate(selectedComplaint))}/day</p>
//                       {selectedComplaint.bookingId.carId.images?.[0] && (
//                         <div className="mt-2">
//                           <img 
//                             src={`${Base_Url}/uploads/${selectedComplaint.bookingId.carId.images[0]}`}
//                             alt="Car"
//                             className="w-32 h-20 object-cover rounded border"
//                           />
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 )}

//                 {/* Resolution Details Section */}
//                 {selectedComplaint.resolved && selectedComplaint.resolutionDescription && (
//                   <div className="bg-green-50 p-4 rounded-lg">
//                     <h4 className="font-semibold text-lg mb-3 text-[#394A9A]">
//                       Resolution Details
//                     </h4>
//                     <div className="space-y-2">
//                       <p><strong>Resolved At:</strong> 
//                         {selectedComplaint.resolvedAt ? formatDate(selectedComplaint.resolvedAt) : "N/A"}
//                       </p>
//                       <p><strong>Resolution Description:</strong></p>
//                       <p className="text-gray-700 bg-white p-3 rounded border min-h-[80px]">
//                         {selectedComplaint.resolutionDescription}
//                       </p>
//                       {selectedComplaint.resolvedBy && (
//                         <p><strong>Resolved By:</strong> 
//                           <span className="ml-2 font-mono text-sm bg-green-100 px-2 py-1 rounded">
//                             {selectedComplaint.resolvedBy.name || selectedComplaint.resolvedBy.email || "Admin"}
//                           </span>
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                 )}

//                 {/* Show placeholder if resolved but no description */}
//                 {selectedComplaint.resolved && !selectedComplaint.resolutionDescription && (
//                   <div className="bg-yellow-50 p-4 rounded-lg">
//                     <h4 className="font-semibold text-lg mb-3 text-[#394A9A]">
//                       Resolution Status
//                     </h4>
//                     <p className="text-yellow-700">
//                       This complaint has been marked as resolved. No additional resolution details were provided.
//                     </p>
//                   </div>
//                 )}

//                 {/* Booking Information */}
//                 {selectedComplaint.bookingId && (
//                   <div className="bg-gray-50 p-4 rounded-lg">
//                     <h4 className="font-semibold text-lg mb-3 text-[#394A9A]">
//                       Booking Information
//                     </h4>
//                     <div className="space-y-2">
//                       <p><strong>Booking ID:</strong> 
//                         <span className="text-sm font-mono ml-2 bg-gray-100 px-2 py-1 rounded">
//                           {selectedComplaint.bookingId._id}
//                         </span>
//                       </p>
//                       <p><strong>Rental Period:</strong></p>
//                       <p className="text-sm bg-white p-2 rounded border">
//                         📅 {selectedComplaint.bookingId.rentalStartDate} {selectedComplaint.bookingId.rentalStartTime} 
//                         <br />
//                         → {selectedComplaint.bookingId.rentalEndDate} {selectedComplaint.bookingId.rentalEndTime}
//                       </p>
//                       <p><strong>Total Price:</strong> {formatCurrency(selectedComplaint.bookingId.totalPrice)}</p>
//                       <p><strong>Status:</strong> 
//                         <span className="ml-2 capitalize bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm">
//                           {selectedComplaint.bookingId.status || "N/A"}
//                         </span>
//                       </p>
//                     </div>
//                   </div>
//                 )}

//                 {/* Showroom Information */}
//                 {selectedComplaint.bookingId?.showroomId && (
//                   <div className="bg-gray-50 p-4 rounded-lg">
//                     <h4 className="font-semibold text-lg mb-3 text-[#394A9A]">
//                       Showroom Information
//                     </h4>
//                     <div className="space-y-2">
//                       <p><strong>Showroom:</strong> {getShowroomDetails(selectedComplaint)}</p>
//                       <p><strong>Owner:</strong> {selectedComplaint.bookingId.showroomId.ownerName || "N/A"}</p>
//                       <p><strong>Address:</strong> {selectedComplaint.bookingId.showroomId.address || "N/A"}</p>
//                     </div>
//                   </div>
//                 )}

//                 {/* Proof Attachment */}
//                 {selectedComplaint.proof && (
//                   <div className="bg-gray-50 p-4 rounded-lg">
//                     <h4 className="font-semibold text-lg mb-3 text-[#394A9A]">
//                       Proof Attachment (Customer Uploaded)
//                     </h4>
//                     <div className="flex flex-col items-center">
//                       <img
//                         src={`${Base_Url}/uploads/complaints/${selectedComplaint.proof}`}
//                         alt="Proof submitted by customer"
//                         className="max-w-full max-h-64 rounded-lg border shadow-md"
//                         onError={(e) => {
//                           e.target.style.display = 'none';
//                           e.target.nextSibling.style.display = 'block';
//                         }}
//                       />
//                       <div style={{display: 'none'}} className="text-center text-gray-500">
//                         <p>Proof file: {selectedComplaint.proof}</p>
//                         <p className="text-sm">File cannot be displayed</p>
//                       </div>
//                       <p className="text-xs text-gray-500 mt-2">
//                         File: {selectedComplaint.proof}
//                       </p>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
//               <button
//                 onClick={() => setSelectedComplaint(null)}
//                 className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
//               >
//                 Close
//               </button>
//               {/* {!selectedComplaint.resolved && (
//                 <button
//                   onClick={() => openResolutionModal(selectedComplaint._id)}
//                   className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
//                 >
//                   Mark as Resolved
//                 </button>
//               )} */}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Resolution Description Modal */}
//       {showResolutionModal && (
//         <div 
//           className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
//           onClick={handleResolutionBackdropClick}
//         >
//           <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
//             <button
//               onClick={closeResolutionModal}
//               className="absolute top-4 right-4 text-gray-600 hover:text-black text-2xl bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center"
//             >
//               ✖
//             </button>

//             <h3 className="text-xl font-bold mb-4 text-[#394A9A]">
//               Resolve Complaint
//             </h3>

//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Resolution Description *
//               </label>
//               <textarea
//                 value={resolutionDescription}
//                 onChange={(e) => setResolutionDescription(e.target.value)}
//                 placeholder="Describe how this complaint was resolved..."
//                 rows="5"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#C17D3C] focus:border-[#C17D3C]"
//               />
//               <p className="text-xs text-gray-500 mt-1">
//                 Please provide details about how this complaint was resolved. This will be visible to the customer.
//               </p>
//             </div>

//             <div className="flex justify-end space-x-3">
//               <button
//                 onClick={closeResolutionModal}
//                 disabled={resolving}
//                 className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={resolveComplaint}
//                 disabled={resolving || !resolutionDescription.trim()}
//                 className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {resolving ? "Resolving..." : "Confirm Resolution"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Warning Modal */}
//       {showWarningModal && selectedShowroomForWarning && (
//         <div 
//           className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
//           onClick={handleWarningBackdropClick}
//         >
//           <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
//             <button
//               onClick={closeWarningModal}
//               className="absolute top-4 right-4 text-gray-600 hover:text-black text-2xl bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center"
//             >
//               ✖
//             </button>

//             <h3 className="text-xl font-bold mb-4 text-[#C17D3C]">
//               ⚠️ Send Warning to Showroom
//             </h3>

//             <div className="mb-4">
//               <p className="font-semibold text-lg">{selectedShowroomForWarning.name}</p>
//               <p className="text-sm text-gray-600 mb-3">
//                 Resolution Rate: <span className="font-bold text-red-600">{selectedShowroomForWarning.resolutionRate}%</span>
//               </p>
              
//               <div className="bg-white p-4 rounded-lg mb-4">
//                 <p className="text-[#C17D3C] text-sm">
//                   <strong>Warning Message:</strong><br/>
//                   This showroom has a low complaint resolution rate. Sending this warning will notify the showroom to improve their response time.
//                 </p>
//               </div>

//               <div className="grid grid-cols-2 gap-2 text-sm bg-gray-50 p-3 rounded">
//                 <div><strong>Total Complaints:</strong> {selectedShowroomForWarning.totalComplaints}</div>
//                 <div><strong>Resolved:</strong> {selectedShowroomForWarning.resolvedComplaints}</div>
//                 <div><strong>Pending:</strong> {selectedShowroomForWarning.pendingComplaints}</div>
//                 <div><strong>Rate:</strong> {selectedShowroomForWarning.resolutionRate}%</div>
//               </div>
//             </div>

//             <div className="flex justify-end space-x-3">
//               <button
//                 onClick={closeWarningModal}
//                 disabled={sendingWarning}
//                 className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={sendWarningToShowroom}
//                 disabled={sendingWarning}
//                 className="px-4 py-2 bg-[#C17D3C] text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {sendingWarning ? "Sending..." : "Send Warning"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Complaints;

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Base_Url = import.meta.env.VITE_API_URL || "http://localhost:5000";

const Complaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [filter, setFilter] = useState("all");
  const [selectedShowroom, setSelectedShowroom] = useState(null);
  const [showrooms, setShowrooms] = useState([]);
  const [view, setView] = useState("showrooms");

  // Resolution Modal State
  const [showResolutionModal, setShowResolutionModal] = useState(false);
  const [resolutionDescription, setResolutionDescription] = useState("");
  const [resolvingComplaintId, setResolvingComplaintId] = useState(null);
  const [resolving, setResolving] = useState(false);

  // Warning Modal State
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [selectedShowroomForWarning, setSelectedShowroomForWarning] = useState(null);
  const [sendingWarning, setSendingWarning] = useState(false);

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
        setComplaints(complaintsData);
        calculateShowroomStats(complaintsData);
      } else {
        console.log("❌ No complaints found or API error");
        setComplaints([]);
        setShowrooms([]);
      }
    } catch (err) {
      console.error("❌ Error fetching complaints:", err);
      console.error("Error details:", err.response?.data);
      setComplaints([]);
      setShowrooms([]);
    } finally {
      setLoading(false);
    }
  };

  // Send warning to showroom
  const sendWarningToShowroom = async () => {
    if (!selectedShowroomForWarning) return;

    try {
      setSendingWarning(true);
      const warningData = {
        showroomId: selectedShowroomForWarning._id,
        warningType: "LOW_RESOLUTION_RATE",
        title: "Low Complaint Resolution Rate",
        message: `Your showroom has a low complaint resolution rate of ${selectedShowroomForWarning.resolutionRate}%. Please improve your response time and resolve pending complaints promptly to maintain good service quality.`,
        resolutionRate: selectedShowroomForWarning.resolutionRate,
        totalComplaints: selectedShowroomForWarning.totalComplaints,
        resolvedComplaints: selectedShowroomForWarning.resolvedComplaints
      };

      const response = await axios.post(
        `${Base_Url}/api/warnings/send-warning`,
        warningData,
        { withCredentials: true }
      );

      if (response.data.success) {
        // ✅ ONLY WARNING TOAST - Success message
        toast.success("⚠️ Warning sent successfully to showroom!", {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        
        setShowWarningModal(false);
        setSelectedShowroomForWarning(null);
      }
    } catch (error) {
      console.error("Error sending warning:", error);
      
      // ✅ ONLY WARNING TOAST - Error message
      toast.error("Failed to send warning to showroom.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setSendingWarning(false);
    }
  };

  // Calculate showroom statistics
  const calculateShowroomStats = (complaintsData) => {
    const showroomMap = {};

    complaintsData.forEach(complaint => {
      const showroom = complaint.bookingId?.showroomId;
      
      if (showroom && showroom._id) {
        const showroomId = showroom._id;
        
        if (!showroomMap[showroomId]) {
          showroomMap[showroomId] = {
            _id: showroomId,
            name: showroom.showroomName || showroom.name || "Unknown Showroom",
            address: showroom.address || "N/A",
            totalComplaints: 0,
            resolvedComplaints: 0,
            pendingComplaints: 0,
            complaints: []
          };
        }

        showroomMap[showroomId].totalComplaints++;
        showroomMap[showroomId].complaints.push(complaint);

        if (complaint.resolved) {
          showroomMap[showroomId].resolvedComplaints++;
        } else {
          showroomMap[showroomId].pendingComplaints++;
        }
      }
    });

    // Calculate resolution rate for each showroom
    const showroomsWithStats = Object.values(showroomMap).map(showroom => ({
      ...showroom,
      resolutionRate: showroom.totalComplaints > 0 
        ? Math.round((showroom.resolvedComplaints / showroom.totalComplaints) * 100)
        : 0
    }));

    // Sort showrooms by resolution rate (highest first)
    showroomsWithStats.sort((a, b) => b.resolutionRate - a.resolutionRate);
    
    setShowrooms(showroomsWithStats);
  };

  // Mark complaint as resolved with description
  const resolveComplaint = async () => {
    if (!resolutionDescription.trim()) {
      // ❌ NO TOAST - Simple alert
      alert("Please enter a resolution description");
      return;
    }

    try {
      setResolving(true);
      const response = await axios.put(
        `${Base_Url}/api/complaints/${resolvingComplaintId}/resolve`,
        {
          resolutionDescription: resolutionDescription.trim()
        },
        { withCredentials: true }
      );

      if (response.data.success) {
        // ❌ NO TOAST - Simple alert
        alert("Complaint resolved successfully!");
        
        setComplaints(prevComplaints => 
          prevComplaints.map(complaint => 
            complaint._id === resolvingComplaintId 
              ? response.data.complaint
              : complaint
          )
        );
        
        if (selectedComplaint && selectedComplaint._id === resolvingComplaintId) {
          setSelectedComplaint(response.data.complaint);
        }
        
        fetchComplaints();
        closeResolutionModal();
      } else {
        // ❌ NO TOAST - Simple alert
        alert("Failed to resolve complaint.");
      }
    } catch (err) {
      console.error("Error resolving complaint:", err);
      // ❌ NO TOAST - Simple alert
      alert("Something went wrong while resolving the complaint.");
    } finally {
      setResolving(false);
    }
  };

  const openResolutionModal = (complaintId) => {
    setResolvingComplaintId(complaintId);
    setResolutionDescription("");
    setShowResolutionModal(true);
  };

  const closeResolutionModal = () => {
    setShowResolutionModal(false);
    setResolvingComplaintId(null);
    setResolutionDescription("");
    setResolving(false);
  };

  const handleResolutionBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeResolutionModal();
    }
  };

  // Warning modal handlers
  const openWarningModal = (showroom) => {
    setSelectedShowroomForWarning(showroom);
    setShowWarningModal(true);
  };

  const closeWarningModal = () => {
    setShowWarningModal(false);
    setSelectedShowroomForWarning(null);
    setSendingWarning(false);
  };

  const handleWarningBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeWarningModal();
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  // Get complaints for selected showroom
  const getShowroomComplaints = () => {
    if (!selectedShowroom) return [];
    
    return complaints.filter(complaint => 
      complaint.bookingId?.showroomId?._id === selectedShowroom._id
    );
  };

  // Filter complaints for selected showroom
  const filteredComplaints = getShowroomComplaints().filter((c) => {
    if (filter === "resolved") return c.resolved;
    if (filter === "pending") return !c.resolved;
    return true;
  });

  // Get stats for selected showroom
  const getSelectedShowroomStats = () => {
    if (!selectedShowroom) return { total: 0, resolved: 0, pending: 0 };
    
    const showroomComplaints = getShowroomComplaints();
    const total = showroomComplaints.length;
    const resolved = showroomComplaints.filter(c => c.resolved).length;
    const pending = total - resolved;
    
    return { total, resolved, pending };
  };

  // Handle showroom card click
  const handleShowroomClick = (showroom) => {
    setSelectedShowroom(showroom);
    setView("complaints");
    setFilter("all");
  };

  // Handle back to showrooms
  const handleBackToShowrooms = () => {
    setSelectedShowroom(null);
    setView("showrooms");
    setSelectedComplaint(null);
  };

  // Extract car details
  const getCarDetails = (complaint) => {
    if (complaint.bookingId && complaint.bookingId.carId) {
      const car = complaint.bookingId.carId;
      const brand = car.carBrand || "";
      const model = car.carModel || "";
      const year = car.year || "";
      
      const carInfo = `${brand} ${model} ${year}`.trim();
      return carInfo || "Car details available but incomplete";
    }
    
    return "No car information (Direct complaint)";
  };

  const getShowroomDetails = (complaint) => {
    if (complaint.bookingId && complaint.bookingId.showroomId) {
      const showroom = complaint.bookingId.showroomId;
      return showroom.showroomName || showroom.name || "Showroom details available";
    }
    return "No showroom information";
  };

  const getCarPlateNumber = (complaint) => {
    if (complaint.bookingId && complaint.bookingId.carId) {
      return complaint.bookingId.carId.plateNumber || "N/A";
    }
    return "N/A";
  };

  const getCarRentRate = (complaint) => {
    if (complaint.bookingId && complaint.bookingId.carId) {
      return complaint.bookingId.carId.rentRate || "N/A";
    }
    return "N/A";
  };

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

  const formatCurrency = (amount) => {
    if (!amount || isNaN(amount)) return "Rs 0";
    return `Rs ${amount}`;
  };

  const hasBookingData = (complaint) => {
    return complaint.bookingId && complaint.bookingId._id;
  };

  const getResolutionRateColor = (rate) => {
    if (rate >= 80) return "text-green-600";
    if (rate >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getResolutionRateBgColor = (rate) => {
    if (rate >= 80) return "bg-green-100";
    if (rate >= 60) return "bg-yellow-100";
    return "bg-red-100";
  };

  return (
    <div className="bg-white shadow rounded-xl p-6">
      <h2 className="text-2xl font-bold text-[#394A9A] mb-6">
        {view === "showrooms" 
          ? "Showrooms Complaint Resolution Rates" 
          : `Complaints - ${selectedShowroom?.name}`}
      </h2>

      {/* Back button when in complaints view */}
      {view === "complaints" && (
        <button
          onClick={handleBackToShowrooms}
          className="mb-4 px-4 py-2 bg-[#C17D3C] text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center"
        >
          ← Back to Showrooms
        </button>
      )}

      {/* Showroom Cards View */}
      {view === "showrooms" && (
        <>
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-500 mt-2">Loading showrooms...</p>
            </div>
          ) : showrooms.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 text-lg">No showrooms with complaints found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {showrooms.map((showroom) => (
                <div
                  key={showroom._id}
                  className="relative bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow p-6"
                >
                  {/* Warning Button - Show only for low resolution rates */}
                  {showroom.resolutionRate < 60 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openWarningModal(showroom);
                      }}
                      className="absolute top-3 right-3 p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors shadow-sm"
                      title="Send Warning for Low Resolution Rate"
                    >
                      ⚠️
                    </button>
                  )}
                  
                  <div
                    onClick={() => handleShowroomClick(showroom)}
                    className="cursor-pointer"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {showroom.name}
                      </h3>
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${getResolutionRateBgColor(showroom.resolutionRate)} ${getResolutionRateColor(showroom.resolutionRate)}`}>
                        {showroom.resolutionRate}% Resolved
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4">{showroom.address}</p>
                    
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="bg-blue-50 p-2 rounded">
                        <div className="text-lg font-bold text-blue-700">{showroom.totalComplaints}</div>
                        <div className="text-xs text-blue-600">Total</div>
                      </div>
                      <div className="bg-green-50 p-2 rounded">
                        <div className="text-lg font-bold text-green-700">{showroom.resolvedComplaints}</div>
                        <div className="text-xs text-green-600">Resolved</div>
                      </div>
                      <div className="bg-red-50 p-2 rounded">
                        <div className="text-lg font-bold text-red-700">{showroom.pendingComplaints}</div>
                        <div className="text-xs text-red-600">Pending</div>
                      </div>
                    </div>
                    
                    <div className="mt-4 text-center">
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        View Complaints →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Complaints Table View */}
      {view === "complaints" && (
        <>
          {/* Stats Cards for Selected Showroom */}
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
              <p className="text-2xl font-bold">{getSelectedShowroomStats().total}</p>
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
              <p className="text-2xl font-bold">{getSelectedShowroomStats().resolved}</p>
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
              <p className="text-2xl font-bold">{getSelectedShowroomStats().pending}</p>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-500 mt-2">Loading complaints...</p>
            </div>
          ) : filteredComplaints.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 text-lg">No complaints found for this showroom.</p>
              <p className="text-gray-400 text-sm mt-1">
                {filter !== "all" ? `No ${filter} complaints` : "No complaints for this showroom"}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 border text-left">Customer</th>
                    <th className="px-4 py-3 border text-left">Complaint Type</th>
                    <th className="px-4 py-3 border text-left">Car</th>
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
                            {complaint.email}
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
                            className="px-3 py-1 bg-[#C17D3C] text-white rounded hover:bg-blue-700 transition-colors text-sm"
                          >
                            View Details
                          </button>
                          {!complaint.resolved && (
                            <button
                              onClick={() => openResolutionModal(complaint._id)}
                              className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-sm"
                            >
                              Resolve
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {/* Detailed View Modal */}
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
              {/* Complaint Information */}
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

                {/* Customer Information */}
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

                {/* Resolution Details Section */}
                {selectedComplaint.resolved && selectedComplaint.resolutionDescription && (
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-lg mb-3 text-[#394A9A]">
                      Resolution Details
                    </h4>
                    <div className="space-y-2">
                      <p><strong>Resolved At:</strong> 
                        {selectedComplaint.resolvedAt ? formatDate(selectedComplaint.resolvedAt) : "N/A"}
                      </p>
                      <p><strong>Resolution Description:</strong></p>
                      <p className="text-gray-700 bg-white p-3 rounded border min-h-[80px]">
                        {selectedComplaint.resolutionDescription}
                      </p>
                      {selectedComplaint.resolvedBy && (
                        <p><strong>Resolved By:</strong> 
                          <span className="ml-2 font-mono text-sm bg-green-100 px-2 py-1 rounded">
                            {selectedComplaint.resolvedBy.name || selectedComplaint.resolvedBy.email || "Admin"}
                          </span>
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Show placeholder if resolved but no description */}
                {selectedComplaint.resolved && !selectedComplaint.resolutionDescription && (
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-lg mb-3 text-[#394A9A]">
                      Resolution Status
                    </h4>
                    <p className="text-yellow-700">
                      This complaint has been marked as resolved. No additional resolution details were provided.
                    </p>
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

                {/* Proof Attachment */}
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

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
              <button
                onClick={() => setSelectedComplaint(null)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              {!selectedComplaint.resolved && (
                <button
                  onClick={() => openResolutionModal(selectedComplaint._id)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Mark as Resolved
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Resolution Description Modal */}
      {showResolutionModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
          onClick={handleResolutionBackdropClick}
        >
          <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <button
              onClick={closeResolutionModal}
              className="absolute top-4 right-4 text-gray-600 hover:text-black text-2xl bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center"
            >
              ✖
            </button>

            <h3 className="text-xl font-bold mb-4 text-[#394A9A]">
              Resolve Complaint
            </h3>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Resolution Description *
              </label>
              <textarea
                value={resolutionDescription}
                onChange={(e) => setResolutionDescription(e.target.value)}
                placeholder="Describe how this complaint was resolved..."
                rows="5"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#C17D3C] focus:border-[#C17D3C]"
              />
              <p className="text-xs text-gray-500 mt-1">
                Please provide details about how this complaint was resolved. This will be visible to the customer.
              </p>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={closeResolutionModal}
                disabled={resolving}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={resolveComplaint}
                disabled={resolving || !resolutionDescription.trim()}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {resolving ? "Resolving..." : "Confirm Resolution"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Warning Modal */}
      {showWarningModal && selectedShowroomForWarning && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
          onClick={handleWarningBackdropClick}
        >
          <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <button
              onClick={closeWarningModal}
              className="absolute top-4 right-4 text-gray-600 hover:text-black text-2xl bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center"
            >
              ✖
            </button>

            <h3 className="text-xl font-bold mb-4 text-[#C17D3C]">
              ⚠️ Send Warning to Showroom
            </h3>

            <div className="mb-4">
              <p className="font-semibold text-lg">{selectedShowroomForWarning.name}</p>
              <p className="text-sm text-gray-600 mb-3">
                Resolution Rate: <span className="font-bold text-red-600">{selectedShowroomForWarning.resolutionRate}%</span>
              </p>
              
              <div className="bg-white p-4 rounded-lg mb-4">
                <p className="text-[#C17D3C] text-sm">
                  <strong>Warning Message:</strong><br/>
                  This showroom has a low complaint resolution rate. Sending this warning will notify the showroom to improve their response time.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm bg-gray-50 p-3 rounded">
                <div><strong>Total Complaints:</strong> {selectedShowroomForWarning.totalComplaints}</div>
                <div><strong>Resolved:</strong> {selectedShowroomForWarning.resolvedComplaints}</div>
                <div><strong>Pending:</strong> {selectedShowroomForWarning.pendingComplaints}</div>
                <div><strong>Rate:</strong> {selectedShowroomForWarning.resolutionRate}%</div>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={closeWarningModal}
                disabled={sendingWarning}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={sendWarningToShowroom}
                disabled={sendingWarning}
                className="px-4 py-2 bg-[#C17D3C] text-white rounded-lg hover:bg-[#C17D3C] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {sendingWarning ? "Sending..." : "Send Warning"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Complaints;