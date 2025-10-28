// import axios from "axios";
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { toast } from "react-toastify";
// import Toast from "../Toast";
// import ConfirmationDialog from "./ConfirmationDialog.jsx";
// import Dialog from "./Dialog";
// import Navbar from "./Navbar";
// import BookingCard from "./BookingCard.jsx";
// import Footer from "./Footer";
// import { 
//   FiLoader, 
//   FiAlertCircle, 
//   FiCalendar, 
//   FiDownload, 
//   FiEye, 
//   FiX,
//   FiFilter,
//   FiClock,
//   FiChevronDown,
//   FiArchive,
//   FiMessageSquare
// } from "react-icons/fi";

// const Base_Url = import.meta.env.VITE_API_URL;

// const UserBookings = () => {
//   const [showDetailsModal, setShowDetailsModal] = useState(false);
//   const [bookings, setBookings] = useState([]);
//   const [filteredBookings, setFilteredBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [ModelOpen, setModelOpen] = useState(false);
//   const [ShowDialog, setShowDialog] = useState(false);
//   const [selectedBooking, setSelectedBooking] = useState(null);
//   const [car, setCar] = useState(null);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [selectedBookingDetails, setSelectedBookingDetails] = useState(null);
//   const [progress, setProgress] = useState(0);
//   const [showMaintenanceModal, setShowMaintenanceModal] = useState(false);
//   const [maintenanceDetails, setMaintenanceDetails] = useState(null);
//   const [filter, setFilter] = useState("all");
//   const [showFilterDropdown, setShowFilterDropdown] = useState(false);
//   const [showCancelReasonDialog, setShowCancelReasonDialog] = useState(false);
//   const [cancelReason, setCancelReason] = useState("");
//   const [cancellingBookingId, setCancellingBookingId] = useState(null);

//   const cancellationReasons = [
//     "Change of plans",
//     "Found better alternative",
//     "Price too high",
//     "Travel dates changed",
//     "Vehicle not suitable",
//     "Personal emergency",
//     "Other reasons"
//   ];

//   const filterOptions = [
//     { value: "all", label: "All Bookings", icon: <FiCalendar className="mr-2" /> },
//     { value: "current", label: "Upcoming Bookings", icon: <FiClock className="mr-2" /> },
//     { value: "past", label: "Past Bookings", icon: <FiArchive className="mr-2" /> }
//   ];

//   const handleSeeDetails = (booking) => {
//     setSelectedBookingDetails(booking);
//     setShowMaintenanceModal(true);
//   };

//   useEffect(() => {
//     if (bookings.length === 0) return;

//     const now = new Date();
//     let filtered = [];

//     switch (filter) {
//       case "current":
//         filtered = bookings.filter(booking => {
//           const endDate = new Date(booking.rentalEndDate);
//           const [time, modifier] = booking.rentalEndTime.split(" ");
//           let [hours, minutes] = time.split(":").map(Number);
//           if (modifier === "PM" && hours !== 12) hours += 12;
//           if (modifier === "AM" && hours === 12) hours = 0;
//           endDate.setHours(hours, minutes, 0);
//           return endDate > now;
//         });
//         break;
//       case "past":
//         filtered = bookings.filter(booking => {
//           const endDate = new Date(booking.rentalEndDate);
//           const [time, modifier] = booking.rentalEndTime.split(" ");
//           let [hours, minutes] = time.split(":").map(Number);
//           if (modifier === "PM" && hours !== 12) hours += 12;
//           if (modifier === "AM" && hours === 12) hours = 0;
//           endDate.setHours(hours, minutes, 0);
//           return endDate < now;
//         });
//         break;
//       case "completed":
//         filtered = bookings.filter(booking => booking.status === "completed");
//         break;
//       default:
//         filtered = [...bookings];
//     }

//     setFilteredBookings(filtered);
//   }, [bookings, filter]);

//   useEffect(() => {
//     if (selectedBookingDetails) {
//       const { rentalStartDate, rentalEndDate, rentalStartTime, rentalEndTime } =
//         selectedBookingDetails;

//       const convertTo24HourFormat = (time) => {
//         try {
//           if (typeof time !== "string")
//             throw new Error("Input must be a string.");

//           const [timePart, modifier] = time.trim().split(" ");
//           if (
//             !timePart ||
//             !modifier ||
//             !["AM", "PM"].includes(modifier.toUpperCase())
//           ) {
//             throw new Error(
//               "Invalid time format. Expected format like '03:45 PM'."
//             );
//           }

//           const [hoursStr, minutesStr] = timePart.split(":");
//           if (!hoursStr || !minutesStr) {
//             throw new Error(
//               "Invalid time component. Hours and minutes are required."
//             );
//           }

//           let hours = parseInt(hoursStr, 10);
//           let minutes = parseInt(minutesStr, 10);

//           if (
//             isNaN(hours) ||
//             isNaN(minutes) ||
//             hours < 1 ||
//             hours > 12 ||
//             minutes < 0 ||
//             minutes > 59
//           ) {
//             throw new Error("Invalid numeric values for hours or minutes.");
//           }

//           if (modifier.toUpperCase() === "PM" && hours !== 12) hours += 12;
//           if (modifier.toUpperCase() === "AM" && hours === 12) hours = 0;

//           setMaintenanceDetails(
//             selectedBookingDetails?.carDetails?.maintenanceLogs.filter(
//               (log) => log.bookingId === selectedBookingDetails._id
//             )
//           );

//           return { hours, minutes };
//         } catch (error) {
//           console.error("Time conversion error:", error.message);
//           return null;
//         }
//       };

//       const { hours: startHour, minutes: startMinute } =
//         convertTo24HourFormat(rentalStartTime);
//       const { hours: endHour, minutes: endMinute } =
//         convertTo24HourFormat(rentalEndTime);

//       const start = new Date(rentalStartDate);
//       start.setHours(startHour, startMinute, 0);

//       const end = new Date(rentalEndDate);
//       end.setHours(endHour, endMinute, 0);

//       const now = Date.now();

//       if (now >= start.getTime() && now <= end.getTime()) {
//         const totalDuration = end.getTime() - start.getTime();
//         const elapsedTime = now - start.getTime();
//         const progressPercentage = (elapsedTime / totalDuration) * 100;
//         setProgress(progressPercentage);
//       } else if (now > end.getTime()) {
//         setProgress(100);
//       } else {
//         setProgress(0);
//       }
//     }
//   }, [selectedBookingDetails]);

//   const openDialog = (booking) => {
//     setSelectedBookingDetails(booking);
//     setIsDialogOpen(true);
//   };

//   const closeDialog = () => {
//     setIsDialogOpen(false);
//     setSelectedBookingDetails(null);
//   };

//   const openDetailsModal = (carDetails) => {
//     setCar(carDetails);
//     setShowDetailsModal(true);
//   };

//   const closeDetailsModal = () => {
//     setShowDetailsModal(false);
//     setCar(null);
//   };

//   const handleViewInvoice = (invoiceUrl) => {
//     window.open(`${invoiceUrl}`, "_blank");
//   };

//   const handleDownloadInvoice = (invoiceUrl) => {
//     window.location.href = `${invoiceUrl}`;
//   };

//   const fetchBookings = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(`${Base_Url}/api/bookcar/my-bookings`, {
//         withCredentials: true,
//       });

//       if (
//         response.status === 200 &&
//         response.data &&
//         response.data.length > 0
//       ) {
//         setBookings(response.data);
//         setError("");
//       } else if (response.status === 204) {
//         setError("You have no active bookings, book a car first.");
//         Toast("You have no active bookings, book a car first.", "error");
//         setBookings([]);
//       }
//     } catch (err) {
//       if (err.response) {
//         if (err.response.status === 404) {
//           setError("You have no active bookings, book a car first.");
//           Toast("You have no active bookings, book a car first.", "error");
//         } else {
//           setError("Server error. Please try again later.");
//         }
//       } else if (err.request) {
//         setError("API is not working, failed to fetch bookings.");
//       } else {
//         setError("Failed to fetch bookings.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   const ReturnCar = async (BookingId) => {
//     try {
//       const response = await axios.post(
//         `${Base_Url}/api/bookcar/returncar/${BookingId}`,
//         {},
//         {
//           withCredentials: true,
//         }
//       );
//       if (response.status === 200) {
//         toast.success(response.data.message);
//       }
//       fetchBookings();
//     } catch (error) {
//       console.log("ERROR IN RETURN CAR", error.response?.data?.message);
//       toast.error(error.response?.data?.message || "Failed to return car");
//     }
//   };

//   const openCancelReasonDialog = (bookingId) => {
//     setCancellingBookingId(bookingId);
//     setCancelReason("");
//     setShowCancelReasonDialog(true);
//   };

//   const closeCancelReasonDialog = () => {
//     setShowCancelReasonDialog(false);
//     setCancelReason("");
//     setCancellingBookingId(null);
//   };

//   const CancleFunction = async (bookingId, reason = "") => {
//     try {
//       const response = await axios.delete(
//         `${Base_Url}/api/bookcar/cancel/${bookingId}`,
//         {
//           withCredentials: true,
//           data: { cancellationReason: reason }
//         } 
//       );
//       setBookings((prevBookings) =>
//         prevBookings.filter((booking) => booking._id !== bookingId)
//       );
//       toast.success("Booking cancelled successfully");
//     } catch (error) {
//       if (error.response) {
//         toast.error(error.response.data.message);
//       } else {
//         console.log("Error in cancel booking:", error.message);
//         toast.error("Failed to cancel booking");
//       }
//     } finally {
//       setShowDialog(false);
//       closeCancelReasonDialog();
//     }
//   };

