// import axios from "axios";
// import ShowroomNavbar from "./showroomNavbar";


// import { useEffect, useState } from "react";
// import { 
//   FiLoader, FiAlertCircle, FiCalendar, FiEye, FiUser, FiDollarSign, 
//   FiCheckCircle, FiXCircle, FiMapPin, FiMail, FiPhone, FiDownload, FiExternalLink,
//   FiTruck, FiRefreshCw, FiSearch, FiFilter
// } from "react-icons/fi";

// const Base_Url = import.meta.env.VITE_API_URL;

// // Booking Dialog Component (Keep this as is)
// const ShowroomBookingDialog = ({ isOpen, onClose, booking }) => {
//   if (!isOpen || !booking) return null;

//   const car = booking.carDetails || booking.carId || {};
//   const customer = booking.customer || booking.userId || {};

//   const getStatusColor = (status) => {
//     const s = (status || 'upcoming').toLowerCase();
//     switch(s){
//       case 'active': return 'bg-blue-100 text-blue-800 border border-blue-200';
//       case 'completed':
//       case 'returned': 
//       case 'return initiated': return 'bg-green-100 text-green-800 border border-green-200';
//       case 'overdue': return 'bg-red-100 text-red-800 border border-red-200';
//       case 'cancelled': return 'bg-gray-100 text-gray-800 border border-gray-200';
//       default: return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
//     }
//   };

//   const getPaymentStatusColor = (status) => {
//     const s = (status || 'pending').toLowerCase();
//     switch(s){
//       case 'paid':
//       case 'confirmed': return 'bg-green-100 text-green-800';
//       case 'pending': return 'bg-yellow-100 text-yellow-800';
//       case 'failed': return 'bg-red-100 text-red-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
//       <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
//         {/* Header */}
//         <div className="bg-[#C17D3C] p-6 text-white rounded-t-xl flex justify-between items-start">
//           <div>
//             <h2 className="text-2xl font-bold">Your Car Booking Details</h2>
//             <p className="text-white text-sm mt-1">Booking ID: {booking._id}</p>
//           </div>
//           <button onClick={onClose} className="text-white hover:text-gray-200 text-2xl font-bold bg-black bg-opacity-20 rounded-full w-8 h-8 flex items-center justify-center transition-colors">×</button>
//         </div>

//         <div className="p-6 space-y-6">
//           {/* Status & Payment */}
//           <div className="flex justify-between flex-wrap gap-4 items-center">
//             <div className="flex flex-wrap gap-2">
//               <span className={`px-3 py-2 rounded-full text-sm font-semibold ${getStatusColor(booking.status)}`}>
//                 {(booking.status || 'UPCOMING').toUpperCase()}
//               </span>
//               <span className={`px-3 py-2 rounded-full text-sm font-semibold ${getPaymentStatusColor(booking.paymentStatus)}`}>
//                 PAYMENT: {(booking.paymentStatus || 'PENDING').toUpperCase()}
//               </span>
//             </div>
//             <div className="text-right">
//               <p className="text-2xl font-bold ">PKR {(booking.totalPrice || 0).toLocaleString()}</p>
//               <p className="text-sm text-gray-600">Total Amount</p>
//             </div>
//           </div>

