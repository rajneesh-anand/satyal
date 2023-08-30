import React from 'react'
import Link from "@components/ui/link";
import Container from "@components/ui/container";
import { useSession } from "next-auth/react";
interface Icover{
    cover:string
}
export default function bookthumbnail({cover}:Icover) {
    const { data: session, status } = useSession();
  return (
    <>
        <div className="group h-[200px] md:h-[300px] relative rounded-lg overflow-hidden shadow-xl hover:cursor-pointer "
              >
                <img
                  src={cover}
                  className="w-full h-full "
                  alt="Book cover"
                />
                <div className="absolute inset-0 bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-60"></div>
                <div className="absolute inset-0 flex flex-col justify-center items-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="mt-4">
                    <Link
                      href='/'
                    >
                      <button className="py-2 md:py-2 px-6 md:px-8 text-sm md:text-md uppercase bg-brown opacity-100 group-hover:bg-brown-mid text-white text-md font-md rounded-md hover:text-white-dark">
                        Read
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
     
    </>
  )
}
