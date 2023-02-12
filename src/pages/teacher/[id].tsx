import Layout from "@components/layout";
import Container from "@components/ui/container";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps, GetStaticProps } from "next";
import { getSession } from "next-auth/react";
import Seo from "@components/seo/seo";
import http from "@framework/utils/http";
import ProfileLayout from "@components/profile/layout";
import { UserProvider } from "@contexts/user/user.context";
import DrawersContainer from "@components/drawer-views/container";
import ProfileUpdateForm from "@components/form/profile-update-form";
import KYCForm from "@components/form/KYCForm";
import KYCReviewForm from "@components/form/KYCReviewForm";

export default function TeacherDashboard({ teacher }) {
  if (teacher.kycStatus === "Kyc Pending") {
    return (
      <Container>
        <KYCForm />
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
      <DrawersContainer />
      <ProfileLayout data={teacher}>
        <ProfileUpdateForm />
      </ProfileLayout>
    </UserProvider>
  );
}

TeacherDashboard.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const { req, res } = await context;
  const { id } = await context.params;
  const { data } = await http.get(`/teacher/${id}`);

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
