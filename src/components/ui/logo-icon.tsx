import Image from "@components/ui/image";
import AnchorLink from "@components/ui/links/anchor-link";
import { useIsMounted } from "@utils/use-is-mounted";

import lightLogo from "@assets/images/logo-icon.svg";
import darkLogo from "@assets/images/logo-icon-white.png";

const Logo: React.FC<React.SVGAttributes<{}>> = (props) => {
  const isMounted = useIsMounted();

  return (
    <div className="flex cursor-pointer outline-none" {...props}>
      <span className="relative flex overflow-hidden">
        {isMounted && <Image src={darkLogo} alt="Criptic" priority />}
        {isMounted && <Image src={lightLogo} alt="Criptic" priority />}
      </span>
    </div>
  );
};

export default Logo;
