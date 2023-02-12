import { HomeIcon } from "@components/icons/home";
import { FarmIcon } from "@components/icons/farm";
import { PoolIcon } from "@components/icons/pool";
import { ProfileIcon } from "@components/icons/profile";
import { DiskIcon } from "@components/icons/disk";
import { InfoIcon } from "@components/icons/info-icon";
import { VoteIcon } from "@components/icons/vote-icon";
import { PlusCircle } from "@components/icons/plus-circle";
import { CompassIcon } from "@components/icons/compass";

export const menuItems = (id: any) => {
  return [
    {
      name: "Home",
      icon: <HomeIcon />,
      href: `/student/${id}`,
    },
    {
      name: "Course",
      icon: <FarmIcon />,
      href: `/student/${id}/course`,
    },
    {
      name: "Help",
      icon: <PlusCircle />,
      href: `/student/${id}/help`,
    },
    {
      name: "Tuition",
      icon: <PoolIcon />,
      href: `/student/${id}/tuition`,
    },
    {
      name: "Teachers",
      icon: <CompassIcon />,
      href: `/student/${id}/teachers`,
    },
    {
      name: "My purchase",
      icon: <PlusCircle />,
      href: `/student/${id}/purchase`,
    },

    {
      name: "Profile",
      icon: <ProfileIcon />,
      href: `/student/${id}/profile`,
    },
  ];
};
