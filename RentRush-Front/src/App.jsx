// // // import { BrowserRouter, Route, Routes } from "react-router-dom";
// // // import CarDetailsScreen from "../src/components/customer/CarDetailsScreen.jsx";
// // // import EditBookingModal from "../src/components/customer/EditBooking.jsx";
// // // import Invoice from "../src/components/customer/invoice.jsx";
// // // import AdminProtectedLayout from "./auth/adminProtectedRoute.jsx";
// // // import ProtectedLayout from "./auth/protectedRoute.jsx";
// // // import ForgotPassword from "./components/ForgotPassword.jsx";
// // // import ResetConfirmation from "./components/ResetConfirmation.jsx";
// // // import ResetPassword from "./components/ResetPassword.jsx";
// // // import AdminLogin from "./components/admin/AdminLogin.jsx";
// // // import Adminpage from "./components/admin/Adminpage.jsx";
// // // import CarsDashboard from "./components/customer/Dashboard.jsx";
// // // import Showroomcars from "./components/customer/Showroomcars.jsx";
// // // import Bookings from "./components/customer/bookings.jsx";
// // // import Cars from "./components/customer/cars.jsx";
// // // import UserProfile from "./components/customer/profile.jsx";
// // // import Showrooms from "./components/customer/showrooms.jsx";
// // // import LandingPage from "./components/landingPage.jsx";
// // // import Login from "./components/login.jsx";
// // // import ShowroomDashboard from "./components/showroom/dashboard.jsx";
// // // import ShowroomInventory from "./components/showroom/inventory.jsx";
// // // import CarMaintenancePage from "./components/showroom/maintenance.jsx";
// // // import ShowroomSignUp from "./components/showroom/signup.jsx";
// // // import SignUp from "./components/signup.jsx";
// // // import PaymentsPage from "./components/showroom/payment.jsx";
// // // import ShowroomInvoiceDashboard from "./components/showroom/showroom-invoice.jsx";
// // // import Complaints from "./components/customer/CustomerComplaints.jsx";
// // // import ShowroomComplaints from "./components/showroom/ShowroomComplaints";
// // // import UserComplaints from "./components/customer/Complaints.jsx";
// // // import TheftReports from './components/showroom/TheftReports.jsx';
// // // import CustomerTheftReports from "./components/customer/CustomerTheftReports.jsx";
// // // import ShowroomBookings from "./components/showroom/ShowroomBookings.jsx"; 
// // // import VerifyEmail from './components/VerifyEmail.jsx'; // ADD THIS IMPORT
// // // import ExploreCars from "./components/customer/ExploreCars.jsx"; // ADD THIS IMPORT



// // // function App() {
// // //   return (
// // //     <>
// // //       <BrowserRouter>
// // //         <Routes>
// // //           {/* Public Routes */}
// // //           <Route path="/" element={<LandingPage />} />
// // //                     <Route path="/explore-cars" element={<ExploreCars />} /> {/* ADD THIS LINE */}

// // //           <Route path="/login" element={<Login />} />
// // //           <Route path="/signup" element={<SignUp />} />
// // //            <Route path="/verify-email" element={<VerifyEmail />} />
// // //           <Route path="/showroom/signup" element={<ShowroomSignUp />} />
// // //           <Route path="/admin" element={<AdminLogin />} />
// // //           <Route path="/forgot-password" element={<ForgotPassword />} />
// // //           <Route path="/reset-password/:token" element={<ResetPassword />} />
// // //           <Route path="/reset-confirmation" element={<ResetConfirmation />} />

// // //           {/* Complaints Routes */}
// // //           <Route path="/customer/complaints" element={<Complaints />} />
// // //           <Route path="/customer/my-complaints" element={<UserComplaints />} />
// // //           <Route path="/showroom/showroom-complaints" element={<ShowroomComplaints />} />
          
// // //           {/* Theft Reports Routes */}
// // //           <Route path="/showroom/theft-reports" element={<TheftReports />} />
// // //           <Route path="/customer/theft-reports" element={<CustomerTheftReports />} />

// // //           {/* Admin Protected Routes */}
// // //           <Route element={<AdminProtectedLayout />}>
// // //             <Route path="/admin/dashboard" element={<Adminpage />} />
// // //           </Route>

// // //           {/* Protected Routes */}
// // //           <Route element={<ProtectedLayout />}>
// // //             {/* Showroom Routes */}
// // //             <Route path="/showroom/dashboard" element={<ShowroomDashboard />} />
// // //             <Route path="/showroom/inventory" element={<ShowroomInventory />} />
// // //             <Route
// // //               path="/showroom/bookings"
// // //               element={<ShowroomBookings />}
// // //             ></Route>
// // //             <Route path="/showroom/payments" element={<PaymentsPage />} />
// // //             <Route path="/showroom/invoices" element={<ShowroomInvoiceDashboard />} />
// // //             <Route path="/showroom/maintenance" element={<CarMaintenancePage />} />

