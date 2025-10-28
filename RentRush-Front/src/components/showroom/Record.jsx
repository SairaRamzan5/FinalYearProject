import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ShowroomNavbar from './ShowroomNavbar';

const PaymentRecords = () => {
  const navigate = useNavigate();
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // // Load payments from localStorage on component mount
  // useEffect(() => {
  //   const savedPayments = localStorage.getItem('paymentRecords');
  //   if (savedPayments) {
  //     const parsedPayments = JSON.parse(savedPayments);
  //     setPayments(parsedPayments);
  //     setFilteredPayments(parsedPayments);
  //   } else {
  //     // Sample data if no payments exist in localStorage
  //     const samplePayments = [
  //       {
  //         id: 'TXN001234567',
  //         bookingId: 'BK0012345',
  //         customerName: 'Ahmed Hassan',
  //         email: 'ahmed.hassan@email.com',
  //         amount: 25000,
  //         status: 'Completed',
  //         paymentMethod: 'Credit Card',
  //         showroom: 'Premium Auto Showroom',
  //         description: 'Honda Civic 2024',
  //         date: '2023-10-15',
  //         createdTime: '15 January 2024 at 03:30:00 pm',
  //         completedTime: '15 January 2024 at 03:35:00 pm',
  //       },
  //       {
  //         id: 'TXN001234568',
  //         bookingId: 'BK0012346',
  //         customerName: 'Fatima Ali',
  //         email: 'fatima.ali@email.com',
  //         amount: 15000,
  //         status: 'Pending',
  //         paymentMethod: 'Bank Transfer',
  //         showroom: 'City Motors',
  //         description: 'Toyota Corolla 2023',
  //         date: '2023-10-16',
  //         createdTime: '16 January 2024 at 10:15:00 am',
  //         completedTime: null,
  //       },
  //       {
  //         id: 'TXN001234569',
  //         bookingId: 'BK0012347',
  //         customerName: 'Usman Khan',
  //         email: 'usman.khan@email.com',
  //         amount: 30000,
  //         status: 'Failed',
  //         paymentMethod: 'Debit Card',
  //         showroom: 'Elite Cars',
  //         description: 'Honda City 2024',
  //         date: '2023-10-14',
  //         createdTime: '14 January 2024 at 02:45:00 pm',
  //         completedTime: null,
  //       },
  //     ];
  //     setPayments(samplePayments);
  //     setFilteredPayments(samplePayments);
  //     localStorage.setItem('paymentRecords', JSON.stringify(samplePayments));
  //   }
  // }, []);



  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/payments');
        const data = await response.json();
        setPayments(data);
        setFilteredPayments(data);
      } catch (error) {
        console.error('Error fetching payments:', error);
        // Fallback to sample data if API fails
        
        
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  // Filter payments based on status and search term
  useEffect(() => {
    let result = payments;
    
    if (filter !== 'all') {
      result = result.filter(payment => payment.status === filter);
    }
    
    if (searchTerm) {
      result = result.filter(payment => 
        payment.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.bookingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.showroom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (payment.description && payment.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    setFilteredPayments(result);
  }, [filter, searchTerm, payments]);

  // Function to add a new payment (to be called from PaymentReceivedDialog)
  const addPayment = (newPayment) => {
    const updatedPayments = [...payments, newPayment];
    setPayments(updatedPayments);
    setFilteredPayments(updatedPayments);
    localStorage.setItem('paymentRecords', JSON.stringify(updatedPayments));
  };

  // Function to update a payment status (for pending payments)
  const updatePaymentStatus = (bookingId, status) => {
    const updatedPayments = payments.map(payment => 
      payment.bookingId === bookingId ? { ...payment, status } : payment
    );
    setPayments(updatedPayments);
    setFilteredPayments(updatedPayments);
    localStorage.setItem('paymentRecords', JSON.stringify(updatedPayments));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatAmount = (amount) => {
    return `Rs ${amount.toLocaleString()}`;
  };

  const handleViewDetails = (payment) => {
    setSelectedPayment(payment);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPayment(null);
  };

  const handleBackToDashboard = () => {
    navigate('/showroom/dashboard');
  };

  // Calculate stats for the summary
  const completedPayments = payments.filter(p => p.status === 'Completed').length;
  const pendingPayments = payments.filter(p => p.status === 'Pending').length;
  const failedPayments = payments.filter(p => p.status === 'Failed').length;
  const totalRevenue = payments
    .filter(p => p.status === 'Completed')
    .reduce((sum, payment) => sum + payment.amount, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <ShowroomNavbar />
      
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <div className="mb-6">
           
          </div>
          
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Payment Records</h1>
            <span className="text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {filteredPayments.length} payments
            </span>
          </div>
          
          {/* Filters and Search */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                  All Payments
                </button>
                <button
                  onClick={() => setFilter('Completed')}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${filter === 'Completed' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                  Completed
                </button>
                <button
                  onClick={() => setFilter('Pending')}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${filter === 'Pending' ? 'bg-yellow-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                  Pending
                </button>
                <button
                  onClick={() => setFilter('Failed')}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${filter === 'Failed' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                  Failed
                </button>
              </div>
              
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search payments..."
                  className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <svg
                  className="absolute right-2 top-2.5 h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"  
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
          
          {/* Payment Records Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filteredPayments.length > 0 ? (
              filteredPayments.map((payment) => (
                <div key={payment.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(payment.status)}`}>
                        {payment.status}
                      </span>
                      <span className="text-xs text-gray-500">{payment.date}</span>
                    </div>
                    
                    <div className="mb-4">
                      <h2 className="text-xl font-bold text-gray-900">{payment.customerName}</h2> 
                      <p className="text-gray-600">{payment.description}</p>
                      <p className="text-sm text-gray-500 mt-1">Booking ID: {payment.bookingId}</p>
                    </div>
                    
                    <div className="mb-4">
                      <div className="text-2xl font-bold text-gray-900">{formatAmount(payment.amount)}</div>
                    </div>
                    
                    <div className="text-sm text-gray-500 space-y-1">
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                        </svg>
                        {payment.email}
                      </div>
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        {payment.createdTime.split(' at ')[1]}
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                    <button 
                      onClick={() => handleViewDetails(payment)}
                      className="w-full bg-[#C17D3C] hover:bg-[#B06F35] text-white py-2 px-4 rounded-md transition-colors font-medium text-sm"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="text-gray-500 text-lg">No payments found matching your criteria.</div>
              </div>
            )}
          </div>
          
          {/* Stats Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className="rounded-full p-3 bg-blue-100 text-blue-600">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h2 className="text-lg font-semibold text-gray-900">Total Revenue</h2>
                  <p className="text-2xl font-bold text-gray-900">{formatAmount(totalRevenue)}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className="rounded-full p-3 bg-green-100 text-green-600">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h2 className="text-lg font-semibold text-gray-900">Completed</h2>
                  <p className="text-2xl font-bold text-gray-900">{completedPayments} Payments</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className="rounded-full p-3 bg-yellow-100 text-yellow-600">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h2 className="text-lg font-semibold text-gray-900">Pending</h2>
                  <p className="text-2xl font-bold text-gray-900">{pendingPayments} Payment{pendingPayments !== 1 ? 's' : ''}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className="rounded-full p-3 bg-red-100 text-red-600">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h2 className="text-lg font-semibold text-gray-900">Failed</h2>
                  <p className="text-2xl font-bold text-gray-900">{failedPayments} Payment{failedPayments !== 1 ? 's' : ''}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Detail Modal */}
      {isModalOpen && selectedPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#C17D3C] to-[#D18A49] p-6 text-white">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-white">Payment Details</h2>
                  <div className="inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium bg-white bg-opacity-20 text-white">
                    {selectedPayment.status}
                  </div>
                </div>
                <button 
                  onClick={closeModal}
                  className="text-white hover:text-gray-200 transition-colors"   
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              
              <div className="mt-4">
                <div className="text-3xl font-bold text-white">{formatAmount(selectedPayment.amount)}</div>
                <div className="text-sm opacity-90 text-white">Payment Amount</div>
              </div>
            </div>
            
            {/* Scrollable Content */}
            <div className="overflow-y-auto flex-grow p-6">
              <div className="space-y-6">
                {/* Customer Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">Customer Information</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <table className="w-full">
                      <tbody>
                        <tr>
                          <td className="py-2 text-sm text-gray-500 font-medium w-1/4">Name</td>
                          <td className="py-2 font-medium">{selectedPayment.customerName}</td>
                        </tr>
                        <tr>
                          <td className="py-2 text-sm text-gray-500 font-medium">Email</td>
                          <td className="py-2 font-medium">{selectedPayment.email}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                
                {/* Transaction Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">Transaction Information</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <table className="w-full">
                      <tbody>
                        <tr>
                          <td className="py-2 text-sm text-gray-500 font-medium w-1/4">Transaction ID</td>
                          <td className="py-2 font-medium">{selectedPayment.id}</td>
                        </tr>
                        <tr>
                          <td className="py-2 text-sm text-gray-500 font-medium">Booking ID</td>
                          <td className="py-2 font-medium">{selectedPayment.bookingId}</td>
                        </tr>
                        <tr>
                          <td className="py-2 text-sm text-gray-500 font-medium">Payment Method</td>
                          <td className="py-2 font-medium">
                            <div className="flex items-center">
                              <div className="w-5 h-5 rounded-full border border-gray-300 mr-2 flex items-center justify-center">
                                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                              </div>
                              {selectedPayment.paymentMethod}
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2 text-sm text-gray-500 font-medium">Showroom</td>
                          <td className="py-2 font-medium">{selectedPayment.showroom}</td>
                        </tr>
                        <tr>
                          <td className="py-2 text-sm text-gray-500 font-medium">Description</td>
                          <td className="py-2 font-medium">{selectedPayment.description}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                
                {/* Payment Timeline */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">Payment Timeline</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <table className="w-full">
                      <tbody>
                        <tr>
                          <td className="py-2 text-sm text-gray-500 font-medium w-1/4">Payment Created</td>
                          <td className="py-2 font-medium">{selectedPayment.createdTime}</td>
                        </tr>
                        {selectedPayment.completedTime && (
                          <tr>
                            <td className="py-2 text-sm text-gray-500 font-medium">Payment Completed</td>
                            <td className="py-2 font-medium">{selectedPayment.completedTime}</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                {/* Status Message */}
                {selectedPayment.status === 'Completed' && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-green-800">Payment Successfully Completed</h3>
                        <div className="mt-1 text-sm text-green-700">
                          This payment has been processed and confirmed. All transaction details are available above.
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Footer */}
            <div className="border-t border-gray-200 p-4 bg-gray-50">
              <button
                onClick={closeModal}
                className="w-full bg-[#C17D3C] hover:bg-[#B06F35] text-white py-2 px-4 rounded-lg transition-colors font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentRecords;
