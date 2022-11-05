import React, { FC } from "react";

type ButtonProps = {
  icon?: any;
  text?: string;
  classNameText?: string;
  onClick?: () => void;
  classNameIcon?: string;
  className?: string;
  startIcon?: any;
  classNameStarIcon?: string;
};

const Button: FC<ButtonProps> = ({
  classNameText,
  icon,
  onClick,
  text,
  classNameIcon,
  className,
  startIcon,
  classNameStarIcon,
}) => {
  const Icon = icon;
  const StartIcon = startIcon;
  return (
    <div
      onClick={onClick}
      className={`flex cursor-pointer items-center ${className} rounded-sm`}
    >
      {startIcon && <StartIcon className={classNameStarIcon} />}
      <span className={classNameText}>{text}</span>
      {icon && <Icon className={classNameIcon} />}
    </div>
  );
};

export default Button;
