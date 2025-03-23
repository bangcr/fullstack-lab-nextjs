import Image from "next/image";
import React from "react";
import styles from "./Button.module.scss";

interface Props {
  text: string;
  icon?: string;
}

const Button = ({ text, icon }: Props) => {
  return (
    <button className={styles.button}>
      <span>{text}</span>
      {icon && <Image src={icon} alt="" width={24} height={24} />}
    </button>
  );
};

export default Button;
