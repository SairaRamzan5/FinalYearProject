import React from "react";

function Testominial({ name, city, desc }) {
  return (
    <div className="bg-[#C17D3C] w-full px-3 py-7 min-h-[200px] rounded-lg flex flex-col gap-3">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row justify-start gap-5">
          <img
            src="/src/assets/user.png"
            className="h-12 rounded-full border-2"
            alt=""
          />
          <div className="flex flex-col">
            <span className="font-bold">{name}</span>
            <span className="text-[#2C2C2C]">{city}</span>
          </div>
        </div>
        <p>4.5</p>
      </div>
      <p>{desc}</p>
    </div>
  );
}

export default Testominial;
