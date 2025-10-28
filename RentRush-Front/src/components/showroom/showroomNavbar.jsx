// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Link, useLocation } from "react-router-dom";
// import { 
//   LogOut, 
//   Car, 
//   Wrench, 
//   CreditCard, 
//   FileText, 
//   AlertTriangle,
//   ShieldAlert,
//   Calendar,
//   Bell,
//   X,
//   History,
//   ClipboardList // ✅ Maintenance History ke liye naya icon
// } from "lucide-react";

// function ShowroomNavbar() {
//   const [isDropdownOpen, setDropdownOpen] = useState(false);
//   const [isNotificationsOpen, setNotificationsOpen] = useState(false);
//   const location = useLocation();

//   // ✅ UPDATED: Main Navigation Bar mein Maintenance History add kiya
//   const navItems = [
//     { label: "Home", to: "/showroom/dashboard" },
//     { label: "Inventory", to: "/showroom/inventory" },
//     { label: "Maintenance", to: "/showroom/maintenance" },
//     { label: "Payments", to: "/showroom/payments" },
//     { label: "Invoices", to: "/showroom/invoices" },
//   ];

//   const showroomLogoUrl = `${
//     import.meta.env.VITE_API_URL
//   }/Uploads/${sessionStorage.getItem("logo")}`;
//   const showroomName = sessionStorage.getItem("showroomName");
//   const name = sessionStorage.getItem("name");

//   const profilePictureUrl =
//     sessionStorage.getItem("profilePicture") || showroomLogoUrl || "/src/assets/default-avatar.png";

//   // Sample notifications data - aap isko real API se replace kar sakte hain
//   const [notifications, setNotifications] = useState([
//     {
//       id: 1,
//       title: "New Booking Request",
//       message: "You have a new car booking request for Toyota Corolla",
//       time: "5 minutes ago",
//       read: false,
//       type: "booking"
//     },
//     {
//       id: 2,
//       title: "Payment Received",
//       message: "Payment of $150 has been received for booking #12345",
//       time: "1 hour ago",
//       read: false,
//       type: "payment"
//     },
//     {
//       id: 3,
//       title: "Maintenance Reminder",
//       message: "Scheduled maintenance for Honda Civic is due tomorrow",
//       time: "2 hours ago",
//       read: true,
//       type: "maintenance"
//     },
//     {
//       id: 4,
//       title: "Car Returned",
//       message: "Toyota Camry has been returned successfully",
//       time: "1 day ago",
//       read: true,
//       type: "return"
//     }
//   ]);

//   const unreadCount = notifications.filter(notification => !notification.read).length;

//   const callLogoutApi = () => {
//     sessionStorage.removeItem("token");
//     sessionStorage.removeItem("role");
//     sessionStorage.removeItem("showroomName");
//     sessionStorage.removeItem("logo");
//     sessionStorage.removeItem("name");
//     sessionStorage.removeItem("profilePicture");
//     window.location.href = "/login";
//   };

//   const markAsRead = (id) => {
//     setNotifications(notifications.map(notification => 
//       notification.id === id ? { ...notification, read: true } : notification
//     ));
//   };

//   const markAllAsRead = () => {
//     setNotifications(notifications.map(notification => ({ ...notification, read: true })));
//   };

//   const deleteNotification = (id) => {
//     setNotifications(notifications.filter(notification => notification.id !== id));
//   };

//   // ✅ UPDATED: Maintenance History ko dropdown items mein add kiya
//   const dropdownItems = [
//     { label: "Inventory", path: "/showroom/inventory", icon: Car },
//     { label: "Bookings", path: "/showroom/bookings", icon: Calendar },
//     { label: "Maintenance", path: "/showroom/maintenance", icon: Wrench },
//     { label: "Maintenance History", path: "/showroom/maintenance-history", icon: ClipboardList }, // ✅ ADDED
//     { label: "Payment", path: "/showroom/payments", icon: CreditCard },
//     { label: "Payment History", path: "/showroom/payment-history", icon: History },
//     { label: "Invoice", path: "/showroom/invoices", icon: FileText },
//     { label: "Notifications", path: "/showroom/notifications", icon: Bell },
//     { label: "Complaints", path: "/showroom/showroom-complaints", icon: AlertTriangle },
//     { label: "Theft Reports", path: "/showroom/theft-reports", icon: ShieldAlert },
//   ];

