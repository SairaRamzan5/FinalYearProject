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
//       const showroomName = sessionStorage.getItem("showroomName");
      
//       if (!showroomName) {
//         setError("Showroom name not found");
//         return;
//       }

//       const res = await axios.get(`${Base_Url}/api/theft-report/showroom`, {
//         params: { showroomName },
//         withCredentials: true,
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
//              Theft Reports - My Showroom
//           </h2>

//           {loading ? (
//             <div className="flex justify-center items-center py-12">
//               <p className="text-gray-600 text-lg">Loading theft reports...</p>
//             </div>
//           ) : error ? (
//             <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
//               <p className="text-red-600 font-medium">{error}</p>
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
//                       <th className="border-b p-4 text-left font-bold">Customer Name</th>
//                       <th className="border-b p-4 text-left font-bold">CNIC</th>
//                       <th className="border-b p-4 text-left font-bold">Car Name</th>
//                       <th className="border-b p-4 text-left font-bold">Plate Number</th>
//                       <th className="border-b p-4 text-left font-bold">Start Date</th>
//                       <th className="border-b p-4 text-left font-bold">End Date</th>
//                       <th className="border-b p-4 text-left font-bold">Showroom</th>
//                       <th className="border-b p-4 text-left font-bold">Report Date</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {reports.map((report) => (
//                       <tr key={report._id} className="hover:bg-gray-50 transition-colors">
//                         <td className="border-b p-4">{report.customerName}</td>
//                         <td className="border-b p-4 font-mono">{report.cnic}</td>
//                         <td className="border-b p-4 font-mono">{report.rentalDetails?.carName}</td>
//                         <td className="border-b p-4 font-mono">
//                           {report.rentalDetails?.plateNumber || "N/A"}
//                         </td>
//                         <td className="border-b p-4">
//                           {new Date(report.rentalDetails?.rentalStartDate).toLocaleDateString()}
//                         </td>
//                         <td className="border-b p-4">
//                           {new Date(report.rentalDetails?.rentalEndDate).toLocaleDateString()}
//                         </td>
//                         <td className="border-b p-4">{report.rentalDetails?.showroomName}</td>
//                         <td className="border-b p-4 text-red-500 font-medium">
//                           {new Date(report.reportDate).toLocaleString()}
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

function TheftReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const Base_Url = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchShowroomReports();
  }, []);

  const fetchShowroomReports = async () => {
    try {
      setLoading(true);
      
      // No need to pass showroomName - backend handles it automatically via auth token
      const res = await axios.get(`${Base_Url}/api/theft-report/showroom`, {
        withCredentials: true, // This sends the auth token automatically
      });
      
      setReports(res.data.data || []);
    } catch (err) {
      console.error("Error fetching theft reports:", err);
      setError("Failed to load theft reports");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <ShowroomNavbar />
      
      <main className="flex-grow p-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-[#C17D3C]">
            🚨 Theft Reports - My Showroom
          </h2>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <p className="text-gray-600 text-lg">Loading theft reports...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <p className="text-red-600 font-medium">{error}</p>
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
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <p className="text-gray-600">
                  Showing <span className="font-semibold">{reports.length}</span> theft 
                  report{reports.length !== 1 ? 's' : ''} for your showroom
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 text-gray-700">
                      <th className="border-b p-4 text-left font-semibold">Customer Name</th>
                      <th className="border-b p-4 text-left font-semibold">CNIC</th>
                      <th className="border-b p-4 text-left font-semibold">Car Name</th>
                      <th className="border-b p-4 text-left font-semibold">Plate Number</th>
                      <th className="border-b p-4 text-left font-semibold">Start Date</th>
                      <th className="border-b p-4 text-left font-semibold">End Date</th>
                      <th className="border-b p-4 text-left font-semibold">Report Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reports.map((report) => (
                      <tr key={report._id} className="hover:bg-gray-50 transition-colors">
                        <td className="border-b p-4 font-medium">{report.customerName}</td>
                        <td className="border-b p-4 font-mono">{report.cnic}</td>
                        <td className="border-b p-4 text-red-600 font-semibold">
                          {report.rentalDetails?.carName}
                        </td>
                        <td className="border-b p-4 font-mono">
                          {report.rentalDetails?.plateNumber || "N/A"}
                        </td>
                        <td className="border-b p-4">
                          {new Date(report.rentalDetails?.rentalStartDate).toLocaleDateString()}
                        </td>
                        <td className="border-b p-4">
                          {new Date(report.rentalDetails?.rentalEndDate).toLocaleDateString()}
                        </td>
                        <td className="border-b p-4 text-red-500 font-medium">
                          {new Date(report.createdAt || report.reportDate).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default TheftReports;