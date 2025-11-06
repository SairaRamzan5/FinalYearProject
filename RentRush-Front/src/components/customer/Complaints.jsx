// // import { useEffect, useState } from "react";
// // import axios from "axios";
// // import Navbar from "../Navbar";
// // import Footer from "../Footer";
// // import { 
// //   Search, 
// //   Filter, 
// //   AlertTriangle, 
// //   CheckCircle,
// //   Clock,
// //   Car,
// //   Building2,
// //   Eye
// // } from "lucide-react";

// // const Base_Url = import.meta.env.VITE_API_URL;

// // function UserComplaints() {
// //   const [complaints, setComplaints] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [statusFilter, setStatusFilter] = useState("all");
// //   const [selectedComplaint, setSelectedComplaint] = useState(null);
// //   const [showDetails, setShowDetails] = useState(false);
// //   const [stats, setStats] = useState({
// //     totalComplaints: 0,
// //     pending: 0,
// //     resolved: 0,
// //   });

// //   // ✅ Fetch user complaints
// //   const fetchUserComplaints = async () => {
// //     try {
// //       const response = await axios.get(`${Base_Url}/api/complaints/user/my-complaints`, {
// //         withCredentials: true,
// //       });

// //       if (response.data.success) {
// //         const list = response.data.complaints || [];
// //         setComplaints(list);

// //         const pendingCount = list.filter(c => !c.resolved).length;
// //         const resolvedCount = list.filter(c => c.resolved).length;

// //         setStats({
// //           totalComplaints: list.length,
// //           pending: pendingCount,
// //           resolved: resolvedCount,
// //         });
// //       }
// //     } catch (error) {
// //       console.error("❌ Error fetching user complaints:", error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchUserComplaints();
// //   }, []);

// //   const filteredComplaints = complaints.filter((complaint) => {
// //     const matchesSearch =
// //       complaint.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //       complaint.compl_Against?.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //       complaint.bookingId?.carId?.carBrand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //       complaint.bookingId?.carId?.carModel?.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //       complaint.bookingId?.showroomId?.showroomName?.toLowerCase().includes(searchTerm.toLowerCase());

// //     const matchesStatus =
// //       statusFilter === "all" ||
// //       (statusFilter === "resolved" && complaint.resolved) ||
// //       (statusFilter === "pending" && !complaint.resolved);

// //     return matchesSearch && matchesStatus;
// //   });

// //   const formatDate = (date) => new Date(date).toLocaleDateString("en-PK", {
// //     year: "numeric", month: "short", day: "numeric",
// //     hour: "2-digit", minute: "2-digit"
// //   });

// //   const getStatusBadge = (resolved) => {
// //     return resolved ? (
// //       <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">Resolved</span>
// //     ) : (
// //       <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-medium">Pending</span>
// //     );
// //   };

// //   const viewComplaintDetails = (complaint) => {
// //     setSelectedComplaint(complaint);
// //     setShowDetails(true);
// //     document.body.style.overflow = "hidden";
// //   };

// //   const closeDetails = () => {
// //     setSelectedComplaint(null);
// //     setShowDetails(false);
// //     document.body.style.overflow = "auto";
// //   };

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen flex flex-col">
// //         <Navbar />
// //         <div className="flex-grow flex justify-center items-center bg-gray-50">
// //           <p>Loading your complaints...</p>
// //         </div>
// //         <Footer />
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen flex flex-col bg-gray-50">
// //       <Navbar />

// //       <main className="flex-grow py-8">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //           <h1 className="text-3xl font-bold text-gray-900 mb-6">My Complaints</h1>

// //           {/* Stats */}
// //           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
// //             <div className="bg-blue-100 p-4 text-center rounded-lg shadow">
// //               <p className="text-sm font-semibold text-blue-800">Total Complaints</p>
// //               <p className="text-2xl font-bold text-blue-900">{stats.totalComplaints}</p>
// //             </div>
// //             <div className="bg-green-100 p-4 text-center rounded-lg shadow">
// //               <p className="text-sm font-semibold text-green-800">Resolved</p>
// //               <p className="text-2xl font-bold text-green-900">{stats.resolved}</p>
// //             </div>
// //             <div className="bg-yellow-100 p-4 text-center rounded-lg shadow">
// //               <p className="text-sm font-semibold text-yellow-800">Pending</p>
// //               <p className="text-2xl font-bold text-yellow-900">{stats.pending}</p>
// //             </div>
// //           </div>

// //           {/* Filters */}
// //           <div className="bg-white p-4 rounded-lg shadow mb-6 flex flex-col sm:flex-row gap-4">
// //             <div className="flex-1 relative">
// //               <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
// //               <input
// //                 type="text"
// //                 placeholder="Search by complaint type, car, or showroom..."
// //                 value={searchTerm}
// //                 onChange={(e) => setSearchTerm(e.target.value)}
// //                 className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-[#C17D3C]"
// //               />
// //             </div>
// //             <div className="sm:w-48 relative">
// //               <Filter className="absolute left-3 top-2.5 text-gray-400" size={18} />
// //               <select
// //                 value={statusFilter}
// //                 onChange={(e) => setStatusFilter(e.target.value)}
// //                 className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-[#C17D3C]"
// //               >
// //                 <option value="all">All Status</option>
// //                 <option value="pending">Pending</option>
// //                 <option value="resolved">Resolved</option>
// //               </select>
// //             </div>
// //           </div>

