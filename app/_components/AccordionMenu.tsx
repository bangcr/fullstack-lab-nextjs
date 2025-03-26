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
  type: "menu" | "subMenu" | "groupTitle";
  text: string;
  path: string | null;
  parentId?: number;
  children?: MenuItem[] | null;
}

interface MenuGroup {
  groupTitle: string;
  children: MenuItem[];
}

interface DataStructure {
  title: string;
  menu: MenuGroup[];
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

  return (
    <nav className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.menuTitle}>{menuData.title}</h2>
        <Button onClick={() => setEditMode(!editMode)} theme="black">
          {editMode ? "저장" : "편집"}
        </Button>
      </div>
      <ul>
        {menuList.map((group, groupIdx) => (
          <li
            key={groupIdx}
            data-index={groupIdx} // 이 부분 추가
            className={styles.groupItem}
            draggable={editMode}
            onDragStart={() => handleDragStart(groupIdx)}
            onDragEnd={handleDragEnd}
            onDragOver={(e) => handleDragOver(e, groupIdx)}
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
              <h3 className={styles.groupTitle}>{group.groupTitle}</h3>
            </div>
            <ul>
              {group.children.map((item, itemIdx) => (
                <AccordionItem key={itemIdx} item={item} editMode={editMode} />
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default AccordionMenu;
