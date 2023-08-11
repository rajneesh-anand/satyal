import React from 'react'
import { useSession, signOut } from "next-auth/react";
import Link from '@components/ui/link';
import Image from 'next/image';
export default function MobileUserMenu() {
    const { data: session, status } = useSession();
    let logInUser=session?.user?.email?.split('@')[0];
  return (
    <>
      <div className=''>
        <Link href={`/profile/${logInUser}`} className='w-[30px] sm:w-[40px] h-[30px] sm:h-[40px] rounded-full overflow-hidden block' >
            <Image src={session?.user?.image??"/images/avatar.svg"}
            height={30}
            width={30}
            layout='responsive'
            />
        </Link>
      </div>
    </>
  )
}
