import cn from "classnames";
import Sidebar from "@components/profile/sidebar";
import Header from "@components/profile/header";
import { useUserContext } from "@contexts/user/user.context";
import React, { useEffect } from "react";

export default function ProfileLayout({
  children,
  contentClassName,
  data,
}: React.PropsWithChildren<{ contentClassName?: string; data: any }>) {
  const { addUser, user } = useUserContext();

  useEffect(() => {
    addUser(data);
  }, []);

  return user ? (
    <div className="ltr:xl:pl-72 rtl:xl:pr-72 ltr:2xl:pl-80 rtl:2xl:pr-80">
      <Header />
      <Sidebar className="hidden xl:block" />
      <main
        className={cn(
          "min-h-[100vh] px-4 pt-4 pb-16 sm:px-6 sm:pb-20 lg:px-8 xl:pb-24 3xl:px-10 3xl:pt-0.5",
          contentClassName
        )}
      >
        {children}
      </main>
    </div>
  ) : null;
}
