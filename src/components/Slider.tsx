import { A11y, Pagination } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";
import WidthLayout from "./Layouts/WidthLayout";

const Slider = () => {
  return (
    <div className="bg-white py-0 lg:py-[30px]">
      <WidthLayout>
        <div className="flex">
          <div className="w-full lg:w-[70%]">
            <Swiper
              modules={[Pagination, A11y]}
              spaceBetween={50}
              slidesPerView={1}
              pagination
              color="#f53d2d"
            >
              <SwiperSlide>
                <img
                  src="https://cf.shopee.vn/file/5b5de1582d99cbbe75a8f9a5c4dae1c2_xxhdpi"
                  className="aspect-[320/150] w-full rounded-sm  lg:aspect-[10/3]"
                  alt=""
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src="https://cf.shopee.vn/file/0f7deded990c20a4aa9d10c0975f7453_xxhdpi"
                  className="aspect-[320/150] w-full rounded-sm  lg:aspect-[10/3]"
                  alt=""
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src="https://cf.shopee.vn/file/17cf556712aa05a013c292b3c72c83f5"
                  className="aspect-[320/150] w-full rounded-sm  lg:aspect-[10/3]"
                  alt=""
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src="https://cf.shopee.vn/file/f59bcce1d59bca951b43f99f95d0f900_xxhdpi"
                  className="aspect-[320/150] w-full rounded-sm  lg:aspect-[10/3]"
                  alt=""
                />
              </SwiperSlide>
            </Swiper>
          </div>

          <div className="ml-[6px] hidden w-[30%] flex-col justify-between lg:flex">
            <img
              src="https://cf.shopee.vn/file/102c20595a22197cb286af3f24b00d66_xhdpi"
              className="aspect-auto h-[50%] w-full rounded-sm"
            />
            <img
              src="https://cf.shopee.vn/file/102c20595a22197cb286af3f24b00d66_xhdpi"
              className="mt-[6px] aspect-auto h-[50%] w-full rounded-sm"
            />
          </div>
        </div>
      </WidthLayout>
    </div>
  );
};

export default Slider;
