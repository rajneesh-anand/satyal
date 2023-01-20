import Avatar from "@components/ui/avatar";
import { StaticImageData } from "next/image";

type AuthorCardProps = {
  image?: StaticImageData;
  name?: string;
  role?: string;
};

export default function AuthorCard({ image, name, role }: AuthorCardProps) {
  return (
    <div
      className={`rounded-lg flex items-center ${
        name ? "bg-orange-50 p-5" : "ml-3 justify-center bg-none p-5"
      }`}
    >
      <div className="text-center">
        <Avatar
          image={image}
          alt={name ? name : ""}
          className="dark:border-gray-400 "
        />
      </div>
      <div className="ltr:pl-3 rtl:pr-3">
        <h3 className="text-sm font-medium uppercase tracking-wide text-gray-900 dark:text-white">
          {name}
        </h3>
        <span className="mt-1 block text-xs text-gray-600 dark:text-gray-400">
          {role}
        </span>
      </div>
    </div>
  );
}
