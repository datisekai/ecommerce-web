import Link from "next/link";
import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { ImBin } from "react-icons/im";
import { Danhsachphanloaihang } from "./Danhsachphanloaihang";
const Thongtinbanhang = () => {
  const [_group1, _setGroup1] = useState<string[]>([]);
  const [_group2, _setGroup2] = useState<string[]>([]);
  const [_textArray1, setTextArray1] = useState("");
  const [_textArray2, setTextArray2] = useState("");
  const [_textGroup1, setTextGroup1] = useState("");
  const [_textGroup2, setTextGroup2] = useState("");
  const [isDelete1, setIsDelete1] = useState(false);
  const [isDelete2, setIsDelete2] = useState(false);
  const [vitri1, setVitri1] = useState(-1);
  const [vitri2, setVitri2] = useState(-1);
  const [_displayGroupCategory, _setDisplayGroupCategory] = useState(false);
  const [_displayGroupCategory2, _setDisplayGroupCategory2] = useState(false);
  const [textGroupPrices, setTextGroupPrices] = useState("");
  const [textGroupQuantity, setTextGroupQuantity] = useState("");
  const [textGroupSKU, setTextGroupSKU] = useState("");
  const handleChange = () => {
    _setDisplayGroupCategory(true);
  };
  const handleChange2 = () => {
    _setDisplayGroupCategory2(true);
  };
  useEffect(() => {
    let arr = [..._group1];
    const test = arr.map((item, index) => {
      if (vitri1 === index) {
        return _textArray1;
      }
      return item;
    });
    _setGroup1(test);
    if (vitri1 === arr.length - 1) {
      const test = arr.map((item, index) => {
        if (vitri1 === index) {
          return _textArray1;
        }
        return item;
      });
      _setGroup1([...test, ""]);
    }
  }, [_textArray1]);
  useEffect(() => {
    let arr = [..._group2];
    const test = arr.map((item, index) => {
      if (vitri2 === index) {
        return _textArray2;
      }
      return item;
    });
    _setGroup2(test);
    if (vitri2 === arr.length - 1) {
      const test = arr.map((item, index) => {
        if (vitri2 === index) {
          return _textArray2;
        }
        return item;
      });
      _setGroup2([...test, ""]);
    }
  }, [_textArray2]);
  useEffect(() => {
    if (isDelete1) {
      let arr = [..._group1];
      const test2 = arr.filter((item, index) => index !== vitri1);
      _setGroup1(test2);
      setIsDelete1(false);
    }
  }, [isDelete1]);
  useEffect(() => {
    if (isDelete2) {
      let arr = [..._group2];
      const test2 = arr.filter((item, index) => index !== vitri2);
      _setGroup2(test2);
      setIsDelete2(false);
    }
  }, [isDelete2]);
  /* ********************************************************* */
  const DeleteInput = (key: number, key_vitri: number) => {
    if (key == 1) {
      setVitri1(key_vitri);
      setIsDelete1(true);
    } else {
      setVitri2(key_vitri);
      setIsDelete2(true);
    }
  };
  const SaveProduct = () => {};
  return (
    <div className=" p-4">
      <div className="mb-6 text-xl">
        <strong>Thông tin bán hàng</strong>
      </div>
      <div className="ml-6">
        <div
          className={` mb-6 flex ${
            _displayGroupCategory === false ? `items-center` : ""
          } `}
        >
          <div className="w-[160px]">Phân loại hàng</div>
          {_displayGroupCategory === false ? (
            <div
              onClick={handleChange}
              className="rounded-[4px] border-[2px] border-dashed border-[#B7B7B7] py-3 px-6 text-primary hover:cursor-pointer hover:bg-[rgba(255,112,112,0.58)]"
            >
              Thêm nhóm phân loại
            </div>
          ) : (
            <div>
              <div className="mb-6 w-[800px] bg-[#F6F6F6] px-4 pt-4">
                <div className="mb-4 flex items-center">
                  <div className="mr-3 w-[80px] ">Nhóm phân loại 1</div>
                  <input
                    type="text"
                    className="w-[150px] rounded-[4px] border  border-solid border-[#E5E5E5] py-2 px-2"
                    placeholder="ví dụ: màu sắc v.v"
                    onChange={(e) => setTextGroup1(e.target.value)}
                  />
                  <div className="flex flex-1 justify-end hover:cursor-pointer">
                    <AiOutlineClose
                      className="text-[20px]"
                      onClick={
                        _displayGroupCategory2 == true
                          ? () => {
                              _setDisplayGroupCategory2(false);
                              _setGroup2([""]);
                              setTextGroup2("");
                            }
                          : () => {
                              _setDisplayGroupCategory(false);
                              _setGroup1([""]);
                              setTextGroup1("");
                            }
                      }
                    />
                  </div>
                </div>
                <div className="flex ">
                  <div className="mr-3 w-[80px]">Phân loại hàng</div>
                  <div className="grid grid-cols-3">
                    {_group1.map((item: any, index: number) => {
                      return (
                        <div className="mb-4 flex items-center" key={index}>
                          <input
                            defaultValue={item}
                            type="text"
                            className=" w-[150px] rounded-[4px] border  border-solid border-[#E5E5E5] py-2 px-2"
                            placeholder="ví dụ: Trắng, Đỏ v.v"
                            onChange={(e) => {
                              setVitri1(index);
                              setTextArray1(e.target.value);
                            }}
                          />
                          {index < _group1.length - 1 &&
                            _group1.length != 2 && (
                              <ImBin
                                onClick={() => DeleteInput(1, index)}
                                className=" m-2 text-[20px] text-[#757575] hover:cursor-pointer"
                              />
                            )}
                          {index < _group1.length - 1 &&
                            _group1.length == 2 && (
                              <ImBin className=" m-2 text-[20px] text-[#757575] hover:cursor-not-allowed" />
                            )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="mb-6 w-[800px] bg-[#F6F6F6] px-4 pt-4">
                <div className="flex items-center pb-4">
                  <div className="mr-3 w-[80px]">Nhóm phân loại 2</div>
                  {_displayGroupCategory2 == false ? (
                    <div
                      onClick={handleChange2}
                      className="rounded-[4px] border border-dashed border-[#B7B7B7] py-2 px-4 text-primary hover:cursor-pointer hover:bg-[rgba(255,112,112,0.58)]"
                    >
                      Thêm nhóm phân loại 2
                    </div>
                  ) : (
                    <>
                      <input
                        type="text"
                        className="w-[150px] rounded-[4px] border  border-solid border-[#E5E5E5] py-2 px-2"
                        placeholder="ví dụ: Size v.v"
                        onChange={(e) => setTextGroup2(e.target.value)}
                      />
                      <div className="flex flex-1 justify-end hover:cursor-pointer">
                        <AiOutlineClose
                          className="text-[20px]"
                          onClick={() => {
                            _setDisplayGroupCategory2(false);
                            _setGroup2([""]);
                            setTextGroup2("");
                          }}
                        />
                      </div>
                    </>
                  )}
                </div>
                {_displayGroupCategory2 == true && (
                  <div className="flex ">
                    <div className="mr-3 w-[80px] ">Phân loại hàng</div>
                    <div className="grid grid-cols-3 ">
                      {_group2.map((item: any, index: number) => {
                        return (
                          <div className="mb-4 flex items-center" key={index}>
                            <input
                              key={index}
                              defaultValue={item}
                              type="text"
                              className="w-[150px] rounded-[4px] border  border-solid border-[#E5E5E5] py-2 px-2"
                              placeholder="ví dụ: S, M, v.v"
                              onChange={(e) => {
                                setVitri2(index);
                                setTextArray2(e.target.value);
                              }}
                            />
                            {index < _group2.length - 1 &&
                              _group2.length != 2 && (
                                <ImBin
                                  onClick={() => DeleteInput(2, index)}
                                  className=" m-2 text-[20px] text-[#757575] hover:cursor-pointer"
                                />
                              )}
                            {index < _group2.length - 1 &&
                              _group2.length == 2 && (
                                <ImBin className=" m-2 text-[20px] text-[#757575] hover:cursor-not-allowed" />
                              )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* ************************************* */}
              <div className="mb-6 flex p-4">
                <div className="w-[160px]">Danh sách phân loại hàng</div>
                <div className="flex h-[35px] w-[180px] items-center  rounded-l border-y border-l border-solid border-[#E5E5E5] py-2 px-2 transition-all hover:border-r hover:border-[#666]">
                  <div className="border-r-2 pr-2 text-gray-400">đ</div>
                  <input
                    type="number"
                    placeholder="Giá"
                    onChange={(e) => {
                      setTextGroupPrices(e.target.value);
                    }}
                    className="ml-4 w-[130px]  outline-none"
                  />
                </div>
                <input
                  type="number"
                  placeholder="Số lượng"
                  onChange={(e) => {
                    setTextGroupQuantity(e.target.value);
                  }}
                  className="flex h-[35px] w-[180px] items-center border-y border-l border-solid border-[#E5E5E5] py-2 px-2 outline-none transition-all hover:border-r hover:border-[#666]"
                />
                <input
                  type="text"
                  placeholder="SKU phân loại"
                  onChange={(e) => {
                    setTextGroupSKU(e.target.value);
                  }}
                  className="flex h-[35px] w-[180px] items-center  rounded-r border-y border-x border-solid border-[#E5E5E5] py-2 px-2 outline-none transition-all hover:border-r hover:border-[#666]"
                />
              </div>
              <Danhsachphanloaihang
                NameNPL1={_textGroup1} /*Tên thuộc tính 1 vidu: Màu*/
                NameNPL2={_textGroup2} /*Tên thuộc tính 2 vidu: Size*/
                rowNPL1={
                  _group1
                } /*các thuộc tính bên trong của thuộc tính 1 vd: đỏ, xanh*/
                rowNPL2={
                  _group2
                } /*các thuộc tính bên trong của thuộc tính 2 vd: M, L*/
                isADDNPL2={
                  _displayGroupCategory2 == true ? true : false
                } /*cột Thuộc tính 2 có hay là không*/
                textAllPrices={textGroupPrices} /*cho all giá  (có sẵn)*/
                textAllQuantity={
                  textGroupQuantity
                } /*cho all số lượng (có sẵn)*/
                textAllSku={textGroupSKU} /*cho all sku phân loại (có sẵn)*/
              />
              {/* ************************************* */}
            </div>
          )}
        </div>
        {_displayGroupCategory == false ? (
          <div>
            <div className="mb-6 flex items-center">
              <div className="w-[160px]">Giá</div>
              <div className="flex h-[40px] w-[800px] items-center  rounded-[4px] border  border-solid border-[#E5E5E5] py-2 px-2 transition-all hover:border-l hover:border-[#666]">
                <div className="border-r-2 pr-2 text-gray-400">đ</div>
                <input
                  type="number"
                  placeholder="Nhập vào"
                  className="ml-4 w-[600px] outline-none"
                />
              </div>
            </div>
            <div className="mb-6 flex items-center">
              <div className="w-[160px]">Số lượng</div>
              <div className="flex h-[40px] w-[800px] items-center  rounded-[4px] border  border-solid border-[#E5E5E5] py-2 px-2 transition-all hover:border-l hover:border-[#666]">
                <input
                  type="number"
                  placeholder="Nhập vào"
                  defaultValue={0}
                  className=" w-[600px] outline-none"
                />
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="flex justify-end">
          <div
            onClick={SaveProduct}
            className="hover: mr-10 cursor-pointer rounded-[4px] bg-primary py-3 px-6 text-[#fff] hover:bg-[rgba(255,112,112,0.58)]"
          >
            Lưu
          </div>
        </div>
      </div>
    </div>
  );
};

export default Thongtinbanhang;
