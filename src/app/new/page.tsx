"use client";
import { redirect } from "next/navigation";
import React from "react";

const createItem = (formData: FormData) => {
  const items = localStorage.getItem("itemsData");
  const newItem = {
    name: formData.get("name"),
    type: formData.get("type"),
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate"),
  };

  localStorage.setItem(
    "itemsData",
    items === null
      ? JSON.stringify(Array(newItem))
      : JSON.stringify([...JSON.parse(items), newItem])
  );

  redirect("/");
};

// -----------
function NewItem() {
  return (
    <form action={createItem} className="mt-16 p-4">
      <div className="flex flex-col space-y-5">
        <div className="flex flex-col">
          <label htmlFor="name">Name</label>
          <input
            className="border rounded focus:border-orange-200 outline-none p-2"
            required
            id="name"
            name="name"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="type">Type</label>
          <select
            required
            id="type"
            name="type"
            className="border rounded focus:border-orange-200 outline-none p-2"
          >
            <option value=""></option>
            <option value="Paper">Paper</option>
            <option value="Fee">Fee</option>
            <option value="Event">Event</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="startDate">Start Date</label>
          <input
            className="border rounded focus:border-orange-200 outline-none p-2"
            type="date"
            id="startDate"
            name="startDate"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="endDate">End Date</label>
          <input
            className="border rounded focus:border-orange-200 outline-none p-2"
            required
            type="date"
            id="endDate"
            name="endDate"
          />
        </div>
      </div>

      <button
        className="w-full p-4 rounded font-medium bg-orange-400 mt-12"
        type="submit"
      >
        Create
      </button>
    </form>
  );
}

export default NewItem;
