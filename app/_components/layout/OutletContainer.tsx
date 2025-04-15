import React, { ReactNode } from "react";
import styles from "./OutletContainer.module.scss";

interface Props {
  children: ReactNode;
}

const OutletContainer = ({ children }: Props) => {
  return <div className={styles.container}>{children}</div>;
};

export default OutletContainer;
