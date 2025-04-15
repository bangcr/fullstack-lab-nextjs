import React, { CSSProperties, ReactNode } from "react";
import styles from "./ResponsibleFlex.module.scss";

interface Props {
  children: ReactNode;
}

const ResponsibleFlex = ({ children }: Props) => {
  return <div className={styles.container}>{children}</div>;
};

export default ResponsibleFlex;
