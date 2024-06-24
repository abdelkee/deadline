"use client";

import Link from "next/link";
import { CiCirclePlus } from "react-icons/ci";
import ItemList from "./itemList";
import { useEffect, useState } from "react";

export default function Home() {
  const [items, setItems] = useState([]);
  const [changed, setChanged] = useState(false);

  useEffect(() => {
    // Fetch itemsData from localStorage
    const res = localStorage.getItem("itemsData");

    // Parse JSON if res is not null or undefined
    if (res) {
      try {
        const parsedItems = JSON.parse(res);
        setItems(parsedItems); // Update state with parsed data
      } catch (error) {
        console.error("Error parsing JSON from localStorage:", error);
      }
    }
  }, [changed]);

  const papers = items.filter((e: any) => e.type === "Paper").length;
  const fees = items.filter((e: any) => e.type === "Fee").length;
  const events = items.filter((e: any) => e.type === "Event").length;

  return (
    <main>
      <div className="flex justify-around mb-16">
        <p className="border-b-2 border-b-blue-400">Papers: {papers}</p>
        <p className="border-b-2 border-b-red-400">Fees: {fees}</p>
        <p className="border-b-2 border-b-green-400">Events: {events}</p>
      </div>
      <ItemList items={items} setChanged={setChanged} />
      <Link href={"/new"} className="fixed bottom-10 right-10">
        <CiCirclePlus size={60} className="text-orange-600" />
      </Link>
    </main>
  );
}
