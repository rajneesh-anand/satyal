import React ,{useState,FormEvent} from 'react'
import Heading from '@components/ui/heading'
import {HeadingType} from '../../../../enums/tittle'
import {ButtonSize,ButtonType} from '../../../../enums/buttons'
// import Input from '@components/ui/input'
import { Input } from '@components/form/teacher/input'
import { Button } from "@components/ui/button/dashboard-button";
import Alert from '@components/ui/alert'


interface Iprops{
  onlineClassCode:number;
  handelNoteModalState:() => void;
  setRefresh:React.Dispatch<React.SetStateAction<string>>
}

export default function Addmeetinglink({onlineClassCode,handelNoteModalState,setRefresh}:Iprops) {
    let[classLink,setClassLink]=useState<string>('');
    let[showRequired,setShowRequired]=useState(false);
    let[error,setError]=useState<string>();
   
    

    let handelClassLink=(e:FormEvent<HTMLInputElement>)=>{
        setClassLink(e.currentTarget.value);
    }

    //update class link funtion
    let handelAddLink=async()=>{
      if(classLink){
        try{
         let response=await fetch(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/onlineClassTeacher/updateLink`,{
          method:'PATCH',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify({
            onlineClassId:onlineClassCode,
            meetingLink:classLink
          })
         })
         if(response?.status===200){
          setRefresh('link updated');
          handelNoteModalState();          
         }else if(response?.status==404){
          setError('sorry this class does not exit')
         }else{
          setError('Internel server error');
         }
        }catch(err){
          setError(err);
        }

      }else{
        setShowRequired(true)
      }
    }
    
    
  return (
    <>
      <section className='flex flex-col justify-between px-3 py-6 w-[350px] sm:w-[450px] h-[300px] rounded-lg bg-secondary-background'>
        <div className=' flex justify-center border-b border-solid border-mid-footer'>
            <Heading variant={HeadingType.MediumHeading}>Add Meeting Link</Heading>
        </div>
        {(error)?(
           <div className='w-full '>
            <Alert message={error} variant='error'/>
           </div>
        ):null}
          
        <div className=' px-0 sm:px-2 w-full h-[45px] '>
          <Input
           placeholder='meeting link'
           label='Please add Google meet Link'
           value={classLink}
           onChange={(e: FormEvent<HTMLInputElement>) =>
              handelClassLink(e) }
          showRequired={showRequired && !classLink}
          />
        </div>
        <div className='w-full flex justify-end'>
        <Button  type={ButtonType.Primary} size={ButtonSize.Medium} onClick={handelAddLink}>SAVE</Button>
        </div>
      </section>
     
    </>
  )
}
