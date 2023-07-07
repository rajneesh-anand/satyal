import React, { useState, useEffect, useRef } from 'react';
import Link from '@components/ui/link';
import { useRouter } from 'next/router';
import Image from '@components/ui/image';

type Props = {
  sidebarOpen: boolean;
  setSidebarOpen: (text: boolean) => void;
};

const Sidebar: React.FC<Props> = ({ sidebarOpen, setSidebarOpen }: Props) => {
  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);
  const { pathname } = useRouter();
  console.log(pathname);

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
  },[]);

  useEffect(() => {
    let bodyElement: Element | null = document.querySelector('body');
    if (sidebarExpanded) {
      bodyElement?.classList.add('sidebar-expanded');
    } else {
      bodyElement?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

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
              src="/images/whitelogo.svg"
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
            <ul className="mt-3">
              <li
                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                  pathname === '/' && 'bg-gray-900'
                }`}
              >
                <Link
                  href="/"
                  className={`block text-gray-200 hover:text-white truncate transition duration-150 ${
                    pathname === '/' && 'hover:text-gray-200'
                  }`}
                >
                  <div className="flex items-center ">
                    <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                      <path
                        className={`fill-current text-gray-400 ${
                          pathname === '/' && '!text-indigo-500'
                        }`}
                        d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0z"
                      />
                      <path
                        className={`fill-current text-gray-600 ${
                          pathname === '/' && 'text-indigo-600'
                        }`}
                        d="M12 3c-4.963 0-9 4.037-9 9s4.037 9 9 9 9-4.037 9-9-4.037-9-9-9z"
                      />
                      <path
                        className={`fill-current text-gray-400 ${
                          pathname === '/' && 'text-indigo-200'
                        }`}
                        d="M12 15c-1.654 0-3-1.346-3-3 0-.462.113-.894.3-1.285L6 6l4.714 3.301A2.973 2.973 0 0112 9c1.654 0 3 1.346 3 3s-1.346 3-3 3z"
                      />
                    </svg>
                    <span
                      className={` ${
                        pathname === '/' && 'text-indigo-300'
                      } text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200`}
                    >
                      Dashboard
                    </span>
                  </div>
                </Link>
              </li>

              <li
                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                  pathname.includes('tuition') && 'bg-gray-900'
                }`}
              >
                <Link
                  href="/student/tuition"
                  className={`block text-gray-200 hover:text-white truncate transition duration-150 ${
                    pathname.includes('tuition') && 'hover:text-gray-200'
                  }`}
                >
                  <div className="flex items-center">
                    <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                      <path
                        className={`fill-current text-gray-600 ${
                          pathname.includes('tuition') && 'text-indigo-500'
                        }`}
                        d="M 0 0 L 0 24 L 4.479 21.184 L 8.206 23.527 L 11.935 21.184 L 15.662 23.527 L 19.392 21.184 L 23.875 23.999 L 24 0.13 L 0 0 Z M 22.37 21.549 L 19.392 19.679 L 15.663 22.022 L 11.935 19.679 L 8.206 22.022 L 4.479 19.679 L 1.504 21.549 L 1.504 1.171 L 22.37 1.171 L 22.37 21.549 Z"
                      />

                      <path
                        className={`fill-current text-gray-400 ${
                          pathname.includes('tuition') && 'text-indigo-300'
                        }`}
                        d="M 12.333 17 L 6.994 11.557 L 7.025 10.479 C 9.53 10.62 11.478 10.404 11.933 8.473 L 6.593 8.448 L 7.457 7.269 L 11.717 7.318 C 11.068 6.22 9.283 6.085 6.5 6.165 L 7.457 5.011 L 16.5 5 L 15.605 6.139 L 13.105 6.139 C 13.562 6.532 13.897 6.985 13.908 7.368 L 16.5 7.344 L 15.605 8.472 L 13.877 8.497 C 13.607 10.181 11.708 11.178 9.309 11.407 L 14.684 16.999 L 12.333 16.999 L 12.333 17 Z"
                      />
                    </svg>
                    <span
                      className={` ${
                        pathname.includes('tuition') && 'text-indigo-300'
                      } text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200`}
                    >
                      Online Tuition
                    </span>
                  </div>
                </Link>
              </li>

              <li
                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                  pathname.includes('chapters') && 'bg-gray-900'
                }`}
              >
                <Link
                  href="/student/books"
                  className={`block text-gray-200 hover:text-white truncate transition duration-150 ${
                    pathname.includes('chapters') && 'hover:text-gray-200'
                  }`}
                >
                  <div className="flex items-center">
                    <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                      <path
                        className={`fill-current text-gray-600 ${
                          pathname.includes('chapters') && 'text-indigo-500'
                        }`}
                        d="M 23.994 0.606 C 23.994 0.271 23.652 0 23.23 0 L 4.711 0 C 2.11 0 0 1.679 0 3.737 L 0 20.263 C 0 22.326 2.116 24 4.711 24 L 23.237 24 C 23.659 24 24 23.729 24 23.394 L 24 6.873 C 24 6.538 23.659 6.267 23.237 6.267 L 4.711 6.267 C 2.954 6.267 1.521 5.13 1.521 3.737 C 1.521 2.343 2.954 1.206 4.711 1.206 L 23.237 1.206 C 23.652 1.206 23.994 0.935 23.994 0.606 Z M 4.711 7.473 L 22.473 7.473 L 22.473 22.794 L 4.711 22.794 C 2.954 22.794 1.521 21.657 1.521 20.263 L 1.521 6.484 C 2.358 7.099 3.482 7.473 4.711 7.473 Z"
                      ></path>

                      <path
                        className={`fill-current text-gray-600 ${
                          pathname.includes('chapters') && 'text-indigo-500'
                        }`}
                        d="M 5.727 3 C 5.324 3 5 3.335 5 3.75 C 5 4.165 5.324 4.5 5.727 4.5 L 22.273 4.5 C 22.676 4.5 23 4.165 23 3.75 C 23 3.335 22.676 3 22.273 3 L 5.727 3 Z"
                      ></path>
                    </svg>
                    <span
                      className={` ${
                        pathname.includes('chapters') && 'text-indigo-300'
                      } text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200`}
                    >
                      Books
                    </span>
                  </div>
                </Link>
              </li>

              <li
                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                  pathname.includes('testinomial') && 'bg-gray-900'
                }`}
              >
                <Link
                  href="/testinomial"
                  className={`block text-gray-200 hover:text-white truncate transition duration-150 ${
                    pathname.includes('testinomial') && 'hover:text-gray-200'
                  }`}
                >
                  <div className="flex items-center">
                    <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                      <path
                        className={`fill-current text-gray-600 ${
                          pathname.includes('testinomial') && 'text-indigo-500'
                        }`}
                        d="M0 20h24v2H0z"
                      />
                      <path
                        className={`fill-current text-gray-400 ${
                          pathname.includes('testinomial') && 'text-indigo-300'
                        }`}
                        d="M4 18h2a1 1 0 001-1V8a1 1 0 00-1-1H4a1 1 0 00-1 1v9a1 1 0 001 1zM11 18h2a1 1 0 001-1V3a1 1 0 00-1-1h-2a1 1 0 00-1 1v14a1 1 0 001 1zM17 12v5a1 1 0 001 1h2a1 1 0 001-1v-5a1 1 0 00-1-1h-2a1 1 0 00-1 1z"
                      />
                    </svg>
                    <span
                      className={` ${
                        pathname.includes('testinomial') && 'text-indigo-300'
                      } text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200`}
                    >
                      Testinomials
                    </span>
                  </div>
                </Link>
              </li>
              <li
                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                  pathname.includes('orders') && 'bg-gray-900'
                }`}
              >
                <Link
                  href="/orders"
                  className={`block text-gray-200 hover:text-white truncate transition duration-150 ${
                    pathname.includes('orders') && 'hover:text-gray-200'
                  }`}
                >
                  <div className="flex items-center">
                    <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                      <path
                        className={`fill-current text-gray-600 ${
                          pathname.includes('orders') && 'text-indigo-500'
                        }`}
                        d="M0 20h24v2H0z"
                      />
                      <path
                        className={`fill-current text-gray-400 ${
                          pathname.includes('orders') && 'text-indigo-300'
                        }`}
                        d="M4 18h2a1 1 0 001-1V8a1 1 0 00-1-1H4a1 1 0 00-1 1v9a1 1 0 001 1zM11 18h2a1 1 0 001-1V3a1 1 0 00-1-1h-2a1 1 0 00-1 1v14a1 1 0 001 1zM17 12v5a1 1 0 001 1h2a1 1 0 001-1v-5a1 1 0 00-1-1h-2a1 1 0 00-1 1z"
                      />
                    </svg>
                    <span
                      className={` ${
                        pathname.includes('orders') && 'text-indigo-300'
                      } text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200`}
                    >
                      Orders
                    </span>
                  </div>
                </Link>
              </li>
              <li
                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                  pathname.includes('services') && 'bg-gray-900'
                }`}
              >
                <Link
                  href="/service"
                  className={`block text-gray-200 hover:text-white truncate transition duration-150 ${
                    pathname.includes('service') && 'hover:text-gray-200'
                  }`}
                >
                  <div className="flex items-center">
                    <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                      <path
                        className={`fill-current text-gray-600 ${
                          pathname.includes('service') && 'text-indigo-500'
                        }`}
                        d="M0 20h24v2H0z"
                      />
                      <path
                        className={`fill-current text-gray-400 ${
                          pathname.includes('service') && 'text-indigo-300'
                        }`}
                        d="M4 18h2a1 1 0 001-1V8a1 1 0 00-1-1H4a1 1 0 00-1 1v9a1 1 0 001 1zM11 18h2a1 1 0 001-1V3a1 1 0 00-1-1h-2a1 1 0 00-1 1v14a1 1 0 001 1zM17 12v5a1 1 0 001 1h2a1 1 0 001-1v-5a1 1 0 00-1-1h-2a1 1 0 00-1 1z"
                      />
                    </svg>
                    <span
                      className={` ${
                        pathname.includes('service') && 'text-indigo-300'
                      } text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200`}
                    >
                      Services
                    </span>
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
