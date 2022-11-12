import dayjs from "dayjs";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Comment, CommentImage } from "../../models/product.model";
import { createAvatar } from "../../utils";
import FilterStarItem from "../Filters/FilterStarItem";



const ReviewCard:React.FC<Comment> = ({content,id,pointStar,productId,user,userId,commentImages,createdAt}) => {
  return (
    <div className="mt-4 flex">
      <LazyLoadImage
        src={user?.image || createAvatar(user.email || user.phone || user.name)}
        className="h-[40px] w-[40px] rounded-full"
      />
      <div className="ml-4 flex-1">
        <h5>{user.name || user?.email?.slice(0, user?.email?.indexOf("@")) || user?.phone}</h5>
        <FilterStarItem isText={false} star={pointStar} color="text-primary" />
        <p className="mt-2">{dayjs(createdAt).format('DD-MM-YYYY')} </p>
        <p className="mt-2">
          {content}
        </p>
        <div className="mt-2 grid max-w-full grid-cols-5 gap-2 lg:max-w-[50%]">
          {commentImages?.map((item: CommentImage) => (
            <LazyLoadImage
              key={item.id}
              src={item.image}
              className="aspect-[1/1] "
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
