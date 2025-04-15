import React from "react";
import SideBar from "../_components/Side-bar/SideBar";
import Inner from "../_components/layout/Inner";
import ContentArea from "../_components/lnb/ContentArea";
import SideBarContainer from "../_components/Side-bar/SideBarContainer";
import { MenuDataType } from "@/types/menu";

// // 데이터 페칭 함수
// async function getData() {
//   const res = await fetch("https://api.example.com/data", {
//     next: { revalidate: 3600 }, // 1시간마다 재검증
//   });

//   if (!res.ok) {
//     throw new Error("Failed to fetch data");
//   }

//   return res.json();
// }

const Layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <Inner>
      <SideBarContainer>{children}</SideBarContainer>
    </Inner>
  );
};

export default Layout;
