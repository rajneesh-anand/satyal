import React,{useState} from 'react'
import StudentDashboardLayout from '@components/layout-dashboard-student';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps, GetStaticProps } from 'next';
import { getSession, useSession } from 'next-auth/react';
import Modal from '@components/common/modal/modal';

export default function  Assignment({student}) {
  let [isOpen,setIsOpen]=useState(false);
  let onClose=()=>{
    setIsOpen(false)
  }
  let onOpen=()=>{
    setIsOpen(true)
  }
  return (
    <>
      <StudentDashboardLayout>
       <section className='w-full h-full flex justify-center items-center'>
        <button className='py-2 px-4 bg-indigo-950 text-white font-bold rounded-lg'
        onClick={onOpen}>modal</button>
       </section>
       <Modal onClose={onClose} open={isOpen}>
        <div className='w-[350px] sm:w-[600px] h-[400px] bg-white rounded-md'>
          <h2 className=''>Hellow</h2>
        </div>
       </Modal>
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
