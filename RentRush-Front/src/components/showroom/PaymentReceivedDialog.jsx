// // // // // // // import React, { useState } from "react";
// // // // // // // import axios from "axios";
// // // // // // // import Toast from "../Toast";

// // // // // // // const Base_Url = import.meta.env.VITE_API_URL || "http://localhost:5000";

// // // // // // // const PaymentReceivedDialog = ({ bookingId, carData, onClose, onPaymentSuccess }) => {
// // // // // // //   const [paymentMethod, setPaymentMethod] = useState("");
// // // // // // //   const [loading, setLoading] = useState(false);

// // // // // // //   const normalizePaymentMethod = (value) => {
// // // // // // //     if (!value) return "";
    
// // // // // // //     const methodMap = {
// // // // // // //       'cash': 'cash',
// // // // // // //       'card': 'card', 
// // // // // // //       'bank': 'bank',
// // // // // // //       'bank transfer': 'bank',
// // // // // // //       'jazzcash': 'jazzcash',
// // // // // // //       'easypaisa': 'easypaisa'
// // // // // // //     };
    
// // // // // // //     return methodMap[value.toLowerCase()] || value;
// // // // // // //   };

// // // // // // //   const handleConfirm = async () => {
// // // // // // //     if (!paymentMethod) {
// // // // // // //       Toast("Please select a payment method", "error");
// // // // // // //       return;
// // // // // // //     }

// // // // // // //     try {
// // // // // // //       setLoading(true);
// // // // // // //       const method = normalizePaymentMethod(paymentMethod);

// // // // // // //       // ✅ USE THE CONFIRM-PAYMENT ENDPOINT
// // // // // // //       const response = await axios.post(
// // // // // // //         `${Base_Url}/api/payments/confirm-payment`,
// // // // // // //         { 
// // // // // // //           bookingId: bookingId,
// // // // // // //           paymentMethod: method 
// // // // // // //         },
// // // // // // //         { withCredentials: true }
// // // // // // //       );

// // // // // // //       if (response.data.success) {
// // // // // // //         Toast("Payment confirmed successfully! Invoice marked as paid, booking status updated, and car is now available.", "success");
        
// // // // // // //         // Call the callback to refresh the parent component
// // // // // // //         if (onPaymentSuccess) {
// // // // // // //           onPaymentSuccess();
// // // // // // //         }
        
// // // // // // //         onClose();
// // // // // // //       } else {
// // // // // // //         throw new Error(response.data.message || "Payment confirmation failed");
// // // // // // //       }
// // // // // // //     } catch (err) {
// // // // // // //       console.error("Payment confirmation error:", err);
// // // // // // //       Toast(
// // // // // // //         err.response?.data?.message || err.message || "Failed to confirm payment",
// // // // // // //         "error"
// // // // // // //       );
// // // // // // //     } finally {
// // // // // // //       setLoading(false);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   // Calculate total amount from carData
// // // // // // //   const calculateTotalAmount = () => {
// // // // // // //     if (!carData?.rentalInfo) return 0;
    
// // // // // // //     const rentalInfo = carData.rentalInfo;
// // // // // // //     const baseAmount = rentalInfo.totalPrice || 0;
// // // // // // //     const overdueCharge = rentalInfo.overdueCharge || 0;
// // // // // // //     const maintenanceCost = rentalInfo.maintenanceCost || {};
    
// // // // // // //     let maintenanceTotal = 0;
// // // // // // //     if (typeof maintenanceCost === 'object') {
// // // // // // //       maintenanceTotal = Object.values(maintenanceCost).reduce((sum, cost) => {
// // // // // // //         const costNum = parseFloat(cost) || 0;
// // // // // // //         return sum + costNum;
// // // // // // //       }, 0);
// // // // // // //     }
    
// // // // // // //     return baseAmount + overdueCharge + maintenanceTotal;
// // // // // // //   };

// // // // // // //   const totalAmount = calculateTotalAmount();

// // // // // // //   return (
// // // // // // //     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
// // // // // // //       <div className="bg-white w-full max-w-md rounded-xl shadow-2xl flex flex-col">
// // // // // // //         {/* Header */}
// // // // // // //         <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
// // // // // // //           <div className="flex justify-between items-center">
// // // // // // //             <h3 className="text-xl font-semibold text-gray-800">
// // // // // // //               Payment Confirmation
// // // // // // //             </h3>
// // // // // // //             <button 
// // // // // // //               onClick={onClose} 
// // // // // // //               className="text-gray-400 hover:text-gray-600 text-xl font-bold"
// // // // // // //               disabled={loading}
// // // // // // //             >
// // // // // // //               ✕
// // // // // // //             </button>
// // // // // // //           </div>
// // // // // // //           {/* <p className="text-sm text-gray-500 mt-1">
// // // // // // //             Booking #{bookingId}
// // // // // // //           </p>
// // // // // // //           {carData && (
// // // // // // //             <div className="mt-2 text-sm text-gray-600">
// // // // // // //               <p><strong>Car:</strong> {carData.carBrand} {carData.carModel}</p>
// // // // // // //               <p><strong>Client:</strong> {carData.rentalInfo?.userName || "N/A"}</p>
// // // // // // //               <p><strong>Total Amount:</strong> PKR {totalAmount.toLocaleString()}</p>
// // // // // // //             </div>
// // // // // // //           )} */}
// // // // // // //         </div>

// // // // // // //         {/* Payment Methods */}
// // // // // // //         <div className="px-6 py-5 space-y-3">
// // // // // // //           <h4 className="text-lg font-medium text-gray-800 mb-3">Select Payment Method</h4>
          
// // // // // // //           {[
// // // // // // //             { value: "cash", label: "Cash Payment" },
// // // // // // //             { value: "card", label: "Credit/Debit Card" },
// // // // // // //             { value: "jazzcash", label: "JazzCash" },
// // // // // // //             { value: "easypaisa", label: "EasyPaisa" },
// // // // // // //             { value: "bank", label: "Bank Transfer" }
// // // // // // //           ].map((method) => (
// // // // // // //             <label
// // // // // // //               key={method.value}
// // // // // // //               className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-blue-50 cursor-pointer transition-colors duration-200"
// // // // // // //             >
// // // // // // //               <input
// // // // // // //                 type="radio"
// // // // // // //                 name="paymentMethod"
// // // // // // //                 value={method.value}
// // // // // // //                 checked={paymentMethod === method.value}
// // // // // // //                 onChange={() => setPaymentMethod(method.value)}
// // // // // // //                 className="h-4 w-4 text-blue-600 focus:ring-blue-500"
// // // // // // //                 disabled={loading}
// // // // // // //               />
// // // // // // //               <span className="ml-3 text-gray-700 font-medium">
// // // // // // //                 {method.label}
// // // // // // //               </span>
// // // // // // //             </label>
// // // // // // //           ))}
// // // // // // //         </div>


