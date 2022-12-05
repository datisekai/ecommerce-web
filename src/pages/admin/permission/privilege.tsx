import { useMutation } from "@tanstack/react-query";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC, useState, useMemo, useEffect } from "react";
import swal from "sweetalert";
import Button from "../../../components/Button";
import AdminLayout from "../../../components/Layouts/AdminLayout";
import AuthLayout from "../../../components/Layouts/AuthLayout";
import LayoutPermission from "../../../components/layoutsAdminNew/UIPermission/LayoutPermission";
import { useAppSelector } from "../../../hooks/reduxHooks";
import { Action } from "../../../models/action.model";
import { Permission } from "../../../models/permission.model";
import ActionApi from "../../../services/action";
import PermissionApi from "../../../services/permission";
import SetAuthorizedApi from "../../../services/set-authorized";
import checkPermission from "../../../utils/checkPermission";

interface privilegeProps {
  permissions: Permission[];
  actions: Action[];
}

const Privilege: FC<privilegeProps> = ({
      actions,
      permissions,
    }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const listPermission = useMemo(() => {
    const groupByPerList = actions.reduce((group, product) => {
      const { perListId } = product;
      group[perListId] = group[perListId] ?? [];
      group[perListId].push(product);
      return group;
    }, {});
    const data = [];
    for (const key in groupByPerList) {
      data.push({
        name: groupByPerList[key][0].perList.name,
        privilege: groupByPerList[key],
      });
    }

    console.log(data[0].privilege);
    return data;
  }, [actions]);

  const [selected, setSelected] = useState<
    { code: string; perListId: number }[]
  >([]);
  const [option, setOption] = useState("");

  useEffect(() => {
    const currentActions = [...actions];
    const newData = [];
    currentActions.forEach((item) => {
      const isExist = item.Action.some((element) => element.perId == option);
      if (isExist) {
        newData.push(item);
      }
    });
    setSelected(
      newData.map((item) => ({
        code: item.code,
        perListId: item.perListId,
      }))
    );
  }, [option]);

  const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelected([
        ...selected,
        {
          code: e.target.id,
          perListId: Number(e.target.value),
        },
      ]);
    } else {
      setSelected(selected.filter((item) => item.code !== e.target.id));
    }
  };

  const { mutate, isLoading } = useMutation(SetAuthorizedApi.setData, {
    onSuccess: (data) => {
      swal("Good job!", "Cập nhật thành công", "success");
      refreshData();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleCheckedAll = () => {
    setSelected(
      actions.map((item) => ({
        code: item.code,
        perListId: item.perListId,
      }))
    );
  };

  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const handleSubmit = () => {
    if (option === "") {
      swal("Cảnh báo", "Vui lòng chọn quyền", "warning");
      return;
    }

    swal({
      title: "Bạn có chắc chắn muốn lưu?",
      icon: "warning",
      buttons: ["Hủy", "Lưu"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        mutate({ perId: Number(option), data: selected });
      }
    });
  };

  const { user } = useAppSelector((state) => state.user);

  return (
    <AuthLayout>
      <AdminLayout>
        <div className=" _shadow relative ml-80 mr-[100px] mt-4 min-w-[900px] rounded-[4px] bg-[#ffffff] pb-1">
          <div className="mb-4 flex items-center justify-between  p-4">
            <div className="flex items-center">
              <select
                value={option}
                onChange={(e) => setOption(e.target.value)}
                className="h-[35px] rounded-l border-[1px] border-solid border-[#E5E5E5] py-2 px-2 outline-none transition-all hover:cursor-pointer hover:border-[#666]"
              >
                <option value="">Chọn loại người dùng</option>
                {permissions.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
              {checkPermission(user, "admin:permission:add") && (
                <Link href={"/admin/permission/addprivilegegroup"}>
                  <div
                    className="h-[35px]
            cursor-pointer rounded-r border-y border-r border-solid border-[#E5E5E5] py-2 px-2 hover:bg-hoverBgSec"
                  >
                    Thêm nhóm quyền
                  </div>
                </Link>
              )}
            </div>
            <div className="flex items-center justify-between">
              <div
                onClick={handleCheckedAll}
                className="rounded-[4px] bg-red-500 py-2 px-6 text-[#ffffff] hover:cursor-pointer hover:bg-[rgba(120,21,21,0.66)]"
              >
                Chọn tất cả
              </div>
              <div
                onClick={() => setSelected([])}
                className="ml-4 rounded-[4px] border-[1px] border-solid border-[#E5E5E5] py-2 px-6 hover:cursor-pointer hover:bg-[#b5b5b580]"
              >
                Bỏ chọn tất cả
              </div>
            </div>
          </div>
          {/* ************************************** */}
          <div className="mx-4">
            <div className="grid grid-cols-3">
              {listPermission.map((item: any, index: number) => {
                return (
                  <div
                    key={index}
                    className="mx-4 mb-8 h-[280px] overflow-x-hidden overflow-y-hidden border hover:overflow-y-auto"
                  >
                    <div className="flex justify-center p-2 text-lg">
                      <strong> {item.name}</strong>
                    </div>
                    <div className="mx-4 mt-4">
                      {item.privilege.map((element, index) => {
                        return (
                          <div
                            key={element.code}
                            className="mb-2 flex py-2 pl-4 "
                          >
                            <input
                              type="checkbox"
                              value={element.perListId}
                              onChange={handleChecked}
                              id={`${element.code}`}
                              checked={selected.some(
                                (item) => item.code === element.code
                              )}
                            />
                            <label
                              className="ml-2 text-base"
                              htmlFor={`${element.code}`}
                            >
                              {element.name}
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* ************************************** */}
          <div className="flex justify-end py-4 pr-10">
            <Button
              disabled={isLoading}
              onClick={handleSubmit}
              className="flex w-[150px] items-center justify-center rounded-[4px] bg-red-500 py-2 px-6 text-[#ffffff] hover:cursor-pointer hover:bg-[rgba(120,21,21,0.66)]"
              text="Lưu"
            />
          </div>
        </div>
      </AdminLayout>
    </AuthLayout>
  );
};

export default Privilege;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const token = req.cookies["token"];
  const actions = JSON.parse(req.cookies["actions"]);
  const isExist = actions.some(
    (item: string) =>
      item === "admin:privilege:read" || item === "admin:privilege:update"
  );

  if (token && isExist) {
    const data = await Promise.all([
      PermissionApi.getPermisionServer(token),
      ActionApi.getAction(token),
    ]);
    return {
      props: {
        token,
        permissions: data[0],
        actions: data[1],
      },
    };
  }

  return {
    props: {},
    redirect: {
      permanent: false,
      destination: "/",
    },
  };
};
