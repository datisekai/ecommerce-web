import React from "react";
import { AiFillDelete } from "react-icons/ai";

type ButtonDeleteProps = {
  onClick: () => void;
};

const ButtonActionDelete: React.FC<ButtonDeleteProps> = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="ml-2 rounded-[4px] bg-red-500 py-2 px-4 hover:cursor-pointer hover:bg-red-400"
    >
      <AiFillDelete className="text-white" />
    </div>
  );
};

export default ButtonActionDelete;
