import React from "react";
import { BsImages } from "react-icons/bs";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Sku } from "../../../pages/seller/product/new";

type variantOption = {
  name: string;
  variantId: string;
};

type variant = {
  name: string;
  id: string;
};

interface TableInfoProps {
  colName1: variant;
  colName2: variant;
  isColName2: boolean;
  dataTables: any[];
  handleChangeSku: (data: Sku[]) => void;
  skus: Sku[];
}

const TableInfo: React.FC<TableInfoProps> = ({
  colName1,
  colName2,
  isColName2,
  dataTables,
  handleChangeSku,
  skus,
}) => {
  const col = [
    {
      name: colName1.name != "" ? colName1.name : "Nhóm phân loại 1",
      width: "75px",
      display: true,
    },
    {
      name: colName2.name != "" ? colName2.name : "Nhóm phân loại 2",
      width: "75px",
      display: isColName2 ? true : false,
    },
    {
      name: "Giá",
      width: "75px",
      display: true,
    },
    {
      name: "Số lượng",
      width: "75px",
      display: true,
    },
    {
      name: "% giảm",
      width: "75px",
      display: true,
    },
  ];

  const handleChange = (position, key, value) => {
    const data = skus.map((item, index) => {
      if (index === position) {
        if (key === "file") {
          return {
            ...item,
            [key]: value,
            preview: URL.createObjectURL(value),
          };
        } else {
          return {
            ...item,
            [key]: value,
          };
        }
      }
      return item;
    });

    handleChangeSku(data);
  };

  return (
    <div>
      <div className="m-4 h-[360px] overflow-x-auto overflow-y-auto rounded-[4px] border-[1px] border-solid border-[#E5E5E5]">
        <div className="table w-full">
          <div className="table-header-group">
            <div className="sticky top-0 table-row bg-[#F6F6F6] text-[#999999]">
              {col.map((item, index) => {
                if (item.display) {
                  return (
                    <div
                      key={index}
                      className={`table-cell border-r py-4 text-center`}
                      style={{ width: `${item.width}` }}
                    >
                      {item.name}
                    </div>
                  );
                }
              })}
            </div>
          </div>
          {dataTables?.map((item, index) => (
            <div className="table-row-group" key={index}>
              <div className=" table-cell h-16 border-y border-r p-3 text-center">
                <div className="mb-4"> {item[0].name}</div>
                <label
                  htmlFor={`fileImage-${index}`}
                  className=" hover:cursor-pointer"
                >
                  <div
                    className={`flex items-center justify-center rounded-[4px]  border-[#B7B7B7] ${
                      !skus[index]?.preview &&
                      "border border-dashed py-4 px-2 hover:cursor-pointer hover:bg-[rgba(255,112,112,0.58)]"
                    } text-primary  `}
                  >
                    {skus[index]?.preview ? (
                      <LazyLoadImage
                        src={skus[index]?.preview}
                        className="aspect-[1/1] w-[124px] rounded-md"
                      />
                    ) : (
                      <BsImages className=" text-[24px]" />
                    )}
                    <input
                      type="file"
                      name=""
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        handleChange(index, "file", file);
                      }}
                      id={`fileImage-${index}`}
                      className="hidden"
                    />
                  </div>
                </label>
              </div>
              {isColName2 && (
                <div
                  className="table-cell h-16 items-center border-y border-r p-3 text-center"
                  style={{
                    verticalAlign: "middle",
                  }}
                >
                  {item.length === 2 && item[1].name}
                </div>
              )}
              <div
                className="table-cell h-16 items-center border-y border-r p-3 text-center"
                style={{
                  verticalAlign: "middle",
                }}
              >
                <input
                  placeholder="Nhập vào"
                  value={skus[index]?.price || ""}
                  onChange={(e) => handleChange(index, "price", e.target.value)}
                  className="w-[100%] rounded-md border px-4 py-2 outline-none"
                />
              </div>
              <div
                className="table-cell h-16 items-center border-y border-r p-3 text-center"
                style={{
                  verticalAlign: "middle",
                }}
              >
                <input
                  placeholder="Nhập vào"
                  value={skus[index]?.quantity || ""}
                  onChange={(e) =>
                    handleChange(index, "quantity", e.target.value)
                  }
                  className="w-[100%] rounded-md border px-4 py-2 outline-none"
                />
              </div>
              <div
                className="table-cell h-16 items-center border-y border-r p-3 text-center"
                style={{
                  verticalAlign: "middle",
                }}
              >
                <input
                  placeholder="Nhập vào"
                  value={skus[index]?.discount || ""}
                  onChange={(e) =>
                    handleChange(index, "discount", e.target.value)
                  }
                  className="w-[100%] rounded-md border px-4 py-2 outline-none"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TableInfo;
