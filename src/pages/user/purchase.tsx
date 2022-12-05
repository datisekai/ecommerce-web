import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useMemo, useState } from "react";
import OrderCard from "../../components/Cards/OrderCard";
import AuthLayout from "../../components/Layouts/AuthLayout";
import UserLayout from "../../components/Layouts/UserLayout";
import Meta from "../../components/Meta";
import { Order } from "../../models/order.model";
import OrderApi from "../../services/order";
import ModalRefund from "../../components/Popup/ModalRefund";
import ViewReport from "../../components/Popup/ViewReport";
import ModalComment from "../../components/Popup/ModalComment";

const data = [
  {
    name: "Tất cả",
    id: 0,
  },
  {
    name: "Chờ xác nhận",
    id: 1,
  },
  {
    name: "Đang giao",
    id: 2,
  },
  {
    name: "Đã giao",
    id: 3,
  },
  {
    name: "Đã hủy",
    id: 4,
  },
];

interface PurchaseProps {
  orders: Order[];
}

const Purchase: NextPage<PurchaseProps> = ({
      orders,
    }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const [openRefund, setOpenRefund] = useState(false);
  const [openReport, setOpenReport] = useState(false);
  const [openComment, setOpenComment] = useState(false);
  const { type = 0 } = router.query;
  const [currentOrder, setCurrentOrder] = useState<Order>();

  console.log(orders);

  return (
    <>
      <Meta
        image="https://glints.com/vn/blog/wp-content/uploads/2022/10/chie%CC%82%CC%81n-di%CC%A3ch-truye%CC%82%CC%80n-tho%CC%82ng-cu%CC%89a-shopee.jpeg"
        description="Shopee Việt Nam | Mua và Bán Trên Ứng Dụng Di Động Hoặc Website"
        title="Shopee Việt Nam | Mua và Bán Trên Ứng Dụng Di Động Hoặc Website"
      />
      <AuthLayout>
        <UserLayout>
          <div className="border-b border-gray-200 bg-white text-center text-sm font-medium text-gray-500 dark:border-gray-700 dark:text-gray-400">
            <ul className="-mb-px flex flex-wrap">
              {data.map((item: any) => (
                <li className="mr-2" key={item.id}>
                  <Link href={`/user/purchase?type=${item.id}`}>
                    <a
                      className={`${
                        item.id == type
                          ? "active inline-block rounded-t-lg border-b-2 border-primary p-4 text-primary dark:border-blue-500 dark:text-blue-500"
                          : "inline-block rounded-t-lg border-b-2 border-transparent p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300"
                      }`}
                    >
                      {item.name}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4 ">
            {orders.map((item) => (
              <OrderCard
                handleOpen={() => {
                  setCurrentOrder(item);
                  setOpenRefund(true);
                }}
                handleOpenReport={() => {
                  setCurrentOrder(item);
                  setOpenReport(true);
                }}
                handleOpenComment={() => {
                  setCurrentOrder(item);
                  setOpenComment(true);
                }}
                key={item.id}
                {...item}
              />
            ))}
          </div>
          <ModalRefund
            open={openRefund}
            handleHide={() => {
              setCurrentOrder(undefined);
              setOpenRefund(false);
            }}
            order={currentOrder}
          />
          <ViewReport
            open={openReport}
            handleHide={() => {
              setCurrentOrder(undefined);
              setOpenReport(false);
            }}
            order={currentOrder}
          />
          <ModalComment
            open={openComment}
            handleHide={() => {
              setCurrentOrder(undefined);
              setOpenComment(false);
            }}
            order={currentOrder}
          />
        </UserLayout>
      </AuthLayout>
    </>
  );
};

export default Purchase;

export const getServerSideProps: GetServerSideProps = async ({
  query,
  req,
}) => {
  const { type = 0 } = query;
  const token = req.cookies["token"];
  if (token) {
    const orders = await OrderApi.getOrder(type as string, token);

    return {
      props: {
        orders,
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
