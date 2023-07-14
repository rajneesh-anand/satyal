import React from 'react'
import Link from '@components/ui/link';
import Image from "@components/ui/image";
import {iStudentMobileMenuList}  from '../../../../types/props';
import { useTranslation } from "next-i18next";

const MobileStickyMenu=({menuItems}:iStudentMobileMenuList)=> {
  const { t } = useTranslation();
    return (
      <>
      <div className='lg:hidden absolute left-0 right-0 bottom-0 w-full h-[54px] sm:h-[80px] bg-dark-footer px-6 sm:px-9 z-50'>
        <div className='flex justify-between h-full items-center  '>
          {
            menuItems&&menuItems.map((menu)=>{
              return(
                <Link href={menu?.menuLink} className='px-0 sm:px-1 ' key={menu?.id} >
                <div className='flex flex-col '>
                <Image src={menu?.menuIcon} alt='online class ' height={25} width={30} />
                <span className='my-0 leading-none text-xs sm:text-lg font-light sm:font-medium text-white '>{t(menu?.menuTitle)}</span>
                </div>
            </Link>
              )
            })
          }
      
        </div>
      </div>
        
      </>
    )
  }
  export default MobileStickyMenu;