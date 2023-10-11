import Heading from "@components/ui/heading";
import React from "react";
import { HeadingType } from "../../../../enums/tittle";

export default function Studentlist({ students }) {
  console.log(students);

  return (
    <>
      <section className="min-w-[350px] h-[580px] sm:w-[800px] sm:h-[800px] lg:w-[1100px] lg:h-[700px] bg-secondary-background opacity-100 rounded-lg py-3 px-3 sm:px-6">
        <div className="flex justify-center">
          <Heading variant={HeadingType.Heading}>Student's List</Heading>
        </div>
        <div className=" py-1 sm:py-3 w-full border-t border-solid border-mid-footer overflow-hidden">
          {students.length > 0 ? (
            <div className="w-full "></div>
          ) : (
            <div className="w-full ">
              <h1>No STUDENT</h1>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
