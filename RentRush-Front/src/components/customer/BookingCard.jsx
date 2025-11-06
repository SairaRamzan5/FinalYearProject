// // // // // // import React from "react";
// // // // // // import { Link } from "react-router-dom";
// // // // // // import EditBookingModal from "./EditBooking";
// // // // // // const Base_Url = import.meta.env.VITE_API_URL;
// // // // // // function BookingCard({
// // // // // //   booking,
// // // // // //   handleSeeDetails,
// // // // // //   ReturnCar,
// // // // // //   setModelOpen,
// // // // // //   setSelectedBooking,
// // // // // //   setShowDialog,
// // // // // //   openDialog,
// // // // // //   ModelOpen,
// // // // // //   openCancelReasonDialog,
// // // // // // }) {
// // // // // //   const CurrentDate = new Date();
// // // // // //   const BookingStartDate = new Date(booking.rentalStartDate);
// // // // // //   const BookingEndDate = new Date(booking.rentalEndDate);
// // // // // //   const BookingStartDateTime = new Date(`${booking.rentalStartDate} ${booking.StartTime}`);
// // // // // //   const BookingEndDateTime = new Date(`${booking.rentalEndDate} ${booking.EndTime}`);

// // // // // //   const isActive = CurrentDate >= BookingStartDateTime && CurrentDate <= BookingEndDateTime;
// // // // // //   const userEndTime = new Date(`${booking.rentalEndDate} ${booking.EndTime}`);
// // // // // //   const isOverdue = CurrentDate > userEndTime;
// // // // // //   const isCompleted = booking.status === "returned";
// // // // // //   const isInProgress = isActive && !isOverdue && !isCompleted;
// // // // // //   const isReturnInitiated = booking.status === "return initiated";

// // // // // //   const StatusBadge = ({ label, color }) => (
// // // // // //     <span className={`px-2 py-1 text-xs rounded-full font-semibold ${color}`}>
// // // // // //       {label}
// // // // // //     </span>
// // // // // //   );

// // // // // //   // Determine status for the badge near car name
// // // // // //   const getStatusForBadge = () => {
// // // // // //     if (isCompleted) return { label: " Completed", color: "bg-green-100 text-green-700" };
// // // // // //     if (isReturnInitiated) return { label: "⏳ Pending Return", color: "bg-orange-100 text-orange-700" };
// // // // // //     if (isOverdue) return { label: " Overdue", color: "bg-red-100 text-red-700" };
// // // // // //     if (isInProgress) return { label: " In Progress", color: "bg-blue-100 text-blue-700" };
// // // // // //     return { label: " Upcoming", color: "bg-yellow-100 text-yellow-700" };
// // // // // //   };

// // // // // //   const statusBadge = getStatusForBadge();

// // // // // //   return (
// // // // // //     <div className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col w-full max-w-[380px] h-full transition duration-300 hover:shadow-lg border border-gray-200">
// // // // // //       <img
// // // // // //         src={`${Base_Url}/uploads/${booking.carDetails.images[0]}`}
// // // // // //         alt={`${booking.carDetails.carBrand} ${booking.carDetails.carModel}`}
// // // // // //         className="w-full h-48 object-cover bg-gray-100"
// // // // // //       />

// // // // // //       <div className="p-4 flex flex-col justify-between flex-grow space-y-3">
// // // // // //         {/* Car Info with status badge */}
// // // // // //         <div className="flex justify-between items-start">
// // // // // //           <div className="flex-1">
// // // // // //             <h3 className="text-lg font-bold text-gray-800 mb-1 truncate">
// // // // // //               {booking.carDetails.carBrand} {booking.carDetails.carModel}
// // // // // //             </h3>
// // // // // //             <p className="text-sm text-gray-500 mb-1">{booking.carDetails.carType}</p>
// // // // // //             <p className="text-sm text-gray-600 flex items-center">
// // // // // //               <svg
// // // // // //                 className="w-4 h-4 mr-1 text-purple-500"
// // // // // //                 fill="none"
// // // // // //                 stroke="currentColor"
// // // // // //                 viewBox="0 0 24 24"
// // // // // //                 strokeWidth="1.5"
// // // // // //               >
// // // // // //                 <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75L12 6.75m0 0l2.25 3m-2.25-3v10.5" />
// // // // // //               </svg>
// // // // // //               {booking.carDetails.transmission}
// // // // // //             </p>
// // // // // //           </div>
// // // // // //           <StatusBadge label={statusBadge.label} color={statusBadge.color} />
// // // // // //         </div>

// // // // // //         {/* Shows rent per day. If booking is active right now, user can extend it.*/}
// // // // // //         <div className="flex justify-between items-center">
// // // // // //           <span className="text-sm text-gray-700 font-medium">PKR {booking.carDetails.rentRate}/Day</span>
// // // // // //           {CurrentDate >= BookingStartDateTime && CurrentDate <= BookingEndDateTime && booking.status !== "returned" && (
// // // // // //             <Link to={`/customer/CarDetailsScreen/${booking._id}`}>
// // // // // //               <button className="text-sm text-blue-600 hover:underline">Extend Booking</button>
// // // // // //             </Link>
// // // // // //           )}
// // // // // //         </div>

// // // // // //         {/* Booking Status & Actions */}
// // // // // //         <div className="space-y-2">
// // // // // //           {/* Status Message */}
// // // // // //           {booking.status === "returned" ? (
// // // // // //             <StatusBadge label=" Completed" color="bg-green-100 text-green-700" />
// // // // // //           ) : booking.carDetails.availability === "In Maintenance" || booking.carDetails.availability === "Pending Payment" ? (
// // // // // //             <>
// // // // // //               <div className="flex gap-2">
// // // // // //                 <StatusBadge label="🛠 In Maintenance" color="bg-red-100 text-red-700" />
// // // // // //                 <StatusBadge label=" Payment Due" color="bg-red-100 text-red-700" />
// // // // // //               </div>

// // // // // //               <button
// // // // // //                 onClick={() => handleSeeDetails(booking)}
// // // // // //                 className="w-full bg-red-500 text-white py-1 rounded-md text-sm hover:bg-red-600 transition"
// // // // // //               >
// // // // // //                 📄 See Maintenance Details
// // // // // //               </button>
// // // // // //             </>
// // // // // //           ) : booking.status === "return initiated" ? (
// // // // // //             <StatusBadge label=" Pending Return" color="bg-orange-100 text-orange-700" />
// // // // // //           ) : isOverdue && booking.status !== "returned" ? (
// // // // // //             <button
// // // // // //               onClick={() => ReturnCar(booking._id)}
// // // // // //               className="w-full bg-red-600 text-white py-1 rounded-md text-sm hover:bg-red-700"
// // // // // //             >
// // // // // //               🔙 Return Car
// // // // // //             </button>
// // // // // //           ) : isActive && booking.status !== "returned" ? (
// // // // // //             <StatusBadge label=" Active Booking" color="bg-blue-100 text-blue-700" />
// // // // // //           ) : booking.status !== "returned" ? (
// // // // // //             <div className="flex gap-2">
// // // // // //               <button
// // // // // //                 onClick={() => setModelOpen(true)}
// // // // // //                 className="flex-1 bg-blue-500 text-white py-1 rounded-md text-sm hover:bg-blue-600"
// // // // // //               >
// // // // // //                 ✏ Update
// // // // // //               </button>
// // // // // //               <button
// // // // // //                 onClick={() => openCancelReasonDialog(booking._id)}
// // // // // //                 className="flex-1 bg-red-500 text-white py-1 rounded-md text-sm hover:bg-red-600"
// // // // // //               >
// // // // // //                 ❌ Cancel
// // // // // //               </button>
// // // // // //             </div>
// // // // // //           ) : null}
// // // // // //         </div>

// // // // // //         {/* View Details */}
// // // // // //         <button
// // // // // //           onClick={() => openDialog(booking)}
// // // // // //           className="mt-2 text-sm text-blue-600 hover:underline text-left"
// // // // // //         >
// // // // // //           🚘 View Booking Details
// // // // // //         </button>
// // // // // //       </div>

// // // // // //       {/* Edit Booking Modal */}
// // // // // //       <EditBookingModal
// // // // // //         booking={booking}
// // // // // //         isOpen={ModelOpen}
// // // // // //         onClose={() => setModelOpen(false)}
// // // // // //       />
// // // // // //     </div>
// // // // // //   );
// // // // // // }

// // // // // // export default BookingCard;

// // // // // import React, { useEffect, useState } from "react";
// // // // // import { Link } from "react-router-dom";
// // // // // import EditBookingModal from "./EditBooking";
// // // // // import moment from "moment";

// // // // // const Base_Url = import.meta.env.VITE_API_URL;

// // // // // function BookingCard({
// // // // //   booking,
// // // // //   handleSeeDetails,
// // // // //   ReturnCar,
// // // // //   setModelOpen,
// // // // //   setSelectedBooking,
// // // // //   setShowDialog,
// // // // //   openDialog,
// // // // //   ModelOpen,
// // // // //   openCancelReasonDialog,
// // // // // }) {
// // // // //   const [timeLeft, setTimeLeft] = useState("");

// // // // //   const CurrentDate = new Date();
// // // // //   const BookingStartDateTime = new Date(`${booking.rentalStartDate} ${booking.StartTime}`);
// // // // //   const BookingEndDateTime = new Date(`${booking.rentalEndDate} ${booking.EndTime}`);

// // // // //   const isActive = CurrentDate >= BookingStartDateTime && CurrentDate <= BookingEndDateTime;
// // // // //   const isOverdue = CurrentDate > BookingEndDateTime;
// // // // //   const isCompleted = booking.status === "returned";
// // // // //   const isReturnInitiated = booking.status === "return initiated";
// // // // //   const isInProgress = isActive && !isOverdue && !isCompleted;

// // // // //   // Countdown Timer
// // // // //   useEffect(() => {
// // // // //     const updateTimer = () => {
// // // // //       const now = moment();
// // // // //       const endDateTime = moment(`${booking.rentalEndDate} ${booking.EndTime}`, "YYYY-MM-DD h:mm A");
// // // // //       const diff = endDateTime.diff(now);

