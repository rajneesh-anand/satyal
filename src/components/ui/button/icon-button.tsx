import React from 'react'
import cn from 'classnames';
import { AiOutlineDelete } from "react-icons/ai";

interface Iprop{
    type? : string;
    size? : string;
    className?:string;
    children :React.ReactNode;
    tootltipeMessage?:string;
    onClick?: () => void;
}

export default function IconButton({
    type = "primary",
    size = "large",
    children,
    className,
    onClick
}:Iprop) {
    const buttonType=
    type==="primary"
    ? "text-dark-footer hover:bg-dark-footer hover:text-white"
    : type === "secondary"
    ? "text-black hover:bg-slate-300"
    :""

    const buttonSize=
    size==="large"
    ? "px-2 py-2 text-2xl font-bold"
    :size==="medium"
    ? "px-1 py-1 text-xl "
    :""
  return (
    <>
      <button className={cn('rounded-full px-2 py-2', buttonType, buttonSize,className)}
      onClick={onClick}>
        {children}
      </button>
    </>
  )
}
