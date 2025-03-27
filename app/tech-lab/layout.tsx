import React from "react";
import SideBar from "../_components/lnb/SideBar";
import Inner from "../_components/layout/Inner";
import ContentArea from "../_components/lnb/ContentArea";
import SideBarContainer from "../_components/layout/SideBarContainer";

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
  // const data = await getData();

  const data = {
    title: "Tech Lab",
    menu: [
      {
        id: 1,
        parentId: null,
        type: "group",
        text: "inside",
        path: null,
        children: [
          {
            id: 2,
            parentId: 1,
            type: "menu",
            text: "Deep Dive",
            path: null,
            children: [
              {
                id: 3,
                parentId: 2,
                type: "subMenu",
                text: "Java Script",
                path: "/deep-dive/javascript",
              },
              {
                id: 4,
                parentId: 2,
                type: "subMenu",
                text: "React",
                path: "/deep-dive/react",
              },
              {
                id: 5,
                parentId: 2,
                type: "subMenu",
                text: "Next.js",
                path: "/deep-dive/nextjs",
              },
              {
                id: 6,
                parentId: 2,
                type: "subMenu",
                text: "React Native",
                path: "/deep-dive/react-native",
              },
            ],
          },
          {
            id: 7,
            parentId: 1,
            type: "menu",
            text: "Tech Lab",
            path: null,
            children: [
              {
                id: 8,
                parentId: 7,
                type: "subMenu",
                text: "Web",
                path: "/tech-lab/web",
              },
              {
                id: 9,
                parentId: 7,
                type: "subMenu",
                text: "Server / DB",
                path: "/tech-lab/server-db",
              },
              {
                id: 10,
                parentId: 7,
                type: "subMenu",
                text: "App",
                path: "/tech-lab/app",
              },
            ],
          },
          {
            id: 11,
            parentId: 1,
            type: "menu",
            text: "Story Book",
            path: null,
            children: [
              {
                id: 12,
                parentId: 11,
                type: "subMenu",
                text: "Atom",
                path: "/story-book/atom",
              },
              {
                id: 13,
                parentId: 11,
                type: "subMenu",
                text: "Molecule",
                path: "/story-book/molecule",
              },
            ],
          },
        ],
      },
      {
        id: 14,
        parentId: null,
        type: "group",
        text: "Redirect",
        path: null,
        children: [
          {
            id: 15,
            parentId: 14,
            type: "menu",
            text: "Velog",
            path: "https://velog.io/@bcl0206/posts",
            children: null,
          },
          {
            id: 16,
            parentId: 14,
            type: "menu",
            text: "Github",
            path: "https://github.com/bangcr",
            children: null,
          },
        ],
      },
    ],
  };

  return (
    <Inner>
      <SideBarContainer sideBarData={data}>{children}</SideBarContainer>
    </Inner>
  );
};

export default Layout;
