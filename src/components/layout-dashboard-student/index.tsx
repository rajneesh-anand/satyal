import React, { useState } from "react";
import Sidebar from "@components/layout-dashboard-student/sidebar";
import Header from "@components/layout-dashboard-student/header";
import StickyMenu from "./menu";
import DashboardHeader from "./header/dashboardheader";

export default function ProfileLayout({ children }: React.PropsWithChildren) {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  return (
    <div className="flex h-screen  overflow-y-hidden relative">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden  pb-[80px] sm:pb-[110px] lg:pb-0 ">
        {/* <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> */}
        <DashboardHeader />
        {/* new header of student dashboard for mobile and tablet*/}
        <main>
          <div className=" px-0 md:px-4  py-2 w-full max-w-9xl mx-auto ">
            {children}
          </div>
        </main>
      </div>
      <StickyMenu />
    </div>
  );
}
