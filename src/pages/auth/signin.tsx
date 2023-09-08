import Layout from '@components/layout';
import Container from '@components/ui/container';
import { GetServerSideProps } from 'next';
import { getCsrfToken, getSession } from 'next-auth/react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import SignInForm from '@components/form/SignInForm';


export default function LoginPage({ csrfToken }) {
  return (
    <Container>
      <SignInForm csrfToken={csrfToken} />
      
    </Container>
  );
}

LoginPage.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const csrfToken = await getCsrfToken(context);
  const session = await getSession(context);

  console.log('Csrf Token is:', csrfToken);

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      csrfToken: csrfToken,
      ...(await serverSideTranslations(context.locale!, [
        'common',
        'forms',
        'menu',
        'footer',
      ])),
    },
  };
};
