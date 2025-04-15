import React from "react";
import Section from "../layout/Section";
import Inner from "../layout/Inner";

const Section3 = () => {
  return (
    <Section bgColor="lightGray">
      <Inner>
        <div style={{ background: "red" }}>섹션1</div>
      </Inner>
    </Section>
  );
};

export default Section3;
