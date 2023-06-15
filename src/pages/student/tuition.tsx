import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps, GetStaticProps } from "next";
import { getSession, useSession } from "next-auth/react";
import Seo from "@components/seo/seo";
import http from "@framework/utils/http";
import StudentDashboardLayout from "@components/layout-dashboard-student";
import { UserProvider } from "@contexts/user/user.context";
import TuitionDetail from "@components/student/tuition-page";
import { io } from "socket.io-client";
const socket = io("http://localhost:4000");

export default function TuitionPage({ student }) {
  console.log(student);
  return (
    <>
      <Seo
        title="Satyal Online Learning"
        description='Satyal Publication has been in the educational publishing industry for more than 30 years. We started from a book shop 42 years ago in Biratnagar which transformed into the largest and one of the leading educational publishing house in the later days. Today, we are here as a new firm to change the way we educate our loved ones. This change, we are seeking to digitalize the education sector. "Lets Change The Way We Educate Our Loved Ones!"'
        path="/"
      />
      <UserProvider>
        <StudentDashboardLayout>
          <TuitionDetail data={student} socket={socket} />
        </StudentDashboardLayout>
      </UserProvider>
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

  const { data } = await http.get(`/student/${session?.user?.id}`, {
    headers: { Authorization: `Bearer ${session?.accessToken}` },
  });
  return {
    props: {
      student: data.data,
      ...(await serverSideTranslations(context.locale!, [
        "common",
        "forms",
        "menu",
        "footer",
      ])),
    },
  };
};