// // // // // // //         {/* Footer */}
// // // // // // //         <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
// // // // // // //           <button
// // // // // // //             onClick={onClose}
// // // // // // //             disabled={loading}
// // // // // // //             className="py-2 px-5 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors duration-200 font-medium"
// // // // // // //           >
// // // // // // //             Cancel
// // // // // // //           </button>
// // // // // // //           <button
// // // // // // //             onClick={handleConfirm}
// // // // // // //             disabled={loading || !paymentMethod}
// // // // // // //             className="py-2 px-5 text-white bg-[#C17D3C] rounded-lg hover:bg-[#C17D3C] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors duration-200 font-medium"
// // // // // // //           >
// // // // // // //             {loading ? (
// // // // // // //               <>
// // // // // // //                 <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
// // // // // // //                 Processing...
// // // // // // //               </>
// // // // // // //             ) : (
// // // // // // //               <>
// // // // // // //                 <span>✓</span>
// // // // // // //                 Confirm Payment Received
// // // // // // //               </>
// // // // // // //             )}
// // // // // // //           </button>
// // // // // // //         </div>
// // // // // // //       </div>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // };

// // // // // // // export default PaymentReceivedDialog;

// // // // // // import React, { useState } from "react";
// // // // // // import axios from "axios";
// // // // // // import Toast from "../Toast";

// // // // // // const Base_Url = import.meta.env.VITE_API_URL || "http://localhost:5000";

// // // // // // const PaymentReceivedDialog = ({ bookingId, carData, onClose, onPaymentSuccess }) => {
// // // // // //   const [paymentMethod, setPaymentMethod] = useState("");
// // // // // //   const [loading, setLoading] = useState(false);

// // // // // //   const normalizePaymentMethod = (value) => {
// // // // // //     if (!value) return "";
    
// // // // // //     const methodMap = {
// // // // // //       'cash': 'Cash',
// // // // // //       'card': 'Card', 
// // // // // //       'bank': 'Bank Transfer',
// // // // // //       'bank transfer': 'Bank Transfer',
// // // // // //       'jazzcash': 'JazzCash',
// // // // // //       'easypaisa': 'EasyPaisa'
// // // // // //     };
    
// // // // // //     return methodMap[value.toLowerCase()] || value;
// // // // // //   };

// // // // // //   const handleConfirm = async () => {
// // // // // //     if (!paymentMethod) {
// // // // // //       Toast("Please select a payment method", "error");
// // // // // //       return;
// // // // // //     }

// // // // // //     try {
// // // // // //       setLoading(true);
// // // // // //       const method = normalizePaymentMethod(paymentMethod);

// // // // // //       console.log("📤 Confirming payment for booking:", bookingId, "with method:", method);

// // // // // //       // ✅ USE THE CONFIRM-PAYMENT ENDPOINT
// // // // // //       const response = await axios.post(
// // // // // //         `${Base_Url}/api/payments/confirm-payment`,
// // // // // //         { 
// // // // // //           bookingId: bookingId,
// // // // // //           paymentMethod: method 
// // // // // //         },
// // // // // //         { withCredentials: true }
// // // // // //       );

// // // // // //       console.log("✅ Payment confirmation response:", response.data);

// // // // // //       if (response.data.success) {
// // // // // //         Toast("Payment confirmed successfully! Invoice marked as paid, booking status updated, and car is now available.", "success");
        
// // // // // //         // Call the callback to refresh the parent component
// // // // // //         if (onPaymentSuccess) {
// // // // // //           onPaymentSuccess();
// // // // // //         }
        
// // // // // //         onClose();
// // // // // //       } else {
// // // // // //         throw new Error(response.data.message || "Payment confirmation failed");
// // // // // //       }
// // // // // //     } catch (err) {
// // // // // //       console.error("❌ Payment confirmation error:", err);
// // // // // //       Toast(
// // // // // //         err.response?.data?.message || err.message || "Failed to confirm payment",
// // // // // //         "error"
// // // // // //       );
// // // // // //     } finally {
// // // // // //       setLoading(false);
// // // // // //     }
// // // // // //   };

// // // // // //   // Calculate total amount from carData
// // // // // //   const calculateTotalAmount = () => {
// // // // // //     if (!carData?.rentalInfo) return 0;
    
// // // // // //     const rentalInfo = carData.rentalInfo;
// // // // // //     const baseAmount = rentalInfo.totalPrice || 0;
// // // // // //     const overdueCharge = rentalInfo.overdueCharge || 0;
// // // // // //     const maintenanceCost = rentalInfo.maintenanceCost || {};
    
// // // // // //     let maintenanceTotal = 0;
// // // // // //     if (typeof maintenanceCost === 'object') {
// // // // // //       maintenanceTotal = Object.values(maintenanceCost).reduce((sum, cost) => {
// // // // // //         const costNum = parseFloat(cost) || 0;
// // // // // //         return sum + costNum;
// // // // // //       }, 0);
// // // // // //     }
    
// // // // // //     return baseAmount + overdueCharge + maintenanceTotal;
// // // // // //   };

// // // // // //   const totalAmount = calculateTotalAmount();

// // // // // //   return (
// // // // // //     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
// // // // // //       <div className="bg-white w-full max-w-md rounded-xl shadow-2xl flex flex-col">
// // // // // //         {/* Header */}
// // // // // //         <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
// // // // // //           <div className="flex justify-between items-center">
// // // // // //             <h3 className="text-xl font-semibold text-gray-800">
// // // // // //               Payment Confirmation
// // // // // //             </h3>
// // // // // //             <button 
// // // // // //               onClick={onClose} 
// // // // // //               className="text-gray-400 hover:text-gray-600 text-xl font-bold"
// // // // // //               disabled={loading}
// // // // // //             >
// // // // // //               ✕
// // // // // //             </button>
// // // // // //           </div>
// // // // // //           <p className="text-sm text-gray-500 mt-1">
// // // // // //             Booking #{bookingId?.slice(-8)}
// // // // // //           </p>
// // // // // //           {carData && (
// // // // // //             <div className="mt-2 text-sm text-gray-600">
// // // // // //               <p><strong>Car:</strong> {carData.carBrand} {carData.carModel}</p>
// // // // // //               <p><strong>Total Amount:</strong> PKR {totalAmount.toLocaleString()}</p>
// // // // // //             </div>
// // // // // //           )}
// // // // // //         </div>

// // // // // //         {/* Payment Methods */}
// // // // // //         <div className="px-6 py-5 space-y-3">
// // // // // //           <h4 className="text-lg font-medium text-gray-800 mb-3">Select Payment Method</h4>
          
// // // // // //           {[
// // // // // //             { value: "cash", label: "Cash Payment" },
// // // // // //             { value: "card", label: "Credit/Debit Card" },
// // // // // //             { value: "jazzcash", label: "JazzCash" },
// // // // // //             { value: "easypaisa", label: "EasyPaisa" },
// // // // // //             { value: "bank", label: "Bank Transfer" }
// // // // // //           ].map((method) => (
// // // // // //             <label
// // // // // //               key={method.value}
// // // // // //               className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-blue-50 cursor-pointer transition-colors duration-200"
// // // // // //             >
// // // // // //               <input
// // // // // //                 type="radio"
// // // // // //                 name="paymentMethod"
// // // // // //                 value={method.value}
// // // // // //                 checked={paymentMethod === method.value}
// // // // // //                 onChange={() => setPaymentMethod(method.value)}
// // // // // //                 className="h-4 w-4 text-blue-600 focus:ring-blue-500"
// // // // // //                 disabled={loading}
// // // // // //               />
// // // // // //               <span className="ml-3 text-gray-700 font-medium">
// // // // // //                 {method.label}
// // // // // //               </span>
// // // // // //             </label>
// // // // // //           ))}
// // // // // //         </div>

