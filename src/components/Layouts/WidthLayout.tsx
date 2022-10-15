import React, { FC } from "react";

interface WidthProps {
  width?: number;
  children: React.ReactNode;
}

const WidthLayout: FC<WidthProps> = ({ width = 1200, children }) => {
  return <div className="mx-auto w-[inherit] max-w-[1200px]">{children}</div>;
};

export default WidthLayout;
