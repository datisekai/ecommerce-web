import React, { FC } from "react";
import { BsCheck } from "react-icons/bs";

type OptionVariantProps = {
  text: string;
  checked: boolean;
  onChange?: () => void;
};

const OptionVariant: FC<OptionVariantProps> = ({
  checked = true,
  text,
  onChange,
}) => {
  return (
    <div
      className={`relative flex cursor-pointer items-center justify-center rounded-sm border  px-5 py-2 transition-all hover:border-primary ${
        checked && "border-primary"
      }`}
    >
      <span className="overflow-hidden text-ellipsis whitespace-nowrap">
        {text}
      </span>
      {checked && (
        <div className="variant-checked">
          <BsCheck className="rounded-sm  text-[17px] text-primary" />
        </div>
      )}
    </div>
  );
};

export default OptionVariant;
