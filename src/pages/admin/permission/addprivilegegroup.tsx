import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useState } from "react";
import toast from "react-hot-toast";
import swal from "sweetalert";
import Button from "../../../components/Button";
import AdminLayout from "../../../components/Layouts/AdminLayout";
import AuthLayout from "../../../components/Layouts/AuthLayout";
import TableLayout from "../../../components/_custom/TableLayout";
import { useAppSelector } from "../../../hooks/reduxHooks";
import PermissionApi from "../../../services/permission";
import checkPermission from "../../../utils/checkPermission";

const AddPrivilege = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const [name, setName] = useState("");
  const queryClient = useQueryClient();

  const { data } = useQuery(["permission"], PermissionApi.getPermisison);

  const { mutate, isLoading } = useMutation(PermissionApi.addPermission, {
    onSuccess: (result) => {
      queryClient.setQueryData(["permission"], [result, ...data]);
      swal("Good job!", "Thêm thành công", "success");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Vui lòng thử lại");
    },
  });

  const { user } = useAppSelector((state) => state.user);

  const columnTable = [
    { id: "id", name: "ID", width: "75px" },
    { id: "name", name: "Tên nhóm quyền", width: "75px" },
  ];

  const handleSubmit = () => {
    if (name.trim() === "") {
      toast.error("Vui lòng nhập tên quyền");
      return;
    }
    mutate(name);
  };

  return (
    <AuthLayout>
      <AdminLayout>
        <div className="_shadow ml-80 mr-[100px] mt-4 min-w-[900px] rounded-[4px] bg-[#ffffff] p-4">
          {checkPermission(user, "admin:permission:add") && (
            <>
              <div className="flex justify-center">
                <strong className="text-lg">Thêm loại người dùng</strong>
              </div>
              <div className="my-4">
                <div className="flex items-center">
                  <div className="mr-4">Tên nhóm quyền</div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-[300px] rounded-[4px] border  border-solid border-[#E5E5E5] py-2 px-2"
                  />
                </div>

                <div className="flex pt-4">
                  <Button
                    disabled={isLoading}
                    onClick={handleSubmit}
                    text="Thêm"
                    className="rounded-[4px] bg-primary py-2 px-4 text-white hover:cursor-pointer hover:bg-hoverBgPri"
                  />
                </div>
              </div>
            </>
          )}
          {/***************** */}
          {checkPermission(user, "admin:permission:read") && (
            <div className="border-t-2">
              <div className="py-4">
                <strong className="text-base">Danh sách người dùng</strong>
              </div>
              <TableLayout
                columnTable={columnTable}
                rowTables={data || []}
                isAction={
                  checkPermission(user, "admin:permission:update") ||
                  checkPermission(user, "admin:permission:delete") ||
                  false
                }
                isUpdate={checkPermission(user, "admin:permission:update")}
                isDelete={checkPermission(user, "admin:permission:delete")}
              />
            </div>
          )}
          {/***************** */}
        </div>
      </AdminLayout>
    </AuthLayout>
  );
};

export default AddPrivilege;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const token = req.cookies["token"];
  const actions = JSON.parse(req.cookies["actions"]);
  const isExist = actions.some(
    (item: string) =>
      item === "admin:permission:read" ||
      item === "admin:permission:update" ||
      item === "admin:permission:add" ||
      item === "admin:permission:delete"
  );

  if (token && isExist) {
    return {
      props: {
        token,
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
