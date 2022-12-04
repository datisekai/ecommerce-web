import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { ImBin } from "react-icons/im";
import swal from "sweetalert";
import { v4 as uuidv4 } from "uuid";
import { InfoBasic, Sku } from "../../../pages/seller/product/new";
import ProductApi from "../../../services/product";
import { uploadImg } from "../../../utils";
import Button from "../../Button";
import TableInfo from "./TableInfo";

type variantOption = {
  name: string;
  variantId: string;
};

type variant = {
  name: string;
  id: string;
};

interface ThongTinBanHang {
  _textGroup1: variant;
  _textGroup2: variant;
  setTextGroup1: (data: variant) => void;
  setTextGroup2: (data: variant) => void;
  handleChangeSku: (data: Sku[]) => void;
  skus: Sku[];
  info: InfoBasic;
}

const Thongtinbanhang: React.FC<ThongTinBanHang> = ({
  _textGroup1,
  _textGroup2,
  setTextGroup1,
  setTextGroup2,
  handleChangeSku,
  skus,
  info,
}) => {
  const [_group1, _setGroup1] = useState<variantOption[]>([]);
  const [_group2, _setGroup2] = useState<variantOption[]>([]);
  const [_textArray1, setTextArray1] = useState("");
  const [_textArray2, setTextArray2] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [isDelete1, setIsDelete1] = useState(false);
  const [isDelete2, setIsDelete2] = useState(false);
  const [vitri1, setVitri1] = useState(-1);
  const [vitri2, setVitri2] = useState(-1);
  const [_displayGroupCategory, _setDisplayGroupCategory] = useState(false);
  const [_displayGroupCategory2, _setDisplayGroupCategory2] = useState(false);

  const router = useRouter();

  const { mutate } = useMutation(ProductApi.addProduct, {
    onSuccess: (data) => {
      swal("Thông báo", "Thêm sản phẩm thành công", "success");
      router.push("/seller/product");
    },
    onError: (error: any) => {
      console.log(error);
    },
  });

  const handleChange = () => {
    _setDisplayGroupCategory(true);
  };
  const handleChange2 = () => {
    _setDisplayGroupCategory2(true);
  };
  useEffect(() => {
    const arr = [..._group1];
    const test: variantOption[] = arr.map((item, index) => {
      if (vitri1 === index) {
        return {
          name: _textArray1,
          variantId: _textGroup1.id,
        };
      }
      return {
        name: item.name,
        variantId: _textGroup1.id,
      };
    });
    _setGroup1(test);
    if (vitri1 === arr.length - 1) {
      const test = arr.map((item, index) => {
        if (vitri1 === index) {
          return _textArray1;
        }
        return item;
      });
      _setGroup1([
        ...(test as variantOption[]),
        {
          name: "",
          variantId: _textGroup1.id,
        },
      ]);
    }
  }, [_textArray1]);

  useEffect(() => {
    const arr = [..._group2];
    const test = arr.map((item, index) => {
      if (vitri2 === index) {
        return {
          name: _textArray2,
          variantId: _textGroup2.id,
        };
      }
      return item;
    });
    _setGroup2(test);
    if (vitri2 === arr.length - 1) {
      const test: variantOption[] = arr.map((item, index) => {
        if (vitri2 === index) {
          return {
            name: _textArray2,
            variantId: _textGroup2.id,
          };
        }
        return item;
      });
      _setGroup2([
        ...(test as variantOption[]),
        {
          name: "",
          variantId: _textGroup1.id,
        },
      ]);
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

  const isExistElement = (array) => {
    if (array.length > 1 && array[0].name != "") {
      return true;
    }

    return false;
  };

  const dataTables = useMemo(() => {
    const data = [];
    _group1.forEach((item) => {
      if (item.name != "") {
        if (!isExistElement(_group2)) {
          data.push([item]);
        } else {
          _group2.forEach((element) => {
            if (element.name != "") {
              data.push([item, element]);
            }
          });
        }
      }
    });

    handleChangeSku(
      data.map(() => ({
        price: "",
        discount: "",
        quantity: "",
        preview: "",
        file: null,
      }))
    );

    return data;
  }, [_group1, _group2]);

  const isEmptySku = () => {
    skus.forEach((item) => {
      if (
        !item.discount ||
        !item.preview ||
        !item.file ||
        !item.price ||
        !item.quantity
      ) {
        return false;
      }
    });
    return true;
  };

  const handleSubmit = async () => {
    if (
      !info.name ||
      !info.description ||
      !info.categoryId ||
      !info.file ||
      !isEmptySku()
    ) {
      swal("Thông báo", "Vui lòng kiểm tra và nhập đầy đủ", "warning");
      return;
    }
    setIsLoading(true);
    const newProduct = {
      categoryId: Number(info.categoryId),
      name: info.name,
      description: info.description,
      variants: [],
      image: "",
      skuValue: [],
    };

    if (_textGroup1.name != "") {
      newProduct.variants.push(_textGroup1);
    }

    if (_textGroup2.name != "") {
      newProduct.variants.push(_textGroup2);
    }

    newProduct.image = await uploadImg(info.file);

    if (!newProduct.image) {
      swal("Thông báo", "Vui lòng kiểm tra và nhập đầy đủ", "warning");
      return;
    }
    const imagesChild = await Promise.all(
      skus.map((item) => uploadImg(item.file))
    );

    if (imagesChild.length == 0) {
      swal("Thông báo", "Vui lòng kiểm tra và nhập đầy đủ", "warning");
      return;
    }

    dataTables.forEach((item, index) => {
      newProduct.skuValue.push({
        variantOptions: item,
        quantity: Number(skus[index].quantity),
        discount: Number(skus[index].discount),
        price: Number(skus[index].price),
        image: imagesChild[index],
      });
    });

    mutate(newProduct);

    setIsLoading(false);
  };

  const handleChangeAllSku = (key, value) => {
    handleChangeSku(
      skus.map((item) => ({
        ...item,
        [key]: value,
      }))
    );
  };

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
                    onChange={(e) =>
                      setTextGroup1({
                        name: e.target.value,
                        id: uuidv4(),
                      })
                    }
                  />
                  <div className="flex flex-1 justify-end hover:cursor-pointer">
                    <AiOutlineClose
                      className="text-[20px]"
                      onClick={
                        _displayGroupCategory2 == true
                          ? () => {
                              _setDisplayGroupCategory2(false);
                              _setGroup2([
                                {
                                  name: "",
                                  variantId: _textGroup1.id,
                                },
                              ]);
                              setTextGroup2({
                                name: "",
                                id: uuidv4(),
                              });
                            }
                          : () => {
                              _setDisplayGroupCategory(false);
                              _setGroup1([
                                {
                                  name: "",
                                  variantId: _textGroup1.id,
                                },
                              ]);
                              setTextGroup1({
                                name: "",
                                id: uuidv4(),
                              });
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
                            defaultValue={item.name}
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
                        onChange={(e) =>
                          setTextGroup2({
                            name: e.target.value,
                            id: uuidv4(),
                          })
                        }
                      />
                      <div className="flex flex-1 justify-end hover:cursor-pointer">
                        <AiOutlineClose
                          className="text-[20px]"
                          onClick={() => {
                            _setDisplayGroupCategory2(false);
                            _setGroup2([
                              {
                                name: "",
                                variantId: _textGroup2.id,
                              },
                            ]);
                            setTextGroup2({
                              name: "",
                              id: uuidv4(),
                            });
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
                              defaultValue={item.name}
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
                    type="text"
                    placeholder="Giá"
                    onChange={(e) =>
                      handleChangeAllSku("price", e.target.value)
                    }
                    className="ml-4 w-[130px]  outline-none"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Số lượng"
                  onChange={(e) =>
                    handleChangeAllSku("quantity", e.target.value)
                  }
                  className="flex h-[35px] w-[180px] items-center border-y border-l border-solid border-[#E5E5E5] py-2 px-2 outline-none transition-all hover:border-r hover:border-[#666]"
                />
                <input
                  type="text"
                  placeholder="% giảm"
                  onChange={(e) =>
                    handleChangeAllSku("discount", e.target.value)
                  }
                  className="flex h-[35px] w-[180px] items-center  rounded-r border-y border-x border-solid border-[#E5E5E5] py-2 px-2 outline-none transition-all hover:border-r hover:border-[#666]"
                />
              </div>
              <TableInfo
                colName1={_textGroup1}
                colName2={_textGroup2}
                isColName2={_displayGroupCategory2 == true ? true : false}
                dataTables={dataTables}
                handleChangeSku={handleChangeSku}
                skus={skus}
              />
              {/* ************************************* */}
            </div>
          )}
        </div>
        {/* {_displayGroupCategory == false ? (
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
        )} */}
        <div className="flex justify-end">
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            text="Lưu"
            className="flex w-[150px] items-center justify-center rounded-sm bg-primary px-4 py-2 text-lg text-white"
          />
        </div>
      </div>
    </div>
  );
};

export default Thongtinbanhang;