// // //             {/* Customer Routes */}
// // //             <Route path="/customer/dashboard" element={<CarsDashboard />} />
// // //             <Route path="/customer/profile" element={<UserProfile />} />
// // //             <Route path="/customer/cars" element={<Cars />} />
// // //             <Route path="/customer/showrooms" element={<Showrooms />} />
// // //             <Route path="/customer/bookings" element={<Bookings />} />
// // //             <Route path="/customer/editbooking" element={<EditBookingModal />} />
// // //             <Route path="/customer/car-details-screen/:bookingId" element={<CarDetailsScreen />} />
// // //             <Route path="/customer/invoice" element={<Invoice />} />
// // //             <Route path="/customer/detailcars/:id" element={<Showroomcars />} />
// // //           </Route>
// // //         </Routes>
// // //       </BrowserRouter>
// // //     </>
// // //   );
// // // }

// // // export default App;

// // // import { BrowserRouter, Route, Routes } from "react-router-dom";
// // // import CarDetailsScreen from "../src/components/customer/CarDetailsScreen.jsx";
// // // import EditBookingModal from "../src/components/customer/EditBooking.jsx";
// // // import Invoice from "../src/components/customer/invoice.jsx";
// // // import AdminProtectedLayout from "./auth/adminProtectedRoute.jsx";
// // // import ProtectedLayout from "./auth/protectedRoute.jsx";
// // // import ForgotPassword from "./components/ForgotPassword.jsx";
// // // import ResetConfirmation from "./components/ResetConfirmation.jsx";
// // // import ResetPassword from "./components/ResetPassword.jsx";
// // // import AdminLogin from "./components/admin/AdminLogin.jsx";
// // // import Adminpage from "./components/admin/Adminpage.jsx";
// // // import CarsDashboard from "./components/customer/Dashboard.jsx";
// // // import Showroomcars from "./components/customer/Showroomcars.jsx";
// // // import Bookings from "./components/customer/bookings.jsx";
// // // import Cars from "./components/customer/cars.jsx";
// // // import UserProfile from "./components/customer/profile.jsx";
// // // import Showrooms from "./components/customer/showrooms.jsx";
// // // import LandingPage from "./components/landingPage.jsx";
// // // import Login from "./components/login.jsx";
// // // import ShowroomDashboard from "./components/showroom/dashboard.jsx";
// // // import ShowroomInventory from "./components/showroom/inventory.jsx";
// // // import CarMaintenancePage from "./components/showroom/maintenance.jsx";
// // // import ShowroomSignUp from "./components/showroom/signup.jsx";
// // // import SignUp from "./components/signup.jsx";
// // // import PaymentsPage from "./components/showroom/payment.jsx";
// // // import ShowroomInvoiceDashboard from "./components/showroom/showroom-invoice.jsx";
// // // import Complaints from "./components/customer/CustomerComplaints.jsx";
// // // import ShowroomComplaints from "./components/showroom/ShowroomComplaints";
// // // import UserComplaints from "./components/customer/Complaints.jsx";
// // // import TheftReports from './components/showroom/TheftReports.jsx';
// // // import CustomerTheftReports from "./components/customer/CustomerTheftReports.jsx";
// // // import ShowroomBookings from "./components/showroom/ShowroomBookings.jsx"; 
// // // import VerifyEmail from './components/VerifyEmail.jsx';
// // // import ExploreCars from "./components/customer/ExploreCars.jsx";

// // // function App() {
// // //   return (
// // //     <>
// // //       <BrowserRouter>
// // //         <Routes>
// // //           {/* Public Routes */}
// // //           <Route path="/" element={<LandingPage />} />
// // //           <Route path="/explore-cars" element={<ExploreCars />} />
// // //           <Route path="/login" element={<Login />} />
// // //           <Route path="/signup" element={<SignUp />} />
// // //           <Route path="/verify-email" element={<VerifyEmail />} />
// // //           <Route path="/showroom/signup" element={<ShowroomSignUp />} />
// // //           <Route path="/admin" element={<AdminLogin />} />
// // //           <Route path="/forgot-password" element={<ForgotPassword />} />
// // //           <Route path="/reset-password/:token" element={<ResetPassword />} />
// // //           <Route path="/reset-confirmation" element={<ResetConfirmation />} />

// // //           {/* Complaints Routes */}
// // //           <Route path="/customer/complaints" element={<Complaints />} />
// // //           <Route path="/customer/my-complaints" element={<UserComplaints />} />
// // //           <Route path="/showroom/showroom-complaints" element={<ShowroomComplaints />} />
          
// // //           {/* Theft Reports Routes */}
// // //           <Route path="/showroom/theft-reports" element={<TheftReports />} />
// // //           <Route path="/customer/theft-reports" element={<CustomerTheftReports />} />

// // //           {/* Admin Protected Routes */}
// // //           <Route element={<AdminProtectedLayout />}>
// // //             <Route path="/admin/dashboard" element={<Adminpage />} />
// // //           </Route>

// // //           {/* Protected Routes */}
// // //           <Route element={<ProtectedLayout />}>
// // //             {/* Showroom Routes */}
// // //             <Route path="/showroom/dashboard" element={<ShowroomDashboard />} />
// // //             <Route path="/showroom/inventory" element={<ShowroomInventory />} />
// // //             <Route path="/showroom/bookings" element={<ShowroomBookings />} />
// // //             <Route path="/showroom/payments" element={<PaymentsPage />} />
// // //             <Route path="/showroom/invoices" element={<ShowroomInvoiceDashboard />} />
// // //             <Route path="/showroom/maintenance" element={<CarMaintenancePage />} />

