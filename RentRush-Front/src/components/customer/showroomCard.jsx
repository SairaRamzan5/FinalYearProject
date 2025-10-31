// // import PropTypes from "prop-types";
// // import { Link } from "react-router-dom";
// // const Base_Url = import.meta.env.VITE_API_URL;

// // const ShowroomCard = ({ value }) => {
// //   return (
// //     <>
// // <Link 
// //   to={`/customer/detailcars/${value?._id}`} 
// //   state={{ showroom: value }}
// // >
// //    <div className="bg-white shadow-2xl rounded-lg overflow-hidden w-64 relative transform transition-transform duration-300 hover:scale-105"
// //       >
// //         <div className="relative">
// //           <img
// //             src={`http://localhost:3000/uploads/${value.images[0]}`}
// //             alt={`Showroom: ${value.showroomName}`}
// //             className="w-full h-40 object-cover"
// //             onError={(e) => {
// //               e.target.src = "/path/to/default/image.png"; // Fallback image if the image fails to load
// //             }}
// //           />
// //         </div>
// //         <div className="p-4">
// //           <h3 className="font-bold text-center text-lg text-blue-900 mb-2">
// //             Showroom: {value.showroomName}
// //           </h3>
// //           <div className="pb-4 text-center">
// //             <span className="text-md font-semibold text-gray-700">
// //               Address: {value.address}
// //             </span>
// //           </div>
// //         </div>
// //       </div>
// //    </Link>

// //     </>
// //   );
// // };
// // ShowroomCard.propTypes = {
// //   value: PropTypes.shape({
// //     _id: PropTypes.string.isRequired, // make sure this is added
// //     images: PropTypes.string.isRequired,
// //     showroomName: PropTypes.string.isRequired,
// //     address: PropTypes.string.isRequired,
// //   }).isRequired,
// // };

// // export default ShowroomCard;



// import PropTypes from "prop-types";
// import { Link } from "react-router-dom";

// const Base_Url = import.meta.env.VITE_API_URL;

// const ShowroomCard = ({ value }) => {
//   return (
//     <Link to={`/customer/detailcars/${value?._id}`} state={{ showroom: value }}>
//       <div className="bg-white shadow-2xl rounded-lg overflow-hidden w-64 h-72 relative transform transition-transform duration-300 hover:scale-105">
//         <div className="relative">
//           <img
//             src={`${Base_Url}/uploads/${value.images[0]}`}
//             alt={`Showroom: ${value.showroomName}`}
//             className="w-full h-32 object-cover"
//             onError={(e) => {
//               e.target.src = "/path/to/default/image.png"; // fallback image
//             }}
//           />
//         </div>
//         <div className="p-4">
//           <h3 className="font-bold text-center text-lg text-blue-900 mb-2 truncate">
//             Showroom: {value.showroomName}
//           </h3>
//           <div className="text-center">
//             <span className="text-md font-semibold text-gray-700 truncate block">
//               Address: {value.address}
//             </span>
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// };

// ShowroomCard.propTypes = {
//   value: PropTypes.shape({
//     _id: PropTypes.string.isRequired,
//     images: PropTypes.arrayOf(PropTypes.string).isRequired,
//     showroomName: PropTypes.string.isRequired,
//     address: PropTypes.string.isRequired,
//   }).isRequired,
// };

// export default ShowroomCard;


import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { 
  FiMapPin, 
  FiPhone, 
  FiStar, 
  FiClock,
  FiUser,
  FiAward
} from "react-icons/fi";

const Base_Url = import.meta.env.VITE_API_URL;

