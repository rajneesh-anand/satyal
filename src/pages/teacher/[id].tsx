import Layout from "@components/layout";
import Container from "@components/ui/container";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps, GetStaticProps } from "next";
import { getSession } from "next-auth/react";
import Seo from "@components/seo/seo";
import { setCookie } from "cookies-next";
import http from "@framework/utils/http";
import ProfileLayout from "@components/profile/layout";
import { UserProvider } from "@contexts/user/user.context";
import DrawersContainer from "@components/drawer-views/container";
import ProfileUpdateForm from "@components/form/profile-update-form";

export default function TeacherDashboard({ teacher }) {
  return (
    <>
      <Seo
        title="Satyal Online Learning"
        description='Satyal Publication has been in the educational publishing industry for more than 30 years. We started from a book shop 42 years ago in Biratnagar which transformed into the largest and one of the leading educational publishing house in the later days. Today, we are here as a new firm to change the way we educate our loved ones. This change, we are seeking to digitalize the education sector. "Lets Change The Way We Educate Our Loved Ones!"'
        path="/"
      />

      <UserProvider>
        <DrawersContainer />
        <ProfileLayout data={teacher}>
          <ProfileUpdateForm />
        </ProfileLayout>
      </UserProvider>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const { req, res } = await context;
  const { id } = await context.params;
  const { data } = await http.get(`/teacher/${id}`);

  if (!session) {
    setCookie("next-auth-redirect", `teacher/${id}`, {
      req,
      res,
      maxAge: 60 * 6 * 24,
    });

    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }
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
