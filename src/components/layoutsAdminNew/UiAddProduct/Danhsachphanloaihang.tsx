import React, { useState } from "react";
import { BsImages } from "react-icons/bs";
type DanhSachProps = {
  rowNPL1: string[];
  rowNPL2: string[];
  NameNPL1: string;
  NameNPL2: string;
  isADDNPL2: true | false;
  textAllPrices: string;
  textAllQuantity: string;
  textAllSku: string;
};
export const Danhsachphanloaihang: React.FC<DanhSachProps> = ({
  rowNPL1,
  rowNPL2,
  NameNPL1,
  NameNPL2,
  isADDNPL2,
  textAllPrices,
  textAllQuantity,
  textAllSku,
}) => {
  let IsNotNull = false;
  rowNPL2.map((item) => {
    if (item !== "") {
      IsNotNull = true;
    }
  });

  const column = [
    {
      id: "NPL1",
      name: NameNPL1 != "" ? NameNPL1 : "Nhóm phân loại 1",
      width: "75px",
      display: true,
    },
    {
      id: "NPL2",
      name: NameNPL2 != "" ? NameNPL2 : "Nhóm phân loại 2",
      width: "75px",
      display: isADDNPL2 ? true : false,
    },
    {
      id: "Prices",
      name: "Giá",
      width: "75px",
      display: true,
    },
    {
      id: "Quantity",
      name: "Số lượng",
      width: "75px",
      display: true,
    },
    {
      id: "SKU",
      name: "Sku phân loại",
      width: "75px",
      display: true,
    },
  ];
  return (
    <div>
      <div className="m-4 h-[360px] overflow-x-auto overflow-y-auto rounded-[4px] border-[1px] border-solid border-[#E5E5E5]">
        <div className="table w-full">
          <div className="table-header-group">
            <div className="sticky top-0 table-row bg-[#F6F6F6] text-[#999999]">
              {column.map((item, index) => {
                if (item.display == true) {
                  return (
                    <div
                      className={`table-cell w-[${item.width}] border-r py-4 text-center`}
                      key={index}
                    >
                      {item.name}
                    </div>
                  );
                }
              })}
            </div>
          </div>
          <div className="table-row-group">
            {rowNPL1.map((item, index) => {
              if (item != "") {
                return (
                  <div className="table-row" key={index}>
                    {/* **************************************** */}
                    <div className="table-cell h-16 border-y border-r p-3 text-center">
                      <div className="mb-4"> {item}</div>
                      <div className="flex items-center justify-center rounded-[4px] border border-dashed border-[#B7B7B7] py-4 px-2 text-primary  hover:cursor-pointer hover:bg-[rgba(255,112,112,0.58)]">
                        <label
                          htmlFor="fileImage"
                          className=" hover:cursor-pointer"
                        >
                          <BsImages className=" text-[24px]" />
                        </label>
                        <input
                          type="file"
                          name=""
                          id="fileImage"
                          className="hidden"
                        />
                      </div>
                    </div>
                    {/* **************************************** */}
                    {NameNPL2 !== "Nhóm phân loại 2" && IsNotNull ? (
                      <div className="table-cell h-16 border-y border-r text-center">
                        {rowNPL2.map((item, index) => {
                          if (item != "") {
                            return (
                              <div className=" border-b py-6" key={index}>
                                {item}
                              </div>
                            );
                          }
                        })}
                      </div>
                    ) : NameNPL2 === "Nhóm phân loại 2" && !IsNotNull ? (
                      ""
                    ) : NameNPL2 === "Nhóm phân loại 2" && IsNotNull ? (
                      <div className="table-cell h-16 border-y border-r text-center">
                        {rowNPL2.map((item, index) => {
                          if (item != "") {
                            return (
                              <div className=" border-b py-6" key={index}>
                                {item}
                              </div>
                            );
                          }
                        })}
                      </div>
                    ) : (
                      isADDNPL2 && (
                        <div className="table-cell h-16 border-y border-r text-center">
                          {rowNPL2.map((item, index) => {
                            if (item != "") {
                              return (
                                <div
                                  className=" border-b py-6"
                                  key={index}
                                ></div>
                              );
                            }
                          })}
                        </div>
                      )
                    )}
                    {/* **************************************** */}
                    <div className="table-cell h-16 border-y border-r text-center">
                      {NameNPL2 != "Nhóm phân loại 2" && IsNotNull ? (
                        rowNPL2.map((item, index) => {
                          if (item != "") {
                            return (
                              <div
                                key={index}
                                className=" flex justify-center border-t py-3"
                              >
                                <div className="flex h-[40px] w-[180px] items-center rounded-[4px]  border border-solid  border-[#E5E5E5] py-3 px-2 transition-all hover:border-l hover:border-[#666]">
                                  <div className="border-r-2 pr-2 text-gray-400">
                                    đ
                                  </div>
                                  <input
                                    type="number"
                                    defaultValue={textAllPrices}
                                    placeholder="Nhập vào"
                                    className="ml-4 w-[130px] outline-none"
                                  />
                                </div>
                              </div>
                            );
                          }
                        })
                      ) : (
                        <div
                          key={index}
                          className=" flex justify-center border-t py-3"
                        >
                          <div className="flex h-[40px] w-[180px] items-center rounded-[4px]  border border-solid  border-[#E5E5E5] py-3 px-2 transition-all hover:border-l hover:border-[#666]">
                            <div className="border-r-2 pr-2 text-gray-400">
                              đ
                            </div>
                            <input
                              type="number"
                              placeholder="Nhập vào"
                              defaultValue={textAllPrices}
                              className="ml-4 w-[130px] outline-none"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    {/* **************************************** */}
                    <div className="table-cell h-16 border-y border-r text-center">
                      {NameNPL2 != "Nhóm phân loại 2" && IsNotNull ? (
                        rowNPL2.map((item, index) => {
                          if (item != "") {
                            return (
                              <div
                                key={index}
                                className=" flex justify-center border-t py-3"
                              >
                                <div className="flex h-[40px] w-[180px] items-center  rounded-[4px] border  border-solid border-[#E5E5E5] py-3 px-2 transition-all hover:border-l hover:border-[#666]">
                                  <input
                                    type="number"
                                    placeholder="Nhập vào"
                                    defaultValue={textAllQuantity}
                                    className=" w-[160px] outline-none"
                                  />
                                </div>
                              </div>
                            );
                          }
                        })
                      ) : (
                        <div
                          key={index}
                          className=" flex justify-center border-t py-3"
                        >
                          <div className="flex h-[40px] w-[180px] items-center  rounded-[4px] border  border-solid border-[#E5E5E5] py-3 px-2 transition-all hover:border-l hover:border-[#666]">
                            <input
                              type="number"
                              placeholder="Nhập vào"
                              defaultValue={textAllQuantity}
                              className=" w-[160px] outline-none"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    {/* **************************************** */}
                    <div className="table-cell h-16 border-y border-r text-center">
                      {NameNPL2 != "Nhóm phân loại 2" && IsNotNull ? (
                        rowNPL2.map((item, index) => {
                          if (item != "") {
                            return (
                              <div
                                key={index}
                                className=" flex justify-center border-t py-3"
                              >
                                <div className="flex h-[40px] w-[180px] items-center  rounded-[4px] border  border-solid border-[#E5E5E5] py-3 px-2 transition-all hover:border-l hover:border-[#666]">
                                  <input
                                    type="text"
                                    placeholder="Nhập vào"
                                    defaultValue={textAllSku}
                                    className=" w-[160px] outline-none"
                                  />
                                </div>
                              </div>
                            );
                          }
                        })
                      ) : (
                        <div
                          key={index}
                          className=" flex justify-center border-t py-3"
                        >
                          <div className="flex h-[40px] w-[180px] items-center  rounded-[4px] border  border-solid border-[#E5E5E5] py-3 px-2 transition-all hover:border-l hover:border-[#666]">
                            <input
                              type="text"
                              placeholder="Nhập vào"
                              defaultValue={textAllSku}
                              className=" w-[160px] outline-none"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    {/* **************************************** */}
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <div className="hover: mr-10 cursor-pointer rounded-[4px] bg-primary py-3 px-6 text-[#fff] hover:bg-[rgba(255,112,112,0.58)]">
          Lưu
        </div>
      </div>
    </div>
  );
};
