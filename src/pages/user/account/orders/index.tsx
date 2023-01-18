import React from 'react';
import Layout from '@components/layout';
import AccountLayout from '@components/my-account/account-layout';
import OrderTable from '@components/order/order-table';
import { useOrdersQuery } from '@framework/order/get-all-orders';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import Seo from '@components/seo/seo';

// props change to orders.

export default function OrdersTablePage() {
  const { data, isLoading } = useOrdersQuery({});

  return (
    <>
      <Seo
        title="Orders"
        description="Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        path="my-account/orders"
      />
      <AccountLayout>
        {!isLoading ? (
          <OrderTable orders={data?.data} />
        ) : (
          <div>Loading...</div>
        )}
      </AccountLayout>
    </>
  );
}

OrdersTablePage.Layout = Layout;

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
