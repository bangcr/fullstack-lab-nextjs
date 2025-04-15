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
import { MenuItemType } from "@/types/menu";

interface Props {
  item: MenuItemType;
}

export const AccordionItem = ({ item }: Props) => {
  const [isOpen, setIsOpen] = React.useState(true);

  if (item.children?.length === 0) {
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
            <span>{item.text}</span>
          </div>
        </Link>
      </li>
    );
  }

  return (
    <li className={styles.menuItem}>
      <div className={styles.parentItem} onClick={() => setIsOpen(!isOpen)}>
        <div className={styles.parentItemContent}>
          <span>{item.text}</span>
        </div>
        {(item.children || []).length > 0 && (
          <Image
            src={isOpen ? IconCaretUpGray : IconCaretDownGray}
            alt="icon"
            width={18}
            height={18}
          />
        )}
      </div>
      <ul className={styles.childMenuList}>
        {(item.children || []).map((child) => (
          <li
            key={child.id}
            className={`${styles.childMenuItem} ${!isOpen ? styles.close : ""}`}
          >
            <Link href={child.path || "#"} className={styles.childItem}>
              <div className={styles.childItemContent}>
                <span>{child.text}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
};