//   const handleCancelWithReason = () => {
//     if (!cancelReason.trim()) {
//       toast.error("Please select a cancellation reason");
//       return;
//     }
//     CancleFunction(cancellingBookingId, cancelReason);
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
//         <Navbar />
//         <div className="flex-grow flex items-center justify-center">
//           <div className="text-center bg-white p-8 rounded-xl shadow-lg">
//             <FiLoader className="animate-spin text-4xl text-blue-600 mx-auto mb-4" />
//             <p className="text-lg text-gray-600">Loading your bookings...</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
//         <Navbar />
//         <div className="flex-grow flex items-center justify-center px-4">
//           <div className="max-w-md text-center bg-white p-8 rounded-xl shadow-lg">
//             <FiAlertCircle className="text-5xl text-red-500 mx-auto mb-4" />
//             <h3 className="text-2xl font-bold text-gray-800 mb-2">Oops!</h3>
//             <p className="text-gray-600 mb-6">{error}</p>
//             <Link
//               to="/customer/cars"
//               className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg transition duration-300 inline-block shadow-md hover:shadow-lg"
//             >
//               Browse Available Cars
//             </Link>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 ">
//         <Navbar />
//         <div className="container mx-auto px-4 py-12">
//           <div className="mb-8">
//             <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
//               <div className="text-center md:text-left">
//                 <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
//                   Your Bookings
//                 </h1>
//                 <p className="text-lg text-gray-600">
//                   {bookings.length > 0
//                     ? "Manage and view your booking history"
//                     : "You don't have any bookings yet"}
//                 </p>
//               </div>

//               {bookings.length > 0 && (
//                 <div className="relative flex justify-center md:justify-end">
//                   <button
//                     onClick={() => setShowFilterDropdown(!showFilterDropdown)}
//                     className="flex items-center px-4 py-2.5 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#C17D3C] transition-all duration-200 text-gray-700"
//                   >
//                     <FiFilter className="mr-2 text-[#C17D3C]" />
//                     <span className="font-medium">
//                       {filterOptions.find(opt => opt.value === filter)?.label || "Filter By"}
//                     </span>
//                     <FiChevronDown className={`ml-2 transition-transform duration-200 ${showFilterDropdown ? 'rotate-180' : ''}`} />
//                   </button>
                  
//                   {showFilterDropdown && (
//                     <div className="absolute top-12 right-0 z-10 w-56 origin-top-right rounded-lg bg-white shadow-xl ring-1 ring-gray-200 focus:outline-none overflow-hidden">
//                       <div className="py-1">
//                         {filterOptions.map((option) => (
//                           <button
//                             key={option.value}
//                             onClick={() => {
//                               setFilter(option.value);
//                               setShowFilterDropdown(false);
//                             }}
//                             className={`flex items-center w-full px-4 py-2.5 text-left text-sm ${
//                               filter === option.value
//                                 ? "bg-[#C17D3C]/10 text-[#C17D3C] font-medium"
//                                 : "text-gray-700 hover:bg-gray-50"
//                             } transition-colors duration-150`}
//                           >
//                             <span className="mr-3 text-[#C17D3C]">{option.icon}</span>
//                             <span>{option.label}</span>
//                           </button>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>

//           {filteredBookings.length === 0 ? (
//             <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto text-center">
//               {filter === "all" ? (
//                 <>
//                   <FiCalendar className="text-5xl text-blue-500 mx-auto mb-4" />
//                   <h3 className="text-2xl font-semibold text-gray-800 mb-3">
//                     No Bookings Found
//                   </h3>
//                   <p className="text-gray-600 mb-6">
//                     It looks like you haven't made any bookings yet. Start by browsing
//                     our available cars.
//                   </p>
//                   <Link
//                     to="/cars"
//                     className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg transition duration-300 inline-block shadow-md hover:shadow-lg"
//                   >
//                     Explore Cars
//                   </Link>
//                 </>
//               ) : (
//                 <>
//                   <FiCalendar className="text-5xl text-gray-400 mx-auto mb-4" />
//                   <h3 className="text-2xl font-semibold text-gray-800 mb-3">
//                     No {filterOptions.find(opt => opt.value === filter)?.label} Found
//                   </h3>
//                   <p className="text-gray-600 mb-6">
//                     You don't have any {filter === "current" ? "current" : "past"} bookings.
//                     {filter === "current" && " All your bookings might be completed or upcoming."}
//                   </p>
//                   <button
//                     onClick={() => setFilter("all")}
//                     className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg transition duration-300 inline-block shadow-md hover:shadow-lg"
//                   >
//                     View All Bookings
//                   </button>
//                 </>
//               )}
//             </div>
//           ) : (
//             <div className="bg-white rounded-xl shadow-lg p-8">
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
//                 {filteredBookings.map((booking) => {
//                   if (!booking.carDetails) return null;

//                   const CurrentDate = new Date();
//                   const BookingStartDate = new Date(booking?.rentalStartDate);
//                   const BookingEndDate = new Date(booking?.rentalEndDate);

//                   const [time, modifier] = booking?.StartTime.split(" ");
//                   let [hours, minutes] = time.split(":").map(Number);
//                   if (modifier === "PM" && hours !== 12) hours += 12;
//                   if (modifier === "AM" && hours === 12) hours = 0;
//                   BookingStartDate.setHours(hours, minutes, 0);

//                   const [time1, modifier1] = booking?.rentalEndTime.split(" ");
//                   let [hours1, minutes1] = time1.split(":").map(Number);
//                   if (modifier1 === "PM" && hours1 !== 12) hours1 += 12;
//                   if (modifier1 === "AM" && hours1 === 12) hours1 = 0;
//                   BookingEndDate.setHours(hours1, minutes1, 0);
                
//                   return (
                  
//                     <div key={booking._id} className="w-full flex justify-center">
//                       <BookingCard
//                         booking={booking}
//                         handleSeeDetails={handleSeeDetails}
//                         ReturnCar={ReturnCar}
//                         setModelOpen={setModelOpen}
//                         setSelectedBooking={setSelectedBooking}
//                         setShowDialog={setShowDialog}
//                         openDialog={openDialog}
//                         ModelOpen={ModelOpen}
//                         openCancelReasonDialog={openCancelReasonDialog}
//                       />
//                     </div>
                    
//                   );
//                 })}
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Details Modal */}
//         {showDetailsModal && car && (
//           <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
//             <div className="bg-white rounded-xl shadow-2xl relative w-full max-w-4xl max-h-[90vh] overflow-y-auto m-4">
//               <button
//                 onClick={closeDetailsModal}
//                 className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition p-2 rounded-full hover:bg-gray-100"
//               >
//                 <FiX className="text-2xl" />
//               </button>
//               <div className="p-8">
//                 <h2 className="text-3xl font-bold text-center mb-6 text-gray-900">
//                   {car.carBrand} {car.carModel}
//                 </h2>
                
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//                   <div className="space-y-6">
//                     <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
//                       <h3 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
//                         Vehicle Details
//                       </h3>
//                       <div className="space-y-3">
//                         <div className="flex justify-between">
//                           <span className="text-gray-600">Model:</span>
//                           <span className="font-medium">{car.carModel}</span>
//                         </div>
//                         <div className="flex justify-between">
//                           <span className="text-gray-600">Year:</span>
//                           <span className="font-medium">{car.carYear}</span>
//                         </div>
//                         <div className="flex justify-between">
//                           <span className="text-gray-600">Color:</span>
//                           <span className="font-medium">{car.carColor}</span>
//                         </div>
//                         <div className="flex justify-between">
//                           <span className="text-gray-600">Fuel Type:</span>
//                           <span className="font-medium">{car.fuelType}</span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
                  
//                   <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
//                     <h3 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
//                       Gallery
//                     </h3>
//                     <div className="grid grid-cols-2 gap-4">
//                       {car.images?.map((img, index) => (
//                         <img
//                           key={index}
//                           src={`http://localhost:3000/uploads/${img}`}
//                           alt={`Car ${index}`}
//                           className="w-full h-40 object-cover rounded-lg shadow-sm hover:shadow-md transition cursor-pointer"
//                         />
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Confirmation Dialog */}
//         {ShowDialog && (
//           <ConfirmationDialog
//             message="Are you sure you want to cancel this booking?"
//             onCancel={() => setShowDialog(false)}
//             onConfirm={() => CancleFunction(selectedBooking)}
//           />
//         )}

//         {/* Booking Details Dialog */}
//         {isDialogOpen && selectedBookingDetails && (
//           <Dialog
//             isOpen={isDialogOpen}
//             onClose={closeDialog}
//             car={selectedBookingDetails.carDetails}
//             showroom={selectedBookingDetails.showroomDetails}
//             bookingDetails={{
//               customerName: selectedBookingDetails.customerName,
//               startDateTime: selectedBookingDetails.rentalStartDate,
//               endDateTime: selectedBookingDetails.rentalEndDate,
//               starttime: selectedBookingDetails.rentalStartTime,
//               endtime: selectedBookingDetails.rentalEndTime,
//               BookingStatus: selectedBookingDetails.status
//             }}
//             progress={progress}
//           />
//         )}
        
//         {/* Maintenance Modal */}
//         {showMaintenanceModal && maintenanceDetails && (
//           <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
//             <div className="bg-white rounded-xl shadow-2xl relative w-full max-w-4xl max-h-[90vh] overflow-y-auto m-4">
//               <button
//                 onClick={() => setShowMaintenanceModal(false)}
//                 className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition p-2 rounded-full hover:bg-gray-100"
//               >
//                 <FiX className="text-2xl" />
//               </button>
              
