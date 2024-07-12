"use client";
import { redirect } from "next/navigation";
import React from "react";

const cheeringPhrases = [
  "Great work!",
  "Fantastic effort!",
  "You're amazing!",
  "Keep it up!",
  "Awesome job!",
  "You did it!",
  "Nice going!",
  "Outstanding!",
  "Excellent!",
  "Way to go!",
  "Bravo!",
  "Impressive!",
  "You rock!",
  "Super job!",
  "You nailed it!",
  "That's the way!",
  "Well played!",
  "You're on fire!",
  "Keep shining!",
  "Hats off to you!",
];

const motivationalMessages = [
  "Every task you complete brings you closer to your goals!",
  "Finishing tasks boosts your productivity and confidence!",
  "Great job! Completing tasks is the key to success.",
  "Each completed task is a step towards your dreams!",
  "You're building momentum with every task you finish!",
  "Accomplishing tasks helps you stay organized and focused.",
  "You're proving to yourself that you can achieve anything!",
  "Completing tasks frees up time for what you love!",
  "Each finished task reduces stress and clears your mind.",
  "Great work! You're mastering the art of productivity.",
  "You're creating positive habits by finishing your tasks!",
  "Every completed task is a win to celebrate!",
  "You're turning plans into reality with every task done!",
  "Keep it up! You're making progress one task at a time.",
  "You're showing discipline and determination!",
  "Each task done is a step towards a more organized life.",
  "Well done! You're building a foundation for future success.",
  "You're achieving excellence by completing your tasks.",
  "You're making every day count by getting things done!",
  "Finishing tasks is a powerful way to reach your potential!",
];

const getRandomPhrase = (val: string[]) => {
  const randomIndex = Math.floor(Math.random() * val.length);
  return val[randomIndex];
};

const createItem = (formData: FormData) => {
  const items = localStorage.getItem("itemsData");
  const newItem = {
    name: formData.get("name"),
    type: formData.get("type"),
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate"),
    isDone: false,
    phrase: getRandomPhrase(cheeringPhrases),
    message: getRandomPhrase(motivationalMessages),
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
          <label htmlFor="name">
            Name <span className="text-sm text-red-400">*</span>
          </label>
          <input
            className="border rounded focus:border-orange-200 outline-none p-2"
            required
            id="name"
            name="name"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="type">
            Type <span className="text-sm text-red-400">*</span>
          </label>
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
            <option value="Medicine">Medicine</option>
            <option value="Appointment">Appointment</option>
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
          <label htmlFor="endDate">
            End Date <span className="text-sm text-red-400">*</span>
          </label>
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
