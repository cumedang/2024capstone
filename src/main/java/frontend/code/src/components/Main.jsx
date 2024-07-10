import React from "react";
import { SectionsContainer, Section } from "react-fullpage";
import Session1 from "./sessoin/Session1";
import Session2 from "./sessoin/Session2";
import Session3 from "./sessoin/Session3";

let options = {
  anchors: ["sectionOne", "sectionTwo", "sectionThree"],
};

const Main = () => {
  return (
    <>
      <SectionsContainer {...options}>
        <Section>
          <Session1 />
        </Section>
        <Section>
          <Session2 />
        </Section>
        <Section>
          <Session3 />
        </Section>
      </SectionsContainer>
    </>
  );
};

export default Main;