// // // // //       if (diff <= 0) {
// // // // //         setTimeLeft("00:00:00");
// // // // //       } else {
// // // // //         const duration = moment.duration(diff);
// // // // //         const hours = String(duration.hours()).padStart(2, "0");
// // // // //         const minutes = String(duration.minutes()).padStart(2, "0");
// // // // //         const seconds = String(duration.seconds()).padStart(2, "0");
// // // // //         setTimeLeft(`${hours}:${minutes}:${seconds}`);
// // // // //       }
// // // // //     };

// // // // //     updateTimer();
// // // // //     const timerInterval = setInterval(updateTimer, 1000);
// // // // //     return () => clearInterval(timerInterval);
// // // // //   }, [booking]);

// // // // //   const StatusBadge = ({ label, color }) => (
// // // // //     <span className={`px-2 py-1 text-xs rounded-full font-semibold ${color}`}>
// // // // //       {label}
// // // // //     </span>
// // // // //   );

// // // // //   const getStatusForBadge = () => {
// // // // //     if (isCompleted) return { label: "Completed", color: "bg-green-100 text-green-700" };
// // // // //     if (isReturnInitiated) return { label: "⏳ Pending Return", color: "bg-orange-100 text-orange-700" };
// // // // //     if (isOverdue) return { label: "Overdue", color: "bg-red-100 text-red-700" };
// // // // //     if (isInProgress) return { label: "In Progress", color: "bg-blue-100 text-blue-700" };
// // // // //     return { label: "Upcoming", color: "bg-yellow-100 text-yellow-700" };
// // // // //   };

// // // // //   const statusBadge = getStatusForBadge();
// // // // //   const isReturnDisabled = isReturnInitiated || isCompleted;

// // // // //   return (
// // // // //     <div className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col w-full max-w-[380px] h-full transition duration-300 hover:shadow-lg border border-gray-200">
// // // // //       <img
// // // // //         src={`${Base_Url}/uploads/${booking.carDetails.images[0]}`}
// // // // //         alt={`${booking.carDetails.carBrand} ${booking.carDetails.carModel}`}
// // // // //         className="w-full h-48 object-cover bg-gray-100"
// // // // //       />

// // // // //       <div className="p-4 flex flex-col justify-between flex-grow space-y-3">
// // // // //         {/* Car Info */}
// // // // //         <div className="flex justify-between items-start">
// // // // //           <div className="flex-1">
// // // // //             <h3 className="text-lg font-bold text-gray-800 mb-1 truncate">
// // // // //               {booking.carDetails.carBrand} {booking.carDetails.carModel}
// // // // //             </h3>
// // // // //             <p className="text-sm text-gray-500 mb-1">{booking.carDetails.carType}</p>
// // // // //             <p className="text-sm text-gray-600 flex items-center">
// // // // //               <svg
// // // // //                 className="w-4 h-4 mr-1 text-purple-500"
// // // // //                 fill="none"
// // // // //                 stroke="currentColor"
// // // // //                 viewBox="0 0 24 24"
// // // // //                 strokeWidth="1.5"
// // // // //               >
// // // // //                 <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75L12 6.75m0 0l2.25 3m-2.25-3v10.5" />
// // // // //               </svg>
// // // // //               {booking.carDetails.transmission}
// // // // //             </p>
// // // // //           </div>
// // // // //           <StatusBadge label={statusBadge.label} color={statusBadge.color} />
// // // // //         </div>

// // // // //         {/* Rent Info */}
// // // // //         <div className="flex justify-between items-center">
// // // // //           <span className="text-sm text-gray-700 font-medium">PKR {booking.carDetails.rentRate}/Day</span>
// // // // //           {CurrentDate >= BookingStartDateTime && CurrentDate <= BookingEndDateTime && booking.status !== "returned" && (
// // // // //             <Link to={`/customer/CarDetailsScreen/${booking._id}`}>
// // // // //               <button className="text-sm text-blue-600 hover:underline">Extend Booking</button>
// // // // //             </Link>
// // // // //           )}
// // // // //         </div>

// // // // //         {/* Countdown Timer */}
// // // // //         {booking.status === "active" && !isReturnDisabled && (
// // // // //           <p className="text-green-600 font-medium">Time until auto-return: {timeLeft}</p>
// // // // //         )}

// // // // //         {/* Actions */}
// // // // //         <div className="space-y-2">
// // // // //           {booking.carDetails.availability === "In Maintenance" || booking.carDetails.availability === "Pending Payment" ? (
// // // // //             <>
// // // // //               <div className="flex gap-2">
// // // // //                 <StatusBadge label="🛠 In Maintenance" color="bg-red-100 text-red-700" />
// // // // //                 <StatusBadge label=" Payment Due" color="bg-red-100 text-red-700" />
// // // // //               </div>
// // // // //               <button
// // // // //                 onClick={() => handleSeeDetails(booking)}
// // // // //                 className="w-full bg-red-500 text-white py-1 rounded-md text-sm hover:bg-red-600 transition"
// // // // //               >
// // // // //                 📄 See Maintenance Details
// // // // //               </button>
// // // // //             </>
// // // // //           ) : isReturnDisabled ? (
// // // // //             <StatusBadge label="Pending Return / Completed" color="bg-orange-100 text-orange-700" />
// // // // //           ) : isOverdue ? (
// // // // //             <button
// // // // //               onClick={() => ReturnCar(booking._id)}
// // // // //               className="w-full bg-red-600 text-white py-1 rounded-md text-sm hover:bg-red-700"
// // // // //             >
// // // // //               🔙 Return Car
// // // // //             </button>
// // // // //           ) : isActive ? (
// // // // //             <StatusBadge label="Active Booking" color="bg-blue-100 text-blue-700" />
// // // // //           ) : (
// // // // //             <div className="flex gap-2">
// // // // //               <button
// // // // //                 onClick={() => setModelOpen(true)}
// // // // //                 className="flex-1 bg-blue-500 text-white py-1 rounded-md text-sm hover:bg-blue-600"
// // // // //               >
// // // // //                 ✏ Update
// // // // //               </button>
// // // // //               <button
// // // // //                 onClick={() => openCancelReasonDialog(booking._id)}
// // // // //                 className="flex-1 bg-red-500 text-white py-1 rounded-md text-sm hover:bg-red-600"
// // // // //               >
// // // // //                 ❌ Cancel
// // // // //               </button>
// // // // //             </div>
// // // // //           )}
// // // // //         </div>

// // // // //         {/* View Details */}
// // // // //         <button
// // // // //           onClick={() => openDialog(booking)}
// // // // //           className="mt-2 text-sm text-blue-600 hover:underline text-left"
// // // // //         >
// // // // //           🚘 View Booking Details
// // // // //         </button>
// // // // //       </div>

// // // // //       {/* Edit Booking Modal */}
// // // // //       <EditBookingModal
// // // // //         booking={booking}
// // // // //         isOpen={ModelOpen}
// // // // //         onClose={() => setModelOpen(false)}
// // // // //       />
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // export default BookingCard;

// // // // import React, { useEffect, useState } from "react";
// // // // import { Link } from "react-router-dom";
// // // // import EditBookingModal from "./EditBooking";
// // // // import moment from "moment";

// // // // const Base_Url = import.meta.env.VITE_API_URL;

// // // // function BookingCard({
// // // //   booking,
// // // //   handleSeeDetails,
// // // //   ReturnCar,
// // // //   setModelOpen,
// // // //   setSelectedBooking,
// // // //   setShowDialog,
// // // //   openDialog,
// // // //   ModelOpen,
// // // //   openCancelReasonDialog,
// // // // }) {
// // // //   const [timeLeft, setTimeLeft] = useState("");

// // // //   const CurrentDate = new Date();
// // // //   const BookingStartDateTime = new Date(`${booking.rentalStartDate} ${booking.StartTime}`);
// // // //   const BookingEndDateTime = new Date(`${booking.rentalEndDate} ${booking.EndTime}`);

// // // //   const isActive = CurrentDate >= BookingStartDateTime && CurrentDate <= BookingEndDateTime;
// // // //   const isOverdue = CurrentDate > BookingEndDateTime;
// // // //   const isCompleted = booking.status === "returned";
// // // //   const isReturnInitiated = booking.status === "return initiated";
// // // //   const isInProgress = isActive && !isOverdue && !isCompleted;

// // // //   // Countdown Timer
// // // //   useEffect(() => {
// // // //     const updateTimer = () => {
// // // //       const now = moment();
// // // //       const endDateTime = moment(`${booking.rentalEndDate} ${booking.EndTime}`, "YYYY-MM-DD h:mm A");
// // // //       const diff = endDateTime.diff(now);

// // // //       if (diff <= 0) {
// // // //         setTimeLeft("00:00:00");
// // // //       } else {
// // // //         const duration = moment.duration(diff);
// // // //         const hours = String(duration.hours()).padStart(2, "0");
// // // //         const minutes = String(duration.minutes()).padStart(2, "0");
// // // //         const seconds = String(duration.seconds()).padStart(2, "0");
// // // //         setTimeLeft(`${hours}:${minutes}:${seconds}`);
// // // //       }
// // // //     };

// // // //     updateTimer();
// // // //     const timerInterval = setInterval(updateTimer, 1000);
// // // //     return () => clearInterval(timerInterval);
// // // //   }, [booking]);

// // // //   const StatusBadge = ({ label, color }) => (
// // // //     <span className={`px-2 py-1 text-xs rounded-full font-semibold ${color}`}>
// // // //       {label}
// // // //     </span>
// // // //   );

// // // //   const getStatusForBadge = () => {
// // // //     if (isCompleted) return { label: "Completed", color: "bg-green-100 text-green-700" };
// // // //     if (isReturnInitiated) return { label: "⏳ Pending Return", color: "bg-orange-100 text-orange-700" };
// // // //     if (isOverdue) return { label: "Overdue", color: "bg-red-100 text-red-700" };
// // // //     if (isInProgress) return { label: "In Progress", color: "bg-blue-100 text-blue-700" };
// // // //     return { label: "Upcoming", color: "bg-yellow-100 text-yellow-700" };
// // // //   };

