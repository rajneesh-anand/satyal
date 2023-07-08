import { useState, useEffect } from "react";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { QueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";
import { getSession } from "next-auth/react";
import Seo from "@components/seo/seo";
import Container from "@components/ui/container";
import Layout from "@components/layout";
import Card from "@components/common/card";
// import Image from "next/image";

import TeacherRegistrationForm from "@components/form/teacher";
import StudentRegistrationForm from "@components/form/student";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      ...(await serverSideTranslations(context.locale!, [
        "common",
        "forms",
        "menu",
        "footer",
      ])),
    },
  };
};

export default function RegisterPage() {
  const [renderForm, setRenderForm] = useState<string>("Student");

  const buttonHandler = (
    event: React.MouseEvent<HTMLButtonElement>,
    value: string
  ) => {
    event.preventDefault();
    setRenderForm(value);
    console.log(value);
    
  };

  return (
    <>
      <Seo
        title="Register"
        description="Register Student"
        path="/auth/register"
      />

      <Container className="bg-[#f0f6ff] pb-[30px]  md:pb-[60px] ">
        <div className="flex justify-center items-center">
          <div className="w-full mt-2">
            <div className="flex justify-center items-center py-4 rounded">
              <button
                onClick={(e) => buttonHandler(e, "Student")}
                
                className={`inline-block mx-4 px-2 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-dark-footer hover:shadow-lg   transition duration-150 ease-in-out ${(renderForm==='Student')&& 'bg-dark-footer'}`}
              >
               
                <img src="/icons/student-role-icon.svg" alt="student logo" className="w-[110px] h-[110px] md:w-[150px] md:h-[150px] object-cover"/>
              </button>
              <button
                onClick={(e) => buttonHandler(e, "Teacher")}
                
                className={`inline-block mx-4 px-2 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-dark-footer hover:shadow-lg   transition duration-150 ease-in-out ${(renderForm==='Teacher')&& 'bg-dark-footer'}`}
              >
              
                 <img src="/icons/teacher-role-icon.svg" alt="student logo" className="w-[110px] h-[110px] md:w-[150px] md:h-[150px] object-cover"/>
              </button>
            </div>

            {renderForm === "Student" ? (
              <StudentRegistrationForm />
            ) : (
              <TeacherRegistrationForm />
            )}
          </div>
        </div>
      </Container>
    </>
  );
}

RegisterPage.Layout = Layout;
