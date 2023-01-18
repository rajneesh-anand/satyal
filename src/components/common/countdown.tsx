import React from "react";
import Countdown, { zeroPad } from "react-countdown";

type ReactCountdownProps = {
  date: string | number | Date | undefined;
};

const renderer = ({ hours, minutes, seconds, completed }: any) => {
  if (completed) {
    return null;
  } else {
    return (
      <span className="flex items-center text-skin-inverted font-semibold ml-2 pr-6">
        <span className="flex items-center justify-center min-w-[30px] md:min-w-[37px] min-h-[30px] bg-skin-fill text-skin-base rounded p-1 mx-1 md:mx-1.5">
          {zeroPad(hours)}
        </span>
        :
        <span className="flex items-center justify-center min-w-[30px] md:min-w-[37px] min-h-[30px] bg-skin-fill text-skin-base rounded p-1 mx-1 md:mx-1.5">
          {zeroPad(minutes)}
        </span>
        :
        <span className="flex items-center justify-center min-w-[30px] md:min-w-[37px] min-h-[30px] bg-skin-fill text-skin-base rounded p-1 mx-1 md:mx-1.5">
          {zeroPad(seconds)}
        </span>
      </span>
    );
  }
};

const ReactCountdown: React.FC<ReactCountdownProps> = ({ date }) => {
  return <Countdown date={date} renderer={renderer} />;
};

export default ReactCountdown;
