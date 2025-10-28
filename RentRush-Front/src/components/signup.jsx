// import { Link, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import axios from "axios";
// import Toast from "./Toast";
// import Navbar from "./Navbar";
// import Footer from "./Footer";
// import { Eye, EyeOff, User, CreditCard, Phone, MapPin, Mail, Lock } from "lucide-react";

// const Base_Url = import.meta.env.VITE_API_URL;

// function SignUp() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     contact: '',
//     cnic: '',
//     address: '',
//     password: '',
//     confirmPassword: ''
//   });
//   const [errors, setErrors] = useState({
//     name: '',
//     email: '',
//     contact: '',
//     cnic: '',
//     password: '',
//     confirmPassword: ''
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const validateField = (name, value) => {
//     let error = '';

//     switch (name) {
//       case 'name':
//         if (!value.trim()) error = 'Name is required';
//         else if (!/^[a-zA-Z\s]+$/.test(value))
//           error = 'Name should contain only letters';
//         break;
//       case 'email':
//         if (!value.trim()) error = 'Email is required';
//         else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value))
//           error = 'Please enter a valid email address';
//         break;
//       case 'cnic':
//         if (!value.trim()) error = 'CNIC is required';
//         else if (!/^[0-9]{5}-[0-9]{7}-[0-9]{1}$/.test(value))
//           error = 'CNIC must be in format XXXXX-XXXXXXX-X';
//         break;
//       case 'contact':
//         if (!value.trim()) error = 'Contact number is required';
//         else if (!/^[0-9]{4}-[0-9]{7}$/.test(value))
//           error = 'Contact must be in format XXXX-XXXXXXX';
//         break;
//       case 'password':
//         if (!value.trim()) error = 'Password is required';
//         else if (value.length < 8)
//           error = 'Password must be at least 8 characters';
//         else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/.test(value))
//           error = 'Password must contain uppercase, lowercase, numbers, and special characters';
//         break;
//       case 'confirmPassword':
//         if (!value.trim()) error = 'Please confirm your password';
//         else if (value !== formData.password) error = 'Passwords do not match';
//         break;
//       default:
//         break;
//     }

//     setErrors(prev => ({ ...prev, [name]: error }));
//     return !error;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//     validateField(name, value);
//   };

//   const handleBlur = (e) => {
//     const { name, value } = e.target;
//     validateField(name, value);
//   };

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     // Validate all fields
//     let isValid = true;
//     Object.keys(formData).forEach(field => {
//       if (!validateField(field, formData[field])) {
//         isValid = false;
//       }
//     });

//     if (!isValid) {
//       Toast('Please fix the errors in the form', 'error');
//       setIsSubmitting(false);
//       return;
//     }

//     try {
//       const response = await axios.post(`${Base_Url}/api/signup`, {
//         ownerName: formData.name,
//         cnic: formData.cnic,
//         contactNumber: formData.contact,
//         address: formData.address,
//         email: formData.email,
//         password: formData.password,
//         role: "client",
//       });

//       if (response.status === 201) {
//         Toast(response.data, 'success', () => navigate('/login'));
//       }
//     } catch (error) {
//       Toast(error.response?.data || 'An error occurred', 'error');
//       console.error('Signup error:', error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="flex items-center justify-center min-h-screen py-16 background">
//         <div className="w-screen h-fit max-w-lg p-5 bg-gray-300 backdrop-blur-lg bg-white/30 border border-white/10 rounded-3xl shadow-lg">
//           <div className="flex justify-center">
//             <img
//               src="/src/assets/logo.png"
//               className="-ml-4 w-[100px]"
//               alt="Logo"
//             />
//           </div>
//           <h2 className="text-2xl font-bold text-[#02073F] text-center mb-4">
//             Register Account
//           </h2>

//           <form onSubmit={handleSignup} className="rounded mb-4">
//             {/* Form Table */}
//             <table className="w-full text-sm text-left">
//               <tbody>
//                 <tr className="border-b">
//                   <td className="py-4 font-bold w-1/3">Full Name</td>
//                   <td className="py-4">
//                     <div className="relative">
//                       <input
//                         name="name"
//                         value={formData.name}
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                         type="text"
//                         placeholder="John Doe"
//                         className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C17D3C] ${
//                           errors.name ? "border-red-900" : ""
//                         }`}
//                       />
//                       <User className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
//                     </div>
//                     {errors.name && (
//                       <p className="text-red-900 text-xs mt-1">
//                         {errors.name}
//                       </p>
//                     )}
//                   </td>
//                 </tr>
//                 <tr className="border-b">
//                   <td className="py-4 font-bold w-1/3">Email</td>
//                   <td className="py-4">
//                     <div className="relative">
//                       <input
//                         name="email"
//                         value={formData.email}
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                         type="email"
//                         placeholder="name@example.com"
//                         className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C17D3C] ${
//                           errors.email ? "border-red-900" : ""
//                         }`}
//                       />
//                       <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
//                     </div>
//                     {errors.email && (
//                       <p className="text-red-900 text-xs mt-1">
//                         {errors.email}
//                       </p>
//                     )}
//                   </td>
//                 </tr>
//                 <tr className="border-b">
//                   <td className="py-4 font-bold w-1/3">CNIC</td>
//                   <td className="py-4">
//                     <div className="relative">
//                       <input
//                         name="cnic"
//                         type="text"
//                         value={formData.cnic}
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                         placeholder="12345-6789012-3"
//                         className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C17D3C] ${
//                           errors.cnic ? "border-red-900" : ""
//                         }`}
//                       />
//                       <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
//                     </div>
//                     {errors.cnic && (
//                       <p className="text-red-900 text-xs mt-1">{errors.cnic}</p>
//                     )}
//                   </td>
//                 </tr>
//                 <tr className="border-b">
//                   <td className="py-4 font-bold w-1/3">Contact Number</td>
//                   <td className="py-4">
//                     <div className="relative">
//                       <input
//                         name="contact"
//                         type="tel"
//                         value={formData.contact}
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                         placeholder="0300-1234567"
//                         className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C17D3C] ${
//                           errors.contact ? "border-red-900" : ""
//                         }`}
//                       />
//                       <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
//                     </div>
//                     {errors.contact && (
//                       <p className="text-red-900 text-xs mt-1">
//                         {errors.contact}
//                       </p>
//                     )}
//                   </td>
//                 </tr>
//                 <tr className="border-b">
//                   <td className="py-4 font-bold w-1/3">Address</td>
//                   <td className="py-4">
//                     <div className="relative">
//                       <input
//                         name="address"
//                         type="text"
//                         value={formData.address}
//                         onChange={handleChange}
//                         placeholder="1234 Main St, City"
//                         className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C17D3C] ${
//                           errors.address ? "border-red-900" : ""
//                         }`}
//                       />
//                       <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
//                     </div>
//                     {errors.address && (
//                       <p className="text-red-900 text-xs mt-1">
//                         {errors.address}
//                       </p>
//                     )}
//                   </td>
//                 </tr>
//                 {/* Password Field */}
//                 <tr className="border-b">
//                   <td className="py-4 font-bold w-1/3">Password</td>
//                   <td className="py-4">
//                     <div className="relative">
//                       <input
//                         name="password"
//                         value={formData.password}
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                         type={showPassword ? "text" : "password"}
//                         placeholder="********"
//                         className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C17D3C] ${
//                           errors.password ? "border-red-900" : ""
//                         }`}
//                       />
//                       <button
//                         type="button"
//                         className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#C17D3C]"
//                         onClick={() => setShowPassword(!showPassword)}
//                       >
//                         {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                       </button>
//                     </div>
//                     {errors.password && (
//                       <p className="text-red-900 text-xs mt-1">
//                         {errors.password}
//                       </p>
//                     )}
//                     <p className="text-xs text-gray-900 mt-1">
//                       Must contain uppercase, lowercase, number & special char
//                     </p>
//                   </td>
//                 </tr>

//                 {/* Confirm Password Field */}
//                 <tr className="border-b">
//                   <td className="py-4 font-bold w-1/3">Confirm Password</td>
//                   <td className="py-4">
//                     <div className="relative">
//                       <input
//                         name="confirmPassword"
//                         value={formData.confirmPassword}
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                         type={showConfirmPassword ? "text" : "password"}
//                         placeholder="********"
//                         className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C17D3C] ${
//                           errors.confirmPassword ? "border-red-900" : ""
//                         }`}
//                       />
//                       <button
//                         type="button"
//                         className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#C17D3C]"
//                         onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                       >
//                         {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                       </button>
//                     </div>
//                     {errors.confirmPassword && (
//                       <p className="text-red-900 text-xs mt-1">
//                         {errors.confirmPassword}
//                       </p>
//                     )}
//                   </td>
//                 </tr>
//               </tbody>
//             </table>

//             {/* Sign Up Button */}
//             <div className="flex items-center justify-center mt-4">
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className={`bg-[#C17D3C] hover:bg-[#B06F35] text-white font-bold py-2 px-4 rounded focus:outline-none w-full transition-colors ${
//                   isSubmitting ? "opacity-70 cursor-not-allowed" : ""
//                 }`}
//               >
//                 {isSubmitting ? (
//                   <span className="flex items-center justify-center">
//                     <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     Creating Account...
//                   </span>
//                 ) : 'Sign Up'}
//               </button>
//             </div>
//           </form>

//           {/* Redirect to Login */}
//           <p className="mt-4 text-center text-[#02073F] text-xs">
//             Already have an account?{" "}
//             <Link
//               to="/login"
//               className="text-[#02073F] font-bold hover:text-[#ffffff]"
//             >
//               Log In
//             </Link>
//           </p>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }

// export default SignUp;

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Toast from "./Toast";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Eye, EyeOff, User, CreditCard, Phone, MapPin, Mail, Lock, AlertCircle, CheckCircle } from "lucide-react";

