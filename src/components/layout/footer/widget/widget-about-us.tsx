import { useTranslation } from "next-i18next";
import Link from "next/link";
import WhiteLogo from "@components/ui/whitelogo";
import Text from "@components/ui/text";
import Image from "@components/ui/image";
import { ROUTES } from "@utils/routes";

interface AboutProps {
  className?: string;
  social?: {
    id: string | number;
    path?: string;
    name: string;
    image: string;
    width: number;
    height: number;
  }[];
}
const WidgetAbout: React.FC<AboutProps> = ({ social, className }) => {
  const { t } = useTranslation("footer");

  return (
    <div className={`py-10 sm:pb-0 ${className}`}>
      <WhiteLogo
        href={ROUTES.HOME}
        className="inline-flex focus:outline-none mx-auto mb-3 lg:mb-5 sm:ltr:ml-0 sm:rtl:mr-0"
      />
      {social && (
        <ul className="flex flex-wrap justify-center mb-4">
          {social?.map((item) => (
            <li
              className="transition hover:opacity-80 last:ltr:mr-0 md:ltr:mr-5 md:mx-0 ltr:mr-4 last:rtl:ml-0 rtl:ml-4 md:rtl:ml-5"
              key={`social-list--key${item.id}`}
            >
              <Link href={item.path ? item.path : "/#"}>
                <a target="_blank" rel="noreferrer">
                  <Image
                    src={item.image}
                    alt={item.name}
                    height={item.height}
                    width={item.width}
                    className="transform scale-85 md:scale-100"
                  />
                </a>
              </Link>
            </li>
          ))}
        </ul>
      )}
      <Text className="text-slate-100">{t("text-about-us")}</Text>
    </div>
  );
};

export default WidgetAbout;