//           {/* Car Info & Image */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             <div className="space-y-4">
//               <h3 className="text-lg font-semibold flex items-center text-gray-800">
//                 <FiTruck className="mr-2 text-blue-600"/>Car Information
//               </h3>
//               <div className="bg-gray-50 p-4 rounded-lg space-y-2">
//                 <div className="flex justify-between"><span className="text-gray-600">Car:</span><span className="font-medium">{car.carBrand} {car.carModel}</span></div>
//                 <div className="flex justify-between"><span className="text-gray-600">Type:</span><span className="font-medium">{car.carType || car.bodyType || 'N/A'}</span></div>
//                 <div className="flex justify-between"><span className="text-gray-600">Transmission:</span><span className="font-medium">{car.transmission || 'N/A'}</span></div>
//                 <div className="flex justify-between"><span className="text-gray-600">Plate Number:</span><span className="font-medium">{car.plateNumber || 'N/A'}</span></div>
//                 <div className="flex justify-between"><span className="text-gray-600">Fuel Type:</span><span className="font-medium">{car.fuelType || 'N/A'}</span></div>
//                 <div className="flex justify-between"><span className="text-gray-600">Color:</span><span className="font-medium">{car.color || 'N/A'}</span></div>
//                 <div className="flex justify-between"><span className="text-gray-600">Year:</span><span className="font-medium">{car.year || 'N/A'}</span></div>
//                 <div className="flex justify-between"><span className="text-gray-600">Daily Rate:</span><span className="font-medium">PKR {car.rentRate || 0}/day</span></div>
//               </div>
//             </div>
//             <div className="space-y-4">
//               <h3 className="text-lg font-semibold text-gray-800">Car Image</h3>
//               <div className="bg-gray-100 rounded-lg overflow-hidden border">
//                 <img 
//                   src={car.images?.[0] ? `${Base_Url}/uploads/${car.images[0]}` : '/default-car.jpg'} 
//                   alt={`${car.carBrand} ${car.carModel}`} 
//                   className="w-full h-48 object-cover"
//                   onError={e => e.target.src = '/default-car.jpg'}
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Customer Info */}
//           <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
//             <h3 className="text-lg font-semibold mb-3 flex items-center text-blue-800">
//               <FiUser className="mr-2"/>Customer Information
//             </h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//               {/* <div><p className="text-sm text-blue-600">Customer Name</p><p className="font-semibold text-gray-800">{customer.name || "Unknown Customer"}</p></div> */}
//               <div><p className="text-sm text-blue-600">Email</p><p className="font-semibold text-gray-800 flex items-center"><FiMail className="mr-1 text-sm"/>{customer.email || "N/A"}</p></div>
//               <div><p className="text-sm text-blue-600">Phone</p><p className="font-semibold text-gray-800 flex items-center"><FiPhone className="mr-1 text-sm"/>{customer.contactNumber || customer.phone || "N/A"}</p></div>
//               <div className="md:col-span-2 lg:col-span-3"><p className="text-sm text-blue-600">Address</p><p className="font-semibold text-gray-800">{customer.address || "N/A"}</p></div>
//             </div>
//           </div>

//           {/* Rental Period */}
//           <div className="bg-green-50 p-4 rounded-lg border border-green-100">
//             <h3 className="text-lg font-semibold mb-3 flex items-center text-green-800">
//               <FiCalendar className="mr-2"/>Rental Period
//             </h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <p className="text-sm text-green-600">Start Date & Time</p>
//                 <p className="font-semibold text-gray-800">{booking.rentalStartDate} at {booking.rentalStartTime || 'N/A'}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-green-600">End Date & Time</p>
//                 <p className="font-semibold text-gray-800">{booking.rentalEndDate} at {booking.rentalEndTime || 'N/A'}</p>
//               </div>
//             </div>
//           </div>

//           {/* Overdue Charges */}
//           {(booking.overdueHours || 0) > 0 && (
//             <div className="bg-red-50 p-4 rounded-lg border border-red-200">
//               <h3 className="text-lg font-semibold mb-2 text-red-800">Overdue Charges</h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div><p className="text-sm text-red-600">Overdue Hours</p><p className="font-semibold text-red-800">{booking.overdueHours} hours</p></div>
//                 <div><p className="text-sm text-red-600">Overdue Charge</p><p className="font-semibold text-red-800">PKR {(booking.overdueCharge || 0).toLocaleString()}</p></div>
//               </div>
//             </div>
//           )}

//           {/* Invoice Buttons */}
//           {booking.currentInvoiceUrl && (
//             <div className="bg-gray-50 p-4 rounded-lg border">
//               <h3 className="text-lg font-semibold mb-3 text-gray-800">Invoice</h3>
//               <div className="flex flex-col sm:flex-row gap-3">
//                 <button 
//                   onClick={() => window.open(booking.currentInvoiceUrl, "_blank")}
//                   className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
//                 >
//                   <FiExternalLink className="mr-2"/>View Invoice
//                 </button>
//                 <button 
//                   onClick={() => {
//                     const link = document.createElement('a');
//                     link.href = booking.currentInvoiceUrl;
//                     link.download = `invoice-${booking._id}.pdf`;
//                     document.body.appendChild(link);
//                     link.click();
//                     document.body.removeChild(link);
//                   }}
//                   className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
//                 >
//                   <FiDownload className="mr-2"/>Download Invoice
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// // ---------------- Main Component ----------------
// const ShowroomBookings = () => {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedBooking, setSelectedBooking] = useState(null);
//   const [filter, setFilter] = useState("all");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [stats, setStats] = useState({
//     totalBookings: 0,
//     active: 0,
//     upcoming: 0,
//     completed: 0,
//     overdue: 0,
//     cancelled: 0
//   });