// // // //   const statusBadge = getStatusForBadge();
// // // //   const isReturnDisabled = isReturnInitiated || isCompleted;

// // // //   // Check if extend booking should be allowed
// // // //   const canExtendBooking = CurrentDate >= BookingStartDateTime &&
// // // //                           CurrentDate <= BookingEndDateTime &&
// // // //                           booking.status !== "returned" &&
// // // //                           !isReturnInitiated;

// // // //   return (
// // // //     <div className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col w-full max-w-[380px] h-full transition duration-300 hover:shadow-lg border border-gray-200">
// // // //       <img
// // // //         src={`${Base_Url}/uploads/${booking.carDetails.images[0]}`}
// // // //         alt={`${booking.carDetails.carBrand} ${booking.carDetails.carModel}`}
// // // //         className="w-full h-48 object-cover bg-gray-100"
// // // //       />

// // // //       <div className="p-4 flex flex-col justify-between flex-grow space-y-3">
// // // //         {/* Car Info */}
// // // //         <div className="flex justify-between items-start">
// // // //           <div className="flex-1">
// // // //             <h3 className="text-lg font-bold text-gray-800 mb-1 truncate">
// // // //               {booking.carDetails.carBrand} {booking.carDetails.carModel}
// // // //             </h3>
// // // //             <p className="text-sm text-gray-500 mb-1">{booking.carDetails.carType}</p>
// // // //             <p className="text-sm text-gray-600 flex items-center">
// // // //               <svg
// // // //                 className="w-4 h-4 mr-1 text-purple-500"
// // // //                 fill="none"
// // // //                 stroke="currentColor"
// // // //                 viewBox="0 0 24 24"
// // // //                 strokeWidth="1.5"
// // // //               >
// // // //                 <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75L12 6.75m0 0l2.25 3m-2.25-3v10.5" />
// // // //               </svg>
// // // //               {booking.carDetails.transmission}
// // // //             </p>
// // // //           </div>
// // // //           <StatusBadge label={statusBadge.label} color={statusBadge.color} />
// // // //         </div>

// // // //         {/* Rent Info */}
// // // //         <div className="flex justify-between items-center">
// // // //           <span className="text-sm text-gray-700 font-medium">PKR {booking.carDetails.rentRate}/Day</span>
// // // //           {canExtendBooking && (
// // // //             <Link to={`/customer/extend-booking/${booking._id}`}>
// // // //               <button className="text-sm text-blue-600 hover:underline bg-blue-50 px-2 py-1 rounded-md">
// // // //                 Extend Booking
// // // //               </button>
// // // //             </Link>
// // // //           )}
// // // //         </div>

// // // //         {/* Countdown Timer */}
// // // //         {booking.status === "active" && !isReturnDisabled && (
// // // //           <p className="text-green-600 font-medium text-sm bg-green-50 p-2 rounded-md">
// // // //             ⏰ Time until auto-return: {timeLeft}
// // // //           </p>
// // // //         )}

// // // //         {/* Actions */}
// // // //         <div className="space-y-2">
// // // //           {booking.carDetails.availability === "In Maintenance" || booking.carDetails.availability === "Pending Payment" ? (
// // // //             <>
// // // //               <div className="flex gap-2">
// // // //                 <StatusBadge label="🛠 In Maintenance" color="bg-red-100 text-red-700" />
// // // //                 <StatusBadge label=" Payment Due" color="bg-red-100 text-red-700" />
// // // //               </div>
// // // //               <button
// // // //                 onClick={() => handleSeeDetails(booking)}
// // // //                 className="w-full bg-red-500 text-white py-1 rounded-md text-sm hover:bg-red-600 transition"
// // // //               >
// // // //                 📄 See Maintenance Details
// // // //               </button>
// // // //             </>
// // // //           ) : isReturnDisabled ? (
// // // //             <StatusBadge
// // // //               label={isCompleted ? "✅ Return Completed" : "⏳ Return Pending"}
// // // //               color={isCompleted ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}
// // // //             />
// // // //           ) : isOverdue ? (
// // // //             <button
// // // //               onClick={() => ReturnCar(booking._id)}
// // // //               className="w-full bg-red-600 text-white py-1 rounded-md text-sm hover:bg-red-700"
// // // //             >
// // // //               🔙 Return Car
// // // //             </button>
// // // //           ) : isActive ? (
// // // //             <StatusBadge label="Active Booking" color="bg-blue-100 text-blue-700" />
// // // //           ) : (
// // // //             <div className="flex gap-2">
// // // //               <button
// // // //                 onClick={() => setModelOpen(true)}
// // // //                 className="flex-1 bg-blue-500 text-white py-1 rounded-md text-sm hover:bg-blue-600"
// // // //               >
// // // //                 ✏ Update
// // // //               </button>
// // // //               <button
// // // //                 onClick={() => openCancelReasonDialog(booking._id)}
// // // //                 className="flex-1 bg-red-500 text-white py-1 rounded-md text-sm hover:bg-red-600"
// // // //               >
// // // //                 ❌ Cancel
// // // //               </button>
// // // //             </div>
// // // //           )}
// // // //         </div>

// // // //         {/* View Details */}
// // // //         <button
// // // //           onClick={() => openDialog(booking)}
// // // //           className="mt-2 text-sm text-blue-600 hover:underline text-left"
// // // //         >
// // // //           🚘 View Booking Details
// // // //         </button>
// // // //       </div>

// // // //       {/* Edit Booking Modal */}
// // // //       <EditBookingModal
// // // //         booking={booking}
// // // //         isOpen={ModelOpen}
// // // //         onClose={() => setModelOpen(false)}
// // // //       />
// // // //     </div>
// // // //   );
// // // // }

// // // // export default BookingCard;

// // // import React, { useEffect, useState } from "react";
// // // import { Link } from "react-router-dom";
// // // import EditBookingModal from "./EditBooking";
// // // import moment from "moment";

// // // const Base_Url = import.meta.env.VITE_API_URL;

// // // function BookingCard({
// // //   booking,
// // //   handleSeeDetails,
// // //   ReturnCar,
// // //   setModelOpen,
// // //   setSelectedBooking,
// // //   setShowDialog,
// // //   openDialog,
// // //   ModelOpen,
// // //   openCancelReasonDialog,
// // // }) {
// // //   const [timeLeft, setTimeLeft] = useState("");
// // //   const [notificationSent, setNotificationSent] = useState(false);
// // //   const [showNotification, setShowNotification] = useState(false);

// // //   const CurrentDate = new Date();
// // //   const BookingStartDateTime = new Date(`${booking.rentalStartDate} ${booking.StartTime}`);
// // //   const BookingEndDateTime = new Date(`${booking.rentalEndDate} ${booking.EndTime}`);

// // //   const isActive = CurrentDate >= BookingStartDateTime && CurrentDate <= BookingEndDateTime;
// // //   const isOverdue = CurrentDate > BookingEndDateTime;
// // //   const isCompleted = booking.status === "returned";
// // //   const isReturnInitiated = booking.status === "return initiated";
// // //   const isInProgress = isActive && !isOverdue && !isCompleted;

// // //   // Countdown Timer with Notification
// // //   useEffect(() => {
// // //     const updateTimer = () => {
// // //       const now = moment();
// // //       const endDateTime = moment(`${booking.rentalEndDate} ${booking.EndTime}`, "YYYY-MM-DD h:mm A");
// // //       const diff = endDateTime.diff(now);

// // //       // Check if 30 minutes or less remaining
// // //       const thirtyMinutesInMs = 30 * 60 * 1000;
// // //       const isThirtyMinutesLeft = diff > 0 && diff <= thirtyMinutesInMs;

// // //       if (isThirtyMinutesLeft && !notificationSent && isActive && !isCompleted) {
// // //         // Send notification
// // //         sendBookingEndNotification(booking);
// // //         setNotificationSent(true);
// // //         setShowNotification(true);

// // //         // Auto hide notification after 10 seconds
// // //         setTimeout(() => {
// // //           setShowNotification(false);
// // //         }, 10000);
// // //       }

// // //       if (diff <= 0) {
// // //         setTimeLeft("00:00:00");
// // //       } else {
// // //         const duration = moment.duration(diff);
// // //         const hours = String(duration.hours()).padStart(2, "0");
// // //         const minutes = String(duration.minutes()).padStart(2, "0");
// // //         const seconds = String(duration.seconds()).padStart(2, "0");
// // //         setTimeLeft(`${hours}:${minutes}:${seconds}`);
// // //       }
// // //     };

// // //     updateTimer();
// // //     const timerInterval = setInterval(updateTimer, 1000);
// // //     return () => clearInterval(timerInterval);
// // //   }, [booking, notificationSent, isActive, isCompleted]);

// // //   // Function to send notification
// // //   const sendBookingEndNotification = async (booking) => {
// // //     try {
// // //       // You can implement different notification methods here:

// // //       // 1. Browser Notification
// // //       if ("Notification" in window && Notification.permission === "granted") {
// // //         new Notification("Booking Ending Soon!", {
// // //           body: `Your booking for ${booking.carDetails.carBrand} ${booking.carDetails.carModel} will end in 30 minutes. Please prepare to return the vehicle.`,
// // //           icon: `${Base_Url}/uploads/${booking.carDetails.images[0]}`,
// // //         });
// // //       }

// // //       // 2. Backend API call for email/SMS notification
// // //       await fetch(`${Base_Url}/api/notifications/booking-reminder`, {
// // //         method: "POST",
// // //         headers: {
// // //           "Content-Type": "application/json",
// // //         },
// // //         body: JSON.stringify({
// // //           bookingId: booking._id,
// // //           customerId: booking.customerId,
// // //           message: `Your booking for ${booking.carDetails.carBrand} ${booking.carDetails.carModel} will end in 30 minutes.`,
// // //           type: "booking_end_reminder"
// // //         }),
// // //       });

// // //       console.log("Booking end notification sent for:", booking._id);
// // //     } catch (error) {
// // //       console.error("Error sending notification:", error);
// // //     }
// // //   };

// // //   // Request notification permission on component mount
// // //   useEffect(() => {
// // //     if ("Notification" in window && Notification.permission === "default") {
// // //       Notification.requestPermission();
// // //     }
// // //   }, []);

