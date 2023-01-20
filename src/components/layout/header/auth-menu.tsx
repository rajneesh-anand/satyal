import React, { useState, useRef, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { Transition } from "@components/ui/transition";
import Link from "@components/ui/link";

function AuthMenu() {
  const { data: session, status } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = (ev: Event) => {
      if (
        !dropdownOpen ||
        dropdown?.current.contains(ev.target) ||
        trigger.current.contains(ev.target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  return (
    <div className="relative inline-flex pl-2">
      <button
        ref={trigger}
        className="inline-flex justify-center items-center group"
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        <img
          className="w-8 h-8 rounded-full"
          src={session?.user?.image ?? "/images/avatar.svg"}
          width="32"
          height="32"
          alt="User"
        />
        <div className="flex items-center truncate">
          <span className="truncate ml-2 text-sm font-semibold uppercase  text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 via-pink-600 to-red-600 group-hover:text-gray-800">
            {session?.user?.name}
          </span>
          <svg
            className="w-3 h-3 shrink-0 ml-1 fill-current text-gray-400"
            viewBox="0 0 12 12"
          >
            <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
          </svg>
        </div>
      </button>

      <Transition
        className="origin-top-right z-10 absolute top-full right-0 rounded bg-white border border-gray-200 shadow-lg overflow-hidden mt-2 bg-gradient-to-r from-indigo-500 to-blue-500"
        show={dropdownOpen}
        enter="transition ease-out duration-200 transform"
        enterFrom="opacity-0 -translate-y-2"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div
          ref={dropdown}
          onFocus={() => setDropdownOpen(true)}
          onBlur={() => setDropdownOpen(false)}
          className="px-[16px] py-[8px]"
        >
          <div className="pt-0.5 pb-2 px-3 mb-3 border-b border-gray-200">
            <div className="font-medium text-white uppercase">
              {session?.user?.name}
            </div>
          </div>
          <div className="text-center mb-3">
            <Link
              href="/user/account"
              className="text-white hover:text-yellow-400 font-semibold uppercase text-xs"
            >
              My Account
            </Link>

            <button
              className="font-body inline-block mt-3 px-4 py-2 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded  hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
              onClick={() => signOut()}
            >
              Sign Out
            </button>
          </div>
        </div>
      </Transition>
    </div>
  );
}

export default AuthMenu;
