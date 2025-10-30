// import { useState, useEffect } from "react";
// import Navbar from "./Navbar";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import Toast from "../Toast";
// import {
//   FiCalendar,
//   FiClock,
//   FiDownload,
//   FiX,
//   FiDollarSign,
// } from "react-icons/fi";
// import logo from "/src/assets/logo.png";

// const Base_Url = import.meta.env.VITE_API_URL;

// const CarDetailsScreen = () => {
//   const [showBookingModal, setShowBookingModal] = useState(false);
//   const [showConfirmationModal, setShowConfirmationModal] = useState(false);
//   const [rentalStartDate, setRentalStartDate] = useState("");
//   const [rentalEndDate, setRentalEndDate] = useState("");
//   const [rentalEndTime, setRentalEndTime] = useState("");
//   const [rentalStartTime, setRentalStartTime] = useState("");
//   const [image, setImage] = useState([]);
//   const [rentRate, setPrice] = useState(0);
//   const [bookingDetails, setBookingDetails] = useState([]);
//   const [endDate, setEndDate] = useState("");
//   const [endTime, setEndTime] = useState("");
//   const [progress, setProgress] = useState(0);
//   const { bookingId } = useParams();

//   useEffect(() => {
//     const fetchBookingDetail = async () => {
//       try {
//         const res = await axios.get(
//           `${Base_Url}/api/bookcar/bookcar-detail/${bookingId}`,
//           { withCredentials: true }
//         );

//         setRentalStartDate(res.data.rentalStartDate);
//         setRentalEndDate(res.data.rentalEndDate);
//         setRentalStartTime(res.data.rentalStartTime);
//         setRentalEndTime(res.data.rentalEndTime);
//         setPrice(res.data.totalPrice);
//         setImage(res.data.images);

//         const booking = res.data;
//         const startDate = new Date(booking.rentalStartDate);
//         const endDate = new Date(booking.rentalEndDate);

//         let totalDays = Math.ceil(
//           (endDate - startDate) / (1000 * 60 * 60 * 24)
//         );
//         if (totalDays === 0) totalDays = 1;

//         let totalHours = 0;
//         if (
//           booking.rentalStartDate === booking.rentalEndDate &&
//           booking.rentalStartTime &&
//           booking.rentalEndTime
//         ) {
//           const convertTo24HourFormat = (time) => {
//             const [timePart, modifier] = time.split(" ");
//             let [hours, minutes] = timePart.split(":").map(Number);
//             if (modifier === "PM" && hours !== 12) hours += 12;
//             if (modifier === "AM" && hours === 12) hours = 0;
//             return { hours, minutes };
//           };

//           const { hours: startHour, minutes: startMinute } =
//             convertTo24HourFormat(booking.rentalStartTime);
//           const { hours: endHour, minutes: endMinute } = convertTo24HourFormat(
//             booking.rentalEndTime
//           );
//           totalHours = endHour - startHour + (endMinute - startMinute) / 60;
//           if (totalHours < 0) totalHours = 0;
//         } else if (startDate && endDate) {
//           totalHours = (endDate - startDate) / (1000 * 60 * 60);
//         }

//         setBookingDetails({
//           ...booking,
//           totalHours: isNaN(totalHours) ? "0.00" : totalHours.toFixed(2),
//           totalDays,
//         });
//       } catch (error) {
//         console.log("ERROR IN EXTEND BOOKING", error.message);
//       }
//     };

//     if (bookingId) {
//       fetchBookingDetail();
//     }
//   }, [bookingId]);

//   useEffect(() => {
//     if (rentalStartDate && rentalEndDate && rentalStartTime && rentalEndTime) {
//       const convertTo24HourFormat = (time) => {
//         const [timePart, modifier] = time.split(" ");
//         let [hours, minutes] = timePart.split(":").map(Number);
//         if (modifier === "PM" && hours !== 12) hours += 12;
//         if (modifier === "AM" && hours === 12) hours = 0;
//         return { hours, minutes };
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
//   }, [rentalStartDate, rentalEndDate, rentalStartTime, rentalEndTime]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!endDate || !endTime) {
//       Toast("All Fields are required", "error");
//       return;
//     }

//     const rentalEndDateTime = new Date(`${endDate}T${endTime}:00`);
//     if (rentalEndDateTime <= new Date()) {
//       return Toast("End date and time must be in the future", "error");
//     }