//               <div className="p-8">
//                 <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">
//                   Maintenance Details
//                 </h2>
//                 <p className="text-center text-gray-600 mb-8">
//                   Here's the maintenance history for your booking
//                 </p>

//                 <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-8">
//                   <h3 className="text-xl font-semibold text-blue-800 mb-4">
//                     Booking Summary
//                   </h3>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <p className="text-gray-600">Booking ID:</p>
//                       <p className="font-medium text-gray-900">
//                         {selectedBookingDetails._id}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-gray-600">Showroom:</p>
//                       <p className="font-medium text-gray-900">
//                         {selectedBookingDetails.showroomDetails.showroomName}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-gray-600">Vehicle:</p>
//                       <p className="font-medium text-gray-900">
//                         {selectedBookingDetails.carDetails.carBrand}{" "}
//                         {selectedBookingDetails.carDetails.carModel}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-gray-600">Rental Period:</p>
//                       <p className="font-medium text-gray-900">
//                         {new Date(
//                           selectedBookingDetails.rentalStartDate
//                         ).toLocaleDateString()}{" "}
//                         <FiClock className="inline ml-1 mr-1" />
//                         {selectedBookingDetails.rentalStartTime} -{" "}
//                         {new Date(
//                           selectedBookingDetails.rentalEndDate
//                         ).toLocaleDateString()}{" "}
//                         <FiClock className="inline ml-1 mr-1" />
//                         {selectedBookingDetails.rentalEndTime}
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="mb-8">
//                   <h3 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
//                     Maintenance Logs
//                   </h3>
                  
//                   {maintenanceDetails.length > 0 ? (
//                     <div className="space-y-6">
//                       {maintenanceDetails.map((log, index) => (
//                         <div
//                           key={index}
//                           className="bg-gray-50 border border-gray-200 rounded-xl p-6 hover:shadow-md transition"
//                         >
//                           <div className="flex justify-between items-start mb-4">
//                             <h4 className="text-lg font-semibold text-gray-800">
//                               Maintenance #{index + 1}
//                             </h4>
//                             <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
//                               {new Date(log.date).toLocaleDateString()}
//                             </span>
//                           </div>

//                           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                             <div>
//                               <h5 className="font-medium text-gray-700 mb-2 flex items-center">
//                                 <FiClock className="mr-2" /> Tasks Performed
//                               </h5>
//                               <ul className="space-y-2">
//                                 {Object.entries(log.tasks[0])
//                                   .filter(([_, value]) => value === false)
//                                   .map(([key], taskIndex) => (
//                                     <li key={taskIndex} className="capitalize">
//                                       • {key}
//                                     </li>
//                                   ))}
//                               </ul>
//                             </div>

//                             <div>
//                               <h5 className="font-medium text-gray-700 mb-2 flex items-center">
//                                 <FiClock className="mr-2" /> Descriptions
//                               </h5>
//                               <ul className="space-y-2">
//                                 {log.repairDescriptions.length > 0 &&
//                                   Object.entries(log.repairDescriptions[0]).map(
//                                     ([part, description], descIndex) => (
//                                       <li key={descIndex}>
//                                         <span className="font-medium capitalize">
//                                           {part}:
//                                         </span>{" "}
//                                         {description}
//                                       </li>
//                                     )
//                                   )}
//                               </ul>
//                             </div>

//                             <div>
//                               <h5 className="font-medium text-gray-700 mb-2 flex items-center">
//                                 <FiClock className="mr-2" /> Costs
//                               </h5>
//                               <ul className="space-y-2">
//                                 {log.repairCosts.length > 0 &&
//                                   Object.entries(log.repairCosts[0]).map(
//                                     ([part, cost], costIndex) => (
//                                       <li key={costIndex}>
//                                         <span className="font-medium capitalize">
//                                           {part}:
//                                         </span>{" "}
//                                         Rs. {cost.toLocaleString()}
//                                       </li>
//                                     )
//                                   )}
//                               </ul>
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   ) : (
//                     <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
//                       <p className="text-yellow-800 font-medium">
//                         No maintenance logs found for this booking.
//                       </p>
//                     </div>
//                   )}
//                 </div>

//                 <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
//                   <button
//                     onClick={() =>
//                       handleViewInvoice(selectedBookingDetails.currentInvoiceUrl)
//                     }
//                     className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg transition shadow-md hover:shadow-lg"
//                   >
//                     <FiEye className="mr-2" /> View Invoice
//                   </button>
//                   <button
//                     onClick={() =>
//                       handleDownloadInvoice(
//                         selectedBookingDetails.currentInvoiceUrl
//                       )
//                     }
//                     className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-medium rounded-lg transition shadow-md hover:shadow-lg"
//                   >
//                     <FiDownload className="mr-2" /> Download Invoice
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Cancellation Reason Dialog */}
//         {showCancelReasonDialog && (
//           <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
//             <div className="bg-white rounded-xl shadow-2xl relative w-full max-w-md mx-4">
//               <button
//                 onClick={closeCancelReasonDialog}
//                 className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition p-2 rounded-full hover:bg-gray-100"
//               >
//                 <FiX className="text-xl" />
//               </button>
              
//               <div className="p-6">
//                 <div className="flex items-center mb-4">
//                   <FiMessageSquare className="text-2xl text-orange-500 mr-3" />
//                   <h2 className="text-2xl font-bold text-gray-900">
//                     Cancel Booking
//                   </h2>
//                 </div>
                
//                 <p className="text-gray-600 mb-6">
//                   Please let us know why you're cancelling this booking. This helps us improve our service.
//                 </p>

//                 <div className="space-y-3 mb-6 max-h-60 overflow-y-auto">
//                   {cancellationReasons.map((reason, index) => (
//                     <label
//                       key={index}
//                       className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
//                     >
//                       <input
//                         type="radio"
//                         name="cancelReason"
//                         value={reason}
//                         checked={cancelReason === reason}
//                         onChange={(e) => setCancelReason(e.target.value)}
//                         className="mr-3 text-orange-500 focus:ring-orange-500"
//                       />
//                       <span className="text-gray-700">{reason}</span>
//                     </label>
//                   ))}
//                 </div>

//                 <div className="flex flex-col sm:flex-row gap-3">
//                   <button
//                     onClick={closeCancelReasonDialog}
//                     className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
//                   >
//                     Go Back
//                   </button>
//                   <button
//                     onClick={handleCancelWithReason}
//                     disabled={!cancelReason}
//                     className={`flex-1 px-4 py-3 rounded-lg font-medium transition ${
//                       cancelReason
//                         ? "bg-orange-500 hover:bg-orange-600 text-white"
//                         : "bg-gray-300 text-gray-500 cursor-not-allowed"
//                     }`}
//                   >
//                     Confirm Cancellation
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default UserBookings;

// import axios from "axios";
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { toast } from "react-toastify";
// import Toast from "../Toast";
// import ConfirmationDialog from "./ConfirmationDialog.jsx";
// import Dialog from "./Dialog";
// import Navbar from "./Navbar";
// import BookingCard from "./BookingCard.jsx";
// import Footer from "./Footer";
// import { 
//   FiLoader, 
//   FiAlertCircle, 
//   FiCalendar, 
//   FiDownload, 
//   FiEye, 
//   FiX,
//   FiFilter,
//   FiClock,
//   FiChevronDown,
//   FiArchive,
//   FiMessageSquare
// } from "react-icons/fi";

// const Base_Url = import.meta.env.VITE_API_URL;

// const UserBookings = () => {
//   const [showDetailsModal, setShowDetailsModal] = useState(false);
//   const [bookings, setBookings] = useState([]);
//   const [filteredBookings, setFilteredBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [ModelOpen, setModelOpen] = useState(false);
//   const [ShowDialog, setShowDialog] = useState(false);
//   const [selectedBooking, setSelectedBooking] = useState(null);
//   const [car, setCar] = useState(null);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [selectedBookingDetails, setSelectedBookingDetails] = useState(null);
//   const [progress, setProgress] = useState(0);
//   const [showMaintenanceModal, setShowMaintenanceModal] = useState(false);
//   const [maintenanceDetails, setMaintenanceDetails] = useState(null);
//   const [filter, setFilter] = useState("all");
//   const [showFilterDropdown, setShowFilterDropdown] = useState(false);
//   const [showCancelReasonDialog, setShowCancelReasonDialog] = useState(false);
//   const [cancelReason, setCancelReason] = useState("");
//   const [cancellingBookingId, setCancellingBookingId] = useState(null);

//   const cancellationReasons = [
//     "Change of plans",
//     "Found better alternative",
//     "Price too high",
//     "Travel dates changed",
//     "Vehicle not suitable",
//     "Personal emergency",
//     "Other reasons"
//   ];

//   const filterOptions = [
//     { value: "all", label: "All Bookings", icon: <FiCalendar className="mr-2" /> },
//     { value: "current", label: "Upcoming Bookings", icon: <FiClock className="mr-2" /> },
//     { value: "past", label: "Past Bookings", icon: <FiArchive className="mr-2" /> },
//     { value: "overdue", label: "Overdue Bookings", icon: <FiAlertCircle className="mr-2" /> }
//   ];

//   const handleSeeDetails = (booking) => {
//     setSelectedBookingDetails(booking);
//     setShowMaintenanceModal(true);
//   };

//   useEffect(() => {
//     if (bookings.length === 0) return;

//     const now = new Date();
//     let filtered = [];