// //           {/* Complaints Table */}
// //           <div className="bg-white rounded-lg shadow overflow-hidden">
// //             {filteredComplaints.length > 0 ? (
// //               <div className="overflow-x-auto">
// //                 <table className="w-full border border-gray-200">
// //                   <thead className="bg-gray-100">
// //                     <tr>
// //                       <th className="px-4 py-3 border text-left">Complaint Against</th>
// //                       <th className="px-4 py-3 border text-left">Description</th>
// //                       <th className="px-4 py-3 border text-left">Car</th>
// //                       <th className="px-4 py-3 border text-left">Showroom</th>
// //                       <th className="px-4 py-3 border text-left">Date</th>
// //                       <th className="px-4 py-3 border text-center">Status</th>
// //                       <th className="px-4 py-3 border text-center">Actions</th>
// //                     </tr>
// //                   </thead>
// //                   <tbody>
// //                     {filteredComplaints.map((complaint) => {
// //                       const booking = complaint.bookingId;
// //                       const car = booking?.carId;
// //                       const showroom = booking?.showroomId;
// //                       return (
// //                         <tr key={complaint._id} className="hover:bg-gray-50 border-b">
// //                           <td className="px-4 py-3">{complaint.compl_Against}</td>
// //                           <td className="px-4 py-3 text-sm text-gray-600 max-w-xs truncate" title={complaint.description}>
// //                             {complaint.description}
// //                           </td>
// //                           <td className="px-4 py-3 text-sm">
// //                             {car ? (
// //                               <>
// //                                 <span className="font-medium">{car.carBrand} {car.carModel}</span>
// //                                 <br />
// //                                 <span className="text-xs text-gray-500">Plate: {car.plateNumber}</span>
// //                               </>
// //                             ) : (
// //                               <span className="text-gray-400 text-sm">No car data</span>
// //                             )}
// //                           </td>
// //                           <td className="px-4 py-3 text-sm">
// //                             {showroom ? showroom.showroomName : "N/A"}
// //                           </td>
// //                           <td className="px-4 py-3 text-gray-500 text-sm">{formatDate(complaint.createdAt)}</td>
// //                           <td className="px-4 py-3 text-center">{getStatusBadge(complaint.resolved)}</td>
// //                           <td className="px-4 py-3 text-center">
// //                             <button
// //                               onClick={() => viewComplaintDetails(complaint)}
// //                               className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
// //                             >
// //                               View Details
// //                             </button>
// //                           </td>
// //                         </tr>
// //                       );
// //                     })}
// //                   </tbody>
// //                 </table>
// //               </div>
// //             ) : (
// //               <div className="text-center py-16">
// //                 <AlertTriangle className="mx-auto h-16 w-16 text-gray-400" />
// //                 <h3 className="mt-4 text-lg font-medium text-gray-900">No complaints found</h3>
// //                 <p className="mt-2 text-sm text-gray-500">You haven't submitted any complaints yet.</p>
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       </main>

// //       <Footer />

// //       {/* Modal */}
// //       {showDetails && selectedComplaint && (
// //         <div
// //           className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4"
// //           onClick={(e) => e.target === e.currentTarget && closeDetails()}
// //         >
// //           <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
// //             <button
// //               onClick={closeDetails}
// //               className="absolute top-4 right-4 text-gray-600 hover:text-black text-2xl"
// //             >
// //               ✖
// //             </button>

// //             <h3 className="text-2xl font-bold text-[#394A9A] mb-4 border-b pb-2">
// //               Complaint Details
// //             </h3>

// //             <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
// //               <div className="bg-gray-50 p-4 rounded-lg">
// //                 <h4 className="font-semibold text-lg mb-2 text-[#394A9A]">Complaint Info</h4>
// //                 <p><strong>Type:</strong> {selectedComplaint.compl_Against}</p>
// //                 <p><strong>Status:</strong> {getStatusBadge(selectedComplaint.resolved)}</p>
// //                 <p><strong>Date:</strong> {formatDate(selectedComplaint.createdAt)}</p>
// //                 <p><strong>Description:</strong></p>
// //                 <p className="bg-white border p-2 rounded text-sm">{selectedComplaint.description}</p>
// //               </div>

// //               {selectedComplaint.bookingId && (
// //                 <div className="bg-gray-50 p-4 rounded-lg">
// //                   <h4 className="font-semibold text-lg mb-2 text-[#394A9A]">Booking Details</h4>
// //                   <p><strong>Car:</strong> {selectedComplaint.bookingId.carId?.carBrand} {selectedComplaint.bookingId.carId?.carModel}</p>
// //                   <p><strong>Plate:</strong> {selectedComplaint.bookingId.carId?.plateNumber}</p>
// //                   <p><strong>Total Cost:</strong> Rs. {selectedComplaint.bookingId?.totalCost}</p>
// //                   <p><strong>From:</strong> {formatDate(selectedComplaint.bookingId?.startDate)}</p>
// //                   <p><strong>To:</strong> {formatDate(selectedComplaint.bookingId?.endDate)}</p>
// //                   <p><strong>Showroom:</strong> {selectedComplaint.bookingId.showroomId?.showroomName}</p>
// //                 </div>
// //               )}
// //             </div>

