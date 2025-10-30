// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import ShowroomNavbar from "./showroomNavbar.jsx"; 
// // import Footer from "../Footer.jsx";

// // function TheftReports() {
// //   const [reports, setReports] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState(null);

// //   const Base_Url = import.meta.env.VITE_API_URL;

// //   useEffect(() => {
// //     fetchShowroomReports();
// //   }, []);

// //   const fetchShowroomReports = async () => {
// //     try {
// //       setLoading(true);
// //       const showroomName = sessionStorage.getItem("showroomName");
      
// //       if (!showroomName) {
// //         setError("Showroom name not found");
// //         return;
// //       }

// //       const res = await axios.get(`${Base_Url}/api/theft-report/showroom`, {
// //         params: { showroomName },
// //         withCredentials: true,
// //       });
      
// //       setReports(res.data.data || []);
// //     } catch (err) {
// //       console.error("Error fetching theft reports:", err);
// //       setError("Failed to load theft reports");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen flex flex-col">
// //       <ShowroomNavbar />
      
// //       <main className="flex-grow p-6 bg-gray-50">
// //         <div className="max-w-7xl mx-auto">
// //           <h2 className="text-2xl font-bold mb-6 text-[#C17D3C]">
// //              Theft Reports - My Showroom
// //           </h2>

// //           {loading ? (
// //             <div className="flex justify-center items-center py-12">
// //               <p className="text-gray-600 text-lg">Loading theft reports...</p>
// //             </div>
// //           ) : error ? (
// //             <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
// //               <p className="text-red-600 font-medium">{error}</p>
// //             </div>
// //           ) : reports.length === 0 ? (
// //             <div className="bg-white border border-green-200 rounded-lg p-8 text-center shadow-sm">
// //               <div className="text-6xl mb-4">✅</div>
// //               <p className="text-green-600 text-lg font-medium mb-2">
// //                 No theft reports found for your showroom
// //               </p>
// //               <p className="text-green-500">
// //                 All vehicles are safe and accounted for!
// //               </p>
// //             </div>
// //           ) : (
// //             <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
// //               <div className="p-4 border-b border-gray-200">
// //                 <p className="text-gray-600">
// //                   Showing <span className="font-semibold">{reports.length}</span> theft 
// //                   report{reports.length !== 1 ? 's' : ''} for your showroom
// //                 </p>
// //               </div>
// //               <div className="overflow-x-auto">
// //                 <table className="w-full">
// //                   <thead>
// //                     <tr className="bg-gray-50 text-gray-700">
// //                       <th className="border-b p-4 text-left font-bold">Customer Name</th>
// //                       <th className="border-b p-4 text-left font-bold">CNIC</th>
// //                       <th className="border-b p-4 text-left font-bold">Car Name</th>
// //                       <th className="border-b p-4 text-left font-bold">Plate Number</th>
// //                       <th className="border-b p-4 text-left font-bold">Start Date</th>
// //                       <th className="border-b p-4 text-left font-bold">End Date</th>
// //                       <th className="border-b p-4 text-left font-bold">Showroom</th>
// //                       <th className="border-b p-4 text-left font-bold">Report Date</th>
// //                     </tr>
// //                   </thead>
// //                   <tbody>
// //                     {reports.map((report) => (
// //                       <tr key={report._id} className="hover:bg-gray-50 transition-colors">
// //                         <td className="border-b p-4">{report.customerName}</td>
// //                         <td className="border-b p-4 font-mono">{report.cnic}</td>
// //                         <td className="border-b p-4 font-mono">{report.rentalDetails?.carName}</td>
// //                         <td className="border-b p-4 font-mono">
// //                           {report.rentalDetails?.plateNumber || "N/A"}
// //                         </td>
// //                         <td className="border-b p-4">
// //                           {new Date(report.rentalDetails?.rentalStartDate).toLocaleDateString()}
// //                         </td>
// //                         <td className="border-b p-4">
// //                           {new Date(report.rentalDetails?.rentalEndDate).toLocaleDateString()}
// //                         </td>
// //                         <td className="border-b p-4">{report.rentalDetails?.showroomName}</td>
// //                         <td className="border-b p-4 text-red-500 font-medium">
// //                           {new Date(report.reportDate).toLocaleString()}
// //                         </td>
// //                       </tr>
// //                     ))}
// //                   </tbody>
// //                 </table>
// //               </div>
// //             </div>
// //           )}
// //         </div>
// //       </main>

// //       <Footer />
// //     </div>
// //   );
// // }

// // export default TheftReports;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import ShowroomNavbar from "./showroomNavbar.jsx"; 
// import Footer from "../Footer.jsx";

// function TheftReports() {
//   const [reports, setReports] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const Base_Url = import.meta.env.VITE_API_URL;

//   useEffect(() => {
//     fetchShowroomReports();
//   }, []);

