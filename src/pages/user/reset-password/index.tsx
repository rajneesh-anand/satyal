import Layout from "@components/layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps } from "next";
import Seo from "@components/seo/seo";
import Container from "@components/ui/container";
import ResetPassword from "@components/form/reset-password";

export default function ResetPasswordPage() {
  return (
    <>
      <Seo
        title="Reset Password"
        description="Reset Password"
        path="user/reset-password"
      />
      <Container>
        <ResetPassword />
      </Container>
    </>
  );
}

ResetPasswordPage.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async (context) => {
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