const Base_Url = import.meta.env.VITE_API_URL;

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    cnic: '',
    address: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    contact: '',
    cnic: '',
    address: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);

  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'name':
        if (!value.trim()) error = 'Name is required';
        else if (!/^[a-zA-Z\s]+$/.test(value))
          error = 'Name should contain only letters';
        else if (value.length < 3) error = 'Name must be at least 3 characters';
        break;
      case 'email':
        if (!value.trim()) error = 'Email is required';
        else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value))
          error = 'Please enter a valid email address';
        break;
      case 'cnic':
        if (!value.trim()) error = 'CNIC is required';
        else if (!/^[0-9]{5}-[0-9]{7}-[0-9]{1}$/.test(value))
          error = 'CNIC must be in format XXXXX-XXXXXXX-X';
        break;
      case 'contact':
        if (!value.trim()) error = 'Contact number is required';
        else if (!/^[0-9]{4}-[0-9]{7}$/.test(value))
          error = 'Contact must be in format XXXX-XXXXXXX';
        break;
      case 'address':
        if (!value.trim()) error = 'Address is required';
        else if (value.length < 10)
          error = 'Address must be at least 10 characters';
        break;
      case 'password':
        if (!value.trim()) error = 'Password is required';
        else if (value.length < 8)
          error = 'Password must be at least 8 characters';
        else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/.test(value))
          error = 'Password must contain uppercase, lowercase, numbers, and special characters';
        break;
      case 'confirmPassword':
        if (!value.trim()) error = 'Please confirm your password';
        else if (value !== formData.password) error = 'Passwords do not match';
        break;
      default:
        break;
    }

    setErrors(prev => ({ ...prev, [name]: error }));
    return !error;
  };

  // Enhanced email validation
  const validateEmail = async (email) => {
    if (!email) return "Email is required";
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return "Please enter a valid email address";
    }

    // Check for common disposable domains
    const disposableDomains = ['tempmail.com', 'mailinator.com', 'yopmail.com', '10minutemail.com'];
    const domain = email.split('@')[1].toLowerCase();
    if (disposableDomains.includes(domain)) {
      return "Temporary email addresses are not allowed. Please use your permanent email.";
    }

    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    validateField(name, value);
    
    // Clear API error when user starts typing
    if (apiError) setApiError("");
    if (showSuccessMessage) setShowSuccessMessage(false);
  };

  const handleBlur = async (e) => {
    const { name, value } = e.target;
    
    if (name === "email" && value) {
      setIsCheckingEmail(true);
      const emailError = await validateEmail(value);
      if (emailError) {
        setErrors(prev => ({ ...prev, email: emailError }));
      }
      setIsCheckingEmail(false);
    }
    
    validateField(name, value);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setApiError("");
    setShowSuccessMessage(false);

    // Validate all fields
    let isValid = true;
    Object.keys(formData).forEach(field => {
      if (!validateField(field, formData[field])) {
        isValid = false;
      }
    });

    if (!isValid) {
      Toast('Please fill in the form correctly', 'error');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await axios.post(`${Base_Url}/api/signup`, {
        ownerName: formData.name,
        cnic: formData.cnic,
        contactNumber: formData.contact,
        address: formData.address,
        email: formData.email,
        password: formData.password,
        role: "client",
      });

      if (response.data.success) {
        setShowSuccessMessage(true);
        Toast("Magic link sent to your email! Please check your inbox to complete registration.", "success");
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          contact: '',
          cnic: '',
          address: '',
          password: '',
          confirmPassword: ''
        });
        setErrors({});
      }
    } catch (error) {
      console.error('Signup error:', error);
      const errorMessage = error.response?.data?.message || error.response?.data || 'An error occurred during registration';
      
      // Enhanced error handling
      if (errorMessage.includes("email domain does not exist") || 
          errorMessage.includes("email address may not exist") ||
          errorMessage.includes("email domain does not exist")) {
        setErrors(prev => ({ ...prev, email: "This email address does not exist" }));
        Toast("This email address does not exist. Please check and try again.", "error");
      }
      else if (errorMessage.includes("Temporary email addresses")) {
        setErrors(prev => ({ ...prev, email: "Temporary emails not allowed" }));
        Toast("Temporary email addresses are not allowed. Please use your permanent email.", "error");
      }
      else if (errorMessage.includes("Invalid email format")) {
        setErrors(prev => ({ ...prev, email: "Invalid email format" }));
        Toast("Invalid email format. Please enter a valid email address.", "error");
      }
      else if (errorMessage.includes("User already exists")) {
        setErrors(prev => ({ ...prev, email: "Email is already registered" }));
        Toast("Email is already registered", "error");
      } 
      else if (errorMessage.includes("CNIC already registered")) {
        setErrors(prev => ({ ...prev, cnic: "CNIC is already registered" }));
        Toast("CNIC is already registered", "error");
      } 
      else if (errorMessage.includes("Phone number already registered")) {
        setErrors(prev => ({ ...prev, contact: "Contact number is already registered" }));
        Toast("Contact number is already registered", "error");
      }
      else {
        setApiError(errorMessage);
        Toast(errorMessage, "error");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="relative min-h-screen py-12 px-4 flex items-center justify-center bg-gray-50">
        <div className="absolute inset-0 bg-black/50 z-0">
          <img 
            src="/src/assets/background.png"
            alt="Car Rental Background"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative z-10 w-full max-w-2xl p-8 bg-gray-300 backdrop-blur-lg bg-white/30 rounded-xl shadow-2xl">
          <div className="flex flex-col items-center mb-8">
            <img
              src="/src/assets/logo.png"
              className="h-24 object-contain mb-4"
              alt="Logo"
            />
            <h2 className="text-3xl font-bold text-[#00004b] text-center">
              Create Your Account
            </h2>
            <p className="text-gray-900 mt-2 text-center">
              Join RentRush to start renting cars today
            </p>
          </div>

          {/* Success Message */}
          {showSuccessMessage && (
            <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-green-700 font-medium">
                    Magic link sent successfully!
                  </p>
                  <p className="text-sm text-green-600 mt-1">
                    Please check your email inbox or spam folder and for account verification. Please try again if link not recieved.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* API Error Display */}
          {apiError && !showSuccessMessage && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{apiError}</p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-2 text-[#C17D3C]" />
                      Full Name
                    </div>
                  </label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    placeholder="John Doe"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C17D3C] focus:border-transparent ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle size={16} className="mr-1" />
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* CNIC */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">
                    <div className="flex items-center">
                      <CreditCard className="w-4 h-4 mr-2 text-[#C17D3C]" />
                      CNIC Number
                    </div>
                  </label>
                  <input
                    name="cnic"
                    type="text"
                    value={formData.cnic}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="12345-6789012-3"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C17D3C] focus:border-transparent ${
                      errors.cnic ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.cnic && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle size={16} className="mr-1" />
                      {errors.cnic}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">
                    <div className="flex items-center">
                      <Lock className="w-4 h-4 mr-2 text-[#C17D3C]" />
                      Password
                    </div>
                  </label>
                  <div className="relative">
                    <input
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C17D3C] focus:border-transparent ${
                        errors.password ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#C17D3C]"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle size={16} className="mr-1" />
                      {errors.password}
                    </p>
                  )}
                  <p className="mt-1 text-xs text-gray-900">
                    Must be at least 8 characters with uppercase, lowercase, number & special character
                  </p>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 mr-2 text-[#C17D3C]" />
                      Email Address
                    </div>
                  </label>
                  <div className="relative">
                    <input
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="email"
                      placeholder="name@example.com"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C17D3C] focus:border-transparent ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {isCheckingEmail && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#C17D3C]"></div>
                      </div>
                    )}
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle size={16} className="mr-1" />
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Contact Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 mr-2 text-[#C17D3C]" />
                      Contact Number
                    </div>
                  </label>
                  <input
                    name="contact"
                    type="tel"
                    value={formData.contact}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="0300-1234567"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C17D3C] focus:border-transparent ${
                      errors.contact ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.contact && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle size={16} className="mr-1" />
                      {errors.contact}
                    </p>
                  )}
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-[#C17D3C]" />
                      Address
                    </div>
                  </label>
                  <input
                    name="address"
                    type="text"
                    value={formData.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="1234 Main St, City"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C17D3C] focus:border-transparent ${
                      errors.address ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.address && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle size={16} className="mr-1" />
                      {errors.address}
                    </p>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">
                    <div className="flex items-center">
                      <Lock className="w-4 h-4 mr-2 text-[#C17D3C]" />
                      Confirm Password
                    </div>
                  </label>
                  <div className="relative">
                    <input
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C17D3C] focus:border-transparent ${
                        errors.confirmPassword ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#C17D3C]"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle size={16} className="mr-1" />
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting || showSuccessMessage}
                className={`w-full py-3 px-4 bg-[#C17D3C] hover:bg-[#B06F35] text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#C17D3C] focus:ring-offset-2 ${
                  (isSubmitting || showSuccessMessage) ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending Magic Link...
                  </span>
                ) : showSuccessMessage ? (
                  "Magic Link Sent!"
                ) : (
                  "Create Account"
                )}
              </button>
            </div>

            {/* Success Instructions */}
            {showSuccessMessage && (
              <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-blue-700 font-medium">
                      Check your email inbox
                    </p>
                    <p className="text-sm text-blue-600 mt-1">
                      We've sent a magic link to <strong>{formData.email}</strong>. Click the link in the email to verify your account and complete the registration process.
                    </p>
                    <p className="text-xs text-blue-500 mt-2">
                      Didn't receive the email? Check your spam folder or try again in a few minutes.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Login Link */}
            <div className="text-center text-sm text-gray-900">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-[#00004b] hover:text-[#B06F35] hover:underline"
              >
                Log in here
              </Link>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SignUp;