// // // // // //         {/* Footer */}
// // // // // //         <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
// // // // // //           <button
// // // // // //             onClick={onClose}
// // // // // //             disabled={loading}
// // // // // //             className="py-2 px-5 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors duration-200 font-medium"
// // // // // //           >
// // // // // //             Cancel
// // // // // //           </button>
// // // // // //           <button
// // // // // //             onClick={handleConfirm}
// // // // // //             disabled={loading || !paymentMethod}
// // // // // //             className="py-2 px-5 text-white bg-[#C17D3C] rounded-lg hover:bg-[#B06F35] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors duration-200 font-medium"
// // // // // //           >
// // // // // //             {loading ? (
// // // // // //               <>
// // // // // //                 <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
// // // // // //                 Processing...
// // // // // //               </>
// // // // // //             ) : (
// // // // // //               <>
// // // // // //                 <span>✓</span>
// // // // // //                 Confirm Payment Received
// // // // // //               </>
// // // // // //             )}
// // // // // //           </button>
// // // // // //         </div>
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default PaymentReceivedDialog;

// // // // // import React, { useState } from "react";
// // // // // import axios from "axios";
// // // // // import Toast from "../Toast";

// // // // // const Base_Url = import.meta.env.VITE_API_URL || "http://localhost:5000";

// // // // // const PaymentReceivedDialog = ({ bookingId, carData, onClose, onPaymentSuccess }) => {
// // // // //   const [paymentMethod, setPaymentMethod] = useState("");
// // // // //   const [loading, setLoading] = useState(false);

// // // // //   const normalizePaymentMethod = (value) => {
// // // // //     if (!value) return "";
    
// // // // //     const methodMap = {
// // // // //       'cash': 'Cash',
// // // // //       'card': 'Card', 
// // // // //       'bank': 'Bank Transfer',
// // // // //       'bank transfer': 'Bank Transfer',
// // // // //       'jazzcash': 'JazzCash',
// // // // //       'easypaisa': 'EasyPaisa'
// // // // //     };
    
// // // // //     return methodMap[value.toLowerCase()] || value;
// // // // //   };

// // // // //   const handleConfirm = async () => {
// // // // //     if (!paymentMethod) {
// // // // //       Toast("Please select a payment method", "error");
// // // // //       return;
// // // // //     }

// // // // //     try {
// // // // //       setLoading(true);
// // // // //       const method = normalizePaymentMethod(paymentMethod);

// // // // //       console.log("📤 Confirming payment for booking:", bookingId, "with method:", method);

// // // // //       // ✅ USE THE CONFIRM-PAYMENT ENDPOINT
// // // // //       const response = await axios.post(
// // // // //         `${Base_Url}/api/payments/confirm-payment`,
// // // // //         { 
// // // // //           bookingId: bookingId,
// // // // //           paymentMethod: method 
// // // // //         },
// // // // //         { 
// // // // //           withCredentials: true,
// // // // //           headers: {
// // // // //             'Content-Type': 'application/json'
// // // // //           }
// // // // //         }
// // // // //       );

// // // // //       console.log("✅ Payment confirmation response:", response.data);

// // // // //       if (response.data.success) {
// // // // //         Toast("Payment confirmed successfully! Invoice marked as paid, booking status updated, and car is now available.", "success");
        
// // // // //         // Call the callback to refresh the parent component
// // // // //         if (onPaymentSuccess) {
// // // // //           onPaymentSuccess();
// // // // //         }
        
// // // // //         onClose();
// // // // //       } else {
// // // // //         throw new Error(response.data.message || "Payment confirmation failed");
// // // // //       }
// // // // //     } catch (err) {
// // // // //       console.error("❌ Payment confirmation error:", err);
// // // // //       console.error("Error response:", err.response?.data);
// // // // //       console.error("Error status:", err.response?.status);
      
// // // // //       let errorMessage = "Failed to confirm payment";
      
// // // // //       if (err.response?.data?.message) {
// // // // //         errorMessage = err.response.data.message;
// // // // //       } else if (err.response?.data?.error) {
// // // // //         errorMessage = err.response.data.error;
// // // // //       } else if (err.message) {
// // // // //         errorMessage = err.message;
// // // // //       }
      
// // // // //       // Specific error handling
// // // // //       if (err.response?.status === 401) {
// // // // //         errorMessage = "Please login again";
// // // // //       } else if (err.response?.status === 403) {
// // // // //         errorMessage = "Showroom not approved for payments";
// // // // //       } else if (err.response?.status === 404) {
// // // // //         errorMessage = "Booking not found";
// // // // //       }
      
// // // // //       Toast(errorMessage, "error");
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   // Calculate total amount from carData
// // // // //   const calculateTotalAmount = () => {
// // // // //     if (!carData?.rentalInfo) return 0;
    
// // // // //     const rentalInfo = carData.rentalInfo;
// // // // //     const baseAmount = rentalInfo.totalPrice || 0;
// // // // //     const overdueCharge = rentalInfo.overdueCharge || 0;
// // // // //     const maintenanceCost = rentalInfo.maintenanceCost || {};
    
// // // // //     let maintenanceTotal = 0;
// // // // //     if (typeof maintenanceCost === 'object') {
// // // // //       maintenanceTotal = Object.values(maintenanceCost).reduce((sum, cost) => {
// // // // //         const costNum = parseFloat(cost) || 0;
// // // // //         return sum + costNum;
// // // // //       }, 0);
// // // // //     }
    
// // // // //     return baseAmount + overdueCharge + maintenanceTotal;
// // // // //   };

// // // // //   const totalAmount = calculateTotalAmount();

// // // // //   return (
// // // // //     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
// // // // //       <div className="bg-white w-full max-w-md rounded-xl shadow-2xl flex flex-col">
// // // // //         {/* Header */}
// // // // //         <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
// // // // //           <div className="flex justify-between items-center">
// // // // //             <h3 className="text-xl font-semibold text-gray-800">
// // // // //               Payment Confirmation
// // // // //             </h3>
// // // // //             <button 
// // // // //               onClick={onClose} 
// // // // //               className="text-gray-400 hover:text-gray-600 text-xl font-bold"
// // // // //               disabled={loading}
// // // // //             >
// // // // //               ✕
// // // // //             </button>
// // // // //           </div>
// // // // //           <p className="text-sm text-gray-500 mt-1">
// // // // //             Booking #{bookingId?.slice(-8)}
// // // // //           </p>
// // // // //           {carData && (
// // // // //             <div className="mt-2 text-sm text-gray-600">
// // // // //               <p><strong>Car:</strong> {carData.carBrand} {carData.carModel}</p>
// // // // //               <p><strong>Total Amount:</strong> PKR {totalAmount.toLocaleString()}</p>
// // // // //             </div>
// // // // //           )}
// // // // //         </div>

// // // // //         {/* Payment Methods */}
// // // // //         <div className="px-6 py-5 space-y-3">
// // // // //           <h4 className="text-lg font-medium text-gray-800 mb-3">Select Payment Method</h4>
          
