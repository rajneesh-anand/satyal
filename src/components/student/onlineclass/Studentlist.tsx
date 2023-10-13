import Heading from "@components/ui/heading";
import React from "react";
import { HeadingType } from "../../../../enums/tittle";
import { IonlineClassStudent } from "../../../../types/server/props";
import Student from "@components/common/onlineClass/Student";

interface Iprops {
  students: IonlineClassStudent[];
}
export default function Studentlist({ students }: Iprops) {
  return (
    <>
      <section className="w-[350px] sm:w-[600px] lg:w-[1100px] h-[500px] sm:h-[700px] bg-secondary-background rounded-lg px-3 sm:px-4 py-3">
        <div className="w-full flex justify-center border-b border-solid border-mid-footer">
          <Heading variant={HeadingType.LargeTitle}>Student's List</Heading>
        </div>
        <div className=" py-1 sm:py-3 w-full border-t border-solid border-mid-footer overflow-hidden">
          {students?.length > 0 ? (
            students.map((student, index) => {
              return (
                <div
                  className="w-full flex justify-between  items-center my-1 sm:my-2"
                  key={student?.id}
                >
                  <p className="text-md sm:text-xl font-semibold text-dark-footer mr-1 sm:mr-2 flex">
                    <span className="inline-block">{index + 1}</span>
                    <span>.</span>
                  </p>
                  <Student student={student} />
                  {/* <div className="ml-2 sm:ml-4">
                    <Button
                      type={ButtonType.Secondary}
                      size={ButtonSize.Medium}
                      onClick={() =>
                        handelRemoveStudentState(
                          student?.studentEmail,
                          student?.onlineClassId
                        )
                      }
                    >
                      Remove
                    </Button>
                  </div> */}
                </div>
              );
            })
          ) : (
            <div className="w-full ">
              <Heading>No One Join This Class Yet</Heading>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
