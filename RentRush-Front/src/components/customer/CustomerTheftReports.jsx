

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { ShieldAlert, AlertTriangle, User, CreditCard } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "./Navbar";
// import Footer from "./Footer";

// function CustomerTheftReports() {
//   const [reports, setReports] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [userInfo, setUserInfo] = useState(null);
//   const navigate = useNavigate();

//   const Base_Url = import.meta.env.VITE_API_URL;

//   useEffect(() => {
//     fetchUserInfo();
//   }, []);

//   const fetchUserInfo = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(`${Base_Url}/api/getuser`, {
//         withCredentials: true,
//       });

//       if (res.data && res.data.userdata) {
//         const userData = res.data.userdata;
//         setUserInfo({
//           name: userData.ownerName || userData.name,
//           cnic: userData.cnic
//         });
        
//         sessionStorage.setItem("name", userData.ownerName || userData.name);
//         sessionStorage.setItem("cnic", userData.cnic);
        
//         fetchMyTheftReports(userData.ownerName || userData.name, userData.cnic);
//       } else {
//         setError("User data not found. Please login again.");
//       }
//     } catch (err) {
//       console.error("Error fetching user info:", err);
//       setError("Failed to load user information. Please login again.");
//     }
//   };

//   const fetchMyTheftReports = async (customerName, cnic) => {
//     try {
//       if (!customerName || !cnic) {
//         setError("User information incomplete. Please login again.");
//         return;
//       }

//       const res = await axios.get(`${Base_Url}/api/theft-report/customer`, {
//         params: { 
//           customerName: customerName,
//           cnic: cnic 
//         },
//         withCredentials: true,
//       });
      
//       setReports(res.data.data || []);
      
//     } catch (err) {
//       console.error("Error fetching theft reports:", err);
      
//       if (err.response?.status === 404 || err.response?.status === 400) {
//         try {
//           const allRes = await axios.get(`${Base_Url}/api/theft-report`, {
//             withCredentials: true,
//           });
          
//           const customerReports = (allRes.data.data || []).filter(
//             report => report.customerName === customerName && report.cnic === cnic
//           );
          
//           setReports(customerReports);
//         } catch (fallbackErr) {
//           console.error("Fallback also failed:", fallbackErr);
//           setError("No theft reports found for your account.");
//         }
//       } else {
//         setError("Failed to load your theft reports. Please try again.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleTryAgain = () => {
//     setError(null);
//     fetchUserInfo();
//   };

//   const handleLoginRedirect = () => {
//     navigate("/login");
//   };

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Navbar />
      
//       <main className="flex-grow bg-gray-50 py-8">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-3">
//                 <ShieldAlert className="text-red-600" size={28} />
//                 <div>
//                   <h1 className="text-2xl font-bold text-gray-800">My Theft Reports</h1>
//                   <p className="text-gray-600 mt-1">View all the theft reports you have submitted</p>
//                 </div>
//               </div>
              
//               {reports.length > 0 && (
//                 <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
//                   {reports.length} Report{reports.length !== 1 ? 's' : ''}
//                 </div>
//               )}
//             </div>
//           </div>

//           {loading && (
//             <div className="text-center py-12">
//               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
//               <p className="text-gray-600 text-lg">Loading your theft reports...</p>
//             </div>
//           )}

//           {error && !loading && (
//             <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
//               <AlertTriangle className="mx-auto text-red-500 mb-3" size={32} />
//               <p className="text-red-600 font-medium text-lg mb-4">{error}</p>
//               <div className="flex gap-3 justify-center">
//                 <button 
//                   onClick={handleTryAgain}
//                   className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
//                 >
//                   Try Again
//                 </button>
//                 <button 
//                   onClick={handleLoginRedirect}
//                   className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
//                 >
//                   Go to Login
//                 </button>
//               </div>
//             </div>
//           )}

//           {!loading && !error && reports.length === 0 && (
//             <div className="bg-white border border-green-200 rounded-lg p-8 text-center">
//               <ShieldAlert className="mx-auto text-green-500 mb-4" size={48} />
//               <p className="text-green-600 text-lg font-medium mb-2">No theft reports found</p>
//               <p className="text-green-500 mb-4">You haven't submitted any theft reports yet.</p>
//               <p className="text-gray-500 text-sm">Use the SOS button to report a stolen vehicle from your active bookings.</p>
//             </div>
//           )}

