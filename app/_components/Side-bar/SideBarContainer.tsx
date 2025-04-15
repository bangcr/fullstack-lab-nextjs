"use client";

import React, { useEffect, useState } from "react";
import Inner from "../layout/Inner";
import SideBar from "./SideBar";
import ContentArea from "../lnb/ContentArea";
import styles from "./SideBarContainer.module.scss";
import AccordionMenu from "./AccordionMenu";
import EditAccordionMenu from "./EditAccordionMenu";
import { MenuDataType, MenuItemType } from "@/types/menu";
import Button from "../atoms/Button";
import { menuService } from "@/app/lib/services/menu";
import { usePathname } from "next/navigation";
import { capitalize } from "@/app/lib/util/format";

const SideBarContainer = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const [editMode, setEditMode] = useState(false);

  const [flatMenuList, setFlatMenuList] = useState<MenuItemType[]>([]);

  // 현재 경로에서 카테고리 추출
  const getCurrentCategory = () => {
    const paths = pathname.split("/").filter(Boolean);
    return paths[1] || ""; // 두 번째 경로 세그먼트 추출
  };

  const getList = async () => {
    const res = await menuService.getMenuList(getCurrentCategory());
    setFlatMenuList(res.data);
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <div className={styles.container}>
      <SideBar>
        <div className={styles.header}>
          <h1>{capitalize(getCurrentCategory())}</h1>
          {editMode ? (
            <Button theme="black" onClick={() => setEditMode(false)}>
              취소
            </Button>
          ) : (
            <Button theme="black" onClick={() => setEditMode(true)}>
              편집
            </Button>
          )}
        </div>
        {editMode ? (
          <EditAccordionMenu
            flatMenuList={flatMenuList}
            setEditMode={setEditMode}
            fetchApi={getList}
          />
        ) : (
          <AccordionMenu flatMenuList={flatMenuList} />
        )}
      </SideBar>
      <ContentArea>{children}</ContentArea>
    </div>
  );
};

export default SideBarContainer;