// // //             {/* Customer Routes */}
// // //             <Route path="/customer/dashboard" element={<CarsDashboard />} />
// // //             <Route path="/customer/profile" element={<UserProfile />} />
// // //             <Route path="/customer/cars" element={<Cars />} />
// // //             <Route path="/customer/showrooms" element={<Showrooms />} />
// // //             <Route path="/customer/bookings" element={<Bookings />} />
// // //             <Route path="/customer/editbooking" element={<EditBookingModal />} />
// // //             <Route path="/customer/car-details-screen/:bookingId" element={<CarDetailsScreen />} />
// // //             <Route path="/customer/invoice" element={<Invoice />} />
// // //             <Route path="/customer/detailcars/:id" element={<Showroomcars />} />
// // //           </Route>
// // //         </Routes>
// // //       </BrowserRouter>
// // //     </>
// // //   );
// // // }

// // // export default App;

// // import { BrowserRouter, Route, Routes } from "react-router-dom";
// // import CarDetailsScreen from "../src/components/customer/CarDetailsScreen.jsx";
// // import EditBookingModal from "../src/components/customer/EditBooking.jsx";
// // import Invoice from "../src/components/customer/invoice.jsx";
// // import AdminProtectedLayout from "./auth/adminProtectedRoute.jsx";
// // import ProtectedLayout from "./auth/protectedRoute.jsx";
// // import ForgotPassword from "./components/ForgotPassword.jsx";
// // import ResetConfirmation from "./components/ResetConfirmation.jsx";
// // import ResetPassword from "./components/ResetPassword.jsx";
// // import AdminLogin from "./components/admin/AdminLogin.jsx";
// // import Adminpage from "./components/admin/Adminpage.jsx";
// // import CarsDashboard from "./components/customer/Dashboard.jsx";
// // import Showroomcars from "./components/customer/Showroomcars.jsx";
// // import Bookings from "./components/customer/bookings.jsx";
// // import Cars from "./components/customer/cars.jsx";
// // import UserProfile from "./components/customer/profile.jsx";
// // import Showrooms from "./components/customer/showrooms.jsx";
// // import LandingPage from "./components/landingPage.jsx";
// // import Login from "./components/login.jsx";
// // import ShowroomDashboard from "./components/showroom/dashboard.jsx";
// // import ShowroomInventory from "./components/showroom/inventory.jsx";
// // import CarMaintenancePage from "./components/showroom/maintenance.jsx";
// // import ShowroomSignUp from "./components/showroom/signup.jsx";
// // import SignUp from "./components/signup.jsx";
// // import PaymentsPage from "./components/showroom/payment.jsx";
// // import ShowroomInvoiceDashboard from "./components/showroom/showroom-invoice.jsx";
// // import Complaints from "./components/customer/CustomerComplaints.jsx";
// // import ShowroomComplaints from "./components/showroom/ShowroomComplaints";
// // import UserComplaints from "./components/customer/Complaints.jsx";
// // import TheftReports from './components/showroom/TheftReports.jsx';
// // import CustomerTheftReports from "./components/customer/CustomerTheftReports.jsx";
// // import ShowroomBookings from "./components/showroom/ShowroomBookings.jsx"; 
// // import VerifyEmail from './components/VerifyEmail.jsx';
// // import ExploreCars from "./components/customer/ExploreCars.jsx";

// // function App() {
// //   return (
// //     <>
// //       <BrowserRouter>
// //         <Routes>
// //           {/* Public Routes */}
// //           <Route path="/" element={<LandingPage />} />
// //           <Route path="/explore-cars" element={<ExploreCars />} />
// //           <Route path="/login" element={<Login />} />
// //           <Route path="/signup" element={<SignUp />} />
// //           <Route path="/verify-email" element={<VerifyEmail />} />
// //           <Route path="/showroom/signup" element={<ShowroomSignUp />} />
// //           <Route path="/admin" element={<AdminLogin />} />
// //           <Route path="/forgot-password" element={<ForgotPassword />} />
// //           <Route path="/reset-password/:token" element={<ResetPassword />} />
// //           <Route path="/reset-confirmation" element={<ResetConfirmation />} />

// //           {/* Complaints Routes */}
// //           <Route path="/customer/complaints" element={<Complaints />} />
// //           <Route path="/customer/my-complaints" element={<UserComplaints />} />
// //           <Route path="/showroom/showroom-complaints" element={<ShowroomComplaints />} />
          
// //           {/* Theft Reports Routes */}
// //           <Route path="/showroom/theft-reports" element={<TheftReports />} />
// //           <Route path="/customer/theft-reports" element={<CustomerTheftReports />} />

// //           {/* Admin Protected Routes */}
// //           <Route element={<AdminProtectedLayout />}>
// //             <Route path="/admin/dashboard" element={<Adminpage />} />
// //           </Route>

