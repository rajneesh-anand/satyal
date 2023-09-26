import React, { useState, useEffect, useRef } from "react";
import Container from "@components/ui/container";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps, GetStaticProps } from "next";
import { getSession, useSession } from "next-auth/react";
import TeacherDashboardLayout from "@components/layout-dashboard-teacher";
import Notice from "@components/common/onlineClass/Notice";
import { Button } from "@components/ui/button/dashboard-button";
import { ButtonSize, ButtonType } from "../../../../enums/buttons";
import Modal from "@components/common/modal/modal";
import Workshite from "@components/teacher/onlineclass/workshite";
import Studentlist from "@components/teacher/onlineclass/studentlist";
import AddNote from "@components/teacher/note/addnode";
import Addmeetinglink from "@components/teacher/onlineclass/addmeetinglink";

export default function ClassID() {
  let[modalState,setModalState]=useState(false);
  let[modalComponent,setModalComponent]=useState<string>('');
  let [teacherNote,setTeacherNote]=useState<string>('');
  let handelwork = () => {};
  // modal state handeler function
  let handelNoteModalState=()=>{
    setModalState((state)=>!state);
  }
  // changing modal component handeler
  let handelModalComponent=(component:string)=>{
    setModalComponent(component);
    handelNoteModalState();
  }
  // handel to sebmit teacher note
  let handelSubmitNote=()=>{}
  return (
    <>
      <TeacherDashboardLayout>
        <section className="sm:pb-[0px] pb-[70px]">
          <div className="sm:px-[30px] lg:px-[50px] my-2 py-2 flex justify-between items-center ">
            <div className=" w-[80px] sm:w-[200px] h-[80px] sm:h-[100px] border border-solid border-black"></div>
            <div className="w-5/6 sm:w-4/6 lg:w-3/6 flex justify-between pl-3 sm:pl-0">
              <Button
                onClick={()=>handelModalComponent('WORKSHIRT_COMPONENT')}
                type={ButtonType.Secondary}
                size={ButtonSize.Large}
                className="hidden sm:block "
              >
                WORKSHEET
              </Button>
              <Button 
              type={ButtonType.Other}
              size={ButtonSize.Large}
              onClick={()=>handelModalComponent('ADD_LINK')}
              className=" bg-secondary-background text-dark-footer border-2 border-solid border-dark-footer hover:bg-dark-footer hover:text-white"
              >ADD LINK</Button>
              <a href="/" target="blank" className="rounded-lg transition-all duration-300  ease-in-out hover:transition-all  px-3 sm:px-4 text-md font-bold  py-1 sm:py-2 bg-dark-footer text-white  hover:bg-white hover:text-dark-footer border-2 border-solid border-dark-footer">
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
                onClick={()=>handelModalComponent('STUDENT_LIST')}
                type={ButtonType.Secondary}
                size={ButtonSize.Medium}
              >
                VIEW STUDENTS
              </Button>
            </div>
            <div className="w-full h-[350px] sm:h-full flex flex-col items-center sm:w-4/6 ">
              <h2 className="text-xl font-bold text-dark-footer ">NOTES</h2>
              <div className="w-full flex flex-col mt-2 bg-white py-2 px-2 lg:px-4 rounded-xl h-full overflow-hidden">
                <div>
                  <Button
                    onClick={()=>handelModalComponent('ADD_NOTE')}
                    type={ButtonType.Secondary}
                    size={ButtonSize.Medium}
                  >
                    ADD NOTE
                  </Button>
                </div>
                <div className="w-full h-full px-4 py-2 overflow-y-auto ">
                  <Notice />
                </div>
              </div>
            </div>
          </div>
        </section>
      </TeacherDashboardLayout>
      <Modal open={modalState} onClose={handelNoteModalState}>
        {(modalComponent==='WORKSHIRT_COMPONENT')?
        (<Workshite/>)
        :(modalComponent==='STUDENT_LIST')?
        (<Studentlist/>)
        :(modalComponent==='ADD_NOTE')?
        (<AddNote teacherNote={teacherNote} setTeacherNote={setTeacherNote} handelSubmitNote={handelSubmitNote}/>)
        :(modalComponent==='ADD_LINK')?
        (<Addmeetinglink/>)
        :(null)}
        
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

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/teacher/${session?.user?.id}`
  );
  const data = await res.json();

  return {
    props: {
      teacher: data.data,
      ...(await serverSideTranslations(context.locale!, [
        "common",
        "forms",
        "menu",
        "footer",
      ])),
    },
  };
};
