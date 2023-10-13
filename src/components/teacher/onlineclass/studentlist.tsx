import Heading from "@components/ui/heading";
import React, { useState } from "react";
import { HeadingType } from "../../../../enums/tittle";
import { ButtonSize, ButtonType } from "../../../../enums/buttons";
import Student from "@components/common/onlineClass/Student";
// import Button from "@components/ui/button";
import { Button } from "@components/ui/button/dashboard-button";
import { IonlineClassStudent } from "../../../../types/server/props";
import Modal from "@components/common/modal/modal";
import { useSession } from "next-auth/react";
import axios from "axios";

interface Iprops {
  students: IonlineClassStudent[];
  setRefresh: React.Dispatch<any>;
}
export default function Studentlist({ students, setRefresh }: Iprops) {
  let { data: session } = useSession();
  let [modalState, setModalState] = useState(false);
  let [removeStudent, setRemoveStudent] = useState({
    studentEmail: null,
    onlineClassId: null,
  });
  // modal state handeler
  let handelModalState = () => {
    setModalState((state) => !state);
  };
  // remove student state handeler
  let handelRemoveStudentState = (
    studentEmail: string,
    onlineClassId: number
  ) => {
    handelModalState();
    setRemoveStudent({
      studentEmail,
      onlineClassId,
    });
  };
  // remove student cancel handeler
  let handelRemoveStudentCancel = () => {
    setRemoveStudent({
      studentEmail: null,
      onlineClassId: null,
    });
    handelModalState();
  };
  // removing student from DB
  let handelRemoveStudentFromDB = async () => {
    try {
      let removeStudentResponse = await axios.patch(
        `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/onlineClassTeacher/remove`,
        {
          onlineClassId: removeStudent?.onlineClassId,
          studentEmail: removeStudent?.studentEmail,
          teacherEmail: session?.user?.email,
        },
        { headers: { "Content-Type": "application/json" } }
      );
      if (removeStudentResponse?.status === 200) {
        handelModalState();
        setRefresh(removeStudentResponse);
      }
    } catch (err) {
      console.log(err);
    }
  };
  // console.log(removeStudent);

  return (
    <>
      <section className="min-w-[350px] h-[580px] sm:w-[800px] sm:h-[800px] lg:w-[1100px] lg:h-[700px] bg-secondary-background opacity-100 rounded-lg py-3 px-3 sm:px-6">
        <div className="flex justify-center">
          <Heading variant={HeadingType.Heading}>Student's List</Heading>
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
                  <div className="ml-2 sm:ml-4">
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
                  </div>
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
      <Modal onClose={handelModalState} open={modalState}>
        <div className="w-[270px] h-[250px] py-4 px-4 flex flex-col justify-between">
          <div className="text-center">
            <Heading variant={HeadingType.MediumHeading}>
              Remove Student?
            </Heading>
          </div>
          <div className="">
            <Heading className="font-normal">
              Are you sure you want to remove the student from your class?
            </Heading>
          </div>
          <div className="flex justify-between px-6 py-2">
            <Button
              type={ButtonType.Secondary}
              size={ButtonSize.Medium}
              onClick={handelRemoveStudentCancel}
            >
              cancel
            </Button>
            <Button
              type={ButtonType.Primary}
              size={ButtonSize.Medium}
              onClick={handelRemoveStudentFromDB}
            >
              Remove
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
