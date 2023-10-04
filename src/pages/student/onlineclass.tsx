import React, { useState } from "react";
import StudentDashboardLayout from "@components/layout-dashboard-student";
import { ButtonSize, ButtonType } from "../../../enums/buttons";
import { Button } from "@components/ui/button/dashboard-button";
import Modal from "@components/common/modal/modal";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";

import { MdCheckCircle } from "react-icons/md";
import OnlineClassModal from "@components/student/onlineclassmodal";

export default function OnlineClass() {
  const [openModal, setOpenModal] = useState(false);
  // const [responseClass, setResponseClass] = useState();

  let handelModalState = () => {
    setOpenModal((state) => !state);
  };

  return (
    <>
      <StudentDashboardLayout>
        <div className="mx-8 sm:mx-[30px]">
          <Button
            size={ButtonSize.Large}
            type={ButtonType.Primary}
            onClick={handelModalState}
          >
            <span className="flex items-center">
              JOIN CLASS
              <span className="rounded-full bg-green-500 text-white p-1 ml-2">
                <MdCheckCircle size={20} />
              </span>
            </span>
          </Button>
        </div>
        <Modal onClose={handelModalState} open={openModal}>
          <OnlineClassModal
            handelModalState={handelModalState}
            // setResponseClass={setResponseClass}
          />
        </Modal>
      </StudentDashboardLayout>
    </>
  );
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

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/teacher/${session?.user?.id}`
  );
  const data = await res.json();

  return {
    props: {
      teacher: data.data,
      ...(await serverSideTranslations(context.locale!, [
        "common",
        "forms",
        "menu",
        "footer",
      ])),
    },
  };
};
