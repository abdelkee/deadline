"use client";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import { CiTrash } from "react-icons/ci";

export default function ItemCard({
  data,
  setChanged,
}: {
  data: any;
  setChanged: any;
}) {
  // ----------
  const removeItem = () => {
    if (confirm("Remove item?")) {
      const res = localStorage.getItem("itemsData");
      if (res !== null) {
        const items = JSON.parse(res);
        const remainItems = items.filter((e: any) => e.name !== data.name);
        localStorage.setItem("itemsData", JSON.stringify(remainItems));
        setChanged((prev: any) => !prev);
      }
    }
  };

  // ------------
  const letter = data.type === "Paper" ? "P" : data.type === "Fee" ? "F" : "E";
  const letterColor =
    data.type === "Paper"
      ? "border-blue-400"
      : data.type === "Fee"
      ? "border-red-400"
      : "border-green-400";

  const barColor =
    data.type === "Paper"
      ? "from-blue-300 to-blue-400"
      : data.type === "Fee"
      ? "from-red-300 to-red-400"
      : "from-green-300 to-green-400";

  const today = new Date() as any;
  today.setHours(0, 0, 0, 0); // Set current date to midnight

  const endDate = new Date(data.endDate) as any;
  endDate.setHours(0, 0, 0, 0); // Set end date to midnight

  // calculation of the difference between today and end date
  const differenceInTime = endDate - today;
  const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

  const percentage = 100 - differenceInDays / 3.65;

  return (
    <div
      className={`${
        percentage > 90 ? "border-red-600" : "border-gray-200"
      } flex flex-col space-y-3 border rounded p-4 shadow bg-white`}
    >
      {/* Name Section */}
      <div className="flex px-0.5 items-center justify-between">
        <div className="flex space-x-2 items-center">
          <div className="font-medium">{data.name}</div>
          <div
            className={`${letterColor} border-2 font-semibold rounded-full w-6 h-6 text-sm place-items-center grid `}
          >
            {letter}
          </div>
        </div>
        <button className="text-red-600 mr-2" onClick={removeItem}>
          <CiTrash size={20} />
        </button>
      </div>

      {/* Bar Section */}
      <div className="w-full border border-gray-200 rounded-sm h-2">
        <div
          className={`${barColor} h-full bg-gradient-to-tr`}
          style={{ width: `${percentage < 0 ? 0 : percentage}%` }}
        ></div>
      </div>

      {/* Dates Section */}
      <div className="flex justify-between text-xs text-gray-400 px-0.5">
        <div>{data.startDate}</div>
        <div
          className={`${
            percentage > 90 ? "scale-down-center text-red-500" : ""
          }`}
        >
          {data.endDate}
        </div>
      </div>
    </div>
  );
}
