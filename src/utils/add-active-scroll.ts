import { useEffect, RefObject } from "react";

export function addActiveScroll<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  topOffset: number = 50
) {
  useEffect(() => {
    const element = ref?.current;
    const listener = () => {
      if (window.scrollY >= topOffset) {
        element?.classList.add("nav-sticky");
      } else {
        element?.classList.remove("nav-sticky");
      }
    };
    document.addEventListener("scroll", listener);
    return () => {
      document.removeEventListener("scroll", listener);
    };
  }, []);
}