// //             {selectedComplaint.proof && (
// //               <div className="mt-4 bg-gray-50 p-4 rounded-lg text-center">
// //                 <h4 className="font-semibold text-lg mb-2 text-[#394A9A]">Proof</h4>
// //                 <img
// //                   src={`${Base_Url}/uploads/complaints/${selectedComplaint.proof}`}
// //                   alt="Proof"
// //                   className="max-h-64 mx-auto rounded border"
// //                 />
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // export default UserComplaints;


// // import { useEffect, useState } from "react";
// // import axios from "axios";
// // import Navbar from "./Navbar"; // ✅ same as CustomerComplaints
// // import Footer from "./Footer";
// // import { 
// //   Search, 
// //   Filter, 
// //   AlertTriangle
// // } from "lucide-react";

// // const Base_Url = import.meta.env.VITE_API_URL;

// // function UserComplaints() {
// //   const [complaints, setComplaints] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [statusFilter, setStatusFilter] = useState("all");
// //   const [selectedComplaint, setSelectedComplaint] = useState(null);
// //   const [showDetails, setShowDetails] = useState(false);
// //   const [stats, setStats] = useState({
// //     totalComplaints: 0,
// //     pending: 0,
// //     resolved: 0,
// //   });

// //   // ✅ Fetch user complaints
// //   const fetchUserComplaints = async () => {
// //     try {
// //       const response = await axios.get(`${Base_Url}/api/complaints/user/my-complaints`, {
// //         withCredentials: true,
// //       });

// //       if (response.data.success) {
// //         const list = response.data.complaints || [];
// //         setComplaints(list);

// //         const pendingCount = list.filter(c => !c.resolved).length;
// //         const resolvedCount = list.filter(c => c.resolved).length;

// //         setStats({
// //           totalComplaints: list.length,
// //           pending: pendingCount,
// //           resolved: resolvedCount,
// //         });
// //       }
// //     } catch (error) {
// //       console.error("❌ Error fetching user complaints:", error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchUserComplaints();
// //   }, []);

// //   const filteredComplaints = complaints.filter((complaint) => {
// //     const matchesSearch =
// //       complaint.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //       complaint.compl_Against?.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //       complaint.bookingId?.carId?.carBrand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //       complaint.bookingId?.carId?.carModel?.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //       complaint.bookingId?.showroomId?.showroomName?.toLowerCase().includes(searchTerm.toLowerCase());

// //     const matchesStatus =
// //       statusFilter === "all" ||
// //       (statusFilter === "resolved" && complaint.resolved) ||
// //       (statusFilter === "pending" && !complaint.resolved);

// //     return matchesSearch && matchesStatus;
// //   });

// //   const formatDate = (date) => new Date(date).toLocaleDateString("en-PK", {
// //     year: "numeric", month: "short", day: "numeric",
// //     hour: "2-digit", minute: "2-digit"
// //   });

// //   const getStatusBadge = (resolved) => {
// //     return resolved ? (
// //       <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">Resolved</span>
// //     ) : (
// //       <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-medium">Pending</span>
// //     );
// //   };

// //   const viewComplaintDetails = (complaint) => {
// //     setSelectedComplaint(complaint);
// //     setShowDetails(true);
// //     document.body.style.overflow = "hidden";
// //   };

// //   const closeDetails = () => {
// //     setSelectedComplaint(null);
// //     setShowDetails(false);
// //     document.body.style.overflow = "auto";
// //   };

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen flex flex-col">
// //         <Navbar />
// //         <div className="flex-grow flex justify-center items-center bg-gray-50">
// //           <p>Loading your complaints...</p>
// //         </div>
// //         <Footer />
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen flex flex-col bg-gray-50">
// //       <Navbar /> {/* ✅ Uses the same Navbar as CustomerComplaints */}

// //       <main className="flex-grow py-8">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //           <h1 className="text-3xl font-bold text-gray-900 mb-6">My Complaints</h1>

// //           {/* Stats */}
// //           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
// //             <div className="bg-blue-100 p-4 text-center rounded-lg shadow">
// //               <p className="text-sm font-semibold text-blue-800">Total Complaints</p>
// //               <p className="text-2xl font-bold text-blue-900">{stats.totalComplaints}</p>
// //             </div>
// //             <div className="bg-green-100 p-4 text-center rounded-lg shadow">
// //               <p className="text-sm font-semibold text-green-800">Resolved</p>
// //               <p className="text-2xl font-bold text-green-900">{stats.resolved}</p>
// //             </div>
// //             <div className="bg-yellow-100 p-4 text-center rounded-lg shadow">
// //               <p className="text-sm font-semibold text-yellow-800">Pending</p>
// //               <p className="text-2xl font-bold text-yellow-900">{stats.pending}</p>
// //             </div>
// //           </div>

// //           {/* Filters */}
// //           <div className="bg-white p-4 rounded-lg shadow mb-6 flex flex-col sm:flex-row gap-4">
// //             <div className="flex-1 relative">
// //               <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
// //               <input
// //                 type="text"
// //                 placeholder="Search by complaint type, car, or showroom..."
// //                 value={searchTerm}
// //                 onChange={(e) => setSearchTerm(e.target.value)}
// //                 className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-[#C17D3C]"
// //               />
// //             </div>
// //             <div className="sm:w-48 relative">
// //               <Filter className="absolute left-3 top-2.5 text-gray-400" size={18} />
// //               <select
// //                 value={statusFilter}
// //                 onChange={(e) => setStatusFilter(e.target.value)}
// //                 className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-[#C17D3C]"
// //               >
// //                 <option value="all">All Status</option>
// //                 <option value="pending">Pending</option>
// //                 <option value="resolved">Resolved</option>
// //               </select>
// //             </div>
// //           </div>

