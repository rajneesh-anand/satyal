import { useState } from "react";
import Link from "@components/ui/link";
import { siteSettings } from "@settings/site-settings";
import Scrollbar from "@components/ui/scrollbar";
import { IoIosArrowDown } from "react-icons/io";
import Logo from "@components/ui/logo";
import { useUI } from "@contexts/ui.context";
import { useTranslation } from "next-i18next";
import cn from "classnames";

import {
  IoLogoInstagram,
  IoLogoTwitter,
  IoLogoFacebook,
  IoLogoYoutube,
  IoClose,
} from "react-icons/io5";

const social = [
  {
    id: 0,
    link: "https://www.facebook.com/redqinc/",
    icon: <IoLogoFacebook />,
    className: "facebook",
    title: "text-facebook",
  },
  {
    id: 1,
    link: "https://twitter.com/redqinc",
    icon: <IoLogoTwitter />,
    className: "twitter",
    title: "text-twitter",
  },
  {
    id: 2,
    link: "https://www.youtube.com/channel/UCjld1tyVHRNy_pe3ROLiLhw",
    icon: <IoLogoYoutube />,
    className: "youtube",
    title: "text-youtube",
  },
  {
    id: 3,
    link: "https://www.instagram.com/redqinc/",
    icon: <IoLogoInstagram />,
    className: "instagram",
    title: "text-instagram",
  },
];

export default function MobileMenu() {
  const [activeMenus, setActiveMenus] = useState<any>([]);
  const { site_header } = siteSettings;
  const { closeSidebar } = useUI();
  const { t } = useTranslation("menu");
  const handleArrowClick = (menuName: string) => {
    let newActiveMenus = [...activeMenus];
    if (newActiveMenus.includes(menuName)) {
      var index = newActiveMenus.indexOf(menuName);
      if (index > -1) {
        newActiveMenus.splice(index, 1);
      }
    } else {
      newActiveMenus.push(menuName);
    }
    setActiveMenus(newActiveMenus);
  };

  const ListMenu = ({
    dept,
    data,
    hasSubMenu,
    menuName,
    menuIndex,
    className = "",
  }: any) =>
    data.label && (
      <li className={`transition-colors duration-200 ${className}`}>
        <div className="flex items-center justify-between relative">
          <Link
            href={data.path}
            className="relative w-full py-4 transition duration-300 ease-in-out menu-item ltr:pl-5 rtl:pr-5 md:ltr:pl-7 md:rtl:pr-7 ltr:pr-4 rtl:pl-4 text-brand-dark"
          >
            <span className="block w-full" onClick={closeSidebar}>
              {t(`${data.label}`)}
            </span>
          </Link>
          {hasSubMenu && (
            <div
              className="cursor-pointer w-full h-8 text-[17px] px-5 flex-shrink-0 flex items-center justify-end text-skin-base text-opacity-80 absolute end-0 top-1/2 transform -translate-y-1/2"
              onClick={() => handleArrowClick(menuName)}
            >
              <IoIosArrowDown
                className={`transition duration-200 ease-in-out transform ${
                  activeMenus.includes(menuName) ? "-rotate-180" : "rotate-0"
                }`}
              />
            </div>
          )}
        </div>
        {hasSubMenu && (
          <SubMenu
            dept={dept}
            data={data.subMenu}
            toggle={activeMenus.includes(menuName)}
            menuIndex={menuIndex}
          />
        )}
      </li>
    );

  const SubMenu = ({ dept, data, toggle, menuIndex }: any) => {
    if (!toggle) {
      return null;
    }

    dept = dept + 1;

    return (
      <ul className={cn("mobile-sub-menu", dept > 2 && "-ms-4")}>
        {data?.map((menu: any, index: number) => {
          const menuName: string = `sidebar-submenu-${dept}-${menuIndex}-${index}`;

          return (
            <ListMenu
              dept={dept}
              data={menu}
              hasSubMenu={menu.subMenu}
              menuName={menuName}
              key={menuName}
              menuIndex={index}
              className={cn(dept > 1 && "pl-4", dept > 2 && "pl-8")}
            />
          );
        })}
      </ul>
    );
  };

  return (
    <>
      <div className="flex flex-col justify-between w-full h-full">
        <div className="w-full border-b border-border-base flex justify-between items-center relative ltr:pl-5 rtl:pr-5 md:ltr:pl-7 md:rtl:pr-7 shrink-0 py-0.5">
          <div role="button" onClick={closeSidebar} className="inline-flex">
            <Logo />
          </div>

          <button
            className="flex text-2xl items-center justify-center px-4 md:px-5 py-5 lg:py-8 focus:outline-none transition-opacity hover:opacity-60"
            onClick={closeSidebar}
            aria-label="close"
          >
            <IoClose className="text-skin-base mt-0.5" />
          </button>
        </div>

        <div className="flex items-center justify-center bg-skin-fill border-t border-skin-base px-7 flex-shrink-0 space-s-1 py-5">
          {social?.map((item, index) => (
            <Link
              href={item.link}
              className={`text-heading space-s-6 transition duration-300 ease-in text-skin-base text-opacity-60 hover:text-skin-primary ${item.className}`}
              key={index}
            >
              <span className="sr-only">{t(`${item.title}`)}</span>
              {item.icon}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