// // // // //           {[
// // // // //             { value: "cash", label: "Cash Payment" },
// // // // //             { value: "card", label: "Credit/Debit Card" },
// // // // //             { value: "jazzcash", label: "JazzCash" },
// // // // //             { value: "easypaisa", label: "EasyPaisa" },
// // // // //             { value: "bank", label: "Bank Transfer" }
// // // // //           ].map((method) => (
// // // // //             <label
// // // // //               key={method.value}
// // // // //               className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-blue-50 cursor-pointer transition-colors duration-200"
// // // // //             >
// // // // //               <input
// // // // //                 type="radio"
// // // // //                 name="paymentMethod"
// // // // //                 value={method.value}
// // // // //                 checked={paymentMethod === method.value}
// // // // //                 onChange={() => setPaymentMethod(method.value)}
// // // // //                 className="h-4 w-4 text-blue-600 focus:ring-blue-500"
// // // // //                 disabled={loading}
// // // // //               />
// // // // //               <span className="ml-3 text-gray-700 font-medium">
// // // // //                 {method.label}
// // // // //               </span>
// // // // //             </label>
// // // // //           ))}
// // // // //         </div>

// // // // //         {/* Footer */}
// // // // //         <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
// // // // //           <button
// // // // //             onClick={onClose}
// // // // //             disabled={loading}
// // // // //             className="py-2 px-5 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors duration-200 font-medium"
// // // // //           >
// // // // //             Cancel
// // // // //           </button>
// // // // //           <button
// // // // //             onClick={handleConfirm}
// // // // //             disabled={loading || !paymentMethod}
// // // // //             className="py-2 px-5 text-white bg-[#C17D3C] rounded-lg hover:bg-[#B06F35] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors duration-200 font-medium"
// // // // //           >
// // // // //             {loading ? (
// // // // //               <>
// // // // //                 <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
// // // // //                 Processing...
// // // // //               </>
// // // // //             ) : (
// // // // //               <>
// // // // //                 <span>✓</span>
// // // // //                 Confirm Payment Received
// // // // //               </>
// // // // //             )}
// // // // //           </button>
// // // // //         </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default PaymentReceivedDialog;

// // // // import React, { useState } from "react";
// // // // import axios from "axios";
// // // // import Toast from "../Toast";

// // // // const Base_Url = import.meta.env.VITE_API_URL || "http://localhost:5000";

// // // // const PaymentReceivedDialog = ({ bookingId, carData, onClose, onPaymentSuccess }) => {
// // // //   const [paymentMethod, setPaymentMethod] = useState("");
// // // //   const [loading, setLoading] = useState(false);

// // // //   const normalizePaymentMethod = (value) => {
// // // //     if (!value) return "";
    
// // // //     const methodMap = {
// // // //       'cash': 'Cash',
// // // //       'card': 'Card', 
// // // //       'bank': 'Bank Transfer',
// // // //       'bank transfer': 'Bank Transfer',
// // // //       'jazzcash': 'JazzCash',
// // // //       'easypaisa': 'EasyPaisa'
// // // //     };
    
// // // //     return methodMap[value.toLowerCase()] || value;
// // // //   };

// // // //   const handleConfirm = async () => {
// // // //     if (!paymentMethod) {
// // // //       Toast("Please select a payment method", "error");
// // // //       return;
// // // //     }

// // // //     try {
// // // //       setLoading(true);
// // // //       const method = normalizePaymentMethod(paymentMethod);

// // // //       console.log("📤 Confirming payment for booking:", bookingId, "with method:", method);

// // // //       // ✅ USE THE CONFIRM-PAYMENT ENDPOINT
// // // //       const response = await axios.post(
// // // //         `${Base_Url}/api/payments/confirm-payment`,
// // // //         { 
// // // //           bookingId: bookingId,
// // // //           paymentMethod: method 
// // // //         },
// // // //         { 
// // // //           withCredentials: true,
// // // //           headers: {
// // // //             'Content-Type': 'application/json'
// // // //           }
// // // //         }
// // // //       );

// // // //       console.log("✅ Payment confirmation response:", response.data);

// // // //       if (response.data.success) {
// // // //         Toast("Payment confirmed successfully! Invoice marked as paid, booking status updated, and car is now available.", "success");
        
// // // //         // Call the callback to refresh the parent component
// // // //         if (onPaymentSuccess) {
// // // //           onPaymentSuccess();
// // // //         }
        
// // // //         onClose();
// // // //       } else {
// // // //         throw new Error(response.data.message || "Payment confirmation failed");
// // // //       }
// // // //     } catch (err) {
// // // //       console.error("❌ Payment confirmation error:", err);
// // // //       console.error("Error response:", err.response?.data);
// // // //       console.error("Error status:", err.response?.status);
      
// // // //       let errorMessage = "Failed to confirm payment";
      
// // // //       if (err.response?.data?.message) {
// // // //         errorMessage = err.response.data.message;
// // // //       } else if (err.response?.data?.error) {
// // // //         errorMessage = err.response.data.error;
// // // //       } else if (err.message) {
// // // //         errorMessage = err.message;
// // // //       }
      
// // // //       // Specific error handling
// // // //       if (err.response?.status === 401) {
// // // //         errorMessage = "Please login again";
// // // //       } else if (err.response?.status === 403) {
// // // //         errorMessage = "Showroom not approved for payments";
// // // //       } else if (err.response?.status === 404) {
// // // //         errorMessage = "Booking not found";
// // // //       }
      
// // // //       Toast(errorMessage, "error");
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   // Calculate total amount from carData
// // // //   const calculateTotalAmount = () => {
// // // //     if (!carData?.rentalInfo) return 0;
    
// // // //     const rentalInfo = carData.rentalInfo;
// // // //     const baseAmount = rentalInfo.totalPrice || 0;
// // // //     const overdueCharge = rentalInfo.overdueCharge || 0;
// // // //     const maintenanceCost = rentalInfo.maintenanceCost || {};
    
// // // //     let maintenanceTotal = 0;
// // // //     if (typeof maintenanceCost === 'object') {
// // // //       maintenanceTotal = Object.values(maintenanceCost).reduce((sum, cost) => {
// // // //         const costNum = parseFloat(cost) || 0;
// // // //         return sum + costNum;
// // // //       }, 0);
// // // //     }
    
// // // //     return baseAmount + overdueCharge + maintenanceTotal;
// // // //   };

// // // //   const totalAmount = calculateTotalAmount();

// // // //   return (
// // // //     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
// // // //       <div className="bg-white w-full max-w-md rounded-xl shadow-2xl flex flex-col">
// // // //         {/* Header */}
// // // //         <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
// // // //           <div className="flex justify-between items-center">
// // // //             <h3 className="text-xl font-semibold text-gray-800">
// // // //               Payment Confirmation
// // // //             </h3>
// // // //             <button 
// // // //               onClick={onClose} 
// // // //               className="text-gray-400 hover:text-gray-600 text-xl font-bold"
// // // //               disabled={loading}
// // // //             >
// // // //               ✕
// // // //             </button>
// // // //           </div>
// // // //           <p className="text-sm text-gray-500 mt-1">
// // // //             Booking #{bookingId?.slice(-8)}
// // // //           </p>
// // // //           {carData && (
// // // //             <div className="mt-2 text-sm text-gray-600">
// // // //               <p><strong>Car:</strong> {carData.carBrand} {carData.carModel}</p>
// // // //               <p><strong>Total Amount:</strong> PKR {totalAmount.toLocaleString()}</p>
// // // //             </div>
// // // //           )}
// // // //         </div>

// // // //         {/* Payment Methods */}
// // // //         <div className="px-6 py-5 space-y-3">
// // // //           <h4 className="text-lg font-medium text-gray-800 mb-3">Select Payment Method</h4>
          
