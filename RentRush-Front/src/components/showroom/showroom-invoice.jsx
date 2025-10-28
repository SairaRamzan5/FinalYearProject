// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { FiDownload, FiEye, FiSearch, FiFilter, FiRefreshCw } from "react-icons/fi";
// import ShowroomNavbar from "./ShowroomNavbar";
// import Footer from "../Footer";
// import PaymentReceivedDialog from "./PaymentReceivedDialog";

// const Base_Url = import.meta.env.VITE_API_URL;

// const ShowroomInvoiceDashboard = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [invoices, setInvoices] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [refreshing, setRefreshing] = useState(false);
//   const [selectedInvoice, setSelectedInvoice] = useState(null);
//   const [showPaymentDialog, setShowPaymentDialog] = useState(false);

//   const fetchInvoices = async () => {
//     setLoading(true);
//     try {
//       console.log('🔄 Fetching invoices...');
//       const response = await axios.get(`${Base_Url}/api/get-showroom-invoice`, {
//         withCredentials: true,
//       });

//       console.log('✅ Invoices response:', response.data);

//       if (response?.data?.data && response.data.data.length > 0) {
//         setInvoices(response.data.data);
//         setError("");
//       } else {
//         setInvoices([]);
//         setError("No invoices found in database");
//       }
//     } catch (error) {
//       console.error("❌ Error fetching invoices:", error);
//       setInvoices([]);
//       setError("Failed to fetch invoices - " + (error.response?.data?.message || error.message));
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   };

//   const refreshInvoices = () => {
//     setRefreshing(true);
//     fetchInvoices();
//   };

//   useEffect(() => {
//     fetchInvoices();
//   }, []);

//   const openPDF = (invoice) => {
//     if (invoice.invoiceUrl) {
//       window.open(invoice.invoiceUrl, "_blank");
//     } else {
//       alert("Invoice PDF not available for this record");
//     }
//   };

//   const handleDownload = async (invoice) => {
//     try {
//       if (invoice.invoiceUrl) {
//         const link = document.createElement("a");
//         link.href = invoice.invoiceUrl;
//         link.setAttribute("download", `invoice_${invoice.bookingId}.pdf`);
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//       } else {
//         alert("Invoice PDF not available for download");
//       }
//     } catch (error) {
//       console.error("Download error:", error);
//       alert("Failed to download invoice");
//     }
//   };

//   const getPaymentStatus = (invoice) => {
//     if (invoice.isCompleted) return "paid";
//     if (invoice.paymentMethod && invoice.paymentDate) return "paid";
//     return "unpaid";
//   };

//   const isInvoicePaid = (invoice) => {
//     return getPaymentStatus(invoice) === "paid";
//   };

//   const filteredData = invoices.filter((item) => {
//     const searchLower = searchTerm.toLowerCase();
//     const matchesSearch =
//       (item?.bookingId || "").toLowerCase().includes(searchLower) ||
//       (item?.carName || "").toLowerCase().includes(searchLower) ||
//       (item?.user?.ownerName || "").toLowerCase().includes(searchLower) ||
//       (item?.createdAt || "").toLowerCase().includes(searchLower) ||
//       (getPaymentStatus(item).includes(searchLower));

//     const matchesStatus =
//       statusFilter === "all" ||
//       (statusFilter === "paid" && getPaymentStatus(item) === "paid") ||
//       (statusFilter === "unpaid" && getPaymentStatus(item) === "unpaid");

//     return matchesSearch && matchesStatus;
//   });

//   const formatDate = (dateString) => {
//     if (!dateString) return "N/A";
//     const options = { year: "numeric", month: "short", day: "numeric" };
//     return new Date(dateString).toLocaleDateString("en-PK", options);
//   };

//   const getStatusBadge = (invoice) => {
//     const status = getPaymentStatus(invoice);
//     return (
//       <span
//         className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
//           ${
//             status === "paid"
//               ? "bg-green-100 text-green-800"
//               : "bg-red-100 text-red-800"
//           }`}
//       >
//         {status === "paid" ? "Paid" : "Unpaid"}
//       </span>
//     );
//   };

//   return (
//     <>
//       <ShowroomNavbar />
//       <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300">
//         <div className="max-w-7xl mx-auto p-6">
//           <div className="mb-8">
//             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//               <div>
//                 <h1 className="text-3xl font-bold text-gray-800 mb-2">
//                   Invoice Dashboard
//                 </h1>
//                 <p className="text-gray-600">
//                   Manage and view all your invoices in one place
//                 </p>
//               </div>
              
