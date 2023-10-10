import React, { useState, useEffect } from "react";
import Loader from "@components/ui/loader/loader";
import Onlinecard from "@components/cards/student-card";
import StudentDashboardLayout from "@components/layout-dashboard-student";
import { ButtonSize, ButtonType } from "../../../enums/buttons";
import { Button } from "@components/ui/button/dashboard-button";
import Modal from "@components/common/modal/modal";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import Link from "next/link";
import { MdCheckCircle } from "react-icons/md";
import OnlineClassModal from "@components/student/onlineclassmodal";
import { HeadingType } from "../../../enums/tittle";
import Heading from "@components/ui/heading";

export default function OnlineClass() {
  let { data: session } = useSession();
  const [openModal, setOpenModal] = useState(false);
  const [responseClass, setResponseClass] = useState();
  const [loader, setLoader] = useState(false);
  const [apiClassList, setApiClassList] = useState([]);

  let handelModalState = () => {
    setOpenModal((state) => !state);
  };

  useEffect(() => {
    let fetchClass = async () => {
      try {
        setLoader(true);

        let response = await fetch(
          `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/onlineClassStudent/enrolledClasses/${session?.user?.email}`
        );
        let data = await response.json();
        setApiClassList([...data]);

        setLoader(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchClass();
  }, [session?.user?.email, responseClass]);

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
        <div className="w-full py-[20px] flex flex-wrap">
          {loader ? (
            <div className="w-full flex justify-center ">
              <Loader className="text-dark-footer" />
            </div>
          ) : apiClassList.length > 0 ? (
            apiClassList &&
            apiClassList.map((onlineclass: any) => {
              return (
                <Link
                  href={{
                    pathname:
                      "/student/onlineclass/" +
                      onlineclass.onlineClassName +
                      "$" +
                      onlineclass.id,
                    // query: {
                    //   class: onlineclass.onlineClassGrade,
                    //   id: onlineclass.id,
                    // },
                  }}
                >
                  <a>
                    <Onlinecard
                      key={onlineclass.id}
                      onlineclass={onlineclass}
                    />
                  </a>
                </Link>
              );
            })
          ) : (
            <div className="w-full flex sm:block justify-center sm:justify-start ">
              <Heading variant={HeadingType.MediumHeading}>
                Sorry There is no Class
              </Heading>
            </div>
          )}
        </div>
        <Modal onClose={handelModalState} open={openModal}>
          <OnlineClassModal
            handelModalState={handelModalState}
            setResponseClass={setResponseClass}
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
