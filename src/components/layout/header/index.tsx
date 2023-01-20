import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import cn from "classnames";
import { useUI } from "@contexts/ui.context";
import { siteSettings } from "@settings/site-settings";
import { addActiveScroll } from "@utils/add-active-scroll";
import Container from "@components/ui/container";
import Logo from "@components/ui/logo";
import { useSession } from "next-auth/react";
import { useModalAction } from "@components/common/modal/modal.context";
import useOnClickOutside from "@utils/use-click-outside";
import MenuIcon from "@components/icons/menu-icon";
import { Drawer } from "@components/common/drawer";
import { getDirection } from "@utils/get-direction";
import { useRouter } from "next/router";
import AuthMenu from "@components/layout/header/auth-menu";
import Link from "@components/ui/link";

const MobileMenu = dynamic(
  () => import("@components/layout/header/mobile-menu")
);

type DivElementRef = React.MutableRefObject<HTMLDivElement>;
const { site_header } = siteSettings;

const Header: React.FC = () => {
  const { data: session, status } = useSession();
  const { locale } = useRouter();
  const dir = getDirection(locale);
  const {
    displaySearch,
    displayMobileSearch,
    openSearch,
    closeSearch,
    isAuthorized,
    openSidebar,
    closeSidebar,
    displaySidebar,
  } = useUI();
  const { openModal } = useModalAction();
  const siteHeaderRef = useRef() as DivElementRef;
  const siteSearchRef = useRef() as DivElementRef;
  const contentWrapperCSS = dir === "ltr" ? { left: 0 } : { right: 0 };
  addActiveScroll(siteHeaderRef, 40);
  useOnClickOutside(siteSearchRef, () => closeSearch());

  function handleMobileMenu() {
    return openSidebar();
  }

  return (
    <header
      id="siteHeader"
      ref={siteHeaderRef}
      className={cn(
        "sticky-header sticky top-0 z-20 lg:relative w-full",
        displayMobileSearch && "active-mobile-search"
      )}
    >
      <div className="navbar w-screen lg:w-full transition-all duration-200 ease-in-out body-font bg-skin-fill z-20">
        <Container className="top-bar flex items-center justify-between py-3 lg:py-1 border-b border-skin-base">
          <Logo className="logo -mt-1.5 md:-mt-1 md:pl-0 md:ml-auto lg:mx-0" />
          <div className=" hidden lg:block">
            {/* <HeaderMenu
              data={site_header.menu}
              className="flex items-center justify-center transition-all duration-200 ease-in-out"
            /> */}
          </div>
          <div className="flex flex-shrink-0 space-l-5 xl:space-l-7">
            <div className="hidden lg:flex items-center flex-shrink-0 ">
              {status === "loading" ? null : session ? (
                <AuthMenu />
              ) : (
                <div className="inline-flex items-center">
                  <Link
                    href="/auth/signin"
                    className="font-body inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Sign In
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div className="items-center flex lg:hidden shrink-0 xl:mx-3.5 mx-2.5">
            <button
              aria-label="Menu"
              className="flex flex-col items-center justify-center flex-shrink-0 outline-none focus:outline-none"
              onClick={handleMobileMenu}
            >
              <MenuIcon />
            </button>
          </div>
        </Container>

        {/* End of menu part */}
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
