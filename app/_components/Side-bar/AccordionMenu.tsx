"use client";

import styles from "./AccordionMenu.module.scss";
import { AccordionItem } from "@/app/_components/Side-bar/AccordionItem";
import { MenuDataType, MenuItemType } from "@/types/menu";
import { useEffect, useState } from "react";

interface Props {
  flatMenuList: MenuItemType[];
}

const AccordionMenu = ({ flatMenuList }: Props) => {
  const unflattenMenuItems = (flatItems: MenuItemType[]): MenuItemType[] => {
    const itemMap = new Map<string, MenuItemType>();
    const result: MenuItemType[] = [];

    // 1. 모든 아이템을 맵에 저장 (O(n))
    flatItems.forEach((item) => {
      itemMap.set(item.menuUid, { ...item, children: [] });
    });

    // 2. 부모-자식 관계 구성 (O(n))
    flatItems.forEach((item) => {
      const currentItem = itemMap.get(item.menuUid)!;
      if (item.parentId) {
        const parent = itemMap.get(item.parentId);
        if (parent) {
          if (!parent.children) {
            parent.children = [];
          }
          parent.children.push(currentItem);
        }
      } else {
        result.push(currentItem);
      }
    });

    return result;
  };

  return (
    <nav className={styles.container}>
      <ul>
        {unflattenMenuItems(flatMenuList).map((group) => (
          <li key={group.id} className={styles.groupItem}>
            <div className={styles.groupItemContent}>
              <h3 className={styles.groupTitle}>{group.text}</h3>
            </div>
            <ul>
              {group.children?.map((item: MenuItemType) => (
                <AccordionItem key={item.id} item={item} />
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default AccordionMenu;
