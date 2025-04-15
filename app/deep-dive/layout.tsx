import React from "react";
import Inner from "../_components/layout/Inner";
import SideBarContainer from "../_components/Side-bar/SideBarContainer";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Inner>
      <SideBarContainer>{children}</SideBarContainer>
    </Inner>
  );
};

export default layout;
