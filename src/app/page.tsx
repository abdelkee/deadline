"use client";
import Link from "next/link";
import ItemCard from "./itemCard";
import { CiCirclePlus } from "react-icons/ci";

const getData = () => {
  const items = localStorage.getItem("itemsData");
  if (!items) return [];
  return JSON.parse(items);
};
export default function Home() {
  const items = getData();
  const papers = items.filter((e: any) => e.type === "Paper").length;
  const fees = items.filter((e: any) => e.type === "Fee").length;
  const events = items.filter((e: any) => e.type === "Event").length;

  return (
    <main>
      <div className="flex justify-around mb-16">
        <p className="border-b-4 border-b-blue-400">Papers: {papers}</p>
        <p className="border-b-4 border-b-red-400">Fees: {fees}</p>
        <p className="border-b-4 border-b-green-400">Events: {events}</p>
      </div>
      <div className="grid grid-cols-1 gap-6">
        {items.length == 0 ? (
          <p>empty</p>
        ) : (
          items.map((e: any) => <ItemCard key={e.name} data={e} />)
        )}
      </div>

      <Link href={"/new"} className="fixed bottom-5 right-5">
        <CiCirclePlus size={32} className="text-orange-600" />
      </Link>
    </main>
  );
}
