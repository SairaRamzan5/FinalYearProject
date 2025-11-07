import { useEffect, useState } from "react";
import ShowroomNavbar from "./showroomNavbar"; 
import Drawer from "./drawer";
import CarCard from "./carCard";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import {
  FiRefreshCw,
  FiPlus,
  FiCheckCircle,
  FiClock,
  FiAlertTriangle,
  FiBell,
  FiX,
  FiRotateCcw
} from "react-icons/fi";

const Base_Url = import.meta.env.VITE_API_URL;

const ShowroomDashboard = () => {
  const [cars, setCars] = useState([]);
  const [activeTab, setActiveTab] = useState("Available");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showroomData, setShowroomData] = useState({
    logo: "",
    showroomName: ""
  });

  // Warning System State
  const [warnings, setWarnings] = useState([]);
  const [unreadWarningCount, setUnreadWarningCount] = useState(0);
  const [showWarnings, setShowWarnings] = useState(false);
  const [warningsLoading, setWarningsLoading] = useState(false);

  // Get showroom data from session storage
  const getShowroomData = () => {
    const logo = sessionStorage.getItem("logo") || sessionStorage.getItem("profilePicture") || "";
    const showroomName = sessionStorage.getItem("showroomName") || "Showroom";
    const showroomId = sessionStorage.getItem("userId") || "";
    
    return {
      logo,
      showroomName,
      showroomId
    };
  };

  // Function to build logo URL
  const getLogoUrl = (logoPath) => {
    if (!logoPath) return "/src/assets/default-showroom.jpg";
    
    if (logoPath.startsWith('http')) {
      return logoPath;
    }
    if (logoPath.startsWith('/uploads/')) {
      return `${Base_Url}${logoPath}`;
    }
    if (logoPath.startsWith('uploads/')) {
      return `${Base_Url}/${logoPath}`;
    }
    return `${Base_Url}/uploads/${logoPath}`;
  };

  // Fetch vehicles
  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${Base_Url}/api/car/get-all-cars`, {
        withCredentials: true,
      });
      setCars(response.data);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to fetch vehicles");
    } finally {
      setLoading(false);
    }
  };

  // Fetch warnings for showroom
  const fetchWarnings = async () => {
    try {
      setWarningsLoading(true);
      const response = await axios.get(
        `${Base_Url}/api/warnings/my-warnings`,
        { withCredentials: true }
      );

      if (response.data.success) {
        setWarnings(response.data.warnings);
        setUnreadWarningCount(response.data.unreadCount || 0);
      }
    } catch (error) {
      console.error('Error fetching warnings:', error);
      // Don't show error toast for warnings to avoid annoyance
    } finally {
      setWarningsLoading(false);
    }
  };

  // Mark warning as read
  const markWarningAsRead = async (warningId) => {
    try {
      const response = await axios.put(
        `${Base_Url}/api/warnings/acknowledge-warning/${warningId}`,
        {},
        { withCredentials: true }
      );

      if (response.data.success) {
        // Update local state
        setWarnings(prevWarnings =>
          prevWarnings.map(warning =>
            warning._id === warningId 
              ? { ...warning, acknowledged: true, acknowledgedAt: new Date() }
              : warning
          )
        );
        setUnreadWarningCount(prev => Math.max(0, prev - 1));
        toast.success("Warning marked as read");
      }
    } catch (error) {
      console.error('Error marking warning as read:', error);
      toast.error("Failed to mark warning as read");
    }
  };

  // Mark all warnings as read
  const markAllAsRead = async () => {
    try {
      const unreadWarnings = warnings.filter(warning => !warning.acknowledged);
      
      for (const warning of unreadWarnings) {
        await markWarningAsRead(warning._id);
      }
      
      toast.success("All warnings marked as read");
    } catch (error) {
      console.error('Error marking all as read:', error);
      toast.error("Failed to mark all warnings as read");
    }
  };

  useEffect(() => {
    const initializeData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${Base_Url}/api/car/get-all-cars`, {
          withCredentials: true,
        });
        setCars(response.data);
        
        // Set initial active tab based on car availability
        const hasRentedCars = response.data.some(
          (car) => car.availability === "Rented Out"
        );
        if (hasRentedCars) {
          setActiveTab("Rented Out");
        }
      } catch (err) {
        console.error(err);
        toast.error(err.response?.data?.message || "Failed to fetch vehicles");
      } finally {
        setLoading(false);
      }
    };
    
    // Initialize showroom data
    setShowroomData(getShowroomData());
    
    initializeData();
    fetchWarnings();

    // Listen for profile updates
    const handleProfileUpdate = () => {
      console.log("Dashboard: Profile update received");
      setShowroomData(getShowroomData());
    };

    window.addEventListener('showroomProfileUpdated', handleProfileUpdate);
    
    return () => {
      window.removeEventListener('showroomProfileUpdated', handleProfileUpdate);
    };
  }, []);

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);
  const closeDrawer = () => setIsDrawerOpen(false);

  // Filter cars based on availability
  const availableCars = cars.filter((car) => car.availability === "Available");
  const rentedCars = cars.filter((car) => car.availability === "Rented Out");
  const maintenanceCars = cars.filter(
    (car) =>
      car.availability === "Pending Return" ||
      car.availability === "In Maintenance"
  );

  const tabConfig = [
    {
      name: "Available",
      count: availableCars.length,
      icon: <FiCheckCircle className="mr-2" />,
      color: "bg-green-500 hover:bg-green-600",
      isLink: false,
    },
    {
      name: "Rented Out",
      count: rentedCars.length,
      icon: <FiClock className="mr-2" />,
      color: "bg-blue-500 hover:bg-blue-600",
      isLink: false,
    },
    {
      name: "Car Returns",
      count: maintenanceCars.length,
      icon: <FiRotateCcw className="mr-2" />,
      color: "bg-yellow-500 hover:bg-yellow-600",
      isLink: true,
      linkTo: "/showroom/maintenance",
    },
  ];

  const getCurrentCars = () => {
    switch (activeTab) {
      case "Rented Out":
        return rentedCars;
      case "Maintenance":
        return maintenanceCars;
      default:
        return availableCars;
    }
  };

  // Get severity styles
  const getSeverityStyles = (severity) => {
    switch (severity) {
      case "CRITICAL":
        return {
          bg: "bg-red-50 border-red-200",
          text: "text-red-800",
          badge: "bg-red-100 text-red-800",
          icon: "text-red-500"
        };
      case "HIGH":
        return {
          bg: "bg-orange-50 border-orange-200",
          text: "text-orange-800",
          badge: "bg-orange-100 text-orange-800",
          icon: "text-orange-500"
        };
      case "MEDIUM":
        return {
          bg: "bg-yellow-50 border-yellow-200",
          text: "text-yellow-800",
          badge: "bg-yellow-100 text-yellow-800",
          icon: "text-yellow-500"
        };
      case "LOW":
        return {
          bg: "bg-blue-50 border-blue-200",
          text: "text-blue-800",
          badge: "bg-blue-100 text-blue-800",
          icon: "text-blue-500"
        };
      default:
        return {
          bg: "bg-gray-50 border-gray-200",
          text: "text-gray-800",
          badge: "bg-gray-100 text-gray-800",
          icon: "text-gray-500"
        };
    }
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const logoUrl = getLogoUrl(showroomData.logo);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300">
      <ShowroomNavbar onMenuClick={toggleDrawer} />
      <Drawer isOpen={isDrawerOpen} onClose={closeDrawer} />

      <main className="container mx-auto px-4 py-8">
        {/* Header with actions */}
        <div className="flex flex-col lg:flex-row items-start mb-6 gap-6">
          <div className="flex items-center">
            <img
              src={logoUrl}
              alt="Showroom Logo"
              className="h-20 w-20 rounded-[10px] border-2 border-gray-200 shadow-sm mr-4 object-cover"
              onError={(e) => {
                e.target.src = "/src/assets/default-showroom.jpg";
              }}
            />
            <div className="flex flex-col">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 tracking-tight">
                {showroomData.showroomName}
              </h2>
              <p className="text-gray-600 text-sm">Car Dashboard</p>
            </div>
          </div>

          <div className="flex-1">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">
                  Vehicle Management
                </h1>
                <p className="text-gray-600">
                  Manage your showroom's car inventory and reservations
                </p>
              </div>
              
              <div className="flex flex-wrap gap-3">
              

                <button
                  onClick={fetchVehicles}
                  className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition"
                  type="button"
                >
                  <FiRefreshCw className="mr-2" />
                  Refresh
                </button>
                <Link
                  to="/showroom/inventory"
                  className="inline-flex items-center px-6 py-2 bg-[#C17D3C] text-white rounded-lg hover:bg-[#A56A33] transition"
                >
                  <FiPlus className="mr-2" />
                  Add New Vehicle
                </Link>

                  {/* Warning Button with Badge */}
                <button
                  onClick={() => setShowWarnings(true)}
                  className="relative flex items-center px-4 py-2 bg-white text-blue-600 border border-blue-300 rounded-lg shadow-sm hover:bg-blue-200 transition-all duration-200"
                  type="button"
                >
                  <FiBell className="mr-2" />
                 
                  {unreadWarningCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold animate-pulse">
                      {unreadWarningCount}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Available Cars</p>
                <p className="text-3xl font-bold text-green-600">{availableCars.length}</p>
              </div>
              <FiCheckCircle className="text-3xl text-green-500" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Rented Out</p>
                <p className="text-3xl font-bold text-blue-600">{rentedCars.length}</p>
              </div>
              <FiClock className="text-3xl text-blue-500" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-yellow-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">In Maintenance</p>
                <p className="text-3xl font-bold text-yellow-600">{maintenanceCars.length}</p>
              </div>
              <FiAlertTriangle className="text-3xl text-yellow-500" />
            </div>
          </div>
        </div> */}

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-3 mb-8">
          {tabConfig.map((tab) => (
            tab.isLink ? (
              <Link
                key={tab.name}
                to={tab.linkTo}
                className={`flex items-center px-4 py-2 rounded-lg font-medium text-white transition-all ${
                  activeTab === tab.name
                    ? `${tab.color} shadow-lg transform scale-105`
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              >
                {tab.icon}
                {tab.name}
                <span className="ml-2 bg-white bg-opacity-30 px-2 py-1 rounded-full text-xs">
                  {tab.count}
                </span>
              </Link>
            ) : (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`flex items-center px-4 py-2 rounded-lg font-medium text-white transition-all ${
                  activeTab === tab.name
                    ? `${tab.color} shadow-lg transform scale-105`
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              >
                {tab.icon}
                {tab.name}
                <span className="ml-2 bg-white bg-opacity-30 px-2 py-1 rounded-full text-xs">
                  {tab.count}
                </span>
              </button>
            )
          ))}
        </div>

        {/* Content area */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#C17D3C]"></div>
            </div>
          ) : getCurrentCars().length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
              {getCurrentCars().map((car, index) => (
                <CarCard key={index} car={car} />
              ))}
            </div>
          ) : (
            <div className="p-12 text-center">
              <div className="mx-auto max-w-md">
                <h3 className="text-xl font-medium text-gray-700 mb-3">
                  No {activeTab.toLowerCase()} vehicles found
                </h3>
                <p className="text-gray-500 mb-6">
                  {activeTab === "Available"
                    ? "All vehicles are currently rented or in maintenance"
                    : "No vehicles match this status"}
                </p>
                <Link
                  to="/showroom/inventory"
                  className="inline-flex items-center px-6 py-2 bg-[#C17D3C] text-white rounded-lg hover:bg-[#A56A33] transition"
                >
                  <FiPlus className="mr-2" />
                  Add Your First Vehicle
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Warnings Modal */}
      {showWarnings && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="relative bg-white p-6 rounded-xl shadow-lg w-full max-w-4xl max-h-[80vh] overflow-y-auto">
            <button
              onClick={() => setShowWarnings(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-black text-2xl bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-200 transition"
            >
              <FiX />
            </button>

            <h3 className="text-2xl font-bold mb-2 text-[#394A9A]">
              Showroom Warnings
            </h3>
            <p className="text-gray-600 mb-6">
              Important notifications and alerts about your showroom performance
            </p>

            {warningsLoading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#C17D3C]"></div>
              </div>
            ) : warnings.length === 0 ? (
              <div className="text-center py-12">
                <FiCheckCircle className="mx-auto text-green-500 text-5xl mb-4" />
                <p className="text-gray-600 text-lg font-medium">No warnings found</p>
                <p className="text-gray-500">You're doing great! Keep up the good work.</p>
              </div>
            ) : (
              <>
                {/* Header Actions */}
                <div className="flex justify-between items-center mb-6 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">
                      Total Warnings: <span className="font-semibold">{warnings.length}</span>
                    </p>
                    <p className="text-sm text-gray-600">
                      Unread: <span className="font-semibold text-red-600">{unreadWarningCount}</span>
                    </p>
                  </div>
                  {unreadWarningCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
                    >
                      Mark All as Read
                    </button>
                  )}
                </div>

                {/* Warnings List */}
                <div className="space-y-4">
                  {warnings.map((warning) => {
                    const severityStyles = getSeverityStyles(warning.severity);
                    return (
                      <div
                        key={warning._id}
                        className={`border-l-4 p-4 rounded-r-lg transition-all ${
                          severityStyles.bg
                        } ${
                          !warning.acknowledged ? 'ring-2 ring-opacity-20 ring-current animate-pulse' : ''
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center mb-2">
                              <FiAlertTriangle className={`mr-2 ${severityStyles.icon}`} />
                              <span className={`font-semibold ${severityStyles.text}`}>
                                {warning.title}
                              </span>
                              <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${severityStyles.badge}`}>
                                {warning.severity}
                              </span>
                              {!warning.acknowledged && (
                                <span className="ml-2 bg-red-600 text-white px-2 py-1 rounded-full text-xs">
                                  NEW
                                </span>
                              )}
                            </div>
                            
                            <p className={`mb-3 ${severityStyles.text}`}>
                              {warning.message}
                            </p>
                            
                            {warning.resolutionRate && (
                              <div className="text-sm text-gray-600 bg-white bg-opacity-50 p-3 rounded-lg mb-2">
                                <div className="grid grid-cols-3 gap-4">
                                  <div>
                                    <p className="font-semibold">Resolution Rate</p>
                                    <p className={`text-lg ${
                                      warning.resolutionRate < 30 ? 'text-red-600' :
                                      warning.resolutionRate < 60 ? 'text-yellow-600' : 'text-green-600'
                                    }`}>
                                      {warning.resolutionRate}%
                                    </p>
                                  </div>
                                  <div>
                                    <p className="font-semibold">Total Complaints</p>
                                    <p>{warning.totalComplaints}</p>
                                  </div>
                                  <div>
                                    <p className="font-semibold">Resolved</p>
                                    <p>{warning.resolvedComplaints}</p>
                                  </div>
                                </div>
                              </div>
                            )}
                            
                            <div className="flex justify-between items-center text-xs text-gray-500">
                              <span>
                                Received: {formatDate(warning.createdAt)}
                              </span>
                              {warning.acknowledged && (
                                <span className="text-green-600">
                                  ✓ Acknowledged on {formatDate(warning.acknowledgedAt)}
                                </span>
                              )}
                            </div>
                          </div>
                          
                          {!warning.acknowledged && (
                            <button
                              onClick={() => markWarningAsRead(warning._id)}
                              className="ml-4 px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors text-sm whitespace-nowrap"
                            >
                              Mark Read
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
            
            <div className="flex justify-end mt-6 pt-4 border-t">
              <button
                onClick={() => setShowWarnings(false)}
                className="px-6 py-2 bg-[#C17D3C] text-white rounded-lg hover:bg-[#A56A33] transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowroomDashboard;