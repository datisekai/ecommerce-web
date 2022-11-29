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
  disabled?: boolean
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
  disabled = false
}) => {
  const Icon = icon;
  const StartIcon = startIcon;
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex cursor-pointer block items-center ${className} rounded-sm`}
    >
      {startIcon && <StartIcon className={classNameStarIcon} />}
      <span className={classNameText}>{text}</span>
      {icon && <Icon className={classNameIcon} />}
    </button>
  );
};

export default Button;