//               <button
//                 onClick={refreshInvoices}
//                 disabled={refreshing}
//                 className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
//               >
//                 <FiRefreshCw className={`mr-2 ${refreshing ? 'animate-spin' : ''}`} />
//                 {refreshing ? 'Refreshing...' : 'Refresh'}
//               </button>
//             </div>
            
//             {error && (
//               <div className="mt-4 p-3 bg-yellow-100 border border-yellow-400 text-yellow-800 rounded-lg">
//                 {error}
//               </div>
//             )}
//           </div>

//           <div className="flex flex-col sm:flex-row justify-between gap-4 mb-8">
//             <div className="relative w-full sm:w-96">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <FiSearch className="text-gray-400" />
//               </div>
//               <input
//                 type="text"
//                 className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
//                 placeholder="Search by ID, car, client, date or status..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>

//             <div className="flex items-center gap-2">
//               <FiFilter className="text-gray-500" />
//               <select
//                 value={statusFilter}
//                 onChange={(e) => setStatusFilter(e.target.value)}
//                 className="block w-full sm:w-40 pl-3 pr-10 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
//               >
//                 <option value="all">All Statuses</option>
//                 <option value="paid">Paid</option>
//                 <option value="unpaid">Unpaid</option>
//               </select>
//             </div>
//           </div>

//           {loading ? (
//             <div className="flex justify-center items-center h-64">
//               <div className="animate-pulse flex flex-col items-center">
//                 <div className="h-12 w-12 bg-blue-400 rounded-full mb-4"></div>
//                 <span className="text-lg text-gray-600">
//                   Loading invoices...
//                 </span>
//               </div>
//             </div>
//           ) : (
//             <div className="bg-white shadow-lg rounded-xl overflow-hidden">
//               <div className="overflow-x-auto">
//                 <table className="min-w-full divide-y divide-gray-200">
//                   <thead className="bg-gray-100">
//                     <tr>
//                       <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-1/6">Date</th>
//                       <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-1/6">Status</th>
//                       <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-1/6">Invoice ID</th>
//                       <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-1/6">Client</th>
//                       <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-1/6">Car Name</th>
//                       <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-1/6">Amount (PKR)</th>
//                       <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-1/6">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200">
//                     {filteredData.length > 0 ? (
//                       filteredData.map((invoice, idx) => (
//                         <tr
//                           key={idx}
//                           className="hover:bg-gray-50 transition-colors"
//                         >
//                           <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 w-1/6">
//                             {formatDate(invoice.createdAt)}
//                           </td>
//                           <td className="px-4 py-4 whitespace-nowrap w-1/6">
//                             {getStatusBadge(invoice)}
//                           </td>
//                           <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 w-1/6">
//                             {invoice.bookingId?.slice(-8)}
//                           </td>
//                           <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 w-1/6">
//                             {invoice.user?.ownerName || "N/A"}
//                           </td>
//                           <td className="px-4 py-4 text-sm text-gray-500 w-1/6">
//                             {invoice.carName || "N/A"}
//                           </td>
//                           <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 w-1/6">
//                             PKR {invoice.balance?.toLocaleString() || "0"}
//                           </td>
//                           <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium w-1/6">
//                             <div className="flex justify-end space-x-3">
//                               <button
//                                 onClick={() => openPDF(invoice)}
//                                 className="text-blue-600 hover:text-blue-800 transition-colors p-1 rounded hover:bg-blue-50"
//                                 title="View Invoice"
//                               >
//                                 <FiEye className="h-5 w-5" />
//                               </button>
                              
