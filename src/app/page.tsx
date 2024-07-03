"use client";

import Link from "next/link";
import { CiCirclePlus } from "react-icons/ci";
import ItemList from "./itemList";
import { useEffect, useState } from "react";
import { ItemType } from "../../types.t";

export default function Home() {
  const [items, setItems] = useState<ItemType[]>([]);
  const [selectedType, setSelectedType] = useState("");
  const [changed, setChanged] = useState(false);

  useEffect(() => {
    // Fetch itemsData from localStorage
    const res = localStorage.getItem("itemsData");
    const today = new Date() as any;
    // Parse JSON if res is not null or undefined
    function getDaysUntilEndDate(endDate: any) {
      const end = new Date(endDate) as any;
      const diffTime = end - today;
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
    if (res) {
      try {
        const parsedItems = JSON.parse(res) as ItemType[];
        parsedItems.sort(
          (a: any, b: any) =>
            getDaysUntilEndDate(a.endDate) - getDaysUntilEndDate(b.endDate)
        );
        const filteredItems = parsedItems.filter((i: ItemType) => {
          if (!selectedType) return parsedItems;
          return i.type === selectedType;
        });
        setItems(filteredItems); // Update state with parsed data
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

  const filterByType = (type: string) => {
    if (type === selectedType) {
      setSelectedType("");
      setChanged((prev) => !prev);
    } else {
      setSelectedType(type);
      setChanged((prev) => !prev);
    }
  };

  return (
    <main>
      <div className="flex justify-around mb-16">
        {types.map((e, i) => (
          <button
            className={`${
              selectedType === e
                ? "bg-orange-300 shadow-none"
                : "bg-white shadow"
            } border border-gray-100 p-2 rounded`}
            key={e}
            onClick={() => filterByType(e)}
          >
            {e.charAt(0)}: {typeLength[i]}
          </button>
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
