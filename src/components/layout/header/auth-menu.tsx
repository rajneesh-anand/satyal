import React, { useState, useRef, useEffect, Fragment } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "@components/ui/link";
import { Menu, Transition } from "@headlessui/react";
import cn from "classnames";
import { useRouter } from "next/router";

function AuthMenu() {
  const { data: session, status } = useSession();

  function handleSignOut() {
    signOut();
  }

  return (
    <Menu
      as="div"
      className="relative inline-block ltr:text-left rtl:text-right"
    >
      <Menu.Button className="flex items-center focus:outline-none">
        <img
          className="w-8 h-8 rounded-full"
          src={session?.user?.image ?? "/images/avatar.svg"}
          width="32"
          height="32"
          alt="User"
        />
        <div className="flex items-center truncate">
          <span className="truncate ml-2 text-sm uppercase  text-gray-100">
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
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          as="ul"
          className={cn(
            "absolute mt-1 w-32 rounded bg-gray-100 pb-4 shadow-700 focus:outline-none ltr:right-0 ltr:origin-top-right rtl:left-0 rtl:origin-top-left"
          )}
        >
          {/* <Menu.Item>
            <li className="flex w-full items-center justify-between bg-accent-500 px-6 py-4 text-xs font-semibold capitalize text-light focus:outline-none ltr:text-left rtl:text-right">
              <span>{session?.user?.name}</span>
            </li>
          </Menu.Item> */}

          <Menu.Item>
            {({ active }) => (
              <li>
                <Link
                  href={
                    session?.user?.userType === "Student"
                      ? `/student/${session?.user?.id}`
                      : `/teacher/${session?.user?.id}`
                  }
                  className={cn(
                    "block w-full pt-4 pb-3 px-6 text-[12px] font-semibold uppercase text-heading transition duration-200 hover:text-red-800 focus:outline-none ltr:text-left rtl:text-right",
                    active ? "text-red-600" : "text-heading"
                  )}
                >
                  My Account
                </Link>
              </li>
            )}
          </Menu.Item>

          <Menu.Item>
            <li>
              <button
                onClick={handleSignOut}
                className={cn(
                  "block w-full pb-4 px-6 text-[12px] font-semibold uppercase text-heading transition duration-200 hover:text-accent focus:outline-none ltr:text-left rtl:text-right"
                )}
              >
                Sign Out
              </button>
            </li>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default AuthMenu;
