import React, { FormEvent, useState } from "react";
import TeacherDashboardLayout from "@components/layout-dashboard-teacher";
import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Button } from "@components/ui/button/dashboard-button";
import { ButtonSize, ButtonType } from "../../../enums/buttons";
import Select from "@components/ui/form/select/select";
import { onlineClass } from "@data/constant";
import { ValueType } from "@data/constant";
import Modal from "@components/common/modal/modal";
import HostOnlineTest from "../../components/teacher/onlinetest/createonlinetestmodal";
export default function onlinetest() {
  let [selectClass, setSelectClass] = useState<ValueType>();
  let [modalState, setModalState] = useState(false);
  let [showRequire, setShowRequire] = useState(false);
  let [testState, setTestState] = useState({
    testName: "",
    durationHour: "",
    durationMinutes: "",
    dueHour: "",
    dueMinutes: "",
    dueYear: "",
    dueMonth: "",
    dueDay: "",
    timePeriod: "",
    testFile: "",
    testClass: "",
    testOnlineClass: "",
  });

  // test state handeler
  let handelTestState = (e, key) => {
    setTestState({
      ...testState,
      [key]: e.target.value,
    });
  };

  let handelModalState = () => {
    setModalState((state) => !state);
  };
  console.log(testState);

  return (
    <>
      <TeacherDashboardLayout>
        <section className="h-full ">
          <div className="w-full flex justify-between items-center sm:flex sm:justify-start py-0 sm:py-1 ">
            <div className="h-full w-[180px] sm:w-[200px] ">
              <Select
                id="onlineclass"
                className="text-dark-footer font-semibold w-full"
                options={onlineClass}
                isSearchable={false}
                placeholder="SELECT CLASS"
                onChange={(value: ValueType) => setSelectClass(value)}
              />
            </div>
            <Button
              size={ButtonSize.Large}
              type={ButtonType.Secondary}
              className="sm:mx-[80px]"
              onClick={handelModalState}
            >
              Host Online
            </Button>
          </div>
        </section>
      </TeacherDashboardLayout>
      <Modal open={modalState} onClose={handelModalState}>
        <HostOnlineTest
          testState={testState}
          handelTestState={handelTestState}
          showRequire={showRequire}
        />
      </Modal>
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
