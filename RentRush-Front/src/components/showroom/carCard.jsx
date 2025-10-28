// import { CircleGauge, Fuel, GripHorizontal, Users } from "lucide-react";
// import { useState } from "react";

// const Base_Url = import.meta.env.VITE_API_URL;
// const CarCard = ({ car }) => {
//   const [showModal, setShowModal] = useState(false);
//   const [showDetailsModal, setShowDetailsModal] = useState(false);

//   const openModal = () => setShowModal(true);
//   const closeModal = () => setShowModal(false);
//   const openDetailsModal = () => setShowDetailsModal(true);
//   const closeDetailsModal = () => setShowDetailsModal(false);

//   // Function to get status color dynamically
//   const getStatusColor = (status) => {
//     switch (status) {
//       case "Available":
//         return "bg-green-200 text-green-800";
//       case "Rented Out":
//         return "bg-red-200 text-red-800";
//       case "Pending Return":
//       case "In Maintenance":
//         return "bg-yellow-200 text-yellow-800";
//       default:
//         return "bg-gray-200 text-gray-800";
//     }
//   };

//   return (
//     <div className="bg-white shadow-md rounded-lg overflow-hidden w-72 relative flex flex-col">
//       {/* Car Image */}
//       <div className="relative w-full h-48">
//         <img
// <<<<<<< HEAD
//           src={`http://localhost:3000/uploads/${car.images[0]}`}
//           alt={`${car.carBrand} ${car.carModel}`}
//           className="w-full h-full object-contain p-2"
// =======
//           src={`${Base_Url}/uploads/${car.images[0]}`}
//           alt={car.carBrand + " " + car.carModel}
//           className="w-full h-full object-contain p-2" // <- use "object-contain" instead of "object-cover"
// >>>>>>> 21bc4a2477557e5fc9ab7d23518778228b8da702
//         />
//       </div>

//       <div className="p-4 flex flex-col flex-grow">
//         {/* Car Name + Status Badge - Modified for left name and right status */}
//         <div className="flex justify-between items-center mb-2">
//           <h3 className="font-bold text-lg">
//             {car.carBrand + " " + car.carModel}
//           </h3>
//           <span
//             className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
//               car.availability
//             )}`}
//           >
//             {car.availability}
//           </span>
//         </div>

//         {/* ❌ PLATE NUMBER REMOVED FROM CARD */}

//         <div className="grid grid-cols-3 gap-2 text-xs text-black mb-2">
//           {/* Mileage - Centered */}
//           <div className="flex flex-col items-center">
//             <CircleGauge className="w-4 h-4" />
//             <span className="text-gray-500 mt-1">{car.mileage}</span>
//           </div>
          
//           {/* Petrol - Centered */}
//           <div className="flex flex-col items-center">
//             <Fuel className="w-4 h-4" />
//             <span className="text-gray-500 mt-1">{car.fuelType}</span>
//           </div>
          
//           {/* Transmission - Centered */}
//           <div className="flex flex-col items-center">
//             <GripHorizontal className="w-4 h-4" />
//             <span className="text-gray-500 mt-1">{car.transmission}</span>
//           </div>
//         </div>

//         {/* Price + Details */}
//         <div className="flex justify-between items-center pb-4">
//           <span className="text-xl font-bold">{car.rentRate} Rs/Day</span>
//           <button
//             onClick={openDetailsModal}
//             className="text-blue-600 hover:underline"
//           >
//             View Car Details
//           </button>
//         </div>

//         {/* Seating capacity */}
//         <div className="flex text-xs text-gray-500 mb-2">
//           <Users className="w-4 h-4 mr-1" />
//           <span>{car.seatCapacity} Seats</span>
//         </div>