// //           {/* Complaints Table */}
// //           <div className="bg-white rounded-lg shadow overflow-hidden">
// //             {filteredComplaints.length > 0 ? (
// //               <div className="overflow-x-auto">
// //                 <table className="w-full border border-gray-200">
// //                   <thead className="bg-gray-100">
// //                     <tr>
// //                       <th className="px-4 py-3 border text-left">Complaint Against</th>
// //                       <th className="px-4 py-3 border text-left">Description</th>
// //                       <th className="px-4 py-3 border text-left">Car</th>
// //                       <th className="px-4 py-3 border text-left">Showroom</th>
// //                       <th className="px-4 py-3 border text-left">Date</th>
// //                       <th className="px-4 py-3 border text-center">Status</th>
// //                       <th className="px-4 py-3 border text-center">Actions</th>
// //                     </tr>
// //                   </thead>
// //                   <tbody>
// //                     {filteredComplaints.map((complaint) => {
// //                       const booking = complaint.bookingId;
// //                       const car = booking?.carId;
// //                       const showroom = booking?.showroomId;
// //                       return (
// //                         <tr key={complaint._id} className="hover:bg-gray-50 border-b">
// //                           <td className="px-4 py-3">{complaint.compl_Against}</td>
// //                           <td className="px-4 py-3 text-sm text-gray-600 max-w-xs truncate" title={complaint.description}>
// //                             {complaint.description}
// //                           </td>
// //                           <td className="px-4 py-3 text-sm">
// //                             {car ? (
// //                               <>
// //                                 <span className="font-medium">{car.carBrand} {car.carModel}</span>
// //                                 <br />
// //                                 <span className="text-xs text-gray-500">Plate: {car.plateNumber}</span>
// //                               </>
// //                             ) : (
// //                               <span className="text-gray-400 text-sm">No car data</span>
// //                             )}
// //                           </td>
// //                           <td className="px-4 py-3 text-sm">
// //                             {showroom ? showroom.showroomName : "N/A"}
// //                           </td>
// //                           <td className="px-4 py-3 text-gray-500 text-sm">{formatDate(complaint.createdAt)}</td>
// //                           <td className="px-4 py-3 text-center">{getStatusBadge(complaint.resolved)}</td>
// //                           <td className="px-4 py-3 text-center">
// //                             <button
// //                               onClick={() => viewComplaintDetails(complaint)}
// //                               className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
// //                             >
// //                               View Details
// //                             </button>
// //                           </td>
// //                         </tr>
// //                       );
// //                     })}
// //                   </tbody>
// //                 </table>
// //               </div>
// //             ) : (
// //               <div className="text-center py-16">
// //                 <AlertTriangle className="mx-auto h-16 w-16 text-gray-400" />
// //                 <h3 className="mt-4 text-lg font-medium text-gray-900">No complaints found</h3>
// //                 <p className="mt-2 text-sm text-gray-500">You haven't submitted any complaints yet.</p>
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       </main>

// //       <Footer />

// //       {/* Modal */}
// //       {showDetails && selectedComplaint && (
// //         <div
// //           className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4"
// //           onClick={(e) => e.target === e.currentTarget && closeDetails()}
// //         >
// //           <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
// //             <button
// //               onClick={closeDetails}
// //               className="absolute top-4 right-4 text-gray-600 hover:text-black text-2xl"
// //             >
// //               ✖
// //             </button>

// //             <h3 className="text-2xl font-bold text-[#394A9A] mb-4 border-b pb-2">
// //               Complaint Details
// //             </h3>

// //             <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
// //               <div className="bg-gray-50 p-4 rounded-lg">
// //                 <h4 className="font-semibold text-lg mb-2 text-[#394A9A]">Complaint Info</h4>
// //                 <p><strong>Type:</strong> {selectedComplaint.compl_Against}</p>
// //                 <p><strong>Status:</strong> {getStatusBadge(selectedComplaint.resolved)}</p>
// //                 <p><strong>Date:</strong> {formatDate(selectedComplaint.createdAt)}</p>
// //                 <p><strong>Description:</strong></p>
// //                 <p className="bg-white border p-2 rounded text-sm">{selectedComplaint.description}</p>
// //               </div>

// //               {selectedComplaint.bookingId && (
// //                 <div className="bg-gray-50 p-4 rounded-lg">
// //                   <h4 className="font-semibold text-lg mb-2 text-[#394A9A]">Booking Details</h4>
// //                   <p><strong>Car:</strong> {selectedComplaint.bookingId.carId?.carBrand} {selectedComplaint.bookingId.carId?.carModel}</p>
// //                   <p><strong>Plate:</strong> {selectedComplaint.bookingId.carId?.plateNumber}</p>
// //                   <p><strong>Total Cost:</strong> Rs. {selectedComplaint.bookingId?.totalCost}</p>
// //                   <p><strong>From:</strong> {formatDate(selectedComplaint.bookingId?.startDate)}</p>
// //                   <p><strong>To:</strong> {formatDate(selectedComplaint.bookingId?.endDate)}</p>
// //                   <p><strong>Showroom:</strong> {selectedComplaint.bookingId.showroomId?.showroomName}</p>
// //                 </div>
// //               )}
// //             </div>

