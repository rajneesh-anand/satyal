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
import Image from "next/image";

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
        <div className="flex justify-center items-center">
          <Card className=" w-full md:w-8/12 mt-2">
            <div className="flex justify-center items-center py-4 rounded">
              <button
                onClick={(e) => buttonHandler(e, "Student")}
                className="inline-block mx-4 px-2 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-dark-footer hover:shadow-lg focus:bg-dark-footer focus:shadow-lg focus:outline-none focus:ring-0 active:bg-dark-footer active:shadow-lg transition duration-150 ease-in-out"
              >
                <Image
                  src="/images/student.svg"
                  alt="test"
                  quality={100}
                  width={150}
                  height={150}
                  objectFit="cover"
                />
              </button>
              <button
                onClick={(e) => buttonHandler(e, "Teacher")}
                className="inline-block mx-4 px-2 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-dark-footer hover:shadow-lg focus:bg-dark-footer focus:shadow-lg focus:outline-none focus:ring-0 active:bg-dark-footer active:shadow-lg transition duration-150 ease-in-out"
              >
                <Image
                  src="/images/teacher.svg"
                  alt="test"
                  quality={100}
                  width={150}
                  height={150}
                  objectFit="cover"
                />
              </button>
            </div>

            {renderForm === "Student" ? (
              <StudentRegistrationForm />
            ) : (
              <TeacherRegistrationForm />
            )}
          </Card>
        </div>
      </Container>
    </>
  );
}

RegisterPage.Layout = Layout;
