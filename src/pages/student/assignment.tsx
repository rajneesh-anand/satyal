import React from 'react'
import StudentDashboardLayout from '@components/layout-dashboard-student';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps, GetStaticProps } from 'next';
import { getSession, useSession } from 'next-auth/react';

export default function  Assignment({student}) {
  return (
    <>
      <StudentDashboardLayout>
      <h1>Student Assignment page</h1> 
    </StudentDashboardLayout>
    
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    };
  }

  return {
    props: {
      ...(await serverSideTranslations(context.locale!, [
        'common',
        'forms',
        'menu',
        'footer',
      ])),
    },
  };
};
