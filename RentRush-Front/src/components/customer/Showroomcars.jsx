import { useEffect, useState } from "react";import { useParams, useLocation } from "react-router-dom";
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
  FiEye,
  FiMessageCircle
} from "react-icons/fi";
import { Star, Send, X } from "lucide-react";
import Toast from "../Toast"; // Import Toast component

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
  
  // Rating states
  const [ratings, setRatings] = useState([]);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [hoverRating, setHoverRating] = useState(0);
  const [submittingRating, setSubmittingRating] = useState(false);
  const [ratingError, setRatingError] = useState("");
  const [userRating, setUserRating] = useState(null);

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

  // Fetch ratings
  const fetchRatings = async () => {
    try {
      const response = await axios.get(
        `${Base_Url}/api/showrooms/${showroomid}/ratings`
      );
      console.log("📊 Ratings response:", response.data.ratings);
      setRatings(response.data.ratings || []);
    } catch (error) {
      console.error("Error fetching ratings:", error);
    }
  };

  // Fetch user's existing rating
  const fetchUserRating = async () => {
    try {
      const response = await axios.get(
        `${Base_Url}/api/showrooms/${showroomid}/ratings/user`,
        { withCredentials: true }
      );
      if (response.data.rating) {
        setUserRating(response.data.rating);
        setRating(response.data.rating.rating);
        setComment(response.data.rating.comment || "");
      }
    } catch (error) {
      console.error("Error fetching user rating:", error);
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
    fetchRatings();
    fetchUserRating();
  }, [showroomid, location.state]);

  // Listen for profile updates
  useEffect(() => {
    const handleProfileUpdate = (event) => {
      if (!event.detail || event.detail.showroomId === showroomid) {
        fetchShowroomData();
        fetchDocuments();
      }
    };

    window.addEventListener('showroomProfileUpdated', handleProfileUpdate);
    
    return () => {
      window.removeEventListener('showroomProfileUpdated', handleProfileUpdate);
    };
  }, [showroomid]);

  // Calculate average rating
  const calculateAverageRating = () => {
    if (!ratings || ratings.length === 0) return 0;
    const totalRating = ratings.reduce((sum, rating) => sum + rating.rating, 0);
    return (totalRating / ratings.length).toFixed(1);
  };

  // Get total reviews count
  const getTotalReviews = () => {
    return ratings.length;
  };

  // Get rating distribution
  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    ratings.forEach(rating => {
      distribution[rating.rating]++;
    });
    return distribution;
  };

  // Get user display name - FIXED FUNCTION
  const getUserDisplayName = (ratingItem) => {
    if (!ratingItem.user) return 'Anonymous User';
    
    // Check different possible user name fields
    const userName = ratingItem.user.name || 
                    ratingItem.user.showroomName || 
                    ratingItem.user.ownerName || 
                    ratingItem.user.email?.split('@')[0] || 
                    'Anonymous User';
    
    return userName;
  };

  // Get user initial for avatar
  const getUserInitial = (ratingItem) => {
    const userName = getUserDisplayName(ratingItem);
    return userName.charAt(0).toUpperCase();
  };

  // Submit rating
  const submitRating = async () => {
    if (rating === 0) {
      setRatingError("Please select a rating");
      return;
    }

    try {
      setSubmittingRating(true);
      setRatingError("");

      const response = await axios.post(
        `${Base_Url}/api/showrooms/${showroomid}/ratings`,
        {
          rating,
          comment: comment.trim(),
        },
        { withCredentials: true }
      );

      if (response.data.success) {
        // Update ratings list
        if (userRating) {
          // Update existing rating in the list
          setRatings(prev => prev.map(r => 
            r._id === userRating._id ? response.data.rating : r
          ));
        } else {
          // Add new rating to the list
          setRatings(prev => [response.data.rating, ...prev]);
        }
        
        setUserRating(response.data.rating);
        closeRatingModal();
        
        // Show success toast message
        Toast(
          userRating 
            ? "Rating updated successfully!" 
            : "Thank you for your rating! Your feedback has been submitted.",
          "success"
        );
      } else {
        setRatingError("Failed to submit rating. Please try again.");
        Toast("Failed to submit rating. Please try again.", "error");
      }
    } catch (err) {
      console.error("Error submitting rating:", err);
      if (err.response?.status === 401) {
        const errorMsg = "Please log in to submit a rating.";
        setRatingError(errorMsg);
        Toast(errorMsg, "error");
      } else {
        const errorMsg = err.response?.data?.message || "Something went wrong. Please try again.";
        setRatingError(errorMsg);
        Toast(errorMsg, "error");
      }
    } finally {
      setSubmittingRating(false);
    }
  };

  // Close rating modal
  const closeRatingModal = () => {
    setShowRatingModal(false);
    if (!userRating) {
      setRating(0);
      setComment("");
    }
    setHoverRating(0);
    setRatingError("");
  };

  // Handle backdrop click for rating modal
  const handleRatingBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeRatingModal();
    }
  };

  // Render star rating display
  const renderStarRating = (rating, size = "sm") => {
    const starSize = size === "lg" ? "h-5 w-5" : "h-4 w-4";
    
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${starSize} ${
              star <= rating 
                ? "text-yellow-400 fill-current" 
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

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
    fetchRatings();
    fetchUserRating();
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
    const originalName = filename.split('-').slice(1).join('-').replace(/%20/g, ' ') || 'Registration Document';
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
  const averageRating = calculateAverageRating();
  const totalReviews = getTotalReviews();
  const ratingDistribution = getRatingDistribution();

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
                
                {/* Rating Summary */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-gray-800">{averageRating}</div>
                        <div className="flex items-center justify-center mt-1">
                          {renderStarRating(parseFloat(averageRating), "sm")}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          {totalReviews} {totalReviews === 1 ? 'review' : 'reviews'}
                        </div>
                      </div>
                      <div className="h-12 w-px bg-gray-300"></div>
                      <div className="space-y-1">
                        {[5, 4, 3, 2, 1].map((stars) => (
                          <div key={stars} className="flex items-center text-sm">
                            <span className="w-8 text-gray-600">{stars}★</span>
                            <div className="w-24 bg-gray-200 rounded-full h-2 mx-2">
                              <div 
                                className="bg-yellow-400 h-2 rounded-full" 
                                style={{ 
                                  width: `${totalReviews > 0 ? (ratingDistribution[stars] / totalReviews) * 100 : 0}%` 
                                }}
                              ></div>
                            </div>
                            <span className="text-gray-500 text-xs w-8">
                              {ratingDistribution[stars]}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={() => setShowRatingModal(true)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                    >
                      <FiStar className="mr-2" size={16} />
                      {userRating ? 'Update Rating' : 'Rate Showroom'}
                    </button>
                  </div>
                </div>
                
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
                    <div className="text-2xl font-bold text-gray-700">{allcar.length}</div>
                    <div className="text-xs text-gray-600">Total Cars</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-700">
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

          {/* Customer Reviews & Ratings Section - UPDATED USER DISPLAY */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-12">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Customer Reviews & Ratings</h2>
                <p className="text-gray-600">
                  See what our customers are saying about their experience with {showroom.showroomName}
                </p>
              </div>
              <button
                onClick={() => setShowRatingModal(true)}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center font-medium"
              >
                <FiStar className="mr-2" size={18} />
                {userRating ? 'Update Your Review' : 'Write a Review'}
              </button>
            </div>

            {ratings.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <FiMessageCircle className="text-gray-400 text-5xl mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No Reviews Yet</h3>
                <p className="text-gray-500 mb-6 max-w-md mx-auto">
                  Be the first to share your experience with {showroom.showroomName}. Your review will help other customers make informed decisions.
                </p>
                <button
                  onClick={() => setShowRatingModal(true)}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Be the First to Review
                </button>
              </div>
            ) : (
              <>
                {/* Rating Overview */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6">
                    <div className="text-center">
                      <div className="text-5xl font-bold text-gray-800 mb-2">{averageRating}</div>
                      <div className="flex justify-center mb-3">
                        {renderStarRating(parseFloat(averageRating), "lg")}
                      </div>
                      <div className="text-lg text-gray-600">
                        Based on {totalReviews} {totalReviews === 1 ? 'review' : 'reviews'}
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h3 className="font-semibold text-gray-800 mb-4">Rating Distribution</h3>
                    <div className="space-y-3">
                      {[5, 4, 3, 2, 1].map((stars) => {
                        const percentage = totalReviews > 0 ? (ratingDistribution[stars] / totalReviews) * 100 : 0;
                        return (
                          <div key={stars} className="flex items-center">
                            <div className="flex items-center w-16">
                              <span className="text-sm text-gray-600 w-6">{stars}</span>
                              <FiStar className="text-yellow-400 fill-current ml-1" size={16} />
                            </div>
                            <div className="flex-1 mx-3">
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-yellow-400 h-2 rounded-full transition-all duration-500" 
                                  style={{ width: `${percentage}%` }}
                                ></div>
                              </div>
                            </div>
                            <div className="text-sm text-gray-600 w-12 text-right">
                              {ratingDistribution[stars]} ({percentage.toFixed(0)}%)
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Reviews List - UPDATED USER DISPLAY */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Reviews</h3>
                  {ratings.slice(0, 5).map((ratingItem) => (
                    <div key={ratingItem._id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                            {getUserInitial(ratingItem)}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800 text-lg">
                              {getUserDisplayName(ratingItem)}
                            </h4>
                            <div className="flex items-center space-x-2 mt-1">
                              {renderStarRating(ratingItem.rating, "sm")}
                              <span className="text-sm text-gray-500">
                                {new Date(ratingItem.createdAt).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}
                              </span>
                            </div>
                          </div>
                        </div>
                        {userRating && userRating._id === ratingItem._id && (
                          <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                            Your Review
                          </span>
                        )}
                      </div>
                      
                      {ratingItem.comment && ratingItem.comment.trim() ? (
                        <p className="text-gray-700 leading-relaxed text-lg">{ratingItem.comment}</p>
                      ) : (
                        <p className="text-gray-500 italic">No comment provided</p>
                      )}
                    </div>
                  ))}
                </div>

                {ratings.length > 5 && (
                  <div className="text-center mt-8">
                    <button className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium">
                      View All {ratings.length} Reviews
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Rating Modal */}
          {showRatingModal && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
              onClick={handleRatingBackdropClick}
            >
              <div className="bg-white rounded-2xl shadow-xl w-full max-w-md transform transition-all duration-300 scale-95 hover:scale-100">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  <h2 className="text-xl font-bold text-gray-900">
                    {userRating ? 'Update Your Rating' : 'Rate This Showroom'}
                  </h2>
                  <button
                    onClick={closeRatingModal}
                    className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="text-center mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {userRating ? 'Update your experience with' : 'How was your experience with'} {showroom.showroomName}?
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Share your experience to help other customers
                    </p>
                  </div>

                  {/* Star Rating */}
                  <div className="flex justify-center mb-6">
                    <div className="flex space-x-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="p-2 transition-transform duration-200 hover:scale-110 focus:outline-none"
                        >
                          <Star
                            size={32}
                            className={`${
                              star <= (hoverRating || rating)
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            } transition-colors duration-200`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Rating Labels */}
                  <div className="text-center mb-6">
                    <span className="text-sm font-medium text-gray-700">
                      {rating === 0 && "Select your rating"}
                      {rating === 1 && "Poor"}
                      {rating === 2 && "Fair"}
                      {rating === 3 && "Good"}
                      {rating === 4 && "Very Good"}
                      {rating === 5 && "Excellent"}
                    </span>
                  </div>

                  {/* Comment Section */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Comments (Optional)
                    </label>
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Share details about your experience with this showroom..."
                      rows="4"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-colors duration-200"
                    />
                  </div>

                  {/* Error Message */}
                  {ratingError && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-700 text-sm">{ratingError}</p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <button
                      onClick={closeRatingModal}
                      disabled={submittingRating}
                      className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={submitRating}
                      disabled={submittingRating || rating === 0}
                      className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      {submittingRating ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          {userRating ? 'Updating...' : 'Submitting...'}
                        </>
                      ) : (
                        <>
                          <Send size={16} className="mr-2" />
                          {userRating ? 'Update Rating' : 'Submit Rating'}
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
      <Footer />
    </>
  );
}

export default Showroomcars;