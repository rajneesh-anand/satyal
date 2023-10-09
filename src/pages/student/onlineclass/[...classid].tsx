import React, { useState, FormEvent } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps, GetStaticProps } from "next";
import { getSession, useSession } from "next-auth/react";
import StudentDashboardLayout from "@components/layout-dashboard-student";
import Seo from "@components/seo/seo";
import { ButtonSize, ButtonType } from "../../../../enums/buttons";
import { HeadingType } from "../../../../enums/tittle";
import { Button } from "@components/ui/button/dashboard-button";
import Modal from "@components/common/modal/modal";
import Notice from "@components/common/onlineClass/Notice";
import Workshirt from "@components/student/onlineclass/Workshirt";
import Studentlist from "@components/student/onlineclass/Studentlist";
import ViewNotice from "@components/student/onlineclass/ViewNotice";

export default function OnlineClassId() {
  let [modalState, setModalState] = useState(false);
  let [modalComponent, setModalComponent] = useState<string>("");
  let handelbutton = () => {}; //this is only to pass props in button

  // modal close handeler function
  let handelNoteModalState = () => {
    setModalState((state) => !state);
  };
  // changing modal componet
  let handelModalComponent = (component: string) => {
    setModalComponent(component);
    handelNoteModalState();
  };
  return (
    <>
      <Seo
        title="Satyal Online Learning"
        description='Satyal Publication has been in the educational publishing industry for more than 30 years. We started from a book shop 42 years ago in Biratnagar which transformed into the largest and one of the leading educational publishing house in the later days. Today, we are here as a new firm to change the way we educate our loved ones. This change, we are seeking to digitalize the education sector. "Lets Change The Way We Educate Our Loved Ones!"'
        path="/"
      />

      <StudentDashboardLayout>
        <section className="sm:pb-[0px] pb-[70px]">
          <div className=" px-3 sm:px-[30px] lg:px-[50px] my-2 py-2 flex justify-between items-center ">
            <div className=" w-[80px] sm:w-[200px] h-[80px] sm:h-[100px] mr-3 sm:mr-0 border border-solid border-black"></div>
            <div className="w-5/6 sm:w-3/6 lg:w-2/6 flex justify-between">
              <Button
                onClick={() => handelModalComponent("WORKSHIRT_COMPONENT")}
                type={ButtonType.Secondary}
                size={ButtonSize.Large}
                className=""
              >
                WORKSHEET
              </Button>
              <a
                href="/"
                className="bg-dark-footer text-white  hover:bg-white hover:text-dark-footer border-2 border-solid border-dark-footer text-md font-bold  py-1 sm:py-2 rounded-lg transition-all duration-300  ease-in-out hover:transition-all  px-3 sm:px-4"
                target="blank"
              >
                JOIN CLASS
              </a>
            </div>
          </div>
          <div className="w-full h-[500px] sm:h-[450px]  lg:w-5/6 px-3 sm:px-6 py-3 sm:py-6 mx-auto flex flex-col sm:flex-row my-4 sm:my-6 rounded-xl bg-secondary-background ">
            <div className="h-[120px] mb-[30px] sm:mb-0 sm:h-full flex flex-col items-center justify-center w-full sm:w-2/6 ">
              <div className=" py-2 sm:my-6 text-center">
                <span className="text-xl sm:text-2xl font-bold text-dark-footer">
                  30
                </span>
                <h3 className="text-xl sm:text-2xl font-semibold text-dark-footer">
                  Join Students
                </h3>
              </div>
              <Button
                onClick={() => handelModalComponent("STUDENT_LIST_COMPONENT")}
                type={ButtonType.Secondary}
                size={ButtonSize.Medium}
              >
                VIEW STUDENTS
              </Button>
            </div>
            <div className="w-full h-[350px] sm:h-full flex flex-col items-center sm:w-4/6 ">
              <h2 className="text-xl font-bold text-dark-footer ">NOTICE</h2>
              <div className="w-full flex flex-col mt-2 bg-white py-2 px-2 lg:px-4 rounded-xl h-full overflow-hidden">
                {/* <div >
                      <Button onClick={()=>handelModalComponent('NOTE_COMPONENT')} type={ButtonType.Secondary} size={ButtonSize.Medium}>ADD NOTE</Button>

                    </div> */}
                <div className="w-full h-full px-4 py-2 overflow-y-auto ">
                  {/* <Notice/>   */}
                </div>
              </div>
              <div className="py-2 w-full flex justify-end">
                <Button
                  type={ButtonType.Secondary}
                  size={ButtonSize.Medium}
                  onClick={() => handelModalComponent("VIEW_NOTICE")}
                >
                  VIEW NOTICE
                </Button>
              </div>
            </div>
          </div>
        </section>
      </StudentDashboardLayout>
      <Modal open={modalState} onClose={handelNoteModalState}>
        {modalComponent === "WORKSHIRT_COMPONENT" ? (
          <Workshirt />
        ) : modalComponent === "VIEW_NOTICE" ? (
          <ViewNotice />
        ) : modalComponent === "STUDENT_LIST_COMPONENT" ? (
          <Studentlist />
        ) : null}
      </Modal>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }

  return {
    props: {
      ...(await serverSideTranslations(context.locale!, [
        "common",
        "forms",
        "menu",
        "footer",
      ])),
    },
  };
};
