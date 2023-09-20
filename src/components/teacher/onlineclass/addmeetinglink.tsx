import React ,{useState,FormEvent} from 'react'
import Heading from '@components/ui/heading'
import {HeadingType} from '../../../../enums/tittle'
import {ButtonSize,ButtonType} from '../../../../enums/buttons'
import Input from '@components/ui/input'
import { Button } from "@components/ui/button/dashboard-button";

export default function Addmeetinglink() {
    let[classLink,setClassLink]=useState<string>('');
    let handelClassLink=(e:FormEvent<HTMLInputElement>)=>{
        setClassLink(e.currentTarget.value);
    }
    console.log(classLink);
    
  return (
    <>
      <section className='flex flex-col justify-between px-3 py-6 w-[350px] sm:w-[450px] h-[300px] rounded-lg bg-secondary-background'>
        <div className=' flex justify-center border-b border-solid border-mid-footer'>
            <Heading variant={HeadingType.MediumHeading}>Add Class Link</Heading>
        </div>
        <div className=' px-0 sm:px-2 w-full h-[45px] '>
          <Input name='meetingLink' placeholder='meeting link'
          variant='solid' value={classLink}
          onChange={handelClassLink}
         
          label='Please add Google meet Link'/>
        </div>
        <div className='w-full flex justify-end'>
        <Button  type={ButtonType.Primary} size={ButtonSize.Medium}>SAVE</Button>
        </div>
      </section>
    </>
  )
}
