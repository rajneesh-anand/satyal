import React, { useEffect, useState } from 'react'
import { GetServerSideProps, GetStaticProps } from 'next';
import { getSession, useSession } from 'next-auth/react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import StudentDashboardLayout from '@components/layout-dashboard-student';
import Seo from '@components/seo/seo';
import UserPersonalInfo from '../../components/common/profile';
import DashboardLoading from '@components/ui/loader/dashboardLoading';
import StudentBuyPlanDedails from '../../components/student/plandetails';
import TeacherKycDetails from '../../components/teacher/kycdetails'
export default function useremail() {
  let[logInUser,setLogInUser]=useState();
  let{data:session}=useSession();
  let userEmail=session?.user?.email;
 
  useEffect(()=>{
    let fetchUserApi=async()=>{
      let response=await fetch(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/profile/${userEmail}`);
      let data=await response.json();
      setLogInUser(data);
          
    }
    fetchUserApi();
  },[userEmail])
    
  
  return (
    <>
       <Seo
        title="Satyal Online Learning"
        description='Satyal Publication has been in the educational publishing industry for more than 30 years. We started from a book shop 42 years ago in Biratnagar which transformed into the largest and one of the leading educational publishing house in the later days. Today, we are here as a new firm to change the way we educate our loved ones. This change, we are seeking to digitalize the education sector. "Lets Change The Way We Educate Our Loved Ones!"'
        path="/"
      />

      <StudentDashboardLayout>
        <section className='w-full px-4 py-4 sm:py-[20px] sm:px-0 '>
          {
            logInUser?(
              <>
              <UserPersonalInfo logInUser={logInUser}/>
              {(session?.user?.userType=="Student")?(
                <StudentBuyPlanDedails/>
              ):(<TeacherKycDetails kycinfo={logInUser}/>)}
              
              </>
          ):(<DashboardLoading/>)
          }
        </section>
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
  