// // //   const StatusBadge = ({ label, color }) => (
// // //     <span className={`px-2 py-1 text-xs rounded-full font-semibold ${color}`}>
// // //       {label}
// // //     </span>
// // //   );

// // //   const getStatusForBadge = () => {
// // //     if (isCompleted) return { label: "Completed", color: "bg-green-100 text-green-700" };
// // //     if (isReturnInitiated) return { label: "⏳ Pending Return", color: "bg-orange-100 text-orange-700" };
// // //     if (isOverdue) return { label: "Overdue", color: "bg-red-100 text-red-700" };
// // //     if (isInProgress) return { label: "In Progress", color: "bg-blue-100 text-blue-700" };
// // //     return { label: "Upcoming", color: "bg-yellow-100 text-yellow-700" };
// // //   };

// // //   const statusBadge = getStatusForBadge();
// // //   const isReturnDisabled = isReturnInitiated || isCompleted;

// // //   // Check if extend booking should be allowed
// // //   const canExtendBooking = CurrentDate >= BookingStartDateTime &&
// // //                           CurrentDate <= BookingEndDateTime &&
// // //                           booking.status !== "returned" &&
// // //                           !isReturnInitiated;

// // //   // Check if less than 30 minutes remaining
// // //   const isLessThan30Minutes = () => {
// // //     const now = moment();
// // //     const endDateTime = moment(`${booking.rentalEndDate} ${booking.EndTime}`, "YYYY-MM-DD h:mm A");
// // //     const diff = endDateTime.diff(now);
// // //     return diff > 0 && diff <= 30 * 60 * 1000;
// // //   };

// // //   return (
// // //     <div className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col w-full max-w-[380px] h-full transition duration-300 hover:shadow-lg border border-gray-200 relative">
// // //       {/* Notification Banner */}
// // //       {showNotification && isLessThan30Minutes() && (
// // //         <div className="absolute top-0 left-0 right-0 bg-orange-500 text-white text-sm font-semibold py-2 px-4 text-center animate-pulse z-10">
// // //           ⚡ Booking ending in 30 minutes! Please prepare to return the vehicle.
// // //         </div>
// // //       )}

// // //       <img
// // //         src={`${Base_Url}/uploads/${booking.carDetails.images[0]}`}
// // //         alt={`${booking.carDetails.carBrand} ${booking.carDetails.carModel}`}
// // //         className="w-full h-48 object-cover bg-gray-100"
// // //       />

// // //       <div className="p-4 flex flex-col justify-between flex-grow space-y-3">
// // //         {/* Car Info */}
// // //         <div className="flex justify-between items-start">
// // //           <div className="flex-1">
// // //             <h3 className="text-lg font-bold text-gray-800 mb-1 truncate">
// // //               {booking.carDetails.carBrand} {booking.carDetails.carModel}
// // //             </h3>
// // //             <p className="text-sm text-gray-500 mb-1">{booking.carDetails.carType}</p>
// // //             <p className="text-sm text-gray-600 flex items-center">
// // //               <svg
// // //                 className="w-4 h-4 mr-1 text-purple-500"
// // //                 fill="none"
// // //                 stroke="currentColor"
// // //                 viewBox="0 0 24 24"
// // //                 strokeWidth="1.5"
// // //               >
// // //                 <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75L12 6.75m0 0l2.25 3m-2.25-3v10.5" />
// // //               </svg>
// // //               {booking.carDetails.transmission}
// // //             </p>
// // //           </div>
// // //           <StatusBadge label={statusBadge.label} color={statusBadge.color} />
// // //         </div>

// // //         {/* Rent Info */}
// // //         <div className="flex justify-between items-center">
// // //           <span className="text-sm text-gray-700 font-medium">PKR {booking.carDetails.rentRate}/Day</span>
// // //           {canExtendBooking && (
// // //             <Link to={`/customer/extend-booking/${booking._id}`}>
// // //               <button className="text-sm text-blue-600 hover:underline bg-blue-50 px-2 py-1 rounded-md">
// // //                 Extend Booking
// // //               </button>
// // //             </Link>
// // //           )}
// // //         </div>

// // //         {/* Countdown Timer with Warning */}
// // //         {booking.status === "active" && !isReturnDisabled && (
// // //           <div className={`text-sm font-medium p-2 rounded-md ${
// // //             isLessThan30Minutes()
// // //               ? "bg-red-100 text-red-700 border border-red-300"
// // //               : "bg-green-50 text-green-600"
// // //           }`}>
// // //             ⏰ {isLessThan30Minutes() ? "Ending soon: " : "Time until return: "}
// // //             {timeLeft}
// // //             {isLessThan30Minutes() && (
// // //               <span className="block text-xs mt-1 font-normal">
// // //                 Please return the vehicle on time to avoid late fees.
// // //               </span>
// // //             )}
// // //           </div>
// // //         )}

// // //         {/* Actions */}
// // //         <div className="space-y-2">
// // //           {booking.carDetails.availability === "In Maintenance" || booking.carDetails.availability === "Pending Payment" ? (
// // //             <>
// // //               <div className="flex gap-2">
// // //                 <StatusBadge label="🛠 In Maintenance" color="bg-red-100 text-red-700" />
// // //                 <StatusBadge label=" Payment Due" color="bg-red-100 text-red-700" />
// // //               </div>
// // //               <button
// // //                 onClick={() => handleSeeDetails(booking)}
// // //                 className="w-full bg-red-500 text-white py-1 rounded-md text-sm hover:bg-red-600 transition"
// // //               >
// // //                 📄 See Maintenance Details
// // //               </button>
// // //             </>
// // //           ) : isReturnDisabled ? (
// // //             <StatusBadge
// // //               label={isCompleted ? "✅ Return Completed" : "⏳ Return Pending"}
// // //               color={isCompleted ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}
// // //             />
// // //           ) : isOverdue ? (
// // //             <button
// // //               onClick={() => ReturnCar(booking._id)}
// // //               className="w-full bg-red-600 text-white py-1 rounded-md text-sm hover:bg-red-700"
// // //             >
// // //               🔙 Return Car
// // //             </button>
// // //           ) : isActive ? (
// // //             <div className="space-y-2">
// // //               <StatusBadge label="Active Booking" color="bg-blue-100 text-blue-700" />
// // //               {isLessThan30Minutes() && (
// // //                 <button
// // //                   onClick={() => ReturnCar(booking._id)}
// // //                   className="w-full bg-orange-500 text-white py-1 rounded-md text-sm hover:bg-orange-600 transition"
// // //                 >
// // //                   🔙 Return Now
// // //                 </button>
// // //               )}
// // //             </div>
// // //           ) : (
// // //             <div className="flex gap-2">
// // //               <button
// // //                 onClick={() => setModelOpen(true)}
// // //                 className="flex-1 bg-blue-500 text-white py-1 rounded-md text-sm hover:bg-blue-600"
// // //               >
// // //                 ✏ Update
// // //               </button>
// // //               <button
// // //                 onClick={() => openCancelReasonDialog(booking._id)}
// // //                 className="flex-1 bg-red-500 text-white py-1 rounded-md text-sm hover:bg-red-600"
// // //               >
// // //                 ❌ Cancel
// // //               </button>
// // //             </div>
// // //           )}
// // //         </div>

// // //         {/* View Details */}
// // //         <button
// // //           onClick={() => openDialog(booking)}
// // //           className="mt-2 text-sm text-blue-600 hover:underline text-left"
// // //         >
// // //           🚘 View Booking Details
// // //         </button>
// // //       </div>

// // //       {/* Edit Booking Modal */}
// // //       <EditBookingModal
// // //         booking={booking}
// // //         isOpen={ModelOpen}
// // //         onClose={() => setModelOpen(false)}
// // //       />
// // //     </div>
// // //   );
// // // }

// // // export default BookingCard;

// // // BookingCard.jsx - AUTO RETURN ONLY (No Manual Buttons)
// // import React, { useEffect, useState } from "react";
// // import { Link } from "react-router-dom";
// // import EditBookingModal from "./EditBooking";
// // import moment from "moment";

// // const Base_Url = import.meta.env.VITE_API_URL;

// // function BookingCard({
// //   booking,
// //   handleSeeDetails,
// //   setModelOpen,
// //   openDialog,
// //   ModelOpen,
// //   openCancelReasonDialog,
// // }) {
// //   const [timeLeft, setTimeLeft] = useState("");
// //   const [notificationSent, setNotificationSent] = useState(false);
// //   const [showNotification, setShowNotification] = useState(false);

// //   const CurrentDate = new Date();
// //   const BookingStartDateTime = new Date(`${booking.rentalStartDate} ${booking.StartTime}`);
// //   const BookingEndDateTime = new Date(`${booking.rentalEndDate} ${booking.EndTime}`);

// //   const isActive = CurrentDate >= BookingStartDateTime && CurrentDate <= BookingEndDateTime;
// //   const isOverdue = CurrentDate > BookingEndDateTime;
// //   const isCompleted = booking.status === "returned";
// //   const isReturnInitiated = booking.status === "return initiated";
// //   const isInProgress = isActive && !isOverdue && !isCompleted;

// //   // Countdown Timer with Notification
// //   useEffect(() => {
// //     const updateTimer = () => {
// //       const now = moment();
// //       const endDateTime = moment(`${booking.rentalEndDate} ${booking.EndTime}`, "YYYY-MM-DD h:mm A");
// //       const diff = endDateTime.diff(now);

// //       // Check if 30 minutes or less remaining
// //       const thirtyMinutesInMs = 30 * 60 * 1000;
// //       const isThirtyMinutesLeft = diff > 0 && diff <= thirtyMinutesInMs;

// //       if (isThirtyMinutesLeft && !notificationSent && isActive && !isCompleted) {
// //         // Send notification to backend
// //         sendBookingEndNotification(booking);
// //         setNotificationSent(true);
// //         setShowNotification(true);

// //         // Auto hide notification after 10 seconds
// //         setTimeout(() => {
// //           setShowNotification(false);
// //         }, 10000);
// //       }

