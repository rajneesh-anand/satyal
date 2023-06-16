import { useSession, getSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import React from "react";
import { useRouter } from "next/router";

export default function test() {
  return <div>test</div>;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
