// app/_components/AccordionItem.tsx
"use client";

import React from "react";
import Link from "next/link";
import styles from "./AccordionItem.module.scss";
import { IconCaretDownGray, IconCaretUpGray } from "@/lib/constants/imagePath";
import Image from "next/image";
interface MenuItem {
  id: number;
  type: "menu" | "subMenu" | "groupTitle";
  text: string;
  path: string | null;
  parentId?: number;
  children?: MenuItem[] | null;
}

interface AccordionItemProps {
  item: MenuItem;
}

export const AccordionItem = ({ item }: AccordionItemProps) => {
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
          {item.text}
        </Link>
      </li>
    );
  }

  return (
    <li className={styles.menuItem}>
      <p className={styles.parentItem} onClick={() => setIsOpen(!isOpen)}>
        <span>{item.text}</span>
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
              {child.text}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
};