//     switch (filter) {
//       case "current":
//         filtered = bookings.filter(booking => {
//           const endDate = new Date(booking.rentalEndDate);
//           const [time, modifier] = booking.rentalEndTime.split(" ");
//           let [hours, minutes] = time.split(":").map(Number);
//           if (modifier === "PM" && hours !== 12) hours += 12;
//           if (modifier === "AM" && hours === 12) hours = 0;
//           endDate.setHours(hours, minutes, 0);
//           return endDate > now;
//         });
//         break;
//       case "past":
//         filtered = bookings.filter(booking => {
//           const endDate = new Date(booking.rentalEndDate);
//           const [time, modifier] = booking.rentalEndTime.split(" ");
//           let [hours, minutes] = time.split(":").map(Number);
//           if (modifier === "PM" && hours !== 12) hours += 12;
//           if (modifier === "AM" && hours === 12) hours = 0;
//           endDate.setHours(hours, minutes, 0);
//           return endDate < now;
//         });
//         break;
//       case "overdue":
//         filtered = bookings.filter(booking => booking.isOverdue === true);
//         break;
//       case "completed":
//         filtered = bookings.filter(booking => booking.status === "completed");
//         break;
//       default:
//         filtered = [...bookings];
//     }

//     setFilteredBookings(filtered);
//   }, [bookings, filter]);

//   useEffect(() => {
//     if (selectedBookingDetails) {
//       const { rentalStartDate, rentalEndDate, rentalStartTime, rentalEndTime } =
//         selectedBookingDetails;

//       const convertTo24HourFormat = (time) => {
//         try {
//           if (typeof time !== "string")
//             throw new Error("Input must be a string.");

//           const [timePart, modifier] = time.trim().split(" ");
//           if (
//             !timePart ||
//             !modifier ||
//             !["AM", "PM"].includes(modifier.toUpperCase())
//           ) {
//             throw new Error(
//               "Invalid time format. Expected format like '03:45 PM'."
//             );
//           }

//           const [hoursStr, minutesStr] = timePart.split(":");
//           if (!hoursStr || !minutesStr) {
//             throw new Error(
//               "Invalid time component. Hours and minutes are required."
//             );
//           }

//           let hours = parseInt(hoursStr, 10);
//           let minutes = parseInt(minutesStr, 10);

//           if (
//             isNaN(hours) ||
//             isNaN(minutes) ||
//             hours < 1 ||
//             hours > 12 ||
//             minutes < 0 ||
//             minutes > 59
//           ) {
//             throw new Error("Invalid numeric values for hours or minutes.");
//           }

//           if (modifier.toUpperCase() === "PM" && hours !== 12) hours += 12;
//           if (modifier.toUpperCase() === "AM" && hours === 12) hours = 0;

//           setMaintenanceDetails(
//             selectedBookingDetails?.carDetails?.maintenanceLogs.filter(
//               (log) => log.bookingId === selectedBookingDetails._id
//             )
//           );

//           return { hours, minutes };
//         } catch (error) {
//           console.error("Time conversion error:", error.message);
//           return null;
//         }
//       };

//       const { hours: startHour, minutes: startMinute } =
//         convertTo24HourFormat(rentalStartTime);
//       const { hours: endHour, minutes: endMinute } =
//         convertTo24HourFormat(rentalEndTime);

//       const start = new Date(rentalStartDate);
//       start.setHours(startHour, startMinute, 0);

//       const end = new Date(rentalEndDate);
//       end.setHours(endHour, endMinute, 0);

//       const now = Date.now();

//       if (now >= start.getTime() && now <= end.getTime()) {
//         const totalDuration = end.getTime() - start.getTime();
//         const elapsedTime = now - start.getTime();
//         const progressPercentage = (elapsedTime / totalDuration) * 100;
//         setProgress(progressPercentage);
//       } else if (now > end.getTime()) {
//         setProgress(100);
//       } else {
//         setProgress(0);
//       }
//     }
//   }, [selectedBookingDetails]);

//   const openDialog = (booking) => {
//     setSelectedBookingDetails(booking);
//     setIsDialogOpen(true);
//   };

//   const closeDialog = () => {
//     setIsDialogOpen(false);
//     setSelectedBookingDetails(null);
//   };

//   const openDetailsModal = (carDetails) => {
//     setCar(carDetails);
//     setShowDetailsModal(true);
//   };

//   const closeDetailsModal = () => {
//     setShowDetailsModal(false);
//     setCar(null);
//   };

//   const handleViewInvoice = (invoiceUrl) => {
//     window.open(`${invoiceUrl}`, "_blank");
//   };

//   const handleDownloadInvoice = (invoiceUrl) => {
//     window.location.href = `${invoiceUrl}`;
//   };

//   const fetchBookings = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(`${Base_Url}/api/bookcar/my-bookings`, {
//         withCredentials: true,
//       });

//       if (
//         response.status === 200 &&
//         response.data &&
//         response.data.length > 0
//       ) {
//         setBookings(response.data);
//         setError("");
//       } else if (response.status === 204) {
//         setError("You have no active bookings, book a car first.");
//         Toast("You have no active bookings, book a car first.", "error");
//         setBookings([]);
//       }
//     } catch (err) {
//       if (err.response) {
//         if (err.response.status === 404) {
//           setError("You have no active bookings, book a car first.");
//           Toast("You have no active bookings, book a car first.", "error");
//         } else {
//           setError("Server error. Please try again later.");
//         }
//       } else if (err.request) {
//         setError("API is not working, failed to fetch bookings.");
//       } else {
//         setError("Failed to fetch bookings.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   const ReturnCar = async (BookingId) => {
//     try {
//       const response = await axios.post(
//         `${Base_Url}/api/bookcar/returncar/${BookingId}`,
//         {},
//         {
//           withCredentials: true,
//         }
//       );
//       if (response.status === 200) {
//         toast.success(response.data.message);
//       }
//       fetchBookings();
//     } catch (error) {
//       console.log("ERROR IN RETURN CAR", error.response?.data?.message);
//       toast.error(error.response?.data?.message || "Failed to return car");
//     }
//   };

//   const openCancelReasonDialog = (bookingId) => {
//     setCancellingBookingId(bookingId);
//     setCancelReason("");
//     setShowCancelReasonDialog(true);
//   };

//   const closeCancelReasonDialog = () => {
//     setShowCancelReasonDialog(false);
//     setCancelReason("");
//     setCancellingBookingId(null);
//   };

//   const CancleFunction = async (bookingId, reason = "") => {
//     try {
//       const response = await axios.delete(
//         `${Base_Url}/api/bookcar/cancel/${bookingId}`,
//         {
//           withCredentials: true,
//           data: { cancellationReason: reason }
//         } 
//       );
//       setBookings((prevBookings) =>
//         prevBookings.filter((booking) => booking._id !== bookingId)
//       );
//       toast.success("Booking cancelled successfully");
//     } catch (error) {
//       if (error.response) {
//         toast.error(error.response.data.message);
//       } else {
//         console.log("Error in cancel booking:", error.message);
//         toast.error("Failed to cancel booking");
//       }
//     } finally {
//       setShowDialog(false);
//       closeCancelReasonDialog();
//     }
//   };

//   const handleCancelWithReason = () => {
//     if (!cancelReason.trim()) {
//       toast.error("Please select a cancellation reason");
//       return;
//     }
//     CancleFunction(cancellingBookingId, cancelReason);
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
//         <Navbar />
//         <div className="flex-grow flex items-center justify-center">
//           <div className="text-center bg-white p-8 rounded-xl shadow-lg">
//             <FiLoader className="animate-spin text-4xl text-blue-600 mx-auto mb-4" />
//             <p className="text-lg text-gray-600">Loading your bookings...</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
//         <Navbar />
//         <div className="flex-grow flex items-center justify-center px-4">
//           <div className="max-w-md text-center bg-white p-8 rounded-xl shadow-lg">
//             <FiAlertCircle className="text-5xl text-red-500 mx-auto mb-4" />
//             <h3 className="text-2xl font-bold text-gray-800 mb-2">Oops!</h3>
//             <p className="text-gray-600 mb-6">{error}</p>
//             <Link
//               to="/customer/cars"
//               className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg transition duration-300 inline-block shadow-md hover:shadow-lg"
//             >
//               Browse Available Cars
//             </Link>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 ">
//         <Navbar />
//         <div className="container mx-auto px-4 py-12">
//           <div className="mb-8">
//             <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
//               <div className="text-center md:text-left">
//                 <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
//                   Your Bookings
//                 </h1>
//                 <p className="text-lg text-gray-600">
//                   {bookings.length > 0
//                     ? "Manage and view your booking history"
//                     : "You don't have any bookings yet"}
//                 </p>
//               </div>

//               {bookings.length > 0 && (
//                 <div className="relative flex justify-center md:justify-end">
//                   <button
//                     onClick={() => setShowFilterDropdown(!showFilterDropdown)}
//                     className="flex items-center px-4 py-2.5 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#C17D3C] transition-all duration-200 text-gray-700"
//                   >
//                     <FiFilter className="mr-2 text-[#C17D3C]" />
//                     <span className="font-medium">
//                       {filterOptions.find(opt => opt.value === filter)?.label || "Filter By"}
//                     </span>
//                     <FiChevronDown className={`ml-2 transition-transform duration-200 ${showFilterDropdown ? 'rotate-180' : ''}`} />
//                   </button>
                  
