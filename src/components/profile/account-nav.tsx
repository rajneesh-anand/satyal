import Link from "@components/ui/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import LogoutIcon from "@components/icons/account-logout";
import { useSession, signOut } from "next-auth/react";
import classNames from "classnames";

type Option = {
  name: string;
  slug: string;
  icon?: JSX.Element;
};

export default function AccountNav({ options }: { options: Option[] }) {
  const { t } = useTranslation("common");
  const { pathname } = useRouter();

  const newPathname = pathname.split("/").slice(3, 4);
  const mainPath = `/${newPathname[0]}`;

  return (
    <aside className="hidden shrink-0 ltr:mr-8 rtl:ml-8 lg:block lg:w-80">
      <div className="overflow-hidden rounded border border-border-200 bg-light">
        <ul className="py-7">
          {options.map((item: any, idx) => {
            const menuPathname = item.slug.split("/").slice(3, 4);
            const menuPath = `/${menuPathname[0]}`;

            return (
              <li className="py-1" key={idx}>
                <Link
                  href={item.slug}
                  className={classNames(
                    "block border-l-4 border-transparent py-2 px-10 font-semibold text-heading transition-colors hover:text-accent focus:text-accent",
                    {
                      "!border-accent text-accent": pathname === item.slug,
                    }
                  )}
                >
                  {t(item.name)}
                </Link>
              </li>
            );
          })}
        </ul>
        <ul className="border-t border-border-200 bg-light py-4">
          <li className="block py-2 px-11 ">
            <button
              onClick={() => signOut()}
              className={classNames(
                "font-semibold text-heading transition-colors hover:text-accent focus:text-accent"
              )}
            >
              Sign Out
            </button>
          </li>
        </ul>
        {/* End of bottom part menu */}
      </div>
    </aside>
  );
}
