import React, { useState } from 'react';
import Sidebar from '@components/layout-dashboard-teacher/sidebar';
import Header from '@components/layout-dashboard-teacher/header';
import StickyMenu from './menu';
import DashboardHeader from './header/dashboardheader';
import { useRouter } from 'next/router';

export default function TeacherDashboardLayout({ children }: React.PropsWithChildren) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const url = router.pathname.includes('teacher/question')
    ? "url('/images/background.png')"
    : '';

  return (
    <div className="flex h-screen overflow-hidden relative">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/* <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> */}

        <DashboardHeader />
        {/* new dashboard header for mobile and tablet */}
        <main>
          <div
            className="px-4 py-2 w-full max-w-9xl mx-auto"
            style={{
              backgroundImage: url,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              // backgroundSize: "cover",
              height: '450px',
              // marginTop: "  px",
            }}
          >
            {children}
          </div>
        </main>
      </div>
      <StickyMenu />
    </div>
  );
}