//     setShowConfirmationModal(true);
//   };

//   const confirmExtension = async () => {
//     try {
//       const res = await axios.patch(
//         `${Base_Url}/api/bookcar/extend-booking/${bookingId}`,
//         { rentalEndDate: endDate, rentalEndTime: endTime },
//         { withCredentials: true }
//       );

//       if (res.status === 200) {
//         Toast(
//           <div className="flex items-center">
//             <span className="mr-2">Booking extended successfully!</span>
//             <a
//               href={res.data.invoiceUrl}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-blue-600 hover:text-blue-800 flex items-center"
//             >
//               <FiDownload className="mr-1" /> Download Invoice
//             </a>
//           </div>,
//           "success"
//         );

//         // Update the local state with the new end date and time
//         setRentalEndDate(endDate);
//         setRentalEndTime(endTime);
//       }
//     } catch (error) {
//       Toast(error.response?.data?.message || "An error occurred", "error");
//     } finally {
//       setEndDate("");
//       setEndTime("");
//       setShowBookingModal(false);
//       setShowConfirmationModal(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
//       <Navbar />
//       <div className="container mx-auto px-4 py-8">
//         <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
//           {/* Car Image Header */}
//           <div className="relative h-64 w-full">
//             {image[0] && (
//               <img
//                 src={`${Base_Url}/uploads/${image[0]}`}
//                 alt="Car"
//                 className="w-full h-full object-cover"
//               />
//             )}
//             <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
//             <div className="absolute bottom-4 left-4 text-white">
//               <h1 className="text-2xl font-bold">Booking Details</h1>
//               <p className="text-sm opacity-80">ID: {bookingId}</p>
//             </div>
//           </div>

//           {/* Progress Bar */}
//           <div className="px-6 pt-6">
//             <div className="mb-2 flex justify-between text-sm text-gray-600">
//               <span>Booking Progress</span>
//               <span>
//                 {progress === 100 ? "Completed" : `${Math.round(progress)}%`}
//               </span>
//             </div>
//             <div className="w-full bg-gray-200 rounded-full h-2.5">
//               <div
//                 className={`h-2.5 rounded-full ${progress === 100 ? "bg-green-500" : "bg-blue-600"}`}
//                 style={{ width: `${progress}%` }}
//               ></div>
//             </div>
//           </div>

//           {/* Booking Details */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
//             <div className="space-y-4">
//               <div className="bg-gray-50 p-4 rounded-lg">
//                 <h3 className="font-semibold text-gray-700 mb-3 flex items-center">
//                   <FiCalendar className="mr-2 text-blue-600" /> Rental Period
//                 </h3>
//                 <div className="space-y-2">
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Start Date:</span>
//                     <span className="font-medium">{rentalStartDate}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Start Time:</span>
//                     <span className="font-medium">{rentalStartTime}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">End Date:</span>
//                     <span className="font-medium">{rentalEndDate}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">End Time:</span>
//                     <span className="font-medium">{rentalEndTime}</span>
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-gray-50 p-4 rounded-lg">
//                 <h3 className="font-semibold text-gray-700 mb-3 flex items-center">
//                   <FiClock className="mr-2 text-blue-600" /> Duration
//                 </h3>
//                 <div className="space-y-2">
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Total Days:</span>
//                     <span className="font-medium">
//                       {Math.ceil(bookingDetails.totalDays)} day
//                       {bookingDetails.totalDays !== 1 ? "s" : ""}
//                     </span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Total Hours:</span>
//                     <span className="font-medium">
//                       {bookingDetails.totalHours}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="space-y-4">
//               <div className="bg-gray-50 p-4 rounded-lg">
//                 <h3 className="font-semibold text-gray-700 mb-3 flex items-center">
//                   <FiDollarSign className="mr-2 text-blue-600" /> Payment
//                   Details
//                 </h3>
//                 <div className="space-y-2">
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Daily Rate:</span>
//                     <span className="font-medium">
//                       {rentRate / bookingDetails.totalDays} Rs
//                     </span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Total Amount:</span>
//                     <span className="font-bold text-lg text-blue-600">
//                       {rentRate} Rs
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg">
//                 <h3 className="font-semibold text-blue-800 mb-3">
//                   Extend Your Booking
//                 </h3>
//                 <p className="text-sm text-blue-700 mb-4">
//                   Need more time with your vehicle? Extend your rental period
//                   here.
//                 </p>
//                 <button
//                   onClick={() => setShowBookingModal(true)}
//                   className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-2 px-4 rounded-md transition-colors shadow-sm"
//                 >
//                   Extend Booking
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Extend Booking Modal */}
//       {showBookingModal && (
//         <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
//           <div className="bg-white rounded-xl shadow-2xl relative w-full max-w-md mx-4">
//             <button
//               onClick={() => setShowBookingModal(false)}
//               className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100"
//             >
//               <FiX className="text-xl" />
//             </button>

