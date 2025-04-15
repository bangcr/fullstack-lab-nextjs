import { CSSProperties, ReactNode } from "react";
import styles from "./Inner.module.scss";

interface Props {
  children: ReactNode;
  style?: CSSProperties;
}

const Inner = ({ children, style }: Props) => {
  return (
    <div className={styles.inner} style={style}>
      {children}
    </div>
  );
};

export default Inner;
