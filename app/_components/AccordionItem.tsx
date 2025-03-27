// app/_components/AccordionItem.tsx
"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import styles from "./AccordionItem.module.scss";
import {
  IconCaretDownGray,
  IconCaretUpGray,
  IconMoveHandler,
} from "@/lib/constants/imagePath";
import Image from "next/image";
import { useDraggableList } from "@/hooks/useDraggableList";
interface MenuItem {
  id: number;
  type: "menu" | "subMenu" | "groupTitle";
  text: string;
  path: string | null;
  parentId?: number;
  children?: MenuItem[] | null;
}

interface Props {
  item: MenuItem;
  editMode: boolean;
  onItemsUpdate: (updatedItems: MenuItem[], parentId?: number) => void;
  parentId?: number;
}

export const AccordionItem = ({
  item,
  editMode,
  onItemsUpdate,
  parentId,
}: Props) => {
  const [isOpen, setIsOpen] = React.useState(true);

  // 중간 레벨 메뉴 아이템을 위한 드래그 기능
  const {
    items: menuItems,
    setItems: setMenuItems,
    handleDragStart: handleMenuDragStart,
    handleDragEnd: handleMenuDragEnd,
    handleDragOver: handleMenuDragOver,
  } = useDraggableList<MenuItem>({
    initialItems: [],
    isEnabled: editMode,
    dragClassName: styles.dragging,
  });

  // 하위 메뉴 아이템을 위한 드래그 기능
  const {
    items: childItems,
    setItems: setChildItems,
    handleDragStart: handleChildDragStart,
    handleDragEnd: handleChildDragEnd,
    handleDragOver: handleChildDragOver,
  } = useDraggableList<MenuItem>({
    initialItems: item.children || [],
    isEnabled: editMode,
    dragClassName: styles.dragging,
  });

  useEffect(() => {
    if (item.children) {
      setChildItems(item.children);
    }
  }, [item.children]);

  // 하위 아이템 업데이트 시 부모에게 알림
  const handleChildrenUpdate = (updatedItems: MenuItem[]) => {
    onItemsUpdate?.(updatedItems, item.id);
  };

  if (!item.children) {
    return (
      <li
        className={styles.menuItem}
        draggable={editMode}
        data-index={item.id}
        onDragStart={(e) => handleMenuDragStart(e, item.id)}
        onDragEnd={handleMenuDragEnd}
        onDragOver={(e) => handleMenuDragOver(e, item.id)}
      >
        <Link
          href={item.path || "#"}
          className={styles.parentItem}
          {...(item.path?.includes("http")
            ? {
                target: "_blank",
                rel: "noopener noreferrer",
              }
            : {})}
          onClick={(e) => {
            if (editMode) {
              e.preventDefault(); // editMode일 때 링크 이동 막기
            }
          }}
        >
          <div className={styles.parentItemContent}>
            {editMode && (
              <Image src={IconMoveHandler} alt="icon" width={12} height={12} />
            )}
            <span>{item.text}</span>
          </div>
        </Link>
      </li>
    );
  }

  return (
    <li
      className={styles.menuItem}
      draggable={editMode}
      data-index={item.id}
      onDragStart={(e) => handleMenuDragStart(e, item.id)}
      onDragEnd={handleMenuDragEnd}
      onDragOver={(e) => handleMenuDragOver(e, item.id)}
    >
      <div className={styles.parentItem} onClick={() => setIsOpen(!isOpen)}>
        <div className={styles.parentItemContent}>
          {editMode && (
            <Image src={IconMoveHandler} alt="icon" width={12} height={12} />
          )}
          <span>{item.text}</span>
        </div>
        <Image
          src={isOpen ? IconCaretUpGray : IconCaretDownGray}
          alt="icon"
          width={18}
          height={18}
        />
      </div>
      <ul className={styles.childMenuList}>
        {item.children.map((child) => (
          <li
            key={child.id}
            data-index={child.id} // {`${item.id}-${childIdx}`}
            className={`${styles.childMenuItem} ${!isOpen ? styles.close : ""}`}
            draggable={editMode}
            onDragStart={(e) => handleChildDragStart(e, child.id)}
            onDragEnd={handleChildDragEnd}
            onDragOver={(e) => handleChildDragOver(e, child.id)}
          >
            {/* <div className={styles.test}> */}
            <Link
              href={child.path || "#"}
              className={styles.childItem}
              onClick={(e) => {
                if (editMode) {
                  e.preventDefault(); // editMode일 때 링크 이동 막기
                }
              }}
            >
              <div className={styles.childItemContent}>
                {editMode && (
                  <Image
                    src={IconMoveHandler}
                    alt="icon"
                    width={12}
                    height={12}
                  />
                )}
                <span>{child.text}</span>
              </div>
            </Link>
            {/* </div> */}
          </li>
        ))}
      </ul>
    </li>
  );
};