//   const getNotificationIcon = (type) => {
//     switch (type) {
//       case 'booking': return <Calendar size={16} className="text-blue-500" />;
//       case 'payment': return <CreditCard size={16} className="text-green-500" />;
//       case 'maintenance': return <Wrench size={16} className="text-orange-500" />;
//       case 'return': return <Car size={16} className="text-purple-500" />;
//       default: return <Bell size={16} className="text-gray-500" />;
//     }
//   };

//   return (
//     <nav className="bg-white shadow-md sticky top-0 z-50 px-5 md:px-8">
//       <div className="max-w-screen-4xl mx-auto flex items-center justify-between h-20">
//         {/* Left: RentRush Logo + Name */}
//         <div className="flex items-center gap-3">
//           <Link to="/showroom/dashboard" className="flex items-center">
//             <img
//               src="/src/assets/logo.png"
//               alt="Logo"
//               className="-my-3 h-[100px] mr-2"
//             />
//             <div className="flex flex-col">
//               <h1 className="list-none cursor-pointer font-bold text-[28px] text-[#C17D3C] leading-tight">
//                 RentRush
//               </h1>
//             </div>
//           </Link>
//         </div>

//         {/* Center: Navigation Links */}
//         <div className="hidden lg:flex items-center gap-12">
//           {navItems.map(({ label, to }) => (
//             <Link
//               key={label}
//               to={to}
//               className={`relative text-lg font-medium transition-colors ${
//                 location.pathname === to
//                   ? "text-[#C17D3C]"
//                   : "text-gray-600 hover:text-[#C17D3C]"
//               }`}
//             >
//               {label}
//               {location.pathname === to && (
//                 <motion.div
//                   className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#C17D3C]"
//                   layoutId="underline"
//                   initial={{ scaleX: 0 }}
//                   animate={{ scaleX: 1 }}
//                   transition={{ duration: 0.3 }}
//                 />
//               )}
//             </Link>
//           ))}
//         </div>

//         {/* Right: Notification, Profile Picture, Name and Dropdown */}
//         <div className="flex items-center gap-4">
//           {/* Notification Bell */}
//           <div className="relative">
//             <button
//               onClick={() => setNotificationsOpen(!isNotificationsOpen)}
//               className="relative p-2 rounded-lg transition-all hover:bg-gray-100 text-gray-600 hover:text-[#C17D3C]"
//             >
//               <Bell size={24} />
//               {unreadCount > 0 && (
//                 <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
//                   {unreadCount}
//                 </span>
//               )}
//             </button>

//             {/* Notifications Dropdown */}
//             <AnimatePresence>
//               {isNotificationsOpen && (
//                 <motion.div
//                   initial={{ opacity: 0, y: -10, scale: 0.95 }}
//                   animate={{ opacity: 1, y: 0, scale: 1 }}
//                   exit={{ opacity: 0, y: -10, scale: 0.95 }}
//                   transition={{ duration: 0.2, ease: "easeOut" }}
//                   className="absolute right-0 top-12 mt-2 w-80 origin-top-right bg-white rounded-xl shadow-lg ring-1 ring-gray-200 focus:outline-none z-50 overflow-hidden"
//                 >
//                   <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center">
//                     <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
//                     <div className="flex gap-2">
//                       {unreadCount > 0 && (
//                         <button
//                           onClick={markAllAsRead}
//                           className="text-xs text-blue-600 hover:text-blue-800 font-medium"
//                         >
//                           Mark all read
//                         </button>
//                       )}
//                       <button
//                         onClick={() => setNotificationsOpen(false)}
//                         className="text-gray-400 hover:text-gray-600"
//                       >
//                         <X size={16} />
//                       </button>
//                     </div>
//                   </div>

