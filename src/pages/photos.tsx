import React, { useEffect, useState } from "react";
import { useSession, getSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import Layout from "@components/layout";
import Container from "@components/ui/container";
import Loader from "@components/ui/loader/loader";

type userType = {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
};

export default function PhotosPage() {
  // const [photos, setPhotos] = useState<string[]>();
  const [users, setUsers] = useState<userType[]>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPhotos = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/test/test-user`
      );
      const data = await res.json();
      setUsers(data.data);
      setLoading(false);
    };
    fetchPhotos();
  }, []);

  return (
    <Container className="mt-4">
      <div className="text-center">
        <input type="text" />
      </div>
      <div className="grid grid-cols-12 gap-4 py-4">
        {loading ? (
          <div className="text-center">
            <Loader />
          </div>
        ) : (
          users &&
          users.map((itm, idx) => (
            <div
              key={idx}
              className="col-span-12 lg:col-span-3 text-center relative border border-gray-200 rounded shadow hover:bg-gray-100 "
            >
              <div className="text-center py-8">
                <p className="font-semibold text-[24px] text-rose-700">
                  {itm.firstName}
                </p>
                <p>{itm.lastName}</p>
                <h3>{itm.email}</h3>
                <p className="text-slate-600">{itm.address}</p>
                <button className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-sm text-sm px-5 py-2.5 text-center mr-2 my-2">
                  Edit
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </Container>
  );
}
PhotosPage.Layout = Layout;

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const session = await getSession(context);

//   if (!session) {
//     return {
//       redirect: {
//         destination: "/auth/signin",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {},
//   };
// };