//         {/* View Rental Info button */}
//         {car.availability === "Rented Out" && (
//           <div className="flex justify-center mb-2">
//             <button
//               onClick={openModal}
//               className="text-blue-600 hover:underline text-sm"
//             >
//               View Rental Information
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Details Modal */}
//       {showDetailsModal && (
//         <div
//           className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
//           onClick={closeDetailsModal}
//         >
//           <div
//             className="bg-white p-6 rounded-lg relative w-11/12 md:w-3/4 lg:w-1/2 h-auto max-h-[90vh] overflow-y-auto shadow-lg"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <button
//               onClick={closeDetailsModal}
//               className="absolute top-3 right-3 text-gray-500 hover:text-black text-2xl"
//             >
//               &times;
//             </button>

//             <h2 className="text-3xl font-bold text-center mb-4">
//               {car.carBrand + " " + car.carModel}
//             </h2>

// <<<<<<< HEAD
//             {/* ❌ PLATE NUMBER REMOVED FROM MODAL HEADER */}
// =======
//               {
//                 <div className="flex justify-center gap-3 mb-6 flex-wrap">
//                   {car.images?.length > 0
//                     ? car.images.map((img, index) => (
//                         <img
//                           key={index}
//                           src={`${Base_Url}/uploads/${img}`}
//                           alt={`Car ${index}`}
//                           className="w-full max-w-md h-48 object-cover rounded-lg border shadow-md cursor-pointer hover:scale-105 transition-transform"
//                         />
//                       ))
//                     : [...Array(4)].map((_, i) => (
//                         <img
//                           key={i}
//                           src={car.image}
//                           alt={`Car Image ${i}`}
//                           className="w-20 h-16 md:w-24 md:h-20 object-cover rounded-lg border shadow-md"
//                         />
//                       ))}
//                 </div>
//               }
// >>>>>>> 21bc4a2477557e5fc9ab7d23518778228b8da702

//             <div className="flex justify-center gap-3 mb-6 flex-wrap">
//               {car.images?.length > 0
//                 ? car.images.map((img, index) => (
//                     <img
//                       key={index}
//                       src={`http://localhost:3000/uploads/${img}`}
//                       alt={`Car ${index}`}
//                       className="w-full max-w-md h-48 object-cover rounded-lg border shadow-md cursor-pointer hover:scale-105 transition-transform"
//                     />
//                   ))
//                 : [...Array(4)].map((_, i) => (
//                     <img
//                       key={i}
//                       src={car.image}
//                       alt={`Car Image ${i}`}
//                       className="w-20 h-16 md:w-24 md:h-20 object-cover rounded-lg border shadow-md"
//                     />
//                   ))}
//             </div>

//             {/* Car Details Table */}
//             <div className="overflow-x-auto">
//               <table className="w-full border-collapse border text-20px">
//                 <tbody>
//                   {/* ✅ PLATE NUMBER ONLY IN DETAILS TABLE */}
//                   <tr>
//                     <td className="border p-2 font-bold">Plate Number</td>
//                     <td className="border p-2 font-mono">{car.plateNumber || "N/A"}</td>
//                   </tr>
//                   <tr>
//                     <td className="border p-2 font-bold">Model</td>
//                     <td className="border p-2">{car.carModel}</td>
//                   </tr>
//                   <tr>
//                     <td className="border p-2 font-bold">Color</td>
//                     <td className="border p-2">{car.color}</td>
//                   </tr>
//                   <tr>
//                     <td className="border p-2 font-bold">Mileage</td>
//                     <td className="border p-2">{car.mileage} miles</td>
//                   </tr>
//                   <tr>
//                     <td className="border p-2 font-bold">Body Type</td>
//                     <td className="border p-2">{car.bodyType}</td>
//                   </tr>
//                   <tr>
//                     <td className="border p-2 font-bold">Transmission</td>
//                     <td className="border p-2">{car.transmission}</td>
//                   </tr>
//                   <tr>
//                     <td className="border p-2 font-bold">Engine Type</td>
//                     <td className="border p-2">{car.engineType || "N/A"}</td>
//                   </tr>
//                   <tr>
//                     <td className="border p-2 font-bold">Registration Year</td>
//                     <td className="border p-2">{car.year || "N/A"}</td>
//                   </tr>
//                   <tr>
//                     <td className="border p-2 font-bold">Seat Capacity</td>
//                     <td className="border p-2">{car.seatCapacity}</td>
//                   </tr>
//                   <tr>
//                     <td className="border p-2 font-bold">Luggage Capacity</td>
//                     <td className="border p-2">{car.luggageCapacity}</td>
//                   </tr>
//                   <tr>
//                     <td className="border p-2 font-bold">Fuel Type</td>
//                     <td className="border p-2">{car.fuelType}</td>
//                   </tr>
//                   <tr>
//                     <td className="border p-2 font-bold">Price</td>
//                     <td className="border p-2 font-bold">
//                       {car.rentRate} Rs/Day
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Rental Info Modal */}
//       {showModal && car.availability === "Rented Out" && (
//         <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
//           <div className="bg-white p-6 rounded-lg relative w-96 max-h-[90vh] overflow-y-auto">
//             <button
//               onClick={closeModal}
//               className="absolute top-2 right-2 text-gray-500 hover:text-black text-2xl"
//             >
//               &#10005;
//             </button>

