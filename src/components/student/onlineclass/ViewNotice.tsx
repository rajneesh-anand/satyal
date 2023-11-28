import Heading from "@components/ui/heading";
import React from "react";
import { HeadingType } from "../../../../enums/tittle";
import { IonlineClassNote } from "../../../../types/server/props";
import Notice from "@components/common/onlineClass/Notice";

interface Iprop {
  notes: IonlineClassNote[];
}

export default function ViewNotice({ notes }: Iprop) {
  console.log(notes);

  return (
    <>
      <section className="w-[350px] sm:w-[780px] h-[600px] sm:h-[650px] lg:w-[900px] bg-secondary-background rounded-lg px-4 sm:px-6 py-3 flex flex-col">
        <div className="w-full flex justify-center border-b border-solid border-mid-footer">
          <Heading variant={HeadingType.MediumHeading}>ALL NOTICE</Heading>
        </div>
        <div className="w-full h-full overflow-y-auto py-0 sm:py-4 ">
          {notes.length > 0 ? (
            notes?.map((note) => {
              return <Notice note={note} key={note?.id} />;
            })
          ) : (
            <div className="flex justify-center py-2 sm:py-4">
              <Heading variant={HeadingType.Base}>
                There aren’t any note from the teacher!
              </Heading>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