// //           {/* Protected Routes */}
// //           <Route element={<ProtectedLayout />}>
// //             {/* Showroom Routes */}
// //             <Route path="/showroom/dashboard" element={<ShowroomDashboard />} />
// //             <Route path="/showroom/inventory" element={<ShowroomInventory />} />
// //             <Route path="/showroom/bookings" element={<ShowroomBookings />} />
// //             <Route path="/showroom/payments" element={<PaymentsPage />} />
// //             <Route path="/showroom/invoices" element={<ShowroomInvoiceDashboard />} />
// //             <Route path="/showroom/maintenance" element={<CarMaintenancePage />} />

// //             {/* Customer Routes */}
// //             <Route path="/customer/dashboard" element={<CarsDashboard />} />
// //             <Route path="/customer/profile" element={<UserProfile />} />
// //             <Route path="/customer/cars" element={<Cars />} />
// //             <Route path="/customer/showrooms" element={<Showrooms />} />
// //             <Route path="/customer/bookings" element={<Bookings />} />
// //             <Route path="/customer/editbooking" element={<EditBookingModal />} />
// // <Route path="/customer/extend-booking/:bookingId" element={<CarDetailsScreen />} />
// //             <Route path="/customer/invoice" element={<Invoice />} />
// //             <Route path="/customer/detailcars/:id" element={<Showroomcars />} />
// //           </Route>
// //         </Routes>
// //       </BrowserRouter>
// //     </>
// //   );
// // }

// // export default App;

// // import { BrowserRouter, Route, Routes } from "react-router-dom";
// // import CarDetailsScreen from "../src/components/customer/CarDetailsScreen.jsx";
// // import EditBookingModal from "../src/components/customer/EditBooking.jsx";
// // import Invoice from "../src/components/customer/invoice.jsx";
// // import AdminProtectedLayout from "./auth/adminProtectedRoute.jsx";
// // import ProtectedLayout from "./auth/protectedRoute.jsx";
// // import ForgotPassword from "./components/ForgotPassword.jsx";
// // import ResetConfirmation from "./components/ResetConfirmation.jsx";
// // import ResetPassword from "./components/ResetPassword.jsx";
// // import AdminLogin from "./components/admin/AdminLogin.jsx";
// // import Adminpage from "./components/admin/Adminpage.jsx";
// // import CarsDashboard from "./components/customer/Dashboard.jsx";
// // import Showroomcars from "./components/customer/Showroomcars.jsx";
// // import Bookings from "./components/customer/bookings.jsx";
// // import Cars from "./components/customer/cars.jsx";
// // import UserProfile from "./components/customer/profile.jsx";
// // import Showrooms from "./components/customer/showrooms.jsx";
// // import LandingPage from "./components/landingPage.jsx";
// // import Login from "./components/login.jsx";
// // import ShowroomDashboard from "./components/showroom/dashboard.jsx";
// // import ShowroomInventory from "./components/showroom/inventory.jsx";
// // import CarMaintenancePage from "./components/showroom/maintenance.jsx";
// // import ShowroomSignUp from "./components/showroom/signup.jsx";
// // import SignUp from "./components/signup.jsx";
// // import PaymentsPage from "./components/showroom/payment.jsx";
// // import ShowroomInvoiceDashboard from "./components/showroom/showroom-invoice.jsx";
// // import Complaints from "./components/customer/CustomerComplaints.jsx";
// // import ShowroomComplaints from "./components/showroom/ShowroomComplaints";
// // import UserComplaints from "./components/customer/Complaints.jsx";
// // import TheftReports from './components/showroom/TheftReports.jsx';
// // import CustomerTheftReports from "./components/customer/CustomerTheftReports.jsx";
// // import ShowroomBookings from "./components/showroom/ShowroomBookings.jsx"; 
// // import VerifyEmail from './components/VerifyEmail.jsx';
// // import ExploreCars from "./components/customer/ExploreCars.jsx";
// // import PaymentHistoryPage from "./components/showroom/PaymentHistoryPage.jsx"; 
// // import MaintenanceHistoryPage from "./components/showroom/MaintenanceHistoryPage.jsx";


// // function App() {
// //   return (
// //     <>
// //       <BrowserRouter>
// //         <Routes>
// //           {/* Public Routes */}
// //           <Route path="/" element={<LandingPage />} />
// //           <Route path="/explore-cars" element={<ExploreCars />} />
// //           <Route path="/login" element={<Login />} />
// //           <Route path="/signup" element={<SignUp />} />
// //           <Route path="/verify-email" element={<VerifyEmail />} />
// //           <Route path="/showroom/signup" element={<ShowroomSignUp />} />
// //           <Route path="/admin" element={<AdminLogin />} />
// //           <Route path="/forgot-password" element={<ForgotPassword />} />
// //           <Route path="/reset-password/:token" element={<ResetPassword />} />
// //           <Route path="/reset-confirmation" element={<ResetConfirmation />} />

// //           {/* Complaints Routes */}
// //           <Route path="/customer/complaints" element={<Complaints />} />
// //           <Route path="/customer/my-complaints" element={<UserComplaints />} />
// //           <Route path="/showroom/showroom-complaints" element={<ShowroomComplaints />} />
          