const ShowroomCard = ({ value }) => {
  // Get profile image URL with fallbacks
  const getProfileImageUrl = () => {
    if (value.profileImage) {
      if (value.profileImage.startsWith('http')) {
        return value.profileImage;
      }
      if (value.profileImage.startsWith('/uploads/')) {
        return `${Base_Url}${value.profileImage}`;
      }
      if (value.profileImage.startsWith('uploads/')) {
        return `${Base_Url}/${value.profileImage}`;
      }
      return `${Base_Url}/uploads/${value.profileImage}`;
    }
    
    if (value.images?.[0]) {
      if (value.images[0].startsWith('http')) {
        return value.images[0];
      }
      if (value.images[0].startsWith('/uploads/')) {
        return `${Base_Url}${value.images[0]}`;
      }
      return `${Base_Url}/uploads/${value.images[0]}`;
    }
    
    return "/src/assets/default-showroom.jpg";
  };

  // Format address to show only first part
  const formatAddress = (address) => {
    if (!address) return 'Location not specified';
    const parts = address.split(',');
    return parts[0] + (parts.length > 1 ? ', ' + parts[1] : '');
  };

  // Calculate rating (you can replace this with actual rating data if available)
  const getRating = () => {
    // For now, using a placeholder rating
    // You can replace this with actual rating data from your backend
    return 4.5;
  };

  const profileImageUrl = getProfileImageUrl();

  return (
    <Link to={`/customer/detailcars/${value?._id}`} state={{ showroom: value }}>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden w-full max-w-sm transform transition-all duration-300 hover:scale-105 hover:shadow-xl border border-gray-100">
        {/* Image Section */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={profileImageUrl}
            alt={`Showroom: ${value.showroomName}`}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            onError={(e) => {
              e.target.src = "/src/assets/default-showroom.jpg";
            }}
          />
          
          {/* Experience Badge */}
          {value.yearsOfExperience && (
            <div className="absolute top-3 left-3 bg-[#C17D3C] text-white px-3 py-1 rounded-full text-xs font-medium flex items-center shadow-lg">
              <FiAward className="mr-1" size={12} />
              {value.yearsOfExperience} years
            </div>
          )}
          
          {/* Rating Badge */}
          {/* <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center backdrop-blur-sm">
            <FiStar className="mr-1 fill-yellow-400 text-yellow-400" size={12} />
            {getRating()}
          </div> */}
          
          {/* Gradient Overlay */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/50 to-transparent"></div>
        </div>

        {/* Content Section */}
        <div className="p-5">
          {/* Showroom Name */}
          <h3 className="font-bold text-xl text-gray-900 mb-2 truncate">
            {value.showroomName}
          </h3>
          
          {/* Owner Name */}
          {/* {value.ownerName && (
            <div className="flex items-center text-gray-600 mb-3">
              <FiUser className="mr-2 text-gray-400" size={16} />
              <span className="text-sm font-medium">{value.ownerName}</span>
            </div>
          )} */}
          
          {/* Description Preview */}
          {value.description && (
            <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
              {value.description.length > 80 
                ? value.description.substring(0, 80) + '...' 
                : value.description
              }
            </p>
          )}
          
          {/* Contact Info */}
          <div className="space-y-2 mb-4">
            {/* Address */}
            <div className="flex items-start">
              <FiMapPin className="text-blue-500 mt-0.5 mr-2 flex-shrink-0" size={16} />
              <span className="text-gray-700 text-sm leading-tight">
                {formatAddress(value.address)}
              </span>
            </div>
            
            {/* Contact Number */}
            {value.contactNumber && (
              <div className="flex items-center">
                <FiPhone className="text-green-500 mr-2 flex-shrink-0" size={16} />
                <span className="text-gray-700 text-sm">{value.contactNumber}</span>
              </div>
            )}
            
            {/* Operating Hours */}
            {value.operatingHours && (
              <div className="flex items-center">
                <FiClock className="text-orange-500 mr-2 flex-shrink-0" size={16} />
                <span className="text-gray-700 text-sm">{value.operatingHours}</span>
              </div>
            )}
          </div>
          
          {/* Stats Bar */}
          <div className="flex justify-between items-center pt-3 border-t border-gray-100">
            <div className="text-center">
              <div className="text-lg font-bold text-[#C17D3C]">
                {value.carCount || '0'}
              </div>
              <div className="text-xs text-gray-500">Cars</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-green-600">
                {value.availableCars || '0'}
              </div>
              <div className="text-xs text-gray-500">Available</div>
            </div>
            <div className="text-center">
              <div className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
                View Details
              </div>
            </div>
          </div>
        </div>
        
        {/* Hover Effect Border */}
        <div className="absolute inset-0 border-2 border-transparent hover:border-[#C17D3C] rounded-xl transition-all duration-300 pointer-events-none"></div>
      </div>
    </Link>
  );
};

ShowroomCard.propTypes = {
  value: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string),
    profileImage: PropTypes.string,
    showroomName: PropTypes.string.isRequired,
    ownerName: PropTypes.string,
    address: PropTypes.string.isRequired,
    contactNumber: PropTypes.string,
    description: PropTypes.string,
    operatingHours: PropTypes.string,
    yearsOfExperience: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    carCount: PropTypes.number,
    availableCars: PropTypes.number,
    email: PropTypes.string,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string
  }).isRequired,
};

export default ShowroomCard;