//                   {showFilterDropdown && (
//                     <div className="absolute top-12 right-0 z-10 w-56 origin-top-right rounded-lg bg-white shadow-xl ring-1 ring-gray-200 focus:outline-none overflow-hidden">
//                       <div className="py-1">
//                         {filterOptions.map((option) => (
//                           <button
//                             key={option.value}
//                             onClick={() => {
//                               setFilter(option.value);
//                               setShowFilterDropdown(false);
//                             }}
//                             className={`flex items-center w-full px-4 py-2.5 text-left text-sm ${
//                               filter === option.value
//                                 ? "bg-[#C17D3C]/10 text-[#C17D3C] font-medium"
//                                 : "text-gray-700 hover:bg-gray-50"
//                             } transition-colors duration-150`}
//                           >
//                             <span className="mr-3 text-[#C17D3C]">{option.icon}</span>
//                             <span>{option.label}</span>
//                           </button>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>

//           {filteredBookings.length === 0 ? (
//             <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto text-center">
//               {filter === "all" ? (
//                 <>
//                   <FiCalendar className="text-5xl text-blue-500 mx-auto mb-4" />
//                   <h3 className="text-2xl font-semibold text-gray-800 mb-3">
//                     No Bookings Found
//                   </h3>
//                   <p className="text-gray-600 mb-6">
//                     It looks like you haven't made any bookings yet. Start by browsing
//                     our available cars.
//                   </p>
//                   <Link
//                     to="/cars"
//                     className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg transition duration-300 inline-block shadow-md hover:shadow-lg"
//                   >
//                     Explore Cars
//                   </Link>
//                 </>
//               ) : (
//                 <>
//                   <FiCalendar className="text-5xl text-gray-400 mx-auto mb-4" />
//                   <h3 className="text-2xl font-semibold text-gray-800 mb-3">
//                     No {filterOptions.find(opt => opt.value === filter)?.label} Found
//                   </h3>
//                   <p className="text-gray-600 mb-6">
//                     You don't have any {filter === "current" ? "current" : filter === "overdue" ? "overdue" : "past"} bookings.
//                     {filter === "current" && " All your bookings might be completed or upcoming."}
//                     {filter === "overdue" && " Great! You don't have any overdue bookings."}
//                   </p>
//                   <button
//                     onClick={() => setFilter("all")}
//                     className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg transition duration-300 inline-block shadow-md hover:shadow-lg"
//                   >
//                     View All Bookings
//                   </button>
//                 </>
//               )}
//             </div>
//           ) : (
//             <div className="bg-white rounded-xl shadow-lg p-8">
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
//                 {filteredBookings.map((booking) => {
//                   if (!booking.carDetails) return null;

//                   const CurrentDate = new Date();
//                   const BookingStartDate = new Date(booking?.rentalStartDate);
//                   const BookingEndDate = new Date(booking?.rentalEndDate);

//                   const [time, modifier] = booking?.StartTime.split(" ");
//                   let [hours, minutes] = time.split(":").map(Number);
//                   if (modifier === "PM" && hours !== 12) hours += 12;
//                   if (modifier === "AM" && hours === 12) hours = 0;
//                   BookingStartDate.setHours(hours, minutes, 0);

//                   const [time1, modifier1] = booking?.rentalEndTime.split(" ");
//                   let [hours1, minutes1] = time1.split(":").map(Number);
//                   if (modifier1 === "PM" && hours1 !== 12) hours1 += 12;
//                   if (modifier1 === "AM" && hours1 === 12) hours1 = 0;
//                   BookingEndDate.setHours(hours1, minutes1, 0);
                
//                   return (
                  
//                     <div key={booking._id} className="w-full flex justify-center">
//                       <BookingCard
//                         booking={booking}
//                         handleSeeDetails={handleSeeDetails}
//                         ReturnCar={ReturnCar}
//                         setModelOpen={setModelOpen}
//                         setSelectedBooking={setSelectedBooking}
//                         setShowDialog={setShowDialog}
//                         openDialog={openDialog}
//                         ModelOpen={ModelOpen}
//                         openCancelReasonDialog={openCancelReasonDialog}
//                       />
//                     </div>
                    
//                   );
//                 })}
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Details Modal */}
//         {showDetailsModal && car && (
//           <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
//             <div className="bg-white rounded-xl shadow-2xl relative w-full max-w-4xl max-h-[90vh] overflow-y-auto m-4">
//               <button
//                 onClick={closeDetailsModal}
//                 className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition p-2 rounded-full hover:bg-gray-100"
//               >
//                 <FiX className="text-2xl" />
//               </button>
//               <div className="p-8">
//                 <h2 className="text-3xl font-bold text-center mb-6 text-gray-900">
//                   {car.carBrand} {car.carModel}
//                 </h2>
                
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//                   <div className="space-y-6">
//                     <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
//                       <h3 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
//                         Vehicle Details
//                       </h3>
//                       <div className="space-y-3">
//                         <div className="flex justify-between">
//                           <span className="text-gray-600">Model:</span>
//                           <span className="font-medium">{car.carModel}</span>
//                         </div>
//                         <div className="flex justify-between">
//                           <span className="text-gray-600">Year:</span>
//                           <span className="font-medium">{car.carYear}</span>
//                         </div>
//                         <div className="flex justify-between">
//                           <span className="text-gray-600">Color:</span>
//                           <span className="font-medium">{car.carColor}</span>
//                         </div>
//                         <div className="flex justify-between">
//                           <span className="text-gray-600">Fuel Type:</span>
//                           <span className="font-medium">{car.fuelType}</span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
                  
//                   <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
//                     <h3 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
//                       Gallery
//                     </h3>
//                     <div className="grid grid-cols-2 gap-4">
//                       {car.images?.map((img, index) => (
//                         <img
//                           key={index}
//                           src={`http://localhost:3000/uploads/${img}`}
//                           alt={`Car ${index}`}
//                           className="w-full h-40 object-cover rounded-lg shadow-sm hover:shadow-md transition cursor-pointer"
//                         />
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Confirmation Dialog */}
//         {ShowDialog && (
//           <ConfirmationDialog
//             message="Are you sure you want to cancel this booking?"
//             onCancel={() => setShowDialog(false)}
//             onConfirm={() => CancleFunction(selectedBooking)}
//           />
//         )}

//         {/* Booking Details Dialog */}
//         {isDialogOpen && selectedBookingDetails && (
//           <Dialog
//             isOpen={isDialogOpen}
//             onClose={closeDialog}
//             car={selectedBookingDetails.carDetails}
//             showroom={selectedBookingDetails.showroomDetails}
//             bookingDetails={{
//               customerName: selectedBookingDetails.customerName,
//               startDateTime: selectedBookingDetails.rentalStartDate,
//               endDateTime: selectedBookingDetails.rentalEndDate,
//               starttime: selectedBookingDetails.rentalStartTime,
//               endtime: selectedBookingDetails.rentalEndTime,
//               BookingStatus: selectedBookingDetails.status
//             }}
//             progress={progress}
//           />
//         )}
        
//         {/* Maintenance Modal */}
//         {showMaintenanceModal && maintenanceDetails && (
//           <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
//             <div className="bg-white rounded-xl shadow-2xl relative w-full max-w-4xl max-h-[90vh] overflow-y-auto m-4">
//               <button
//                 onClick={() => setShowMaintenanceModal(false)}
//                 className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition p-2 rounded-full hover:bg-gray-100"
//               >
//                 <FiX className="text-2xl" />
//               </button>
              
//               <div className="p-8">
//                 <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">
//                   Maintenance Details
//                 </h2>
//                 <p className="text-center text-gray-600 mb-8">
//                   Here's the maintenance history for your booking
//                 </p>

//                 <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-8">
//                   <h3 className="text-xl font-semibold text-blue-800 mb-4">
//                     Booking Summary
//                   </h3>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <p className="text-gray-600">Booking ID:</p>
//                       <p className="font-medium text-gray-900">
//                         {selectedBookingDetails._id}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-gray-600">Showroom:</p>
//                       <p className="font-medium text-gray-900">
//                         {selectedBookingDetails.showroomDetails.showroomName}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-gray-600">Vehicle:</p>
//                       <p className="font-medium text-gray-900">
//                         {selectedBookingDetails.carDetails.carBrand}{" "}
//                         {selectedBookingDetails.carDetails.carModel}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-gray-600">Rental Period:</p>
//                       <p className="font-medium text-gray-900">
//                         {new Date(
//                           selectedBookingDetails.rentalStartDate
//                         ).toLocaleDateString()}{" "}
//                         <FiClock className="inline ml-1 mr-1" />
//                         {selectedBookingDetails.rentalStartTime} -{" "}
//                         {new Date(
//                           selectedBookingDetails.rentalEndDate
//                         ).toLocaleDateString()}{" "}
//                         <FiClock className="inline ml-1 mr-1" />
//                         {selectedBookingDetails.rentalEndTime}
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="mb-8">
//                   <h3 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
//                     Maintenance Logs
//                   </h3>
                  
//                   {maintenanceDetails.length > 0 ? (
//                     <div className="space-y-6">
//                       {maintenanceDetails.map((log, index) => (
//                         <div
//                           key={index}
//                           className="bg-gray-50 border border-gray-200 rounded-xl p-6 hover:shadow-md transition"
//                         >
//                           <div className="flex justify-between items-start mb-4">
//                             <h4 className="text-lg font-semibold text-gray-800">
//                               Maintenance #{index + 1}
//                             </h4>
//                             <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
//                               {new Date(log.date).toLocaleDateString()}
//                             </span>
//                           </div>

//                           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                             <div>
//                               <h5 className="font-medium text-gray-700 mb-2 flex items-center">
//                                 <FiClock className="mr-2" /> Tasks Performed
//                               </h5>
//                               <ul className="space-y-2">
//                                 {Object.entries(log.tasks[0])
//                                   .filter(([_, value]) => value === false)
//                                   .map(([key], taskIndex) => (
//                                     <li key={taskIndex} className="capitalize">
//                                       • {key}
//                                     </li>
//                                   ))}
//                               </ul>
//                             </div>

