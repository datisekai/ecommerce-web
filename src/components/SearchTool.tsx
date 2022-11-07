import React from 'react'
import { CiFilter } from 'react-icons/ci'
import Button from './Button'
import FilterCategory from './Filters/FilterCategory'
import FilterPrice from './Filters/FilterPrice'
import FilterStar from './Filters/FilterStar'

const SearchTool = () => {
  return (
    <div className="hidden w-[205px] lg:block">
    <div className="flex items-center">
      <CiFilter className="text-[19px]" />
      <h1 className="ml-1 text-[17px] font-semibold uppercase">
        Bộ lọc tìm kiếm
      </h1>
    </div>
    <FilterCategory />
    <FilterPrice />
    <FilterStar />
    <Button
      text="Xóa tất cả"
      className="mt-4 justify-center bg-primary py-2 text-center uppercase text-white"
    />
  </div>
  )
}

export default SearchTool