// //       if (diff <= 0) {
// //         setTimeLeft("00:00:00");
// //       } else {
// //         const duration = moment.duration(diff);
// //         const hours = String(duration.hours()).padStart(2, "0");
// //         const minutes = String(duration.minutes()).padStart(2, "0");
// //         const seconds = String(duration.seconds()).padStart(2, "0");
// //         setTimeLeft(`${hours}:${minutes}:${seconds}`);
// //       }
// //     };

// //     updateTimer();
// //     const timerInterval = setInterval(updateTimer, 1000);
// //     return () => clearInterval(timerInterval);
// //   }, [booking, notificationSent, isActive, isCompleted]);

// //   // Function to send notification to backend
// //   const sendBookingEndNotification = async (booking) => {
// //     try {
// //       // Backend API call for notification
// //       const response = await fetch(`${Base_Url}/api/notifications/booking-reminder/${booking._id}`, {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         }
// //       });

// //       if (response.ok) {
// //         console.log("Backend notification sent successfully");
// //       }

// //       // Browser notification
// //       if ("Notification" in window && Notification.permission === "granted") {
// //         new Notification("Booking Ending Soon!", {
// //           body: `Your booking for ${booking.carDetails.carBrand} ${booking.carDetails.carModel} will end in 30 minutes. Car will be automatically returned to maintenance.`,
// //           icon: `${Base_Url}/uploads/${booking.carDetails.images[0]}`,
// //         });
// //       } else if ("Notification" in window && Notification.permission === "default") {
// //         // Request permission if not yet asked
// //         Notification.requestPermission();
// //       }
// //     } catch (error) {
// //       console.error("Error sending notification:", error);
// //     }
// //   };

// //   // Request notification permission on component mount
// //   useEffect(() => {
// //     if ("Notification" in window && Notification.permission === "default") {
// //       Notification.requestPermission();
// //     }
// //   }, []);

// //   const StatusBadge = ({ label, color }) => (
// //     <span className={`px-2 py-1 text-xs rounded-full font-semibold ${color}`}>
// //       {label}
// //     </span>
// //   );

// //   const getStatusForBadge = () => {
// //     if (isCompleted) return { label: "✅ Return Completed", color: "bg-green-100 text-green-700" };
// //     if (isReturnInitiated) return { label: "⏳ Auto-Return Pending", color: "bg-orange-100 text-orange-700" };
// //     if (isOverdue) return { label: "🔄 Auto-Return Processing", color: "bg-purple-100 text-purple-700" };
// //     if (isInProgress) return { label: "Active Booking", color: "bg-blue-100 text-blue-700" };
// //     return { label: "Upcoming", color: "bg-yellow-100 text-yellow-700" };
// //   };

// //   const statusBadge = getStatusForBadge();
// //   const isReturnDisabled = isReturnInitiated || isCompleted;

// //   // Check if extend booking should be allowed
// //   const canExtendBooking = CurrentDate >= BookingStartDateTime &&
// //                           CurrentDate <= BookingEndDateTime &&
// //                           booking.status !== "returned" &&
// //                           !isReturnInitiated;

// //   // Check if less than 30 minutes remaining
// //   const isLessThan30Minutes = () => {
// //     const now = moment();
// //     const endDateTime = moment(`${booking.rentalEndDate} ${booking.EndTime}`, "YYYY-MM-DD h:mm A");
// //     const diff = endDateTime.diff(now);
// //     return diff > 0 && diff <= 30 * 60 * 1000;
// //   };

// //   return (
// //     <div className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col w-full max-w-[380px] h-full transition duration-300 hover:shadow-lg border border-gray-200 relative">
// //       {/* Notification Banner */}
// //       {showNotification && isLessThan30Minutes() && (
// //         <div className="absolute top-0 left-0 right-0 bg-orange-500 text-white text-sm font-semibold py-2 px-4 text-center animate-pulse z-10">
// //           ⚡ Booking ending in 30 minutes! Car will auto-return to maintenance.
// //         </div>
// //       )}

// //       <img
// //         src={`${Base_Url}/uploads/${booking.carDetails.images[0]}`}
// //         alt={`${booking.carDetails.carBrand} ${booking.carDetails.carModel}`}
// //         className="w-full h-48 object-cover bg-gray-100"
// //       />

// //       <div className="p-4 flex flex-col justify-between flex-grow space-y-3">
// //         {/* Car Info */}
// //         <div className="flex justify-between items-start">
// //           <div className="flex-1">
// //             <h3 className="text-lg font-bold text-gray-800 mb-1 truncate">
// //               {booking.carDetails.carBrand} {booking.carDetails.carModel}
// //             </h3>
// //             <p className="text-sm text-gray-500 mb-1">{booking.carDetails.carType}</p>
// //             <p className="text-sm text-gray-600 flex items-center">
// //               <svg
// //                 className="w-4 h-4 mr-1 text-purple-500"
// //                 fill="none"
// //                 stroke="currentColor"
// //                 viewBox="0 0 24 24"
// //                 strokeWidth="1.5"
// //               >
// //                 <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75L12 6.75m0 0l2.25 3m-2.25-3v10.5" />
// //               </svg>
// //               {booking.carDetails.transmission}
// //             </p>
// //           </div>
// //           <StatusBadge label={statusBadge.label} color={statusBadge.color} />
// //         </div>

// //         {/* Rent Info */}
// //         <div className="flex justify-between items-center">
// //           <span className="text-sm text-gray-700 font-medium">PKR {booking.carDetails.rentRate}/Day</span>
// //           {canExtendBooking && (
// //             <Link to={`/customer/extend-booking/${booking._id}`}>
// //               <button className="text-sm text-blue-600 hover:underline bg-blue-50 px-2 py-1 rounded-md">
// //                 Extend Booking
// //               </button>
// //             </Link>
// //           )}
// //         </div>

// //         {/* Countdown Timer with Warning */}
// //         {booking.status === "active" && !isReturnDisabled && (
// //           <div className={`text-sm font-medium p-2 rounded-md ${
// //             isLessThan30Minutes()
// //               ? "bg-red-100 text-red-700 border border-red-300"
// //               : "bg-green-50 text-green-600"
// //           }`}>
// //             ⏰ {isLessThan30Minutes() ? "Ending soon: " : "Time until auto-return: "}
// //             {timeLeft}
// //             {isLessThan30Minutes() && (
// //               <span className="block text-xs mt-1 font-normal">
// //                 Car will be automatically returned to maintenance
// //               </span>
// //             )}
// //           </div>
// //         )}

// //         {/* Actions - NO MANUAL RETURN BUTTONS */}
// //         <div className="space-y-2">
// //           {booking.carDetails.availability === "In Maintenance" || booking.carDetails.availability === "Pending Payment" ? (
// //             <>
// //               <div className="flex gap-2">
// //                 <StatusBadge label="🛠 In Maintenance" color="bg-red-100 text-red-700" />
// //                 <StatusBadge label=" Payment Due" color="bg-red-100 text-red-700" />
// //               </div>
// //               <button
// //                 onClick={() => handleSeeDetails(booking)}
// //                 className="w-full bg-red-500 text-white py-1 rounded-md text-sm hover:bg-red-600 transition"
// //               >
// //                 📄 See Maintenance Details
// //               </button>
// //             </>
// //           ) : isReturnDisabled ? (
// //             <StatusBadge
// //               label={isCompleted ? "✅ Return Completed" : "⏳ Auto-Return Pending"}
// //               color={isCompleted ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}
// //             />
// //           ) : isOverdue ? (
// //             <StatusBadge
// //               label="🔄 Auto-Return Processing"
// //               color="bg-purple-100 text-purple-700"
// //             />
// //           ) : isActive ? (
// //             <StatusBadge label="Active Booking" color="bg-blue-100 text-blue-700" />
// //           ) : (
// //             <div className="flex gap-2">
// //               <button
// //                 onClick={() => setModelOpen(true)}
// //                 className="flex-1 bg-blue-500 text-white py-1 rounded-md text-sm hover:bg-blue-600"
// //               >
// //                 ✏ Update
// //               </button>
// //               <button
// //                 onClick={() => openCancelReasonDialog(booking._id)}
// //                 className="flex-1 bg-red-500 text-white py-1 rounded-md text-sm hover:bg-red-600"
// //               >
// //                 ❌ Cancel
// //               </button>
// //             </div>
// //           )}
// //         </div>

// //         {/* View Details */}
// //         <button
// //           onClick={() => openDialog(booking)}
// //           className="mt-2 text-sm text-blue-600 hover:underline text-left"
// //         >
// //           🚘 View Booking Details
// //         </button>
// //       </div>

// //       {/* Edit Booking Modal */}
// //       <EditBookingModal
// //         booking={booking}
// //         isOpen={ModelOpen}
// //         onClose={() => setModelOpen(false)}
// //       />
// //     </div>
// //   );
// // }

// // export default BookingCard;

// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import EditBookingModal from "./EditBooking";
// import moment from "moment";

// const Base_Url = import.meta.env.VITE_API_URL;

// function BookingCard({
//   booking,
//   handleSeeDetails,
//   setModelOpen,
//   openDialog,
//   ModelOpen,
//   openCancelReasonDialog,
// }) {
//   const [timeLeft, setTimeLeft] = useState("");
//   const [notificationSent, setNotificationSent] = useState(false);
//   const [showNotification, setShowNotification] = useState(false);
//   const [showComplaintModal, setShowComplaintModal] = useState(false);
//   const [complaintForm, setComplaintForm] = useState({
//     compl_Against: "",
//     description: "",
//     proof: null,
//   });
//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [userData, setUserData] = useState({
//     email: "",
//     contact: ""
//   });

//   const CurrentDate = new Date();
//   const BookingStartDateTime = new Date(`${booking.rentalStartDate} ${booking.StartTime}`);
//   const BookingEndDateTime = new Date(`${booking.rentalEndDate} ${booking.EndTime}`);

//   const isActive = CurrentDate >= BookingStartDateTime && CurrentDate <= BookingEndDateTime;
//   const isOverdue = CurrentDate > BookingEndDateTime;
//   const isCompleted = booking.status === "returned";
//   const isReturnInitiated = booking.status === "return initiated";
//   const isInProgress = isActive && !isOverdue && !isCompleted;

