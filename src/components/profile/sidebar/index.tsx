import cn from "classnames";
import AuthorCard from "@components/ui/author-card";
import { MenuItem } from "@components/ui/collapsible-menu";
import { menuItems } from "@components/profile/sidebar/menu-items";
import { useUserContext } from "@contexts/user/user.context";
import AuthorImage from "@assets/placeholders/category.png";
import Logo from "@components/ui/logo";
import Button from "@components/ui/button";
import { Close } from "@components/icons/close";
import { useDrawer } from "@components/drawer-views/context";
import AccountLogoutIcon from "@components/icons/account-logout";
import { signOut } from "next-auth/react";

export default function Sidebar({ className }: { className?: string }) {
  const { user } = useUserContext();
  const { closeDrawer } = useDrawer();

  return (
    <aside
      className={cn(
        "top-0 z-40 h-full w-full max-w-full border-dashed bg-slate-100 ltr:left-0 ltr:border-r rtl:right-0 rtl:border-l dark:border-gray-700 dark:bg-dark xs:w-80 xl:fixed  xl:w-72 2xl:w-80",
        className
      )}
    >
      <div className="relative flex items-center bg-skin-primary justify-between overflow-hidden px-6 py-4 2xl:px-8 ">
        <Logo />
        <div className="md:hidden">
          <Button
            title="Close"
            color="white"
            shape="circle"
            variant="transparent"
            size="small"
            onClick={closeDrawer}
          >
            <Close className="h-auto w-3.5 text-white" />
          </Button>
        </div>
      </div>

      <div className="px-6 py-5 2xl:px-8">
        <AuthorCard
          image={user.image ? user.image : AuthorImage}
          name={`${user.firstName}  ${user.lastName}`}
          role={user.userType}
        />

        <div className="mt-4">
          {menuItems(user.id).map((item, index) => (
            <MenuItem
              key={"default" + item.name + index}
              name={item.name}
              href={item.href}
              icon={item.icon}
            />
          ))}
          <button
            onClick={() => signOut()}
            className="relative flex h-10 items-center whitespace-nowrap rounded-lg px-4 text-sm text-black transition-all hover:text-skin-primary "
          >
            <span className="relative z-[1] ltr:mr-3 rtl:ml-3">
              <AccountLogoutIcon />
            </span>
            <span className="relative z-[1]">Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
