import { useState, useEffect } from "react";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { QueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";
import { getSession } from "next-auth/react";
import Seo from "@components/seo/seo";
import Container from "@components/ui/container";
import Layout from "@components/layout";
import StudentRegistrationForm from "@components/form/StudentRegistrationForm";
import TeacherRegistrationForm from "@components/form/TeacherRegistrationForm";

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
  };

  return (
    <>
      <Seo
        title="Register"
        description="Register Student"
        path="/auth/register"
      />

      <Container>
        <div className="md:grid md:grid-cols-2 md:gap-6 mt-14">
          <div className="md:col-span-1 mx-8 my-8"></div>
          <div className="mt-5 md:col-span-1 md:mt-0">
            <div className="flex justify-center items-center">
              <button
                onClick={(e) => buttonHandler(e, "Student")}
                className="inline-block mx-4 px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
              >
                I am a Student
              </button>
              <button
                onClick={(e) => buttonHandler(e, "Teacher")}
                className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
              >
                I am a Teacher
              </button>
            </div>
          </div>
        </div>
        {renderForm === "Student" ? (
          <StudentRegistrationForm />
        ) : (
          <TeacherRegistrationForm />
        )}
      </Container>
    </>
  );
}

RegisterPage.Layout = Layout;