//           {!loading && !error && reports.length > 0 && (
//             <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
//               <div className="p-4 border-b border-gray-200">
//                 <p className="text-gray-600">
//                   Showing <span className="font-semibold">{reports.length}</span> theft 
//                   report{reports.length !== 1 ? 's' : ''} submitted by you
//                 </p>
//               </div>

//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <thead>
//                     <tr className="bg-gray-50 text-gray-700">
//                       <th className="border-b p-4 text-left font-semibold">Car Name</th>
//                       <th className="border-b p-4 text-left font-semibold">Plate Number</th>
//                       <th className="border-b p-4 text-left font-semibold">Showroom</th>
//                       <th className="border-b p-4 text-left font-semibold">Start Date</th>
//                       <th className="border-b p-4 text-left font-semibold">End Date</th>
//                       <th className="border-b p-4 text-left font-semibold">Report Date</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {reports.map((report) => (
//                       <tr key={report._id} className="hover:bg-gray-50 transition-colors">
//                         <td className="border-b p-4">
//                           <div className="flex items-center gap-2">
//                             <ShieldAlert className="text-red-500" size={16} />
//                             <span className="font-medium text-gray-800">
//                               {report.rentalDetails?.carName || "Unknown Vehicle"}
//                             </span>
//                           </div>
//                         </td>
//                         <td className="border-b p-4">
//                           <span className="font-mono text-gray-700">
//                             {report.rentalDetails?.plateNumber || "N/A"}
//                           </span>
//                         </td>
//                         <td className="border-b p-4 text-gray-600">
//                           {report.rentalDetails?.showroomName || "Unknown Showroom"}
//                         </td>
//                         <td className="border-b p-4 text-gray-600">
//                           {new Date(report.rentalDetails?.rentalStartDate).toLocaleDateString()}
//                         </td>
//                         <td className="border-b p-4 text-gray-600">
//                           {new Date(report.rentalDetails?.rentalEndDate).toLocaleDateString()}
//                         </td>
//                         <td className="border-b p-4 text-gray-600">
//                           {new Date(report.createdAt || report.reportDate).toLocaleString()}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>

//               <div className="p-4 border-t border-gray-200 bg-gray-50">
//                 <p className="text-gray-500 text-sm">
//                   All theft reports are immediately forwarded to the respective showrooms for investigation.
//                 </p>
//               </div>
//             </div>
//           )}
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// }