// // // //           {[
// // // //             { value: "cash", label: "Cash Payment" },
// // // //             { value: "card", label: "Credit/Debit Card" },
// // // //             { value: "jazzcash", label: "JazzCash" },
// // // //             { value: "easypaisa", label: "EasyPaisa" },
// // // //             { value: "bank", label: "Bank Transfer" }
// // // //           ].map((method) => (
// // // //             <label
// // // //               key={method.value}
// // // //               className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-blue-50 cursor-pointer transition-colors duration-200"
// // // //             >
// // // //               <input
// // // //                 type="radio"
// // // //                 name="paymentMethod"
// // // //                 value={method.value}
// // // //                 checked={paymentMethod === method.value}
// // // //                 onChange={() => setPaymentMethod(method.value)}
// // // //                 className="h-4 w-4 text-blue-600 focus:ring-blue-500"
// // // //                 disabled={loading}
// // // //               />
// // // //               <span className="ml-3 text-gray-700 font-medium">
// // // //                 {method.label}
// // // //               </span>
// // // //             </label>
// // // //           ))}
// // // //         </div>

// // // //         {/* Footer */}
// // // //         <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
// // // //           <button
// // // //             onClick={onClose}
// // // //             disabled={loading}
// // // //             className="py-2 px-5 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors duration-200 font-medium"
// // // //           >
// // // //             Cancel
// // // //           </button>
// // // //           <button
// // // //             onClick={handleConfirm}
// // // //             disabled={loading || !paymentMethod}
// // // //             className="py-2 px-5 text-white bg-[#C17D3C] rounded-lg hover:bg-[#B06F35] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors duration-200 font-medium"
// // // //           >
// // // //             {loading ? (
// // // //               <>
// // // //                 <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
// // // //                 Processing...
// // // //               </>
// // // //             ) : (
// // // //               <>
// // // //                 <span>✓</span>
// // // //                 Confirm Payment Received
// // // //               </>
// // // //             )}
// // // //           </button>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default PaymentReceivedDialog;

// // // import React, { useState } from "react";
// // // import axios from "axios";
// // // import Toast from "../Toast";

// // // const Base_Url = import.meta.env.VITE_API_URL || "http://localhost:5000";

// // // const PaymentReceivedDialog = ({ bookingId, carData, onClose, onPaymentSuccess }) => {
// // //   const [paymentMethod, setPaymentMethod] = useState("");
// // //   const [loading, setLoading] = useState(false);

// // //   const normalizePaymentMethod = (value) => {
// // //     if (!value) return "";
    
// // //     const methodMap = {
// // //       'cash': 'Cash',
// // //       'card': 'Card', 
// // //       'bank': 'Bank Transfer',
// // //       'bank transfer': 'Bank Transfer',
// // //       'jazzcash': 'JazzCash',
// // //       'easypaisa': 'EasyPaisa'
// // //     };
    
// // //     return methodMap[value.toLowerCase()] || value;
// // //   };

// // //   const handleConfirm = async () => {
// // //     if (!paymentMethod) {
// // //       Toast("Please select a payment method", "error");
// // //       return;
// // //     }

// // //     try {
// // //       setLoading(true);
// // //       const method = normalizePaymentMethod(paymentMethod);

// // //       console.log("📤 Confirming payment for booking:", bookingId, "with method:", method);

// // //       const response = await axios.post(
// // //         `${Base_Url}/api/payments/confirm-payment`,
// // //         { 
// // //           bookingId: bookingId,
// // //           paymentMethod: method 
// // //         },
// // //         { 
// // //           withCredentials: true,
// // //           headers: {
// // //             'Content-Type': 'application/json'
// // //           }
// // //         }
// // //       );

// // //       console.log("✅ Payment confirmation response:", response.data);

// // //       if (response.data.success) {
// // //         Toast("Payment confirmed successfully! Invoice marked as paid, booking status updated, and car is now available.", "success");
        
// // //         if (onPaymentSuccess) {
// // //           onPaymentSuccess();
// // //         }
        
// // //         onClose();
// // //       } else {
// // //         throw new Error(response.data.message || "Payment confirmation failed");
// // //       }
// // //     } catch (err) {
// // //       console.error("❌ Payment confirmation error:", err);
      
// // //       let errorMessage = "Failed to confirm payment";
      
// // //       if (err.response?.data?.message) {
// // //         errorMessage = err.response.data.message;
// // //       } else if (err.response?.data?.error) {
// // //         errorMessage = err.response.data.error;
// // //       } else if (err.message) {
// // //         errorMessage = err.message;
// // //       }
      
// // //       Toast(errorMessage, "error");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const calculateTotalAmount = () => {
// // //     if (!carData?.rentalInfo) return 0;
    
// // //     const rentalInfo = carData.rentalInfo;
// // //     const baseAmount = rentalInfo.totalPrice || 0;
// // //     const overdueCharge = rentalInfo.overdueCharge || 0;
// // //     const maintenanceCost = rentalInfo.maintenanceCost || {};
    
// // //     let maintenanceTotal = 0;
// // //     if (typeof maintenanceCost === 'object') {
// // //       maintenanceTotal = Object.values(maintenanceCost).reduce((sum, cost) => {
// // //         const costNum = parseFloat(cost) || 0;
// // //         return sum + costNum;
// // //       }, 0);
// // //     }
    
// // //     return baseAmount + overdueCharge + maintenanceTotal;
// // //   };

// // //   const totalAmount = calculateTotalAmount();

// // //   return (
// // //     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
// // //       <div className="bg-white w-full max-w-md rounded-xl shadow-2xl flex flex-col">
// // //         <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
// // //           <div className="flex justify-between items-center">
// // //             <h3 className="text-xl font-semibold text-gray-800">
// // //               Payment Confirmation
// // //             </h3>
// // //             <button 
// // //               onClick={onClose} 
// // //               className="text-gray-400 hover:text-gray-600 text-xl font-bold"
// // //               disabled={loading}
// // //             >
// // //               ✕
// // //             </button>
// // //           </div>
// // //           <p className="text-sm text-gray-500 mt-1">
// // //             Booking #{bookingId?.slice(-8)}
// // //           </p>
// // //           {carData && (
// // //             <div className="mt-2 text-sm text-gray-600">
// // //               <p><strong>Car:</strong> {carData.carBrand} {carData.carModel}</p>
// // //               <p><strong>Total Amount:</strong> PKR {totalAmount.toLocaleString()}</p>
// // //             </div>
// // //           )}
// // //         </div>

// // //         <div className="px-6 py-5 space-y-3">
// // //           <h4 className="text-lg font-medium text-gray-800 mb-3">Select Payment Method</h4>
          
// // //           {[
// // //             { value: "cash", label: "Cash Payment" },
// // //             { value: "card", label: "Credit/Debit Card" },
// // //             { value: "jazzcash", label: "JazzCash" },
// // //             { value: "easypaisa", label: "EasyPaisa" },
// // //             { value: "bank", label: "Bank Transfer" }
// // //           ].map((method) => (
// // //             <label
// // //               key={method.value}
// // //               className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-blue-50 cursor-pointer transition-colors duration-200"
// // //             >
// // //               <input
// // //                 type="radio"
// // //                 name="paymentMethod"
// // //                 value={method.value}
// // //                 checked={paymentMethod === method.value}
// // //                 onChange={() => setPaymentMethod(method.value)}
// // //                 className="h-4 w-4 text-blue-600 focus:ring-blue-500"
// // //                 disabled={loading}
// // //               />
// // //               <span className="ml-3 text-gray-700 font-medium">
// // //                 {method.label}
// // //               </span>
// // //             </label>
// // //           ))}
// // //         </div>

