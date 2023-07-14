import Link from '@components/ui/link'
import Image from 'next/image'
import React from 'react'
import PraticeQuestion from '../../../assets/icons/Question.svg';
import OnlineTest from '../../../assets/icons/Online Test.svg';
import {iStudentMobileMenuList} from '../../../../types/props';
import { useTranslation } from "next-i18next";
import { useUI } from '@contexts/ui.context';

export default function MobileSidebarMenu({menuItems}:iStudentMobileMenuList) {
  const { t } = useTranslation("menu");
  const {  closeSidebar } = useUI();
  return (
    <>
     <div className='py-2 w-full  '>
      <div >
      {
        menuItems&&menuItems?.map((menu)=>{
          return(
            <>
           <Link href={menu?.menuLink} className='py-2 sm:py-3 block ' key={menu?.id} onClick={closeSidebar}>
              <div className='flex justify-start items-center'>
                  <Image src={menu?.menuIcon}
                  width={50}
                  height={30}
                  />
                <span className='text-md sm:text-2xl font-semibold text-light-footer pl-2'>{t(menu?.menuTitle)}</span>
              </div>
       </Link>
            </>
          )
        })
      }
      </div>
      
     </div> 
    </>
  )
}
