import Onlinecard from "@components/cards/onlinecard";
import Modal from "@components/common/modal/modal";
import TeacherDashboardLayout from "@components/layout-dashboard-teacher";
import { Button } from "@components/ui/button/dashboard-button";
import Heading from "@components/ui/heading";
import Loader from "@components/ui/loader/loader";
import Select from "@components/ui/select/select";
import { subject_inClass } from "@data/constant";
import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ButtonSize, ButtonType } from "../../../enums/buttons";
import { HeadingType } from "../../../enums/tittle";
import OnlineClassModal from "../../components/teacher/onlineclassmodal";

export default function onlineclass() {
  let { data: session } = useSession();
  const [openModal, setOpenModal] = useState(false);
  // const [classFilter, setClassFilter] = useState(""); //store class to filter createClass
  const [classList, setClassList] = useState([]);
  const [apiClassList, setApiClassList] = useState([]);

  // const [filteredClassList, setFilteredClassList] = useState([]); //after feltering onlineclass by teacher
  const [responseClass, setResponseClass] = useState();
  const [loader, setLoader] = useState(false);
  // all the below state are shifted into online class model
  // const [section, setSection] = useState('');
  // const [className, setClassName] = useState();
  // const [selectedSubject, setSelectedSubject] = useState();
  // const [subjects, setSubjects] = useState([]);

  console.log(classList);
  console.log(apiClassList);

  // handeler funtion for modal state
  let handelModalState = () => {
    setOpenModal((state) => !state);
  };
  
  let handelClassFilter = (e) => {
    setLoader(true);
    let result = classList.filter((el) => el.onlineClassGrade === e?.value);
    if (result) {
      setLoader(false);
      setApiClassList(result);
    }
  };

  // console.log(result);

  // api fetch created class by teacher
  useEffect(() => {
    let fetchClass = async () => {
      try {
        setLoader(true);

        let response = await fetch(
          `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/onlineClassTeacher/createdClasses/${session?.user?.email}`
        );
        let data = await response.json();
        setClassList([...data]);
        setApiClassList([...data]);

        setLoader(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchClass();
  }, [session?.user?.email, responseClass]);

  return (
    <TeacherDashboardLayout>
      <div className="pt-2 pb-[50px] sm:pb-[10px] ">
        <div className="flex items-center ">
          <div className="">
            <Select
              className=" rounded px-2 py-1 text-sm w-44"
              options={subject_inClass}
              placeholder="SELECT CLASS"
              onChange={handelClassFilter}
            />
          </div>
          <div className="  mx-4 sm:mx-[30px]">
            <Button
              size={ButtonSize.Large}
              type={ButtonType.Primary}
              onClick={handelModalState}
            >
              CREATE CLASS
            </Button>
          </div>
        </div>
        <div className="w-full py-[20px] flex flex-wrap">
          {loader ? (
            <div className="w-full flex justify-center ">
              <Loader className="text-dark-footer" />
            </div>
          ) : apiClassList.length > 0 ? (
            apiClassList &&
            apiClassList.map((onlineclass) => {
              return (
                <Link href={"/teacher/dashboard"}>
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
      </div>

      <Modal onClose={handelModalState} open={openModal}>
        <OnlineClassModal
          handelModalState={handelModalState}
          setResponseClass={setResponseClass}
        />
      </Modal>
    </TeacherDashboardLayout>
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
