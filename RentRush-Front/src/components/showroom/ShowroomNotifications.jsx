// components/showroom/ShowroomNotifications.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Bell, 
  CheckCircle, 
  Trash2, 
  Filter,
  Calendar,
  CreditCard,
  Wrench,
  Car,
  AlertCircle,
  Clock,
  ArrowLeft,
  Eye,
  Search
} from "lucide-react";

function ShowroomNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all, unread, read
  const [searchTerm, setSearchTerm] = useState("");
  const showroomId = sessionStorage.getItem("userId");

  useEffect(() => {
    fetchNotifications();
  }, [filter]);

  const fetchNotifications = async () => {
    if (!showroomId) return;
    
    try {
      setLoading(true);
      const unreadOnly = filter === "unread";
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/notifications/user/${showroomId}?unreadOnly=${unreadOnly}&limit=100`
      );
      
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setNotifications(data.notifications || []);
        }
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (notificationId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/notifications/read/${notificationId}`,
        { method: "PATCH" }
      );

      if (response.ok) {
        setNotifications(prev => 
          prev.map(n => n._id === notificationId ? { ...n, read: true } : n)
        );
      }
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const markAllAsRead = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/notifications/read-all/${showroomId}`,
        { method: "PATCH" }
      );

      if (response.ok) {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
      }
    } catch (error) {
      console.error("Error marking all as read:", error);
    }
  };

  const deleteNotification = async (notificationId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/notifications/${notificationId}`,
        { method: "DELETE" }
      );

      if (response.ok) {
        setNotifications(prev => prev.filter(n => n._id !== notificationId));
      }
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  const deleteAllRead = async () => {
    try {
      const readNotifications = notifications.filter(n => n.read);
      for (const notification of readNotifications) {
        await deleteNotification(notification._id);
      }
      // Refresh the list
      fetchNotifications();
    } catch (error) {
      console.error("Error deleting all read notifications:", error);
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'booking_reminder':
      case 'booking_confirmation':
        return <Calendar className="text-blue-500" size={20} />;
      case 'payment_due':
        return <CreditCard className="text-green-500" size={20} />;
      case 'car_maintenance':
        return <Wrench className="text-orange-500" size={20} />;
      case 'car_return':
        return <Car className="text-purple-500" size={20} />;
      case 'booking_completion':
        return <CheckCircle className="text-green-500" size={20} />;
      case 'booking_cancellation':
        return <AlertCircle className="text-red-500" size={20} />;
      default:
        return <Bell className="text-gray-500" size={20} />;
    }
  };

  const getNotificationTypeLabel = (type) => {
    switch (type) {
      case 'booking_reminder': return 'Booking Reminder';
      case 'booking_confirmation': return 'Booking Confirmation';
      case 'payment_due': return 'Payment Due';
      case 'car_maintenance': return 'Maintenance';
      case 'car_return': return 'Car Return';
      case 'booking_completion': return 'Booking Complete';
      case 'booking_cancellation': return 'Booking Cancelled';
      default: return 'General';
    }
  };

  const formatTime = (createdAt) => {
    const now = new Date();
    const notificationTime = new Date(createdAt);
    const diffInMinutes = Math.floor((now - notificationTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return notificationTime.toLocaleDateString();
  };

  const formatDetailedTime = (createdAt) => {
    return new Date(createdAt).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Filter notifications based on search term
  const filteredNotifications = notifications.filter(notification =>
    notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
    getNotificationTypeLabel(notification.type).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const unreadCount = notifications.filter(n => !n.read).length;
  const readCount = notifications.filter(n => n.read).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Clock className="animate-spin mx-auto mb-4 text-[#C17D3C]" size={32} />
          <p className="text-gray-600">Loading notifications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Link 
            to="/showroom/dashboard" 
            className="inline-flex items-center text-[#C17D3C] hover:text-[#B06F35] mb-4 transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Dashboard
          </Link>
          
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
              <p className="text-gray-600 mt-1">Manage your showroom notifications and stay updated</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-500">
                <span className="font-semibold text-blue-600">{unreadCount} unread</span>
                <span className="mx-2">•</span>
                <span className="font-semibold text-gray-600">{readCount} read</span>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
            <div className="flex flex-col sm:flex-row gap-4 flex-1 w-full">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search notifications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C17D3C] focus:border-transparent"
                />
              </div>

              {/* Filter */}
              <select 
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#C17D3C] focus:border-transparent"
              >
                <option value="all">All Notifications</option>
                <option value="unread">Unread Only</option>
                <option value="read">Read Only</option>
              </select>
            </div>

            <div className="flex gap-2 w-full lg:w-auto">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
                >
                  <CheckCircle size={18} />
                  Mark All Read
                </button>
              )}
              {readCount > 0 && (
                <button
                  onClick={deleteAllRead}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
                >
                  <Trash2 size={18} />
                  Clear Read
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-16">
              <Bell size={64} className="mx-auto mb-4 text-gray-400" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">No notifications found</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                {searchTerm ? "No notifications match your search criteria." : "You're all caught up! No notifications at the moment."}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredNotifications.map((notification) => (
                <motion.div
                  key={notification._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`p-6 hover:bg-gray-50 transition-colors ${
                    !notification.read ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className={`p-2 rounded-lg ${
                        !notification.read ? 'bg-blue-100' : 'bg-gray-100'
                      }`}>
                        {getNotificationIcon(notification.type)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className={`font-semibold text-lg ${
                            !notification.read ? 'text-gray-900' : 'text-gray-700'
                          }`}>
                            {notification.title}
                          </h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            !notification.read 
                              ? 'bg-blue-100 text-blue-800' 
                              : 'bg-gray-100 text-gray-600'
                          }`}>
                            {getNotificationTypeLabel(notification.type)}
                          </span>
                          {!notification.read && (
                            <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                              New
                            </span>
                          )}
                        </div>
                        
                        <p className="text-gray-600 mb-3 leading-relaxed">
                          {notification.message}
                        </p>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>{formatDetailedTime(notification.createdAt)}</span>
                          <span>•</span>
                          <span>{formatTime(notification.createdAt)}</span>
                        </div>

                        {notification.metadata && (
                          <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                            <div className="text-sm text-gray-600">
                              {notification.metadata.customerName && (
                                <p><strong>Customer:</strong> {notification.metadata.customerName}</p>
                              )}
                              {notification.metadata.carBrand && (
                                <p><strong>Vehicle:</strong> {notification.metadata.carBrand} {notification.metadata.carModel}</p>
                              )}
                              {notification.metadata.endTime && (
                                <p><strong>End Time:</strong> {notification.metadata.endTime}</p>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2 ml-4 flex-shrink-0">
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification._id)}
                          className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                          title="Mark as read"
                        >
                          <CheckCircle size={18} />
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(notification._id)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                        title="Delete notification"
                      >
                        <Trash2 size={18} />
                      </button>
                      {notification.bookingId && (
                        <Link
                          to={`/showroom/bookings/${notification.bookingId}`}
                          className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                          title="View Booking"
                        >
                          <Eye size={18} />
                        </Link>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Stats */}
        {filteredNotifications.length > 0 && (
          <div className="mt-6 text-center text-sm text-gray-500">
            Showing {filteredNotifications.length} of {notifications.length} notifications
          </div>
        )}
      </div>
    </div>
  );
}

export default ShowroomNotifications;