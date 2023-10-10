import React from 'react'
import {IonlineClassNote} from '../../../../types/server/props'
import { AiOutlineDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import IconButton from '@components/ui/button/icon-button';

interface Ichinldren{
  note:IonlineClassNote;
  handelDeleteNotice?:(id: number, onlineClassCode: number) => void
}
export default function Notice({note,handelDeleteNotice}:Ichinldren) {
  let{id,content,createdAt, onlineClassId}=note;
  let dateTime=createdAt.split('T');
  // console.log(dateTime[1]);
  
  return (
    <>
      <section className='w-full py-3 my-1 px-0 border-b border-solid border-mid-footer flex flex-col sm:flex-row'>
        <div className='mr-2 sm:mr-4 flex justify-between sm:block '>
           <div className=''>
            <span className='text-lg font-bold text-dark-footer block'>{dateTime[0]} </span>
            <span className='text-lg font-bold text-dark-footer block'>{dateTime[1]}</span>
            </div>
            <div className='pl-[20px] flex sm:hidden items-center'>
                  <IconButton type='primary' size='large' onClick={()=>handelDeleteNotice(id,onlineClassId)}>
                    <AiOutlineDelete/>
                  </IconButton>
                </div>
        </div> 
        <p className='text-md font-normal text-dark-footer'>{content}</p>
      </section>
    </>
  )
}