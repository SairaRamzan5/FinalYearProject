import React, { useEffect, useState } from "react";
import axios from "axios";
import Toast from "../Toast";
import ShowroomNavbar from "./ShowroomNavbar";

const Base_Url = import.meta.env.VITE_API_URL || "http://localhost:5000";

const MaintenanceHistoryPage = () => {
  const [maintenanceLogs, setMaintenanceLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [selectedLog, setSelectedLog] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchMaintenanceHistory = async () => {
    try {
      setLoading(true);
      console.log("🔄 Fetching maintenance history...");
      
      const response = await axios.get(
        `${Base_Url}/api/car/maintenance-history`,
        {
          withCredentials: true,
        }
      );
      
      console.log("✅ Maintenance history response:", response.data);
      
      if (response.data.success) {
        setMaintenanceLogs(response.data.data || []);
      } else {
        throw new Error(response.data.message || "Failed to fetch maintenance history");
      }
    } catch (err) {
      console.error("❌ Maintenance history error:", err);
      Toast(
        err.response?.data?.message || err.message || "Failed to load maintenance history",
        "error"
      );
      setMaintenanceLogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMaintenanceHistory();
  }, []);

  const viewMaintenanceDetails = (log) => {
    console.log("🔍 Viewing maintenance details:", log);
    setSelectedLog(log);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedLog(null);
  };

  const filterMaintenanceLogs = () => {
    if (!maintenanceLogs || maintenanceLogs.length === 0) return [];
    
    const now = new Date();
    
    switch (filter) {
      case "today":
        return maintenanceLogs.filter(log => {
          const logDate = new Date(log.date);
          return logDate.toDateString() === now.toDateString();
        });
      
      case "week":
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        return maintenanceLogs.filter(log => 
          new Date(log.date) >= weekAgo
        );
      
      case "month":
        const monthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
        return maintenanceLogs.filter(log => 
          new Date(log.date) >= monthAgo
        );
      
      default:
        return maintenanceLogs;
    }
  };

  const filteredLogs = filterMaintenanceLogs();

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

  const getTaskStatus = (tasks) => {
    if (!tasks || !Array.isArray(tasks) || tasks.length === 0) return { checked: 0, total: 0 };
    
    // Handle array of tasks (new structure)
    const allTasks = tasks[0] || {};
    const taskEntries = Object.entries(allTasks);
    const checkedTasks = taskEntries.filter(([_, isChecked]) => isChecked === true);
    
    return {
      checked: checkedTasks.length,
      total: taskEntries.length
    };
  };

  const getRepairCost = (repairCosts) => {
    if (!repairCosts || !Array.isArray(repairCosts) || repairCosts.length === 0) return 0;
    
    // Handle array of repair costs (new structure)
    const allCosts = repairCosts[0] || {};
    return Object.values(allCosts).reduce((total, cost) => {
      const costNum = parseFloat(cost) || 0;
      return total + costNum;
    }, 0);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C17D3C] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading maintenance history...</p>
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
              Maintenance History
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
                <span className="text-gray-600">Total Records: </span>
                <span className="font-bold text-[#C17D3C]">
                  {filteredLogs.length}
                </span>
              </div>
            </div>
          </div>

          {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
                <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-500">
                  <h3 className="text-lg font-semibold text-gray-600">Total Maintenance</h3>
                  <p className="text-2xl font-bold text-gray-800">{filteredLogs.length}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-500">
                  <h3 className="text-lg font-semibold text-gray-600">Total Repair Cost</h3>
                  <p className="text-2xl font-bold text-[#C17D3C]">
                    PKR {filteredLogs.reduce((sum, log) => sum + getRepairCost(log.repairCosts), 0).toLocaleString()}
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-purple-500">
                  <h3 className="text-lg font-semibold text-gray-600">This Month</h3>
                  <p className="text-2xl font-bold text-gray-800">
                    {maintenanceLogs.filter(log => {
                      const logDate = new Date(log.date);
                      const now = new Date();
                      return logDate.getMonth() === now.getMonth() && 
                             logDate.getFullYear() === now.getFullYear();
                    }).length}
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-orange-500">
                  <h3 className="text-lg font-semibold text-gray-600">Today</h3>
                  <p className="text-2xl font-bold text-gray-800">
                    {maintenanceLogs.filter(log => {
                      const logDate = new Date(log.date);
                      return logDate.toDateString() === new Date().toDateString();
                    }).length}
                  </p>
                </div>
              </div>

          {/* Payment History Table */}
          {filteredLogs && filteredLogs.length > 0 ? (
            <>
              <div className="bg-white rounded-xl shadow-lg overflow-hidden mt-8">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Car Details
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Booking ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Tasks Completed
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Repair Cost
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date & Time
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredLogs.map((log) => {
                        const taskStatus = getTaskStatus(log.tasks);
                        const totalRepairCost = getRepairCost(log.repairCosts);
                        
                        return (
                          <tr key={log._id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {log.carDetails?.carBrand || 'N/A'} {log.carDetails?.carModel || 'N/A'}
                              </div>
                              <div className="text-sm text-gray-500">
                                {log.carDetails?.plateNumber || 'N/A'}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900 font-mono">
                                {log.bookingId?.toString().slice(-8) || 'N/A'}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {taskStatus.checked}/{taskStatus.total} tasks
                              </div>
                              <div className="text-xs text-gray-500">
                                {taskStatus.checked === taskStatus.total ? 'All completed' : 'Partial completion'}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-semibold text-green-600">
                                PKR {totalRepairCost.toLocaleString()}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {formatDate(log.date)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <button
                                onClick={() => viewMaintenanceDetails(log)}
                                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
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
              </div>

              
            </>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl shadow-lg">
              <div className="text-gray-500 text-lg mb-4">
                {maintenanceLogs.length === 0 ? "No maintenance history found" : "No maintenance records match your filter"}
              </div>
              <p className="text-gray-400">
                {maintenanceLogs.length === 0 
                  ? "Maintenance records will appear here after completing maintenance checklists." 
                  : "Try changing your filter to see more results."}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* MAINTENANCE DETAILS MODAL */}
      {isModalOpen && (
        <MaintenanceDetailsModal log={selectedLog} onClose={closeModal} />
      )}
    </>
  );
};

// MAINTENANCE DETAILS MODAL COMPONENT
const MaintenanceDetailsModal = ({ log, onClose }) => {
  // Add comprehensive null checks
  if (!log) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
        <div className="bg-white w-full max-w-4xl rounded-xl shadow-2xl p-6 relative">
          <div className="text-center py-8">
            <p className="text-red-500">No maintenance data available</p>
            <button
              onClick={onClose}
              className="mt-4 bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Safe data extraction with defaults - handle array structure
  const carDetails = log.carDetails || {};
  const tasks = Array.isArray(log.tasks) && log.tasks.length > 0 ? log.tasks[0] : {};
  const repairCosts = Array.isArray(log.repairCosts) && log.repairCosts.length > 0 ? log.repairCosts[0] : {};
  const repairDescriptions = Array.isArray(log.repairDescriptions) && log.repairDescriptions.length > 0 ? log.repairDescriptions[0] : {};

  const getTaskStatus = (tasks) => {
    if (!tasks || typeof tasks !== 'object') return { checked: 0, total: 0 };
    
    const taskEntries = Object.entries(tasks);
    const checkedTasks = taskEntries.filter(([_, isChecked]) => isChecked === true);
    
    return {
      checked: checkedTasks.length,
      total: taskEntries.length
    };
  };

  const getRepairCost = (repairCosts) => {
    if (!repairCosts || typeof repairCosts !== 'object') return 0;
    
    return Object.values(repairCosts).reduce((total, cost) => {
      const costNum = parseFloat(cost) || 0;
      return total + costNum;
    }, 0);
  };

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

  // Safe string conversion for all display values
  const safeString = (value) => {
    if (value === null || value === undefined) return 'N/A';
    if (typeof value === 'object') return JSON.stringify(value);
    return String(value);
  };

  const taskStatus = getTaskStatus(tasks);
  const totalRepairCost = getRepairCost(repairCosts);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl p-6 relative">
        <h2 className="text-2xl font-bold mb-4 text-center text-[#0B132A]">
          Maintenance Details
        </h2>

        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-700 mb-2">Car Information</h3>
            <p className="text-sm"><strong>Car:</strong> {safeString(carDetails.carBrand)} {safeString(carDetails.carModel)}</p>
            <p className="text-sm"><strong>Plate Number:</strong> {safeString(carDetails.plateNumber)}</p>
            <p className="text-sm"><strong>Booking ID:</strong> {log.bookingId ? safeString(log.bookingId).slice(-8) : 'N/A'}</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-700 mb-2">Maintenance Summary</h3>
            <p className="text-sm"><strong>Date & Time:</strong> {formatDate(log.date)}</p>
            <p className="text-sm"><strong>Tasks Completed:</strong> {taskStatus.checked}/{taskStatus.total}</p>
            <p className="text-sm"><strong>Total Repair Cost:</strong> PKR {totalRepairCost.toLocaleString()}</p>
          </div>
        </div>

        {/* Tasks Checklist */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-700 mb-3">Tasks Checklist</h3>
          {Object.keys(tasks).length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {Object.entries(tasks).map(([task, isChecked]) => (
                <div key={task} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                  <span className="text-sm capitalize">{safeString(task).replace(/([A-Z])/g, ' $1').trim()}</span>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    isChecked 
                      ? 'bg-white text-black' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {isChecked ? 'Done' : 'Need Service'}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">No tasks recorded</p>
          )}
        </div>

        {/* Repair Descriptions */}
        {repairDescriptions && Object.keys(repairDescriptions).length > 0 ? (
          <div className="mb-6">
            <h3 className="font-semibold text-gray-700 mb-3">Repair Descriptions</h3>
            <div className="space-y-3">
              {Object.entries(repairDescriptions).map(([task, description]) => (
                description && (
                  <div key={task} className=" p-3 rounded-lg">
                    <p className="font-medium text-sm capitalize text-gray-700">
                      {safeString(task).replace(/([A-Z])/g, ' $1').trim()}:
                    </p>
                    <p className="text-sm text-gray-600 mt-1">{safeString(description)}</p>
                    {repairCosts && repairCosts[task] && (
                      <p className="text-sm font-semibold  mt-1">
                        Cost: PKR {parseFloat(repairCosts[task] || 0).toLocaleString()}
                      </p>
                    )}
                  </div>
                )
              ))}
            </div>
          </div>
        ) : (
          <div className="mb-6">
            <h3 className="font-semibold text-gray-700 mb-3">Repair Descriptions</h3>
            <p className="text-gray-500 text-center py-4">No repair descriptions recorded</p>
          </div>
        )}

        {/* Repair Costs Summary */}
        {repairCosts && Object.keys(repairCosts).length > 0 ? (
          <div className="mb-6">
            <h3 className="font-semibold text-gray-700 mb-3">Repair Costs Breakdown</h3>
            <div className="space-y-2">
              {Object.entries(repairCosts).map(([task, cost]) => (
                <div key={task} className="flex justify-between items-center  p-3 rounded-lg">
                  <span className="text-sm capitalize">
                    {safeString(task).replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <span className="text-sm font-semibold ">
                    PKR {parseFloat(cost || 0).toLocaleString()}
                  </span>
                </div>
              ))}
              <div className="flex justify-between items-center  p-3 rounded-lg border ">
                <span className="font-semibold">Total Repair Cost</span>
                <span className="font-bold ">
                  PKR {totalRepairCost.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="mb-6">
            <h3 className="font-semibold text-gray-700 mb-3">Repair Costs</h3>
            <p className="text-gray-500 text-center py-4">No repair costs recorded</p>
          </div>
        )}

        {/* Close Button */}
        <div className="flex justify-end pt-4 border-t">
          <button
            onClick={onClose}
            className="bg-[#C17D3C] text-white px-6 py-2 rounded-lg hover:bg-[#B06D2C] transition-colors"
          >
            Close
          </button>
        </div>

        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-xl font-bold"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default MaintenanceHistoryPage;