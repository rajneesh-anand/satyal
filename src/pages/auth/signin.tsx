import Layout from "@components/layout";
import Container from "@components/ui/container";
import Seo from "@components/seo/seo";
import { GetServerSideProps } from "next";
import { getCsrfToken, getSession } from "next-auth/react";
import { QueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import SignInForm from "@components/form/SignInForm";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  const csrfToken = await getCsrfToken(context);
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      csrfToken: csrfToken,
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      ...(await serverSideTranslations(context.locale!, [
        "common",
        "forms",
        "menu",
        "footer",
      ])),
    },
  };
};

export default function LoginPage({ csrfToken }: any) {
  return (
    <>
      <Seo
        title="Sign In"
        description="Online Education Institute"
        path="/auth/signin"
      />
      <Container>
        <SignInForm csrfToken={csrfToken} />
      </Container>
    </>
  );
}

LoginPage.Layout = Layout;