// // //         <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
// // //           <button
// // //             onClick={onClose}
// // //             disabled={loading}
// // //             className="py-2 px-5 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors duration-200 font-medium"
// // //           >
// // //             Cancel
// // //           </button>
// // //           <button
// // //             onClick={handleConfirm}
// // //             disabled={loading || !paymentMethod}
// // //             className="py-2 px-5 text-white bg-[#C17D3C] rounded-lg hover:bg-[#B06F35] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors duration-200 font-medium"
// // //           >
// // //             {loading ? (
// // //               <>
// // //                 <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
// // //                 Processing...
// // //               </>
// // //             ) : (
// // //               <>
// // //                 <span>✓</span>
// // //                 Confirm Payment Received
// // //               </>
// // //             )}
// // //           </button>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default PaymentReceivedDialog;


// // import React, { useState } from "react";
// // import axios from "axios";
// // import Toast from "../Toast";

// // const Base_Url = import.meta.env.VITE_API_URL || "http://localhost:5000";

// // const PaymentReceivedDialog = ({ bookingId, carData, onClose, onPaymentSuccess }) => {
// //   const [paymentMethod, setPaymentMethod] = useState("");
// //   const [loading, setLoading] = useState(false);
// //   const [downloadLoading, setDownloadLoading] = useState(false);

// //   const normalizePaymentMethod = (value) => {
// //     if (!value) return "";
    
// //     const methodMap = {
// //       'cash': 'Cash',
// //       'card': 'Card', 
// //       'bank': 'Bank Transfer',
// //       'bank transfer': 'Bank Transfer',
// //       'jazzcash': 'JazzCash',
// //       'easypaisa': 'EasyPaisa'
// //     };
    
// //     return methodMap[value.toLowerCase()] || value;
// //   };

// //   // ✅ AUTOMATIC INVOICE DOWNLOAD FUNCTION
// //   const downloadUpdatedInvoice = async (invoiceUrl, bookingId) => {
// //     try {
// //       setDownloadLoading(true);
// //       console.log('📥 Downloading updated invoice...', invoiceUrl);
      
// //       if (invoiceUrl) {
// //         // Direct download approach
// //         const link = document.createElement("a");
// //         link.href = invoiceUrl;
// //         link.setAttribute("download", `invoice_paid_${bookingId}.pdf`);
// //         link.setAttribute("target", "_blank");
// //         document.body.appendChild(link);
// //         link.click();
// //         document.body.removeChild(link);
        
// //         Toast("✅ Updated invoice downloaded with PAID stamp!", "success");
// //       } else {
// //         Toast("Invoice URL not available", "error");
// //       }
// //     } catch (error) {
// //       console.error("❌ Invoice download error:", error);
// //       Toast("Failed to download invoice", "error");
// //     } finally {
// //       setDownloadLoading(false);
// //     }
// //   };

// //   // ✅ ENHANCED PAYMENT CONFIRMATION WITH AUTO-DOWNLOAD
// //   const handleConfirm = async () => {
// //     if (!paymentMethod) {
// //       Toast("Please select a payment method", "error");
// //       return;
// //     }

// //     try {
// //       setLoading(true);
// //       const method = normalizePaymentMethod(paymentMethod);

// //       console.log("📤 Confirming payment for booking:", bookingId, "with method:", method);

// //       const response = await axios.post(
// //         `${Base_Url}/api/payments/confirm-payment`,
// //         { 
// //           bookingId: bookingId,
// //           paymentMethod: method 
// //         },
// //         { 
// //           withCredentials: true,
// //           headers: {
// //             'Content-Type': 'application/json'
// //           }
// //         }
// //       );

// //       console.log("✅ Payment confirmation response:", response.data);

// //       if (response.data.success) {
// //         const successMessage = "Payment confirmed successfully! Invoice marked as paid, booking status updated, and car is now available.";
// //         Toast(successMessage, "success");
        
// //         // ✅ AUTOMATICALLY DOWNLOAD UPDATED INVOICE
// //         if (response.data.data?.invoice) {
// //           // Wait for invoice generation to complete
// //           setTimeout(() => {
// //             // Get the updated invoice URL from response or generate it
// //             const invoiceUrl = response.data.data.invoice.invoiceUrl || 
// //                              `http://localhost:3000/invoices/invoice_${bookingId}_paid.pdf`;
            
// //             downloadUpdatedInvoice(invoiceUrl, bookingId);
// //           }, 2000);
// //         }

// //         // Call the callback to refresh the parent component
// //         if (onPaymentSuccess) {
// //           onPaymentSuccess();
// //         }
        
// //         // Close dialog after download
// //         setTimeout(() => {
// //           onClose();
// //         }, 3000);
        
// //       } else {
// //         throw new Error(response.data.message || "Payment confirmation failed");
// //       }
// //     } catch (err) {
// //       console.error("❌ Payment confirmation error:", err);
      
// //       let errorMessage = "Failed to confirm payment";
      
// //       if (err.response?.data?.message) {
// //         errorMessage = err.response.data.message;
// //       } else if (err.response?.data?.error) {
// //         errorMessage = err.response.data.error;
// //       } else if (err.message) {
// //         errorMessage = err.message;
// //       }
      
// //       Toast(errorMessage, "error");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const calculateTotalAmount = () => {
// //     if (!carData?.rentalInfo) return 0;
    
// //     const rentalInfo = carData.rentalInfo;
// //     const baseAmount = rentalInfo.totalPrice || 0;
// //     const overdueCharge = rentalInfo.overdueCharge || 0;
// //     const maintenanceCost = rentalInfo.maintenanceCost || {};
    
// //     let maintenanceTotal = 0;
// //     if (typeof maintenanceCost === 'object') {
// //       maintenanceTotal = Object.values(maintenanceCost).reduce((sum, cost) => {
// //         const costNum = parseFloat(cost) || 0;
// //         return sum + costNum;
// //       }, 0);
// //     }
    
// //     return baseAmount + overdueCharge + maintenanceTotal;
// //   };

// //   const totalAmount = calculateTotalAmount();

// //   return (
// //     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
// //       <div className="bg-white w-full max-w-md rounded-xl shadow-2xl flex flex-col">
// //         {/* Header */}
// //         <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
// //           <div className="flex justify-between items-center">
// //             <h3 className="text-xl font-semibold text-gray-800">
// //               Payment Confirmation
// //             </h3>
// //             <button 
// //               onClick={onClose} 
// //               className="text-gray-400 hover:text-gray-600 text-xl font-bold"
// //               disabled={loading || downloadLoading}
// //             >
// //               ✕
// //             </button>
// //           </div>
// //           <p className="text-sm text-gray-500 mt-1">
// //             Booking #{bookingId?.slice(-8)}
// //           </p>
// //           {carData && (
// //             <div className="mt-2 text-sm text-gray-600">
// //               <p><strong>Car:</strong> {carData.carBrand} {carData.carModel}</p>
// //               <p><strong>Total Amount:</strong> PKR {totalAmount.toLocaleString()}</p>
// //             </div>
// //           )}
// //         </div>

// //         {/* Payment Methods */}
// //         <div className="px-6 py-5 space-y-3">
// //           <h4 className="text-lg font-medium text-gray-800 mb-3">Select Payment Method</h4>
          