//   // Fetch user data
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await fetch(`${Base_Url}/api/getuser`, {
//           credentials: "include",
//         });
//         if (res.ok) {
//           const data = await res.json();
//           if (data && data.userdata) {
//             setUserData({
//               contact: data.userdata.contactNumber || "",
//               email: data.userdata.email || "",
//             });
//           }
//         }
//       } catch (err) {
//         console.error("Error fetching user:", err);
//       }
//     };
//     fetchUser();
//   }, []);

//   // Countdown Timer with Notification
//   useEffect(() => {
//     const updateTimer = () => {
//       const now = moment();
//       const endDateTime = moment(`${booking.rentalEndDate} ${booking.EndTime}`, "YYYY-MM-DD h:mm A");
//       const diff = endDateTime.diff(now);

//       // Check if 30 minutes or less remaining
//       const thirtyMinutesInMs = 30 * 60 * 1000;
//       const isThirtyMinutesLeft = diff > 0 && diff <= thirtyMinutesInMs;

//       if (isThirtyMinutesLeft && !notificationSent && isActive && !isCompleted) {
//         // Send notification to backend
//         sendBookingEndNotification(booking);
//         setNotificationSent(true);
//         setShowNotification(true);

//         // Auto hide notification after 10 seconds
//         setTimeout(() => {
//           setShowNotification(false);
//         }, 10000);
//       }

//       if (diff <= 0) {
//         setTimeLeft("00:00:00");
//       } else {
//         const duration = moment.duration(diff);
//         const hours = String(duration.hours()).padStart(2, "0");
//         const minutes = String(duration.minutes()).padStart(2, "0");
//         const seconds = String(duration.seconds()).padStart(2, "0");
//         setTimeLeft(`${hours}:${minutes}:${seconds}`);
//       }
//     };

//     updateTimer();
//     const timerInterval = setInterval(updateTimer, 1000);
//     return () => clearInterval(timerInterval);
//   }, [booking, notificationSent, isActive, isCompleted]);

//   // Function to send notification to backend
//   const sendBookingEndNotification = async (booking) => {
//     try {
//       // Backend API call for notification
//       const response = await fetch(`${Base_Url}/api/notifications/booking-reminder/${booking._id}`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         }
//       });

//       if (response.ok) {
//         console.log("Backend notification sent successfully");
//       }

//       // Browser notification
//       if ("Notification" in window && Notification.permission === "granted") {
//         new Notification("Booking Ending Soon!", {
//           body: `Your booking for ${booking.carDetails.carBrand} ${booking.carDetails.carModel} will end in 30 minutes. Car will be automatically returned to maintenance.`,
//           icon: `${Base_Url}/uploads/${booking.carDetails.images[0]}`,
//         });
//       } else if ("Notification" in window && Notification.permission === "default") {
//         // Request permission if not yet asked
//         Notification.requestPermission();
//       }
//     } catch (error) {
//       console.error("Error sending notification:", error);
//     }
//   };

//   // Request notification permission on component mount
//   useEffect(() => {
//     if ("Notification" in window && Notification.permission === "default") {
//       Notification.requestPermission();
//     }
//   }, []);

//   // Complaint Functions
//   const validateComplaintField = (name, value) => {
//     let error = "";
//     switch (name) {
//       case "compl_Against":
//         if (!value.trim()) error = "Please select a complaint type";
//         break;
//       case "description":
//         if (!value.trim()) error = "Description is required";
//         break;
//       case "proof":
//         if (!value) error = "Please attach a proof file";
//         break;
//       default:
//         break;
//     }
//     setErrors((prev) => ({ ...prev, [name]: error }));
//     return !error;
//   };

//   const handleComplaintChange = (e) => {
//     const { name, value, files } = e.target;
//     const fieldValue = name === "proof" ? files[0] : value;
//     setComplaintForm((prev) => ({ ...prev, [name]: fieldValue }));
//     validateComplaintField(name, fieldValue);
//   };

//   const openComplaintModal = () => {
//     setShowComplaintModal(true);
//     setComplaintForm({
//       compl_Against: "",
//       description: "",
//       proof: null,
//     });
//     setErrors({});
//   };

//   const closeComplaintModal = () => {
//     setShowComplaintModal(false);
//     setComplaintForm({
//       compl_Against: "",
//       description: "",
//       proof: null,
//     });
//     setErrors({});
//   };

//   const handleSubmitComplaint = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     // Validate complaint fields
//     const requiredFields = ["compl_Against", "description", "proof"];
//     let isValid = true;

//     requiredFields.forEach((field) => {
//       if (!validateComplaintField(field, complaintForm[field])) isValid = false;
//     });

//     if (!isValid) {
//       alert("Please fill all required fields");
//       setIsSubmitting(false);
//       return;
//     }

//     // Check if user data is loaded
//     if (!userData.email || !userData.contact) {
//       alert("User information not loaded. Please refresh the page.");
//       setIsSubmitting(false);
//       return;
//     }

//     try {
//       const formDataToSend = new FormData();

//       // Append data with exact field names that backend expects
//       formDataToSend.append("email", userData.email);
//       formDataToSend.append("contact", userData.contact);
//       formDataToSend.append("compl_Against", complaintForm.compl_Against);
//       formDataToSend.append("description", complaintForm.description);
//       formDataToSend.append("proof", complaintForm.proof);

//       // Append bookingId
//       if (booking && booking._id) {
//         formDataToSend.append("bookingId", booking._id);
//       }

//       console.log("Submitting complaint for booking:", booking._id);

//       const response = await fetch(
//         `${Base_Url}/api/complaints`,
//         {
//           method: "POST",
//           body: formDataToSend,
//           credentials: "include",
//         }
//       );

//       const result = await response.json();

//       if (response.ok) {
//         alert("Complaint submitted successfully");
//         closeComplaintModal();
//       } else {
//         throw new Error(result.message || "Failed to submit complaint");
//       }
//     } catch (error) {
//       console.error("Error submitting complaint:", error);
//       alert(error.message || "Failed to submit complaint");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const StatusBadge = ({ label, color }) => (
//     <span className={`px-2 py-1 text-xs rounded-full font-semibold ${color}`}>
//       {label}
//     </span>
//   );

//   const getStatusForBadge = () => {
//     if (isCompleted) return { label: "Completed", color: "bg-green-100 text-green-700" };
//     if (isReturnInitiated) return { label: "Return Pending", color: "bg-orange-100 text-orange-700" };
//     if (isOverdue) return { label: "🔄 Auto-Return Processing", color: "bg-purple-100 text-purple-700" };
//     if (isInProgress) return { label: "Active Booking", color: "bg-blue-100 text-blue-700" };
//     return { label: "Upcoming", color: "bg-yellow-100 text-yellow-700" };
//   };

//   const statusBadge = getStatusForBadge();
//   const isReturnDisabled = isReturnInitiated || isCompleted;

//   // Check if extend booking should be allowed
//   const canExtendBooking = CurrentDate >= BookingStartDateTime &&
//                           CurrentDate <= BookingEndDateTime &&
//                           booking.status !== "returned" &&
//                           !isReturnInitiated;

//   // Check if less than 30 minutes remaining
//   const isLessThan30Minutes = () => {
//     const now = moment();
//     const endDateTime = moment(`${booking.rentalEndDate} ${booking.EndTime}`, "YYYY-MM-DD h:mm A");
//     const diff = endDateTime.diff(now);
//     return diff > 0 && diff <= 30 * 60 * 1000;
//   };

//   return (
//     <div className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col w-full max-w-[380px] h-full transition duration-300 hover:shadow-lg border border-gray-200 relative">
//       {/* Notification Banner */}
//       {showNotification && isLessThan30Minutes() && (
//         <div className="absolute top-0 left-0 right-0 bg-orange-500 text-white text-sm font-semibold py-2 px-4 text-center animate-pulse z-10">
//           ⚡ Booking ending in 30 minutes! Car will auto-return to maintenance.
//         </div>
//       )}

//       <img
//         src={`${Base_Url}/uploads/${booking.carDetails.images[0]}`}
//         alt={`${booking.carDetails.carBrand} ${booking.carDetails.carModel}`}
//         className="w-full h-48 object-cover bg-gray-100"
//       />

//       <div className="p-4 flex flex-col justify-between flex-grow space-y-3">
//         {/* Car Info */}
//         <div className="flex justify-between items-start">
//           <div className="flex-1">
//             <h3 className="text-lg font-bold text-gray-800 mb-1 truncate">
//               {booking.carDetails.carBrand} {booking.carDetails.carModel}
//             </h3>
//             <p className="text-sm text-gray-500 mb-1">{booking.carDetails.carType}</p>
//             <p className="text-sm text-gray-600 flex items-center">
//               <svg
//                 className="w-4 h-4 mr-1 text-purple-500"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//                 strokeWidth="1.5"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75L12 6.75m0 0l2.25 3m-2.25-3v10.5" />
//               </svg>
//               {booking.carDetails.transmission}
//             </p>
//           </div>
//           {/* <StatusBadge label={statusBadge.label} color={statusBadge.color} /> */}
//         </div>

//         {/* Rent Info */}
//         <div className="flex justify-between items-center">
//           <span className="text-sm text-gray-700 font-medium">PKR {booking.carDetails.rentRate}/Day</span>
//           {canExtendBooking && (
//             <Link to={`/customer/extend-booking/${booking._id}`}>
//               <button className="text-sm text-blue-600 hover:underline bg-blue-50 px-2 py-1 rounded-md">
//                 Extend Booking
//               </button>
//             </Link>
//           )}
//         </div>

//         {/* Countdown Timer with Warning */}
//         {booking.status === "active" && !isReturnDisabled && (
//           <div className={`text-sm font-medium p-2 rounded-md ${
//             isLessThan30Minutes()
//               ? "bg-red-100 text-red-700 border border-red-300"
//               : "bg-green-50 text-green-600"
//           }`}>
//             ⏰ {isLessThan30Minutes() ? "Ending soon: " : "Time until auto-return: "}
//             {timeLeft}
//             {isLessThan30Minutes() && (
//               <span className="block text-xs mt-1 font-normal">
//                 Car will be automatically returned to maintenance
//               </span>
//             )}
//           </div>
//         )}

//         {/* Actions - NO MANUAL RETURN BUTTONS */}
//         <div className="space-y-2">
//           {booking.carDetails.availability === "In Maintenance" || booking.carDetails.availability === "Pending Payment" ? (
//             <>
//               <div className="flex gap-2">
//                 <StatusBadge label="🛠 In Maintenance" color="bg-red-100 text-red-700" />
//                 <StatusBadge label=" Payment Due" color="bg-red-100 text-red-700" />
//               </div>
//               <button
//                 onClick={() => handleSeeDetails(booking)}
//                 className="w-full bg-red-500 text-white py-1 rounded-md text-sm hover:bg-red-600 transition"
//               >
//                 📄 See Maintenance Details
//               </button>
//             </>
//           ) : isReturnDisabled ? (
//             <StatusBadge
//               label={isCompleted ? " Completed" : "Return Pending"}
//               color={isCompleted ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}
//             />
//           ) : isOverdue ? (
//             <StatusBadge
//               label="Return In Process"
//               color="bg-purple-100 text-purple-700"
//             />
//           ) : isActive ? (
//             <StatusBadge label="Active Booking" color="bg-blue-100 text-blue-700" />
//           ) : (
//             <div className="flex gap-2">
//               <button
//                 onClick={() => setModelOpen(true)}
//                 className="flex-1 bg-blue-500 text-white py-1 rounded-md text-sm hover:bg-blue-600"
//               >
//                  Update
//               </button>
//               <button
//                 onClick={() => openCancelReasonDialog(booking._id)}
//                 className="flex-1 bg-red-500 text-white py-1 rounded-md text-sm hover:bg-red-600"
//               >
//                 ❌ Cancel
//               </button>
//             </div>
//           )}
//         </div>

//         {/* View Details and Make Complaint Links */}
//         <div className="flex justify-between items-center mt-2">
//           <button
//             onClick={() => openDialog(booking)}
//             className="text-sm text-blue-600 hover:underline"
//           >
//             View Booking Details
//           </button>
//           <button
//             onClick={openComplaintModal}
//             className="text-sm text-blue-600 hover:underline"
//           >
//             Make Complaint
//           </button>
//         </div>
//       </div>

//       {/* Edit Booking Modal */}
//       <EditBookingModal
//         booking={booking}
//         isOpen={ModelOpen}
//         onClose={() => setModelOpen(false)}
//       />

//       {/* Complaint Modal */}
//       {showComplaintModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
//             {/* Modal Header */}
//             <div className="flex justify-between items-center p-6 border-b border-gray-200">
//               <h3 className="text-xl font-bold text-gray-800">
//                 File Complaint
//               </h3>
//               <button
//                 onClick={closeComplaintModal}
//                 className="text-gray-400 hover:text-gray-600 transition-colors"
//               >
//                 ✕
//               </button>
//             </div>

//             {/* Modal Body */}
//             <div className="p-6">
//               {/* Selected Booking Info */}
//               <div className="mb-4 p-3 bg-gray-50 rounded-lg">
//                 <p className="font-semibold text-gray-800">
//                   {booking.carDetails.carBrand} {booking.carDetails.carModel}
//                 </p>
//                 <p className="text-sm text-gray-600">
//                   {booking.showroomDetails?.showroomName || "Showroom"}
//                 </p>
//                 <p className="text-xs text-gray-500">
//                   {booking.rentalStartDate} → {booking.rentalEndDate}
//                 </p>
//               </div>

//               <form onSubmit={handleSubmitComplaint} className="space-y-4">
//                 {/* Complaint Type */}
//                 <div>
//                   <label className="font-bold text-gray-700">Complaint Type *</label>
//                   <select
//                     name="compl_Against"
//                     value={complaintForm.compl_Against}
//                     onChange={handleComplaintChange}
//                     className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
//                       errors.compl_Against
//                         ? "border-red-500"
//                         : "focus:ring-2 focus:ring-blue-500"
//                     }`}
//                   >
//                     <option value="">Select Complaint Type</option>
//                     <option value="Staff">Staff</option>
//                     <option value="Service">Service</option>
//                     <option value="Vehicle">Vehicle</option>
//                     <option value="Billing">Billing</option>
//                   </select>
//                   {errors.compl_Against && (
//                     <p className="text-red-500 text-xs mt-1">
//                       {errors.compl_Against}
//                     </p>
//                   )}
//                 </div>

//                 {/* Description */}
//                 <div>
//                   <label className="font-bold text-gray-700">Description *</label>
//                   <textarea
//                     name="description"
//                     value={complaintForm.description}
//                     onChange={handleComplaintChange}
//                     placeholder="Please describe your complaint in detail..."
//                     rows="4"
//                     className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
//                       errors.description
//                         ? "border-red-500"
//                         : "focus:ring-2 focus:ring-blue-500"
//                     }`}
//                   />
//                   {errors.description && (
//                     <p className="text-red-500 text-xs mt-1">
//                       {errors.description}
//                     </p>
//                   )}
//                 </div>

//                 {/* Proof */}
//                 <div>
//                   <label className="font-bold text-gray-700">Proof (Attachment) *</label>
//                   <input
//                     name="proof"
//                     type="file"
//                     accept="image/*,.pdf,.doc,.docx"
//                     onChange={handleComplaintChange}
//                     className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
//                       errors.proof
//                         ? "border-red-500"
//                         : "focus:ring-2 focus:ring-blue-500"
//                     }`}
//                   />
//                   {errors.proof && (
//                     <p className="text-red-500 text-xs mt-1">{errors.proof}</p>
//                   )}
//                   <p className="text-xs text-gray-500 mt-1">
//                     Supported formats: Images, PDF, Word documents
//                   </p>
//                 </div>

//                 {/* Submit Buttons */}
//                 <div className="flex gap-3 pt-4">
//                   <button
//                     type="button"
//                     onClick={closeComplaintModal}
//                     className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     disabled={isSubmitting}
//                     className={`flex-1 px-4 py-2 bg-red-600 text-white rounded-lg transition-colors ${
//                       isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:bg-red-700"
//                     }`}
//                   >
//                     {isSubmitting ? "Submitting..." : "Submit Complaint"}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default BookingCard;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EditBookingModal from "./EditBooking";
import moment from "moment";

const Base_Url = import.meta.env.VITE_API_URL;

function BookingCard({
  booking,
  handleSeeDetails,
  setModelOpen,
  openDialog,
  ModelOpen,
  openCancelReasonDialog,
}) {
  const [timeLeft, setTimeLeft] = useState("");
  const [notificationSent, setNotificationSent] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showComplaintModal, setShowComplaintModal] = useState(false);
  const [complaintForm, setComplaintForm] = useState({
    compl_Against: "",
    description: "",
    proof: null,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    contact: "",
  });

  const CurrentDate = new Date();
  const BookingStartDateTime = new Date(
    `${booking.rentalStartDate} ${booking.StartTime}`
  );
  const BookingEndDateTime = new Date(
    `${booking.rentalEndDate} ${booking.EndTime}`
  );

  const isActive =
    CurrentDate >= BookingStartDateTime && CurrentDate <= BookingEndDateTime;
  const isOverdue = CurrentDate > BookingEndDateTime;
  const isCompleted = booking.status === "returned";
  const isReturnInitiated = booking.status === "return initiated";
  const isInProgress = isActive && !isOverdue && !isCompleted;

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${Base_Url}/api/getuser`, {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          if (data && data.userdata) {
            setUserData({
              contact: data.userdata.contactNumber || "",
              email: data.userdata.email || "",
            });
          }
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };
    fetchUser();
  }, []);

  // Countdown Timer with Notification
  useEffect(() => {
    const updateTimer = () => {
      const now = moment();
      const endDateTime = moment(
        `${booking.rentalEndDate} ${booking.EndTime}`,
        "YYYY-MM-DD h:mm A"
      );
      const diff = endDateTime.diff(now);

      // Check if 30 minutes or less remaining
      const thirtyMinutesInMs = 30 * 60 * 1000;
      const isThirtyMinutesLeft = diff > 0 && diff <= thirtyMinutesInMs;

      if (
        isThirtyMinutesLeft &&
        !notificationSent &&
        isActive &&
        !isCompleted
      ) {
        // Send notification to backend
        sendBookingEndNotification(booking);
        setNotificationSent(true);
        setShowNotification(true);

        // Auto hide notification after 10 seconds
        setTimeout(() => {
          setShowNotification(false);
        }, 10000);
      }

      if (diff <= 0) {
        setTimeLeft("00:00:00");
      } else {
        const duration = moment.duration(diff);
        const hours = String(duration.hours()).padStart(2, "0");
        const minutes = String(duration.minutes()).padStart(2, "0");
        const seconds = String(duration.seconds()).padStart(2, "0");
        setTimeLeft(`${hours}:${minutes}:${seconds}`);
      }
    };

    updateTimer();
    const timerInterval = setInterval(updateTimer, 1000);
    return () => clearInterval(timerInterval);
  }, [booking, notificationSent, isActive, isCompleted]);

  // Function to send notification to backend
  const sendBookingEndNotification = async (booking) => {
    try {
      // Backend API call for notification
      const response = await fetch(
        `${Base_Url}/api/notifications/booking-reminder/${booking._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        console.log("Backend notification sent successfully");
      }

      // Browser notification
      if ("Notification" in window && Notification.permission === "granted") {
        new Notification("Booking Ending Soon!", {
          body: `Your booking for ${booking.carDetails.carBrand} ${booking.carDetails.carModel} will end in 30 minutes. Car will be automatically returned to maintenance.`,
          icon: `${Base_Url}/uploads/${booking.carDetails.images[0]}`,
        });
      } else if (
        "Notification" in window &&
        Notification.permission === "default"
      ) {
        // Request permission if not yet asked
        Notification.requestPermission();
      }
    } catch (error) {
      console.error("Error sending notification:", error);
    }
  };

  // Request notification permission on component mount
  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  // Complaint Functions
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

  const openComplaintModal = () => {
    setShowComplaintModal(true);
    setComplaintForm({
      compl_Against: "",
      description: "",
      proof: null,
    });
    setErrors({});
  };

  const closeComplaintModal = () => {
    setShowComplaintModal(false);
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
      alert("Please fill all required fields");
      setIsSubmitting(false);
      return;
    }

    // Check if user data is loaded
    if (!userData.email || !userData.contact) {
      alert("User information not loaded. Please refresh the page.");
      setIsSubmitting(false);
      return;
    }

    try {
      const formDataToSend = new FormData();

      // Append data with exact field names that backend expects
      formDataToSend.append("email", userData.email);
      formDataToSend.append("contact", userData.contact);
      formDataToSend.append("compl_Against", complaintForm.compl_Against);
      formDataToSend.append("description", complaintForm.description);
      formDataToSend.append("proof", complaintForm.proof);

      // Append bookingId
      if (booking && booking._id) {
        formDataToSend.append("bookingId", booking._id);
      }

      console.log("Submitting complaint for booking:", booking._id);

      const response = await fetch(`${Base_Url}/api/complaints`, {
        method: "POST",
        body: formDataToSend,
        credentials: "include",
      });

      const result = await response.json();

      if (response.ok) {
        alert("Complaint submitted successfully");
        closeComplaintModal();
      } else {
        throw new Error(result.message || "Failed to submit complaint");
      }
    } catch (error) {
      console.error("Error submitting complaint:", error);
      alert(error.message || "Failed to submit complaint");
    } finally {
      setIsSubmitting(false);
    }
  };

  const StatusBadge = ({ label, color }) => (
    <span className={`px-2 py-1 text-xs rounded-full font-semibold ${color}`}>
      {label}
    </span>
  );

  const getStatusForBadge = () => {
    if (isCompleted)
      return { label: "Completed", color: "bg-green-100 text-green-700" };
    if (isReturnInitiated)
      return {
        label: "Return Pending",
        color: "bg-orange-100 text-orange-700",
      };
    if (isOverdue)
      return {
        label: "🔄 Auto-Return Processing",
        color: "bg-purple-100 text-purple-700",
      };
    if (isInProgress)
      return { label: "Active Booking", color: "bg-blue-100 text-blue-700" };
    return { label: "Upcoming", color: "bg-yellow-100 text-yellow-700" };
  };

  const statusBadge = getStatusForBadge();
  const isReturnDisabled = isReturnInitiated || isCompleted;

  // Check if extend booking should be allowed
  const canExtendBooking =
    CurrentDate >= BookingStartDateTime &&
    CurrentDate <= BookingEndDateTime &&
    booking.status !== "returned" &&
    !isReturnInitiated;

  // Check if less than 30 minutes remaining
  const isLessThan30Minutes = () => {
    const now = moment();
    const endDateTime = moment(
      `${booking.rentalEndDate} ${booking.EndTime}`,
      "YYYY-MM-DD h:mm A"
    );
    const diff = endDateTime.diff(now);
    return diff > 0 && diff <= 30 * 60 * 1000;
  };

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col w-full max-w-[380px] h-full transition duration-300 hover:shadow-lg border border-gray-200 relative">
      {/* Notification Banner */}
      {showNotification && isLessThan30Minutes() && (
        <div className="absolute top-0 left-0 right-0 bg-orange-500 text-white text-sm font-semibold py-2 px-4 text-center animate-pulse z-10">
          ⚡ Booking ending in 30 minutes! Car will auto-return to maintenance.
        </div>
      )}

      <img
        src={`${Base_Url}/uploads/${booking.carDetails.images[0]}`}
        alt={`${booking.carDetails.carBrand} ${booking.carDetails.carModel}`}
        className="w-full h-48 object-cover bg-gray-100"
      />

      <div className="p-4 flex flex-col justify-between flex-grow space-y-3">
        {/* Car Info */}
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-800 mb-1 truncate">
              {booking.carDetails.carBrand} {booking.carDetails.carModel}
            </h3>
            <p className="text-sm text-gray-500 mb-1">
              {booking.carDetails.carType}
            </p>
            <p className="text-sm text-gray-600 flex items-center">
              <svg
                className="w-4 h-4 mr-1 text-purple-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.75 9.75L12 6.75m0 0l2.25 3m-2.25-3v10.5"
                />
              </svg>
              {booking.carDetails.transmission}
            </p>
          </div>
          {/* SINGLE STATUS BADGE - Only one displayed */}
          <StatusBadge label={statusBadge.label} color={statusBadge.color} />
        </div>

        {/* Rent Info */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-700 font-medium">
            PKR {booking.carDetails.rentRate}/Day
          </span>
          {canExtendBooking && (
            <Link to={`/customer/extend-booking/${booking._id}`}>
              <button className="text-sm text-blue-600 hover:underline bg-blue-50 px-2 py-1 rounded-md">
                Extend Booking
              </button>
            </Link>
          )}
        </div>

        {/* Countdown Timer with Warning */}
        {booking.status === "active" && !isReturnDisabled && (
          <div
            className={`text-sm font-medium p-2 rounded-md ${
              isLessThan30Minutes()
                ? "bg-red-100 text-red-700 border border-red-300"
                : "bg-green-50 text-green-600"
            }`}
          >
            ⏰{" "}
            {isLessThan30Minutes()
              ? "Ending soon: "
              : "Time until auto-return: "}
            {timeLeft}
            {isLessThan30Minutes() && (
              <span className="block text-xs mt-1 font-normal">
                Car will be automatically returned to maintenance
              </span>
            )}
          </div>
        )}

        {/* Actions - NO DUPLICATE STATUS BADGES */}
        <div className="space-y-2">
          {booking.carDetails.availability === "In Maintenance" ||
          booking.carDetails.availability === "Pending Payment" ? (
            <>
              <div className="flex gap-2">
                <StatusBadge
                  label="🛠 In Maintenance"
                  color="bg-red-100 text-red-700"
                />
                <StatusBadge
                  label=" Payment Due"
                  color="bg-red-100 text-red-700"
                />
              </div>
              <button
                onClick={() => handleSeeDetails(booking)}
                className="w-full bg-red-500 text-white py-1 rounded-md text-sm hover:bg-red-600 transition"
              >
                📄 See Maintenance Details
              </button>
            </>
          ) : isReturnDisabled || isOverdue ? (
            // No duplicate status badge - just informative text
            <div className="text-sm text-gray-500 text-center py-2">
              {isCompleted ? "Booking completed" : "Return in process"}
            </div>
          ) : isActive ? (
            <StatusBadge
              label="Active Booking"
              color="bg-blue-100 text-blue-700"
            />
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => setModelOpen(true)}
                className="flex-1 bg-[#C17D3C] text-white py-1 rounded-md text-sm hover:bg-[#C17D3C]"
              >
                Update
              </button>
              {/* <button
                onClick={() => openCancelReasonDialog(booking._id)}
                className="flex-1  text-[#C17D3C] py-1 rounded-md text-sm border-[#C17D3C]"
              >
                Cancel
              </button> */}

              <button
                onClick={() => openCancelReasonDialog(booking._id)}
                className="flex-1 border-2 border-[#C17D3C] text-[#C17D3C] py-1 rounded-md text-sm hover:bg-[#C17D3C] hover:text-white transition-colors"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        {/* View Details and Make Complaint Links */}
        <div className="flex justify-between items-center mt-2">
          <button
            onClick={() => openDialog(booking)}
            className="text-sm text-blue-600 hover:underline"
          >
            View Booking Details
          </button>
          <button
            onClick={openComplaintModal}
            className="text-sm text-blue-600 hover:underline"
          >
            Make Complaint
          </button>
        </div>
      </div>

      {/* Edit Booking Modal */}
      <EditBookingModal
        booking={booking}
        isOpen={ModelOpen}
        onClose={() => setModelOpen(false)}
      />

      {/* Complaint Modal */}
      {showComplaintModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-800">
                File Complaint
              </h3>
              <button
                onClick={closeComplaintModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {/* Selected Booking Info */}
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <p className="font-semibold text-gray-800">
                  {booking.carDetails.carBrand} {booking.carDetails.carModel}
                </p>
                <p className="text-sm text-gray-600">
                  {booking.showroomDetails?.showroomName || "Showroom"}
                </p>
                <p className="text-xs text-gray-500">
                  {booking.rentalStartDate} → {booking.rentalEndDate}
                </p>
              </div>

              <form onSubmit={handleSubmitComplaint} className="space-y-4">
                {/* Complaint Type */}
                <div>
                  <label className="font-bold text-gray-700">
                    Complaint Type *
                  </label>
                  <select
                    name="compl_Against"
                    value={complaintForm.compl_Against}
                    onChange={handleComplaintChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
                      errors.compl_Against
                        ? "border-red-500"
                        : "focus:ring-2 focus:ring-blue-500"
                    }`}
                  >
                    <option value="">Select Complaint Type</option>
                    <option value="Staff">Staff</option>
                    <option value="Service">Service</option>
                    <option value="Vehicle">Vehicle</option>
                    <option value="Billing">Billing</option>
                  </select>
                  {errors.compl_Against && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.compl_Against}
                    </p>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label className="font-bold text-gray-700">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={complaintForm.description}
                    onChange={handleComplaintChange}
                    placeholder="Please describe your complaint in detail..."
                    rows="4"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
                      errors.description
                        ? "border-red-500"
                        : "focus:ring-2 focus:ring-blue-500"
                    }`}
                  />
                  {errors.description && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.description}
                    </p>
                  )}
                </div>

                {/* Proof */}
                <div>
                  <label className="font-bold text-gray-700">
                    Proof (Attachment) *
                  </label>
                  <input
                    name="proof"
                    type="file"
                    accept="image/*,.pdf,.doc,.docx"
                    onChange={handleComplaintChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
                      errors.proof
                        ? "border-red-500"
                        : "focus:ring-2 focus:ring-blue-500"
                    }`}
                  />
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
                    onClick={closeComplaintModal}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`flex-1 px-4 py-2 bg-[#C17D3C] text-white rounded-lg transition-colors ${
                      isSubmitting
                        ? "opacity-70 cursor-not-allowed"
                        : "hover:bg-[#C17D3C]"
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
    </div>
  );
}

export default BookingCard;
