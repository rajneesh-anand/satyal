import React, { useState, useEffect, useRef } from 'react';
import Link from '@components/ui/link';
import { useRouter } from 'next/router';
import Image from '@components/ui/image';
import SidebarItems from '@components/sidebaritems/SidebarItems';
import OnlineClass from '../../../assets/icons/Online Class.svg';
import Assignments from '../../../assets/icons/Assignments.svg';
import Books from '../../../assets/icons/E-Books.svg';
import OnlineTest from '../../../assets/icons/Online Test.svg';
import PracticeQuestion from '../../../assets/icons/Question.svg';
import SmartClassVideos from '../../../assets/icons/Smart Class.svg';
import OnlineTution from '../../../assets/icons/Tuition.svg';

type Props = {
  sidebarOpen: boolean;
  setSidebarOpen: (text: boolean) => void;
};

const Sidebar: React.FC<Props> = ({ sidebarOpen, setSidebarOpen }: Props) => {
  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const [sidebarExpanded, setSidebarExpanded] = useState<boolean>(true);

  // close on click outside
  useEffect(() => {
    const clickHandler = (ev: Event) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current?.contains(ev.target) ||
        trigger.current.contains(ev.target)
      )
        return;
      setSidebarOpen(false);
    };
    document?.addEventListener('click', clickHandler);
    return () => document?.removeEventListener('click', clickHandler);
  });
 

  useEffect(() => {
    let bodyElement: Element | null = document.querySelector('body');
    if (sidebarExpanded) {
      bodyElement?.classList.add('sidebar-expanded');
    } else {
      bodyElement?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  const sidebarItems = [
    {
      title: 'Online Class',
      href: '/',
      icon: OnlineClass,
    },
    {
      title: 'Online Test',
      href: '/',
      icon: OnlineTest,
    },
    {
      title: 'Smart Class Videos ',
      href: '/',
      icon: SmartClassVideos,
    },
    {
      title: 'E-Books',
      href: '/student/books',
      icon: Books,
    },
    {
      title: 'Practice Question',
      href: '/',
      icon: PracticeQuestion,
    },
    {
      title: 'Assignments',
      href: '/',
      icon: Assignments,
    },
    {
      title: 'Online Tuition',
      href: '/student/tuition',
      icon: OnlineTution,
    },
  ];

  return (
    <div >
      <div
        className={`fixed inset-0 bg-[#690f00] bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
      ></div>

      <div
        id="sidebar"
        ref={sidebar}
        className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 transform h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-60 lg:w-20 lg:sidebar-expanded:!w-60 2xl:!w-60 shrink-0 bg-[#690f00] p-4 transition-all duration-200 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-60'
        }`}
      >
        <div className="flex sidebar-expanded:justify-between justify-center items-center pb-4 ">
          <button
            ref={trigger}
            className="lg:hidden text-gray-500 hover:text-gray-400"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>

          <Link href="/" className="lg:hidden lg:sidebar-expanded:block ">
            <Image
              src="/images/White Colour.svg"
              width={100}
              height={32}
              alt="satyal-logo"
            />
          </Link>
          <div className="hidden lg:inline-flex 2xl:hidden justify-end mt-0 ">
            <button onClick={() => setSidebarExpanded(!sidebarExpanded)}>
              <span className="sr-only">Expand / collapse sidebar</span>
              <svg
                className="w-6 h-6 fill-current sidebar-expanded:rotate-180"
                viewBox="0 0 24 24"
              >
                <path
                  className="text-gray-400"
                  d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="space-y-8  pt-4 ">
          <div>
            <h3 className="text-xs uppercase text-gray-500 font-semibold pl-3">
              <span
                className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
                aria-hidden="true"
              >
                •••
              </span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                SELECT MENU
              </span>
            </h3>
            <ul>
              {sidebarItems.map((item, index) => (
                <SidebarItems path={item.href} Icon={item.icon} title={item.title} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
