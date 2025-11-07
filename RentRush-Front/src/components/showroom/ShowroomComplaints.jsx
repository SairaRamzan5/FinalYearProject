import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ShowroomNavbar from "./ShowroomNavbar";
import Footer from "../Footer";
import { 
  Search, 
  Filter, 
  Clock, 
  CheckCircle, 
  Eye,
  Calendar,
  Phone,
  Mail,
  FileText,
  AlertTriangle,
  ArrowLeft,
  X,
  Car,
  User,
  Download
} from "lucide-react";
import Toast from "../Toast";

const Base_Url = import.meta.env.VITE_API_URL;

function ShowroomComplaints() {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [stats, setStats] = useState({
    totalCars: 0,
    totalComplaints: 0,
    pending: 0,
    resolved: 0
  });
  const [error, setError] = useState("");
  
  // Resolution Modal State
  const [showResolutionModal, setShowResolutionModal] = useState(false);
  const [resolutionDescription, setResolutionDescription] = useState("");
  const [resolvingComplaintId, setResolvingComplaintId] = useState(null);
  const [resolving, setResolving] = useState(false);

  // ✅ Fetch showroom's complaints
  const fetchShowroomComplaints = async () => {
    try {
      setLoading(true);
      setError("");
      
      console.log("🔄 Fetching showroom complaints from:", Base_Url + "/api/complaints/showroom/list");
      
      const response = await axios.get(Base_Url + "/api/complaints/showroom/list", {
        withCredentials: true,
      });
      
      console.log("📦 Full API Response:", response.data);
      
      if (response.data.success) {
        const complaintsData = response.data.complaints || [];
        console.log("🏢 Showroom complaints received:", complaintsData.length);
        
        // Debug log to check complaint structure
        complaintsData.forEach((complaint, index) => {
          console.log(`Complaint ${index + 1}:`, {
            id: complaint._id,
            hasBookingId: !!complaint.bookingId,
            bookingId: complaint.bookingId,
            hasCarDetails: !!complaint.carDetails,
            carDetails: complaint.carDetails,
            directCarFields: {
              carBrand: complaint.carBrand,
              carModel: complaint.carModel,
              plateNumber: complaint.plateNumber
            }
          });
        });
        
        setComplaints(complaintsData);
        
        // Calculate stats
        const pendingCount = complaintsData.filter(c => !c.resolved).length;
        const resolvedCount = complaintsData.filter(c => c.resolved).length;
        
        setStats({
          totalCars: response.data.carsCount || 0,
          totalComplaints: complaintsData.length,
          pending: pendingCount,
          resolved: resolvedCount
        });
      } else {
        console.log("❌ API returned success: false");
        setComplaints([]);
        setError(response.data.message || "Failed to fetch complaints");
      }
    } catch (error) {
      console.error("❌ Error fetching showroom complaints:", error);
      console.error("Error response:", error.response?.data);
      
      const errorMessage = error.response?.data?.message || 
                          error.message || 
                          "Failed to load complaints for your showroom";
      
      setError(errorMessage);
      setComplaints([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch complaints summary
  const fetchComplaintsSummary = async () => {
    try {
      const response = await axios.get(Base_Url + "/api/complaints/showroom/summary", {
        withCredentials: true,
      });
      
      if (response.data.success) {
        const summary = response.data.summary;
        setStats(prev => ({
          ...prev,
          totalComplaints: summary.total || 0,
          pending: summary.pending || 0,
          resolved: summary.resolved || 0,
          totalCars: summary.carsCount || 0
        }));
      }
    } catch (error) {
      console.error("❌ Error fetching summary:", error);
    }
  };

  useEffect(() => {
    fetchShowroomComplaints();
    fetchComplaintsSummary();
  }, []);

  // ✅ View complaint details
  const viewComplaintDetails = (complaint) => {
    console.log("🔍 Opening details for complaint:", complaint._id);
    console.log("📋 Complaint booking data:", {
      hasBookingId: !!complaint.bookingId,
      bookingId: complaint.bookingId,
      hasCarDetails: !!complaint.carDetails,
      carDetails: complaint.carDetails,
      directFields: {
        carBrand: complaint.carBrand,
        carModel: complaint.carModel,
        plateNumber: complaint.plateNumber
      }
    });
    
    setSelectedComplaint(complaint);
    setShowDetails(true);
    document.body.style.overflow = 'hidden';
  };

  // ✅ Close modal
  const closeComplaintDetails = () => {
    console.log("❌ Closing complaint details");
    setShowDetails(false);
    setSelectedComplaint(null);
    document.body.style.overflow = 'auto';
  };

  // ✅ Handle modal backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeComplaintDetails();
    }
  };

  // ✅ Open resolution modal
  const openResolutionModal = (complaintId) => {
    setResolvingComplaintId(complaintId);
    setResolutionDescription("");
    setShowResolutionModal(true);
  };

  // ✅ Close resolution modal
  const closeResolutionModal = () => {
    setShowResolutionModal(false);
    setResolvingComplaintId(null);
    setResolutionDescription("");
    setResolving(false);
  };

  // ✅ Handle resolution modal backdrop click
  const handleResolutionBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeResolutionModal();
    }
  };

  // ✅ FIXED: Mark complaint as resolved - WITH PROPER STATE UPDATE
  const resolveComplaint = async () => {
    if (!resolutionDescription.trim()) {
      Toast("Please enter a resolution description", "error");
      return;
    }

    try {
      setResolving(true);
      const response = await axios.put(
        Base_Url + "/api/complaints/" + resolvingComplaintId + "/resolve",
        {
          resolutionDescription: resolutionDescription.trim()
        },
        { withCredentials: true }
      );

      if (response.data.success) {
        Toast("Complaint resolved successfully!", "success");
        
        // ✅ PROPERLY UPDATE COMPLAINTS LIST WITH COMPLETE DATA
        setComplaints(prevComplaints => 
          prevComplaints.map(complaint => 
            complaint._id === resolvingComplaintId 
              ? response.data.complaint // Use the updated complaint from backend
              : complaint
          )
        );
        
        // ✅ UPDATE SELECTED COMPLAINT IF OPEN
        if (selectedComplaint && selectedComplaint._id === resolvingComplaintId) {
          setSelectedComplaint(response.data.complaint);
        }
        
        // ✅ UPDATE STATS
        setStats(prevStats => ({
          ...prevStats,
          resolved: prevStats.resolved + 1,
          pending: prevStats.pending - 1
        }));
        
        closeResolutionModal();
      } else {
        Toast("Failed to resolve complaint.", "error");
      }
    } catch (err) {
      console.error("Error resolving complaint:", err);
      Toast("Something went wrong while resolving the complaint.", "error");
    } finally {
      setResolving(false);
    }
  };

  // ✅ UPDATED: Extract car details from complaint (for showroom view)
  const getCarDetails = (complaint) => {
    // Try multiple possible data structures
    if (complaint.carDetails) {
      const car = complaint.carDetails;
      const brand = car.carBrand || "";
      const model = car.carModel || "";
      const year = car.year || "";
      
      const carInfo = `${brand} ${model} ${year}`.trim();
      return carInfo || "Car details available";
    }
    
    if (complaint.bookingId?.carId) {
      const car = complaint.bookingId.carId;
      const brand = car.carBrand || "";
      const model = car.carModel || "";
      const year = car.year || "";
      
      const carInfo = `${brand} ${model} ${year}`.trim();
      return carInfo || "Car details available but incomplete";
    }
    
    // Check direct fields on complaint
    if (complaint.carBrand || complaint.carModel) {
      const brand = complaint.carBrand || "";
      const model = complaint.carModel || "";
      const year = complaint.year || "";
      
      const carInfo = `${brand} ${model} ${year}`.trim();
      return carInfo || "Car information available";
    }
    
    return "Car information not available";
  };

  // ✅ UPDATED: Extract car plate number
  const getCarPlateNumber = (complaint) => {
    if (complaint.carDetails?.plateNumber) {
      return complaint.carDetails.plateNumber;
    }
    
    if (complaint.bookingId?.carId?.plateNumber) {
      return complaint.bookingId.carId.plateNumber;
    }
    
    if (complaint.plateNumber) {
      return complaint.plateNumber;
    }
    
    return "N/A";
  };

  // ✅ UPDATED: Extract booking information
  const getBookingInfo = (complaint) => {
    if (!complaint.bookingId) {
      return null;
    }

    const booking = complaint.bookingId;
    
    return {
      bookingId: booking._id,
      rentalStartDate: booking.rentalStartDate,
      rentalEndDate: booking.rentalEndDate,
      rentalStartTime: booking.rentalStartTime || booking.StartTime,
      rentalEndTime: booking.rentalEndTime || booking.EndTime,
      totalPrice: booking.totalPrice,
      status: booking.status
    };
  };

  // ✅ UPDATED: Extract car full details for modal
  const getCarFullDetails = (complaint) => {
    let car = {};
    
    if (complaint.carDetails) {
      car = complaint.carDetails;
    } else if (complaint.bookingId?.carId) {
      car = complaint.bookingId.carId;
    } else {
      // Use direct fields
      car = {
        carBrand: complaint.carBrand,
        carModel: complaint.carModel,
        year: complaint.year,
        color: complaint.color,
        fuelType: complaint.fuelType,
        transmission: complaint.transmission,
        plateNumber: complaint.plateNumber,
        images: complaint.images
      };
    }
    
    return car;
  };

  // Filter complaints based on search and status
  const filteredComplaints = complaints.filter((complaint) => {
    const matchesSearch = 
      complaint.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.compl_Against?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.contact?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint._id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (complaint.carDetails?.carBrand?.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (complaint.carDetails?.carModel?.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (complaint.carDetails?.plateNumber?.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (complaint.carBrand?.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (complaint.carModel?.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (complaint.plateNumber?.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = 
      statusFilter === "all" ||
      (statusFilter === "resolved" && complaint.resolved) ||
      (statusFilter === "pending" && !complaint.resolved);

    return matchesSearch && matchesStatus;
  });

  // ✅ Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
  };

  // Check if any filter is active
  const isFilterActive = searchTerm || statusFilter !== "all";

  // ✅ Retry loading complaints
  const handleRetry = () => {
    fetchShowroomComplaints();
    fetchComplaintsSummary();
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-PK', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get status badge
  const getStatusBadge = (resolved) => {
    if (resolved) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          Resolved
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
          Pending
        </span>
      );
    }
  };

  // Get complaint type badge
  const getTypeBadge = (type) => {
    const typeColors = {
      'Staff': 'bg-purple-100 text-purple-800',
      'Service': 'bg-blue-100 text-blue-800',
      'Vehicle': 'bg-orange-100 text-orange-800',
      'Billing': 'bg-red-100 text-red-800',
      'Other': 'bg-gray-100 text-gray-800'
    };
    
    const colorClass = typeColors[type] || 'bg-gray-100 text-gray-800';
    
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${colorClass}`}>
        {type}
      </span>
    );
  };

  // Format currency
  const formatCurrency = (amount) => {
    if (!amount || isNaN(amount)) return "Rs 0";
    return `Rs ${amount}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <ShowroomNavbar />
        <div className="flex-grow bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C17D3C] mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading your showroom complaints...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <ShowroomNavbar />
      
      <main className="flex-grow bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Error Message */}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <AlertTriangle className="h-5 w-5 text-red-400 mr-2" />
                  <p className="text-red-800">{error}</p>
                </div>
                <button
                  onClick={handleRetry}
                  className="bg-red-100 text-red-800 px-3 py-1 rounded text-sm hover:bg-red-200 transition-colors"
                >
                  Retry
                </button>
              </div>
            </div>
          )}

          {/* Stats Section */}
          <div className="bg-white shadow rounded-xl p-6 mb-6">
            <h2 className="text-2xl font-bold text-[#394A9A] mb-6">
              Customer Complaints Management
            </h2>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="cursor-pointer p-4 rounded-lg shadow text-center transition-all bg-blue-100 text-blue-800 hover:bg-blue-200">
                <h3 className="text-lg font-semibold">Total Complaints</h3>
                <p className="text-2xl font-bold">{stats.totalComplaints}</p>
              </div>

              <div className="cursor-pointer p-4 rounded-lg shadow text-center transition-all bg-green-100 text-green-800 hover:bg-green-200">
                <h3 className="text-lg font-semibold">Resolved</h3>
                <p className="text-2xl font-bold">{stats.resolved}</p>
              </div>

              <div className="cursor-pointer p-4 rounded-lg shadow text-center transition-all bg-red-100 text-red-800 hover:bg-red-200">
                <h3 className="text-lg font-semibold">Pending</h3>
                <p className="text-2xl font-bold">{stats.pending}</p>
              </div>
            </div>
          </div>

          {/* Filters Section */}
          <div className="bg-white rounded-lg shadow mb-6 p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search by customer email, complaint type, car details..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-[#C17D3C] focus:border-[#C17D3C]"
                />
              </div>

              {/* Status Filter */}
              <div className="sm:w-48">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Filter className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-[#C17D3C] focus:border-[#C17D3C]"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </div>
              </div>

              {/* Clear Filters Button */}
              {isFilterActive && (
                <div className="sm:w-auto">
                  <button
                    onClick={clearFilters}
                    className="w-full sm:w-auto px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#C17D3C] transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>

            {/* Active Filters Info */}
            {isFilterActive && (
              <div className="mt-3 flex flex-wrap gap-2">
                {searchTerm && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                    Search: "{searchTerm}"
                  </span>
                )}
                {statusFilter !== "all" && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                    {statusFilter === "pending" && "Status: Pending"}
                    {statusFilter === "resolved" && "Status: Resolved"}
                  </span>
                )}
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">
                  Showing {filteredComplaints.length} of {stats.totalComplaints} complaints
                </span>
              </div>
            )}
          </div>

          {/* Complaints Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {filteredComplaints.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full border border-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-3 border text-left">Customer</th>
                      <th className="px-4 py-3 border text-left">Complaint Type</th>
                      <th className="px-4 py-3 border text-left">Car</th>
                      <th className="px-4 py-3 border text-left">Date</th>
                      <th className="px-4 py-3 border text-center">Status</th>
                      <th className="px-4 py-3 border text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredComplaints.map((complaint) => (
                      <tr key={complaint._id} className="hover:bg-gray-50 border-b">
                        {/* Customer Column */}
                        <td className="px-4 py-3">
                          <div>
                            <div className="font-medium text-gray-900">
                              {complaint.email}
                            </div>
                            <div className="text-sm text-gray-500">
                              {complaint.contact}
                            </div>
                          </div>
                        </td>

                        {/* Complaint Type Column */}
                        <td className="px-4 py-3">
                          {getTypeBadge(complaint.compl_Against)}
                        </td>

                        {/* Car Column */}
                        <td className="px-4 py-3">
                          <div className="text-sm">
                            <div className="font-medium">{getCarDetails(complaint)}</div>
                            <div className="text-gray-500 text-xs">
                              Plate: {getCarPlateNumber(complaint)}
                            </div>
                          </div>
                        </td>

                        {/* Date Column */}
                        <td className="px-4 py-3 text-sm text-gray-500">
                          {formatDate(complaint.createdAt)}
                        </td>

                        {/* Status Column */}
                        <td className="px-4 py-3 text-center">
                          {getStatusBadge(complaint.resolved)}
                        </td>

                        {/* Actions Column */}
                        <td className="px-4 py-3 text-center">
                          <div className="flex justify-center space-x-2">
                            <button
                              onClick={() => viewComplaintDetails(complaint)}
                              className="px-3 py-1 text-[#C17D3C] rounded transition-colors font-bold text-sm"
                            >
                              View Details
                            </button>
                            {!complaint.resolved && (
                              <button
                                onClick={() => openResolutionModal(complaint._id)}
                                className="px-3 py-1 bg-[#C17D3C] text-white rounded hover:bg-[#C17D3C] transition-colors text-sm"
                              >
                                Resolve
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-16">
                <AlertTriangle className="mx-auto h-16 w-16 text-gray-400" />
                <h3 className="mt-4 text-lg font-medium text-gray-900">
                  {complaints.length === 0 ? "No complaints for your cars" : "No matching complaints"}
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  {complaints.length === 0 
                    ? "No customers have submitted complaints for your showroom cars yet."
                    : "Try adjusting your search or filter to find what you're looking for."
                  }
                </p>
                {isFilterActive && complaints.length > 0 && (
                  <button
                    onClick={clearFilters}
                    className="mt-4 px-4 py-2 bg-[#C17D3C] text-white rounded-md hover:bg-[#B06F35] transition-colors"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />

      {/* Complaint Details Modal */}
      {showDetails && selectedComplaint && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
          onClick={handleBackdropClick}
        >
          <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={closeComplaintDetails}
              className="absolute top-4 right-4 text-gray-600 hover:text-black text-2xl bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center"
            >
              ✖
            </button>

            <h3 className="text-2xl font-bold mb-6 text-[#394A9A] border-b pb-2">
              Complaint Details - Your Car
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Complaint Information */}
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-lg mb-3 text-[#394A9A]">
                    Complaint Information
                  </h4>
                  <div className="space-y-2">
                    <p><strong>Type:</strong> 
                      <span className="ml-2 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                        {selectedComplaint.compl_Against}
                      </span>
                    </p>
                    <p><strong>Description:</strong></p>
                    <p className="text-gray-700 bg-white p-3 rounded border min-h-[80px]">
                      {selectedComplaint.description}
                    </p>
                    <p><strong>Status:</strong> 
                      <span className={`ml-2 px-2 py-1 rounded-full text-sm ${
                        selectedComplaint.resolved 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {selectedComplaint.resolved ? 'Resolved' : 'Pending'}
                      </span>
                    </p>
                    <p><strong>Submitted:</strong> 
                      {formatDate(selectedComplaint.createdAt)}
                    </p>
                  </div>
                </div>

                {/* Customer Information */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-lg mb-3 text-[#394A9A]">
                    Customer Information
                  </h4>
                  <div className="space-y-2">
                    <p><strong>Email:</strong> 
                      <span className="ml-2 font-mono text-sm bg-gray-50 px-2 py-1 rounded">
                        {selectedComplaint.email}
                      </span>
                    </p>
                    <p><strong>Contact:</strong> 
                      <span className="ml-2 font-mono text-sm bg-gray-50 px-2 py-1 rounded">
                        {selectedComplaint.contact || "N/A"}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Car & Additional Information */}
              <div className="space-y-4">
                {/* Car Information */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-lg mb-3 text-[#394A9A]">
                    Your Car Information
                  </h4>
                  <div className="space-y-2">
                    <p><strong>Car:</strong> {getCarDetails(selectedComplaint)}</p>
                    <p><strong>Plate Number:</strong> {getCarPlateNumber(selectedComplaint)}</p>
                    
                    {/* Car Details */}
                    {(() => {
                      const car = getCarFullDetails(selectedComplaint);
                      return (
                        <>
                          <p><strong>Color:</strong> {car.color || "N/A"}</p>
                          <p><strong>Fuel Type:</strong> {car.fuelType || "N/A"}</p>
                          <p><strong>Transmission:</strong> {car.transmission || "N/A"}</p>
                          {car.images?.[0] && (
                            <div className="mt-2">
                              <img 
                                src={Base_Url + "/uploads/" + car.images[0]}
                                alt="Car"
                                className="w-32 h-20 object-cover rounded border"
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                }}
                              />
                            </div>
                          )}
                        </>
                      );
                    })()}
                  </div>
                </div>

                {/* ✅ UPDATED: Booking Information */}
                {selectedComplaint.bookingId && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-lg mb-3 text-[#394A9A]">
                      Booking Information
                    </h4>
                    <div className="space-y-2">
                      <p><strong>Booking ID:</strong> 
                        <span className="text-sm font-mono ml-2 bg-gray-100 px-2 py-1 rounded">
                          {selectedComplaint.bookingId._id}
                        </span>
                      </p>
                      <p><strong>Rental Period:</strong></p>
                      <p className="text-sm bg-white p-2 rounded border">
                        📅 {selectedComplaint.bookingId.rentalStartDate} {selectedComplaint.bookingId.rentalStartTime || selectedComplaint.bookingId.StartTime} 
                        <br />
                        → {selectedComplaint.bookingId.rentalEndDate} {selectedComplaint.bookingId.rentalEndTime || selectedComplaint.bookingId.EndTime}
                      </p>
                      <p><strong>Total Price:</strong> {formatCurrency(selectedComplaint.bookingId.totalPrice)}</p>
                      <p><strong>Status:</strong> 
                        <span className="ml-2 capitalize bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm">
                          {selectedComplaint.bookingId.status || "N/A"}
                        </span>
                      </p>
                    </div>
                  </div>
                )}

                {/* ✅ FIXED: Resolution Details */}
                {selectedComplaint.resolved && selectedComplaint.resolutionDescription && (
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-lg mb-3 text-[#394A9A]">
                      Resolution Details
                    </h4>
                    <div className="space-y-2">
                      <p><strong>Resolved At:</strong> 
                        {selectedComplaint.resolvedAt ? formatDate(selectedComplaint.resolvedAt) : "N/A"}
                      </p>
                      <p><strong>Resolution Description:</strong></p>
                      <p className="text-gray-700 bg-white p-3 rounded border min-h-[80px]">
                        {selectedComplaint.resolutionDescription}
                      </p>
                      {selectedComplaint.resolvedBy && (
                        <p><strong>Resolved By:</strong> 
                          <span className="ml-2 font-mono text-sm bg-green-100 px-2 py-1 rounded">
                            {selectedComplaint.resolvedBy.name || selectedComplaint.resolvedBy.email}
                          </span>
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Show placeholder if resolved but no description */}
                {selectedComplaint.resolved && !selectedComplaint.resolutionDescription && (
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-lg mb-3 text-[#394A9A]">
                      Resolution Status
                    </h4>
                    <p className="text-yellow-700">
                      This complaint has been marked as resolved. No additional resolution details were provided.
                    </p>
                  </div>
                )}

                {/* Proof Attachment */}
                {selectedComplaint.proof && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-lg mb-3 text-[#394A9A]">
                      Proof Attachment
                    </h4>
                    <div className="flex flex-col items-center">
                      <img
                        src={Base_Url + "/uploads/complaints/" + selectedComplaint.proof}
                        alt="Proof submitted by customer"
                        className="max-w-full max-h-64 rounded-lg border shadow-md"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'block';
                        }}
                      />
                      <div style={{display: 'none'}} className="text-center text-gray-500">
                        <p>Proof file: {selectedComplaint.proof}</p>
                        <p className="text-sm">File cannot be displayed</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
              <button
                onClick={closeComplaintDetails}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              {!selectedComplaint.resolved && (
                <button
                  onClick={() => openResolutionModal(selectedComplaint._id)}
                  className="px-4 py-2 bg-[#C17D3C] text-white rounded-lg hover:bg-[#C17D3C] transition-colors"
                >
                  Mark as Resolved
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Resolution Description Modal */}
      {showResolutionModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
          onClick={handleResolutionBackdropClick}
        >
          <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <button
              onClick={closeResolutionModal}
              className="absolute top-4 right-4 text-gray-600 hover:text-black text-2xl bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center"
            >
              ✖
            </button>

            <h3 className="text-xl font-bold mb-4 text-[#394A9A]">
              Resolve Complaint
            </h3>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Resolution Description *
              </label>
              <textarea
                value={resolutionDescription}
                onChange={(e) => setResolutionDescription(e.target.value)}
                placeholder="Describe how you resolved this complaint..."
                rows="5"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#C17D3C] focus:border-[#C17D3C]"
              />
              <p className="text-xs text-gray-500 mt-1">
                Please provide details about how this complaint was resolved. This will be visible to the customer.
              </p>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={closeResolutionModal}
                disabled={resolving}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={resolveComplaint}
                disabled={resolving || !resolutionDescription.trim()}
                className="px-4 py-2 bg-[#C17D3C] text-white rounded-lg hover:bg-[#C17D3C] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {resolving ? "Resolving..." : "Confirm Resolution"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShowroomComplaints;