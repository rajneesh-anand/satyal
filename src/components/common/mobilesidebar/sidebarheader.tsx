import React from 'react'
import { IoClose } from 'react-icons/io5'
import { useUI } from "@contexts/ui.context";
import Image from 'next/image';
import Logoimage from '../../../../public/images/logo.svg'

export default function MobileSidebarHeader() {
    const { closeSidebar } = useUI();
  return (
    <>
       <div className='flex justify-between border-b-0.5 border-solid border-light-footer pb-1 sm:pb-2'>
                <div  onClick={closeSidebar}>
                  
                    <Image src={Logoimage}
                    width={100}
                    height={30}
                    />
                </div>
                <button className='px-0.5 py-0.5 ' onClick={closeSidebar}>
                    <IoClose className='text-mid-footer text-3xl sm:text-4xl font-normal'/>
                </button>
      </div>
    </>
  )
}
