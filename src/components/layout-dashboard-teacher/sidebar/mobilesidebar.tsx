import Logo from "@components/ui/logo";
import React from "react";
import { IoClose } from "react-icons/io5";
import { useUI } from "@contexts/ui.context";
import Image from "next/image";
import Logoimage from "../../../../public/images/logo.svg";
import MobileSidebarHeader from "@components/common/mobilesidebar/sidebarheader";
import MobileSidebarMenu from "@components/common/mobilesidebar/sidebarmenu";
import PraticeQuestion from "../../../assets/icons/Question.svg";
import OnlineTest from "../../../assets/icons/Online Test.svg";

const menuItems = [
  {
    id: 1,
    menuTitle: "Question Makers",
    menuLink: "/teacher/question",
    menuIcon: PraticeQuestion,
  },
  {
    id: 2,
    menuTitle: "Online Test",
    menuLink: "/teacher/dashboard",
    menuIcon: OnlineTest,
  },
];
export default function Mobilesidebar() {
  const { closeSidebar } = useUI();
  return (
    <>
      <div className="w-full h-full py-2 sm:py-4 px-4 ">
        <div className="w-full h-full ">
          <MobileSidebarHeader />
          <MobileSidebarMenu menuItems={menuItems} />
        </div>
      </div>
    </>
  );
}
