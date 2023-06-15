import Container from "@components/ui/container";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps, GetStaticProps } from "next";
import { getSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import http from "@framework/utils/http";
import TeacherDashboardLayout from "@components/layout-dashboard-teacher";
import { UserProvider } from "@contexts/user/user.context";
import TeacherKYCForm from "@components/form/TeacherKYCForm";
import KYCReviewForm from "@components/form/KYCReviewForm";
// import { io } from "socket.io-client";
// const socket = io("http://localhost:4000");
import socket from "@utils/socket";
export default function TeacherDashboard({ teacher }) {
  const email = teacher.email;

  useEffect(() => {
    const sessionID = localStorage.getItem("sessionID");
    if (sessionID) {
      socket.auth = { sessionID };
      socket.connect();
    } else {
      socket.auth = { username: email };
      socket.connect();
    }
    socket.on("session", ({ sessionID, userID }) => {
      // attach the session ID to the next reconnection attempts
      socket.auth = { sessionID };
      // store it in the localStorage
      localStorage.setItem("sessionID", sessionID);
      // save the ID of the user
      (socket as any).userID = userID;
    });

    // socket.emit("teacherOnline", { email, socketID: socket.id });
  }, []);

  if (teacher.kycStatus === "Kyc Pending") {
    return (
      <Container>
        <TeacherKYCForm />
      </Container>
    );
  }

  if (teacher.kycStatus === "KYC Under Review") {
    return (
      <Container>
        <KYCReviewForm />
      </Container>
    );
  }
  return (
    <UserProvider>
      <TeacherDashboardLayout></TeacherDashboardLayout>
    </UserProvider>
  );
}

// TeacherDashboard.Layout = Layout;

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
  const { data } = await http.get(`/teacher/${session?.user?.id}`);

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
