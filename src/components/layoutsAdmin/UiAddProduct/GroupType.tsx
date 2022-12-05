import React, { useState } from "react";
import { GrClose } from "react-icons/gr";

const GroupType = () => {
  const [isFull, setIsFull] = useState(false);
  return (
    <div className="rounded-sm bg-[#F6F6F6] p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span>Nhóm phân loại 1</span>
          <input
            type="text"
            className="ml-4 w-[200px] rounded-md border px-4 py-2 outline-none"
            placeholder="Ví dụ: Màu sắc"
          />
        </div>
        <GrClose
          className="text-lg hover:cursor-pointer"
          onClick={() => setIsFull(false)}
        />
      </div>
    </div>
  );
};

export default GroupType;
