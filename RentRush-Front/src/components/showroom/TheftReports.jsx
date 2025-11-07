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

  // Helper function to extract plate number from different possible data structures
  const getPlateNumber = (report) => {
    // Try different possible locations for plate number
    if (report.rentalDetails?.plateNumber) {
      return report.rentalDetails.plateNumber;
    }
    if (report.plateNumber) {
      return report.plateNumber;
    }
    if (report.carDetails?.plateNumber) {
      return report.carDetails.plateNumber;
    }
    if (report.car?.plateNumber) {
      return report.car.plateNumber;
    }
    return "N/A";
  };

  // Helper function to extract car name
  const getCarName = (report) => {
    if (report.rentalDetails?.carName) {
      return report.rentalDetails.carName;
    }
    if (report.carName) {
      return report.carName;
    }
    if (report.carDetails?.carName) {
      return report.carDetails.carName;
    }
    if (report.carDetails?.carBrand && report.carDetails?.carModel) {
      return `${report.carDetails.carBrand} ${report.carDetails.carModel}`;
    }
    if (report.car?.carBrand && report.car?.carModel) {
      return `${report.car.carBrand} ${report.car.carModel}`;
    }
    return "Unknown Vehicle";
  };

  // Helper function to extract showroom name
  const getShowroomName = (report) => {
    if (report.rentalDetails?.showroomName) {
      return report.rentalDetails.showroomName;
    }
    if (report.showroomName) {
      return report.showroomName;
    }
    if (report.showroomDetails?.showroomName) {
      return report.showroomDetails.showroomName;
    }
    return showroomInfo?.name || "Your Showroom";
  };

  // Helper function to get rental dates
  const getRentalDates = (report) => {
    const startDate = report.rentalDetails?.rentalStartDate || report.rentalStartDate;
    const endDate = report.rentalDetails?.rentalEndDate || report.rentalEndDate;
    
    return {
      start: startDate,
      end: endDate
    };
  };

  const getBookingStatus = (report) => {
    const dates = getRentalDates(report);
    
    if (!dates.start || !dates.end) return "unknown";
    
    const now = new Date();
    const start = new Date(dates.start);
    const end = new Date(dates.end);

    if (now < start) return "upcoming";
    if (now >= start && now <= end) return "active";
    if (now > end) return "completed";
    return "unknown";
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active": return "bg-blue-100 text-green-800";
      case "upcoming": return "bg-blue-100 text-blue-800";
      case "completed": return "bg-green-100 text-gray-800";
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
                  <h1 className="text-2xl font-bold text-gray-800">Theft Reports</h1>
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
              {/* <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="text-blue-600" size={20} />
                  <p className="text-blue-700 text-sm">
                    Showing <span className="font-semibold">{reports.length}</span> theft 
                    report{reports.length !== 1 ? 's' : ''} for your showroom
                  </p>
                </div>
              </div> */}

              {reports.map((report) => {
                const status = getBookingStatus(report);
                const plateNumber = getPlateNumber(report);
                const carName = getCarName(report);
                const showroomName = getShowroomName(report);
                const dates = getRentalDates(report);
                
                return (
                  <div key={report._id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    {/* Theft Report Badge */}
                    <div className="flex items-center gap-2 mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <ShieldAlert className="text-red-600" size={20} />
                      <div>
                        <p className="text-red-700 font-medium">THEFT REPORT SUBMITTED</p>
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
                              {carName}
                            </h3>
                            <p className="text-gray-600 flex items-center gap-1 mt-1">
                              <MapPin size={16} />
                              {showroomName}
                            </p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          {/* <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-500">Plate Number:</span>
                            <span className="font-mono bg-gray-100 px-2 py-1 rounded border">
                              {plateNumber}
                            </span>
                          </div> */}
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
                              {dates.start ? new Date(dates.start).toLocaleDateString() : "N/A"}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock size={16} className="text-gray-400" />
                            <span className="font-medium text-gray-500">Rental End:</span>
                            <span className="text-gray-700">
                              {dates.end ? new Date(dates.end).toLocaleDateString() : "N/A"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Status and Emergency Info */}
                      <div className="flex flex-col items-end gap-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(status)}`}>
                          {getStatusText(status)}
                        </span>
{/*                         
                        <div className="text-right">
                          <p className="text-lg font-bold text-red-600">
                            🚨 EMERGENCY
                          </p>
                          <p className="text-sm text-gray-500">
                            Vehicle Reported Stolen
                          </p>
                        </div> */}
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
                          <span>Showroom: {showroomName}</span>
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