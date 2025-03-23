import React from "react";
import styles from "./HeaderMobile.module.scss";
import Image from "next/image";
import { HeaderLogo, HamburgerGray } from "@/lib/constants/imagePath";

const HeaderMobile = () => {
  return (
    <header className={styles.header}>
      <Image src={HeaderLogo} alt="난개발 지역" width={170} height={24} />
      <button className="hamburger">
        <Image src={HamburgerGray} alt="메뉴" width={24} height={24} />
      </button>
    </header>
  );
};

export default HeaderMobile;
