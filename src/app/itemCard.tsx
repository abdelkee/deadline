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
      ? "from-red-300 to-red-500"
      : differenceInDays < 90
      ? "from-orange-300 to-orange-500"
      : differenceInDays < 180
      ? "from-yellow-300 to-yellow-500"
      : "from-green-300 to-green-500";

  const borderColor =
    differenceInDays < 30
      ? "border-l-red-300"
      : differenceInDays < 90
      ? "border-l-orange-300"
      : differenceInDays < 180
      ? "border-l-yellow-300"
      : "border-l-green-300";

  // --------------------
  return (
    <div
      className={`${
        differenceInDays < 30 ? "border-l-red-600 border-l-4" : "border-l-2"
      } relative flex flex-col space-y-3 rounded p-4 shadow border bg-white ${borderColor} `}
    >
      {/* Name Section */}
      <div className="flex px-0.5 items-center justify-between">
        <div className="flex space-x-2 items-center">
          <div className="font-medium">{data.name}</div>
          <div
            className={`text-xs text-gray-500 border border-b-0 px-2 absolute -top-3 left-2 bg-white`}
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