// //             {selectedComplaint.proof && (
// //               <div className="mt-4 bg-gray-50 p-4 rounded-lg text-center">
// //                 <h4 className="font-semibold text-lg mb-2 text-[#394A9A]">Proof</h4>
// //                 <img
// //                   src={`${Base_Url}/uploads/complaints/${selectedComplaint.proof}`}
// //                   alt="Proof"
// //                   className="max-h-64 mx-auto rounded border"
// //                 />
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // export default UserComplaints;


// import { useEffect, useState } from "react";
// import axios from "axios";
// import Navbar from "./Navbar";
// import Footer from "./Footer";
// import { 
//   Search, 
//   Filter, 
//   AlertTriangle
// } from "lucide-react";

// const Base_Url = import.meta.env.VITE_API_URL;

// function UserComplaints() {
//   const [complaints, setComplaints] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [selectedComplaint, setSelectedComplaint] = useState(null);
//   const [showDetails, setShowDetails] = useState(false);
//   const [stats, setStats] = useState({
//     totalComplaints: 0,
//     pending: 0,
//     resolved: 0,
//   });

//   // ✅ Fetch user complaints
//   const fetchUserComplaints = async () => {
//     try {
//       const response = await axios.get(`${Base_Url}/api/complaints/user/my-complaints`, {
//         withCredentials: true,
//       });

//       if (response.data.success) {
//         const list = response.data.complaints || [];
//         setComplaints(list);

//         const pendingCount = list.filter(c => !c.resolved).length;
//         const resolvedCount = list.filter(c => c.resolved).length;

//         setStats({
//           totalComplaints: list.length,
//           pending: pendingCount,
//           resolved: resolvedCount,
//         });
//       }
//     } catch (error) {
//       console.error("❌ Error fetching user complaints:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUserComplaints();
//   }, []);

//   const filteredComplaints = complaints.filter((complaint) => {
//     const matchesSearch =
//       complaint.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       complaint.compl_Against?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       complaint.bookingId?.carId?.carBrand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       complaint.bookingId?.carId?.carModel?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       complaint.bookingId?.showroomId?.showroomName?.toLowerCase().includes(searchTerm.toLowerCase());

//     const matchesStatus =
//       statusFilter === "all" ||
//       (statusFilter === "resolved" && complaint.resolved) ||
//       (statusFilter === "pending" && !complaint.resolved);

//     return matchesSearch && matchesStatus;
//   });

//   const formatDate = (date) => new Date(date).toLocaleDateString("en-PK", {
//     year: "numeric", month: "short", day: "numeric",
//     hour: "2-digit", minute: "2-digit"
//   });

//   const getStatusBadge = (resolved) => {
//     return resolved ? (
//       <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">Resolved</span>
//     ) : (
//       <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-medium">Pending</span>
//     );
//   };

//   const viewComplaintDetails = (complaint) => {
//     setSelectedComplaint(complaint);
//     setShowDetails(true);
//     document.body.style.overflow = "hidden";
//   };

//   const closeDetails = () => {
//     setSelectedComplaint(null);
//     setShowDetails(false);
//     document.body.style.overflow = "auto";
//   };

//   // ✅ GET CORRECT BOOKING DETAILS
//   const getBookingDetails = (complaint) => {
//     const booking = complaint.bookingId;
//     if (!booking) return null;

//     // ✅ CORRECT FIELD NAMES FOR BOOKING
//     return {
//       carBrand: booking.carId?.carBrand || "N/A",
//       carModel: booking.carId?.carModel || "N/A", 
//       plateNumber: booking.carId?.plateNumber || "N/A",
//       // ✅ CORRECT COST FIELD - totalPrice instead of totalCost
//       totalCost: booking.totalPrice || booking.totalCost || "N/A",
//       // ✅ CORRECT DATE FIELDS - rentalStartDate instead of startDate
//       startDate: booking.rentalStartDate || booking.startDate,
//       startTime: booking.rentalStartTime || booking.StartTime,
//       // ✅ CORRECT DATE FIELDS - rentalEndDate instead of endDate  
//       endDate: booking.rentalEndDate || booking.endDate,
//       endTime: booking.rentalEndTime || booking.EndTime,
//       showroomName: booking.showroomId?.showroomName || "N/A"
//     };
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex flex-col">
//         <Navbar />
//         <div className="flex-grow flex justify-center items-center bg-gray-50">
//           <p>Loading your complaints...</p>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-50">
//       <Navbar />

//       <main className="flex-grow py-8">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-6">My Complaints</h1>

//           {/* Stats */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
//             <div className="bg-blue-100 p-4 text-center rounded-lg shadow">
//               <p className="text-sm font-semibold text-blue-800">Total Complaints</p>
//               <p className="text-2xl font-bold text-blue-900">{stats.totalComplaints}</p>
//             </div>
//             <div className="bg-green-100 p-4 text-center rounded-lg shadow">
//               <p className="text-sm font-semibold text-green-800">Resolved</p>
//               <p className="text-2xl font-bold text-green-900">{stats.resolved}</p>
//             </div>
//             <div className="bg-yellow-100 p-4 text-center rounded-lg shadow">
//               <p className="text-sm font-semibold text-yellow-800">Pending</p>
//               <p className="text-2xl font-bold text-yellow-900">{stats.pending}</p>
//             </div>
//           </div>

