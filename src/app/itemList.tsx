"use client";
import React from "react";
import ItemCard from "./itemCard";

function ItemList({ items, setChanged }: { items: any; setChanged: any }) {
  return (
    <div className="md:max-w-md grid grid-cols-1 place-self-center gap-8 mb-24">
      {items.length == 0 ? (
        <p className="text-center text-orange-600 tracking-widest">
          Loading...
        </p>
      ) : (
        items.map((e: any) => (
          <ItemCard key={e.name} data={e} setChanged={setChanged} />
        ))
      )}
    </div>
  );
}

export default ItemList;