//                   <div className="max-h-96 overflow-y-auto">
//                     {notifications.length === 0 ? (
//                       <div className="p-4 text-center text-gray-500">
//                         No notifications
//                       </div>
//                     ) : (
//                       notifications.map((notification) => (
//                         <motion.div
//                           key={notification.id}
//                           initial={{ opacity: 0, x: -20 }}
//                           animate={{ opacity: 1, x: 0 }}
//                           className={`border-b border-gray-100 last:border-b-0 ${
//                             !notification.read ? 'bg-blue-50' : ''
//                           }`}
//                         >
//                           <div className="p-4 hover:bg-gray-50 transition-colors">
//                             <div className="flex justify-between items-start mb-2">
//                               <div className="flex items-center gap-2">
//                                 {getNotificationIcon(notification.type)}
//                                 <h4 className={`font-medium ${
//                                   !notification.read ? 'text-gray-900' : 'text-gray-700'
//                                 }`}>
//                                   {notification.title}
//                                 </h4>
//                               </div>
//                               <button
//                                 onClick={() => deleteNotification(notification.id)}
//                                 className="text-gray-400 hover:text-red-500 transition-colors"
//                               >
//                                 <X size={14} />
//                               </button>
//                             </div>
//                             <p className="text-sm text-gray-600 mb-2">
//                               {notification.message}
//                             </p>
//                             <div className="flex justify-between items-center">
//                               <span className="text-xs text-gray-400">
//                                 {notification.time}
//                               </span>
//                               {!notification.read && (
//                                 <button
//                                   onClick={() => markAsRead(notification.id)}
//                                   className="text-xs text-blue-600 hover:text-blue-800 font-medium"
//                                 >
//                                   Mark as read
//                                 </button>
//                               )}
//                             </div>
//                           </div>
//                         </motion.div>
//                       ))
//                     )}
//                   </div>

//                   <div className="border-t border-gray-100 p-3">
//                     <Link
//                       to="/showroom/notifications"
//                       className="block text-center text-sm text-blue-600 hover:text-blue-800 font-medium"
//                       onClick={() => setNotificationsOpen(false)}
//                     >
//                       View all notifications
//                     </Link>
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>

//           {/* Profile Dropdown */}
//           <div className="relative">
//             <button
//               onClick={() => setDropdownOpen(!isDropdownOpen)}
//               className="flex items-center gap-3 p-2 rounded-lg transition-all hover:bg-gray-100"
//             >
//               <img
//                 src={profilePictureUrl}
//                 alt="Profile"
//                 className="h-10 w-10 rounded-full object-cover border-2 border-[#C17D3C]"
//               />
//               <span className="text-gray-700 font-medium hidden md:block">
//                 {showroomName || "Showroom Owner"}
//               </span>
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className={`h-4 w-4 transition-transform ${
//                   isDropdownOpen ? "rotate-180" : ""
//                 }`}
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M19 9l-7 7-7-7"
//                 />
//               </svg>
//             </button>

//             {/* Profile Dropdown Menu */}
//             <AnimatePresence>
//               {isDropdownOpen && (
//                 <motion.div
//                   initial={{ opacity: 0, y: -10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -10 }}
//                   transition={{ duration: 0.2, ease: "easeOut" }}
//                   className="absolute right-0 top-16 mt-2 w-56 origin-top-right bg-white rounded-xl shadow-lg ring-1 ring-gray-200 focus:outline-none z-50 overflow-hidden"
//                 >
//                   <div className="px-4 py-3 border-b border-gray-100">
//                     <p className="text-sm font-medium text-gray-900">
//                       {name || "Showroom Owner"}
//                     </p>
//                     <p className="text-xs text-gray-500">
//                       {showroomName || "Showroom"}
//                     </p>
//                   </div>