//             <div className="p-6">
//               <h2 className="text-2xl font-bold text-gray-800 mb-2">
//                 Extend Booking
//               </h2>
//               <p className="text-gray-600 mb-6">
//                 Select new end date and time for your rental
//               </p>

//               <form onSubmit={handleSubmit} className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     New End Date
//                   </label>
//                   <input
//                     type="date"
//                     value={endDate}
//                     onChange={(e) => setEndDate(e.target.value)}
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     min={rentalEndDate}
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     New End Time
//                   </label>
//                   <input
//                     type="time"
//                     value={endTime}
//                     onChange={(e) => setEndTime(e.target.value)}
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     required
//                   />
//                 </div>

//                 <button
//                   type="submit"
//                   className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition-colors shadow-md mt-4"
//                 >
//                   Continue to Confirm
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Confirmation Modal */}
//       {showConfirmationModal && (
//         <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
//           <div className="bg-white rounded-xl shadow-2xl relative w-full max-w-md mx-4">
//             <div className="p-6 text-center">
//               {/* Logo and Branding */}
//               <div className="flex flex-col items-center mb-4">
//                 <img src={logo} alt="RentRush Logo" className="h-12 mb-2" />
//                 <h2 className="text-xl font-bold text-gray-800">RentRush</h2>
//               </div>

//               <h3 className="text-xl font-semibold text-gray-800 mb-4">
//                 Confirm Booking Extension
//               </h3>

//               <p className="text-gray-600 mb-6">
//                 Are you sure you want to extend your booking until {endDate} at{" "}
//                 {endTime}?
//               </p>

//               <div className="flex justify-center gap-4">
//                 <button
//                   onClick={() => setShowConfirmationModal(false)}
//                   className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition-colors"
//                 >
//                   No, Cancel
//                 </button>
//                 <button
//                   onClick={confirmExtension}
//                   className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg transition-colors"
//                 >
//                   Yes, Extend
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CarDetailsScreen;


// import { useState, useEffect } from "react";
// import Navbar from "./Navbar";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import Toast from "../Toast";
// import {
//   FiCalendar,
//   FiClock,
//   FiDownload,
//   FiX,
//   FiDollarSign,
//   FiAlertCircle,
// } from "react-icons/fi";
// import logo from "/src/assets/logo.png";

// const Base_Url = import.meta.env.VITE_API_URL;

// const CarDetailsScreen = () => {
//   const [showBookingModal, setShowBookingModal] = useState(false);
//   const [showConfirmationModal, setShowConfirmationModal] = useState(false);
//   const [rentalStartDate, setRentalStartDate] = useState("");
//   const [rentalEndDate, setRentalEndDate] = useState("");
//   const [rentalEndTime, setRentalEndTime] = useState("");
//   const [rentalStartTime, setRentalStartTime] = useState("");
//   const [image, setImage] = useState([]);
//   const [rentRate, setPrice] = useState(0);
//   const [bookingDetails, setBookingDetails] = useState(null);
//   const [endDate, setEndDate] = useState("");
//   const [endTime, setEndTime] = useState("");
//   const [progress, setProgress] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [extending, setExtending] = useState(false);
//   const { bookingId } = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchBookingDetail = async () => {
//       try {
//         setLoading(true);
//         const res = await axios.get(
//           `${Base_Url}/api/bookcar/bookcar-detail/${bookingId}`,
//           { withCredentials: true }
//         );

//         if (res.data) {
//           setRentalStartDate(res.data.rentalStartDate);
//           setRentalEndDate(res.data.rentalEndDate);
//           setRentalStartTime(res.data.rentalStartTime);
//           setRentalEndTime(res.data.rentalEndTime);
//           setPrice(res.data.totalPrice);
//           setImage(res.data.images || []);

//           const booking = res.data;
//           const startDate = new Date(booking.rentalStartDate);
//           const endDate = new Date(booking.rentalEndDate);

