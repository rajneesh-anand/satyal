import MenuIcon from '@components/icons/menu-icon'
import Link from '@components/ui/link'
import { useRouter } from 'next/router';
import React from 'react'
import Logowhite from '@components/ui/whitelogo';
import UserMenu from '@components/layout-dashboard-teacher/header/menu';
import Image from 'next/image';
import logo from '../../../../public/images/whitelogo.svg'
import MobileUserMenu from '../mobileusermenu';
import { useUI } from '@contexts/ui.context';
import { Drawer } from '@components/common/drawer';
import { getDirection } from '@utils/get-direction';
import dynamic from 'next/dynamic';

const MobileMenu = dynamic(
  () => import('@components/layout-dashboard-teacher/header/mobile-menu')
);

export default function DashboardHeader() {
  const { openSidebar, closeSidebar, displaySidebar } = useUI();
  const { locale } = useRouter();
  const dir = getDirection(locale);
  const contentWrapperCSS = dir === 'ltr' ? { left: 0 } : { right: 0 };
  const handelSidebar=()=>{
    return openSidebar()
  }
  return (
    <>
      <div className='w-full h-[44px] sm:h-[64px] lg:h-[64px] bg-dark-footer lg:bg-neutral-light-gray px-3 sm:px-5 lg:px-6'>
        <div className='w-full h-full flex justify-between lg:justify-end items-center'>
            <div className='lg:hidden'>
                <button className='text-white' onClick={handelSidebar}>
                    <MenuIcon/>
                </button>
            </div>
            <div className='lg:hidden'>
                <Link href='/student/dashboard' className='h-[30px] w-[100px] sm:h-[40px]  block'>
                    <Image
                    src={logo}
                    width={100}
                    height={30}
                    layout='responsive'
                   
                    />
                
                </Link>
            </div>
            <div className=''>
                <div className='hidden lg:inline-block'>
                <UserMenu />
                </div>
                <div className='inline-block lg:hidden'>
                  <MobileUserMenu/>  
                </div>
              
            </div>
        </div>
        <Drawer
        placement={dir === 'rtl' ? 'right' : 'left'}
        open={displaySidebar}
        onClose={closeSidebar}
        handler={false}
        showMask={true}
        level={null}
        contentWrapperStyle={contentWrapperCSS}
      >
        <MobileMenu />
      </Drawer>
      </div>
    </>
  )
}
