import React from "react";

export default function ItemCard({ data }: { data: any }) {
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

  // calculation of the difference between today and end
  const differenceInTime = endDate - today;
  const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

  const percentage = 100 - differenceInDays / 3.65;

  console.log(percentage);

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex space-x-2 px-0.5 items-center">
        <div className="font-medium">{data.name}</div>
        <div
          className={`${letterColor} border rounded-full w-5 h-5 text-xs place-items-center grid ${
            percentage > 90 ? "animate-ping" : ""
          }`}
        >
          {letter}
        </div>
      </div>
      <div className="w-full border border-gray-200 rounded-sm h-3">
        <div
          className={`${barColor} h-full bg-gradient-to-tr`}
          style={{ width: `${percentage < 0 ? 0 : percentage}%` }}
        ></div>
      </div>
      <div className="flex justify-between text-xs text-gray-400 px-0.5">
        <div>{data.startDate}</div>
        <div>{data.endDate}</div>
      </div>
    </div>
  );
}
