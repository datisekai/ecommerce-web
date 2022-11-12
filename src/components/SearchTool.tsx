import { useRouter } from 'next/router'
import React, { FC } from 'react'
import { CiFilter } from 'react-icons/ci'
import { CategoryModel } from '../models/category.model'
import Button from './Button'
import FilterCategory from './Filters/FilterCategory'
import FilterPrice from './Filters/FilterPrice'
import FilterStar from './Filters/FilterStar'

type SearchToolProps = {
  categories:CategoryModel[]
}

const SearchTool:FC<SearchToolProps> = ({categories}) => {
  const router = useRouter();
  return (
    <div className="hidden w-[205px] lg:block">
    <div className="flex items-center">
      <CiFilter className="text-[19px]" />
      <h1 className="ml-1 text-[17px] font-semibold uppercase">
        Bộ lọc tìm kiếm
      </h1>
    </div>
    <FilterCategory data={categories}/>
    <FilterPrice />
    <FilterStar />
    <Button
    onClick={() => router.push({query:{ }})}
      text="Xóa tất cả"
      className="mt-4 justify-center bg-primary py-2 text-center uppercase text-white"
    />
  </div>
  )
}

export default SearchTool