//                             <div>
//                               <h5 className="font-medium text-gray-700 mb-2 flex items-center">
//                                 <FiClock className="mr-2" /> Descriptions
//                               </h5>
//                               <ul className="space-y-2">
//                                 {log.repairDescriptions.length > 0 &&
//                                   Object.entries(log.repairDescriptions[0]).map(
//                                     ([part, description], descIndex) => (
//                                       <li key={descIndex}>
//                                         <span className="font-medium capitalize">
//                                           {part}:
//                                         </span>{" "}
//                                         {description}
//                                       </li>
//                                     )
//                                   )}
//                               </ul>
//                             </div>

//                             <div>
//                               <h5 className="font-medium text-gray-700 mb-2 flex items-center">
//                                 <FiClock className="mr-2" /> Costs
//                               </h5>
//                               <ul className="space-y-2">
//                                 {log.repairCosts.length > 0 &&
//                                   Object.entries(log.repairCosts[0]).map(
//                                     ([part, cost], costIndex) => (
//                                       <li key={costIndex}>
//                                         <span className="font-medium capitalize">
//                                           {part}:
//                                         </span>{" "}
//                                         Rs. {cost.toLocaleString()}
//                                       </li>
//                                     )
//                                   )}
//                               </ul>
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   ) : (
//                     <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
//                       <p className="text-yellow-800 font-medium">
//                         No maintenance logs found for this booking.
//                       </p>
//                     </div>
//                   )}
//                 </div>

//                 <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
//                   <button
//                     onClick={() =>
//                       handleViewInvoice(selectedBookingDetails.currentInvoiceUrl)
//                     }
//                     className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg transition shadow-md hover:shadow-lg"
//                   >
//                     <FiEye className="mr-2" /> View Invoice
//                   </button>
//                   <button
//                     onClick={() =>
//                       handleDownloadInvoice(
//                         selectedBookingDetails.currentInvoiceUrl
//                       )
//                     }
//                     className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-medium rounded-lg transition shadow-md hover:shadow-lg"
//                   >
//                     <FiDownload className="mr-2" /> Download Invoice
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Cancellation Reason Dialog */}
//         {showCancelReasonDialog && (
//           <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
//             <div className="bg-white rounded-xl shadow-2xl relative w-full max-w-md mx-4">
//               <button
//                 onClick={closeCancelReasonDialog}
//                 className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition p-2 rounded-full hover:bg-gray-100"
//               >
//                 <FiX className="text-xl" />
//               </button>
              
//               <div className="p-6">
//                 <div className="flex items-center mb-4">
//                   <FiMessageSquare className="text-2xl text-orange-500 mr-3" />
//                   <h2 className="text-2xl font-bold text-gray-900">
//                     Cancel Booking
//                   </h2>
//                 </div>
                
//                 <p className="text-gray-600 mb-6">
//                   Please let us know why you're cancelling this booking. This helps us improve our service.
//                 </p>

//                 <div className="space-y-3 mb-6 max-h-60 overflow-y-auto">
//                   {cancellationReasons.map((reason, index) => (
//                     <label
//                       key={index}
//                       className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
//                     >
//                       <input
//                         type="radio"
//                         name="cancelReason"
//                         value={reason}
//                         checked={cancelReason === reason}
//                         onChange={(e) => setCancelReason(e.target.value)}
//                         className="mr-3 text-orange-500 focus:ring-orange-500"
//                       />
//                       <span className="text-gray-700">{reason}</span>
//                     </label>
//                   ))}
//                 </div>

//                 <div className="flex flex-col sm:flex-row gap-3">
//                   <button
//                     onClick={closeCancelReasonDialog}
//                     className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
//                   >
//                     Go Back
//                   </button>
//                   <button
//                     onClick={handleCancelWithReason}
//                     disabled={!cancelReason}
//                     className={`flex-1 px-4 py-3 rounded-lg font-medium transition ${
//                       cancelReason
//                         ? "bg-orange-500 hover:bg-orange-600 text-white"
//                         : "bg-gray-300 text-gray-500 cursor-not-allowed"
//                     }`}
//                   >
//                     Confirm Cancellation
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default UserBookings;

import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Toast from "../Toast";
import ConfirmationDialog from "./ConfirmationDialog.jsx";
import Dialog from "./Dialog";
import Navbar from "./Navbar";
import BookingCard from "./BookingCard.jsx";
import Footer from "./Footer";
import { 
  FiLoader, 
  FiAlertCircle, 
  FiCalendar, 
  FiDownload, 
  FiEye, 
  FiX,
  FiFilter,
  FiClock,
  FiChevronDown,
  FiArchive,
  FiMessageSquare,
  FiPlayCircle
} from "react-icons/fi";

const Base_Url = import.meta.env.VITE_API_URL;

