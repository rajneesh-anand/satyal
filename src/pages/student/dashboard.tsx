import React, { useEffect, useState, useRef } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps, GetStaticProps } from "next";
import { getSession, useSession } from "next-auth/react";
import Seo from "@components/seo/seo";
import StudentDashboardLayout from "@components/layout-dashboard-student";
import { io } from "socket.io-client";

export default function StudentDashboard() {
  const socket = useRef<any>();
  const { data: session, status } = useSession();
  console.log(session);

  useEffect(() => {
    if (session) {
      socket.current = io("http://localhost:4000");
      socket.current.emit("connected", session?.user?.email);
    }
  }, [session]);

  return (
    <>
      <Seo
        title="Satyal Online Learning"
        description='Satyal Publication has been in the educational publishing industry for more than 30 years. We started from a book shop 42 years ago in Biratnagar which transformed into the largest and one of the leading educational publishing house in the later days. Today, we are here as a new firm to change the way we educate our loved ones. This change, we are seeking to digitalize the education sector. "Lets Change The Way We Educate Our Loved Ones!"'
        path="/"
      />

      <StudentDashboardLayout>
        <h1>Student</h1>
      </StudentDashboardLayout>
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
