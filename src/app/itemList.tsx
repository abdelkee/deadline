"use client";
import React from "react";
import ItemCard from "./itemCard";
import { ItemType } from "../../types.t";

function ItemList({
  items,
  setChanged,
  loading,
}: {
  items: ItemType[];
  setChanged: any;
  loading: boolean;
}) {
  return (
    <div className="md:max-w-md grid grid-cols-1 place-self-center gap-8 mb-24">
      {items.length == 0 && loading ? (
        <p className="text-center text-orange-600 tracking-widest">
          Loading...
        </p>
      ) : items.length == 0 && !loading ? (
        <p className="text-center text-orange-600 tracking-widest">
          Add new task!
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
