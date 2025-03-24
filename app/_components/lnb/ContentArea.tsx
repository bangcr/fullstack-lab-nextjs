import React from "react";
import styles from "./ContentArea.module.scss";

const ContentArea = ({ children }: { children: React.ReactNode }) => {
  return <section className={styles.container}>{children}</section>;
};

export default ContentArea;
