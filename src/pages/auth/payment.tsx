import Layout from "@components/layout";
import Container from "@components/ui/container";
import { GetServerSideProps } from "next";
import { getCsrfToken, getSession } from "next-auth/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Pricing from "@components/pricing";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (session) {
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

export default function PaymentPage() {
  return (
    <>
      <Container>
        <Pricing />
      </Container>
    </>
  );
}

PaymentPage.Layout = Layout;
