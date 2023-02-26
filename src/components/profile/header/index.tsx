// import { useRouter } from "next/router";
// import cn from "classnames";
// import Logo from "@components/ui/whitelogo";
// import { useWindowScroll } from "@utils/use-window-scroll";
// import { FlashIcon } from "@components/icons/flash";
// import Hamburger from "@components/ui/hamburger";
// import ActiveLink from "@components/ui/links/active-link";
// import { useIsMounted } from "@utils/use-is-mounted";
// import { useDrawer } from "@components/drawer-views/context";
// // import WalletConnect from '@/components/nft/wallet-connect';

// function NotificationButton() {
//   return (
//     <ActiveLink href="/notification">
//       <div className="relative flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-gray-100 bg-white text-brand shadow-main transition-all hover:-translate-y-0.5 hover:shadow-large focus:-translate-y-0.5 focus:shadow-large focus:outline-none dark:border-gray-700 dark:bg-light-dark dark:text-white sm:h-12 sm:w-12">
//         <FlashIcon className="h-auto w-3 sm:w-auto" />
//         <span className="absolute top-0 right-0 h-2.5 w-2.5 rounded-full bg-brand shadow-light sm:h-3 sm:w-3" />
//       </div>
//     </ActiveLink>
//   );
// }

// function HeaderRightArea() {
//   return (
//     <div className="relative order-last flex shrink-0 items-center gap-4 sm:gap-6 lg:gap-8">
//       <NotificationButton />
//       {/* <WalletConnect /> */}
//     </div>
//   );
// }

// export default function Header({ className }: { className?: string }) {
//   const router = useRouter();
//   const isMounted = useIsMounted();
//   const { openDrawer } = useDrawer();
//   const windowScroll = useWindowScroll();
//   return (
//     <nav
//       className={cn(
//         "xl:hidden sticky top-0 z-30 h-16 w-full transition-all bg-skin-primary duration-300 ltr:right-0 rtl:left-0 sm:h-20 3xl:h-24",
//         (isMounted && windowScroll.y) > 2
//           ? "bg-skin-primary shadow-card backdrop-blur dark:from-dark dark:to-dark/80"
//           : "",
//         className
//       )}
//     >
//       <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8 3xl:px-10">
//         <div className="flex items-center ">
//           <Logo />
//         </div>
//         <div className="mx-2 block sm:mx-4 ">
//           <Hamburger
//             isOpen={false}
//             variant="transparent"
//             onClick={() => openDrawer("DASHBOARD_SIDEBAR")}
//             className="text-white"
//           />
//         </div>
//       </div>
//     </nav>
//   );
// }

import React, { useState, useEffect, useRef } from "react";
import Link from "@components/ui/link";
import { useRouter } from "next/router";
import Image from "@components/ui/image";

import UserMenu from "@components/profile/header/navigation/user-menu";

type Props = {
  sidebarOpen: boolean;
  setSidebarOpen: (text: boolean) => void;
};

const Header: React.FC<Props> = ({ sidebarOpen, setSidebarOpen }: Props) => {
  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const router = useRouter();
  const pathname = router.pathname;

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
    document?.addEventListener("click", clickHandler);
    return () => document?.removeEventListener("click", clickHandler);
  });

  useEffect(() => {
    let bodyElement: Element | null = document.querySelector("body");
    if (sidebarExpanded) {
      bodyElement?.classList.add("sidebar-expanded");
    } else {
      bodyElement?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <header className="sticky top-0 bg-gray-200 border-b border-gray-400 z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between lg:justify-end h-14 ">
          <button
            className="text-gray-500 hover:text-gray-600 lg:hidden"
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
            onClick={() => setSidebarExpanded(!sidebarExpanded)}
          >
            <span className="sr-only">Open sidebar</span>
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="4" y="5" width="16" height="2" />
              <rect x="4" y="11" width="16" height="2" />
              <rect x="4" y="17" width="16" height="2" />
            </svg>
          </button>

          <UserMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
