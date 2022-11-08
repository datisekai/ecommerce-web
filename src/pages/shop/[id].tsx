import React from "react";
import ShopCard from "../../components/Cards/ShopCard";
import MainLayout from "../../components/Layouts/MainLayout";
import WidthLayout from "../../components/Layouts/WidthLayout";
import { TfiMenuAlt } from "react-icons/tfi";
import { useRouter } from "next/router";
import ResultSearch from "../../components/ResultSearch";

const data = [
  {
    id: 1,
    name: "Sản phẩm",
  },
  {
    id: 2,
    name: "Giảm giá",
  },
  {
    id: 3,
    name: "Hàng mới về",
  },
];

const Shop = () => {
  const router = useRouter();

  const { categoryId = data[0]?.id } = router.query;

  return (
    <MainLayout>
      <WidthLayout>
        <div className="mx-auto max-w-[calc(100%-16px)] py-6">
          <ShopCard />
          <div className="mt-4 flex justify-between">
            <div className="w-[180px] px-2 py-2">
              <div className="flex items-center border-b py-2">
                <TfiMenuAlt className="text-[18px]" />
                <span className="ml-2 text-[17px]">Danh mục</span>
              </div>
              <ul className="mt-2">
                {data.map((item: any) => (
                  <li
                    key={item.id}
                    className={`py-2 transition-all hover:cursor-pointer hover:text-primary ${
                      item.id == categoryId && "text-primary"
                    }`}
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
            <ResultSearch isMain={false} />
          </div>
        </div>
      </WidthLayout>
    </MainLayout>
  );
};

export default Shop;