//             <h2 className="text-2xl font-bold mb-4 text-center">
//               {car.carBrand} {car.carModel}
//             </h2>

//             {/* ❌ PLATE NUMBER REMOVED FROM RENTAL MODAL */}

//             <img
// <<<<<<< HEAD
//               src={`http://localhost:3000/uploads/${car.images[0]}`}
//               alt={`${car.carBrand} ${car.carModel}`}
// =======
//               src={`${Base_Url}/uploads/${car.images[0]}`}
//               alt={car.carBrand + " " + car.carModel}
// >>>>>>> 21bc4a2477557e5fc9ab7d23518778228b8da702
//               className="w-full h-48 object-contain bg-gray-100 mb-4 rounded"
//             />

//             <h2 className="text-xl font-bold mb-4 text-center">
//               Rental Information
//             </h2>

//             <div className="space-y-2 text-sm">
//               {/* ❌ PLATE NUMBER REMOVED FROM RENTAL INFO */}
//               <p>
//                 <strong>Renter Name:</strong>{" "}
//                 {car.rentalInfo?.userId?.ownerName || "N/A"}
//               </p>
//               <p>
//                 <strong>Email:</strong> {car.rentalInfo?.userId?.email || "N/A"}
//               </p>
//               <p>
//                 <strong>CNIC:</strong> {car.rentalInfo?.userId?.cnic || "N/A"}
//               </p>
//               <p>
//                 <strong>Phone:</strong>{" "}
//                 {car.rentalInfo?.userId?.contactNumber || "N/A"}
//               </p>
//               <p>
//                 <strong>Address:</strong>{" "}
//                 {car.rentalInfo?.userId?.address || "N/A"}
//               </p>
//               <p>
//                 <strong>Rental Start Date:</strong>{" "}
//                 {car.rentalInfo?.rentalStartDate || "N/A"}
//               </p>
//               <p>
//                 <strong>Rental End Date:</strong>{" "}
//                 {car.rentalInfo?.rentalEndDate || "N/A"}
//               </p>
//               <p>
//                 <strong>Rental Days:</strong>{" "}
//                 {car.rentalInfo?.rentalStartDate &&
//                 car.rentalInfo?.rentalEndDate
//                   ? Math.ceil(
//                       (new Date(car.rentalInfo.rentalEndDate) -
//                         new Date(car.rentalInfo.rentalStartDate)) /
//                         (1000 * 60 * 60 * 24)
//                     )
//                   : "N/A"}
//               </p>
//               <p className="text-lg font-semibold mt-4">
//                 <strong>Total Amount:</strong>{" "}
//                 {car.rentalInfo?.totalPrice || "N/A"} Rs
//               </p>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CarCard;

import { CircleGauge, Fuel, GripHorizontal, Users } from "lucide-react";
import { useState } from "react";

const Base_Url = import.meta.env.VITE_API_URL;

const CarCard = ({ car }) => {
  const [showModal, setShowModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  const openDetailsModal = () => setShowDetailsModal(true);
  const closeDetailsModal = () => setShowDetailsModal(false);

  // Function to get status color dynamically
  const getStatusColor = (status) => {
    switch (status) {
      case "Available":
        return "bg-green-200 text-green-800";
      case "Rented Out":
        return "bg-red-200 text-red-800";
      case "Pending Return":
      case "In Maintenance":
        return "bg-yellow-200 text-yellow-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden w-72 relative flex flex-col">
      {/* Car Image */}
      <div className="relative w-full h-48">
        <img
          src={`${Base_Url}/uploads/${car.images[0]}`}
          alt={`${car.carBrand} ${car.carModel}`}
          className="w-full h-full object-contain p-2"
        />
      </div>

      <div className="p-4 flex flex-col flex-grow">
        {/* Car Name + Status Badge */}
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-bold text-lg">
            {car.carBrand + " " + car.carModel}
          </h3>
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
              car.availability
            )}`}
          >
            {car.availability}
          </span>
        </div>

        {/* Car Specs */}
        <div className="grid grid-cols-3 gap-2 text-xs text-black mb-2">
          <div className="flex flex-col items-center">
            <CircleGauge className="w-4 h-4" />
            <span className="text-gray-500 mt-1">{car.mileage}</span>
          </div>

          <div className="flex flex-col items-center">
            <Fuel className="w-4 h-4" />
            <span className="text-gray-500 mt-1">{car.fuelType}</span>
          </div>

          <div className="flex flex-col items-center">
            <GripHorizontal className="w-4 h-4" />
            <span className="text-gray-500 mt-1">{car.transmission}</span>
          </div>
        </div>

        {/* Price + Details */}
        <div className="flex justify-between items-center pb-4">
          <span className="text-xl font-bold">Rs {car.rentRate} </span>
          <button
            onClick={openDetailsModal}
            className="text-blue-600 hover:underline"
          >
            View Car Details
          </button>
        </div>

        {/* Seating capacity */}
        <div className="flex text-xs text-gray-500 mb-2">
          <Users className="w-4 h-4 mr-1" />
          <span>{car.seatCapacity} Seats</span>
        </div>

        {/* View Rental Info button */}
        {car.availability === "Rented Out" && (
          <div className="flex justify-center mb-2">
            <button
              onClick={openModal}
              className="text-blue-600 hover:underline text-sm"
            >
              View Rental Information
            </button>
          </div>
        )}
      </div>

      {/* Details Modal */}
      {showDetailsModal && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
          onClick={closeDetailsModal}
        >
          <div
            className="bg-white p-6 rounded-lg relative w-11/12 md:w-3/4 lg:w-1/2 h-auto max-h-[90vh] overflow-y-auto shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeDetailsModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-black text-2xl"
            >
              &times;
            </button>

            <h2 className="text-3xl font-bold text-center mb-4">
              {car.carBrand + " " + car.carModel}
            </h2>

            <div className="flex justify-center gap-3 mb-6 flex-wrap">
              {car.images?.length > 0
                ? car.images.map((img, index) => (
                    <img
                      key={index}
                      src={`${Base_Url}/uploads/${img}`}
                      alt={`Car ${index}`}
                      className="w-full max-w-md h-48 object-cover rounded-lg border shadow-md cursor-pointer hover:scale-105 transition-transform"
                    />
                  ))
                : [...Array(4)].map((_, i) => (
                    <img
                      key={i}
                      src={car.image}
                      alt={`Car Image ${i}`}
                      className="w-20 h-16 md:w-24 md:h-20 object-cover rounded-lg border shadow-md"
                    />
                  ))}
            </div>

            {/* Car Details Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border text-20px">
                <tbody>
                  <tr>
                    <td className="border p-2 font-bold">Plate Number</td>
                    <td className="border p-2 font-mono">
                      {car.plateNumber || "N/A"}
                    </td>
                  </tr>
                  <tr>
                    <td className="border p-2 font-bold">Model</td>
                    <td className="border p-2">{car.carModel}</td>
                  </tr>
                  <tr>
                    <td className="border p-2 font-bold">Color</td>
                    <td className="border p-2">{car.color}</td>
                  </tr>
                  <tr>
                    <td className="border p-2 font-bold">Mileage</td>
                    <td className="border p-2">{car.mileage} miles</td>
                  </tr>
                  <tr>
                    <td className="border p-2 font-bold">Body Type</td>
                    <td className="border p-2">{car.bodyType}</td>
                  </tr>
                  <tr>
                    <td className="border p-2 font-bold">Transmission</td>
                    <td className="border p-2">{car.transmission}</td>
                  </tr>
                  <tr>
                    <td className="border p-2 font-bold">Engine Type</td>
                    <td className="border p-2">{car.engineType || "N/A"}</td>
                  </tr>
                  <tr>
                    <td className="border p-2 font-bold">Registration Year</td>
                    <td className="border p-2">{car.year || "N/A"}</td>
                  </tr>
                  <tr>
                    <td className="border p-2 font-bold">Seat Capacity</td>
                    <td className="border p-2">{car.seatCapacity}</td>
                  </tr>
                  <tr>
                    <td className="border p-2 font-bold">Luggage Capacity</td>
                    <td className="border p-2">{car.luggageCapacity}</td>
                  </tr>
                  <tr>
                    <td className="border p-2 font-bold">Fuel Type</td>
                    <td className="border p-2">{car.fuelType}</td>
                  </tr>
                  <tr>
                    <td className="border p-2 font-bold">Price</td>
                    <td className="border p-2 font-bold">
                      {car.rentRate} Rs/Day
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Rental Info Modal */}
      {showModal && car.availability === "Rented Out" && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg relative w-96 max-h-[90vh] overflow-y-auto">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-2xl"
            >
              &#10005;
            </button>

            <h2 className="text-2xl font-bold mb-4 text-center">
              {car.carBrand} {car.carModel}
            </h2>

            <img
              src={`${Base_Url}/uploads/${car.images[0]}`}
              alt={`${car.carBrand} ${car.carModel}`}
              className="w-full h-48 object-contain bg-gray-100 mb-4 rounded"
            />

            <h2 className="text-xl font-bold mb-4 text-center">
              Rental Information
            </h2>

            <div className="space-y-2 text-sm">
              <p>
                <strong>Renter Name:</strong>{" "}
                {car.rentalInfo?.userId?.ownerName || "N/A"}
              </p>
              <p>
                <strong>Email:</strong> {car.rentalInfo?.userId?.email || "N/A"}
              </p>
              <p>
                <strong>CNIC:</strong> {car.rentalInfo?.userId?.cnic || "N/A"}
              </p>
              <p>
                <strong>Phone:</strong>{" "}
                {car.rentalInfo?.userId?.contactNumber || "N/A"}
              </p>
              <p>
                <strong>Address:</strong>{" "}
                {car.rentalInfo?.userId?.address || "N/A"}
              </p>
              <p>
                <strong>Rental Start Date:</strong>{" "}
                {car.rentalInfo?.rentalStartDate || "N/A"}
              </p>
              <p>
                <strong>Rental End Date:</strong>{" "}
                {car.rentalInfo?.rentalEndDate || "N/A"}
              </p>
              <p>
                <strong>Rental Days:</strong>{" "}
                {car.rentalInfo?.rentalStartDate &&
                car.rentalInfo?.rentalEndDate
                  ? Math.ceil(
                      (new Date(car.rentalInfo.rentalEndDate) -
                        new Date(car.rentalInfo.rentalStartDate)) /
                        (1000 * 60 * 60 * 24)
                    )
                  : "N/A"}
              </p>
              <p className="text-lg font-semibold mt-4">
                <strong>Total Amount:</strong>{" "}
                {car.rentalInfo?.totalPrice || "N/A"} Rs
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarCard;
