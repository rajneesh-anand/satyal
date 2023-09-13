import React, { FormEvent, useState } from 'react'
import { Button } from '@components/ui/button/dashboard-button'
import Heading from '@components/ui/heading'
import {ButtonSize,ButtonType} from '../../../../enums/buttons'
import Textarea from '@components/ui/textarea'
import {IteacherNoteProps} from '../../../../types/props'

export default function AddNote({teacherNote,setTeacherNote,handelSubmitNote}:IteacherNoteProps) {
let handelCleanNote=()=>{
  setTeacherNote('');
}
  
  return (
    <>
      <section className='py-3 px-4 flex flex-col w-[350px] sm:w-[500px] h-[300px] sm:h-[400px] bg-secondary-background opacity-100 rounded-lg'>
       <div className='w-full h-[40px] flex justify-center items-center'>
        <Heading variant='mediumHeading'>Add Note</Heading>
       </div>
       <div className='h-full w-full my-3  overflow-hidden'>
        <Textarea 
        placeholder='You can add note to the class'
        className=''
        name='teachernote'
        onChange={(e:FormEvent<HTMLInputElement>)=>{
          setTeacherNote(e.currentTarget.value)
        }}
         value={teacherNote}
         
        />
       </div>
       <div className=' flex justify-end w-full h-[40px] '>
        <Button type={ButtonType.Secondary} size={ButtonSize.Medium} onClick={handelCleanNote} className='mx-6 sm:mx-8'>Cancle</Button>
        <Button type={ButtonType.Primary} size={ButtonSize.Medium} onClick={handelSubmitNote}>Save</Button>
       </div>
      </section>
    </>
  )
}
