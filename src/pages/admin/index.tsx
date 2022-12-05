import SellerLayout from "../../components/Layouts/SellerLayout";
import AdminLayout from "../../components/Layouts/AdminLayout";
import LayoutBill from "../../components/layoutsAdminNew/UIBill/LayoutBill";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
const AllBill = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  return (
    <AdminLayout>
      <LayoutBill />
    </AdminLayout>
  );
};

export default AllBill;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const token = req.cookies["token"];
  const actions = JSON.parse(req.cookies["actions"]);
  const isExist = actions.some(
    (item: string) =>
      item === "admin:order:read" || item === "admin:order:update"
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