// //           {/* Theft Reports Routes */}
// //           <Route path="/showroom/theft-reports" element={<TheftReports />} />
// //           <Route path="/customer/theft-reports" element={<CustomerTheftReports />} />

// //           {/* Admin Protected Routes */}
// //           <Route element={<AdminProtectedLayout />}>
// //             <Route path="/admin/dashboard" element={<Adminpage />} />
// //           </Route>

// //           {/* Protected Routes */}
// //           <Route element={<ProtectedLayout />}>
// //             {/* Showroom Routes */}
// //             <Route path="/showroom/dashboard" element={<ShowroomDashboard />} />
// //             <Route path="/showroom/inventory" element={<ShowroomInventory />} />
// //             <Route path="/showroom/bookings" element={<ShowroomBookings />} />
// //             <Route path="/showroom/payments" element={<PaymentsPage />} />
// //             <Route path="/showroom/payment-history" element={<PaymentHistoryPage />} /> {/* ✅ ADDED */}
// //             <Route path="/showroom/invoices" element={<ShowroomInvoiceDashboard />} />
// //             <Route path="/showroom/maintenance" element={<CarMaintenancePage />} />
// //             <Route path="/showroom/maintenance-history" element={<MaintenanceHistoryPage />} />


// //             {/* Customer Routes */}
// //             <Route path="/customer/dashboard" element={<CarsDashboard />} />
// //             <Route path="/customer/profile" element={<UserProfile />} />
// //             <Route path="/customer/cars" element={<Cars />} />
// //             <Route path="/customer/showrooms" element={<Showrooms />} />
// //             <Route path="/customer/bookings" element={<Bookings />} />
// //             <Route path="/customer/editbooking" element={<EditBookingModal />} />
// //             <Route path="/customer/extend-booking/:bookingId" element={<CarDetailsScreen />} />
// //             <Route path="/customer/invoice" element={<Invoice />} />
// //             <Route path="/customer/detailcars/:id" element={<Showroomcars />} />
// //           </Route>

// //           {/* ✅ ADD CATCH-ALL ROUTE FOR UNDEFINED ROUTES */}
// //           <Route path="*" element={
// //             <div className="min-h-screen bg-gray-50 flex items-center justify-center">
// //               <div className="text-center">
// //                 <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Page Not Found</h1>
// //                 <p className="text-gray-600 mb-8">The page you're looking for doesn't exist.</p>
// //                 <a href="/" className="bg-[#C17D3C] text-white px-6 py-3 rounded-lg hover:bg-[#B06F35] transition-colors">
// //                   Go Back Home
// //                 </a>
// //               </div>
// //             </div>
// //           } />
// //         </Routes>
// //       </BrowserRouter>
// //     </>
// //   );
// // }

// // export default App;

// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import CarDetailsScreen from "../src/components/customer/CarDetailsScreen.jsx";
// import EditBookingModal from "../src/components/customer/EditBooking.jsx";
// import Invoice from "../src/components/customer/invoice.jsx";
// import AdminProtectedLayout from "./auth/adminProtectedRoute.jsx";
// import ProtectedLayout from "./auth/protectedRoute.jsx";
// import ForgotPassword from "./components/ForgotPassword.jsx";
// import ResetConfirmation from "./components/ResetConfirmation.jsx";
// import ResetPassword from "./components/ResetPassword.jsx";
// import AdminLogin from "./components/admin/AdminLogin.jsx";
// import Adminpage from "./components/admin/Adminpage.jsx";
// import CarsDashboard from "./components/customer/Dashboard.jsx";
// import Showroomcars from "./components/customer/Showroomcars.jsx";
// import Bookings from "./components/customer/bookings.jsx";
// import Cars from "./components/customer/cars.jsx";
// import UserProfile from "./components/customer/profile.jsx";
// import Showrooms from "./components/customer/showrooms.jsx";
// import LandingPage from "./components/landingPage.jsx";
// import Login from "./components/login.jsx";
// import ShowroomDashboard from "./components/showroom/dashboard.jsx";
// import ShowroomInventory from "./components/showroom/inventory.jsx";
// import CarMaintenancePage from "./components/showroom/maintenance.jsx";
// import ShowroomSignUp from "./components/showroom/signup.jsx";
// import SignUp from "./components/signup.jsx";
// import PaymentsPage from "./components/showroom/payment.jsx";
// import ShowroomInvoiceDashboard from "./components/showroom/showroom-invoice.jsx";
// import Complaints from "./components/customer/CustomerComplaints.jsx";
// import ShowroomComplaints from "./components/showroom/ShowroomComplaints";
// import UserComplaints from "./components/customer/Complaints.jsx";
// import TheftReports from './components/showroom/TheftReports.jsx';
// import CustomerTheftReports from "./components/customer/CustomerTheftReports.jsx";
// import ShowroomBookings from "./components/showroom/ShowroomBookings.jsx"; 
// import VerifyEmail from './components/VerifyEmail.jsx';
// import ExploreCars from "./components/customer/ExploreCars.jsx";
// import PaymentHistoryPage from "./components/showroom/PaymentHistoryPage.jsx"; 
// import MaintenanceHistoryPage from "./components/showroom/MaintenanceHistoryPage.jsx";
// import ShowroomNotifications from "./components/showroom/ShowroomNotifications.jsx"; // ✅ ADD THIS IMPORT