//           let totalDays = Math.ceil(
//             (endDate - startDate) / (1000 * 60 * 60 * 24)
//           );
//           if (totalDays === 0) totalDays = 1;

//           let totalHours = 0;
//           if (
//             booking.rentalStartDate === booking.rentalEndDate &&
//             booking.rentalStartTime &&
//             booking.rentalEndTime
//           ) {
//             const convertTo24HourFormat = (time) => {
//               const [timePart, modifier] = time.split(" ");
//               let [hours, minutes] = timePart.split(":").map(Number);
//               if (modifier === "PM" && hours !== 12) hours += 12;
//               if (modifier === "AM" && hours === 12) hours = 0;
//               return { hours, minutes };
//             };

//             const { hours: startHour, minutes: startMinute } =
//               convertTo24HourFormat(booking.rentalStartTime);
//             const { hours: endHour, minutes: endMinute } = convertTo24HourFormat(
//               booking.rentalEndTime
//             );
//             totalHours = endHour - startHour + (endMinute - startMinute) / 60;
//             if (totalHours < 0) totalHours = 0;
//           } else if (startDate && endDate) {
//             totalHours = (endDate - startDate) / (1000 * 60 * 60);
//           }

//           setBookingDetails({
//             ...booking,
//             totalHours: isNaN(totalHours) ? "0.00" : totalHours.toFixed(2),
//             totalDays,
//           });
//         }
//       } catch (error) {
//         console.log("ERROR IN EXTEND BOOKING", error);
//         Toast("Failed to load booking details", "error");
//         navigate("/customer/bookings");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (bookingId) {
//       fetchBookingDetail();
//     }
//   }, [bookingId, navigate]);

//   useEffect(() => {
//     if (rentalStartDate && rentalEndDate && rentalStartTime && rentalEndTime) {
//       const convertTo24HourFormat = (time) => {
//         const [timePart, modifier] = time.split(" ");
//         let [hours, minutes] = timePart.split(":").map(Number);
//         if (modifier === "PM" && hours !== 12) hours += 12;
//         if (modifier === "AM" && hours === 12) hours = 0;
//         return { hours, minutes };
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
//         setProgress(Math.min(progressPercentage, 100));
//       } else if (now > end.getTime()) {
//         setProgress(100);
//       } else {
//         setProgress(0);
//       }
//     }
//   }, [rentalStartDate, rentalEndDate, rentalStartTime, rentalEndTime]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!endDate || !endTime) {
//       Toast("All fields are required", "error");
//       return;
//     }

//     // Validate new end date is after current end date
//     const currentEndDate = new Date(rentalEndDate);
//     const newEndDateObj = new Date(endDate);
    
//     if (newEndDateObj <= currentEndDate) {
//       Toast("New end date must be after current end date", "error");
//       return;
//     }

//     const rentalEndDateTime = new Date(`${endDate}T${endTime}:00`);
//     if (rentalEndDateTime <= new Date()) {
//       Toast("End date and time must be in the future", "error");
//       return;
//     }

//     setShowConfirmationModal(true);
//   };

//   const confirmExtension = async () => {
//     try {
//       setExtending(true);
//       const res = await axios.patch(
//         `${Base_Url}/api/bookcar/extend-booking/${bookingId}`,
//         { rentalEndDate: endDate, rentalEndTime: endTime },
//         { withCredentials: true }
//       );

//       if (res.status === 200) {
//         Toast(
//           <div className="flex items-center">
//             <span className="mr-2">✅ Booking extended successfully!</span>
//             {res.data.invoiceUrl && (
//               <a
//                 href={res.data.invoiceUrl}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-blue-600 hover:text-blue-800 flex items-center"
//               >
//                 <FiDownload className="mr-1" /> Download Invoice
//               </a>
//             )}
//           </div>,
//           "success"
//         );

//         // Update the local state with the new end date and time
//         setRentalEndDate(endDate);
//         setRentalEndTime(endTime);
        