//                               {/* ✅ DOWNLOAD BUTTON - ONLY FOR PAID INVOICES */}
//                               {isInvoicePaid(invoice) ? (
//                                 <button
//                                   onClick={() => handleDownload(invoice)}
//                                   className="text-green-600 hover:text-green-800 transition-colors p-1 rounded hover:bg-green-50"
//                                   title="Download Paid Invoice (With PAID Stamp)"
//                                 >
//                                   <FiDownload className="h-5 w-5" />
//                                 </button>
//                               ) : (
//                                 <button
//                                   disabled
//                                   className="text-gray-400 cursor-not-allowed p-1 rounded"
//                                   title="Download available only for paid invoices"
//                                 >
//                                   <FiDownload className="h-5 w-5" />
//                                 </button>
//                               )}
//                             </div>
//                           </td>
//                         </tr>
//                       ))
//                     ) : (
//                       <tr>
//                         <td colSpan="7" className="px-6 py-12 text-center">
//                           <div className="text-gray-500">
//                             {invoices.length === 0
//                               ? "No invoices found"
//                               : "No invoices matching your search criteria"}
//                           </div>
//                           <button
//                             onClick={() => {
//                               setSearchTerm("");
//                               setStatusFilter("all");
//                             }}
//                             className="mt-4 px-4 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors"
//                           >
//                             Reset Filters
//                           </button>
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default ShowroomInvoiceDashboard;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiDownload, FiEye, FiSearch, FiFilter, FiRefreshCw } from "react-icons/fi";
import ShowroomNavbar from "./ShowroomNavbar";
import Footer from "../Footer";
import PaymentReceivedDialog from "./PaymentReceivedDialog";

const Base_Url = import.meta.env.VITE_API_URL;

const ShowroomInvoiceDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [refreshing, setRefreshing] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [downloadingInvoice, setDownloadingInvoice] = useState(null);

  const fetchInvoices = async () => {
    setLoading(true);
    try {
      console.log('🔄 Fetching invoices...');
      const response = await axios.get(`${Base_Url}/api/get-showroom-invoice`, {
        withCredentials: true,
      });

      console.log('✅ Invoices response:', response.data);

      if (response?.data?.data && response.data.data.length > 0) {
        setInvoices(response.data.data);
        setError("");
      } else {
        setInvoices([]);
        setError("No invoices found in database");
      }
    } catch (error) {
      console.error("❌ Error fetching invoices:", error);
      setInvoices([]);
      setError("Failed to fetch invoices - " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const refreshInvoices = () => {
    setRefreshing(true);
    fetchInvoices();
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const openPDF = (invoice) => {
    if (invoice.invoiceUrl) {
      window.open(invoice.invoiceUrl, "_blank");
    } else {
      alert("Invoice PDF not available for this record");
    }
  };

  const handleDownload = async (invoice) => {
    try {
      if (invoice.invoiceUrl) {
        setDownloadingInvoice(invoice.bookingId);
        
        // For paid invoices, we want to download the version with PAID stamp
        if (isInvoicePaid(invoice)) {
          // Try to get the paid version of the invoice
          try {
            const response = await axios.get(
              `${Base_Url}/api/invoice/${invoice._id}/download-paid`, 
              {
                responseType: 'blob',
                withCredentials: true
              }
            );
            
            // Create download link
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `invoice_paid_${invoice.bookingId}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
            
          } catch (downloadError) {
            console.warn('⚠️ Paid invoice download failed, falling back to regular download:', downloadError);
            // Fallback to regular download
            const link = document.createElement("a");
            link.href = invoice.invoiceUrl;
            link.setAttribute("download", `invoice_${invoice.bookingId}.pdf`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }
        } else {
          // For unpaid invoices, use regular download
          const link = document.createElement("a");
          link.href = invoice.invoiceUrl;
          link.setAttribute("download", `invoice_${invoice.bookingId}.pdf`);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      } else {
        alert("Invoice PDF not available for download");
      }
    } catch (error) {
      console.error("Download error:", error);
      alert("Failed to download invoice");
    } finally {
      setDownloadingInvoice(null);
    }
  };

  // Alternative download method that generates paid stamp on client side
  const handleDownloadWithPaidStamp = async (invoice) => {
    try {
      setDownloadingInvoice(invoice.bookingId);
      
      if (!invoice.invoiceUrl) {
        alert("Invoice PDF not available for download");
        return;
      }

      // Fetch the original PDF
      const response = await fetch(invoice.invoiceUrl);
      const pdfBlob = await response.blob();
      
      // Create a download link
      const url = window.URL.createObjectURL(pdfBlob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `invoice_paid_${invoice.bookingId}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error("Download with paid stamp error:", error);
      alert("Failed to download invoice with paid stamp");
    } finally {
      setDownloadingInvoice(null);
    }
  };

  const getPaymentStatus = (invoice) => {
    if (invoice.isCompleted) return "paid";
    if (invoice.paymentMethod && invoice.paymentDate) return "paid";
    return "unpaid";
  };

  const isInvoicePaid = (invoice) => {
    return getPaymentStatus(invoice) === "paid";
  };

  const filteredData = invoices.filter((item) => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      (item?.bookingId || "").toLowerCase().includes(searchLower) ||
      (item?.carName || "").toLowerCase().includes(searchLower) ||
      (item?.user?.ownerName || "").toLowerCase().includes(searchLower) ||
      (item?.createdAt || "").toLowerCase().includes(searchLower) ||
      (getPaymentStatus(item).includes(searchLower));

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "paid" && getPaymentStatus(item) === "paid") ||
      (statusFilter === "unpaid" && getPaymentStatus(item) === "unpaid");

    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-PK", options);
  };

  const getStatusBadge = (invoice) => {
    const status = getPaymentStatus(invoice);
    return (
      <span
        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
          ${
            status === "paid"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
      >
        {status === "paid" ? "Paid" : "Unpaid"}
      </span>
    );
  };

  return (
    <>
      <ShowroomNavbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300">
        <div className="max-w-7xl mx-auto p-6">
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  Invoice Dashboard
                </h1>
                <p className="text-gray-600">
                  Manage and view all your invoices in one place
                </p>
              </div>
              
              <button
                onClick={refreshInvoices}
                disabled={refreshing}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                <FiRefreshCw className={`mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                {refreshing ? 'Refreshing...' : 'Refresh'}
              </button>
            </div>
            
            {error && (
              <div className="mt-4 p-3 bg-yellow-100 border border-yellow-400 text-yellow-800 rounded-lg">
                {error}
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-8">
            <div className="relative w-full sm:w-96">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                placeholder="Search by ID, car, client, date or status..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2">
              <FiFilter className="text-gray-500" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="block w-full sm:w-40 pl-3 pr-10 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
              >
                <option value="all">All Statuses</option>
                <option value="paid">Paid</option>
                <option value="unpaid">Unpaid</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-pulse flex flex-col items-center">
                <div className="h-12 w-12 bg-blue-400 rounded-full mb-4"></div>
                <span className="text-lg text-gray-600">
                  Loading invoices...
                </span>
              </div>
            </div>
          ) : (
            <div className="bg-white shadow-lg rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-1/6">Date</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-1/6">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-1/6">Invoice ID</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-1/6">Client</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-1/6">Car Name</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-1/6">Amount (PKR)</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-1/6">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredData.length > 0 ? (
                      filteredData.map((invoice, idx) => (
                        <tr
                          key={idx}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 w-1/6">
                            {formatDate(invoice.createdAt)}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap w-1/6">
                            {getStatusBadge(invoice)}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 w-1/6">
                            {invoice.bookingId?.slice(-8)}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 w-1/6">
                            {invoice.user?.ownerName || "N/A"}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500 w-1/6">
                            {invoice.carName || "N/A"}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 w-1/6">
                            PKR {invoice.balance?.toLocaleString() || "0"}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium w-1/6">
                            <div className="flex justify-end space-x-3">
                              <button
                                onClick={() => openPDF(invoice)}
                                className="text-blue-600 hover:text-blue-800 transition-colors p-1 rounded hover:bg-blue-50"
                                title="View Invoice"
                              >
                                <FiEye className="h-5 w-5" />
                              </button>
                              
                              {/* ✅ DOWNLOAD BUTTON - ONLY FOR PAID INVOICES WITH RED STAMP */}
                              {isInvoicePaid(invoice) ? (
                                <button
                                  onClick={() => handleDownload(invoice)}
                                  disabled={downloadingInvoice === invoice.bookingId}
                                  className="text-green-600 hover:text-green-800 transition-colors p-1 rounded hover:bg-green-50 disabled:opacity-50"
                                  title="Download Paid Invoice (With RED PAID Stamp)"
                                >
                                  {downloadingInvoice === invoice.bookingId ? (
                                    <FiRefreshCw className="h-5 w-5 animate-spin" />
                                  ) : (
                                    <FiDownload className="h-5 w-5" />
                                  )}
                                </button>
                              ) : (
                                <button
                                  disabled
                                  className="text-gray-400 cursor-not-allowed p-1 rounded"
                                  title="Download available only for paid invoices"
                                >
                                  <FiDownload className="h-5 w-5" />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="px-6 py-12 text-center">
                          <div className="text-gray-500">
                            {invoices.length === 0
                              ? "No invoices found"
                              : "No invoices matching your search criteria"}
                          </div>
                          <button
                            onClick={() => {
                              setSearchTerm("");
                              setStatusFilter("all");
                            }}
                            className="mt-4 px-4 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors"
                          >
                            Reset Filters
                          </button>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ShowroomInvoiceDashboard;
