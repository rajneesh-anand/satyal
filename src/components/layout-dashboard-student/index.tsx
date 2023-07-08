import React, { useState } from 'react';
import Sidebar from '@components/layout-dashboard-student/sidebar';
import Header from '@components/layout-dashboard-student/header';

export default function ProfileLayout({ children }: React.PropsWithChildren) {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden ">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main>
          <div className="px-4 py-2 w-full max-w-9xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
