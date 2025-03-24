import React from "react";
import SideBar from "../_components/lnb/SideBar";
import Inner from "../_components/layout/Inner";
import ContentArea from "../_components/lnb/ContentArea";
import SideBarContainer from "../_components/layout/SideBarContainer";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Inner>
      <SideBarContainer>{children}</SideBarContainer>
    </Inner>
  );
};

export default layout;