//   const calculateBookingStatus = (b) => {
//     if (!b.rentalStartDate || !b.rentalEndDate) return b.status || 'unknown';
    
//     const now = new Date();
//     const start = new Date(b.rentalStartDate);
//     const end = new Date(b.rentalEndDate);
    
//     if (b.status === 'returned' || b.status === 'completed' || b.status === 'return initiated') return 'completed';
//     if (b.status === 'cancelled') return 'cancelled';
//     if (now > end) return 'overdue';
//     if (now >= start && now <= end) return 'active';
//     if (now < start) return 'upcoming';
    
//     return b.status || 'upcoming';
//   };

//   const fetchShowroomBookings = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const res = await axios.get(`${Base_Url}/api/bookcar/showroom/bookings`, { 
//         withCredentials: true, 
//         timeout: 10000 
//       });
      
//       console.log("API Response:", res.data); // Debug log
      
//       if (!res.data?.success) {
//         throw new Error(res.data?.message || "Failed to fetch bookings");
//       }
      
//       // FIX: Use res.data.bookings instead of res.data.data
//       const data = Array.isArray(res.data.bookings) ? res.data.bookings : [];
//       console.log("Processed bookings data:", data); // Debug log
      
//       setBookings(data);

//       const statsObj = {
//         totalBookings: data.length,
//         active: data.filter(b => calculateBookingStatus(b) === 'active').length,
//         upcoming: data.filter(b => calculateBookingStatus(b) === 'upcoming').length,
//         completed: data.filter(b => calculateBookingStatus(b) === 'completed').length,
//         overdue: data.filter(b => calculateBookingStatus(b) === 'overdue').length,
//         cancelled: data.filter(b => calculateBookingStatus(b) === 'cancelled').length
//       };
//       setStats(statsObj);
//     } catch(err) {
//       console.error("Error fetching bookings:", err);
//       setError(err.response?.data?.message || err.message || "Failed to fetch showroom bookings");
//       setBookings([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => { 
//     fetchShowroomBookings(); 
//   }, []);

//   const filteredBookings = bookings.filter(b => {
//     const searchLower = searchTerm.toLowerCase();
//     const car = b.carDetails || b.carId || {};
//     const customer = b.customer || b.userId || {};
    
//     const matchesSearch = 
//       customer.name?.toLowerCase().includes(searchLower) ||
//       customer.email?.toLowerCase().includes(searchLower) ||
//       customer.contactNumber?.toLowerCase().includes(searchLower) ||
//       car.carBrand?.toLowerCase().includes(searchLower) ||
//       car.carModel?.toLowerCase().includes(searchLower) ||
//       car.plateNumber?.toLowerCase().includes(searchLower) ||
//       b._id?.toLowerCase().includes(searchLower);

//     const matchesStatus = filter === "all" || calculateBookingStatus(b) === filter;
//     return matchesSearch && matchesStatus;
//   });

//   const clearFilters = () => { setSearchTerm(""); setFilter("all"); };
//   const isFilterActive = searchTerm || filter !== "all";

//   if (loading) return (
//     <div className="min-h-screen flex items-center justify-center flex-col bg-gray-50">
//       <FiLoader className="animate-spin text-4xl text-blue-600 mb-4"/>
//       <span className="text-lg text-gray-600">Loading your showroom bookings...</span>
//     </div>
//   );

//   return (
//    <> <ShowroomNavbar/>
//     <div className="min-h-screen bg-gray-50 p-6">
     
//       <div className="max-w-7xl mx-auto">
//         {/* Header & Refresh */}
//         <div className="flex justify-between items-center mb-6">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900">Your Showroom Bookings</h1>
//             <p className="text-gray-600 mt-1">Manage bookings for your showroom cars only</p>
//           </div>
//           <button onClick={fetchShowroomBookings} className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
//             <FiRefreshCw className="mr-2"/>Refresh
//           </button>
//         </div>

