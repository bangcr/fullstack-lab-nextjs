import React from "react";
import Section from "../layout/Section";
import Inner from "../layout/Inner";
import Button from "../atoms/Button";
import { ArrowRightWhite } from "@/lib/constants/imagePath";
import styles from "./Section1.module.scss";
const Section1 = () => {
  return (
    <Section bgColor="constructionSite">
      <Inner>
        <div className={styles.glassBox}>가나다</div>
      </Inner>
    </Section>
  );
};

export default Section1;
