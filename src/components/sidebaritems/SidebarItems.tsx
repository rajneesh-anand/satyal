import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "@components/ui/link";

function SidebarItems({ Icon: Icon, path, title }) {
  const pathname = useRouter();
  return (
    <li
      className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
        pathname.asPath === path && "bg-gray-900"
      }`}
    >
      <Link
        href={path}
        className={`block text-gray-200 hover:text-white truncate transition duration-150 ${
          pathname === path && "hover:text-gray-200"
        }`}
      >
        <div className="lg:sidebar-expanded:flex">
          <Image src={Icon} height={30} width={30} />
          <span
            className={` ${
              pathname === path && "text-indigo-300"
            }  text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 `}
          >
            {title}
          </span>
        </div>
      </Link>
    </li>
  );
}

export default SidebarItems;
