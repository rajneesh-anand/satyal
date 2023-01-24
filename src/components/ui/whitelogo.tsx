import Image from "next/image";
import Link from "@components/ui/link";
import cn from "classnames";
import { siteSettings } from "@settings/site-settings";

const WhiteLogo: React.FC<React.AnchorHTMLAttributes<{}>> = ({
  className,
  href = siteSettings.whitelogo.href,
  ...props
}) => {
  return (
    <Link
      href={href}
      className={cn("inline-flex focus:outline-none", className)}
      {...props}
    >
      <Image
        src={siteSettings.whitelogo.url}
        alt={siteSettings.whitelogo.alt}
        height={siteSettings.whitelogo.height}
        width={siteSettings.whitelogo.width}
        layout="fixed"
        loading="eager"
      />
    </Link>
  );
};

export default WhiteLogo;
