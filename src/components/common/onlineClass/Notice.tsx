import React from 'react'
import {IonlineClassNote} from '../../../../types/server/props'

interface Ichinldren{
  note:IonlineClassNote
}
export default function Notice({note}:Ichinldren) {
  let{id,content,createdAt}=note;
  let dateTime=createdAt.split('T');
  // console.log(dateTime[1]);
  
  return (
    <>
      <section className='w-full py-3 my-1 px-0 border-b border-solid border-mid-footer flex flex-col sm:flex-row'>
        <div className='sm:w-[100px] lg:w-[150px] '>
        <span className='text-lg font-bold text-dark-footer'>{dateTime[0]} :</span>
        </div>
        <p className='text-md font-normal text-dark-footer'>{content}</p>
      </section>
    </>
  )
}
