// import { useEffect, useState } from "react";
// import { useParams, useLocation } from "react-router-dom";
// import UserCard from "../customer/userCard";
// import axios from "axios";
// import Navbar from "./Navbar";
// import Footer from "./Footer";
// import { 
//   FiMapPin, 
//   FiClock, 
//   FiPhone, 
//   FiMail, 
//   FiCheckCircle,
//   FiShield,
//   FiStar
// } from "react-icons/fi";

// const Base_Url = import.meta.env.VITE_API_URL;

// function Showroomcars() {
//   const { id: showroomid } = useParams();
//   const location = useLocation();
//   const showroom = location.state?.showroom;
//   const [allcar, setAllCar] = useState([]);
//   const [filter, setFilter] = useState("available");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchCar = async () => {
//       try {
//         const response = await axios.get(
//           `${Base_Url}/api/getshowroomcar/${showroomid}`,
//           { withCredentials: true }
//         );
//         setAllCar(response.data.totalcar);
//       } catch (error) {
//         console.error("Error fetching cars:", error.response);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchCar();
//   }, [showroomid]);

//   const filteredCars = allcar.filter((car) =>
//     filter === "available"
//       ? car.availability === "Available"
//       : car.availability === "Rented Out"
//   );

//   return (
//     <>
//       <Navbar />
//       <div className="w-full min-h-screen bg-gradient-to-b from-gray-50 to-white py-6">
//         <div className="max-w-7xl mx-auto px-4">
          
//           {/* Header Section */}
//           <div className="flex flex-col lg:flex-row gap-8 mb-12">
//             <div className="w-full lg:w-2/5">
//               <div className="relative h-80 rounded-xl shadow-lg overflow-hidden">
//                 <img
//                   src={`${Base_Url}/uploads/${showroom.images[0]}`}
//                   alt={showroom.showroomName}
//                   className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
//                   onError={(e) => {
//                     e.target.src = "/path/to/default/image.png";
//                   }}
//                 />
//                 <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
//                   <h1 className="text-2xl font-bold text-white">
//                     {showroom.showroomName}
//                   </h1>
//                 </div>
//               </div>
//             </div>

//             <div className="w-full lg:w-3/5">
//               <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full">
//                 <h2 className="text-2xl font-bold text-gray-800 mb-4">About Our Showroom</h2>
//                 <p className="text-gray-600 mb-6">
//                   {showroom.about || `Welcome to ${showroom.showroomName}, your premier destination for quality Cars and 
//                   exceptional service. With ${showroom.yearsOfExperience || 'many'} years in the automotive industry, we pride ourselves 
//                   on offering a curated selection of Cars to meet every need and budget.`}
//                 </p>
                
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//                   <div className="flex items-start">
//                     <FiMapPin className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
//                     <div>
//                       <h3 className="font-semibold text-gray-800">Location</h3>
//                       <p className="text-gray-600">{showroom.address}</p>
//                     </div>
//                   </div>
//                   <div className="flex items-start">
//                     <FiClock className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
//                     <div>
//                       <h3 className="font-semibold text-gray-800">Operating Hours</h3>
//                       <p className="text-gray-600">{showroom.operatingHours || 'Mon-Sun: 12AM - 12PM'}</p>
//                     </div>
//                   </div>
//                   <div className="flex items-start">
//                     <FiPhone className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
//                     <div>
//                       <h3 className="font-semibold text-gray-800">Contact</h3>
//                       <p className="text-gray-600">{showroom.contactNumber || '+92 XXX XXXXXXX'}</p>
//                     </div>
//                   </div>
//                   <div className="flex items-start">
//                     <FiMail className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
//                     <div>
//                       <h3 className="font-semibold text-gray-800">Email</h3>
//                       <p className="text-gray-600">{showroom.email || 'info@showroom.com'}</p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Filter Tabs */}
//                 <div className="flex flex-wrap gap-2 mt-4">
//                   <button
//                     className={`px-4 py-2 rounded-full font-medium text-sm flex items-center ${
//                       filter === "available"
//                         ? "bg-blue-600 text-white"
//                         : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                     }`}
//                     onClick={() => setFilter("available")}
//                   >
//                     <FiCheckCircle className="mr-2" />
//                     Available Cars
//                   </button>
//                   <button
//                     className={`px-4 py-2 rounded-full font-medium text-sm flex items-center ${
//                       filter === "rented"
//                         ? "bg-blue-600 text-white"
//                         : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                     }`}
//                     onClick={() => setFilter("rented")}
//                   >
//                     <FiShield className="mr-2" />
//                     Rented Out Cars
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>

         

//           {/* Cars Section */}
//           <div className="mb-12">
//             <div className="flex justify-between items-center mb-6">
//               <h2 className="text-2xl font-bold text-gray-800">
//                 {filter === "available" ? "Available Cars" : "Rented Out Cars"}
//               </h2>
//               <p className="text-gray-600">
//                 {filteredCars.length} {filteredCars.length === 1 ? "Car" : "Cars"} found
//               </p>
//             </div>

//             {loading ? (
//               <div className="flex justify-center py-12">
//                 <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//               </div>
//             ) : filteredCars.length > 0 ? (
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {filteredCars.map((car, index) => (
//                   <UserCard key={index} car={car} />
//                 ))}
//               </div>
//             ) : (
//               <div className="bg-gray-50 rounded-xl p-8 text-center">
//                 <h3 className="text-lg font-semibold text-gray-600 mb-2">
//                   {filter === "available"
//                     ? "No Cars currently available"
//                     : "No Cars currently rented out"}
//                 </h3>
//                 <p className="text-gray-500">
//                   Please check back later or contact us for more information
//                 </p>
//               </div>
//             )}
//           </div>



// {/* Our Values Section */}
//           <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-12">
//             <h2 className="text-2xl font-bold text-gray-800 mb-6">Why Choose Us</h2>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               <div className="bg-blue-50 p-5 rounded-lg">
//                 <FiStar className="text-blue-500 text-2xl mb-3" />
//                 <h3 className="font-bold text-gray-800 mb-2">Premium Selection</h3>
//                 <p className="text-gray-600">
//                   Carefully curated Cars with regular maintenance checks to ensure top performance.
//                 </p>
//               </div>
//               <div className="bg-blue-50 p-5 rounded-lg">
//                 <FiShield className="text-blue-500 text-2xl mb-3" />
//                 <h3 className="font-bold text-gray-800 mb-2">Trust & Safety</h3>
//                 <p className="text-gray-600">
//                   Fully insured Cars with 24/7 roadside assistance for your peace of mind.
//                 </p>
//               </div>
//               <div className="bg-blue-50 p-5 rounded-lg">
//                 <FiCheckCircle className="text-blue-500 text-2xl mb-3" />
//                 <h3 className="font-bold text-gray-800 mb-2">Customer First</h3>
//                 <p className="text-gray-600">
//                   Our dedicated team is committed to providing exceptional service tailored to your needs.
//                 </p>
//               </div>
//             </div>
//           </div>
//           {/* Services Section */}
//           <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-12">
//             <h2 className="text-2xl font-bold text-gray-800 mb-6">Our Services</h2>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               <div className="border-l-4 border-blue-500 pl-4">
//                 <h3 className="font-bold text-gray-800 mb-2">Flexible Rentals</h3>
//                 <p className="text-gray-600">
//                   Daily, weekly, and monthly rental options to suit your schedule and budget.
//                 </p>
//               </div>
//               <div className="border-l-4 border-blue-500 pl-4">
//                 <h3 className="font-bold text-gray-800 mb-2">Maintenance Services</h3>
//                 <p className="text-gray-600">
//                   Comprehensive maintenance and repair services to keep your Cars in top condition.
//                 </p>
//               </div>
//               <div className="border-l-4 border-blue-500 pl-4">
//                 <h3 className="font-bold text-gray-800 mb-2">24/7 Support</h3>
//                 <p className="text-gray-600">
//                   Round-the-clock customer support for any questions or emergencies.
//                 </p>
//               </div>
//             </div>
//           </div>

//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }

// export default Showroomcars;


import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import UserCard from "../customer/userCard";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { 
  FiMapPin, 
  FiClock, 
  FiPhone, 
  FiMail, 
  FiCheckCircle,
  FiShield,
  FiStar,
  FiRefreshCw,
  FiUser,
  FiAward,
  FiHeart,
  FiImage,
  FiFileText,
  FiDownload,
  FiEye
} from "react-icons/fi";

const Base_Url = import.meta.env.VITE_API_URL;

function Showroomcars() {
  const { id: showroomid } = useParams();
  const location = useLocation();
  const [showroom, setShowroom] = useState(location.state?.showroom || null);
  const [allcar, setAllCar] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [filter, setFilter] = useState("available");
  const [loading, setLoading] = useState(true);
  const [showroomLoading, setShowroomLoading] = useState(!location.state?.showroom);
  const [refreshing, setRefreshing] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [documentsLoading, setDocumentsLoading] = useState(false);

  // Fetch latest showroom data
  const fetchShowroomData = async () => {
    try {
      setShowroomLoading(true);
      const response = await axios.get(
        `${Base_Url}/api/showroom/public/${showroomid}`
      );
      setShowroom(response.data.showroom);
      setImageError(false);
    } catch (error) {
      console.error("Error fetching showroom data:", error);
      if (!showroom && location.state?.showroom) {
        setShowroom(location.state.showroom);
      }
    } finally {
      setShowroomLoading(false);
      setRefreshing(false);
    }
  };

  // Fetch documents
  const fetchDocuments = async () => {
    try {
      setDocumentsLoading(true);
      const response = await axios.get(
        `${Base_Url}/api/showroom/documents/${showroomid}`
      );
      if (response.data.documents) {
        setDocuments(response.data.documents);
      }
    } catch (error) {
      console.error("Error fetching documents:", error);
      // If specific endpoint fails, try to get from showroom data
      if (showroom?.documents) {
        setDocuments(showroom.documents);
      }
    } finally {
      setDocumentsLoading(false);
    }
  };

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await axios.get(
          `${Base_Url}/api/getshowroomcar/${showroomid}`,
          { withCredentials: true }
        );
        setAllCar(response.data.totalcar);
      } catch (error) {
        console.error("Error fetching cars:", error.response);
      } finally {
        setLoading(false);
      }
    };

    if (!location.state?.showroom) {
      fetchShowroomData();
    } else {
      fetchShowroomData();
    }
    
    fetchCar();
    fetchDocuments();
  }, [showroomid, location.state]);

  // Listen for profile updates
  useEffect(() => {
    const handleProfileUpdate = (event) => {
      if (!event.detail || event.detail.showroomId === showroomid) {
        fetchShowroomData();
        fetchDocuments(); // Also refresh documents when profile updates
      }
    };

    window.addEventListener('showroomProfileUpdated', handleProfileUpdate);
    
    return () => {
      window.removeEventListener('showroomProfileUpdated', handleProfileUpdate);
    };
  }, [showroomid]);

  // Get profile image URL
  const getProfileImageUrl = () => {
    if (!showroom) return "/src/assets/default-showroom.jpg";
    
    if (showroom.profileImage) {
      if (showroom.profileImage.startsWith('http')) {
        return showroom.profileImage;
      }
      if (showroom.profileImage.startsWith('/uploads/')) {
        return `${Base_Url}${showroom.profileImage}`;
      }
      if (showroom.profileImage.startsWith('uploads/')) {
        return `${Base_Url}/${showroom.profileImage}`;
      }
      return `${Base_Url}/uploads/${showroom.profileImage}`;
    }
    
    if (showroom.images?.[0]) {
      if (showroom.images[0].startsWith('http')) {
        return showroom.images[0];
      }
      if (showroom.images[0].startsWith('/uploads/')) {
        return `${Base_Url}${showroom.images[0]}`;
      }
      return `${Base_Url}/uploads/${showroom.images[0]}`;
    }
    
    return "/src/assets/default-showroom.jpg";
  };

  const filteredCars = allcar.filter((car) =>
    filter === "available"
      ? car.availability === "Available"
      : car.availability === "Rented Out"
  );

  // Refresh showroom data manually
  const handleRefresh = () => {
    setRefreshing(true);
    setImageError(false);
    fetchShowroomData();
    fetchDocuments();
  };

  // Handle image error
  const handleImageError = () => {
    setImageError(true);
  };

  // Format date
  const formatLastUpdated = () => {
    if (!showroom?.updatedAt && !showroom?.createdAt) return '';
    const date = new Date(showroom.updatedAt || showroom.createdAt);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Handle document download
  const handleDownloadDocument = (documentUrl, documentName) => {
    const link = document.createElement('a');
    link.href = `${Base_Url}${documentUrl}`;
    link.download = documentName || 'document';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Get document display name
  const getDocumentDisplayName = (url) => {
    if (!url) return 'Document';
    const parts = url.split('/');
    const filename = parts[parts.length - 1];
    // Remove timestamp and keep original name
    const originalName = filename.split('-').slice(1).join('-').replace(/%20/g, ' ') || 'Registration Document';
    // Remove file extension for display
    return originalName.replace(/\.[^/.]+$/, "");
  };

  // Get file type icon and color
  const getFileTypeInfo = (url) => {
    if (!url) return { color: 'text-gray-500', bg: 'bg-gray-100' };
    
    const extension = url.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf':
        return { color: 'text-red-500', bg: 'bg-red-50' };
      case 'jpg':
      case 'jpeg':
      case 'png':
        return { color: 'text-green-500', bg: 'bg-green-50' };
      case 'doc':
      case 'docx':
        return { color: 'text-blue-500', bg: 'bg-blue-50' };
      default:
        return { color: 'text-gray-500', bg: 'bg-gray-100' };
    }
  };

  if (showroomLoading) {
    return (
      <>
        <Navbar />
        <div className="w-full min-h-screen bg-gradient-to-b from-gray-50 to-white py-6">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!showroom) {
    return (
      <>
        <Navbar />
        <div className="w-full min-h-screen bg-gradient-to-b from-gray-50 to-white py-6">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Showroom Not Found</h2>
              <p className="text-gray-600">The showroom you're looking for doesn't exist or may have been removed.</p>
              <a 
                href="/customer/showrooms" 
                className="inline-block mt-4 bg-[#C17D3C] text-white px-6 py-3 rounded-lg hover:bg-[#A56A33] transition-colors"
              >
                Back to Showrooms
              </a>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const profileImageUrl = getProfileImageUrl();

  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen bg-gradient-to-b from-gray-50 to-white py-6">
        <div className="max-w-7xl mx-auto px-4">
          
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row gap-8 mb-12">
            <div className="w-full lg:w-2/5">
              <div className="relative h-80 rounded-xl shadow-lg overflow-hidden group">
                {imageError ? (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <FiImage className="text-gray-400 text-4xl" />
                  </div>
                ) : (
                  <img
                    src={profileImageUrl}
                    alt={showroom.showroomName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={handleImageError}
                  />
                )}
                <div className="absolute top-4 right-4">
                  <button
                    onClick={handleRefresh}
                    disabled={refreshing}
                    className={`bg-white/90 hover:bg-white text-gray-700 p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${
                      refreshing ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    title="Refresh showroom info"
                  >
                    <FiRefreshCw className={`text-lg ${refreshing ? 'animate-spin' : ''}`} />
                  </button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h1 className="text-2xl font-bold text-white mb-1">
                    {showroom.showroomName}
                  </h1>
                  {showroom.ownerName && (
                    <p className="text-white/80 text-sm flex items-center">
                      <FiUser className="mr-1" size={14} />
                      Owner: {showroom.ownerName}
                    </p>
                  )}
                </div>
                {showroom.yearsOfExperience && (
                  <div className="absolute top-4 left-4">
                    <div className="bg-[#C17D3C] text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                      <FiAward className="mr-1" size={14} />
                      {showroom.yearsOfExperience} years
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="w-full lg:w-3/5">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold text-gray-800">About Our Showroom</h2>
                  <div className="text-right">
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded block mb-1">
                      Last updated: {formatLastUpdated()}
                    </span>
                    <button
                      onClick={handleRefresh}
                      className="text-xs text-blue-600 hover:text-blue-800 flex items-center"
                    >
                      <FiRefreshCw size={12} className="mr-1" />
                      Refresh
                    </button>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {showroom.description || showroom.about || `Welcome to ${showroom.showroomName}, your premier destination for quality cars and exceptional service. We pride ourselves on offering a curated selection of vehicles to meet every need and budget.`}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-start">
                    <FiMapPin className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-800">Location</h3>
                      <p className="text-gray-600">{showroom.address || 'Address not provided'}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FiClock className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-800">Operating Hours</h3>
                      <p className="text-gray-600">{showroom.operatingHours || 'Mon-Sun: 9:00 AM - 6:00 PM'}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FiPhone className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-800">Contact</h3>
                      <p className="text-gray-600">{showroom.contactNumber || 'Contact not provided'}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FiMail className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-800">Email</h3>
                      <p className="text-gray-600">{showroom.email || 'Email not provided'}</p>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#C17D3C]">{allcar.length}</div>
                    <div className="text-xs text-gray-600">Total Cars</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {allcar.filter(car => car.availability === "Available").length}
                    </div>
                    <div className="text-xs text-gray-600">Available</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {allcar.filter(car => car.availability === "Rented Out").length}
                    </div>
                    <div className="text-xs text-gray-600">Rented Out</div>
                  </div>
                </div>

                {/* Filter Tabs */}
                <div className="flex flex-wrap gap-2">
                  <button
                    className={`px-4 py-2 rounded-full font-medium text-sm flex items-center transition-all ${
                      filter === "available"
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    onClick={() => setFilter("available")}
                  >
                    <FiCheckCircle className="mr-2" />
                    Available Cars
                    <span className="ml-2 bg-white/20 px-2 py-0.5 rounded-full text-xs">
                      {allcar.filter(car => car.availability === "Available").length}
                    </span>
                  </button>
                  <button
                    className={`px-4 py-2 rounded-full font-medium text-sm flex items-center transition-all ${
                      filter === "rented"
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    onClick={() => setFilter("rented")}
                  >
                    <FiShield className="mr-2" />
                    Rented Out Cars
                    <span className="ml-2 bg-white/20 px-2 py-0.5 rounded-full text-xs">
                      {allcar.filter(car => car.availability === "Rented Out").length}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Cars Section */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {filter === "available" ? "Available Cars" : "Rented Out Cars"}
                <span className="text-lg font-normal text-gray-600 ml-2">
                  ({filteredCars.length} {filteredCars.length === 1 ? "car" : "cars"})
                </span>
              </h2>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Available</span>
                <div className="w-2 h-2 bg-blue-500 rounded-full ml-2"></div>
                <span>Rented</span>
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                <span className="ml-3 text-gray-600">Loading cars...</span>
              </div>
            ) : filteredCars.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredCars.map((car, index) => (
                  <UserCard key={car._id || index} car={car} />
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 rounded-xl p-12 text-center">
                <FiHeart className="text-gray-400 text-4xl mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  {filter === "available"
                    ? "No cars currently available"
                    : "No cars currently rented out"}
                </h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  {filter === "available"
                    ? "All our cars are currently rented out. Please check back later or contact us for availability updates."
                    : "No rental history available at the moment."}
                </p>
                {filter === "available" && (
                  <button
                    onClick={() => window.location.reload()}
                    className="mt-4 bg-[#C17D3C] text-white px-6 py-2 rounded-lg hover:bg-[#A56A33] transition-colors"
                  >
                    Check Again
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Registration Documents Section */}
          {documents.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-12">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Verified & Registered</h2>
                  <p className="text-gray-600">
                    Official registration documents and certifications that verify our legitimacy and compliance with industry standards.
                  </p>
                </div>
                <div className="flex items-center bg-green-50 text-green-700 px-4 py-2 rounded-lg">
                  <FiShield className="mr-2" />
                  <span className="font-semibold">Verified Business</span>
                </div>
              </div>
              
              {documentsLoading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {documents.map((doc, index) => {
                    const fileInfo = getFileTypeInfo(doc.url);
                    return (
                      <div
                        key={index}
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-white group"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center">
                            <div className={`p-2 rounded-lg ${fileInfo.bg} mr-3`}>
                              <FiFileText className={`text-lg ${fileInfo.color}`} />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-800 text-sm leading-tight">
                                {getDocumentDisplayName(doc.url)}
                              </h3>
                              <p className="text-xs text-gray-500 mt-1">
                                {doc.uploadedAt ? new Date(doc.uploadedAt).toLocaleDateString() : 'Recently uploaded'}
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <button
                            onClick={() => window.open(`${Base_Url}${doc.url}`, '_blank')}
                            className="flex-1 bg-blue-500 text-white py-2 px-3 rounded text-sm hover:bg-blue-600 transition-colors flex items-center justify-center"
                          >
                            <FiEye className="mr-1" size={14} />
                            View
                          </button>
                          <button
                            onClick={() => handleDownloadDocument(doc.url, getDocumentDisplayName(doc.url))}
                            className="flex-1 bg-gray-500 text-white py-2 px-3 rounded text-sm hover:bg-gray-600 transition-colors flex items-center justify-center"
                          >
                            <FiDownload className="mr-1" size={14} />
                            Download
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Our Values Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Why Choose {showroom.showroomName}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-100">
                  <FiStar className="text-blue-500 text-2xl" />
                </div>
                <h3 className="font-bold text-gray-800 mb-3 text-lg">Premium Selection</h3>
                <p className="text-gray-600 leading-relaxed">
                  Carefully curated cars with regular maintenance checks and thorough inspections to ensure top performance and reliability.
                </p>
              </div>
              <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                <div className="bg-green-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-100">
                  <FiShield className="text-green-500 text-2xl" />
                </div>
                <h3 className="font-bold text-gray-800 mb-3 text-lg">Trust & Safety</h3>
                <p className="text-gray-600 leading-relaxed">
                  Fully insured vehicles with 24/7 roadside assistance and comprehensive safety checks for complete peace of mind.
                </p>
              </div>
              <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                <div className="bg-orange-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-100">
                  <FiCheckCircle className="text-orange-500 text-2xl" />
                </div>
                <h3 className="font-bold text-gray-800 mb-3 text-lg">Customer First</h3>
                <p className="text-gray-600 leading-relaxed">
                  Our dedicated team is committed to providing exceptional, personalized service tailored to your specific needs and preferences.
                </p>
              </div>
            </div>
          </div>

          {/* Services Section */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-sm border border-blue-100 p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-bold text-gray-800 mb-3 text-lg">Flexible Rentals</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Daily, weekly, and monthly rental options with competitive pricing to perfectly suit your schedule and budget requirements.
                  </p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="font-bold text-gray-800 mb-3 text-lg">Maintenance Services</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Comprehensive maintenance, repair, and detailing services to keep all our vehicles in pristine, road-ready condition.
                  </p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="border-l-4 border-purple-500 pl-4">
                  <h3 className="font-bold text-gray-800 mb-3 text-lg">24/7 Support</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Round-the-clock customer support team available for any questions, emergencies, or assistance you may need during your rental.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact CTA Section */}
          <div className="bg-gradient-to-r from-[#C17D3C] to-[#A56A33] rounded-xl p-8 text-center text-white mb-12">
            <h2 className="text-2xl font-bold mb-4">Ready to Find Your Perfect Car?</h2>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Contact {showroom.showroomName} today to discuss your car rental needs. Our team is here to help you find the perfect vehicle for your journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href={`tel:${showroom.contactNumber}`}
                className="bg-white text-[#C17D3C] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center"
              >
                <FiPhone className="mr-2" />
                Call Now
              </a>
              <a 
                href={`mailto:${showroom.email}`}
                className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors flex items-center justify-center"
              >
                <FiMail className="mr-2" />
                Send Email
              </a>
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
}

export default Showroomcars;