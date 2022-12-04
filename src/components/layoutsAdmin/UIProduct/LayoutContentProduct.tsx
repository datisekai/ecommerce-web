import React, { useState, useMemo } from "react";
import TableLayout from "../../_custom/TableLayout";
import columnTable, { IDataColumnTable } from "../../data/columnTable";
import rowTables from "../../data/rowTable";
import { Sku } from "../../../models/SkuSeller.model";
import { formatPrices } from "../../../utils";

interface LayoutContentProductProps {
  data: Sku[];
  handleChange: (type: string) => void;
}

const LayoutContentProduct: React.FC<LayoutContentProductProps> = ({
  data,
  handleChange,
}) => {
  const [changebottom, setChangeBottom] = useState({
    width: 71,
    transform: "0px",
  });
  const handlechange = (width: number, transform: string) => {
    setChangeBottom({
      width: width,
      transform: transform,
    });
  };

  const dataTable = useMemo(() => {
    return (
      data?.map((item) => {
        const type = item.skuValues.map(
          (element) => `${element.variant.name}: ${element.variantOption.name}`
        );

        return {
          id: item.id,
          name: item.product.name,
          price: formatPrices(item.price),
          qty: item.qty,
          discount: `${item.discount}%`,
          type: type.join(", "),
          Action: {
            handleUpdate: () => {
              console.log("datisekai");
            },
            handleDelete: () => {
              console.log("ac");
            },
          },
        };
      }) || []
    );
  }, [data]);

  const col: IDataColumnTable[] = [
    {
      id: "id",
      name: "ID",
      width: "75px",
    },
    {
      id: "name",
      name: "Tên sản phẩm",
      width: "200px",
    },
    {
      id: "type",
      name: "Phân loại",
      width: "200px",
    },
    {
      id: "price",
      name: "Giá biến thể",
      width: "150px",
    },
    {
      id: "qty",
      name: "Số lượng",
      width: "75px",
    },
    {
      id: "discount",
      name: "% Giảm",
      width: "75px",
    },
    {
      id: "Action",
      name: "Thao tác",
      width: "200px",
    },
  ];

  console.log(data);

  return (
    <>
      <div className="flex border-b border-[#E5E5E5] ">
        <div
          onClick={() => {
            handlechange(71, "0px");
            handleChange("1");
          }}
          className=" py-5 px-4 hover:cursor-pointer hover:text-red-500"
        >
          Tất cả
        </div>
        <div
          onClick={() => {
            handlechange(130, "71px");
            handleChange("2");
          }}
          className=" py-5 px-4 hover:cursor-pointer hover:text-red-500"
        >
          Đang hoạt động
        </div>
        <div
          onClick={() => {
            handlechange(88, "203px");
            handleChange("3");
          }}
          className=" py-5 px-4 hover:cursor-pointer hover:text-red-500"
        >
          Hết hàng
        </div>
        {/* <div
          onClick={() => handlechange(85, "291px")}
          className=" py-5 px-4 hover:cursor-pointer hover:text-red-500"
        >
          Vi Phạm
        </div>
        <div
          onClick={() => handlechange(69, "376px")}
          className=" py-5 px-4 hover:cursor-pointer hover:text-red-500"
        >
          Đã ẩn
        </div> */}
      </div>
      <div
        className="shopee-tabs__ink-bar h-1  bg-red-500"
        style={{
          width: changebottom.width,
          transform: `translateX(${changebottom.transform})`,
        }}
      ></div>
      {/* ************************************** */}
      <div className="flex items-center justify-between p-4">
        <div>
          <strong className="text-[18px]">{data?.length} Sản phẩm</strong>
        </div>
        <div className="rounded-[4px] bg-red-500 py-3 px-6 text-[#ffffff] hover:cursor-pointer hover:bg-[rgba(120,21,21,0.66)]">
          Thêm 1 sản phẩm
        </div>
      </div>
      {/* ************************************** */}
      <div className="p-4">
        <TableLayout
          columnTable={col}
          rowTables={dataTable}
          isAction={true}
          isDelete={true}
          isUpdate={true}
        />
      </div>
    </>
  );
};

export default LayoutContentProduct;
