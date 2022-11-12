import React, { useState,useEffect, useMemo } from "react";
import Button from "../Button";
import FilterCategoryItem from "./FilterCategoryItem";
import { AiOutlineDown } from "react-icons/ai";
import Divider from "../Divider";
import { CategoryModel } from "../../models/category.model";
import { useRouter } from "next/router";



type FilterCategoryProps = {
  data: CategoryModel[];
};

const FilterCategory: React.FC<FilterCategoryProps> = ({ data }) => {
  const router = useRouter();
  const [isFull, setIsFull] = useState(false);
  const [category, setCategory] = useState<string[]>(router.query.categoryId ? (router.query.categoryId as string).split(',') : [])


  const handleCheckBox = (categoryId:string) => {
    const isExist = category.some((item:string) => item === categoryId);
    if(isExist){
      setCategory(category.filter((item:string) => item !== categoryId));
    }else{
      setCategory([...category, categoryId]);
    }
  }

  useEffect(() => {

  if (category && category.length > 0) {
    router.push({
      query: {
        ...router.query,
        categoryId: category.join(","),
      },
    });
  } else {
    if (category.length === 0) {
      delete router.query["categoryId"];
      router.push({
        query: {
          ...router.query,
        },
      });
    }
  }

  },[category])

  return (
    <div className="mt-4 text-[16px] capitalize">
      <h2 className="mt-2">Theo danh mục</h2>
      <div className="mt-2">
        {data.map((item: CategoryModel, index: number) => {
            if (!isFull) {
              return index < 4 && <FilterCategoryItem checked={category.some((element:string) => element === item.id.toString())} onChange={handleCheckBox} key={index} {...item} />;
            } else {
              return <FilterCategoryItem checked={category.some((element:string) => element === item.id.toString())} onChange={handleCheckBox} key={index} {...item} />;
            }
        })}
        {data.length > 4 && !isFull && (
          <Button
            text="Thêm"
            className="mt-2 ml-6"
            onClick={() => setIsFull(true)}
            icon={AiOutlineDown}
            classNameIcon={"ml-2 text-[14px]"}
          />
        )}
      </div>
      <Divider />
    </div>
  );
};

export default FilterCategory;