// export default CustomerTheftReports;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { ShieldAlert, AlertTriangle, Calendar, MapPin, Car, User, Clock, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function CustomerTheftReports() {
  const [reports, setReports] = useState([]);
  const [bookingsWithTheftReports, setBookingsWithTheftReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  const Base_Url = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${Base_Url}/api/getuser`, {
        withCredentials: true,
      });

      if (res.data && res.data.userdata) {
        const userData = res.data.userdata;
        setUserInfo({
          name: userData.ownerName || userData.name,
          cnic: userData.cnic
        });
        
        sessionStorage.setItem("name", userData.ownerName || userData.name);
        sessionStorage.setItem("cnic", userData.cnic);
        
        await fetchMyTheftReports(userData.ownerName || userData.name, userData.cnic);
      } else {
        setError("User data not found. Please login again.");
      }
    } catch (err) {
      console.error("Error fetching user info:", err);
      setError("Failed to load user information. Please login again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchMyTheftReports = async (customerName, cnic) => {
    try {
      if (!customerName || !cnic) {
        setError("User information incomplete. Please login again.");
        return;
      }

      const res = await axios.get(`${Base_Url}/api/theft-report/customer`, {
        params: { 
          customerName: customerName,
          cnic: cnic 
        },
        withCredentials: true,
      });
      
      const theftReports = res.data.data || [];
      setReports(theftReports);
      
      // Fetch bookings for these theft reports
      if (theftReports.length > 0) {
        await fetchBookingsForTheftReports(theftReports);
      }
      
    } catch (err) {
      console.error("Error fetching theft reports:", err);
      
      if (err.response?.status === 404 || err.response?.status === 400) {
        try {
          const allRes = await axios.get(`${Base_Url}/api/theft-report`, {
            withCredentials: true,
          });
          
          const customerReports = (allRes.data.data || []).filter(
            report => report.customerName === customerName && report.cnic === cnic
          );
          
          setReports(customerReports);
          
          if (customerReports.length > 0) {
            await fetchBookingsForTheftReports(customerReports);
          }
        } catch (fallbackErr) {
          console.error("Fallback also failed:", fallbackErr);
          setError("No theft reports found for your account.");
        }
      } else {
        setError("Failed to load your theft reports. Please try again.");
      }
    }
  };

  const fetchBookingsForTheftReports = async (theftReports) => {
    try {
      // First, get all bookings to match with theft reports
      const bookingsRes = await axios.get(`${Base_Url}/api/bookcar/my-bookings`, {
        withCredentials: true,
      });

      const allBookings = bookingsRes.data || [];
      
      // Filter bookings that have theft reports
      const bookingsWithReports = allBookings.filter(booking => {
        // Match by car name and showroom name from theft report
        return theftReports.some(report => {
          const reportCarName = report.rentalDetails?.carName?.toLowerCase();
          const reportShowroomName = report.rentalDetails?.showroomName?.toLowerCase();
          
          const bookingCarName = getCarDetails(booking).fullName.toLowerCase();
          const bookingShowroomName = getShowroomDetails(booking).toLowerCase();
          
          return reportCarName === bookingCarName && reportShowroomName === bookingShowroomName;
        });
      });

      setBookingsWithTheftReports(bookingsWithReports);
      
    } catch (err) {
      console.error("Failed to load bookings:", err);
      // Continue with empty array if bookings fail to load
      setBookingsWithTheftReports([]);
    }
  };

  const getCarDetails = (booking) => {
    const carBrand = booking.carDetails?.carBrand || booking.car?.carBrand || booking.carName || "Unknown";
    const carModel = booking.carDetails?.carModel || booking.car?.carModel || "";
    const plateNumber = booking.carDetails?.plateNumber || booking.car?.plateNumber || "N/A";
    
    return {
      fullName: `${carBrand} ${carModel}`.trim(),
      plateNumber: plateNumber,
      brand: carBrand,
      model: carModel
    };
  };

  const getShowroomDetails = (booking) => {
    return booking.showroomDetails?.showroomName || booking.showroom?.name || "Unknown Showroom";
  };

  const getTheftReportForBooking = (booking) => {
    const carDetails = getCarDetails(booking);
    const showroomName = getShowroomDetails(booking);
    
    return reports.find(report => {
      const reportCarName = report.rentalDetails?.carName?.toLowerCase();
      const reportShowroomName = report.rentalDetails?.showroomName?.toLowerCase();
      
      const bookingCarName = carDetails.fullName.toLowerCase();
      const bookingShowroomName = showroomName.toLowerCase();
      
      return reportCarName === bookingCarName && reportShowroomName === bookingShowroomName;
    });
  };

  const getBookingStatus = (booking) => {
    const now = new Date();
    const start = new Date(`${booking.rentalStartDate} ${booking.rentalStartTime}`);
    const end = new Date(`${booking.rentalEndDate} ${booking.rentalEndTime}`);

    if (now < start) return "upcoming";
    if (now >= start && now <= end) return "active";
    if (now > end) return "completed";
    return "unknown";
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "upcoming": return "bg-blue-100 text-blue-800";
      case "completed": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "active": return "Active";
      case "upcoming": return "Upcoming";
      case "completed": return "Completed";
      default: return "Unknown";
    }
  };

  const handleTryAgain = () => {
    setError(null);
    fetchUserInfo();
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShieldAlert className="text-red-600" size={28} />
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">Theft Report Bookings</h1>
                  <p className="text-gray-600 mt-1">Booking details for vehicles with theft reports</p>
                </div>
              </div>
              
              <div className="flex gap-2">
                {reports.length > 0 && (
                  <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                    {reports.length} Theft Report{reports.length !== 1 ? 's' : ''}
                  </div>
                )}
                {bookingsWithTheftReports.length > 0 && (
                  <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {bookingsWithTheftReports.length} Booking{bookingsWithTheftReports.length !== 1 ? 's' : ''}
                  </div>
                )}
              </div>
            </div>
          </div>

          {loading && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
              <p className="text-gray-600 text-lg">Loading your theft report bookings...</p>
            </div>
          )}

          {error && !loading && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <AlertTriangle className="mx-auto text-red-500 mb-3" size={32} />
              <p className="text-red-600 font-medium text-lg mb-4">{error}</p>
              <div className="flex gap-3 justify-center">
                <button 
                  onClick={handleTryAgain}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Try Again
                </button>
                <button 
                  onClick={handleLoginRedirect}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Go to Login
                </button>
              </div>
            </div>
          )}

          {!loading && !error && reports.length === 0 && (
            <div className="bg-white border border-green-200 rounded-lg p-8 text-center">
              <ShieldAlert className="mx-auto text-green-500 mb-4" size={48} />
              <p className="text-green-600 text-lg font-medium mb-2">No theft reports found</p>
              <p className="text-green-500 mb-4">You haven't submitted any theft reports yet.</p>
              <p className="text-gray-500 text-sm">Use the SOS button to report a stolen vehicle from your active bookings.</p>
            </div>
          )}

          {!loading && !error && reports.length > 0 && bookingsWithTheftReports.length === 0 && (
            <div className="bg-white border border-yellow-200 rounded-lg p-8 text-center">
              <FileText className="mx-auto text-yellow-500 mb-4" size={48} />
              <p className="text-yellow-600 text-lg font-medium mb-2">No matching bookings found</p>
              <p className="text-yellow-500 mb-4">We found theft reports but couldn't match them with your bookings.</p>
              <p className="text-gray-500 text-sm">This might happen if booking records have been updated or removed.</p>
            </div>
          )}

          {!loading && !error && bookingsWithTheftReports.length > 0 && (
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="text-blue-600" size={20} />
                  <p className="text-blue-700 text-sm">
                    Showing <span className="font-semibold">{bookingsWithTheftReports.length}</span> booking(s) 
                    that have theft reports submitted.
                  </p>
                </div>
              </div>

              {bookingsWithTheftReports.map((booking) => {
                const status = getBookingStatus(booking);
                const carDetails = getCarDetails(booking);
                const showroomName = getShowroomDetails(booking);
                const theftReport = getTheftReportForBooking(booking);
                
                return (
                  <div key={booking._id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    {/* Theft Report Badge */}
                    <div className="flex items-center gap-2 mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <ShieldAlert className="text-red-600" size={20} />
                      <div>
                        <p className="text-red-700 font-medium">Theft Report Submitted</p>
                        <p className="text-red-600 text-sm">
                          Reported on: {theftReport ? new Date(theftReport.createdAt || theftReport.reportDate).toLocaleString() : "N/A"}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      {/* Car and Showroom Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <Car className="text-blue-600" size={24} />
                          <div>
                            <h3 className="text-xl font-bold text-gray-800">
                              {carDetails.fullName}
                            </h3>
                            <p className="text-gray-600 flex items-center gap-1 mt-1">
                              <MapPin size={16} />
                              {showroomName}
                            </p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-500">Plate Number:</span>
                            <span className="font-mono bg-gray-100 px-2 py-1 rounded border">
                              {carDetails.plateNumber}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-500">Booking ID:</span>
                            <span className="font-mono text-gray-700">
                              {booking._id?.slice(-8) || "N/A"}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock size={16} className="text-gray-400" />
                            <span className="font-medium text-gray-500">Start:</span>
                            <span className="text-gray-700">
                              {booking.rentalStartDate} at {booking.rentalStartTime}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock size={16} className="text-gray-400" />
                            <span className="font-medium text-gray-500">End:</span>
                            <span className="text-gray-700">
                              {booking.rentalEndDate} at {booking.rentalEndTime}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Status and Price */}
                      <div className="flex flex-col items-end gap-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(status)}`}>
                          {getStatusText(status)}
                        </span>
                        
                        {/* <div className="text-right">
                          <p className="text-2xl font-bold text-blue-600">
                            {booking.totalAmount || booking.rentRate || "N/A"} Rs
                          </p>
                          <p className="text-sm text-gray-500">
                            {booking.paymentStatus === "paid" ? "Paid" : "Payment Pending"}
                          </p>
                        </div> */}
                      </div>
                    </div>

                    {/* Additional Info */}
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <User size={16} />
                          <span>Booked by: {userInfo?.name || "You"}</span>
                        </div>
                        <div>
                          <span>Booked on: {new Date(booking.createdAt || booking.bookingDate).toLocaleDateString()}</span>
                        </div>
                        {booking.carDetails?.fuelType && (
                          <div>
                            <span>Fuel: {booking.carDetails.fuelType}</span>
                          </div>
                        )}
                        {booking.carDetails?.transmission && (
                          <div>
                            <span>Transmission: {booking.carDetails.transmission}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default CustomerTheftReports;