// //           {[
// //             { value: "cash", label: "Cash Payment" },
// //             { value: "card", label: "Credit/Debit Card" },
// //             { value: "jazzcash", label: "JazzCash" },
// //             { value: "easypaisa", label: "EasyPaisa" },
// //             { value: "bank", label: "Bank Transfer" }
// //           ].map((method) => (
// //             <label
// //               key={method.value}
// //               className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-blue-50 cursor-pointer transition-colors duration-200"
// //             >
// //               <input
// //                 type="radio"
// //                 name="paymentMethod"
// //                 value={method.value}
// //                 checked={paymentMethod === method.value}
// //                 onChange={() => setPaymentMethod(method.value)}
// //                 className="h-4 w-4 text-blue-600 focus:ring-blue-500"
// //                 disabled={loading || downloadLoading}
// //               />
// //               <span className="ml-3 text-gray-700 font-medium">
// //                 {method.label}
// //               </span>
// //             </label>
// //           ))}
// //         </div>

// //         {/* ✅ DOWNLOAD STATUS MESSAGE */}
// //         {(loading || downloadLoading) && (
// //           <div className="px-6 py-3 bg-blue-50 border-t border-blue-200">
// //             <div className="flex items-center justify-center space-x-2">
// //               <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
// //               <span className="text-blue-700 text-sm font-medium">
// //                 {downloadLoading ? "Downloading updated invoice with PAID stamp..." : "Processing payment..."}
// //               </span>
// //             </div>
// //           </div>
// //         )}

// //         {/* Footer */}
// //         <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
// //           <button
// //             onClick={onClose}
// //             disabled={loading || downloadLoading}
// //             className="py-2 px-5 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors duration-200 font-medium"
// //           >
// //             Cancel
// //           </button>
// //           <button
// //             onClick={handleConfirm}
// //             disabled={loading || downloadLoading || !paymentMethod}
// //             className="py-2 px-5 text-white bg-[#C17D3C] rounded-lg hover:bg-[#B06F35] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors duration-200 font-medium"
// //           >
// //             {loading ? (
// //               <>
// //                 <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
// //                 Processing...
// //               </>
// //             ) : (
// //               <>
// //                 <span>✓</span>
// //                 Confirm Payment & Download Invoice
// //               </>
// //             )}
// //           </button>
// //         </div>

// //         {/* ✅ DOWNLOAD INFO MESSAGE */}
// //         <div className="bg-green-50 px-6 py-3 border-t border-green-200">
// //           <p className="text-green-700 text-sm text-center">
// //             <strong>Note:</strong> Updated invoice with <span className="text-red-600 font-bold">RED PAID</span> stamp will automatically download after payment confirmation
// //           </p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default PaymentReceivedDialog;

// import React, { useState } from "react";
// import axios from "axios";
// import Toast from "../Toast";
// import { FiDollarSign } from "react-icons/fi";

// const Base_Url = import.meta.env.VITE_API_URL || "http://localhost:5000";

// const PaymentReceivedDialog = ({ bookingId, carData, onClose, onPaymentSuccess }) => {
//   const [paymentMethod, setPaymentMethod] = useState("");
//   const [loading, setLoading] = useState(false);

//   const normalizePaymentMethod = (value) => {
//     if (!value) return "";
    
//     const methodMap = {
//       'cash': 'Cash',
//       'card': 'Card', 
//       'bank': 'Bank Transfer',
//       'bank transfer': 'Bank Transfer',
//       'jazzcash': 'JazzCash',
//       'easypaisa': 'EasyPaisa'
//     };
    
//     return methodMap[value.toLowerCase()] || value;
//   };

//   // ✅ PAYMENT CONFIRMATION WITHOUT AUTO-DOWNLOAD
//   const handleConfirm = async () => {
//     if (!paymentMethod) {
//       Toast("Please select a payment method", "error");
//       return;
//     }

//     try {
//       setLoading(true);
//       const method = normalizePaymentMethod(paymentMethod);

//       console.log("📤 Confirming payment for booking:", bookingId, "with method:", method);

//       const response = await axios.post(
//         `${Base_Url}/api/payments/confirm-payment`,
//         { 
//           bookingId: bookingId,
//           paymentMethod: method 
//         },
//         { 
//           withCredentials: true,
//           headers: {
//             'Content-Type': 'application/json'
//           }
//         }
//       );

//       console.log("✅ Payment confirmation response:", response.data);

//       if (response.data.success) {
//         const successMessage = "Payment confirmed successfully! Invoice marked as paid, booking status updated, and car is now available.";
//         Toast(successMessage, "success");
        
//         // Call the callback to refresh the parent component
//         if (onPaymentSuccess) {
//           onPaymentSuccess();
//         }
        
//         // Close dialog immediately
//         onClose();
        
//       } else {
//         throw new Error(response.data.message || "Payment confirmation failed");
//       }
//     } catch (err) {
//       console.error("❌ Payment confirmation error:", err);
      
//       let errorMessage = "Failed to confirm payment";
      
//       if (err.response?.data?.message) {
//         errorMessage = err.response.data.message;
//       } else if (err.response?.data?.error) {
//         errorMessage = err.response.data.error;
//       } else if (err.message) {
//         errorMessage = err.message;
//       }
      
//       Toast(errorMessage, "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const calculateTotalAmount = () => {
//     if (!carData?.rentalInfo) return 0;
    
//     const rentalInfo = carData.rentalInfo;
//     const baseAmount = rentalInfo.totalPrice || 0;
//     const overdueCharge = rentalInfo.overdueCharge || 0;
//     const maintenanceCost = rentalInfo.maintenanceCost || {};
    
//     let maintenanceTotal = 0;
//     if (typeof maintenanceCost === 'object') {
//       maintenanceTotal = Object.values(maintenanceCost).reduce((sum, cost) => {
//         const costNum = parseFloat(cost) || 0;
//         return sum + costNum;
//       }, 0);
//     }
    
//     return baseAmount + overdueCharge + maintenanceTotal;
//   };

//   const totalAmount = calculateTotalAmount();

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
//       <div className="bg-white w-full max-w-md rounded-xl shadow-2xl flex flex-col">
//         {/* Header */}
//         <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
//           <div className="flex justify-between items-center">
//             <h3 className="text-xl font-semibold text-gray-800">
//               Payment Confirmation
//             </h3>
//             <button 
//               onClick={onClose} 
//               className="text-gray-400 hover:text-gray-600 text-xl font-bold"
//               disabled={loading}
//             >
//               ✕
//             </button>
//           </div>
//           <p className="text-sm text-gray-500 mt-1">
//             Booking #{bookingId?.slice(-8)}
//           </p>
//           {carData && (
//             <div className="mt-2 text-sm text-gray-600">
//               <p><strong>Car:</strong> {carData.carBrand} {carData.carModel}</p>
//               <p><strong>Total Amount:</strong> PKR {totalAmount.toLocaleString()}</p>
//             </div>
//           )}
//         </div>

//         {/* Payment Methods */}
//         <div className="px-6 py-5 space-y-3">
//           <h4 className="text-lg font-medium text-gray-800 mb-3">Select Payment Method</h4>
          
