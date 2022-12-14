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
    const arr = [..._group1];
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
    const arr = [..._group2];
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
      const arr = [..._group1];
      const test2 = arr.filter((item, index) => index !== vitri1);
      _setGroup1(test2);
      setIsDelete1(false);
    }
  }, [isDelete1]);
  useEffect(() => {
    if (isDelete2) {
      const arr = [..._group2];
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
  return (
    <div className=" p-4">
      <div className="mb-6 text-xl">
        <strong>Th??ng tin b??n h??ng</strong>
      </div>
      <div className="ml-6">
        <div
          className={` mb-6 flex ${
            _displayGroupCategory === false ? `items-center` : ""
          } `}
        >
          <div className="w-[160px]">Ph??n lo???i h??ng</div>
          {_displayGroupCategory === false ? (
            <div
              onClick={handleChange}
              className="rounded-[4px] border-[2px] border-dashed border-[#B7B7B7] py-3 px-6 text-primary hover:cursor-pointer hover:bg-[rgba(255,112,112,0.58)]"
            >
              Th??m nh??m ph??n lo???i
            </div>
          ) : (
            <div>
              <div className="mb-6 w-[800px] bg-[#F6F6F6] px-4 pt-4">
                <div className="mb-4 flex items-center">
                  <div className="mr-3 w-[80px] ">Nh??m ph??n lo???i 1</div>
                  <input
                    type="text"
                    className="w-[150px] rounded-[4px] border  border-solid border-[#E5E5E5] py-2 px-2"
                    placeholder="v?? d???: m??u s???c v.v"
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
                  <div className="mr-3 w-[80px]">Ph??n lo???i h??ng</div>
                  <div className="grid grid-cols-3">
                    {_group1.map((item: any, index: number) => {
                      return (
                        <div className="mb-4 flex items-center" key={index}>
                          <input
                            defaultValue={item}
                            type="text"
                            className=" w-[150px] rounded-[4px] border  border-solid border-[#E5E5E5] py-2 px-2"
                            placeholder="v?? d???: Tr???ng, ????? v.v"
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
                  <div className="mr-3 w-[80px]">Nh??m ph??n lo???i 2</div>
                  {_displayGroupCategory2 == false ? (
                    <div
                      onClick={handleChange2}
                      className="rounded-[4px] border border-dashed border-[#B7B7B7] py-2 px-4 text-primary hover:cursor-pointer hover:bg-[rgba(255,112,112,0.58)]"
                    >
                      Th??m nh??m ph??n lo???i 2
                    </div>
                  ) : (
                    <>
                      <input
                        type="text"
                        className="w-[150px] rounded-[4px] border  border-solid border-[#E5E5E5] py-2 px-2"
                        placeholder="v?? d???: Size v.v"
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
                    <div className="mr-3 w-[80px] ">Ph??n lo???i h??ng</div>
                    <div className="grid grid-cols-3 ">
                      {_group2.map((item: any, index: number) => {
                        return (
                          <div className="mb-4 flex items-center" key={index}>
                            <input
                              key={index}
                              defaultValue={item}
                              type="text"
                              className="w-[150px] rounded-[4px] border  border-solid border-[#E5E5E5] py-2 px-2"
                              placeholder="v?? d???: S, M, v.v"
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
                <div className="w-[160px]">Danh s??ch ph??n lo???i h??ng</div>
                <div className="flex h-[35px] w-[180px] items-center  rounded-l border-y border-l border-solid border-[#E5E5E5] py-2 px-2 transition-all hover:border-r hover:border-[#666]">
                  <div className="border-r-2 pr-2 text-gray-400">??</div>
                  <input
                    type="number"
                    placeholder="Gi??"
                    onChange={(e) => {
                      setTextGroupPrices(e.target.value);
                    }}
                    className="ml-4 w-[130px]  outline-none"
                  />
                </div>
                <input
                  type="number"
                  placeholder="S??? l?????ng"
                  onChange={(e) => {
                    setTextGroupQuantity(e.target.value);
                  }}
                  className="flex h-[35px] w-[180px] items-center border-y border-l border-solid border-[#E5E5E5] py-2 px-2 outline-none transition-all hover:border-r hover:border-[#666]"
                />
                <input
                  type="text"
                  placeholder="SKU ph??n lo???i"
                  onChange={(e) => {
                    setTextGroupSKU(e.target.value);
                  }}
                  className="flex h-[35px] w-[180px] items-center  rounded-r border-y border-x border-solid border-[#E5E5E5] py-2 px-2 outline-none transition-all hover:border-r hover:border-[#666]"
                />
              </div>
              <Danhsachphanloaihang
                NameNPL1={_textGroup1} /*T??n thu???c t??nh 1 vidu: M??u*/
                NameNPL2={_textGroup2} /*T??n thu???c t??nh 2 vidu: Size*/
                rowNPL1={
                  _group1
                } /*c??c thu???c t??nh b??n trong c???a thu???c t??nh 1 vd: ?????, xanh*/
                rowNPL2={
                  _group2
                } /*c??c thu???c t??nh b??n trong c???a thu???c t??nh 2 vd: M, L*/
                isADDNPL2={
                  _displayGroupCategory2 == true ? true : false
                } /*c???t Thu???c t??nh 2 c?? hay l?? kh??ng*/
                textAllPrices={textGroupPrices} /*cho all gi??  (c?? s???n)*/
                textAllQuantity={
                  textGroupQuantity
                } /*cho all s??? l?????ng (c?? s???n)*/
                textAllSku={textGroupSKU} /*cho all sku ph??n lo???i (c?? s???n)*/
              />
              {/* ************************************* */}
            </div>
          )}
        </div>
        {_displayGroupCategory == false ? (
          <div>
            <div className="mb-6 flex items-center">
              <div className="w-[160px]">Gi??</div>
              <div className="flex h-[40px] w-[800px] items-center  rounded-[4px] border  border-solid border-[#E5E5E5] py-2 px-2 transition-all hover:border-l hover:border-[#666]">
                <div className="border-r-2 pr-2 text-gray-400">??</div>
                <input
                  type="number"
                  placeholder="Nh???p v??o"
                  className="ml-4 w-[600px] outline-none"
                />
              </div>
            </div>
            <div className="mb-6 flex items-center">
              <div className="w-[160px]">S??? l?????ng</div>
              <div className="flex h-[40px] w-[800px] items-center  rounded-[4px] border  border-solid border-[#E5E5E5] py-2 px-2 transition-all hover:border-l hover:border-[#666]">
                <input
                  type="number"
                  placeholder="Nh???p v??o"
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
          <div className="hover: mr-10 cursor-pointer rounded-[4px] bg-primary py-3 px-6 text-[#fff] hover:bg-[rgba(255,112,112,0.58)]">
            L??u
          </div>
        </div>
      </div>
    </div>
  );
};

export default Thongtinbanhang;
