"use client";
import React from "react";
import ItemCard from "./itemCard";

function ItemList({ items, setChanged }: { items: any; setChanged: any }) {
  return (
    <div className="md:max-w-md grid grid-cols-1 place-self-center gap-8">
      {items.length == 0 ? (
        <p>empty</p>
      ) : (
        items.map((e: any) => (
          <ItemCard key={e.name} data={e} setChanged={setChanged} />
        ))
      )}
    </div>
  );
}

export default ItemList;
