import Container from "@components/ui/container";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps, GetStaticProps } from "next";
import { getSession, useSession } from "next-auth/react";
import React, { useState, useEffect, useRef } from "react";
import TeacherDashboardLayout from "@components/layout-dashboard-teacher";
import TeacherKYCForm from "@components/form/TeacherKYCForm";
import KYCReviewForm from "@components/form/KYCReviewForm";
import { io } from "socket.io-client";
import Link from "@components/ui/link";

export default function TeacherDashboard({ teacher }) {
  const { data: session, status } = useSession();
  const [currentUser, setCurrentUser] = useState(undefined);
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  
  const socket = useRef<any>();
  socket.current = io("http://localhost:4000");


  useEffect(() => {
    const getUser = async () => {
      setCurrentUser(await JSON.parse(localStorage.getItem("cUser")));
    };
    getUser();
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current.emit("connected", currentUser.email);
    }
  }, [currentUser]);

  useEffect(() => {
    if (socket.current) {
      console.log(`first`);
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage(msg);
      });
    }
  }, [currentUser]);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);



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
    <TeacherDashboardLayout>
      <div>
        <h1>Teacher</h1>
       
        {arrivalMessage}
        <div className="">
        </div>
      </div>
    </TeacherDashboardLayout>
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