//         {/* Error */}
//         {error && (
//           <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
//             <div className="flex items-center">
//               <FiAlertCircle className="mr-2 flex-shrink-0"/>
//               <div>
//                 <p className="font-medium">Request failed</p>
//                 <p className="text-sm mt-1">{error}</p>
//                 <button onClick={fetchShowroomBookings} className="mt-2 px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200 transition-colors">
//                   Try Again
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Stats */}
//         <div className="bg-white shadow rounded-xl p-6 mb-6">
//           <h2 className="text-2xl font-bold text-[#394A9A] mb-6">Showroom Bookings Overview</h2>
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
//             {Object.entries(stats).map(([key, value]) => (
//               <div key={key} className={`cursor-pointer p-4 rounded-lg shadow text-center transition-all ${key==='active'?'bg-green-100 text-green-800 hover:bg-green-200':''} ${key==='upcoming'?'bg-yellow-100 text-yellow-800 hover:bg-yellow-200':''} ${key==='completed'?'bg-purple-100 text-purple-800 hover:bg-purple-200':''} ${key==='overdue'?'bg-red-100 text-red-800 hover:bg-red-200':''} ${key==='cancelled'?'bg-gray-100 text-gray-800 hover:bg-gray-200':''} ${key==='totalBookings'?'bg-blue-100 text-blue-800 hover:bg-blue-200':''}`}>
//                 <h3 className="text-lg font-semibold capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</h3>
//                 <p className="text-2xl font-bold">{value}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Filters */}
//         <div className="bg-white rounded-lg shadow mb-6 p-4">
//           <div className="flex flex-col sm:flex-row gap-4">
//             <div className="flex-1 relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <FiSearch className="h-5 w-5 text-gray-400" />
//               </div>
//               <input 
//                 type="text" 
//                 placeholder="Search by customer, car, plate number..." 
//                 value={searchTerm} 
//                 onChange={e => setSearchTerm(e.target.value)}
//                 className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
//               />
//             </div>

//             <div className="sm:w-48 relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <FiFilter className="h-5 w-5 text-gray-400" />
//               </div>
//               <select 
//                 value={filter} 
//                 onChange={e => setFilter(e.target.value)}
//                 className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
//               >
//                 <option value="all">All Status</option>
//                 <option value="active">Active</option>
//                 <option value="upcoming">Upcoming</option>
//                 <option value="completed">Completed</option>
//                 <option value="overdue">Overdue</option>
//                 <option value="cancelled">Cancelled</option>
//               </select>
//             </div>

