import Image from "next/image";
import React from "react";
import styles from "./Button.module.scss";

interface Props {
  children: React.ReactNode;
  iconLeft?: string;
  iconRight?: string;
  onClick?: () => void;
  theme?: "black" | "white";
}

const Button = ({ children, iconLeft, iconRight, theme, onClick }: Props) => {
  return (
    <button
      className={`${styles.button} ${theme && styles[theme]}`}
      onClick={onClick}
    >
      {iconLeft && <Image src={iconLeft} alt="" width={24} height={24} />}
      <span>{children}</span>
      {iconRight && <Image src={iconRight} alt="" width={24} height={24} />}
    </button>
  );
};

export default Button;
