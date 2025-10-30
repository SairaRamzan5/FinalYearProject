import React, { useEffect, useState } from "react";
import Navbar from "../showroom/Navbar";
import axios from "axios";
const Base_Url = import.meta.env.VITE_API_URL;
import { toast } from "react-toastify";
import { FiAlertCircle, FiEdit, FiSave, FiX, FiUpload, FiFile, FiImage, FiTrash2 } from "react-icons/fi";

const ShowroomProfile = () => {
  const [profileData, setProfileData] = useState({
    showroomName: "",
    ownerName: "",
    email: "",
    contactNumber: "",
    address: "",
    description: "",
    profileImage: "",
  });
  const [documents, setDocuments] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchShowroomProfile();
  }, []);

  const fetchShowroomProfile = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${Base_Url}/api/showroom/profile`, {
        withCredentials: true,
      });

      const { showroom } = response.data;
      setProfileData({
        showroomName: showroom.showroomName || "",
        ownerName: showroom.ownerName || "",
        email: showroom.email || "",
        contactNumber: showroom.contactNumber || "",
        address: showroom.address || "",
        description: showroom.description || "",
        profileImage: showroom.profileImage || "",
      });
      
      setDocuments(showroom.documents || []);
    } catch (error) {
      console.error("Error fetching showroom profile:", error);
      toast.error("Error loading profile data");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

//   const handleSave = async () => {
//     try {
//       const response = await axios.put(
//         `${Base_Url}/api/showroom/profile`,
//         profileData,
//         { withCredentials: true }
//       );
//       toast.success(response.data.message);
//       setIsEditing(false);
//       // Refresh profile data to get any server-side changes
//       fetchShowroomProfile();
//     } catch (error) {
//       console.error("Update error:", error);
//       toast.error(error.response?.data?.message || "Update failed");
//     }
//   };

const handleSave = async () => {
  try {
    const response = await axios.put(
      `${Base_Url}/api/showroom/profile`,
      profileData,
      { withCredentials: true }
    );
    toast.success(response.data.message);
    setIsEditing(false);
    
    // Refresh profile data to get any server-side changes
    fetchShowroomProfile();
    
    // Dispatch event to notify other components about profile update
    window.dispatchEvent(new CustomEvent('showroomProfileUpdated', {
      detail: { showroomId: sessionStorage.getItem("userId") }
    }));
    
    // Update session storage
    if (profileData.showroomName) {
      sessionStorage.setItem("showroomName", profileData.showroomName);
    }
    
  } catch (error) {
    console.error("Update error:", error);
    toast.error(error.response?.data?.message || "Update failed");
  }
};

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data
    fetchShowroomProfile();
  };

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error("Please upload an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('profileImage', file);

      const response = await axios.post(
        `${Base_Url}/api/showroom/upload-image`,
        formData,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      setProfileData(prev => ({
        ...prev,
        profileImage: response.data.imageUrl
      }));
      toast.success("Profile image updated successfully");
    } catch (error) {
      console.error("Image upload error:", error);
      toast.error(error.response?.data?.message || "Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleDocumentUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const allowedTypes = [
      'application/pdf',
      'image/jpeg',
      'image/png',
      'image/jpg'
    ];
    
    if (!allowedTypes.includes(file.type)) {
      toast.error("Please upload PDF, JPEG, or PNG files only");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error("File size should be less than 10MB");
      return;
    }

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('document', file);

      const response = await axios.post(
        `${Base_Url}/api/showroom/upload-document`,
        formData,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      setDocuments(prev => [...prev, response.data.document]);
      toast.success("Document uploaded successfully");
      event.target.value = ''; // Reset file input
    } catch (error) {
      console.error("Document upload error:", error);
      toast.error(error.response?.data?.message || "Failed to upload document");
    } finally {
      setUploading(false);
    }
  };

  const handleViewDocument = (documentUrl) => {
    const fullUrl = `${Base_Url}${documentUrl}`;
    window.open(fullUrl, '_blank');
  };

  const getFileNameFromUrl = (url) => {
    if (!url) return 'Document';
    const parts = url.split('/');
    return parts[parts.length - 1].split('-').slice(1).join('-') || 'Document';
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-4 sm:p-6">
        <Navbar />
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#C17D3C]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="flex justify-center items-center py-10 px-4">
        <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl p-6 md:p-8">
          <h2 className="text-3xl font-bold mb-6 text-center text-[#C17D3C]">
            Showroom Profile
          </h2>

          {/* Profile Image Section */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative">
              <img
                src={profileData.profileImage ? `${Base_Url}${profileData.profileImage}` : "/default-showroom.jpg"}
                alt="Showroom"
                className="w-32 h-32 rounded-full object-cover border-4 border-[#C17D3C]"
                onError={(e) => {
                  e.target.src = "/default-showroom.jpg";
                }}
              />
              {isEditing && (
                <label className="absolute bottom-0 right-0 bg-[#C17D3C] text-white p-2 rounded-full cursor-pointer hover:bg-[#A56A33] transition duration-300">
                  <FiUpload className="text-lg" />
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploading}
                  />
                </label>
              )}
            </div>
            {uploading && (
              <div className="mt-2 text-sm text-gray-600 flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-[#C17D3C] mr-2"></div>
                Uploading...
              </div>
            )}
          </div>

          {/* Profile Information */}
          <div className="space-y-6 mb-8">
            {[
              { label: "Showroom Name", field: "showroomName", editable: true },
              { label: "Owner Name", field: "ownerName", editable: true },
              { label: "Email", field: "email", editable: false },
              { label: "Contact Number", field: "contactNumber", editable: true },
              { label: "Address", field: "address", editable: true },
              { label: "Description", field: "description", editable: true, type: "textarea" },
            ].map((item) => (
              <div key={item.field} className="flex flex-col space-y-2">
                <label className="text-lg font-semibold text-gray-700">
                  {item.label}
                </label>
                {isEditing ? (
                  item.type === "textarea" ? (
                    <textarea
                      value={profileData[item.field]}
                      onChange={(e) => handleInputChange(item.field, e.target.value)}
                      className="border-2 border-gray-200 p-3 rounded-lg focus:outline-none focus:border-[#C17D3C] transition duration-300 h-24 resize-none"
                      disabled={!item.editable}
                      placeholder={`Enter ${item.label.toLowerCase()}`}
                    />
                  ) : (
                    <input
                      type="text"
                      value={profileData[item.field]}
                      onChange={(e) => handleInputChange(item.field, e.target.value)}
                      className={`border-2 border-gray-200 p-3 rounded-lg focus:outline-none focus:border-[#C17D3C] transition duration-300 ${
                        !item.editable ? "bg-gray-100 cursor-not-allowed" : ""
                      }`}
                      disabled={!item.editable}
                      placeholder={`Enter ${item.label.toLowerCase()}`}
                    />
                  )
                ) : (
                  <div className="border-2 border-gray-200 p-3 rounded-lg bg-gray-50 min-h-[3rem] flex items-center">
                    {profileData[item.field] || (
                      <span className="text-gray-400">Not provided</span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Documents Section */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Registration Documents
            </h3>
            
            {/* Document Upload */}
            {isEditing && (
              <div className="mb-4">
                <label className={`flex items-center justify-center px-6 py-3 rounded-lg transition duration-300 cursor-pointer ${
                  uploading 
                    ? 'bg-gray-400 text-white cursor-not-allowed' 
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}>
                  <FiUpload className="mr-2" />
                  {uploading ? 'Uploading...' : 'Upload New Document'}
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleDocumentUpload}
                    disabled={uploading}
                  />
                </label>
                <p className="text-sm text-gray-600 mt-2">
                  Supported formats: PDF, JPG, JPEG, PNG (Max 10MB)
                </p>
              </div>
            )}

            {/* Documents List */}
            <div className="space-y-3">
              {documents.length > 0 ? (
                documents.map((doc, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border hover:bg-gray-100 transition duration-300"
                  >
                    <div className="flex items-center">
                      <FiFile className="text-gray-600 mr-3 text-xl" />
                      <span className="text-gray-800">
                        {getFileNameFromUrl(doc)}
                      </span>
                    </div>
                    <button
                      onClick={() => handleViewDocument(doc)}
                      className="text-[#C17D3C] hover:text-[#A56A33] transition duration-300 px-3 py-1 rounded"
                    >
                      View
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500 py-4 border-2 border-dashed border-gray-300 rounded-lg">
                  <FiFile className="text-4xl text-gray-400 mx-auto mb-2" />
                  <p>No documents uploaded yet</p>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 text-center">
            {!isEditing ? (
              <button
                onClick={handleEdit}
                className="flex items-center justify-center mx-auto px-8 py-3 bg-[#C17D3C] text-white rounded-lg hover:bg-[#A56A33] transition duration-300"
              >
                <FiEdit className="mr-2" />
                Edit Profile
              </button>
            ) : (
              <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
                <button
                  onClick={handleSave}
                  disabled={uploading}
                  className={`flex items-center justify-center px-8 py-3 rounded-lg transition duration-300 ${
                    uploading
                      ? 'bg-gray-400 text-white cursor-not-allowed'
                      : 'bg-green-500 text-white hover:bg-green-600'
                  }`}
                >
                  <FiSave className="mr-2" />
                  Save Changes
                </button>
                <button
                  onClick={handleCancel}
                  disabled={uploading}
                  className={`flex items-center justify-center px-8 py-3 rounded-lg transition duration-300 ${
                    uploading
                      ? 'bg-gray-400 text-white cursor-not-allowed'
                      : 'bg-red-500 text-white hover:bg-red-600'
                  }`}
                >
                  <FiX className="mr-2" />
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowroomProfile;