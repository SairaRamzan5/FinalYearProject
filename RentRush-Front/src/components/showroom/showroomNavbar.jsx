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
  History,
  ClipboardList,
  User
} from "lucide-react";

function ShowroomNavbar({ onMenuClick }) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  
  // State for dynamic profile data
  const [profileData, setProfileData] = useState({
    showroomName: "Showroom Owner",
    name: "Showroom Owner",
    profilePicture: ""
  });

  const navItems = [
    { label: "Home", to: "/showroom/dashboard" },
    { label: "Inventory", to: "/showroom/inventory" },
    { label: "Car Returns", to: "/showroom/maintenance" },
    { label: "Payments", to: "/showroom/payments" },
    { label: "Invoices", to: "/showroom/invoices" },
  ];

  const Base_Url = import.meta.env.VITE_API_URL;

  // Get profile picture URL with fallbacks
  const getProfilePictureUrl = (profilePicture) => {
    if (!profilePicture) return "/src/assets/default-avatar.png";
    
    if (profilePicture.startsWith('http')) {
      return profilePicture;
    }
    if (profilePicture.startsWith('/uploads/')) {
      return `${Base_Url}${profilePicture}`;
    }
    if (profilePicture.startsWith('uploads/')) {
      return `${Base_Url}/${profilePicture}`;
    }
    return `${Base_Url}/uploads/${profilePicture}`;
  };

  // Update profile data from session storage
  const updateProfileFromStorage = () => {
    const updatedData = {
      showroomName: sessionStorage.getItem("showroomName") || "Showroom Owner",
      name: sessionStorage.getItem("name") || "Showroom Owner",
      profilePicture: sessionStorage.getItem("profilePicture") || sessionStorage.getItem("logo") || ""
    };
    setProfileData(updatedData);
    console.log("Navbar updated from session storage:", updatedData);
  };

  // Listen for profile update events
  useEffect(() => {
    const handleProfileUpdate = (event) => {
      console.log("Profile update event received in navbar:", event.detail);
      
      // Update from session storage (which was updated by ShowroomProfile)
      updateProfileFromStorage();
      
      // Also update from event detail if available
      if (event.detail) {
        const updates = {};
        if (event.detail.showroomName) {
          updates.showroomName = event.detail.showroomName;
          sessionStorage.setItem("showroomName", event.detail.showroomName);
        }
        if (event.detail.ownerName) {
          updates.name = event.detail.ownerName;
          sessionStorage.setItem("name", event.detail.ownerName);
        }
        if (event.detail.profileImage) {
          updates.profilePicture = event.detail.profileImage;
          sessionStorage.setItem("profilePicture", event.detail.profileImage);
          sessionStorage.setItem("logo", event.detail.profileImage);
        }
        
        if (Object.keys(updates).length > 0) {
          setProfileData(prev => ({ ...prev, ...updates }));
          console.log("Navbar updated from event:", updates);
        }
      }
    };

    // Listen for custom event when profile is updated
    window.addEventListener('showroomProfileUpdated', handleProfileUpdate);
    
    // Initial load from session storage
    updateProfileFromStorage();
    
    return () => {
      window.removeEventListener('showroomProfileUpdated', handleProfileUpdate);
    };
  }, []);

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

  // Updated dropdownItems with Notifications removed
  const dropdownItems = [
    { label: "Profile", path: "/showroom/profile", icon: User },
    { label: "Inventory", path: "/showroom/inventory", icon: Car },
    { label: "Bookings", path: "/showroom/bookings", icon: Calendar },
    { label: "Car Returns", path: "/showroom/maintenance", icon: Wrench },
    { label: "Maintenance History", path: "/showroom/maintenance-history", icon: ClipboardList },
    { label: "Payment", path: "/showroom/payments", icon: CreditCard },
    { label: "Payment History", path: "/showroom/payment-history", icon: History },
    { label: "Invoice", path: "/showroom/invoices", icon: FileText },
    { label: "Complaints", path: "/showroom/showroom-complaints", icon: AlertTriangle },
    { label: "Theft Reports", path: "/showroom/theft-reports", icon: ShieldAlert },
  ];

  const profilePictureUrl = getProfilePictureUrl(profileData.profilePicture);

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

        {/* Right: Profile Picture, Name and Dropdown */}
        <div className="flex items-center gap-4">
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
                onError={(e) => {
                  e.target.src = "/src/assets/default-avatar.png";
                }}
              />
              <span className="text-gray-700 font-medium hidden md:block">
                {profileData.showroomName}
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
                      {profileData.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {profileData.showroomName}
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