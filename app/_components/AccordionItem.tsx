// app/_components/AccordionItem.tsx
"use client";

import React from "react";
import Link from "next/link";
import styles from "./AccordionItem.module.scss";
import {
  IconCaretDownGray,
  IconCaretUpGray,
  IconMoveHandler,
} from "@/lib/constants/imagePath";
import Image from "next/image";
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
}

export const AccordionItem = ({ item, editMode }: Props) => {
  const [isOpen, setIsOpen] = React.useState(true);

  if (!item.children) {
    return (
      <li className={styles.menuItem}>
        <Link
          href={item.path || "#"}
          className={styles.parentItem}
          {...(item.path?.includes("http")
            ? {
                target: "_blank",
                rel: "noopener noreferrer",
              }
            : {})}
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
    <li className={styles.menuItem}>
      <p className={styles.parentItem} onClick={() => setIsOpen(!isOpen)}>
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
      </p>
      <ul className={styles.childMenuList}>
        {item.children.map((child, childIdx) => (
          <li
            key={childIdx}
            className={`${styles.childMenuItem} ${!isOpen ? styles.close : ""}`}
          >
            <Link href={child.path || "#"} className={styles.childItem}>
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
          </li>
        ))}
      </ul>
    </li>
  );
};