//             {isFilterActive && (
//               <div className="sm:w-auto">
//                 <button onClick={clearFilters} className="w-full sm:w-auto px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors">
//                   Clear Filters
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Bookings Grid */}
//         {filteredBookings.length === 0 ? (
//           <div className="text-center p-8 bg-white rounded-lg shadow">
//             <FiAlertCircle className="mx-auto h-16 w-16 text-gray-400" />
//             <h3 className="mt-4 text-lg font-medium text-gray-900">
//               {bookings.length === 0 ? "No bookings for your cars" : "No matching bookings"}
//             </h3>
//             <p className="mt-2 text-sm text-gray-500">
//               {bookings.length === 0 ? "No customers have booked your showroom cars yet." : "Try adjusting your search or filter to find what you're looking for."}
//             </p>
//             {isFilterActive && bookings.length > 0 && (
//               <button onClick={clearFilters} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
//                 Clear Filters
//               </button>
//             )}
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredBookings.map(b => {
//               const car = b.carDetails || b.carId || {};
//               const customer = b.customer || b.userId || {};
//               const status = calculateBookingStatus(b);

//               return (
//                 <div key={b._id} className="bg-white rounded-xl shadow-md border hover:shadow-lg transition-all overflow-hidden">
//                   <div className="relative">
//                     <img 
//                       src={car.images?.[0] ? `${Base_Url}/uploads/${car.images[0]}` : '/default-car.jpg'} 
//                       alt={`${car.carBrand} ${car.carModel}`} 
//                       className="w-full h-48 object-cover" 
//                       onError={e => e.target.src='/default-car.jpg'} 
//                     />
//                     <div className="absolute top-3 right-3 flex flex-col gap-2">
//                       <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
//                         status==='active'?'bg-blue-100 text-blue-800':
//                         status==='completed'?'bg-green-100 text-green-800':
//                         status==='overdue'?'bg-red-100 text-red-800':
//                         status==='cancelled'?'bg-gray-100 text-gray-800':
//                         'bg-yellow-100 text-yellow-800'
//                       }`}>
//                         {status.toUpperCase()}
//                       </span>
//                       <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
//                         (b.paymentStatus==='paid'||b.paymentStatus==='confirmed')?'bg-green-100 text-green-800':'bg-yellow-100 text-yellow-800'
//                       }`}>
//                         {(b.paymentStatus || 'PENDING').toUpperCase()}
//                       </span>
//                     </div>
//                   </div>
//                   <div className="p-4">
//                     <h3 className="font-bold text-lg text-gray-900">{car.carBrand} {car.carModel}</h3>
//                     <div className="flex justify-between text-sm text-gray-600 mt-1">
//                       <span>{car.bodyType || car.carType} • {car.transmission}</span>
//                       <span className="font-semibold">PKR {car.rentRate}/day</span>
//                     </div>
//                     <div className="flex items-center text-sm text-gray-500 mt-2">
//                       <FiMapPin className="mr-1"/>{car.plateNumber || 'N/A'}
//                     </div>
//                     <div className="bg-gray-50 p-3 rounded-lg my-3">
//                       {/* <div className="flex items-center font-medium text-gray-900 mb-1">
//                         <FiUser className="mr-2"/>{customer.name || 'Unknown Customer'}
//                       </div> */}
//                       <div className="flex items-center text-sm text-gray-600 mb-1">
//                         <FiMail className="mr-1 text-xs"/>{customer.email || 'N/A'}
//                       </div>
//                       <div className="flex items-center text-sm text-gray-600">
//                         <FiPhone className="mr-1 text-xs"/>{customer.contactNumber || customer.phone || 'N/A'}
//                       </div>
//                     </div>
//                     <div className="flex justify-between items-center pt-3 border-t border-gray-200">
//                       <p className="text-lg font-bold text-green-600">PKR {(b.totalPrice || 0).toLocaleString()}</p>
//                       <button 
//                         onClick={() => setSelectedBooking(b)} 
//                         className="flex items-center px-4 py-2 bg-[#C17D3C] text-white rounded-lg  transition-colors"
//                       >
//                         <FiEye className="mr-2"/>View
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}

//         <ShowroomBookingDialog 
//           isOpen={!!selectedBooking} 
//           onClose={() => setSelectedBooking(null)} 
//           booking={selectedBooking} 
//         />
//       </div>
//     </div> </>
//   );
// };

// export default ShowroomBookings;

import axios from "axios";
import ShowroomNavbar from "./showroomNavbar";
import { useEffect, useState } from "react";
import { 
  FiLoader, FiAlertCircle, FiCalendar, FiEye, FiUser, FiDollarSign, 
  FiCheckCircle, FiXCircle, FiMapPin, FiMail, FiPhone, FiDownload, FiExternalLink,
  FiTruck, FiRefreshCw, FiSearch, FiFilter
} from "react-icons/fi";

const Base_Url = import.meta.env.VITE_API_URL;

// Booking Dialog Component (Keep this as is)
const ShowroomBookingDialog = ({ isOpen, onClose, booking }) => {
  if (!isOpen || !booking) return null;

  const car = booking.carDetails || booking.carId || {};
  const customer = booking.customer || booking.userId || {};

  const getStatusColor = (status) => {
    const s = (status || 'upcoming').toLowerCase();
    switch(s){
      case 'active': return 'bg-blue-100 text-blue-800 border border-blue-200';
      case 'completed':
      case 'returned': 
      case 'return initiated': return 'bg-green-100 text-green-800 border border-green-200';
      case 'overdue': return 'bg-red-100 text-red-800 border border-red-200';
      case 'cancelled': return 'bg-gray-100 text-gray-800 border border-gray-200';
      default: return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
    }
  };

  const getPaymentStatusColor = (status) => {
    const s = (status || 'pending').toLowerCase();
    switch(s){
      case 'paid':
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-[#C17D3C] p-6 text-white rounded-t-xl flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold">Your Car Booking Details</h2>
            <p className="text-white text-sm mt-1">Booking ID: {booking._id}</p>
          </div>
          <button onClick={onClose} className="text-white hover:text-gray-200 text-2xl font-bold bg-black bg-opacity-20 rounded-full w-8 h-8 flex items-center justify-center transition-colors">×</button>
        </div>

        <div className="p-6 space-y-6">
          {/* Status & Payment */}
          <div className="flex justify-between flex-wrap gap-4 items-center">
            <div className="flex flex-wrap gap-2">
              <span className={`px-3 py-2 rounded-full text-sm font-semibold ${getStatusColor(booking.status)}`}>
                {(booking.status || 'UPCOMING').toUpperCase()}
              </span>
              <span className={`px-3 py-2 rounded-full text-sm font-semibold ${getPaymentStatusColor(booking.paymentStatus)}`}>
                PAYMENT: {(booking.paymentStatus || 'PENDING').toUpperCase()}
              </span>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold ">PKR {(booking.totalPrice || 0).toLocaleString()}</p>
              <p className="text-sm text-gray-600">Total Amount</p>
            </div>
          </div>

          {/* Car Info & Image */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center text-gray-800">
                <FiTruck className="mr-2 text-blue-600"/>Car Information
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <div className="flex justify-between"><span className="text-gray-600">Car:</span><span className="font-medium">{car.carBrand} {car.carModel}</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Type:</span><span className="font-medium">{car.carType || car.bodyType || 'N/A'}</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Transmission:</span><span className="font-medium">{car.transmission || 'N/A'}</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Plate Number:</span><span className="font-medium">{car.plateNumber || 'N/A'}</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Fuel Type:</span><span className="font-medium">{car.fuelType || 'N/A'}</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Color:</span><span className="font-medium">{car.color || 'N/A'}</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Year:</span><span className="font-medium">{car.year || 'N/A'}</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Daily Rate:</span><span className="font-medium">PKR {car.rentRate || 0}/day</span></div>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Car Image</h3>
              <div className="bg-gray-100 rounded-lg overflow-hidden border">
                <img 
                  src={car.images?.[0] ? `${Base_Url}/uploads/${car.images[0]}` : '/default-car.jpg'} 
                  alt={`${car.carBrand} ${car.carModel}`} 
                  className="w-full h-48 object-cover"
                  onError={e => e.target.src = '/default-car.jpg'}
                />
              </div>
            </div>
          </div>

          {/* Customer Info */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <h3 className="text-lg font-semibold mb-3 flex items-center text-blue-800">
              <FiUser className="mr-2"/>Customer Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div><p className="text-sm text-blue-600">Email</p><p className="font-semibold text-gray-800 flex items-center"><FiMail className="mr-1 text-sm"/>{customer.email || "N/A"}</p></div>
              <div><p className="text-sm text-blue-600">Phone</p><p className="font-semibold text-gray-800 flex items-center"><FiPhone className="mr-1 text-sm"/>{customer.contactNumber || customer.phone || "N/A"}</p></div>
              <div className="md:col-span-2 lg:col-span-3"><p className="text-sm text-blue-600">Address</p><p className="font-semibold text-gray-800">{customer.address || "N/A"}</p></div>
            </div>
          </div>

          {/* Rental Period */}
          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <h3 className="text-lg font-semibold mb-3 flex items-center text-green-800">
              <FiCalendar className="mr-2"/>Rental Period
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-green-600">Start Date & Time</p>
                <p className="font-semibold text-gray-800">{booking.rentalStartDate} at {booking.rentalStartTime || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-green-600">End Date & Time</p>
                <p className="font-semibold text-gray-800">{booking.rentalEndDate} at {booking.rentalEndTime || 'N/A'}</p>
              </div>
            </div>
          </div>

          {/* Overdue Charges */}
          {(booking.overdueHours || 0) > 0 && (
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <h3 className="text-lg font-semibold mb-2 text-red-800">Overdue Charges</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><p className="text-sm text-red-600">Overdue Hours</p><p className="font-semibold text-red-800">{booking.overdueHours} hours</p></div>
                <div><p className="text-sm text-red-600">Overdue Charge</p><p className="font-semibold text-red-800">PKR {(booking.overdueCharge || 0).toLocaleString()}</p></div>
              </div>
            </div>
          )}

          {/* Invoice Buttons */}
          {booking.currentInvoiceUrl && (
            <div className="bg-gray-50 p-4 rounded-lg border">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">Invoice</h3>
              <div className="flex flex-col sm:flex-row gap-3">
                <button 
                  onClick={() => window.open(booking.currentInvoiceUrl, "_blank")}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  <FiExternalLink className="mr-2"/>View Invoice
                </button>
                <button 
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = booking.currentInvoiceUrl;
                    link.download = `invoice-${booking._id}.pdf`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                  className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  <FiDownload className="mr-2"/>Download Invoice
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ---------------- Main Component ----------------
const ShowroomBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [stats, setStats] = useState({
    totalBookings: 0,
    active: 0,
    upcoming: 0,
    completed: 0,
    overdue: 0
    // Removed cancelled from stats
  });

  const calculateBookingStatus = (b) => {
    if (!b.rentalStartDate || !b.rentalEndDate) return b.status || 'unknown';
    
    const now = new Date();
    const start = new Date(b.rentalStartDate);
    const end = new Date(b.rentalEndDate);
    
    if (b.status === 'returned' || b.status === 'completed' || b.status === 'return initiated') return 'completed';
    if (b.status === 'cancelled') return 'cancelled';
    if (now > end) return 'overdue';
    if (now >= start && now <= end) return 'active';
    if (now < start) return 'upcoming';
    
    return b.status || 'upcoming';
  };

  const fetchShowroomBookings = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${Base_Url}/api/bookcar/showroom/bookings`, { 
        withCredentials: true, 
        timeout: 10000 
      });
      
      console.log("API Response:", res.data); // Debug log
      
      if (!res.data?.success) {
        throw new Error(res.data?.message || "Failed to fetch bookings");
      }
      
      // FIX: Use res.data.bookings instead of res.data.data
      const data = Array.isArray(res.data.bookings) ? res.data.bookings : [];
      console.log("Processed bookings data:", data); // Debug log
      
      setBookings(data);

      const statsObj = {
        totalBookings: data.length,
        active: data.filter(b => calculateBookingStatus(b) === 'active').length,
        upcoming: data.filter(b => calculateBookingStatus(b) === 'upcoming').length,
        completed: data.filter(b => calculateBookingStatus(b) === 'completed').length,
        overdue: data.filter(b => calculateBookingStatus(b) === 'overdue').length
        // Removed cancelled from stats calculation
      };
      setStats(statsObj);
    } catch(err) {
      console.error("Error fetching bookings:", err);
      setError(err.response?.data?.message || err.message || "Failed to fetch showroom bookings");
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    fetchShowroomBookings(); 
  }, []);

  const filteredBookings = bookings.filter(b => {
    const searchLower = searchTerm.toLowerCase();
    const car = b.carDetails || b.carId || {};
    const customer = b.customer || b.userId || {};
    
    const matchesSearch = 
      customer.name?.toLowerCase().includes(searchLower) ||
      customer.email?.toLowerCase().includes(searchLower) ||
      customer.contactNumber?.toLowerCase().includes(searchLower) ||
      car.carBrand?.toLowerCase().includes(searchLower) ||
      car.carModel?.toLowerCase().includes(searchLower) ||
      car.plateNumber?.toLowerCase().includes(searchLower) ||
      b._id?.toLowerCase().includes(searchLower);

    const matchesStatus = filter === "all" || calculateBookingStatus(b) === filter;
    return matchesSearch && matchesStatus;
  });

  const clearFilters = () => { setSearchTerm(""); setFilter("all"); };
  const isFilterActive = searchTerm || filter !== "all";

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center flex-col bg-gray-50">
      <FiLoader className="animate-spin text-4xl text-blue-600 mb-4"/>
      <span className="text-lg text-gray-600">Loading your showroom bookings...</span>
    </div>
  );

  return (
    <> 
      <ShowroomNavbar/>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header & Refresh */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Your Showroom Bookings</h1>
              <p className="text-gray-600 mt-1">Manage bookings for your showroom cars only</p>
            </div>
            <button onClick={fetchShowroomBookings} className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <FiRefreshCw className="mr-2"/>Refresh
            </button>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              <div className="flex items-center">
                <FiAlertCircle className="mr-2 flex-shrink-0"/>
                <div>
                  <p className="font-medium">Request failed</p>
                  <p className="text-sm mt-1">{error}</p>
                  <button onClick={fetchShowroomBookings} className="mt-2 px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200 transition-colors">
                    Try Again
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Stats */}
          <div className="bg-white shadow rounded-xl p-6 mb-6">
            <h2 className="text-2xl font-bold text-[#394A9A] mb-6">Showroom Bookings Overview</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
              {Object.entries(stats).map(([key, value]) => (
                <div key={key} className={`cursor-pointer p-4 rounded-lg shadow text-center transition-all ${
                  key==='active'?'bg-green-100 text-green-800 hover:bg-green-200':
                  key==='upcoming'?'bg-yellow-100 text-yellow-800 hover:bg-yellow-200':
                  key==='completed'?'bg-purple-100 text-purple-800 hover:bg-purple-200':
                  key==='overdue'?'bg-red-100 text-red-800 hover:bg-red-200':
                  'bg-blue-100 text-blue-800 hover:bg-blue-200'
                }`}>
                  <h3 className="text-lg font-semibold capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</h3>
                  <p className="text-2xl font-bold">{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow mb-6 p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input 
                  type="text" 
                  placeholder="Search by customer, car, plate number..." 
                  value={searchTerm} 
                  onChange={e => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="sm:w-48 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiFilter className="h-5 w-5 text-gray-400" />
                </div>
                <select 
                  value={filter} 
                  onChange={e => setFilter(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="completed">Completed</option>
                  <option value="overdue">Overdue</option>
                  {/* Removed cancelled option */}
                </select>
              </div>

              {isFilterActive && (
                <div className="sm:w-auto">
                  <button onClick={clearFilters} className="w-full sm:w-auto px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors">
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Bookings Grid */}
          {filteredBookings.length === 0 ? (
            <div className="text-center p-8 bg-white rounded-lg shadow">
              <FiAlertCircle className="mx-auto h-16 w-16 text-gray-400" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                {bookings.length === 0 ? "No bookings for your cars" : "No matching bookings"}
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                {bookings.length === 0 ? "No customers have booked your showroom cars yet." : "Try adjusting your search or filter to find what you're looking for."}
              </p>
              {isFilterActive && bookings.length > 0 && (
                <button onClick={clearFilters} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                  Clear Filters
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBookings.map(b => {
                const car = b.carDetails || b.carId || {};
                const customer = b.customer || b.userId || {};
                const status = calculateBookingStatus(b);

                return (
                  <div key={b._id} className="bg-white rounded-xl shadow-md border hover:shadow-lg transition-all overflow-hidden">
                    <div className="relative">
                      <img 
                        src={car.images?.[0] ? `${Base_Url}/uploads/${car.images[0]}` : '/default-car.jpg'} 
                        alt={`${car.carBrand} ${car.carModel}`} 
                        className="w-full h-48 object-cover" 
                        onError={e => e.target.src='/default-car.jpg'} 
                      />
                      <div className="absolute top-3 right-3 flex flex-col gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          status==='active'?'bg-blue-100 text-blue-800':
                          status==='completed'?'bg-green-100 text-green-800':
                          status==='overdue'?'bg-red-100 text-red-800':
                          status==='cancelled'?'bg-gray-100 text-gray-800':
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {status.toUpperCase()}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          (b.paymentStatus==='paid'||b.paymentStatus==='confirmed')?'bg-green-100 text-green-800':'bg-yellow-100 text-yellow-800'
                        }`}>
                          {(b.paymentStatus || 'PENDING').toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg text-gray-900">{car.carBrand} {car.carModel}</h3>
                      <div className="flex justify-between text-sm text-gray-600 mt-1">
                        <span>{car.bodyType || car.carType} • {car.transmission}</span>
                        <span className="font-semibold">PKR {car.rentRate}/day</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 mt-2">
                        <FiMapPin className="mr-1"/>{car.plateNumber || 'N/A'}
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg my-3">
                        <div className="flex items-center text-sm text-gray-600 mb-1">
                          <FiMail className="mr-1 text-xs"/>{customer.email || 'N/A'}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <FiPhone className="mr-1 text-xs"/>{customer.contactNumber || customer.phone || 'N/A'}
                        </div>
                      </div>
                      <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                        <p className="text-lg font-bold text-green-600">PKR {(b.totalPrice || 0).toLocaleString()}</p>
                        <button 
                          onClick={() => setSelectedBooking(b)} 
                          className="flex items-center px-4 py-2 bg-[#C17D3C] text-white rounded-lg transition-colors"
                        >
                          <FiEye className="mr-2"/>View
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <ShowroomBookingDialog 
            isOpen={!!selectedBooking} 
            onClose={() => setSelectedBooking(null)} 
            booking={selectedBooking} 
          />
        </div>
      </div> 
    </>
  );
};

export default ShowroomBookings;