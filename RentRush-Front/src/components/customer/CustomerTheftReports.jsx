

import React, { useEffect, useState } from "react";
import axios from "axios";
import { ShieldAlert, AlertTriangle, User, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function CustomerTheftReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  const Base_Url = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${Base_Url}/api/getuser`, {
        withCredentials: true,
      });

      if (res.data && res.data.userdata) {
        const userData = res.data.userdata;
        setUserInfo({
          name: userData.ownerName || userData.name,
          cnic: userData.cnic
        });
        
        sessionStorage.setItem("name", userData.ownerName || userData.name);
        sessionStorage.setItem("cnic", userData.cnic);
        
        fetchMyTheftReports(userData.ownerName || userData.name, userData.cnic);
      } else {
        setError("User data not found. Please login again.");
      }
    } catch (err) {
      console.error("Error fetching user info:", err);
      setError("Failed to load user information. Please login again.");
    }
  };

  const fetchMyTheftReports = async (customerName, cnic) => {
    try {
      if (!customerName || !cnic) {
        setError("User information incomplete. Please login again.");
        return;
      }

      const res = await axios.get(`${Base_Url}/api/theft-report/customer`, {
        params: { 
          customerName: customerName,
          cnic: cnic 
        },
        withCredentials: true,
      });
      
      setReports(res.data.data || []);
      
    } catch (err) {
      console.error("Error fetching theft reports:", err);
      
      if (err.response?.status === 404 || err.response?.status === 400) {
        try {
          const allRes = await axios.get(`${Base_Url}/api/theft-report`, {
            withCredentials: true,
          });
          
          const customerReports = (allRes.data.data || []).filter(
            report => report.customerName === customerName && report.cnic === cnic
          );
          
          setReports(customerReports);
        } catch (fallbackErr) {
          console.error("Fallback also failed:", fallbackErr);
          setError("No theft reports found for your account.");
        }
      } else {
        setError("Failed to load your theft reports. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleTryAgain = () => {
    setError(null);
    fetchUserInfo();
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShieldAlert className="text-red-600" size={28} />
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">My Theft Reports</h1>
                  <p className="text-gray-600 mt-1">View all the theft reports you have submitted</p>
                </div>
              </div>
              
              {reports.length > 0 && (
                <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                  {reports.length} Report{reports.length !== 1 ? 's' : ''}
                </div>
              )}
            </div>
          </div>

          {loading && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
              <p className="text-gray-600 text-lg">Loading your theft reports...</p>
            </div>
          )}

          {error && !loading && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <AlertTriangle className="mx-auto text-red-500 mb-3" size={32} />
              <p className="text-red-600 font-medium text-lg mb-4">{error}</p>
              <div className="flex gap-3 justify-center">
                <button 
                  onClick={handleTryAgain}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Try Again
                </button>
                <button 
                  onClick={handleLoginRedirect}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Go to Login
                </button>
              </div>
            </div>
          )}

          {!loading && !error && reports.length === 0 && (
            <div className="bg-white border border-green-200 rounded-lg p-8 text-center">
              <ShieldAlert className="mx-auto text-green-500 mb-4" size={48} />
              <p className="text-green-600 text-lg font-medium mb-2">No theft reports found</p>
              <p className="text-green-500 mb-4">You haven't submitted any theft reports yet.</p>
              <p className="text-gray-500 text-sm">Use the SOS button to report a stolen vehicle from your active bookings.</p>
            </div>
          )}

          {!loading && !error && reports.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <p className="text-gray-600">
                  Showing <span className="font-semibold">{reports.length}</span> theft 
                  report{reports.length !== 1 ? 's' : ''} submitted by you
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 text-gray-700">
                      <th className="border-b p-4 text-left font-semibold">Car Name</th>
                      <th className="border-b p-4 text-left font-semibold">Plate Number</th>
                      <th className="border-b p-4 text-left font-semibold">Showroom</th>
                      <th className="border-b p-4 text-left font-semibold">Start Date</th>
                      <th className="border-b p-4 text-left font-semibold">End Date</th>
                      <th className="border-b p-4 text-left font-semibold">Report Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reports.map((report) => (
                      <tr key={report._id} className="hover:bg-gray-50 transition-colors">
                        <td className="border-b p-4">
                          <div className="flex items-center gap-2">
                            <ShieldAlert className="text-red-500" size={16} />
                            <span className="font-medium text-gray-800">
                              {report.rentalDetails?.carName || "Unknown Vehicle"}
                            </span>
                          </div>
                        </td>
                        <td className="border-b p-4">
                          <span className="font-mono text-gray-700">
                            {report.rentalDetails?.plateNumber || "N/A"}
                          </span>
                        </td>
                        <td className="border-b p-4 text-gray-600">
                          {report.rentalDetails?.showroomName || "Unknown Showroom"}
                        </td>
                        <td className="border-b p-4 text-gray-600">
                          {new Date(report.rentalDetails?.rentalStartDate).toLocaleDateString()}
                        </td>
                        <td className="border-b p-4 text-gray-600">
                          {new Date(report.rentalDetails?.rentalEndDate).toLocaleDateString()}
                        </td>
                        <td className="border-b p-4 text-gray-600">
                          {new Date(report.createdAt || report.reportDate).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-4 border-t border-gray-200 bg-gray-50">
                <p className="text-gray-500 text-sm">
                  All theft reports are immediately forwarded to the respective showrooms for investigation.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default CustomerTheftReports;