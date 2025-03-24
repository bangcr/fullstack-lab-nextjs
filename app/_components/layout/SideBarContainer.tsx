import React from "react";
import Inner from "./Inner";
import SideBar from "../lnb/SideBar";
import ContentArea from "../lnb/ContentArea";
import styles from "./SideBarContainer.module.scss";

const SideBarContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.container}>
      <SideBar>사이드 바</SideBar>
      <ContentArea>{children}</ContentArea>
    </div>
  );
};

export default SideBarContainer;