const UserBookings = () => {
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ModelOpen, setModelOpen] = useState(false);
  const [ShowDialog, setShowDialog] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [car, setCar] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedBookingDetails, setSelectedBookingDetails] = useState(null);
  const [progress, setProgress] = useState(0);
  const [showMaintenanceModal, setShowMaintenanceModal] = useState(false);
  const [maintenanceDetails, setMaintenanceDetails] = useState(null);
  const [filter, setFilter] = useState("all");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [showCancelReasonDialog, setShowCancelReasonDialog] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [cancellingBookingId, setCancellingBookingId] = useState(null);

  const cancellationReasons = [
    "Change of plans",
    "Found better alternative",
    "Price too high",
    "Travel dates changed",
    "Vehicle not suitable",
    "Personal emergency",
    "Other reasons"
  ];

  const filterOptions = [
    { value: "all", label: "All Bookings", icon: <FiCalendar className="mr-2" /> },
    { value: "active", label: "Active Bookings", icon: <FiPlayCircle className="mr-2" /> },
    { value: "current", label: "Upcoming Bookings", icon: <FiClock className="mr-2" /> },
    { value: "past", label: "Past Bookings", icon: <FiArchive className="mr-2" /> }
  ];

  const handleSeeDetails = (booking) => {
    setSelectedBookingDetails(booking);
    setShowMaintenanceModal(true);
  };

  // ✅ Check if booking is currently active (in progress)
  const isBookingActive = (booking) => {
    const now = new Date();
    const startDate = new Date(booking.rentalStartDate);
    const endDate = new Date(booking.rentalEndDate);
    
    // Convert start time to 24-hour format
    const [startTime, startModifier] = booking.rentalStartTime.split(" ");
    let [startHours, startMinutes] = startTime.split(":").map(Number);
    if (startModifier === "PM" && startHours !== 12) startHours += 12;
    if (startModifier === "AM" && startHours === 12) startHours = 0;
    startDate.setHours(startHours, startMinutes, 0);

    // Convert end time to 24-hour format
    const [endTime, endModifier] = booking.rentalEndTime.split(" ");
    let [endHours, endMinutes] = endTime.split(":").map(Number);
    if (endModifier === "PM" && endHours !== 12) endHours += 12;
    if (endModifier === "AM" && endHours === 12) endHours = 0;
    endDate.setHours(endHours, endMinutes, 0);

    return now >= startDate && now <= endDate;
  };

  // ✅ Check if booking is upcoming
  const isBookingUpcoming = (booking) => {
    const now = new Date();
    const startDate = new Date(booking.rentalStartDate);
    
    const [startTime, startModifier] = booking.rentalStartTime.split(" ");
    let [startHours, startMinutes] = startTime.split(":").map(Number);
    if (startModifier === "PM" && startHours !== 12) startHours += 12;
    if (startModifier === "AM" && startHours === 12) startHours = 0;
    startDate.setHours(startHours, startMinutes, 0);

    return now < startDate;
  };

  // ✅ Check if booking is past
  const isBookingPast = (booking) => {
    const now = new Date();
    const endDate = new Date(booking.rentalEndDate);
    
    const [endTime, endModifier] = booking.rentalEndTime.split(" ");
    let [endHours, endMinutes] = endTime.split(":").map(Number);
    if (endModifier === "PM" && endHours !== 12) endHours += 12;
    if (endModifier === "AM" && endHours === 12) endHours = 0;
    endDate.setHours(endHours, endMinutes, 0);

    return now > endDate;
  };

  useEffect(() => {
    if (bookings.length === 0) return;

    let filtered = [];

    switch (filter) {
      case "active":
        // ✅ Only show bookings that are currently in progress
        filtered = bookings.filter(booking => isBookingActive(booking));
        break;
      case "current":
        // Show upcoming bookings
        filtered = bookings.filter(booking => isBookingUpcoming(booking));
        break;
      case "past":
        // Show past bookings
        filtered = bookings.filter(booking => isBookingPast(booking));
        break;
      case "completed":
        filtered = bookings.filter(booking => booking.status === "completed");
        break;
      default:
        filtered = [...bookings];
    }

    setFilteredBookings(filtered);
  }, [bookings, filter]);

  useEffect(() => {
    if (selectedBookingDetails) {
      const { rentalStartDate, rentalEndDate, rentalStartTime, rentalEndTime } =
        selectedBookingDetails;

      const convertTo24HourFormat = (time) => {
        try {
          if (typeof time !== "string")
            throw new Error("Input must be a string.");

          const [timePart, modifier] = time.trim().split(" ");
          if (
            !timePart ||
            !modifier ||
            !["AM", "PM"].includes(modifier.toUpperCase())
          ) {
            throw new Error(
              "Invalid time format. Expected format like '03:45 PM'."
            );
          }

          const [hoursStr, minutesStr] = timePart.split(":");
          if (!hoursStr || !minutesStr) {
            throw new Error(
              "Invalid time component. Hours and minutes are required."
            );
          }

          let hours = parseInt(hoursStr, 10);
          let minutes = parseInt(minutesStr, 10);

          if (
            isNaN(hours) ||
            isNaN(minutes) ||
            hours < 1 ||
            hours > 12 ||
            minutes < 0 ||
            minutes > 59
          ) {
            throw new Error("Invalid numeric values for hours or minutes.");
          }

          if (modifier.toUpperCase() === "PM" && hours !== 12) hours += 12;
          if (modifier.toUpperCase() === "AM" && hours === 12) hours = 0;

          setMaintenanceDetails(
            selectedBookingDetails?.carDetails?.maintenanceLogs.filter(
              (log) => log.bookingId === selectedBookingDetails._id
            )
          );

          return { hours, minutes };
        } catch (error) {
          console.error("Time conversion error:", error.message);
          return null;
        }
      };

      const { hours: startHour, minutes: startMinute } =
        convertTo24HourFormat(rentalStartTime);
      const { hours: endHour, minutes: endMinute } =
        convertTo24HourFormat(rentalEndTime);

      const start = new Date(rentalStartDate);
      start.setHours(startHour, startMinute, 0);

      const end = new Date(rentalEndDate);
      end.setHours(endHour, endMinute, 0);

      const now = Date.now();

      if (now >= start.getTime() && now <= end.getTime()) {
        const totalDuration = end.getTime() - start.getTime();
        const elapsedTime = now - start.getTime();
        const progressPercentage = (elapsedTime / totalDuration) * 100;
        setProgress(progressPercentage);
      } else if (now > end.getTime()) {
        setProgress(100);
      } else {
        setProgress(0);
      }
    }
  }, [selectedBookingDetails]);

  const openDialog = (booking) => {
    setSelectedBookingDetails(booking);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedBookingDetails(null);
  };

  const openDetailsModal = (carDetails) => {
    setCar(carDetails);
    setShowDetailsModal(true);
  };

  const closeDetailsModal = () => {
    setShowDetailsModal(false);
    setCar(null);
  };

  const handleViewInvoice = (invoiceUrl) => {
    window.open(`${invoiceUrl}`, "_blank");
  };

  const handleDownloadInvoice = (invoiceUrl) => {
    window.location.href = `${invoiceUrl}`;
  };

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${Base_Url}/api/bookcar/my-bookings`, {
        withCredentials: true,
      });

      if (
        response.status === 200 &&
        response.data &&
        response.data.length > 0
      ) {
        setBookings(response.data);
        setError("");
      } else if (response.status === 204) {
        setError("You have no active bookings, book a car first.");
        Toast("You have no active bookings, book a car first.", "error");
        setBookings([]);
      }
    } catch (err) {
      if (err.response) {
        if (err.response.status === 404) {
          setError("You have no active bookings, book a car first.");
          Toast("You have no active bookings, book a car first.", "error");
        } else {
          setError("Server error. Please try again later.");
        }
      } else if (err.request) {
        setError("API is not working, failed to fetch bookings.");
      } else {
        setError("Failed to fetch bookings.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const ReturnCar = async (BookingId) => {
    try {
      const response = await axios.post(
        `${Base_Url}/api/bookcar/returncar/${BookingId}`,
        {},
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        toast.success(response.data.message);
      }
      fetchBookings();
    } catch (error) {
      console.log("ERROR IN RETURN CAR", error.response?.data?.message);
      toast.error(error.response?.data?.message || "Failed to return car");
    }
  };

  const openCancelReasonDialog = (bookingId) => {
    setCancellingBookingId(bookingId);
    setCancelReason("");
    setShowCancelReasonDialog(true);
  };

  const closeCancelReasonDialog = () => {
    setShowCancelReasonDialog(false);
    setCancelReason("");
    setCancellingBookingId(null);
  };

  const CancleFunction = async (bookingId, reason = "") => {
    try {
      const response = await axios.delete(
        `${Base_Url}/api/bookcar/cancel/${bookingId}`,
        {
          withCredentials: true,
          data: { cancellationReason: reason }
        } 
      );
      setBookings((prevBookings) =>
        prevBookings.filter((booking) => booking._id !== bookingId)
      );
      toast.success("Booking cancelled successfully");
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        console.log("Error in cancel booking:", error.message);
        toast.error("Failed to cancel booking");
      }
    } finally {
      setShowDialog(false);
      closeCancelReasonDialog();
    }
  };

  const handleCancelWithReason = () => {
    if (!cancelReason.trim()) {
      toast.error("Please select a cancellation reason");
      return;
    }
    CancleFunction(cancellingBookingId, cancelReason);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center bg-white p-8 rounded-xl shadow-lg">
            <FiLoader className="animate-spin text-4xl text-blue-600 mx-auto mb-4" />
            <p className="text-lg text-gray-600">Loading your bookings...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center px-4">
          <div className="max-w-md text-center bg-white p-8 rounded-xl shadow-lg">
            <FiAlertCircle className="text-5xl text-red-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Oops!</h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <Link
              to="/customer/cars"
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg transition duration-300 inline-block shadow-md hover:shadow-lg"
            >
              Browse Available Cars
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 ">
        <Navbar />
        <div className="container mx-auto px-4 py-12">
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
              <div className="text-center md:text-left">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                  Your Bookings
                </h1>
                <p className="text-lg text-gray-600">
                  {bookings.length > 0
                    ? "Manage and view your booking history"
                    : "You don't have any bookings yet"}
                </p>
              </div>

              {bookings.length > 0 && (
                <div className="relative flex justify-center md:justify-end">
                  <button
                    onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                    className="flex items-center px-4 py-2.5 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#C17D3C] transition-all duration-200 text-gray-700"
                  >
                    <FiFilter className="mr-2 text-[#C17D3C]" />
                    <span className="font-medium">
                      {filterOptions.find(opt => opt.value === filter)?.label || "Filter By"}
                    </span>
                    <FiChevronDown className={`ml-2 transition-transform duration-200 ${showFilterDropdown ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {showFilterDropdown && (
                    <div className="absolute top-12 right-0 z-10 w-56 origin-top-right rounded-lg bg-white shadow-xl ring-1 ring-gray-200 focus:outline-none overflow-hidden">
                      <div className="py-1">
                        {filterOptions.map((option) => (
                          <button
                            key={option.value}
                            onClick={() => {
                              setFilter(option.value);
                              setShowFilterDropdown(false);
                            }}
                            className={`flex items-center w-full px-4 py-2.5 text-left text-sm ${
                              filter === option.value
                                ? "bg-[#C17D3C]/10 text-[#C17D3C] font-medium"
                                : "text-gray-700 hover:bg-gray-50"
                            } transition-colors duration-150`}
                          >
                            <span className="mr-3 text-[#C17D3C]">{option.icon}</span>
                            <span>{option.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* ✅ Active Bookings Counter */}
            {bookings.length > 0 && (
              <div className="flex flex-wrap gap-4 justify-center md:justify-start mt-4">
                <div className="bg-white rounded-lg px-4 py-2 shadow-sm border">
                  <span className="text-sm text-gray-600">Total: </span>
                  <span className="font-semibold text-gray-800">{bookings.length}</span>
                </div>
                <div className="bg-green-50 rounded-lg px-4 py-2 shadow-sm border border-green-200">
                  <span className="text-sm text-green-600">Active: </span>
                  <span className="font-semibold text-green-700">
                    {bookings.filter(booking => isBookingActive(booking)).length}
                  </span>
                </div>
                <div className="bg-blue-50 rounded-lg px-4 py-2 shadow-sm border border-blue-200">
                  <span className="text-sm text-blue-600">Upcoming: </span>
                  <span className="font-semibold text-blue-700">
                    {bookings.filter(booking => isBookingUpcoming(booking)).length}
                  </span>
                </div>
                <div className="bg-gray-50 rounded-lg px-4 py-2 shadow-sm border border-gray-200">
                  <span className="text-sm text-gray-600">Past: </span>
                  <span className="font-semibold text-gray-700">
                    {bookings.filter(booking => isBookingPast(booking)).length}
                  </span>
                </div>
              </div>
            )}
          </div>

          {filteredBookings.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto text-center">
              {filter === "all" ? (
                <>
                  <FiCalendar className="text-5xl text-blue-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                    No Bookings Found
                  </h3>
                  <p className="text-gray-600 mb-6">
                    It looks like you haven't made any bookings yet. Start by browsing
                    our available cars.
                  </p>
                  <Link
                    to="/cars"
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg transition duration-300 inline-block shadow-md hover:shadow-lg"
                  >
                    Explore Cars
                  </Link>
                </>
              ) : (
                <>
                  <FiCalendar className="text-5xl text-gray-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                    No {filterOptions.find(opt => opt.value === filter)?.label} Found
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {filter === "active" 
                      ? "You don't have any active bookings right now. Your active bookings will appear here when your rental period starts."
                      : `You don't have any ${filter === "current" ? "upcoming" : "past"} bookings.`
                    }
                  </p>
                  <button
                    onClick={() => setFilter("all")}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg transition duration-300 inline-block shadow-md hover:shadow-lg"
                  >
                    View All Bookings
                  </button>
                </>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-lg p-8">
              {/* ✅ Active Bookings Header */}
              {filter === "active" && filteredBookings.length > 0 && (
                <div className="mb-6 p-4  border border-[#C17D3C] rounded-lg">
                  <div className="flex items-center">
                    <FiPlayCircle className="text-[#C17D3C] text-xl mr-3" />
                    <div>
                      <h3 className="text-lg font-semibold text-[#C17D3C]">
                        Active Bookings
                      </h3>
                      <p className="text-[#C17D3C] text-sm">
                        These are your currently ongoing rentals
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                {filteredBookings.map((booking) => {
                  if (!booking.carDetails) return null;

                  const CurrentDate = new Date();
                  const BookingStartDate = new Date(booking?.rentalStartDate);
                  const BookingEndDate = new Date(booking?.rentalEndDate);

                  const [time, modifier] = booking?.StartTime.split(" ");
                  let [hours, minutes] = time.split(":").map(Number);
                  if (modifier === "PM" && hours !== 12) hours += 12;
                  if (modifier === "AM" && hours === 12) hours = 0;
                  BookingStartDate.setHours(hours, minutes, 0);

                  const [time1, modifier1] = booking?.rentalEndTime.split(" ");
                  let [hours1, minutes1] = time1.split(":").map(Number);
                  if (modifier1 === "PM" && hours1 !== 12) hours1 += 12;
                  if (modifier1 === "AM" && hours1 === 12) hours1 = 0;
                  BookingEndDate.setHours(hours1, minutes1, 0);
                
                  return (
                    <div key={booking._id} className="w-full flex justify-center">
                      <BookingCard
                        booking={booking}
                        handleSeeDetails={handleSeeDetails}
                        ReturnCar={ReturnCar}
                        setModelOpen={setModelOpen}
                        setSelectedBooking={setSelectedBooking}
                        setShowDialog={setShowDialog}
                        openDialog={openDialog}
                        ModelOpen={ModelOpen}
                        openCancelReasonDialog={openCancelReasonDialog}
                        isActive={isBookingActive(booking)}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Details Modal */}
        {showDetailsModal && car && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-2xl relative w-full max-w-4xl max-h-[90vh] overflow-y-auto m-4">
              <button
                onClick={closeDetailsModal}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition p-2 rounded-full hover:bg-gray-100"
              >
                <FiX className="text-2xl" />
              </button>
              <div className="p-8">
                <h2 className="text-3xl font-bold text-center mb-6 text-gray-900">
                  {car.carBrand} {car.carModel}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                      <h3 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
                        Vehicle Details
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Model:</span>
                          <span className="font-medium">{car.carModel}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Year:</span>
                          <span className="font-medium">{car.carYear}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Color:</span>
                          <span className="font-medium">{car.carColor}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Fuel Type:</span>
                          <span className="font-medium">{car.fuelType}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
                      Gallery
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      {car.images?.map((img, index) => (
                        <img
                          key={index}
                          src={`${Base_Url}/uploads/${img}`}
                          alt={`Car ${index}`}
                          className="w-full h-40 object-cover rounded-lg shadow-sm hover:shadow-md transition cursor-pointer"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Confirmation Dialog */}
        {ShowDialog && (
          <ConfirmationDialog
            message="Are you sure you want to cancel this booking?"
            onCancel={() => setShowDialog(false)}
            onConfirm={() => CancleFunction(selectedBooking)}
          />
        )}

        {/* Booking Details Dialog */}
        {isDialogOpen && selectedBookingDetails && (
          <Dialog
            isOpen={isDialogOpen}
            onClose={closeDialog}
            car={selectedBookingDetails.carDetails}
            showroom={selectedBookingDetails.showroomDetails}
            bookingDetails={{
              customerName: selectedBookingDetails.customerName,
              startDateTime: selectedBookingDetails.rentalStartDate,
              endDateTime: selectedBookingDetails.rentalEndDate,
              starttime: selectedBookingDetails.rentalStartTime,
              endtime: selectedBookingDetails.rentalEndTime,
              BookingStatus: selectedBookingDetails.status
            }}
            progress={progress}
          />
        )}
        
        {/* Maintenance Modal */}
        {showMaintenanceModal && maintenanceDetails && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-2xl relative w-full max-w-4xl max-h-[90vh] overflow-y-auto m-4">
              <button
                onClick={() => setShowMaintenanceModal(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition p-2 rounded-full hover:bg-gray-100"
              >
                <FiX className="text-2xl" />
              </button>
              
              <div className="p-8">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">
                  Maintenance Details
                </h2>
                <p className="text-center text-gray-600 mb-8">
                  Here's the maintenance history for your booking
                </p>

                <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-8">
                  <h3 className="text-xl font-semibold text-blue-800 mb-4">
                    Booking Summary
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-600">Booking ID:</p>
                      <p className="font-medium text-gray-900">
                        {selectedBookingDetails._id}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Showroom:</p>
                      <p className="font-medium text-gray-900">
                        {selectedBookingDetails.showroomDetails.showroomName}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Vehicle:</p>
                      <p className="font-medium text-gray-900">
                        {selectedBookingDetails.carDetails.carBrand}{" "}
                        {selectedBookingDetails.carDetails.carModel}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Rental Period:</p>
                      <p className="font-medium text-gray-900">
                        {new Date(
                          selectedBookingDetails.rentalStartDate
                        ).toLocaleDateString()}{" "}
                        <FiClock className="inline ml-1 mr-1" />
                        {selectedBookingDetails.rentalStartTime} -{" "}
                        {new Date(
                          selectedBookingDetails.rentalEndDate
                        ).toLocaleDateString()}{" "}
                        <FiClock className="inline ml-1 mr-1" />
                        {selectedBookingDetails.rentalEndTime}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
                    Maintenance Logs
                  </h3>
                  
                  {maintenanceDetails.length > 0 ? (
                    <div className="space-y-6">
                      {maintenanceDetails.map((log, index) => (
                        <div
                          key={index}
                          className="bg-gray-50 border border-gray-200 rounded-xl p-6 hover:shadow-md transition"
                        >
                          <div className="flex justify-between items-start mb-4">
                            <h4 className="text-lg font-semibold text-gray-800">
                              Maintenance #{index + 1}
                            </h4>
                            <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                              {new Date(log.date).toLocaleDateString()}
                            </span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                              <h5 className="font-medium text-gray-700 mb-2 flex items-center">
                                <FiClock className="mr-2" /> Tasks Performed
                              </h5>
                              <ul className="space-y-2">
                                {Object.entries(log.tasks[0])
                                  .filter(([_, value]) => value === false)
                                  .map(([key], taskIndex) => (
                                    <li key={taskIndex} className="capitalize">
                                      • {key}
                                    </li>
                                  ))}
                              </ul>
                            </div>

                            <div>
                              <h5 className="font-medium text-gray-700 mb-2 flex items-center">
                                <FiClock className="mr-2" /> Descriptions
                              </h5>
                              <ul className="space-y-2">
                                {log.repairDescriptions.length > 0 &&
                                  Object.entries(log.repairDescriptions[0]).map(
                                    ([part, description], descIndex) => (
                                      <li key={descIndex}>
                                        <span className="font-medium capitalize">
                                          {part}:
                                        </span>{" "}
                                        {description}
                                      </li>
                                    )
                                  )}
                              </ul>
                            </div>

                            <div>
                              <h5 className="font-medium text-gray-700 mb-2 flex items-center">
                                <FiClock className="mr-2" /> Costs
                              </h5>
                              <ul className="space-y-2">
                                {log.repairCosts.length > 0 &&
                                  Object.entries(log.repairCosts[0]).map(
                                    ([part, cost], costIndex) => (
                                      <li key={costIndex}>
                                        <span className="font-medium capitalize">
                                          {part}:
                                        </span>{" "}
                                        Rs. {cost.toLocaleString()}
                                      </li>
                                    )
                                  )}
                              </ul>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
                      <p className="text-yellow-800 font-medium">
                        No maintenance logs found for this booking.
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
                  <button
                    onClick={() =>
                      handleViewInvoice(selectedBookingDetails.currentInvoiceUrl)
                    }
                    className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg transition shadow-md hover:shadow-lg"
                  >
                    <FiEye className="mr-2" /> View Invoice
                  </button>
                  <button
                    onClick={() =>
                      handleDownloadInvoice(
                        selectedBookingDetails.currentInvoiceUrl
                      )
                    }
                    className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-medium rounded-lg transition shadow-md hover:shadow-lg"
                  >
                    <FiDownload className="mr-2" /> Download Invoice
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Cancellation Reason Dialog */}
        {showCancelReasonDialog && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-2xl relative w-full max-w-md mx-4">
              <button
                onClick={closeCancelReasonDialog}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition p-2 rounded-full hover:bg-gray-100"
              >
                <FiX className="text-xl" />
              </button>
              
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <FiMessageSquare className="text-2xl text-orange-500 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">
                    Cancel Booking
                  </h2>
                </div>
                
                <p className="text-gray-600 mb-6">
                  Please let us know why you're cancelling this booking. This helps us improve our service.
                </p>

                <div className="space-y-3 mb-6 max-h-60 overflow-y-auto">
                  {cancellationReasons.map((reason, index) => (
                    <label
                      key={index}
                      className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <input
                        type="radio"
                        name="cancelReason"
                        value={reason}
                        checked={cancelReason === reason}
                        onChange={(e) => setCancelReason(e.target.value)}
                        className="mr-3 text-orange-500 focus:ring-orange-500"
                      />
                      <span className="text-gray-700">{reason}</span>
                    </label>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={closeCancelReasonDialog}
                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
                  >
                    Go Back
                  </button>
                  <button
                    onClick={handleCancelWithReason}
                    disabled={!cancelReason}
                    className={`flex-1 px-4 py-3 rounded-lg font-medium transition ${
                      cancelReason
                        ? "bg-orange-500 hover:bg-orange-600 text-white"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    Confirm Cancellation
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default UserBookings;