import { CSSProperties, ReactNode } from "react";
import styles from "./Section.module.scss";

interface Props {
  children: ReactNode;
  style?: CSSProperties;
  bgColor?:
    | "deepRed"
    | "lightGray"
    | "darkGray"
    | "pureBlack"
    | "pureWhite"
    | "purple"
    | "yellow"
    | "constructionSite";
}

const Section = ({ children, style, bgColor = "pureWhite" }: Props) => {
  return (
    <section className={`${styles.section} ${styles[bgColor]}`} style={style}>
      {children}
    </section>
  );
};

export default Section;
