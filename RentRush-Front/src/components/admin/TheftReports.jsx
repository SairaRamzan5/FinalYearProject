// import React, { useEffect, useState } from "react";
// import axios from "axios";

// function TheftReportsTable() {
//   const [reports, setReports] = useState([]);

//   useEffect(() => {
//     fetchReports();
//   }, []);

//   const fetchReports = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/theft-report");
//       setReports(res.data.data); // backend se "data" aa raha hai
//     } catch (error) {
//       console.error("Error fetching theft reports:", error);
//     }
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-xl font-bold mb-4">Theft Reports</h2>
//       <table className="w-full border-collapse border border-gray-300 shadow-lg">
//         <thead>
//           <tr className="bg-gray-200">
//             <th className="border p-2">Customer Name</th>
//             <th className="border p-2">CNIC</th>
//             <th className="border p-2">Car Name</th>
//             <th className="border p-2">Start Date</th>
//             <th className="border p-2">End Date</th>
//             <th className="border p-2">Showroom</th>
//             <th className="border p-2">Report Date</th>
//           </tr>
//         </thead>
//         <tbody>
//           {reports.length > 0 ? (
//             reports.map((report) => (
//               <tr key={report._id} className="text-center hover:bg-gray-50">
//                 <td className="border p-2">{report.customerName}</td>
//                 <td className="border p-2">{report.cnic}</td>
//                 <td className="border p-2">{report.rentalDetails.carName}</td>
//                 <td className="border p-2">
//                   {new Date(report.rentalDetails.rentalStartDate).toLocaleDateString()}
//                 </td>
//                 <td className="border p-2">
//                   {new Date(report.rentalDetails.rentalEndDate).toLocaleDateString()}
//                 </td>
//                 <td className="border p-2">{report.rentalDetails.showroomName}</td>
//                 <td className="border p-2">
//                   {new Date(report.reportDate).toLocaleDateString()}
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td className="border p-2 text-center" colSpan="7">
//                 No theft reports found
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default TheftReportsTable;



import React, { useEffect, useState } from "react";
import axios from "axios";

function TheftReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const Base_Url = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${Base_Url}/api/theft-report`, {
        withCredentials: true,
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
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-[#C17D3C]">
        🚨 Theft Reports
      </h2>

      {loading ? (
        <p className="text-gray-600">Loading theft reports...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : reports.length === 0 ? (
        <p className="text-gray-600">No theft reports found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 shadow-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="border p-2">Customer Name</th>
                <th className="border p-2">CNIC</th>
                <th className="border p-2">Car Name</th>
                <th className="border p-2">Start Date</th>
                <th className="border p-2">End Date</th>
                <th className="border p-2">Showroom</th>
                <th className="border p-2">Report Date</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report._id} className="text-center hover:bg-gray-50">
                  <td className="border p-2">{report.customerName}</td>
                  <td className="border p-2">{report.cnic}</td>
                  <td className="border p-2">
                    {report.rentalDetails?.carName}
                  </td>
                  <td className="border p-2">
                    {new Date(
                      report.rentalDetails?.rentalStartDate
                    ).toLocaleDateString()}
                  </td>
                  <td className="border p-2">
                    {new Date(
                      report.rentalDetails?.rentalEndDate
                    ).toLocaleDateString()}
                  </td>
                  <td className="border p-2">
                    {report.rentalDetails?.showroomName}
                  </td>
                  <td className="border p-2">
                    {new Date(report.reportDate).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default TheftReports;


