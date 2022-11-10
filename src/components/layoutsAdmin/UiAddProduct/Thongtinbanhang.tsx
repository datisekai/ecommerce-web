import Link from "next/link";
import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { ImBin } from "react-icons/im";
const Thongtinbanhang = () => {
  const [_group1, _setGroup1] = useState<string[]>([]);
  const [_group2, _setGroup2] = useState<string[]>([]);
  const [_textArray1, setTextArray1] = useState("");
  const [_textArray2, setTextArray2] = useState("");
  const [_textGroup1, setTextGroup1] = useState("");
  const [_textGroup2, setTextGroup2] = useState("");
  const [isDelete, setIsDelete] = useState(false);
  const [vitri1, setVitri1] = useState(-1);
  const [vitri2, setVitri2] = useState(-1);
  const [_displayGroupCategory, _setDisplayGroupCategory] = useState(false);
  const [_displayGroupCategory2, _setDisplayGroupCategory2] = useState(false);
  const handleChange = () => {
    _setDisplayGroupCategory(true);
  };
  const handleChange2 = () => {
    _setDisplayGroupCategory2(true);
  };
  useEffect(() => {
    let arr = [..._group1];
    if (!isDelete) {
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
    } else {
      const test2 = arr.filter((item, index) => index !== vitri1);
      _setGroup1(test2);
    }
    console.log(_group1);
  }, [_textArray1]);
  useEffect(() => {
    let arr = [..._group2];
    if (!isDelete) {
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
    } else {
      const test2 = arr.filter((item, index) => index !== vitri2);
      _setGroup2(test2);
    }
    console.log(_group2);
  }, [_textArray2]);
  /* ********************************************************* */
  const DeleteInput = (key: number, key_vitri: number) => {
    console.log("check1");
    if (key == 1) {
      setVitri1(key_vitri);
      setTextArray1("/-?/");
    } else {
      setVitri2(key_vitri);
      setTextArray2("/-?/");
    }
    setIsDelete(true);
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
                          <>
                            <input
                              key={index}
                              type="text"
                              className="mr-4 mb-4  w-[150px] rounded-[4px] border border-solid  border-[#E5E5E5] py-2 px-2 pr-4"
                              placeholder="ví dụ: S, M, v.v"
                              onChange={(e) => {
                                setVitri2(index);
                                setTextArray2(e.target.value);
                              }}
                            />
                            <ImBin className="text-[24px]" />
                          </>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
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
          {_displayGroupCategory === true ? (
            <Link href={"./GroupSku"}>
              <div className="hover: mr-10 cursor-pointer rounded-[4px] bg-primary py-3 px-6 text-[#fff] hover:bg-[rgba(255,112,112,0.58)]">
                Kế tiếp
              </div>
            </Link>
          ) : (
            <div
              onClick={SaveProduct}
              className="hover: mr-10 cursor-pointer rounded-[4px] bg-primary py-3 px-6 text-[#fff] hover:bg-[rgba(255,112,112,0.58)]"
            >
              Lưu
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Thongtinbanhang;
