// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import Toast from "../Toast";
// import CarCard from "./carCard";
// import CarMaintenanceChecklist from "./CarMaintenanceChecklist";
// import ShowroomNavbar from "./showroomNavbar";

// const Base_Url = import.meta.env.VITE_API_URL;

// const CarMaintenancePage = () => {
//   const [maintenanceSelectedCar, setMaintenanceSelectedCar] = useState(null);
//   const [cars, setCars] = useState(null);

//   const fetchVehicles = async () => {
//     try {
//       const response = await axios.get(
//         `${Base_Url}/api/car/get-all-return-cars`,
//         {
//           withCredentials: true,
//         }
//       );
//       setCars(response.data);
//     } catch (err) {
//       console.log(err);
//       Toast(err.data || err.message || "Something went wrong", "error");
//     }
//   };

//   useEffect(() => {
//     try {
//       fetchVehicles();
//     } catch (error) {
//       console.error("Error fetching vehicles:", error);
//       Toast("Failed to fetch vehicles", "error");
//     }
//   }, []);

//   const handleMaintenanceCarSelect = (car) => {
//     setMaintenanceSelectedCar(car);
//   };

//   const handleCloseChecklist = () => {
//     setMaintenanceSelectedCar(null);
//     fetchVehicles(); // Refresh the car list
//   };

//   return (
//     <>
//       <ShowroomNavbar />
//       <div className="p-8 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 min-h-screen">
//         <h2 className="text-3xl font-bold text-center mb-8 text-[#0B132A]">
//           {cars?.length > 0 ? "Cars for Maintenance" : "No Car for Maintenance"}
//         </h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 p-3 justify-items-center">
//           {cars?.map((car) => (
//             <div
//               key={car._id}
//               onClick={() => handleMaintenanceCarSelect(car)}
//               className="cursor-pointer"
//             >
//               <CarCard car={car} />
//             </div>
//           ))}
//         </div>

//         {maintenanceSelectedCar && (
//           <CarMaintenanceChecklist
//             car={maintenanceSelectedCar}
//             onClose={handleCloseChecklist}
//           />
//         )}
//       </div>
//     </>
//   );
// };

// export default CarMaintenancePage;

import axios from "axios";
import React, { useEffect, useState } from "react";
import Toast from "../Toast";
import CarCard from "./carCard";
import CarMaintenanceChecklist from "./CarMaintenanceChecklist";
import ShowroomNavbar from "./showroomNavbar";

const Base_Url = import.meta.env.VITE_API_URL;

const CarMaintenancePage = () => {
  const [maintenanceSelectedCar, setMaintenanceSelectedCar] = useState(null);
  const [cars, setCars] = useState(null);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [selectedCarForConfirmation, setSelectedCarForConfirmation] = useState(null);

  const fetchVehicles = async () => {
    try {
      const response = await axios.get(
        `${Base_Url}/api/car/get-all-return-cars`,
        {
          withCredentials: true,
        }
      );
      setCars(response.data);
    } catch (err) {
      console.log(err);
      Toast(err.data || err.message || "Something went wrong", "error");
    }
  };

  useEffect(() => {
    try {
      fetchVehicles();
    } catch (error) {
      console.error("Error fetching vehicles:", error);
      Toast("Failed to fetch vehicles", "error");
    }
  }, []);

  const handleMaintenanceCarSelect = (car) => {
    setSelectedCarForConfirmation(car);
    setShowConfirmationDialog(true);
  };

  const handleConfirmCarReturn = () => {
    setMaintenanceSelectedCar(selectedCarForConfirmation);
    setShowConfirmationDialog(false);
    setSelectedCarForConfirmation(null);
  };

  const handleCancelConfirmation = () => {
    setShowConfirmationDialog(false);
    setSelectedCarForConfirmation(null);
  };

  const handleCloseChecklist = () => {
    setMaintenanceSelectedCar(null);
    fetchVehicles(); // Refresh the car list
  };

  return (
    <>
      <ShowroomNavbar />
      <div className="p-8 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 min-h-screen">
        <h2 className="text-3xl font-bold text-center mb-8 text-[#0B132A]">
          {cars?.length > 0 ? "Confirm car is in your Hand" : "No returned cars"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 p-3 justify-items-center">
          {cars?.map((car) => (
            <div
              key={car._id}
              onClick={() => handleMaintenanceCarSelect(car)}
              className="cursor-pointer"
            >
              <CarCard car={car} />
            </div>
          ))}
        </div>

        {/* Confirmation Dialog */}
        {showConfirmationDialog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 relative text-center space-y-6">
              <h3 className="text-2xl font-bold text-[#0B132A]">
                Confirm Car Return
              </h3>
              <p className="text-gray-700">
                Are you sure you want to start maintenance for{" "}
                <span className="font-semibold">
                  {selectedCarForConfirmation?.carBrand} {selectedCarForConfirmation?.carModel}
                </span>
                {" "}with plate number{" "}
                <span className="font-semibold">
                  {selectedCarForConfirmation?.plateNumber}
                </span>
                ?
              </p>

              <div className="flex justify-center gap-4 mt-6">
                <button
                  onClick={handleConfirmCarReturn}
                  className="py-2 px-6 bg-[#C17D3C] text-white rounded-lg hover:bg-[#B06D2C] transition-colors"
                >
                  Confirm
                </button>
                <button
                  onClick={handleCancelConfirmation}
                  className="py-2 px-6 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>

              <button
                onClick={handleCancelConfirmation}
                className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-xl font-bold"
              >
                &times;
              </button>
            </div>
          </div>
        )}

        {maintenanceSelectedCar && (
          <CarMaintenanceChecklist
            car={maintenanceSelectedCar}
            onClose={handleCloseChecklist}
          />
        )}
      </div>
    </>
  );
};

export default CarMaintenancePage;

