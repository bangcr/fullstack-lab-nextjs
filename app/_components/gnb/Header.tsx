import { navList } from "@/lib/constants/text/header";
import Link from "next/link";
import React from "react";
import styles from "./Header.module.scss";
import Inner from "../layout/Inner";
import { HeaderLogo } from "@/lib/constants/imagePath";
import Image from "next/image";
import ThemeToggle from "../atoms/ThemeToggle";

const Header = () => {
  return (
    <header className={styles.header}>
      <Inner>
        <nav className={styles.nav}>
          <div>
            <Link href="/">
              <Image
                src={HeaderLogo}
                alt="난개발 지역"
                width={255}
                height={36}
              />
            </Link>
          </div>
          <div className={styles.rightSection}>
            <ul className={styles.navList}>
              {navList.map((item, idx) => (
                <li key={idx} className={styles.navItem}>
                  {item.children ? (
                    <>
                      <span>{item.text}</span>
                      <div className={styles.subMenu}>
                        <ul>
                          {item.children.map((subItem, subIdx) => (
                            <li key={subIdx}>
                              <Link
                                className={styles.subMenuItem}
                                href={subItem.path}
                                {...(subItem.path.includes("http")
                                  ? {
                                      target: "_blank",
                                      rel: "noopener noreferrer",
                                    }
                                  : {})}
                              >
                                {subItem.text}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  ) : (
                    <Link
                      href={item.path}
                      {...(item.path.includes("http")
                        ? {
                            target: "_blank",
                            rel: "noopener noreferrer",
                          }
                        : {})}
                    >
                      {item.text}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
            <ThemeToggle />
          </div>
        </nav>
      </Inner>
    </header>
  );
};

export default Header;
