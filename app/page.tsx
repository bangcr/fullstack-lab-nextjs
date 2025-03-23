import Image from "next/image";
import styles from "./page.module.css";
import Section1 from "./_components/sections/Section1";
import Section2 from "./_components/sections/Section2";
import Section3 from "./_components/sections/Section3";
import Section4 from "./_components/sections/Section4";
import Section5 from "./_components/sections/Section5";
import Section6 from "./_components/sections/Section6";
import Section7 from "./_components/sections/Section7";
import Section8 from "./_components/sections/Section8";
import Section10 from "./_components/sections/Section10";

export default function Home() {
  return (
    <main>
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
      <Section6 />
      <Section7 />
      <Section8 />
      <Section8 />
      <Section10 />
    </main>
  );
}