//                   <div className="py-1">
//                     {dropdownItems.map((item) => (
//                       <motion.div
//                         key={item.label}
//                         whileHover={{ x: 5 }}
//                         transition={{ type: "spring", stiffness: 300 }}
//                       >
//                         <Link
//                           to={item.path}
//                           className={`flex items-center px-4 py-2.5 transition-colors ${
//                             location.pathname === item.path
//                               ? "bg-blue-50 text-blue-600"
//                               : "text-gray-700 hover:bg-gray-50"
//                           }`}
//                           onClick={() => setDropdownOpen(false)}
//                         >
//                           <item.icon className="mr-3" size={18} />
//                           <span>{item.label}</span>
//                         </Link>
//                       </motion.div>
//                     ))}
//                   </div>

//                   <div className="border-t border-gray-100 py-1">
//                     <motion.div
//                       whileHover={{ x: 5 }}
//                       transition={{ type: "spring", stiffness: 300 }}
//                     >
//                       <button
//                         onClick={callLogoutApi}
//                         className="flex w-full items-center px-4 py-2.5 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
//                       >
//                         <LogOut className="mr-3" size={18} />
//                         <span>Sign out</span>
//                       </button>
//                     </motion.div>
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default ShowroomNavbar;

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { 
  LogOut, 
  Car, 
  Wrench, 
  CreditCard, 
  FileText, 
  AlertTriangle,
  ShieldAlert,
  Calendar,
  Bell,
  X,
  History,
  ClipboardList,
  CheckCircle,
  AlertCircle,
  Clock,
  User
} from "lucide-react";

