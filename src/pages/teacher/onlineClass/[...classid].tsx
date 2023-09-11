import React, { useState, useEffect, useRef } from "react";
import Container from "@components/ui/container";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps, GetStaticProps } from "next";
import { getSession, useSession } from "next-auth/react";
import TeacherDashboardLayout from "@components/layout-dashboard-teacher";
import Notice from "@components/common/onlineClass/Notice";
import { Button } from "@components/ui/button/dashboard-button";
import {ButtonSize,ButtonType} from '../../../../enums/buttons';

export default function ClassID() {
 let handelwork=()=>{ }
  return (
    <>
    <TeacherDashboardLayout>
        <section className="sm:pb-[0px] pb-[70px]">
         <div className="sm:px-[30px] lg:px-[50px] my-2 py-2 flex justify-between items-center ">
            <div className=" w-[80px] sm:w-[200px] h-[80px] sm:h-[100px] border border-solid border-black"></div>
            <div className="w-5/6 sm:w-3/6 lg:w-2/6 flex justify-between ">
              <Button onClick={handelwork} type={ButtonType.Secondary} size={ButtonSize.Large}>WORKSHEET</Button>
             <Button onClick={handelwork} type={ButtonType.Primary} size={ButtonSize.Large}>JOIN CLASS</Button>
            </div>
         </div>
         <div className="w-full h-[500px] sm:h-[450px]  lg:w-5/6 px-3 sm:px-6 py-3 sm:py-6 mx-auto flex flex-col sm:flex-row my-4 sm:my-6 rounded-xl bg-secondary-background ">
            <div className="h-[120px] mb-[30px] sm:mb-0 sm:h-full flex flex-col items-center justify-center w-full sm:w-2/6 ">
              <div className=" py-2 sm:my-6 text-center">
                <span className="text-xl sm:text-2xl font-bold text-dark-footer">30</span>
                 <h3 className="text-xl sm:text-2xl font-semibold text-dark-footer">Join Students</h3>
              </div>
               <Button onClick={handelwork} type={ButtonType.Secondary} size={ButtonSize.Medium}>VIEW STUDENTS</Button>
            </div>
            <div className="w-full h-[350px] sm:h-full flex flex-col items-center sm:w-4/6 ">
              <h2 className="text-xl font-bold text-dark-footer ">NOTES</h2>
              <div className="w-full flex flex-col mt-2 bg-white py-2 px-2 lg:px-4 rounded-xl h-full overflow-hidden">
                <div >
                  <Button onClick={handelwork} type={ButtonType.Secondary} size={ButtonSize.Medium}>ADD NOTE</Button>

                </div>
                <div className="w-full h-full px-4 py-2 overflow-y-auto ">
                   <Notice/>
                  
                </div>
              </div>
            </div>
         </div>
         
        </section>
    
    </TeacherDashboardLayout>
      
    </>
  )
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
  