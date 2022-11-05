import React, { FC } from "react";

type DividerProps = {
  bgColor?: string;
  width?: string;
  height?: string;
  my?: string;
  mx?: string;
};

const Divider: FC<DividerProps> = ({
  bgColor = "rgba(0,0,0,.09)",
  width = "100%",
  height = "1px",
  my = "16px",
  mx = "0px",
}) => {
  return (
    <div
      style={{
        backgroundColor: bgColor,
        width,
        height,
        margin: `${my} ${mx}`,
      }}
    ></div>
  );
};

export default Divider;
