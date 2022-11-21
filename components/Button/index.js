import React from "react";
import PropTypes from "prop-types";

const Button = ({ variant = "primary", children, className, ...props }) => {
  const buttonVariant = {
    primary: "bg-blue-500 hover:bg-blue-700",
    danger: "bg-red-500 hover:bg-red-700",
    dark: "border bg-black hover:bg-white hover:border  hover:border-black eas-in-out duration-300 text-white hover:text-black",
    dark1: "bg-[#09090A] hover:bg-gray-700",
    darkOutline: "border-[#09090A] border-[1px] text-black hover:bg-gray-700 ",
    warning: " border-[#EEB628] border-[1px] bg-[#EEB628] hover:bg-yellow-700",
    white:
      "border border-[#09090A] bg-[#FFF] hover:bg-[#09090A] eas-in-out duration-300 hover:text-white",
    warningOutline:
      "border-[#EEB628] border-[1px] text-[#EEB628] hover:border-yellow-700",
    transparent: "bg-transparent hover:opacity-80",
  };

  return (
    <button
      type="submit"
      className={`${buttonVariant[variant]} font-semibold py-2 px-4  ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  variant: PropTypes.string,
};

export default Button;
