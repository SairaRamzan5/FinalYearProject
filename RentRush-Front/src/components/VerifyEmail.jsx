import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { CheckCircle, XCircle, Loader, MailCheck } from 'lucide-react';
import Navbar from './Navbar';

const Base_Url = import.meta.env.VITE_API_URL;

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [verificationStatus, setVerificationStatus] = useState('verifying'); // 'verifying', 'success', 'error'
  const [message, setMessage] = useState('Verifying your email...');
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const verifyEmailToken = async () => {
      try {
        const token = searchParams.get('token');
        
        console.log('Token from URL:', token);
        
        if (!token) {
          setVerificationStatus('error');
          setMessage('Invalid verification link. No token found.');
          return;
        }

        console.log('Making API call to verify token...');
        
        const response = await axios.get(`${Base_Url}/api/verify-email?token=${token}`);
        console.log('API Response:', response.data);
        
        if (response.data.success) {
          setVerificationStatus('success');
          setMessage(response.data.message);
          
          // Countdown for redirect
          const timer = setInterval(() => {
            setCountdown((prev) => {
              if (prev <= 1) {
                clearInterval(timer);
                navigate('/login');
                return 0;
              }
              return prev - 1;
            });
          }, 1000);
          
        } else {
          setVerificationStatus('error');
          setMessage(response.data.message || 'Verification failed.');
        }
      } catch (error) {
        console.error('Verification error:', error);
        console.error('Error response:', error.response?.data);
        
        setVerificationStatus('error');
        const errorMessage = error.response?.data?.message || 
                            error.message || 
                            'Verification failed. Please try again.';
        setMessage(errorMessage);
      }
    };

    verifyEmailToken();
  }, [searchParams, navigate]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 border border-gray-200">
          <div className="text-center">
            
            {/* Verifying State */}
            {verificationStatus === 'verifying' && (
              <div className="space-y-6">
                <div className="flex justify-center">
                  <Loader className="h-20 w-20 text-blue-500 animate-spin" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">Verifying Your Email</h2>
                  <p className="text-gray-600 text-lg">{message}</p>
                </div>
                <div className="pt-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
            )}

            {/* Success State */}
            {verificationStatus === 'success' && (
              <div className="space-y-6">
                <div className="flex justify-center">
                  <div className="relative">
                    <CheckCircle className="h-20 w-20 text-green-500" />
                    <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-20"></div>
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">Email Verified Successfully!</h2>
                  <p className="text-gray-600 text-lg mb-2">{message}</p>
                  <p className="text-sm text-gray-500">
                    Redirecting to login in <span className="font-bold text-blue-600">{countdown}</span> seconds...
                  </p>
                </div>
                <div className="pt-4 space-y-3">
                  <button
                    onClick={() => navigate('/login')}
                    className="w-full px-6 py-3 bg-gradient-to-r from-[#C17D3C] to-[#B06F35] text-white font-semibold rounded-lg hover:from-[#B06F35] hover:to-[#A5612E] transition-all transform hover:scale-105 shadow-md"
                  >
                    Go to Login Now
                  </button>
                  <p className="text-xs text-gray-500">
                    Don't want to wait? Click the button above to go to login immediately.
                  </p>
                </div>
              </div>
            )}

            {/* Error State */}
            {verificationStatus === 'error' && (
              <div className="space-y-6">
                <div className="flex justify-center">
                  <XCircle className="h-20 w-20 text-red-500" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">Verification Failed</h2>
                  <p className="text-gray-600 text-lg mb-4">{message}</p>
                </div>
                <div className="pt-4 space-y-3">
                  <Link
                    to="/signup"
                    className="block w-full px-6 py-3 bg-gradient-to-r from-[#C17D3C] to-[#B06F35] text-white font-semibold rounded-lg hover:from-[#B06F35] hover:to-[#A5612E] transition-all transform hover:scale-105 text-center shadow-md"
                  >
                    Try Sign Up Again
                  </Link>
                  <Link
                    to="/login"
                    className="block w-full px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all text-center"
                  >
                    Go to Login
                  </Link>
                  <Link
                    to="/"
                    className="block w-full px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors text-center text-sm"
                  >
                    Return to Homepage
                  </Link>
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500 text-center">
                    Need help? Contact support if you continue to experience issues.
                  </p>
                </div>
              </div>
            )}

          </div>

          {/* Additional Info Section */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-center space-x-2 text-gray-600">
              <MailCheck className="h-5 w-5" />
              <span className="text-sm font-medium">Email Verification</span>
            </div>
            <p className="text-xs text-gray-500 text-center mt-2">
              This verification ensures the security of your RentRush account.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerifyEmail;

