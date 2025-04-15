import React from "react";
import Section from "../layout/Section";
import Inner from "../layout/Inner";
import ResponsibleFlex from "../layout/ResponsibleFlex";
import Button from "../atoms/Button";
import { ArrowRightWhite } from "@/lib/constants/imagePath";

const Section2 = () => {
  return (
    <Section bgColor="darkGray">
      <Inner>
        <ResponsibleFlex>
          <span>
            <Button text="자세히 보기" icon={ArrowRightWhite} />
          </span>
        </ResponsibleFlex>
      </Inner>
    </Section>
  );
};

export default Section2;
