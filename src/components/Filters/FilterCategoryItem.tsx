import React, { FC } from "react";
import CheckBox from "../CheckBox";

type FilterCategoryItemProps = {
  label: string;
  count: number;
  id: number;
};

const FilterCategoryItem: FC<FilterCategoryItemProps> = ({
  count,
  label,
  id,
}) => {
  return (
    <div className=" flex items-center py-2">
      <input type="checkbox" id={`cbCategory-${id}`} className="h-4 w-4" />
      <label
        className="ml-3 cursor-pointer select-none"
        htmlFor={`cbCategory-${id}`}
      >
        {label} <span>{`(${count})`}</span>
      </label>
    </div>
  );
};

export default FilterCategoryItem;
