import React from "react";
import { ISidebarData } from "../data/sidebar";

const ItemMenuLeft = ({ id, name }: ISidebarData) => {
  return <div className="mt-3 py-4 px-8">{name}</div>;
};

export default ItemMenuLeft;