//         // Refresh the page after 2 seconds to show updated data
//         setTimeout(() => {
//           window.location.reload();
//         }, 2000);
//       }
//     } catch (error) {
//       console.error("Extension error:", error);
//       Toast(
//         error.response?.data?.message || "Failed to extend booking", 
//         "error"
//       );
//     } finally {
//       setExtending(false);
//       setEndDate("");
//       setEndTime("");
//       setShowBookingModal(false);
//       setShowConfirmationModal(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
//         <Navbar />
//         <div className="flex items-center justify-center h-64">
//           <div className="text-center">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
//             <p className="text-gray-600">Loading booking details...</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
//       <Navbar />
//       <div className="container mx-auto px-4 py-8">
//         <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
//           {/* Car Image Header */}
//           <div className="relative h-64 w-full">
//             {image[0] ? (
//               <img
//                 src={`${Base_Url}/uploads/${image[0]}`}
//                 alt="Car"
//                 className="w-full h-full object-cover"
//               />
//             ) : (
//               <div className="w-full h-full bg-gray-200 flex items-center justify-center">
//                 <FiAlertCircle className="text-gray-400 text-4xl" />
//               </div>
//             )}
//             <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
//             <div className="absolute bottom-4 left-4 text-white">
//               <h1 className="text-2xl font-bold">Booking Details</h1>
//               <p className="text-sm opacity-80">ID: {bookingId}</p>
//             </div>
//           </div>

//           {/* Progress Bar */}
//           <div className="px-6 pt-6">
//             <div className="mb-2 flex justify-between text-sm text-gray-600">
//               <span>Booking Progress</span>
//               <span>
//                 {progress === 100 ? "Completed" : `${Math.round(progress)}%`}
//               </span>
//             </div>
//             <div className="w-full bg-gray-200 rounded-full h-2.5">
//               <div
//                 className={`h-2.5 rounded-full transition-all duration-300 ${
//                   progress === 100 ? "bg-green-500" : "bg-blue-600"
//                 }`}
//                 style={{ width: `${progress}%` }}
//               ></div>
//             </div>
//           </div>

//           {/* Booking Details */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
//             <div className="space-y-4">
//               <div className="bg-gray-50 p-4 rounded-lg">
//                 <h3 className="font-semibold text-gray-700 mb-3 flex items-center">
//                   <FiCalendar className="mr-2 text-blue-600" /> Rental Period
//                 </h3>
//                 <div className="space-y-2">
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Start Date:</span>
//                     <span className="font-medium">{rentalStartDate}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Start Time:</span>
//                     <span className="font-medium">{rentalStartTime}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">End Date:</span>
//                     <span className="font-medium">{rentalEndDate}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">End Time:</span>
//                     <span className="font-medium">{rentalEndTime}</span>
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-gray-50 p-4 rounded-lg">
//                 <h3 className="font-semibold text-gray-700 mb-3 flex items-center">
//                   <FiClock className="mr-2 text-blue-600" /> Duration
//                 </h3>
//                 <div className="space-y-2">
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Total Days:</span>
//                     <span className="font-medium">
//                       {bookingDetails?.totalDays || 0} day
//                       {bookingDetails?.totalDays !== 1 ? "s" : ""}
//                     </span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Total Hours:</span>
//                     <span className="font-medium">
//                       {bookingDetails?.totalHours || "0.00"}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="space-y-4">
//               <div className="bg-gray-50 p-4 rounded-lg">
//                 <h3 className="font-semibold text-gray-700 mb-3 flex items-center">
//                   <FiDollarSign className="mr-2 text-blue-600" /> Payment
//                   Details
//                 </h3>
//                 <div className="space-y-2">
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Daily Rate:</span>
//                     <span className="font-medium">
//                       {bookingDetails?.totalDays ? (rentRate / bookingDetails.totalDays).toFixed(2) : "0.00"} Rs
//                     </span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Total Amount:</span>
//                     <span className="font-bold text-lg text-blue-600">
//                       {rentRate} Rs
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg">
//                 <h3 className="font-semibold text-blue-800 mb-3">
//                   Extend Your Booking
//                 </h3>
//                 <p className="text-sm text-blue-700 mb-4">
//                   Need more time with your Cars? Extend your rental period
//                   here.
//                 </p>
//                 <button
//                   onClick={() => setShowBookingModal(true)}
//                   className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 px-4 rounded-md transition-colors shadow-sm font-medium"
//                 >
//                   🔄 Extend Booking
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Extend Booking Modal */}
//       {showBookingModal && (
//         <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
//           <div className="bg-white rounded-xl shadow-2xl relative w-full max-w-md mx-4">
//             <button
//               onClick={() => setShowBookingModal(false)}
//               className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors"
//               disabled={extending}
//             >
//               <FiX className="text-xl" />
//             </button>