//           {[
//             { value: "cash", label: "Cash Payment" },
//             { value: "card", label: "Credit/Debit Card" },
//             { value: "jazzcash", label: "JazzCash" },
//             { value: "easypaisa", label: "EasyPaisa" },
//             { value: "bank", label: "Bank Transfer" }
//           ].map((method) => (
//             <label
//               key={method.value}
//               className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-blue-50 cursor-pointer transition-colors duration-200"
//             >
//               <input
//                 type="radio"
//                 name="paymentMethod"
//                 value={method.value}
//                 checked={paymentMethod === method.value}
//                 onChange={() => setPaymentMethod(method.value)}
//                 className="h-4 w-4 text-blue-600 focus:ring-blue-500"
//                 disabled={loading}
//               />
//               <span className="ml-3 text-gray-700 font-medium">
//                 {method.label}
//               </span>
//             </label>
//           ))}
//         </div>

//         {/* ✅ LOADING STATUS MESSAGE */}
//         {loading && (
//           <div className="px-6 py-3 bg-blue-50 border-t border-blue-200">
//             <div className="flex items-center justify-center space-x-2">
//               <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
//               <span className="text-blue-700 text-sm font-medium">
//                 Processing payment...
//               </span>
//             </div>
//           </div>
//         )}

//         {/* Footer */}
//         <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
//           <button
//             onClick={onClose}
//             disabled={loading}
//             className="py-2 px-5 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors duration-200 font-medium"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleConfirm}
//             disabled={loading || !paymentMethod}
//             className="py-2 px-5 text-white bg-[#C17D3C] rounded-lg hover:bg-[#B06F35] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors duration-200 font-medium"
//           >
//             {loading ? (
//               <>
//                 <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                 Processing...
//               </>
//             ) : (
//               <>
//                 <FiDollarSign className="h-4 w-4" />
//                 Confirm Payment
//               </>
//             )}
//           </button>
//         </div>

//         {/* ✅ SUCCESS INFO MESSAGE */}
//         <div className="bg-green-50 px-6 py-3 border-t border-green-200">
//           <p className="text-green-700 text-sm text-center">
//             <strong>Note:</strong> Invoice will be updated with <span className="text-red-600 font-bold">PAID</span> status and can be downloaded later from the dashboard
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PaymentReceivedDialog;

// components/PaymentReceivedDialog.jsx
import React, { useState } from "react";
import axios from "axios";
import Toast from "../Toast";
import { FiDollarSign } from "react-icons/fi";

const Base_Url = import.meta.env.VITE_API_URL || "http://localhost:5000";

const PaymentReceivedDialog = ({ bookingId, carData, onClose, onPaymentSuccess }) => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [loading, setLoading] = useState(false);

  const normalizePaymentMethod = (value) => {
    if (!value) return "";
    
    const methodMap = {
      'cash': 'Cash',
      'card': 'Card', 
      'bank': 'Bank Transfer',
      'bank transfer': 'Bank Transfer',
      'jazzcash': 'JazzCash',
      'easypaisa': 'EasyPaisa'
    };
    
    return methodMap[value.toLowerCase()] || value;
  };

  // ✅ UPDATED: PAYMENT CONFIRMATION WITH HISTORY
  const handleConfirm = async () => {
    if (!paymentMethod) {
      Toast("Please select a payment method", "error");
      return;
    }

    try {
      setLoading(true);
      const method = normalizePaymentMethod(paymentMethod);

      console.log("📤 Confirming payment for booking:", bookingId, "with method:", method);

      const response = await axios.post(
        `${Base_Url}/api/payments/confirm-payment`,
        { 
          bookingId: bookingId,
          paymentMethod: method 
        },
        { 
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      console.log("✅ Payment confirmation response:", response.data);

      if (response.data.success) {
        const successMessage = "Payment confirmed successfully! Transaction recorded in history.";
        Toast(successMessage, "success");
        
        // Call the callback to refresh the parent component
        if (onPaymentSuccess) {
          onPaymentSuccess();
        }
        
        // Close dialog immediately
        onClose();
        
      } else {
        throw new Error(response.data.message || "Payment confirmation failed");
      }
    } catch (err) {
      console.error("❌ Payment confirmation error:", err);
      
      let errorMessage = "Failed to confirm payment";
      
      if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.response?.data?.error) {
        errorMessage = err.response.data.error;
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      Toast(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  const calculateTotalAmount = () => {
    if (!carData?.rentalInfo) return 0;
    
    const rentalInfo = carData.rentalInfo;
    const baseAmount = rentalInfo.totalPrice || 0;
    const overdueCharge = rentalInfo.overdueCharge || 0;
    const maintenanceCost = rentalInfo.maintenanceCost || {};
    
    let maintenanceTotal = 0;
    if (typeof maintenanceCost === 'object') {
      maintenanceTotal = Object.values(maintenanceCost).reduce((sum, cost) => {
        const costNum = parseFloat(cost) || 0;
        return sum + costNum;
      }, 0);
    }
    
    return baseAmount + overdueCharge + maintenanceTotal;
  };

  const totalAmount = calculateTotalAmount();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white w-full max-w-md rounded-xl shadow-2xl flex flex-col">
        {/* Header */}
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-gray-800">
              Payment Confirmation
            </h3>
            <button 
              onClick={onClose} 
              className="text-gray-400 hover:text-gray-600 text-xl font-bold"
              disabled={loading}
            >
              ✕
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Booking #{bookingId?.slice(-8)}
          </p>
          {carData && (
            <div className="mt-2 text-sm text-gray-600">
              <p><strong>Car:</strong> {carData.carBrand} {carData.carModel}</p>
              <p><strong>Total Amount:</strong> PKR {totalAmount.toLocaleString()}</p>
            </div>
          )}
        </div>

        {/* Payment Methods */}
        <div className="px-6 py-5 space-y-3">
          <h4 className="text-lg font-medium text-gray-800 mb-3">Select Payment Method</h4>
          
          {[
            { value: "cash", label: "Cash Payment" },
            { value: "card", label: "Credit/Debit Card" },
            { value: "jazzcash", label: "JazzCash" },
            { value: "easypaisa", label: "EasyPaisa" },
            { value: "bank", label: "Bank Transfer" }
          ].map((method) => (
            <label
              key={method.value}
              className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-blue-50 cursor-pointer transition-colors duration-200"
            >
              <input
                type="radio"
                name="paymentMethod"
                value={method.value}
                checked={paymentMethod === method.value}
                onChange={() => setPaymentMethod(method.value)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                disabled={loading}
              />
              <span className="ml-3 text-gray-700 font-medium">
                {method.label}
              </span>
            </label>
          ))}
        </div>

        {/* ✅ LOADING STATUS MESSAGE */}
        {loading && (
          <div className="px-6 py-3 bg-blue-50 border-t border-blue-200">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-blue-700 text-sm font-medium">
                Processing payment...
              </span>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="py-2 px-5 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors duration-200 font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={loading || !paymentMethod}
            className="py-2 px-5 text-white bg-[#C17D3C] rounded-lg hover:bg-[#B06F35] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors duration-200 font-medium"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Processing...
              </>
            ) : (
              <>
                <FiDollarSign className="h-4 w-4" />
                Confirm Payment
              </>
            )}
          </button>
        </div>

        {/* ✅ UPDATED SUCCESS INFO MESSAGE */}
        <div className="bg-green-50 px-6 py-3 border-t border-green-200">
          <p className="text-green-700 text-sm text-center">
            <strong>Note:</strong> This transaction will be saved in payment history for future reference
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentReceivedDialog;