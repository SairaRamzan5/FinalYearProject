import React, { useState } from "react";
import { Tooltip } from "@mui/material";

function DetailCard({ img, title, requirement, tip }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div 
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="p-6 flex items-start">
        <div className={`flex-shrink-0 flex items-center justify-center h-50 w-50 rounded-lg ${hovered ? 'bg-[#A56A33]' : 'bg-[#C17D3C]'} transition-colors`}>
          <img
            src={`/src/assets/requirements/${img}.png`}
            className="h-30 w-30"
            alt={title}
          />
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-bold text-gray-900">{title}</h3>
          <p className="text-gray-600">{requirement}</p>
          {tip && (
            <Tooltip title={tip} arrow>
              <span className="inline-flex items-center mt-2 text-sm text-[#C17D3C] cursor-help">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                </svg>
                Why is this needed?
              </span>
            </Tooltip>
          )}
        </div>
      </div>
    </div>
  );
}

export default DetailCard;