//           {/* Filters */}
//           <div className="bg-white p-4 rounded-lg shadow mb-6 flex flex-col sm:flex-row gap-4">
//             <div className="flex-1 relative">
//               <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
//               <input
//                 type="text"
//                 placeholder="Search by complaint type, car, or showroom..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-[#C17D3C]"
//               />
//             </div>
//             <div className="sm:w-48 relative">
//               <Filter className="absolute left-3 top-2.5 text-gray-400" size={18} />
//               <select
//                 value={statusFilter}
//                 onChange={(e) => setStatusFilter(e.target.value)}
//                 className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-[#C17D3C]"
//               >
//                 <option value="all">All Status</option>
//                 <option value="pending">Pending</option>
//                 <option value="resolved">Resolved</option>
//               </select>
//             </div>
//           </div>

//           {/* Complaints Table */}
//           <div className="bg-white rounded-lg shadow overflow-hidden">
//             {filteredComplaints.length > 0 ? (
//               <div className="overflow-x-auto">
//                 <table className="w-full border border-gray-200">
//                   <thead className="bg-gray-100">
//                     <tr>
//                       <th className="px-4 py-3 border text-left">Complaint Against</th>
//                       <th className="px-4 py-3 border text-left">Description</th>
//                       <th className="px-4 py-3 border text-left">Car</th>
//                       <th className="px-4 py-3 border text-left">Showroom</th>
//                       <th className="px-4 py-3 border text-left">Date</th>
//                       <th className="px-4 py-3 border text-center">Status</th>
//                       <th className="px-4 py-3 border text-center">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {filteredComplaints.map((complaint) => {
//                       const bookingDetails = getBookingDetails(complaint);
//                       return (
//                         <tr key={complaint._id} className="hover:bg-gray-50 border-b">
//                           <td className="px-4 py-3">{complaint.compl_Against}</td>
//                           <td className="px-4 py-3 text-sm text-gray-600 max-w-xs truncate" title={complaint.description}>
//                             {complaint.description}
//                           </td>
//                           <td className="px-4 py-3 text-sm">
//                             {bookingDetails ? (
//                               <>
//                                 <span className="font-medium">{bookingDetails.carBrand} {bookingDetails.carModel}</span>
//                                 <br />
//                                 <span className="text-xs text-gray-500">Plate: {bookingDetails.plateNumber}</span>
//                               </>
//                             ) : (
//                               <span className="text-gray-400 text-sm">No car data</span>
//                             )}
//                           </td>
//                           <td className="px-4 py-3 text-sm">
//                             {bookingDetails?.showroomName || "N/A"}
//                           </td>
//                           <td className="px-4 py-3 text-gray-500 text-sm">{formatDate(complaint.createdAt)}</td>
//                           <td className="px-4 py-3 text-center">{getStatusBadge(complaint.resolved)}</td>
//                           <td className="px-4 py-3 text-center">
//                             <button
//                               onClick={() => viewComplaintDetails(complaint)}
//                               className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
//                             >
//                               View Details
//                             </button>
//                           </td>
//                         </tr>
//                       );
//                     })}
//                   </tbody>
//                 </table>
//               </div>
//             ) : (
//               <div className="text-center py-16">
//                 <AlertTriangle className="mx-auto h-16 w-16 text-gray-400" />
//                 <h3 className="mt-4 text-lg font-medium text-gray-900">No complaints found</h3>
//                 <p className="mt-2 text-sm text-gray-500">You haven't submitted any complaints yet.</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </main>

//       <Footer />

//       {/* Modal */}
//       {showDetails && selectedComplaint && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4"
//           onClick={(e) => e.target === e.currentTarget && closeDetails()}
//         >
//           <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
//             <button
//               onClick={closeDetails}
//               className="absolute top-4 right-4 text-gray-600 hover:text-black text-2xl"
//             >
//               ✖
//             </button>

//             <h3 className="text-2xl font-bold text-[#394A9A] mb-4 border-b pb-2">
//               Complaint Details
//             </h3>

//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//               <div className="bg-gray-50 p-4 rounded-lg">
//                 <h4 className="font-semibold text-lg mb-2 text-[#394A9A]">Complaint Info</h4>
//                 <p><strong>Type:</strong> {selectedComplaint.compl_Against}</p>
//                 <p><strong>Status:</strong> {getStatusBadge(selectedComplaint.resolved)}</p>
//                 <p><strong>Date:</strong> {formatDate(selectedComplaint.createdAt)}</p>
//                 <p><strong>Description:</strong></p>
//                 <p className="bg-white border p-2 rounded text-sm">{selectedComplaint.description}</p>
//               </div>

//               {selectedComplaint.bookingId && (
//                 <div className="bg-gray-50 p-4 rounded-lg">
//                   <h4 className="font-semibold text-lg mb-2 text-[#394A9A]">Booking Details</h4>
//                   {(() => {
//                     const bookingDetails = getBookingDetails(selectedComplaint);
//                     return (
//                       <>
//                         <p><strong>Car:</strong> {bookingDetails.carBrand} {bookingDetails.carModel}</p>
//                         <p><strong>Plate:</strong> {bookingDetails.plateNumber}</p>
//                         <p><strong>Total Cost:</strong> Rs. {bookingDetails.totalCost}</p>
//                         <p><strong>From:</strong> {bookingDetails.startDate} at {bookingDetails.startTime}</p>
//                         <p><strong>To:</strong> {bookingDetails.endDate} at {bookingDetails.endTime}</p>
//                         <p><strong>Showroom:</strong> {bookingDetails.showroomName}</p>
//                       </>
//                     );
//                   })()}
//                 </div>
//               )}
//             </div>

