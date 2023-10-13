import Heading from "@components/ui/heading";
import React from "react";
import { IonlineClassStudent } from "../../../../types/server/props";

interface Iprops {
  student: IonlineClassStudent;
}
export default function Student({ student }: Iprops) {
  let { id, firstName, lastName, studentEmail, onlineClassId } = student;
  return (
    <>
      <div className="w-full mx-2 sm:mx-3 flex flex-col sm:flex-row justify-between py-2 sm:py-4 border-b border-solid border-mid-footer mr-2">
        <div className="flex w-full sm:w-1/3">
          <Heading>{firstName}</Heading>
          <Heading className="mx-2">{lastName}</Heading>
        </div>
        <div className="flex flex-col sm:flex-row w-full sm:w-2/3 justify-between sm:px-3">
          <Heading>{studentEmail}</Heading>
          <Heading>2023, October , 23</Heading>
        </div>
      </div>
    </>
  );
}
