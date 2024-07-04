"use client";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import { CiTrash } from "react-icons/ci";
import { ItemType } from "../../types.t";
import { cardColor } from "./utils";

export default function ItemCard({
  data,
  setChanged,
}: {
  data: ItemType;
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

  const today = new Date() as any;
  today.setHours(0, 0, 0, 0); // Set current date to midnight

  const endDate = new Date(data.endDate) as any;
  endDate.setHours(0, 0, 0, 0); // Set end date to midnight

  // calculation of the difference between today and end date
  const differenceInTime = endDate - today;
  const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

  const percentage = 100 - differenceInDays / 3.65;

  const barColor =
    differenceInDays < 30
      ? "from-red-300 to-red-400"
      : differenceInDays < 90
      ? "from-orange-300 to-orange-400"
      : differenceInDays < 180
      ? "from-yellow-300 to-yellow-400"
      : "from-green-300 to-green-400";

  // --------------------
  return (
    <div
      className={`${
        differenceInDays < 30 ? "border-l-red-600 border-l-4" : "border-l-2"
      } flex flex-col space-y-3  rounded p-4 shadow bg-white ${
        cardColor[data.type]
      } `}
    >
      {/* Name Section */}
      <div className="flex px-0.5 items-center justify-between">
        <div className="flex space-x-2 items-center">
          <div className="font-medium">{data.name}</div>
          <div
            className={`text-xs text-gray-500 border px-2 ${
              cardColor[data.type]
            }`}
          >
            {data.type}
          </div>
        </div>
        <button className="text-red-600 mr-2" onClick={removeItem}>
          <CiTrash size={20} />
        </button>
      </div>

      {/* Bar Section */}
      <div className="w-full border border-gray-200 rounded-sm h-1">
        <div
          className={`${barColor} h-full bg-gradient-to-tr ${
            percentage > 100 ? "scale-down-center " : ""
          }`}
          style={{
            width: `${
              percentage < 0 ? 0 : percentage > 100 ? "100%" : percentage
            }%`,
          }}
        ></div>
      </div>

      {/* Dates Section */}
      <div className="flex justify-between text-xs text-gray-400 px-0.5">
        <div>{data.startDate}</div>
        <div
          className={`${differenceInDays < 0 ? "text-red-500 text-base" : ""}`}
        >
          {differenceInDays < 0 ? "Expired" : differenceInDays}
        </div>
        <div
          className={`${
            differenceInDays < 30 ? "scale-down-center text-red-500" : ""
          }`}
        >
          {data.endDate}
        </div>
      </div>
    </div>
  );
}
