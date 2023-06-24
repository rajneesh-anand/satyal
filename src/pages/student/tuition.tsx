import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useState, useEffect, useRef } from "react";
import { GetServerSideProps, GetStaticProps } from "next";
import { getSession, useSession } from "next-auth/react";
import StudentDashboardLayout from "@components/layout-dashboard-student";
import TuitionDetail from "@components/student/tuition-page";

export default function TuitionPage() {
  return (
    <StudentDashboardLayout>
      <TuitionDetail />
    </StudentDashboardLayout>
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
