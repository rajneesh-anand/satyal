import React from 'react'
import {IonlineClassNote} from '../../../../types/server/props';
import {HeadingType} from '../../../../enums/tittle'
import Heading from '@components/ui/heading';
import Notice from '@components/common/onlineClass/Notice';
import { Button } from '@components/ui/button/dashboard-button';
import {ButtonSize,ButtonType} from '../../../../enums/buttons'
import Scrollbar from '@components/ui/scrollbar';

interface IProps{
  notes:IonlineClassNote[]
}
export default function viewnote({notes}:IProps) {
  // console.log(notes);
  
  return (
    <>
      <section className='py-3 px-4 flex flex-col w-[370px] sm:w-[700px] h-[600px] sm:h-[900px] lg:w-[1000px] lg:h-[700px] bg-secondary-background opacity-100 rounded-lg'>
        <div className='py-0 sm:py-2 w-full text-center border-b border-solid border-mid-footer'>
          <Heading variant={HeadingType.MediumHeading}>ALL NOTES</Heading>
        </div>
        <div className='w-full h-full overflow-y-auto py-2 sm:py-4 '>
          
         {
          notes&&notes.map((note)=>{
            return(
              <div className='flex justify-between py-2 px-1 sm:px-2 my-2' key={note.id}>
                 <Notice note={note}/>
                 <div className='ml-[10px] h-[30px]'>
                 <Button type={ButtonType.Secondary} size={ButtonSize.Medium}>Delete</Button>
                 </div>
                
            </div>
            )
          })
         }
      
        </div>
      </section>
    </>
  )
}
