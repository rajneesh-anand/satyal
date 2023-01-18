import React from "react";
import { createPopper } from "@popperjs/core";

const Popover = () => {
  const [popoverShow, setPopoverShow] = React.useState(false);
  const btnRef = React.createRef<HTMLButtonElement>();
  const popoverRef = React.createRef<HTMLDivElement>();
  const openTooltip = () => {
    createPopper(btnRef.current, popoverRef.current, {
      placement: "bottom",
    });
    setPopoverShow(true);
  };
  const closeTooltip = () => {
    setPopoverShow(false);
  };
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full text-center">
          <button
            className="font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onMouseEnter={openTooltip}
            onMouseLeave={closeTooltip}
            ref={btnRef}
          >
            top blueGray
          </button>
          <div
            className={
              (popoverShow ? "" : "hidden ") +
              "border mr-3 block  font-normal leading-normal text-sm max-w-xs text-left no-underline break-words rounded-lg"
            }
            ref={popoverRef}
          >
            <div>
              <div className=" opacity-75 font-semibold p-3 mb-0 border-b border-solid border-blueGray-100 uppercase rounded-t-lg">
                blueGray tooltip title
              </div>
              <div className=" p-3">
                And here's some amazing content. It's very engaging. Right?
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Popover;