//   const fetchShowroomReports = async () => {
//     try {
//       setLoading(true);
      
//       // No need to pass showroomName - backend handles it automatically via auth token
//       const res = await axios.get(`${Base_Url}/api/theft-report/showroom`, {
//         withCredentials: true, // This sends the auth token automatically
//       });
      
//       setReports(res.data.data || []);
//     } catch (err) {
//       console.error("Error fetching theft reports:", err);
//       setError("Failed to load theft reports");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col">
//       <ShowroomNavbar />
      
//       <main className="flex-grow p-6 bg-gray-50">
//         <div className="max-w-7xl mx-auto">
//           <h2 className="text-2xl font-bold mb-6 text-[#C17D3C]">
//             🚨 Theft Reports - My Showroom
//           </h2>

//           {loading ? (
//             <div className="flex justify-center items-center py-12">
//               <p className="text-gray-600 text-lg">Loading theft reports...</p>
//             </div>
//           ) : error ? (
//             <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
//               <p className="text-red-600 font-medium">{error}</p>
//               <button 
//                 onClick={fetchShowroomReports}
//                 className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
//               >
//                 Try Again
//               </button>
//             </div>
//           ) : reports.length === 0 ? (
//             <div className="bg-white border border-green-200 rounded-lg p-8 text-center shadow-sm">
//               <div className="text-6xl mb-4">✅</div>
//               <p className="text-green-600 text-lg font-medium mb-2">
//                 No theft reports found for your showroom
//               </p>
//               <p className="text-green-500">
//                 All vehicles are safe and accounted for!
//               </p>
//             </div>
//           ) : (
//             <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
//               <div className="p-4 border-b border-gray-200">
//                 <p className="text-gray-600">
//                   Showing <span className="font-semibold">{reports.length}</span> theft 
//                   report{reports.length !== 1 ? 's' : ''} for your showroom
//                 </p>
//               </div>
//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <thead>
//                     <tr className="bg-gray-50 text-gray-700">
//                       <th className="border-b p-4 text-left font-semibold">Customer Name</th>
//                       <th className="border-b p-4 text-left font-semibold">CNIC</th>
//                       <th className="border-b p-4 text-left font-semibold">Car Name</th>
//                       <th className="border-b p-4 text-left font-semibold">Plate Number</th>
//                       <th className="border-b p-4 text-left font-semibold">Start Date</th>
//                       <th className="border-b p-4 text-left font-semibold">End Date</th>
//                       <th className="border-b p-4 text-left font-semibold">Report Date</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {reports.map((report) => (
//                       <tr key={report._id} className="hover:bg-gray-50 transition-colors">
//                         <td className="border-b p-4 font-medium">{report.customerName}</td>
//                         <td className="border-b p-4 font-mono">{report.cnic}</td>
//                         <td className="border-b p-4 text-red-600 font-semibold">
//                           {report.rentalDetails?.carName}
//                         </td>
//                         <td className="border-b p-4 font-mono">
//                           {report.rentalDetails?.plateNumber || "N/A"}
//                         </td>
//                         <td className="border-b p-4">
//                           {new Date(report.rentalDetails?.rentalStartDate).toLocaleDateString()}
//                         </td>
//                         <td className="border-b p-4">
//                           {new Date(report.rentalDetails?.rentalEndDate).toLocaleDateString()}
//                         </td>
//                         <td className="border-b p-4 text-red-500 font-medium">
//                           {new Date(report.createdAt || report.reportDate).toLocaleString()}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           )}
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// }

// export default TheftReports;

import React, { useEffect, useState } from "react";
import axios from "axios";
import ShowroomNavbar from "./showroomNavbar.jsx"; 
import Footer from "../Footer.jsx";
import { ShieldAlert, AlertTriangle, Calendar, MapPin, Car, User, Clock, FileText } from "lucide-react";

function TheftReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showroomInfo, setShowroomInfo] = useState(null);

  const Base_Url = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchShowroomReports();
  }, []);

  const fetchShowroomReports = async () => {
    try {
      setLoading(true);
      
      // Fetch theft reports
      const res = await axios.get(`${Base_Url}/api/theft-report/showroom`, {
        withCredentials: true,
      });
      
      const theftReports = res.data.data || [];
      setReports(theftReports);
      
      // Fetch showroom info
      await fetchShowroomInfo();
      
    } catch (err) {
      console.error("Error fetching theft reports:", err);
      setError("Failed to load theft reports");
    } finally {
      setLoading(false);
    }
  };

  const fetchShowroomInfo = async () => {
    try {
      const res = await axios.get(`${Base_Url}/api/getuser`, {
        withCredentials: true,
      });

      if (res.data && res.data.userdata) {
        setShowroomInfo({
          name: res.data.userdata.showroomName,
          address: res.data.userdata.address
        });
      }
    } catch (err) {
      console.error("Error fetching showroom info:", err);
    }
  };

  const getBookingStatus = (report) => {
    if (!report.rentalDetails?.rentalStartDate || !report.rentalDetails?.rentalEndDate) return "unknown";
    
    const now = new Date();
    const start = new Date(report.rentalDetails.rentalStartDate);
    const end = new Date(report.rentalDetails.rentalEndDate);

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

  return (
    <div className="min-h-screen flex flex-col">
      <ShowroomNavbar />
      
      <main className="flex-grow p-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
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
              
              {reports.length > 0 && (
                <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                  {reports.length} Theft Report{reports.length !== 1 ? 's' : ''}
                </div>
              )}
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
              <p className="text-gray-600 text-lg">Loading theft report bookings...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <AlertTriangle className="mx-auto text-red-500 mb-3" size={32} />
              <p className="text-red-600 font-medium text-lg mb-4">{error}</p>
              <button 
                onClick={fetchShowroomReports}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : reports.length === 0 ? (
            <div className="bg-white border border-green-200 rounded-lg p-8 text-center shadow-sm">
              <div className="text-6xl mb-4">✅</div>
              <p className="text-green-600 text-lg font-medium mb-2">
                No theft reports found for your showroom
              </p>
              <p className="text-green-500">
                All vehicles are safe and accounted for!
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="text-blue-600" size={20} />
                  <p className="text-blue-700 text-sm">
                    Showing <span className="font-semibold">{reports.length}</span> theft 
                    report{reports.length !== 1 ? 's' : ''} for your showroom
                  </p>
                </div>
              </div>

              {reports.map((report) => {
                const status = getBookingStatus(report);
                const rentalDetails = report.rentalDetails || {};
                
                return (
                  <div key={report._id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    {/* Theft Report Badge */}
                    <div className="flex items-center gap-2 mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <ShieldAlert className="text-red-600" size={20} />
                      <div>
                        <p className="text-red-700 font-medium">🚨 THEFT REPORT SUBMITTED</p>
                        <p className="text-red-600 text-sm">
                          Reported on: {new Date(report.createdAt || report.reportDate).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      {/* Car and Customer Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <Car className="text-blue-600" size={24} />
                          <div>
                            <h3 className="text-xl font-bold text-gray-800">
                              {rentalDetails.carName || "Unknown Vehicle"}
                            </h3>
                            <p className="text-gray-600 flex items-center gap-1 mt-1">
                              <MapPin size={16} />
                              {showroomInfo?.name || "Your Showroom"}
                            </p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            {/* <span className="font-medium text-gray-500">Plate Number:</span>
                            <span className="font-mono bg-gray-100 px-2 py-1 rounded border">
                              {rentalDetails.plateNumber || "N/A"}
                            </span> */}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-500">Report ID:</span>
                            <span className="font-mono text-gray-700">
                              {report._id?.slice(-8) || "N/A"}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <User size={16} className="text-gray-400" />
                            <span className="font-medium text-gray-500">Customer:</span>
                            <span className="text-gray-700">{report.customerName}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-500">CNIC:</span>
                            <span className="font-mono text-gray-700">{report.cnic}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock size={16} className="text-gray-400" />
                            <span className="font-medium text-gray-500">Rental Start:</span>
                            <span className="text-gray-700">
                              {rentalDetails.rentalStartDate}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock size={16} className="text-gray-400" />
                            <span className="font-medium text-gray-500">Rental End:</span>
                            <span className="text-gray-700">
                              {rentalDetails.rentalEndDate}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Status and Emergency Info */}
                      <div className="flex flex-col items-end gap-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(status)}`}>
                          {getStatusText(status)}
                        </span>
                        
                        <div className="text-right">
                          <p className="text-lg font-bold text-red-600">
                            🚨 EMERGENCY
                          </p>
                          <p className="text-sm text-gray-500">
                            Vehicle Reported Stolen
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Additional Info */}
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar size={16} />
                          <span>Report Submitted: {new Date(report.createdAt || report.reportDate).toLocaleString()}</span>
                        </div>
                        <div>
                          <span>Showroom: {rentalDetails.showroomName || showroomInfo?.name || "Your Showroom"}</span>
                        </div>
                        {report.bookingId && (
                          <div>
                            <span>Booking ID: {report.bookingId.slice(-8)}</span>
                          </div>
                        )}
                        {report.carId && (
                          <div>
                            <span>Car ID: {report.carId.slice(-8)}</span>
                          </div>
                        )}
                      </div>
                      
                      {/* Emergency Contact Info */}
                      <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-700 font-medium text-sm mb-1">🚨 IMMEDIATE ACTION REQUIRED</p>
                        <p className="text-red-600 text-xs">
                          Customer {report.customerName} (CNIC: {report.cnic}) has reported this vehicle as stolen. 
                          Please contact the customer immediately and take appropriate action.
                        </p>
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

export default TheftReports;