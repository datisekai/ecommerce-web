import React from "react";
import WidthLayout from "../Layouts/WidthLayout";
import { AiOutlineRight } from "react-icons/ai";

const Footer = () => {
  return (
    <div className="hidden border-t-[5px] border-secondary bg-white py-[40px] lg:block">
      <WidthLayout>
        <div className="mx-auto w-full max-w-[calc(100%-16px)] border-b pb-4">
          <div>
            <h3 className="font-semibold">
              SHOPEE - GÌ CŨNG CÓ, MUA HẾT Ở SHOPEE
            </h3>
            <p className="mt-2 text-justify text-[13px] leading-6 text-gray-600">
              Shopee - ứng dụng mua sắm trực tuyến thú vị, tin cậy, an toàn và
              miễn phí! Shopee là nền tảng giao dịch trực tuyến hàng đầu ở Đông
              Nam Á, có trụ sở chính ở Singapore, đã có mặt ở khắp các khu vực
              Singapore, Malaysia, Indonesia, Thái Lan, Philippines, Đài Loan,
              Brazil, México, Colombia, Chile, Poland, Spain, Argentina. Với sự
              đảm bảo của Shopee, bạn sẽ mua hàng trực tuyến an tâm và nhanh
              chóng hơn bao giờ hết!
            </p>
          </div>
          <div className="mt-4">
            <h3 className="font-semibold">
              MUA SẮM VÀ BÁN HÀNG ONLINE ĐƠN GIẢN, NHANH CHÓNG VÀ AN TOÀN
            </h3>
            <p className="mt-2 text-justify text-[13px] leading-6 text-gray-600">
              Nếu bạn đang tìm kiếm một trang web để mua và bán hàng trực tuyến
              thì Shopee.vn là một sự lựa chọn tuyệt vời dành cho bạn. Bản chất
              của Shopee là một social E-commerce platform - nền tảng trang web
              thương mại điện tử tích hợp mạng xã hội. Điều này cho phép người
              mua và người bán hàng dễ dàng tương tác, trao đổi thông tin về sản
              phẩm và chương trình khuyến mãi của shop. Nhờ nền tảng đó, việc
              mua bán trên Shopee trở nên nhanh chóng và đơn giản hơn. Bạn có
              thể trò chuyện trực tiếp với nhà bán hàng để hỏi trực tiếp về mặt
              hàng cần mua. Còn nếu bạn muốn tìm mua những dòng sản phẩm chính
              hãng, uy tín, Shopee Mall chính là sự lựa chọn lí tưởng dành cho
              bạn. Để bạn có thể dễ dàng khi tìm hiểu và sử dụng sản phẩm,
              Shopee Blog- trang blog thông tin chính thức của Shopee - sẽ giúp
              bạn có thể tìm được cho mình các kiến thức về xu hướng thời trang,
              review công nghệ, mẹo làm đẹp, tin tức tiêu dùng và deal giá tốt
              bất ngờ.
            </p>
          </div>
          <div className="mt-4 flex items-center">
            <button className="text-[13px] capitalize text-primary">
              Xem thêm
            </button>
            <AiOutlineRight className="text-[15px] capitalize text-primary" />
          </div>
        </div>
      </WidthLayout>
    </div>
  );
};

export default Footer;
