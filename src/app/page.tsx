"use client";

import Link from "next/link";
import { CiCirclePlus } from "react-icons/ci";
import ItemList from "./itemList";
import { useEffect, useState } from "react";

export default function Home() {
  const [items, setItems] = useState([]);
  const [changed, setChanged] = useState(false);

  const today = new Date() as any;

  useEffect(() => {
    // Fetch itemsData from localStorage
    const res = localStorage.getItem("itemsData");

    // Parse JSON if res is not null or undefined
    function getDaysUntilEndDate(endDate: any) {
      const end = new Date(endDate) as any;
      const diffTime = end - today;
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
    if (res) {
      try {
        const parsedItems = JSON.parse(res);

        parsedItems.sort(
          (a: any, b: any) =>
            getDaysUntilEndDate(a.endDate) - getDaysUntilEndDate(b.endDate)
        );
        setItems(parsedItems); // Update state with parsed data
      } catch (error) {
        console.error("Error parsing JSON from localStorage:", error);
      }
    }
  }, [changed]);

  const types = ["Paper", "Fee", "Event", "Medicine", "Appointment"];
  const typeLength: any = [];
  types.forEach((type) => {
    typeLength.push(items.filter((e: any) => e.type === type).length);
  });

  return (
    <main>
      <div className="flex justify-around mb-16">
        {types.map((e, i) => (
          <p className="bg-white border border-gray-100 shadow p-2 rounded">
            {e.charAt(0)}: {typeLength[i]}
          </p>
        ))}
      </div>
      <ItemList items={items} setChanged={setChanged} />
      <Link
        href={"/new"}
        className="fixed bottom-10 right-10 rounded-full bg-white shadow-md"
      >
        <CiCirclePlus size={60} className="text-orange-600" />
      </Link>
    </main>
  );
}
