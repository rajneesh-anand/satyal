import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useTranslation } from "next-i18next";
import cn from "classnames";
import { ROUTES } from "@utils/routes";
import { useUI } from "@contexts/ui.context";
import { siteSettings } from "@settings/site-settings";
import { addActiveScroll } from "@utils/add-active-scroll";
import Container from "@components/ui/container";
import Logo from "@components/ui/logo";
import HeaderMenu from "@components/layout/header/header-menu";
import Search from "@components/common/search";
import LanguageSwitcher from "@components/ui/language-switcher";
import UserIcon from "@components/icons/user-icon";
import SearchIcon from "@components/icons/search-icon";
import { useModalAction } from "@components/common/modal/modal.context";
import useOnClickOutside from "@utils/use-click-outside";
import MenuIcon from "@components/icons/menu-icon";
import { FiMenu } from "react-icons/fi";
import Delivery from "@components/layout/header/delivery";
import CategoryDropdownMenu from "@components/category/category-dropdown-menu";
const AuthMenu = dynamic(() => import("./auth-menu"), { ssr: false });
import { Drawer } from "@components/common/drawer/drawer";
import { getDirection } from "@utils/get-direction";
import { useRouter } from "next/router";

const MobileMenu = dynamic(
  () => import("@components/layout/header/mobile-menu")
);
const CartButton = dynamic(() => import("@components/cart/cart-button"), {
  ssr: false,
});

type DivElementRef = React.MutableRefObject<HTMLDivElement>;
const { site_header } = siteSettings;

const Header: React.FC = () => {
  const { locale } = useRouter();
  const { t } = useTranslation("common");
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
  const [categoryMenu, setCategoryMenu] = useState(Boolean(false));
  addActiveScroll(siteHeaderRef, 40);
  useOnClickOutside(siteSearchRef, () => closeSearch());
  function handleLogin() {
    openModal("LOGIN_VIEW");
  }

  function handleCategoryMenu() {
    setCategoryMenu(!categoryMenu);
  }

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
              <AuthMenu
                isAuthorized={isAuthorized}
                href={ROUTES.ACCOUNT}
                btnProps={{
                  children: t("text-sign-in"),
                  onClick: handleLogin,
                }}
              >
                {t("text-account")}
              </AuthMenu>
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