// function App() {
//   return (
//     <>
//       <BrowserRouter>
//         <Routes>
//           {/* Public Routes */}
//           <Route path="/" element={<LandingPage />} />
//           <Route path="/explore-cars" element={<ExploreCars />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<SignUp />} />
//           <Route path="/verify-email" element={<VerifyEmail />} />
//           <Route path="/showroom/signup" element={<ShowroomSignUp />} />
//           <Route path="/admin" element={<AdminLogin />} />
//           <Route path="/forgot-password" element={<ForgotPassword />} />
//           <Route path="/reset-password/:token" element={<ResetPassword />} />
//           <Route path="/reset-confirmation" element={<ResetConfirmation />} />

//           {/* Complaints Routes */}
//           <Route path="/customer/complaints" element={<Complaints />} />
//           <Route path="/customer/my-complaints" element={<UserComplaints />} />
//           <Route path="/showroom/showroom-complaints" element={<ShowroomComplaints />} />
          
//           {/* Theft Reports Routes */}
//           <Route path="/showroom/theft-reports" element={<TheftReports />} />
//           <Route path="/customer/theft-reports" element={<CustomerTheftReports />} />

//           {/* Admin Protected Routes */}
//           <Route element={<AdminProtectedLayout />}>
//             <Route path="/admin/dashboard" element={<Adminpage />} />
//           </Route>

//           {/* Protected Routes */}
//           <Route element={<ProtectedLayout />}>
//             {/* Showroom Routes */}
//             <Route path="/showroom/dashboard" element={<ShowroomDashboard />} />
//             <Route path="/showroom/inventory" element={<ShowroomInventory />} />
//             <Route path="/showroom/bookings" element={<ShowroomBookings />} />
//             <Route path="/showroom/payments" element={<PaymentsPage />} />
//             <Route path="/showroom/payment-history" element={<PaymentHistoryPage />} />
//             <Route path="/showroom/invoices" element={<ShowroomInvoiceDashboard />} />
//             <Route path="/showroom/maintenance" element={<CarMaintenancePage />} />
//             <Route path="/showroom/maintenance-history" element={<MaintenanceHistoryPage />} />
//             <Route path="/showroom/notifications" element={<ShowroomNotifications />} /> {/* ✅ ADD THIS ROUTE */}

//             {/* Customer Routes */}
//             <Route path="/customer/dashboard" element={<CarsDashboard />} />
//             <Route path="/customer/profile" element={<UserProfile />} />
//             <Route path="/customer/cars" element={<Cars />} />
//             <Route path="/customer/showrooms" element={<Showrooms />} />
//             <Route path="/customer/bookings" element={<Bookings />} />
//             <Route path="/customer/editbooking" element={<EditBookingModal />} />
//             <Route path="/customer/extend-booking/:bookingId" element={<CarDetailsScreen />} />
//             <Route path="/customer/invoice" element={<Invoice />} />
//             <Route path="/customer/detailcars/:id" element={<Showroomcars />} />
//           </Route>

//           {/* ✅ ADD CATCH-ALL ROUTE FOR UNDEFINED ROUTES */}
//           <Route path="*" element={
//             <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//               <div className="text-center">
//                 <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Page Not Found</h1>
//                 <p className="text-gray-600 mb-8">The page you're looking for doesn't exist.</p>
//                 <a href="/" className="bg-[#C17D3C] text-white px-6 py-3 rounded-lg hover:bg-[#B06F35] transition-colors">
//                   Go Back Home
//                 </a>
//               </div>
//             </div>
//           } />
//         </Routes>
//       </BrowserRouter>
//     </>
//   );
// }

// export default App;

// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import CarDetailsScreen from "../src/components/customer/CarDetailsScreen.jsx";
// import EditBookingModal from "../src/components/customer/EditBooking.jsx";
// import Invoice from "../src/components/customer/invoice.jsx";
// import AdminProtectedLayout from "./auth/adminProtectedRoute.jsx";
// import ProtectedLayout from "./auth/protectedRoute.jsx";
// import ForgotPassword from "./components/ForgotPassword.jsx";
// import ResetConfirmation from "./components/ResetConfirmation.jsx";
// import ResetPassword from "./components/ResetPassword.jsx";
// import AdminLogin from "./components/admin/AdminLogin.jsx";
// import Adminpage from "./components/admin/Adminpage.jsx";
// import CarsDashboard from "./components/customer/Dashboard.jsx";
// import Showroomcars from "./components/customer/Showroomcars.jsx";
// import Bookings from "./components/customer/bookings.jsx";
// import Cars from "./components/customer/cars.jsx";
// import UserProfile from "./components/customer/profile.jsx";
// import Showrooms from "./components/customer/showrooms.jsx";
// import LandingPage from "./components/landingPage.jsx";
// import Login from "./components/login.jsx";
// import ShowroomDashboard from "./components/showroom/dashboard.jsx";
// import ShowroomInventory from "./components/showroom/inventory.jsx";
// import CarMaintenancePage from "./components/showroom/maintenance.jsx";
// import ShowroomSignUp from "./components/showroom/signup.jsx";
// import SignUp from "./components/signup.jsx";
// import PaymentsPage from "./components/showroom/payment.jsx";
// import ShowroomInvoiceDashboard from "./components/showroom/showroom-invoice.jsx"; // ✅ Make sure this import exists
// import Complaints from "./components/customer/CustomerComplaints.jsx";
// import ShowroomComplaints from "./components/showroom/ShowroomComplaints";
// import UserComplaints from "./components/customer/Complaints.jsx";
// import TheftReports from './components/showroom/TheftReports.jsx';
// import CustomerTheftReports from "./components/customer/CustomerTheftReports.jsx";
// import ShowroomBookings from "./components/showroom/ShowroomBookings.jsx"; 
// import VerifyEmail from './components/VerifyEmail.jsx';
// import ExploreCars from "./components/customer/ExploreCars.jsx";
// import PaymentHistoryPage from "./components/showroom/PaymentHistoryPage.jsx"; 
// import MaintenanceHistoryPage from "./components/showroom/MaintenanceHistoryPage.jsx";
// import ShowroomNotifications from "./components/showroom/ShowroomNotifications.jsx";