//             <div className="p-6">
//               <h2 className="text-2xl font-bold text-gray-800 mb-2">
//                 Extend Booking
//               </h2>
//               <p className="text-gray-600 mb-6">
//                 Select new end date and time for your rental
//               </p>

//               <form onSubmit={handleSubmit} className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     New End Date
//                   </label>
//                   <input
//                     type="date"
//                     value={endDate}
//                     onChange={(e) => setEndDate(e.target.value)}
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                     min={rentalEndDate}
//                     required
//                     disabled={extending}
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     New End Time
//                   </label>
//                   <input
//                     type="time"
//                     value={endTime}
//                     onChange={(e) => setEndTime(e.target.value)}
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                     required
//                     disabled={extending}
//                   />
//                 </div>

//                 <button
//                   type="submit"
//                   disabled={extending}
//                   className={`w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium py-3 px-4 rounded-lg transition-colors shadow-md mt-4 ${
//                     extending 
//                       ? "opacity-50 cursor-not-allowed" 
//                       : "hover:from-blue-700 hover:to-indigo-700"
//                   }`}
//                 >
//                   {extending ? "Validating..." : "Continue to Confirm"}
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Confirmation Modal */}
//       {showConfirmationModal && (
//         <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
//           <div className="bg-white rounded-xl shadow-2xl relative w-full max-w-md mx-4">
//             <div className="p-6 text-center">
//               {/* Logo and Branding */}
//               <div className="flex flex-col items-center mb-4">
//                 <img src={logo} alt="RentRush Logo" className="h-12 mb-2" />
//                 <h2 className="text-xl font-bold text-gray-800">RentRush</h2>
//               </div>

//               <h3 className="text-xl font-semibold text-gray-800 mb-4">
//                 Confirm Booking Extension
//               </h3>

//               <p className="text-gray-600 mb-6">
//                 Are you sure you want to extend your booking until <strong>{endDate}</strong> at{" "}
//                 <strong>{endTime}</strong>?
//               </p>

//               <div className="flex justify-center gap-4">
//                 <button
//                   onClick={() => setShowConfirmationModal(false)}
//                   disabled={extending}
//                   className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition-colors"
//                 >
//                   No, Cancel
//                 </button>
//                 <button
//                   onClick={confirmExtension}
//                   disabled={extending}
//                   className={`px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg transition-colors ${
//                     extending 
//                       ? "opacity-50 cursor-not-allowed" 
//                       : "hover:from-blue-700 hover:to-indigo-700"
//                   }`}
//                 >
//                   {extending ? (
//                     <span className="flex items-center justify-center">
//                       <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//                       Extending...
//                     </span>
//                   ) : (
//                     "Yes, Extend"
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CarDetailsScreen;

import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Toast from "../Toast";
import {
  FiCalendar,
  FiClock,
  FiDownload,
  FiX,
  FiDollarSign,
  FiAlertCircle,
} from "react-icons/fi";
import logo from "/src/assets/logo.png";

const Base_Url = import.meta.env.VITE_API_URL;

