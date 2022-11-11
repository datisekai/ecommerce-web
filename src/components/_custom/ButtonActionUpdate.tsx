import React from "react";
import { GrUpdate } from "react-icons/gr";
type ButtonUpdateProps = {
  onClick: () => void;
};
const ButtonActionUpdate: React.FC<ButtonUpdateProps> = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="rounded-[4px] bg-green-500 py-2 px-4 hover:cursor-pointer hover:bg-green-400"
    >
      <GrUpdate className="text-white" />
    </div>
  );
};

export default ButtonActionUpdate;
