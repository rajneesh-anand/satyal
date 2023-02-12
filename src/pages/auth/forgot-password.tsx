import Layout from "@components/layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps } from "next";
import Seo from "@components/seo/seo";
import Container from "@components/ui/container";
import ForgotPassword from "@components/form/forgot-password";

export default function ForgotPasswordPage() {
  return (
    <>
      <Seo
        title="Forgot Password"
        description="Vedusone Academy Forgot Passwrod"
        path="auth/forgot-password"
      />
      <Container>
        <ForgotPassword />
      </Container>
    </>
  );
}

ForgotPasswordPage.Layout = Layout;

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