// function App() {
//   return (
//     <>
//       <BrowserRouter>
//         <Routes>
//           {/* Public Routes */}
//           <Route path="/" element={<LandingPage />} />
//           <Route path="/explore-cars" element={<ExploreCars />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<SignUp />} />
//           <Route path="/verify-email" element={<VerifyEmail />} />
//           <Route path="/showroom/signup" element={<ShowroomSignUp />} />
//           <Route path="/admin" element={<AdminLogin />} />
//           <Route path="/forgot-password" element={<ForgotPassword />} />
//           <Route path="/reset-password/:token" element={<ResetPassword />} />
//           <Route path="/reset-confirmation" element={<ResetConfirmation />} />

//           {/* Complaints Routes */}
//           <Route path="/customer/complaints" element={<Complaints />} />
//           <Route path="/customer/my-complaints" element={<UserComplaints />} />
//           <Route path="/showroom/showroom-complaints" element={<ShowroomComplaints />} />
          
//           {/* Theft Reports Routes */}
//           <Route path="/showroom/theft-reports" element={<TheftReports />} />
//           <Route path="/customer/theft-reports" element={<CustomerTheftReports />} />

//           {/* Admin Protected Routes */}
//           <Route element={<AdminProtectedLayout />}>
//             <Route path="/admin/dashboard" element={<Adminpage />} />
//           </Route>

//           {/* Protected Routes */}
//           <Route element={<ProtectedLayout />}>
//             {/* Showroom Routes */}
//             <Route path="/showroom/dashboard" element={<ShowroomDashboard />} />
//             <Route path="/showroom/inventory" element={<ShowroomInventory />} />
//             <Route path="/showroom/bookings" element={<ShowroomBookings />} />
//             <Route path="/showroom/payments" element={<PaymentsPage />} />
//             <Route path="/showroom/payment-history" element={<PaymentHistoryPage />} />
//             <Route path="/showroom/invoices" element={<ShowroomInvoiceDashboard />} /> {/* ✅ THIS ROUTE MUST EXIST */}
//             <Route path="/showroom/maintenance" element={<CarMaintenancePage />} />
//             <Route path="/showroom/maintenance-history" element={<MaintenanceHistoryPage />} />
//             <Route path="/showroom/notifications" element={<ShowroomNotifications />} />

//             {/* Customer Routes */}
//             <Route path="/customer/dashboard" element={<CarsDashboard />} />
//             <Route path="/customer/profile" element={<UserProfile />} />
//             <Route path="/customer/cars" element={<Cars />} />
//             <Route path="/customer/showrooms" element={<Showrooms />} />
//             <Route path="/customer/bookings" element={<Bookings />} />
//             <Route path="/customer/editbooking" element={<EditBookingModal />} />
//             <Route path="/customer/extend-booking/:bookingId" element={<CarDetailsScreen />} />
//             <Route path="/customer/invoice" element={<Invoice />} />
//             <Route path="/customer/detailcars/:id" element={<Showroomcars />} />
//           </Route>

//           {/* Catch-all route for 404 */}
//           <Route path="*" element={
//             <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//               <div className="text-center">
//                 <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Page Not Found</h1>
//                 <p className="text-gray-600 mb-8">The page you're looking for doesn't exist.</p>
//                 <a href="/" className="bg-[#C17D3C] text-white px-6 py-3 rounded-lg hover:bg-[#B06F35] transition-colors">
//                   Go Back Home
//                 </a>
//               </div>
//             </div>
//           } />
//         </Routes>
//       </BrowserRouter>
//     </>
//   );
// }

// export default App;

