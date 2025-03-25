import React from "react";
import Inner from "./Inner";
import SideBar from "../lnb/SideBar";
import ContentArea from "../lnb/ContentArea";
import styles from "./SideBarContainer.module.scss";
import AccordionMenu from "../AccordionMenu";

const SideBarContainer = ({
  children,
  sideBarData,
}: {
  children: React.ReactNode;
  sideBarData: any;
}) => {
  return (
    <div className={styles.container}>
      <SideBar>
        <AccordionMenu menuData={sideBarData} />
      </SideBar>
      <ContentArea>{children}</ContentArea>
    </div>
  );
};

export default SideBarContainer;