//             {selectedComplaint.proof && (
//               <div className="mt-4 bg-gray-50 p-4 rounded-lg text-center">
//                 <h4 className="font-semibold text-lg mb-2 text-[#394A9A]">Proof</h4>
//                 <img
//                   src={`${Base_Url}/uploads/complaints/${selectedComplaint.proof}`}
//                   alt="Proof"
//                   className="max-h-64 mx-auto rounded border"
//                 />
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default UserComplaints;

import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { 
  Search, 
  Filter, 
  AlertTriangle,
  CheckCircle,
  Clock
} from "lucide-react";

const Base_Url = import.meta.env.VITE_API_URL;

function UserComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [stats, setStats] = useState({
    totalComplaints: 0,
    pending: 0,
    resolved: 0,
  });

  // ✅ Fetch user complaints with refresh capability
  const fetchUserComplaints = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${Base_Url}/api/complaints/user/my-complaints`, {
        withCredentials: true,
      });

      if (response.data.success) {
        const list = response.data.complaints || [];
        setComplaints(list);

        // Debug log to verify resolution data
        console.log("📋 User complaints data:", list.map(c => ({
          id: c._id,
          resolved: c.resolved,
          resolutionDescription: c.resolutionDescription,
          resolvedBy: c.resolvedBy
        })));

        const pendingCount = list.filter(c => !c.resolved).length;
        const resolvedCount = list.filter(c => c.resolved).length;

        setStats({
          totalComplaints: list.length,
          pending: pendingCount,
          resolved: resolvedCount,
        });
      }
    } catch (error) {
      console.error("❌ Error fetching user complaints:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserComplaints();
  }, []);

  const filteredComplaints = complaints.filter((complaint) => {
    const matchesSearch =
      complaint.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.compl_Against?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.bookingId?.carId?.carBrand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.bookingId?.carId?.carModel?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.bookingId?.showroomId?.showroomName?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "resolved" && complaint.resolved) ||
      (statusFilter === "pending" && !complaint.resolved);

    return matchesSearch && matchesStatus;
  });

  const formatDate = (date) => new Date(date).toLocaleDateString("en-PK", {
    year: "numeric", month: "short", day: "numeric",
    hour: "2-digit", minute: "2-digit"
  });

  const getStatusBadge = (resolved) => {
    return resolved ? (
      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">Resolved</span>
    ) : (
      <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-medium">Pending</span>
    );
  };

  const viewComplaintDetails = (complaint) => {
    console.log("🔍 Selected complaint resolution data:", {
      resolved: complaint.resolved,
      resolutionDescription: complaint.resolutionDescription,
      resolvedBy: complaint.resolvedBy
    });
    
    setSelectedComplaint(complaint);
    setShowDetails(true);
    document.body.style.overflow = "hidden";
  };

  const closeDetails = () => {
    setSelectedComplaint(null);
    setShowDetails(false);
    document.body.style.overflow = "auto";
  };

  // ✅ GET CORRECT BOOKING DETAILS
  const getBookingDetails = (complaint) => {
    const booking = complaint.bookingId;
    if (!booking) return null;

    return {
      carBrand: booking.carId?.carBrand || "N/A",
      carModel: booking.carId?.carModel || "N/A", 
      plateNumber: booking.carId?.plateNumber || "N/A",
      totalCost: booking.totalPrice || booking.totalCost || "N/A",
      startDate: booking.rentalStartDate || booking.startDate,
      startTime: booking.rentalStartTime || booking.StartTime,
      endDate: booking.rentalEndDate || booking.endDate,
      endTime: booking.rentalEndTime || booking.EndTime,
      showroomName: booking.showroomId?.showroomName || "N/A"
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex justify-center items-center bg-gray-50">
          <p>Loading your complaints...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-grow py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">My Complaints</h1>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-blue-100 p-4 text-center rounded-lg shadow">
              <p className="text-sm font-semibold text-blue-800">Total Complaints</p>
              <p className="text-2xl font-bold text-blue-900">{stats.totalComplaints}</p>
            </div>
            <div className="bg-green-100 p-4 text-center rounded-lg shadow">
              <p className="text-sm font-semibold text-green-800">Resolved</p>
              <p className="text-2xl font-bold text-green-900">{stats.resolved}</p>
            </div>
            <div className="bg-yellow-100 p-4 text-center rounded-lg shadow">
              <p className="text-sm font-semibold text-yellow-800">Pending</p>
              <p className="text-2xl font-bold text-yellow-900">{stats.pending}</p>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white p-4 rounded-lg shadow mb-6 flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search by complaint type, car, or showroom..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-[#C17D3C]"
              />
            </div>
            <div className="sm:w-48 relative">
              <Filter className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-[#C17D3C]"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
          </div>

          {/* Complaints Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {filteredComplaints.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full border border-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-3 border text-left">Complaint Against</th>
                      <th className="px-4 py-3 border text-left">Description</th>
                      <th className="px-4 py-3 border text-left">Car</th>
                      <th className="px-4 py-3 border text-left">Showroom</th>
                      <th className="px-4 py-3 border text-left">Date</th>
                      <th className="px-4 py-3 border text-center">Status</th>
                      <th className="px-4 py-3 border text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredComplaints.map((complaint) => {
                      const bookingDetails = getBookingDetails(complaint);
                      return (
                        <tr key={complaint._id} className="hover:bg-gray-50 border-b">
                          <td className="px-4 py-3">{complaint.compl_Against}</td>
                          <td className="px-4 py-3 text-sm text-gray-600 max-w-xs truncate" title={complaint.description}>
                            {complaint.description}
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {bookingDetails ? (
                              <>
                                <span className="font-medium">{bookingDetails.carBrand} {bookingDetails.carModel}</span>
                                <br />
                                <span className="text-xs text-gray-500">Plate: {bookingDetails.plateNumber}</span>
                              </>
                            ) : (
                              <span className="text-gray-400 text-sm">No car data</span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {bookingDetails?.showroomName || "N/A"}
                          </td>
                          <td className="px-4 py-3 text-gray-500 text-sm">{formatDate(complaint.createdAt)}</td>
                          <td className="px-4 py-3 text-center">{getStatusBadge(complaint.resolved)}</td>
                          <td className="px-4 py-3 text-center">
                            <button
                              onClick={() => viewComplaintDetails(complaint)}
                              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                            >
                              View Details
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-16">
                <AlertTriangle className="mx-auto h-16 w-16 text-gray-400" />
                <h3 className="mt-4 text-lg font-medium text-gray-900">No complaints found</h3>
                <p className="mt-2 text-sm text-gray-500">You haven't submitted any complaints yet.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />

      {/* Modal */}
      {showDetails && selectedComplaint && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4"
          onClick={(e) => e.target === e.currentTarget && closeDetails()}
        >
          <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={closeDetails}
              className="absolute top-4 right-4 text-gray-600 hover:text-black text-2xl"
            >
              ✖
            </button>

            <h3 className="text-2xl font-bold text-[#394A9A] mb-4 border-b pb-2">
              Complaint Details
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-lg mb-2 text-[#394A9A]">Complaint Info</h4>
                <p><strong>Type:</strong> {selectedComplaint.compl_Against}</p>
                <p><strong>Status:</strong> {getStatusBadge(selectedComplaint.resolved)}</p>
                <p><strong>Date:</strong> {formatDate(selectedComplaint.createdAt)}</p>
                <p><strong>Description:</strong></p>
                <p className="bg-white border p-2 rounded text-sm">{selectedComplaint.description}</p>
              </div>

              {selectedComplaint.bookingId && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-lg mb-2 text-[#394A9A]">Booking Details</h4>
                  {(() => {
                    const bookingDetails = getBookingDetails(selectedComplaint);
                    return (
                      <>
                        <p><strong>Car:</strong> {bookingDetails.carBrand} {bookingDetails.carModel}</p>
                        <p><strong>Plate:</strong> {bookingDetails.plateNumber}</p>
                        <p><strong>Total Cost:</strong> Rs. {bookingDetails.totalCost}</p>
                        <p><strong>From:</strong> {bookingDetails.startDate} at {bookingDetails.startTime}</p>
                        <p><strong>To:</strong> {bookingDetails.endDate} at {bookingDetails.endTime}</p>
                        <p><strong>Showroom:</strong> {bookingDetails.showroomName}</p>
                      </>
                    );
                  })()}
                </div>
              )}
            </div>

            {/* ✅ FIXED: Resolution Details Section */}
            {selectedComplaint.resolved && selectedComplaint.resolutionDescription && (
              <div className="mt-4 bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-lg mb-2 text-[#394A9A] flex items-center">
                  <CheckCircle className="mr-2 text-green-600" size={20} />
                  Resolution Details
                </h4>
                <div className="space-y-2">
                  <p><strong>Resolved At:</strong> 
                    {selectedComplaint.resolvedAt ? formatDate(selectedComplaint.resolvedAt) : "N/A"}
                  </p>
                  <p><strong>Resolution Description:</strong></p>
                  <p className="bg-white border p-3 rounded text-sm">
                    {selectedComplaint.resolutionDescription}
                  </p>
                  {selectedComplaint.resolvedBy && (
                    <p><strong>Resolved By:</strong> 
                      <span className="ml-2 bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                        {selectedComplaint.resolvedBy.name || selectedComplaint.resolvedBy.email || "Showroom"}
                      </span>
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Show resolution placeholder if resolved but no description */}
            {selectedComplaint.resolved && !selectedComplaint.resolutionDescription && (
              <div className="mt-4 bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-semibold text-lg mb-2 text-[#394A9A] flex items-center">
                  <CheckCircle className="mr-2 text-yellow-600" size={20} />
                  Resolution Status
                </h4>
                <p className="text-yellow-700">
                  This complaint has been marked as resolved. No additional resolution details were provided.
                </p>
              </div>
            )}

            {selectedComplaint.proof && (
              <div className="mt-4 bg-gray-50 p-4 rounded-lg text-center">
                <h4 className="font-semibold text-lg mb-2 text-[#394A9A]">Proof</h4>
                <img
                  src={`${Base_Url}/uploads/complaints/${selectedComplaint.proof}`}
                  alt="Proof"
                  className="max-h-64 mx-auto rounded border"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default UserComplaints;