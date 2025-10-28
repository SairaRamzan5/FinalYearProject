import axios from "axios";
import { useEffect, useState } from "react";
import { 
  FiLoader, FiAlertCircle, FiCalendar, FiEye, FiUser, FiDollarSign, 
  FiCheckCircle, FiXCircle, FiMapPin, FiMail, FiPhone, FiDownload, FiExternalLink,
  FiTruck, FiRefreshCw, FiInfo, FiSearch, FiFilter
} from "react-icons/fi";

const Base_Url = import.meta.env.VITE_API_URL;

// Booking Dialog Component
const ShowroomBookingDialog = ({ isOpen, onClose, booking }) => {
  if (!isOpen || !booking) return null;

  const car = booking.carDetails || {};
  const customer = booking.customer || {};

  const getStatusColor = (status) => {
    switch ((status || 'upcoming').toLowerCase()) {
      case 'active': return 'bg-blue-100 text-blue-800 border border-blue-200';
      case 'completed':
      case 'returned': return 'bg-green-100 text-green-800 border border-green-200';
      case 'overdue': return 'bg-red-100 text-red-800 border border-red-200';
      case 'cancelled': return 'bg-gray-100 text-gray-800 border border-gray-200';
      default: return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
    }
  };

  const getPaymentStatusColor = (status) => {
    switch ((status || 'pending').toLowerCase()) {
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
            <p className="text-blue-100 text-sm mt-1">Booking ID: {booking._id}</p>
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
              <p className="text-2xl font-bold text-black">PKR {(booking.totalPrice || 0).toLocaleString()}</p>
              <p className="text-sm text-gray-600">Total Amount</p>
            </div>
          </div>

          {/* Car Info & Image */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center text-gray-800">
                <FiTruck className="mr-2 text-blue-600"/>Your Car Information
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <div className="flex justify-between"><span className="text-gray-600">Car:</span><span className="font-medium">{car.brand} {car.model}</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Type:</span><span className="font-medium">{car.carType || 'N/A'}</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Transmission:</span><span className="font-medium">{car.transmission || 'N/A'}</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Plate Number:</span><span className="font-medium">{car.plate || 'N/A'}</span></div>
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
                  alt={`${car.brand} ${car.model}`} 
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
              <div><p className="text-sm text-blue-600">Customer Name</p><p className="font-semibold text-gray-800">{customer.name || 'Unknown'}</p></div>
              <div><p className="text-sm text-blue-600">Email</p><p className="font-semibold text-gray-800 flex items-center"><FiMail className="mr-1 text-sm"/>{customer.email || 'N/A'}</p></div>
              <div><p className="text-sm text-blue-600">Phone</p><p className="font-semibold text-gray-800 flex items-center"><FiPhone className="mr-1 text-sm"/>{customer.phone || 'N/A'}</p></div>
              <div className="md:col-span-2 lg:col-span-3"><p className="text-sm text-blue-600">Address</p><p className="font-semibold text-gray-800">{customer.address || 'N/A'}</p></div>
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

          {/* Invoice */}
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

export default ShowroomBookingDialog;
