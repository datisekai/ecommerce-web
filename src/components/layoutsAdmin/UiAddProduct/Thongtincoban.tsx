import React from "react";
import { BsImages, BsPencil } from "react-icons/bs";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { CategoryModel } from "../../../models/category.model";
import { InfoBasic } from "../../../pages/seller/product/new";

interface ThongTinCoBanProps {
  categories: CategoryModel[];
  info: InfoBasic;
  handleChange: (name: string, value: any) => void;
}

const ThongTinCoBan: React.FC<ThongTinCoBanProps> = ({
  categories,
  handleChange,
  info,
}) => {
  return (
    <div className="p-4">
      <div className="mb-6 text-xl">
        <strong>Thông tin cơ bản</strong>
      </div>
      <div className="ml-6">
        <div className=" mb-6 flex ">
          <div className="w-[160px]">Hình ảnh sản phẩm</div>
          <label htmlFor="basicFile" className=" hover:cursor-pointer">
            <div className="flex items-center justify-center rounded-[4px] border border-dashed border-[#B7B7B7] py-4 px-4 text-primary  hover:cursor-pointer hover:bg-[rgba(255,112,112,0.58)]">
              {!info?.preview && <BsImages className=" text-[24px]" />}
              {info?.preview && (
                <LazyLoadImage src={info.preview} className="w-[124px]" />
              )}
              <input
                type="file"
                onChange={(e) => {
                  const file = e.target.files[0];
                  handleChange("file", file);
                  // handleChange("preview", URL.createObjectURL(file));
                }}
                accept="image/*"
                name=""
                id="basicFile"
                className="hidden"
              />
            </div>
          </label>
        </div>
        <div className="mb-6 flex items-center">
          <div className="w-[160px]">Tên sản phẩm</div>
          <div className="flex h-[40px] w-[800px] items-center  rounded-[4px] border  border-solid border-[#E5E5E5] py-2 px-2 outline-none transition-all hover:border-l hover:border-[#666]">
            <input
              type="text"
              value={info.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Nhập vào"
              className=" w-[600px] border-none outline-none"
            />
          </div>
        </div>
        <div className="mb-6 flex items-center">
          <div className="w-[160px]">Ngành hàng</div>
          {/* <div className="flex h-[40px] w-[800px] items-center  rounded-[4px] border  border-solid border-[#E5E5E5] py-2 px-2 outline-none transition-all hover:border-l hover:border-[#666]"> */}
          <select
            placeholder="Chọn tên ngành hàng"
            className="h-[40px] w-[800px] rounded-[4px] border px-2 outline-none"
            value={info.categoryId}
            onChange={(e) => handleChange("categoryId", e.target.value)}
          >
            <option value="">Chọn ngành hàng</option>
            {categories.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          {/* <BsPencil className=" text-[16px]" /> */}
          {/* </div> */}
        </div>
        <div className="mb-6 flex ">
          <div className="w-[160px]">Mô tả sản phẩm</div>
          <textarea
            value={info.description}
            onChange={(e) => handleChange("description", e.target.value)}
            className="h-[200px] w-[800px] resize-none rounded-[4px] border p-2"
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default ThongTinCoBan;
