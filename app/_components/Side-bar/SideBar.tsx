import React from "react";
import styles from "./SideBar.module.scss";

const SideBar = ({ children }: { children: React.ReactNode }) => {
  return <section className={styles.container}>{children}</section>;
};

export default SideBar;
