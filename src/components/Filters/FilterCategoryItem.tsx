import { FC } from "react";
import { CategoryModel } from "../../models/category.model";

interface FilterItemProps extends CategoryModel {
  onChange:(categoryId:string) => void,
  checked:boolean
}


const FilterCategoryItem: FC<FilterItemProps> = ({
 count,id,image,name, onChange, checked = false

}) => {
  return (
    <div className=" flex items-center py-2">
      <input type="checkbox" checked={checked} onChange={() => onChange(id.toString())}  id={`cbCategory-${id}`} className="h-4 w-4" />
      <label
        className="ml-3 cursor-pointer select-none"
        htmlFor={`cbCategory-${id}`}
      >
        {name} <span>{`(${count})`}</span>
      </label>
    </div>
  );
};

export default FilterCategoryItem;