import { BrowserRouter, Route, Routes } from "react-router-dom";
import CarDetailsScreen from "../src/components/customer/CarDetailsScreen.jsx";
import EditBookingModal from "../src/components/customer/EditBooking.jsx";
import Invoice from "../src/components/customer/invoice.jsx";
import AdminProtectedLayout from "./auth/adminProtectedRoute.jsx";
import ProtectedLayout from "./auth/protectedRoute.jsx";
import ForgotPassword from "./components/ForgotPassword.jsx";
import ResetConfirmation from "./components/ResetConfirmation.jsx";
import ResetPassword from "./components/ResetPassword.jsx";
import AdminLogin from "./components/admin/AdminLogin.jsx";
import Adminpage from "./components/admin/Adminpage.jsx";
import CarsDashboard from "./components/customer/Dashboard.jsx";
import Showroomcars from "./components/customer/Showroomcars.jsx";
import Bookings from "./components/customer/bookings.jsx";
import Cars from "./components/customer/cars.jsx";
import UserProfile from "./components/customer/profile.jsx";
import Showrooms from "./components/customer/showrooms.jsx";
import LandingPage from "./components/landingPage.jsx";
import Login from "./components/login.jsx";
import ShowroomDashboard from "./components/showroom/dashboard.jsx";
import ShowroomInventory from "./components/showroom/inventory.jsx";
import CarMaintenancePage from "./components/showroom/maintenance.jsx";
import ShowroomSignUp from "./components/showroom/signup.jsx";
import SignUp from "./components/signup.jsx";
import PaymentsPage from "./components/showroom/payment.jsx";
import ShowroomInvoiceDashboard from "./components/showroom/showroom-invoice.jsx"; // ✅ Make sure this import exists
import Complaints from "./components/customer/CustomerComplaints.jsx";
import ShowroomComplaints from "./components/showroom/ShowroomComplaints";
import UserComplaints from "./components/customer/Complaints.jsx";
import TheftReports from './components/showroom/TheftReports.jsx';
import CustomerTheftReports from "./components/customer/CustomerTheftReports.jsx";
import ShowroomBookings from "./components/showroom/ShowroomBookings.jsx"; 
import VerifyEmail from './components/VerifyEmail.jsx';
import ExploreCars from "./components/customer/ExploreCars.jsx";
import PaymentHistoryPage from "./components/showroom/PaymentHistoryPage.jsx"; 
import MaintenanceHistoryPage from "./components/showroom/MaintenanceHistoryPage.jsx";
import ShowroomProfile from "./components/showroom/ShowroomProfile.jsx"; // ✅ ADD THIS IMPORT

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/explore-cars" element={<ExploreCars />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/showroom/signup" element={<ShowroomSignUp />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/reset-confirmation" element={<ResetConfirmation />} />

          {/* Complaints Routes */}
          <Route path="/customer/complaints" element={<Complaints />} />
          <Route path="/customer/my-complaints" element={<UserComplaints />} />
          <Route path="/showroom/showroom-complaints" element={<ShowroomComplaints />} />
          
          {/* Theft Reports Routes */}
          <Route path="/showroom/theft-reports" element={<TheftReports />} />
          <Route path="/customer/theft-reports" element={<CustomerTheftReports />} />

          {/* Admin Protected Routes */}
          <Route element={<AdminProtectedLayout />}>
            <Route path="/admin/dashboard" element={<Adminpage />} />
          </Route>

          {/* Protected Routes */}
          <Route element={<ProtectedLayout />}>
            {/* Showroom Routes */}
            <Route path="/showroom/dashboard" element={<ShowroomDashboard />} />
            <Route path="/showroom/inventory" element={<ShowroomInventory />} />
            <Route path="/showroom/bookings" element={<ShowroomBookings />} />
            <Route path="/showroom/payments" element={<PaymentsPage />} />
            <Route path="/showroom/payment-history" element={<PaymentHistoryPage />} />
            <Route path="/showroom/invoices" element={<ShowroomInvoiceDashboard />} /> {/* ✅ THIS ROUTE MUST EXIST */}
            <Route path="/showroom/maintenance" element={<CarMaintenancePage />} />
            <Route path="/showroom/maintenance-history" element={<MaintenanceHistoryPage />} />
            <Route path="/showroom/profile" element={<ShowroomProfile />} /> {/* ✅ ADDED SHOWROOM PROFILE ROUTE */}

            {/* Customer Routes */}
            <Route path="/customer/dashboard" element={<CarsDashboard />} />
            <Route path="/customer/profile" element={<UserProfile />} />
            <Route path="/customer/cars" element={<Cars />} />
            <Route path="/customer/showrooms" element={<Showrooms />} />
            <Route path="/customer/bookings" element={<Bookings />} />
            <Route path="/customer/editbooking" element={<EditBookingModal />} />
            <Route path="/customer/extend-booking/:bookingId" element={<CarDetailsScreen />} />
            <Route path="/customer/invoice" element={<Invoice />} />
            <Route path="/customer/detailcars/:id" element={<Showroomcars />} />
          </Route>

          {/* Catch-all route for 404 */}
          <Route path="*" element={
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Page Not Found</h1>
                <p className="text-gray-600 mb-8">The page you're looking for doesn't exist.</p>
                <a href="/" className="bg-[#C17D3C] text-white px-6 py-3 rounded-lg hover:bg-[#B06F35] transition-colors">
                  Go Back Home
                </a>
              </div>
            </div>
          } />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;