function ShowroomNavbar() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isNotificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const navItems = [
    { label: "Home", to: "/showroom/dashboard" },
    { label: "Inventory", to: "/showroom/inventory" },
    { label: "Maintenance", to: "/showroom/maintenance" },
    { label: "Payments", to: "/showroom/payments" },
    { label: "Invoices", to: "/showroom/invoices" },
  ];

  const showroomLogoUrl = `${
    import.meta.env.VITE_API_URL
  }/Uploads/${sessionStorage.getItem("logo")}`;
  const showroomName = sessionStorage.getItem("showroomName");
  const name = sessionStorage.getItem("name");
  const showroomId = sessionStorage.getItem("userId"); // Showroom ID

  const profilePictureUrl =
    sessionStorage.getItem("profilePicture") || showroomLogoUrl || "/src/assets/default-avatar.png";

  // Fetch notifications from backend
  const fetchNotifications = async () => {
    if (!showroomId) return;
    
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/notifications/user/${showroomId}?unreadOnly=false&limit=10`
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

  // Fetch notifications on component mount and when notification dropdown opens
  useEffect(() => {
    if (isNotificationsOpen && showroomId) {
      fetchNotifications();
    }
  }, [isNotificationsOpen, showroomId]);

  // Real-time notifications check (every 30 seconds)
  useEffect(() => {
    if (showroomId) {
      fetchNotifications(); // Initial fetch
      
      const interval = setInterval(() => {
        fetchNotifications();
      }, 30000); // Every 30 seconds
      
      return () => clearInterval(interval);
    }
  }, [showroomId]);

  const callLogoutApi = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("showroomName");
    sessionStorage.removeItem("logo");
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("profilePicture");
    sessionStorage.removeItem("userId");
    window.location.href = "/login";
  };

  // Mark notification as read
  const markAsRead = async (notificationId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/notifications/read/${notificationId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          }
        }
      );

      if (response.ok) {
        // Update local state
        setNotifications(prev => 
          prev.map(notification => 
            notification._id === notificationId 
              ? { ...notification, read: true } 
              : notification
          )
        );
      }
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  // Mark all notifications as read
  const markAllAsRead = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/notifications/read-all/${showroomId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          }
        }
      );

      if (response.ok) {
        // Update all notifications to read
        setNotifications(prev => 
          prev.map(notification => ({ ...notification, read: true }))
        );
      }
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
    }
  };

  // Delete notification
  const deleteNotification = async (notificationId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/notifications/${notificationId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // Remove from local state
        setNotifications(prev => 
          prev.filter(notification => notification._id !== notificationId)
        );
      }
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  const unreadCount = notifications.filter(notification => !notification.read).length;

  const dropdownItems = [
    { label: "Inventory", path: "/showroom/inventory", icon: Car },
    { label: "Bookings", path: "/showroom/bookings", icon: Calendar },
    { label: "Maintenance", path: "/showroom/maintenance", icon: Wrench },
    { label: "Maintenance History", path: "/showroom/maintenance-history", icon: ClipboardList },
    { label: "Payment", path: "/showroom/payments", icon: CreditCard },
    { label: "Payment History", path: "/showroom/payment-history", icon: History },
    { label: "Invoice", path: "/showroom/invoices", icon: FileText },
    { label: "Notifications", path: "/showroom/notifications", icon: Bell },
    { label: "Complaints", path: "/showroom/showroom-complaints", icon: AlertTriangle },
    { label: "Theft Reports", path: "/showroom/theft-reports", icon: ShieldAlert },
  ];

  // Get appropriate icon based on notification type
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'booking_reminder':
      case 'booking_confirmation':
        return <Calendar size={16} className="text-blue-500" />;
      case 'payment_due':
        return <CreditCard size={16} className="text-green-500" />;
      case 'car_maintenance':
        return <Wrench size={16} className="text-orange-500" />;
      case 'car_return':
        return <Car size={16} className="text-purple-500" />;
      case 'booking_completion':
        return <CheckCircle size={16} className="text-green-500" />;
      case 'booking_cancellation':
        return <AlertCircle size={16} className="text-red-500" />;
      default:
        return <Bell size={16} className="text-gray-500" />;
    }
  };

  // Format time for display
  const formatTime = (createdAt) => {
    const now = new Date();
    const notificationTime = new Date(createdAt);
    const diffInMinutes = Math.floor((now - notificationTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  // Get priority color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'border-l-4 border-l-red-500 bg-red-50';
      case 'high': return 'border-l-4 border-l-orange-500 bg-orange-50';
      case 'medium': return 'border-l-4 border-l-blue-500 bg-blue-50';
      case 'low': return 'border-l-4 border-l-gray-500 bg-gray-50';
      default: return 'border-l-4 border-l-gray-500 bg-gray-50';
    }
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 px-5 md:px-8">
      <div className="max-w-screen-4xl mx-auto flex items-center justify-between h-20">
        {/* Left: RentRush Logo + Name */}
        <div className="flex items-center gap-3">
          <Link to="/showroom/dashboard" className="flex items-center">
            <img
              src="/src/assets/logo.png"
              alt="Logo"
              className="-my-3 h-[100px] mr-2"
            />
            <div className="flex flex-col">
              <h1 className="list-none cursor-pointer font-bold text-[28px] text-[#C17D3C] leading-tight">
                RentRush
              </h1>
            </div>
          </Link>
        </div>

        {/* Center: Navigation Links */}
        <div className="hidden lg:flex items-center gap-12">
          {navItems.map(({ label, to }) => (
            <Link
              key={label}
              to={to}
              className={`relative text-lg font-medium transition-colors ${
                location.pathname === to
                  ? "text-[#C17D3C]"
                  : "text-gray-600 hover:text-[#C17D3C]"
              }`}
            >
              {label}
              {location.pathname === to && (
                <motion.div
                  className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#C17D3C]"
                  layoutId="underline"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* Right: Notification, Profile Picture, Name and Dropdown */}
        <div className="flex items-center gap-4">
          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(!isNotificationsOpen)}
              className="relative p-2 rounded-lg transition-all hover:bg-gray-100 text-gray-600 hover:text-[#C17D3C]"
            >
              <Bell size={24} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            <AnimatePresence>
              {isNotificationsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute right-0 top-12 mt-2 w-96 origin-top-right bg-white rounded-xl shadow-lg ring-1 ring-gray-200 focus:outline-none z-50 overflow-hidden"
                >
                  <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                    <div className="flex gap-2 items-center">
                      {unreadCount > 0 && (
                        <button
                          onClick={markAllAsRead}
                          className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                        >
                          Mark all read
                        </button>
                      )}
                      <button
                        onClick={() => setNotificationsOpen(false)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="max-h-96 overflow-y-auto">
                    {loading ? (
                      <div className="p-4 text-center text-gray-500">
                        <Clock className="animate-spin mx-auto mb-2" size={20} />
                        Loading notifications...
                      </div>
                    ) : notifications.length === 0 ? (
                      <div className="p-4 text-center text-gray-500">
                        <Bell size={24} className="mx-auto mb-2 text-gray-400" />
                        No notifications
                      </div>
                    ) : (
                      notifications.map((notification) => (
                        <motion.div
                          key={notification._id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className={`border-b border-gray-100 last:border-b-0 ${
                            !notification.read ? getPriorityColor(notification.priority) : ''
                          }`}
                        >
                          <div className="p-4 hover:bg-gray-50 transition-colors">
                            <div className="flex justify-between items-start mb-2">
                              <div className="flex items-center gap-2 flex-1">
                                {getNotificationIcon(notification.type)}
                                <h4 className={`font-medium text-sm ${
                                  !notification.read ? 'text-gray-900' : 'text-gray-700'
                                }`}>
                                  {notification.title}
                                </h4>
                              </div>
                              <button
                                onClick={() => deleteNotification(notification._id)}
                                className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0 ml-2"
                              >
                                <X size={14} />
                              </button>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">
                              {notification.message}
                            </p>
                            <div className="flex justify-between items-center">
                              <span className="text-xs text-gray-400">
                                {formatTime(notification.createdAt)}
                              </span>
                              <div className="flex gap-2">
                                {!notification.read && (
                                  <button
                                    onClick={() => markAsRead(notification._id)}
                                    className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                                  >
                                    Mark read
                                  </button>
                                )}
                                {notification.bookingId && (
                                  <Link
                                    to={`/showroom/bookings/${notification.bookingId}`}
                                    className="text-xs text-green-600 hover:text-green-800 font-medium"
                                    onClick={() => setNotificationsOpen(false)}
                                  >
                                    View Booking
                                  </Link>
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))
                    )}
                  </div>

                  <div className="border-t border-gray-100 p-3">
                    <Link
                      to="/showroom/notifications"
                      className="block text-center text-sm text-blue-600 hover:text-blue-800 font-medium"
                      onClick={() => setNotificationsOpen(false)}
                    >
                      View all notifications
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-3 p-2 rounded-lg transition-all hover:bg-gray-100"
            >
              <img
                src={profilePictureUrl}
                alt="Profile"
                className="h-10 w-10 rounded-full object-cover border-2 border-[#C17D3C]"
              />
              <span className="text-gray-700 font-medium hidden md:block">
                {showroomName || "Showroom Owner"}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 transition-transform ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Profile Dropdown Menu */}
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute right-0 top-16 mt-2 w-56 origin-top-right bg-white rounded-xl shadow-lg ring-1 ring-gray-200 focus:outline-none z-50 overflow-hidden"
                >
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">
                      {name || "Showroom Owner"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {showroomName || "Showroom"}
                    </p>
                  </div>

                  <div className="py-1">
                    {dropdownItems.map((item) => (
                      <motion.div
                        key={item.label}
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Link
                          to={item.path}
                          className={`flex items-center px-4 py-2.5 transition-colors ${
                            location.pathname === item.path
                              ? "bg-blue-50 text-blue-600"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                          onClick={() => setDropdownOpen(false)}
                        >
                          <item.icon className="mr-3" size={18} />
                          <span>{item.label}</span>
                        </Link>
                      </motion.div>
                    ))}
                  </div>

                  <div className="border-t border-gray-100 py-1">
                    <motion.div
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <button
                        onClick={callLogoutApi}
                        className="flex w-full items-center px-4 py-2.5 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                      >
                        <LogOut className="mr-3" size={18} />
                        <span>Sign out</span>
                      </button>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default ShowroomNavbar;