import React, { useState } from 'react'
import TeacherDashboardLayout from '@components/layout-dashboard-teacher';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps, GetStaticProps } from "next";
import { getSession, useSession } from "next-auth/react";
import BookClassModal from '../../components/teacher/bookclassmodal';
import {ValueType} from "AppTypes";
import DashboardLoading from '@components/ui/loader/dashboardLoading';
import Bookthumbnail from '@components/common/book/bookthumbnail';
import Container from "@components/ui/container";
import Modal from '@components/common/modal/modal';
import { useRouter } from 'next/router';

export default function Books({teacher}){
  const router=useRouter();
  let [bookOfClass,setBookOfClass]=useState<ValueType>(); //store class state
  let [displayModal,setDisplayModdal]=useState(true);
  const [bookCovers, setBookCovers] = useState<string[]>(); //store books cover url
  const [loader,setLoader]=useState<Boolean>();

  // async funtion to fetch book cover image
  let fetchBookApi=async()=>{
    setDisplayModdal(false);
    setLoader(true);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/books/${bookOfClass?.value}`
    );
    let convertData=await response.json();
    setBookCovers(convertData?.data?.images)
    setLoader(false);
     
  }

  // handel modal to close state
  let closemodal=()=>{
    if(bookOfClass){
      setDisplayModdal(false);
    }else{
     router.push('/teacher/dashboard');
     setDisplayModdal(false);
    }

  }
  if(loader){
    return(
      <DashboardLoading/>
    )
  }
  return (
    <>
    
      <TeacherDashboardLayout>
          {(bookCovers)?(
            <>
            <Container>
              <div className="h-full pb-[60px] sm:pb-0">
                 <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 py-4 ">
                  {
                    bookCovers&&bookCovers.map((cover,index)=>{
                      return(
                        <Bookthumbnail cover={cover} key={index}/>
                      )
                    })
                  }
                 </div>
              </div>  
            </Container> 
            </>
          ):(
            
           <h2>books are not aviable</h2>
          )}
      </TeacherDashboardLayout> 
      <Modal open={displayModal} onClose={closemodal}>
        <main>
          <BookClassModal setBookOfClass={setBookOfClass} fetchBookApi={fetchBookApi} />
        </main>
      </Modal>
    </>
  )
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


