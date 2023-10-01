import React, { useEffect, useState } from "react";
import TeacherDashboardLayout from "@components/layout-dashboard-teacher";
import Select from "@components/ui/select/select";
import { subject_inClass,classOptions,ValueType } from "@data/constant";
import Modal from "@components/common/modal/modal";
import OnlineClassModal from "../../components/teacher/onlineclassmodal";
import { ButtonSize, ButtonType } from "../../../enums/buttons";
import { Button } from "@components/ui/button/dashboard-button";
import Onlinecard from "@components/cards/onlinecard";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps, GetStaticProps } from "next";
import { getSession, useSession } from "next-auth/react";
import Loader from "@components/ui/loader/loader";
import Heading from "@components/ui/heading";
import {HeadingType} from '../../../enums/tittle'


export default function onlineclass() {
  let {data:session}=useSession()
  const [openModal, setOpenModal] = useState(false);
  const [classFilter,setClassFilter]=useState('') //store class to filter createClass
  const [apiClassList,setApiClassList]=useState([]);
  const [filteredClassList,setFilteredClassList]=useState([]);//after feltering onlineclass by teacher
 const [responseClass,setResponseClass]=useState();
 const [loader,setLoader]=useState(true);
  // all the below state are shifted into online class model
  // const [section, setSection] = useState('');
  // const [className, setClassName] = useState();
  // const [selectedSubject, setSelectedSubject] = useState();
  // const [subjects, setSubjects] = useState([]); 

 // handeler funtion for modal state
 let handelModalState=()=>{
  setOpenModal((state)=>!state);
}
let handelClassFilter=(e)=>{ 
  setClassFilter(e?.value)
}
// all handeler funtion are shifted into onlineclass modal
//   const handleInputChange = (e) => {
//     setSection(e.target.value);
//   };
// //  function for changing class value in modal
//   function handleClassChange(value) {
//     // console.log(value);
    
//     setClassName(value.value);
//     setSubjects(value.subject);
//   }
//   // handeler function  for select subject in modal
//   function handleSubjectChange(value) {
//     setSelectedSubject(value.value);
//   }
 
// api fetch created class by teacher
  useEffect(()=>{ 
   let fetchClass=async()=>{
    try{
      setLoader(true);
      let response=await fetch(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/onlineClassTeacher/createdClasses/${session?.user?.email}`);
      let data=await response.json();
      setApiClassList([...data]);

    }catch(err){
      console.log(err);   
    }  
   }
   fetchClass();
  },[session?.user?.email,responseClass])

// filtering online class according to class grade
useEffect(()=>{
  if(!classFilter){
    setFilteredClassList([...apiClassList]);
    setLoader(false);
  }else{
    setLoader(true);
    let afterFilter=apiClassList?.filter((onlineClass)=>onlineClass?.onlineClassGrade===classFilter);
    setFilteredClassList([...afterFilter]);
    setLoader(false)
  }
},[classFilter,apiClassList])



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
          {(loader)?(
             <div className="w-full flex justify-center ">
               <Loader className="text-dark-footer"/>
             </div>
            ):(filteredClassList.length>0)?(
            filteredClassList&&filteredClassList.map((onlineclass)=>{
              return(
                  <Onlinecard key={onlineclass.id} onlineclass={onlineclass}/>
              )
             }) 
            ):(
             <div className="w-full flex sm:block justify-center sm:justify-start ">
               <Heading variant={HeadingType.MediumHeading}>Sorry There is no Class</Heading>
             </div>
            )
          } 
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
