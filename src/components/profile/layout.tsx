import Container from "@components/ui/container";
import AccountNav from "@components/profile/account-nav";
import { ROUTES } from "@utils/routes";
import SettingsIcon from "@components/icons/account-settings";
import OrdersIcon from "@components/icons/account-order";
import WishlistIcon from "@components/icons/account-wishlist";
import MapIcon from "@components/icons/account-address";
import NotificationIcon from "@components/icons/account-notification";
import HelpIcon from "@components/icons/account-help";
import NoticeIcon from "@components/icons/account-notice";
import { IoSettingsOutline } from "react-icons/io5";
import { signOut } from "next-auth/react";
import Link from "@components/ui/link";
import classNames from "classnames";
import { useRouter } from "next/router";

type student = {
  firstName: string;
  lastName: string;
  id?: number;
};

type Props = {
  children?: React.ReactNode;
  data: student;
};

const AccountLayout: React.FC<Props> = ({ children, data }) => {
  const router = useRouter();
  const pathname = router.asPath;
  console.log(pathname);
  return (
    <Container>
      <div className="pt-10 2xl:pt-12 pb-12 lg:pb-14 xl:pb-16 2xl:pb-20 xl:max-w-screen-xl 2xl:max-w-[1300px] mx-auto">
        <div className="flex flex-col lg:flex-row w-full">
          <aside className="hidden shrink-0 ltr:mr-8 rtl:ml-8 lg:block lg:w-80">
            <div className="overflow-hidden rounded border border-border-200 bg-light">
              <ul className="py-7">
                <li className="py-1">
                  <Link
                    href={`/dashboard/student/${data.id}/account`}
                    className={classNames(
                      "block border-l-4 border-transparent py-2 px-10 font-semibold text-heading transition-colors hover:text-accent focus:text-accent",
                      {
                        "!border-rose-900 text-rose-800":
                          pathname == `/dashboard/student/${data.id}`,
                      }
                    )}
                  >
                    Account Settings
                  </Link>
                </li>
                <li className="py-1">
                  <Link
                    href={`/dashboard/student/${data.id}/course`}
                    className={classNames(
                      "block border-l-4 border-transparent py-2 px-10 font-semibold text-heading transition-colors hover:text-accent focus:text-accent",
                      {
                        "!border-rose-900 text-rose-800":
                          pathname == `/dashboard/student/${data.id}/course`,
                      }
                    )}
                  >
                    Cource Videos
                  </Link>
                </li>
                <li className="py-1">
                  <Link
                    href={`/dashboard/student/${data.id}/help`}
                    className={classNames(
                      "block border-l-4 border-transparent py-2 px-10 font-semibold text-heading transition-colors hover:text-accent focus:text-accent",
                      {
                        "!border-rose-900 text-rose-800":
                          pathname == `/dashboard/student/${data.id}/help`,
                      }
                    )}
                  >
                    Help
                  </Link>
                </li>
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

          <div className="w-full mt-4 lg:mt-0 border border-skin-base p-4 sm:p-5 lg:py-8 2xl:py-10 lg:px-9 2xl:px-12 rounded-md">
            <h4>
              {data.firstName} {data.lastName}
            </h4>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AccountLayout;
