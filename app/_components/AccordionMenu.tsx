"use client";

import styles from "./AccordionMenu.module.scss";
import { AccordionItem } from "./AccordionItem";
import { useEffect, useState } from "react";
import Button from "./atoms/Button";
import Image from "next/image";
import { IconMoveHandler } from "@/lib/constants/imagePath";
import { useDraggableList } from "@/hooks/useDraggableList";

interface MenuItem {
  id: number;
  parentId: number | null;
  type: "menu" | "subMenu" | "group";
  text: string;
  path: string | null;
  children: MenuItem[] | null;
}

interface DataStructure {
  title: string;
  menu: MenuItem[];
}
interface Props {
  menuData: DataStructure;
}

const AccordionMenu = ({ menuData }: Props) => {
  const [editMode, setEditMode] = useState(false);

  const {
    items: menuList,
    setItems: setMenuList,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
  } = useDraggableList({
    initialItems: [],
    isEnabled: editMode,
    dragClassName: styles.dragging,
  });

  useEffect(() => {
    setMenuList(menuData.menu);
  }, [menuData]);

  // 중간 및 하위 메뉴 아이템 업데이트 처리
  const handleItemsUpdate = (updatedItems: MenuItem[], parentId?: number) => {
    const newMenuList = menuList.map((group) => ({
      ...group,
      children: group.children.map((item) => {
        if (item.id === parentId) {
          return {
            ...item,
            children: updatedItems,
          };
        }
        return item;
      }),
    }));
    setMenuList(newMenuList);
  };

  return (
    <nav className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.menuTitle}>{menuData.title}</h2>
        <Button onClick={() => setEditMode(!editMode)} theme="black">
          {editMode ? "저장" : "편집"}
        </Button>
      </div>
      <ul>
        {menuList.map((group) => (
          <li
            key={group.id}
            data-index={group.id} // 이 부분 추가
            className={styles.groupItem}
            draggable={editMode}
            onDragStart={(e) => handleDragStart(e, group.id)}
            onDragEnd={handleDragEnd}
            onDragOver={(e) => handleDragOver(e, group.id)}
          >
            <div className={styles.groupItemContent}>
              {editMode && (
                <Image
                  src={IconMoveHandler}
                  alt="icon"
                  width={12}
                  height={12}
                />
              )}
              <h3 className={styles.groupTitle}>{group.text}</h3>
            </div>
            <ul>
              {group.children.map((item) => (
                <AccordionItem
                  key={item.id}
                  item={item}
                  editMode={editMode}
                  onItemsUpdate={handleItemsUpdate}
                  parentId={group.id}
                />
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default AccordionMenu;
