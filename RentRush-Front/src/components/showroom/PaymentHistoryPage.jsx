// components/showroom/PaymentHistoryPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Toast from "../Toast";
import ShowroomNavbar from "./ShowroomNavbar";

const Base_Url = import.meta.env.VITE_API_URL || "http://localhost:5000";

const PaymentHistoryPage = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const fetchPaymentHistory = async () => {
    try {
      setLoading(true);
      console.log("🔄 Fetching payment history...");
      
      // ✅ TRY DETAILED VERSION FIRST, THEN SIMPLE VERSION
      let response;
      try {
        response = await axios.get(
          `${Base_Url}/api/payments/payment-history-details`,
          { withCredentials: true }
        );
      } catch (detailsError) {
        console.log("⚠️ Detailed version failed, trying simple version...");
        response = await axios.get(
          `${Base_Url}/api/payments/payment-history`,
          { withCredentials: true }
        );
      }
      
      console.log("✅ Payment history response:", response.data);
      
      if (response.data.success) {
        setPayments(response.data.data || []);
      } else {
        throw new Error(response.data.message || "Failed to fetch payment history");
      }
    } catch (err) {
      console.error("❌ Payment history error:", err);
      Toast(
        err.response?.data?.message || err.message || "Failed to load payment history",
        "error"
      );
      setPayments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPaymentHistory();
  }, []);

  const filterPayments = () => {
    if (!payments || payments.length === 0) return [];
    
    const now = new Date();
    
    switch (filter) {
      case "today":
        return payments.filter(payment => {
          const paymentDate = new Date(payment.paymentDate);
          return paymentDate.toDateString() === now.toDateString();
        });
      
      case "week":
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        return payments.filter(payment => 
          new Date(payment.paymentDate) >= weekAgo
        );
      
      case "month":
        const monthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
        return payments.filter(payment => 
          new Date(payment.paymentDate) >= monthAgo
        );
      
      default:
        return payments;
    }
  };

  const filteredPayments = filterPayments();
  const totalRevenue = filteredPayments.reduce((sum, payment) => sum + (payment.amount || 0), 0);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPaymentMethodColor = (method) => {
    switch (method) {
      case 'Cash': return 'bg-green-100 text-green-800';
      case 'Card': return 'bg-blue-100 text-blue-800';
      case 'JazzCash': return 'bg-purple-100 text-purple-800';
      case 'EasyPaisa': return 'bg-orange-100 text-orange-800';
      case 'Bank Transfer': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // ✅ HELPER FUNCTION TO GET CAR DETAILS
  const getCarDetails = (payment) => {
    // For detailed version
    if (payment.carDetails) {
      return {
        brand: payment.carDetails.carBrand || 'N/A',
        model: payment.carDetails.carModel || 'N/A',
        number: payment.carDetails.carNumber || payment.carDetails.plateNumber || 'N/A'
      };
    }
    
    // For simple version - you might need to fetch car details separately
    return {
      brand: 'N/A',
      model: 'N/A', 
      number: 'N/A'
    };
  };

  // ✅ HELPER FUNCTION TO GET CUSTOMER DETAILS
  const getCustomerDetails = (payment) => {
    // For detailed version
    if (payment.customerDetails) {
      return {
        name: payment.customerDetails.ownerName || 'N/A',
        phone: payment.customerDetails.phone || 'N/A'
      };
    }
    
    // For simple version
    return {
      name: 'N/A',
      phone: 'N/A'
    };
  };

  // ✅ HELPER FUNCTION TO GET BOOKING ID
  const getBookingId = (payment) => {
    if (payment.bookingDetails && payment.bookingDetails._id) {
      return payment.bookingDetails._id.toString().slice(-8);
    }
    if (payment.bookingId) {
      return payment.bookingId.toString().slice(-8);
    }
    return 'N/A';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C17D3C] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading payment history...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <ShowroomNavbar />
      <div className="p-8 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-[#0B132A]">
              Payment History
            </h2>
            
            {/* Filters */}
            <div className="flex gap-4 items-center">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C17D3C] focus:border-transparent"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">Last 7 Days</option>
                <option value="month">Last 30 Days</option>
              </select>
              
              <div className="bg-white px-4 py-2 rounded-lg border border-gray-300">
                <span className="text-gray-600">Total: </span>
                <span className="font-bold text-[#C17D3C]">
                  PKR {totalRevenue.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Payment History Table */}
          {filteredPayments && filteredPayments.length > 0 ? (
            <>
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Transaction
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Car Details
                        </th>
                        {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Customer
                        </th> */}
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amount
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Method
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date & Time
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredPayments.map((payment) => {
                        const carDetails = getCarDetails(payment);
                        const customerDetails = getCustomerDetails(payment);
                        const bookingId = getBookingId(payment);
                        
                        return (
                          <tr key={payment._id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {payment.transactionId || 'N/A'}
                                </div>
                                <div className="text-sm text-gray-500">
                                  Booking #{bookingId}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {carDetails.brand} {carDetails.model}
                              </div>
                              <div className="text-sm text-gray-500">
                                {carDetails.number}
                              </div>
                            </td>
                            {/* <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {customerDetails.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {customerDetails.phone}
                              </div>
                            </td> */}
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-semibold text-green-600">
                                PKR {(payment.amount || 0).toLocaleString()}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPaymentMethodColor(payment.paymentMethod)}`}>
                                {payment.paymentMethod || 'N/A'}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {formatDate(payment.paymentDate)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
                <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-500">
                  <h3 className="text-lg font-semibold text-gray-600">Total Payments</h3>
                  <p className="text-2xl font-bold text-gray-800">{filteredPayments.length}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-500">
                  <h3 className="text-lg font-semibold text-gray-600">Total Revenue</h3>
                  <p className="text-2xl font-bold text-[#C17D3C]">PKR {totalRevenue.toLocaleString()}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-purple-500">
                  <h3 className="text-lg font-semibold text-gray-600">This Month</h3>
                  <p className="text-2xl font-bold text-gray-800">
                    {payments.filter(p => {
                      const paymentDate = new Date(p.paymentDate);
                      const now = new Date();
                      return paymentDate.getMonth() === now.getMonth() && 
                             paymentDate.getFullYear() === now.getFullYear();
                    }).length}
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-orange-500">
                  <h3 className="text-lg font-semibold text-gray-600">Today</h3>
                  <p className="text-2xl font-bold text-gray-800">
                    {payments.filter(p => {
                      const paymentDate = new Date(p.paymentDate);
                      return paymentDate.toDateString() === new Date().toDateString();
                    }).length}
                  </p>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl shadow-lg">
              <div className="text-gray-500 text-lg mb-4">
                {payments.length === 0 ? "No payment history found" : "No payments match your filter"}
              </div>
              <p className="text-gray-400">
                {payments.length === 0 
                  ? "Payments will appear here once they are confirmed through the Payments page." 
                  : "Try changing your filter to see more results."}
              </p>
              {payments.length === 0 && (
                <div className="mt-6">
                  <a 
                    href="/showroom/payments" 
                    className="bg-[#C17D3C] text-white px-6 py-3 rounded-lg hover:bg-[#B06F35] transition-colors inline-block"
                  >
                    Go to Payments Page
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PaymentHistoryPage;

