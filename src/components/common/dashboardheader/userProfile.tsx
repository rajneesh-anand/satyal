import React from 'react'
import { useSession, signOut } from "next-auth/react";
import { Menu, Transition } from "@headlessui/react";
import Link from '@components/ui/link';


export default function UserProfile() {
    const { data: session, status } = useSession();
    let logInUser=session?.user?.email?.split('@')[0];
    
    
    
  return (
    <Menu as="div" className="relative inline-flex ml-auto">
      <Menu.Button className="inline-flex justify-center items-center group">
        <img
          className="w-8 h-8 rounded-full"
          src={session?.user?.image ?? "/images/avatar.svg"}
          width="32"
          height="32"
          alt="profile image"
        />
        <div className="flex items-center truncate">
          <span className="truncate ml-2 text-red-900 uppercase text-[12px] font-medium group-hover:text-gray-800">
            {session?.user?.name}
          </span>
          <svg
            className="w-3 h-3 shrink-0 ml-1 fill-current text-gray-400"
            viewBox="0 0 12 12"
          >
            <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
          </svg>
        </div>
      </Menu.Button>

      <Transition
        className="origin-top-right z-10 absolute top-full right-0 min-w-[130px] bg-white  rounded shadow-lg overflow-hidden mt-1"
        enter="transition ease-out duration-200 transform"
        enterFrom="opacity-0 -translate-y-2"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div>
         
          <ul className=''>
            <li >
                <Link href={`/profile/${logInUser}`} className='py-2 flex justify-center text-sm font-medium text-dark-footer hover:bg-dark-footer hover:text-white '>View Profile</Link>
            
            </li>
            <li>
              <button
                className="py-1.5 w-full flex justify-center text-sm font-medium text-dark-footer  hover:bg-dark-footer hover:text-white "
                onClick={() => signOut()}
              >
                Sign Out
              </button>
            </li>
          </ul>
        </div>
      </Transition>
    </Menu>
  )
}
