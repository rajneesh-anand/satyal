import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Logowhite from "@components/ui/whitelogo";
import MenuIcon from "@components/icons/menu-icon";
import { Drawer } from "@components/common/drawer";
import dynamic from "next/dynamic";
import { getDirection } from "@utils/get-direction";
import { useUI } from "@contexts/ui.context";
import UserMenu from "@components/layout-dashboard-teacher/header/menu";

const MobileMenu = dynamic(
  () => import("@components/layout-dashboard-teacher/header/mobile-menu")
);

type Props = {
  sidebarOpen: boolean;
  setSidebarOpen: (text: boolean) => void;
};

const Header: React.FC<Props> = ({ sidebarOpen, setSidebarOpen }: Props) => {
  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);
  const { locale } = useRouter();
  const dir = getDirection(locale);
  const { openSidebar, closeSidebar, displaySidebar } = useUI();
  const contentWrapperCSS = dir === "ltr" ? { left: 0 } : { right: 0 };
  function handleMobileMenu() {
    return openSidebar();
  }

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
    <header className="sticky top-0 bg-red-700 lg:bg-gray-200 border-b border-gray-400 z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-14 ">
          <button
            aria-label="Menu"
            className="lg:hidden text-white outline-none focus:outline-none"
            onClick={handleMobileMenu}
          >
            <MenuIcon />
          </button>

          <Logowhite className="lg:hidden" />
          <UserMenu />
        </div>
      </div>

      <Drawer
        placement={dir === "rtl" ? "right" : "left"}
        open={displaySidebar}
        onClose={closeSidebar}
        handler={false}
        showMask={true}
        level={null}
        contentWrapperStyle={contentWrapperCSS}
      >
        <MobileMenu />
      </Drawer>
    </header>
  );
};

export default Header;
