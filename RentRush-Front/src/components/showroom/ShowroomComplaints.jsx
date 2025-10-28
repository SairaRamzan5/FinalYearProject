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

  // ✅ Mark complaint as resolved
  const resolveComplaint = async (id) => {
    try {
      const response = await axios.put(
        Base_Url + "/api/complaints/" + id + "/resolve",
        {},
        { withCredentials: true }
      );

      if (response.data.success) {
        alert("Complaint resolved successfully!");
        fetchShowroomComplaints(); // Refresh list
        if (selectedComplaint && selectedComplaint._id === id) {
          setSelectedComplaint(response.data.complaint);
        }
        closeComplaintDetails();
      } else {
        alert("Failed to resolve complaint.");
      }
    } catch (err) {
      console.error("Error resolving complaint:", err);
      alert("Something went wrong.");
    }
  };

  // Filter complaints based on search and status
  const filteredComplaints = complaints.filter((complaint) => {
    const matchesSearch = 
      complaint.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.compl_Against?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.contact?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint._id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (complaint.bookingId?.carId?.carBrand?.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (complaint.bookingId?.carId?.carModel?.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (complaint.bookingId?.carId?.plateNumber?.toLowerCase().includes(searchTerm.toLowerCase()));

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

  // ✅ Extract car details from booking
  const getCarDetails = (complaint) => {
    if (complaint.bookingId && complaint.bookingId.carId) {
      const car = complaint.bookingId.carId;
      const brand = car.carBrand || "";
      const model = car.carModel || "";
      const year = car.year || "";
      
      const carInfo = `${brand} ${model} ${year}`.trim();
      return carInfo || "Car details available but incomplete";
    }
    return "No car information";
  };

  // ✅ Extract car plate number
  const getCarPlateNumber = (complaint) => {
    if (complaint.bookingId && complaint.bookingId.carId) {
      return complaint.bookingId.carId.plateNumber || "N/A";
    }
    return "N/A";
  };

  // ✅ Extract showroom details
  const getShowroomDetails = (complaint) => {
    if (complaint.bookingId && complaint.bookingId.showroomId) {
      const showroom = complaint.bookingId.showroomId;
      return showroom.showroomName || showroom.name || "Showroom details available";
    }
    return "Your Showroom";
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
          {/* Header */}
          {/* <div className="mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Your Showroom Complaints</h1>
                  <p className="text-gray-600 mt-2">
                    Manage complaints for your cars only - {stats.totalCars} cars in your showroom
                  </p>
                </div>
              </div>
            </div>
          </div> */}

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

          {/* Stats Section - UPDATED TO MATCH IMAGE */}
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
                      {/* <th className="px-4 py-3 border text-left">Contact</th> */}
                      <th className="px-4 py-3 border text-left">Complaint Type</th>
                      <th className="px-4 py-3 border text-left">Car</th>
                      <th className="px-4 py-3 border text-left">Showroom</th>
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

                        {/* Contact Column */}
                        {/* <td className="px-4 py-3 text-sm">
                          {complaint.contact || "N/A"}
                        </td> */}

                        {/* Complaint Type Column */}
                        <td className="px-4 py-3">
                          {getTypeBadge(complaint.compl_Against)}
                        </td>

                        {/* Car Column */}
                        <td className="px-4 py-3">
                          <div className="text-sm">
                            <div className="font-medium">{getCarDetails(complaint)}</div>
                            {complaint.bookingId?.carId?.plateNumber && (
                              <div className="text-gray-500 text-xs">
                                Plate: {getCarPlateNumber(complaint)}
                              </div>
                            )}
                          </div>
                        </td>

                        {/* Showroom Column */}
                        <td className="px-4 py-3 text-sm">
                          {getShowroomDetails(complaint)}
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
                              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
                            >
                              View Details
                            </button>
                            {!complaint.resolved && (
                              <button
                                onClick={() => resolveComplaint(complaint._id)}
                                className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-sm"
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
                      <span className="ml-2 font-mono text-sm bg-yellow-100 px-2 py-1 rounded">
                        {selectedComplaint.email}
                      </span>
                    </p>
                    <p><strong>Contact:</strong> 
                      <span className="ml-2 font-mono text-sm bg-yellow-100 px-2 py-1 rounded">
                        {selectedComplaint.contact || "N/A"}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Car & Additional Information */}
              <div className="space-y-4">
                {/* Car Information */}
                {selectedComplaint.bookingId?.carId && (
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-lg mb-3 text-[#394A9A]">
                      Your Car Information
                    </h4>
                    <div className="space-y-2">
                      <p><strong>Car:</strong> {getCarDetails(selectedComplaint)}</p>
                      <p><strong>Plate Number:</strong> {getCarPlateNumber(selectedComplaint)}</p>
                      <p><strong>Color:</strong> {selectedComplaint.bookingId.carId.color || "N/A"}</p>
                      <p><strong>Fuel Type:</strong> {selectedComplaint.bookingId.carId.fuelType || "N/A"}</p>
                      {selectedComplaint.bookingId.carId.images?.[0] && (
                        <div className="mt-2">
                          <img 
                            src={Base_Url + "/uploads/" + selectedComplaint.bookingId.carId.images[0]}
                            alt="Car"
                            className="w-32 h-20 object-cover rounded border"
                          />
                        </div>
                      )}
                    </div>
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
                  onClick={() => resolveComplaint(selectedComplaint._id)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Mark as Resolved
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShowroomComplaints;