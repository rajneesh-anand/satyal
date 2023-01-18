import Layout from "@components/layout";
import Container from "@components/ui/container";
import Seo from "@components/seo/seo";
import { GetServerSideProps } from "next";
import { getCsrfToken, getSession } from "next-auth/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import SignInForm from "@components/form/SignInForm";
import { getCookie } from "cookies-next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const csrfToken = await getCsrfToken(context);
  const session = await getSession(context);
  const { req, res } = await context;
  const redirectPath = getCookie("next-auth-redirect", { req, res });

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
      redirectPath: redirectPath,
      ...(await serverSideTranslations(context.locale!, [
        "common",
        "forms",
        "menu",
        "footer",
      ])),
    },
  };
};

export default function LoginPage({ csrfToken, redirectPath }: any) {
  return (
    <>
      <Seo
        title="Sign In"
        description="Online Education Institute"
        path="/auth/signin"
      />
      <Container>
        <SignInForm csrfToken={csrfToken} redirectPath={redirectPath} />
      </Container>
    </>
  );
}

LoginPage.Layout = Layout;
