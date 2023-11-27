import Heading from "@components/ui/heading";
import React from "react";
import { HeadingType } from "../../../../enums/tittle";

export default function Workshirt() {
  return (
    <>
      <section className="w-[350px] sm:w-[700px] lg:w-[1200px] h-[650px] bg-secondary-background py-3 px-4 rounded-lg">
        <div className="w-full flex justify-center border-b border-solid border-mid-footer">
          <Heading variant={HeadingType.LargeTitle}>WORKSHEET</Heading>
        </div>
      </section>
    </>
  );
}
