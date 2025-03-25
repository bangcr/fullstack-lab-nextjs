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
        groupTitle: "inside",
        children: [
          {
            id: 1,
            type: "menu",
            text: "Deep Dive",
            path: null,
            children: [
              {
                id: 2,
                parentId: 1,
                type: "subMenu",
                text: "Java Script",
                path: "/deep-dive/javascript",
              },
              {
                id: 3,
                parentId: 1,
                type: "subMenu",
                text: "React",
                path: "/deep-dive/react",
              },
              {
                id: 4,
                parentId: 1,
                type: "subMenu",
                text: "Next.js",
                path: "/deep-dive/nextjs",
              },
              {
                id: 4,
                type: "subMenu",
                text: "React Native",
                path: "/deep-dive/react-native",
              },
            ],
          },
          {
            id: 5,
            type: "menu",
            text: "Tech Lab",
            path: null,
            children: [
              {
                id: 6,
                parentId: 5,
                type: "subMenu",
                text: "Web",
                path: "/tech-lab/web",
              },
              {
                id: 7,
                parentId: 5,
                type: "subMenu",
                text: "Server / DB",
                path: "/tech-lab/server-db",
              },
              { id: 8, type: "subMenu", text: "App", path: "/tech-lab/app" },
            ],
          },
          {
            id: 9,
            type: "menu",
            text: "Story Book",
            path: null,
            children: [
              {
                id: 10,
                parentId: 9,
                type: "subMenu",
                text: "Atom",
                path: "/story-book/atom",
              },
              {
                id: 11,
                parentId: 9,
                type: "subMenu",
                text: "Molecule",
                path: "/story-book/molecule",
              },
            ],
          },
        ],
      },
      {
        groupTitle: "Redirect",
        children: [
          {
            id: 12,
            type: "menu",
            text: "Velog",
            path: "https://velog.io/@bcl0206/posts",
            children: null,
          },
          {
            id: 13,
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