const CarDetailsScreen = () => {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [rentalStartDate, setRentalStartDate] = useState("");
  const [rentalEndDate, setRentalEndDate] = useState("");
  const [rentalEndTime, setRentalEndTime] = useState("");
  const [rentalStartTime, setRentalStartTime] = useState("");
  const [image, setImage] = useState([]);
  const [rentRate, setPrice] = useState(0);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [extending, setExtending] = useState(false);
  const { bookingId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookingDetail = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${Base_Url}/api/bookcar/bookcar-detail/${bookingId}`,
          { withCredentials: true }
        );

        if (res.data) {
          setRentalStartDate(res.data.rentalStartDate);
          setRentalEndDate(res.data.rentalEndDate);
          setRentalStartTime(res.data.rentalStartTime);
          setRentalEndTime(res.data.rentalEndTime);
          setPrice(res.data.totalPrice);
          setImage(res.data.images || []);

          const booking = res.data;
          const startDate = new Date(booking.rentalStartDate);
          const endDate = new Date(booking.rentalEndDate);

          let totalDays = Math.ceil(
            (endDate - startDate) / (1000 * 60 * 60 * 24)
          );
          if (totalDays === 0) totalDays = 1;

          let totalHours = 0;
          if (
            booking.rentalStartDate === booking.rentalEndDate &&
            booking.rentalStartTime &&
            booking.rentalEndTime
          ) {
            const convertTo24HourFormat = (time) => {
              const [timePart, modifier] = time.split(" ");
              let [hours, minutes] = timePart.split(":").map(Number);
              if (modifier === "PM" && hours !== 12) hours += 12;
              if (modifier === "AM" && hours === 12) hours = 0;
              return { hours, minutes };
            };

            const { hours: startHour, minutes: startMinute } =
              convertTo24HourFormat(booking.rentalStartTime);
            const { hours: endHour, minutes: endMinute } = convertTo24HourFormat(
              booking.rentalEndTime
            );
            totalHours = endHour - startHour + (endMinute - startMinute) / 60;
            if (totalHours < 0) totalHours = 0;
          } else if (startDate && endDate) {
            totalHours = (endDate - startDate) / (1000 * 60 * 60);
          }

          setBookingDetails({
            ...booking,
            totalHours: isNaN(totalHours) ? "0.00" : totalHours.toFixed(2),
            totalDays,
          });
        }
      } catch (error) {
        console.log("ERROR IN EXTEND BOOKING", error);
        Toast("Failed to load booking details", "error");
        navigate("/customer/bookings");
      } finally {
        setLoading(false);
      }
    };

    if (bookingId) {
      fetchBookingDetail();
    }
  }, [bookingId, navigate]);

  useEffect(() => {
    if (rentalStartDate && rentalEndDate && rentalStartTime && rentalEndTime) {
      const convertTo24HourFormat = (time) => {
        const [timePart, modifier] = time.split(" ");
        let [hours, minutes] = timePart.split(":").map(Number);
        if (modifier === "PM" && hours !== 12) hours += 12;
        if (modifier === "AM" && hours === 12) hours = 0;
        return { hours, minutes };
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
        setProgress(Math.min(progressPercentage, 100));
      } else if (now > end.getTime()) {
        setProgress(100);
      } else {
        setProgress(0);
      }
    }
  }, [rentalStartDate, rentalEndDate, rentalStartTime, rentalEndTime]);

  // ✅ Get tomorrow's date for minimum date restriction
  const getMinDate = () => {
    if (!rentalEndDate) return "";
    
    const currentEndDate = new Date(rentalEndDate);
    const tomorrow = new Date(currentEndDate);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    return tomorrow.toISOString().split('T')[0];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!endDate || !endTime) {
      Toast("All fields are required", "error");
      return;
    }

    // Validate new end date is after current end date
    const currentEndDate = new Date(rentalEndDate);
    const newEndDateObj = new Date(endDate);
    
    if (newEndDateObj <= currentEndDate) {
      Toast("New end date must be after current end date", "error");
      return;
    }

    const rentalEndDateTime = new Date(`${endDate}T${endTime}:00`);
    if (rentalEndDateTime <= new Date()) {
      Toast("End date and time must be in the future", "error");
      return;
    }

    setShowConfirmationModal(true);
  };

  const confirmExtension = async () => {
    try {
      setExtending(true);
      const res = await axios.patch(
        `${Base_Url}/api/bookcar/extend-booking/${bookingId}`,
        { rentalEndDate: endDate, rentalEndTime: endTime },
        { withCredentials: true }
      );

      if (res.status === 200) {
        Toast(
          <div className="flex items-center">
            <span className="mr-2">✅ Booking extended successfully!</span>
            {res.data.invoiceUrl && (
              <a
                href={res.data.invoiceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 flex items-center"
              >
                <FiDownload className="mr-1" /> Download Invoice
              </a>
            )}
          </div>,
          "success"
        );

        // Update the local state with the new end date and time
        setRentalEndDate(endDate);
        setRentalEndTime(endTime);
        
        // Refresh the page after 2 seconds to show updated data
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      console.error("Extension error:", error);
      Toast(
        error.response?.data?.message || "Failed to extend booking", 
        "error"
      );
    } finally {
      setExtending(false);
      setEndDate("");
      setEndTime("");
      setShowBookingModal(false);
      setShowConfirmationModal(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <Navbar />
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading booking details...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          {/* Car Image Header */}
          <div className="relative h-64 w-full">
            {image[0] ? (
              <img
                src={`${Base_Url}/uploads/${image[0]}`}
                alt="Car"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <FiAlertCircle className="text-gray-400 text-4xl" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <h1 className="text-2xl font-bold">Booking Details</h1>
              <p className="text-sm opacity-80">ID: {bookingId}</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="px-6 pt-6">
            <div className="mb-2 flex justify-between text-sm text-gray-600">
              <span>Booking Progress</span>
              <span>
                {progress === 100 ? "Completed" : `${Math.round(progress)}%`}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  progress === 100 ? "bg-green-500" : "bg-blue-600"
                }`}
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Booking Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-700 mb-3 flex items-center">
                  <FiCalendar className="mr-2 text-blue-600" /> Rental Period
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Start Date:</span>
                    <span className="font-medium">{rentalStartDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Start Time:</span>
                    <span className="font-medium">{rentalStartTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">End Date:</span>
                    <span className="font-medium">{rentalEndDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">End Time:</span>
                    <span className="font-medium">{rentalEndTime}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-700 mb-3 flex items-center">
                  <FiClock className="mr-2 text-blue-600" /> Duration
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Days:</span>
                    <span className="font-medium">
                      {bookingDetails?.totalDays || 0} day
                      {bookingDetails?.totalDays !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Hours:</span>
                    <span className="font-medium">
                      {bookingDetails?.totalHours || "0.00"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-700 mb-3 flex items-center">
                  <FiDollarSign className="mr-2 text-blue-600" /> Payment
                  Details
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Daily Rate:</span>
                    <span className="font-medium">
                      {bookingDetails?.totalDays ? (rentRate / bookingDetails.totalDays).toFixed(2) : "0.00"} Rs
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Amount:</span>
                    <span className="font-bold text-lg text-blue-600">
                      {rentRate} Rs
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-3">
                  Extend Your Booking
                </h3>
                <p className="text-sm text-blue-700 mb-4">
                  Need more time with your Cars? Extend your rental period
                  here.
                </p>
                <button
                  onClick={() => setShowBookingModal(true)}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 px-4 rounded-md transition-colors shadow-sm font-medium"
                >
                  🔄 Extend Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Extend Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl relative w-full max-w-md mx-4">
            <button
              onClick={() => setShowBookingModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors"
              disabled={extending}
            >
              <FiX className="text-xl" />
            </button>

            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Extend Booking
              </h2>
              <p className="text-gray-600 mb-6">
                Select new end date and time for your rental
              </p>

              {/* ✅ CURRENT END DATE DISPLAY */}
              <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>Current End:</strong> {rentalEndDate} at {rentalEndTime}
                </p>
                <p className="text-xs text-yellow-700 mt-1">
                  You can only select dates after the current end date
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    New End Date
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    // ✅ RESTRICTION: Only allow dates after current end date
                    min={getMinDate()}
                    required
                    disabled={extending}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Must be after {rentalEndDate}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    New End Time
                  </label>
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    required
                    disabled={extending}
                  />
                </div>

                <button
                  type="submit"
                  disabled={extending}
                  className={`w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium py-3 px-4 rounded-lg transition-colors shadow-md mt-4 ${
                    extending 
                      ? "opacity-50 cursor-not-allowed" 
                      : "hover:from-blue-700 hover:to-indigo-700"
                  }`}
                >
                  {extending ? "Validating..." : "Continue to Confirm"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmationModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl relative w-full max-w-md mx-4">
            <div className="p-6 text-center">
              {/* Logo and Branding */}
              <div className="flex flex-col items-center mb-4">
                <img src={logo} alt="RentRush Logo" className="h-12 mb-2" />
                <h2 className="text-xl font-bold text-gray-800">RentRush</h2>
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Confirm Booking Extension
              </h3>

              <p className="text-gray-600 mb-6">
                Are you sure you want to extend your booking until <strong>{endDate}</strong> at{" "}
                <strong>{endTime}</strong>?
              </p>

              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setShowConfirmationModal(false)}
                  disabled={extending}
                  className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition-colors"
                >
                  No, Cancel
                </button>
                <button
                  onClick={confirmExtension}
                  disabled={extending}
                  className={`px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg transition-colors ${
                    extending 
                      ? "opacity-50 cursor-not-allowed" 
                      : "hover:from-blue-700 hover:to-indigo-700"
                  }`}
                >
                  {extending ? (
                    <span className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Extending...
                    </span>
                  ) : (
                    "Yes, Extend"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarDetailsScreen;