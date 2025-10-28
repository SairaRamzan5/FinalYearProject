import axios from "axios";
import React, { useState, useEffect } from "react";
import Toast from "../Toast";
const Base_Url = import.meta.env.VITE_API_URL;

const CarMaintenanceChecklist = ({ car, onClose }) => {
  const [checkedParts, setCheckedParts] = useState({
    engine: false,
    tyres: false,
    brakes: false,
    oil: false,
    airFilter: false,
    coolant: false,
    lights: false,
    wipers: false,
  });

  const [repairDescriptions, setRepairDescriptions] = useState({});
  const [repairCosts, setRepairCosts] = useState({});
  const [checkAll, setCheckAll] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const descriptions = {
    engine: "Check engine oil level and condition.",
    tyres: "Inspect tyre pressure and tread depth.",
    brakes: "Check brake fluid level and brake pads.",
    oil: "Check engine oil level and condition.",
    airFilter: "Inspect and replace air filter if necessary.",
    coolant: "Check coolant level and condition.",
    lights: "Test all lights (headlights, brake lights, indicators).",
    wipers: "Check wiper blades for wear and replace if necessary.",
  };

  const handleCheckAllChange = (e) => {
    const checked = e.target.checked;
    setCheckAll(checked);
    const updatedParts = {};
    Object.keys(checkedParts).forEach((part) => {
      updatedParts[part] = checked;
    });
    setCheckedParts(updatedParts);
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setCheckedParts((prev) => ({ ...prev, [name]: checked }));
  };

  // ✅ Auto-complete maintenance after submitting checklist
  const completeMaintenance = async () => {
    try {
      console.log('🔄 Auto-completing maintenance for car:', car._id);
      await axios.post(
        `${Base_Url}/api/car/complete-maintenance/${car._id}`,
        {},
        { withCredentials: true }
      );
      console.log('✅ Maintenance auto-completed successfully');
    } catch (err) {
      console.error('❌ Error auto-completing maintenance:', err);
      // Don't show error toast here to avoid confusion
    }
  };

  const submitMaintenanceLog = async () => {
    try {
      setSubmitting(true);
      console.log('🔄 Submitting maintenance checklist...');
      
      const response = await axios.post(
        `${Base_Url}/api/car/start-maintenance`,
        {
          carId: car._id,
          maintenanceLog: checkedParts,
          maintenanceCost: repairCosts,
          repairDescriptions: repairDescriptions,
          showroomId: car.rentalInfo.showroomId,
          rentalStartDate: car.rentalInfo.rentalStartDate,
          rentalEndDate: car.rentalInfo.rentalEndDate,
          rentalStartTime: car.rentalInfo.rentalStartTime,
          rentalEndTime: car.rentalInfo.rentalEndTime,
        },
        {
          withCredentials: true,
        },
      );
      
      console.log('✅ Maintenance checklist submitted successfully');
      Toast("Maintenance checklist submitted successfully", "success");

      // ✅ Auto-complete maintenance after successful submission
      await completeMaintenance();

      const invoiceUrl = response.data.invoiceUrl;
      if (invoiceUrl) {
        Toast(
          <>
            Maintenance completed!{" "}
            <a
              href={invoiceUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "blue", textDecoration: "underline" }}
            >
              Click here to download the Invoice
            </a>
          </>,
          "success"
        );
      }

      // ✅ Close the modal after successful submission
      setTimeout(() => {
        onClose();
      }, 2000);
      
    } catch (err) {
      console.error('❌ Error submitting maintenance:', err);
      Toast(
        err?.response?.data?.message || err.message || "Something went wrong",
        "error",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitMaintenanceLog();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4">
      <div className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl p-6 relative scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        <h2 className="text-2xl font-bold mb-4 text-center text-[#0B132A]">
          Maintenance Checklist
        </h2>
        <p className="text-center text-sm mb-6 text-gray-600">
          Car: <strong>{car.carBrand + " " + car.carModel}</strong>
        </p>

        {/* ✅ Auto-complete notification */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-blue-700 text-sm">
              After submitting checklist, maintenance will be automatically marked as complete.
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between bg-gray-100 p-3 rounded-md mb-4">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="checkAll"
              checked={checkAll}
              onChange={handleCheckAllChange}
              className="w-4 h-4"
              disabled={submitting}
            />
            <label htmlFor="checkAll" className="font-medium text-sm">
              Check All
            </label>
          </div>
          <span className="text-sm text-gray-600">
            {Object.values(checkedParts).filter(Boolean).length} / {Object.keys(checkedParts).length} checked
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {Object.keys(checkedParts).map((part) => (
            <div
              key={part}
              className="flex flex-col gap-2 bg-gray-50 border border-gray-200 p-4 rounded-lg"
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name={part}
                  checked={checkedParts[part]}
                  onChange={handleCheckboxChange}
                  className="w-4 h-4"
                  disabled={submitting}
                />
                <label
                  htmlFor={part}
                  className="capitalize font-medium text-sm"
                >
                  {part}
                </label>
                <label className="capitalize font-small text-sm text-gray-500">
                  ({descriptions[part]})
                </label>
              </div>

              {!checkedParts[part] && (
                <div className="flex flex-col gap-2">
                  {/* Repair cost */}
                  <div className="w-1/2">
                    <input
                      type="number"
                      placeholder="Repair cost"
                      min="0"
                      value={repairCosts[part] || ""}
                      onChange={(e) =>
                        setRepairCosts((prev) => ({
                          ...prev,
                          [part]: e.target.value,
                        }))
                      }
                      className="border border-gray-300 rounded px-3 py-2 w-full text-sm"
                      disabled={submitting}
                    />
                  </div>

                  {/* Repair description */}
                  <div className="w-full flex flex-col gap-1">
                    <textarea
                      placeholder="Repair description"
                      value={repairDescriptions[part] || ""}
                      onChange={(e) => {
                        e.target.style.height = "auto";
                        e.target.style.height = e.target.scrollHeight + "px";
                        setRepairDescriptions((prev) => ({
                          ...prev,
                          [part]: e.target.value,
                        }));
                      }}
                      className={`border ${
                        !checkedParts[part] && !repairDescriptions[part]?.trim()
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded px-3 py-2 w-full text-sm resize-none overflow-hidden min-h-[40px]`}
                      rows={1}
                      disabled={submitting}
                    />
                    {!checkedParts[part] && !repairDescriptions[part]?.trim() && (
                      <span className="text-red-500 text-xs">
                        Description is required
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="bg-[#C17D3C] text-white px-4 py-2 rounded hover:bg-[#a96a33] transition disabled:opacity-50 flex items-center gap-2"
            >
              {submitting ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                  Submitting...
                </>
              ) : (
                "Submit & Complete Maintenance"
              )}
            </button>
          </div>
        </form>

        {/* Close (X) button */}
        <button
          onClick={onClose}
          disabled={submitting}
          className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-xl disabled:opacity-50"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default CarMaintenanceChecklist;