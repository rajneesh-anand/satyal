import Image from 'next/image'
import React from 'react'
import AvatarImage from '../../../../public/images/avatar.svg'

export default function index({logInUser}) {
    let{firstName,middleName,lastName,email,userContactNumber,userType,address,city,image,studentClass,parentName,parentContactNumber,schoolName,schoolContact,schoolAddress,schoolCity}=logInUser;
    
    
    return (
    <>
      <div className='w-full '>
        <div className='w-full mx-auto lg:w-5/6 py-4 px-4 sm:px-[40px] bg-secondary-background rounded-md'>
            <figure className='w-ful flex flex-col items-center justify-center '>
                <div className='relative h-[80px] sm:h-[100px] w-[80px] sm:w-[100px] rounded-full border-4 border-solid border-dark-footer overflow-hidden'>
                   <Image
                   src={image?(image):(AvatarImage)}
                   alt='profile image'
                   width={100}
                   height={100}
                   />
                </div>
                <h2 className='text-md sm:text-lg font-semibold text-primary-marine-blue'>{firstName}<span className='px-2'>{middleName}</span>{lastName}</h2>
            </figure>
            <div className='w-full my-[10px] flex flex-col sm:flex-row sm:justify-between '>
                
               <div className=''>
                <p className='text-md font-normal my-[5px] text-primary-marine-blue '><span className='pr-4 font-bold'>Email :</span>{email}</p>
                <p className='text-md font-normal my-[5px] text-primary-marine-blue'><span className='pr-4 font-bold'>Contact Number :</span>{userContactNumber}</p>
                <p className='text-md font-normal my-[5px] text-primary-marine-blue'><span className='pr-4 font-bold'>Address :</span>{address},{city } </p>
               </div>
               {
                    (userType=="Student")?(
                        <div className=''>
                        <p className='text-md font-normal my-[5px] text-primary-marine-blue '><span className='pr-4 font-bold'>Class :</span>{JSON.parse(studentClass).value}</p>
                        <p className='text-md font-normal my-[5px] text-primary-marine-blue '><span className='pr-4 font-bold'>Parent's Name :</span>{parentName}</p>
                        <p className='text-md font-normal my-[5px] text-primary-marine-blue '><span className='pr-4 font-bold'>Parent's Number :</span>{parentContactNumber}</p>
                        </div> 
                    ):(<div className=''>
                    <p className='text-md font-normal my-[5px] text-primary-marine-blue '><span className='pr-4 font-bold'>School Name :</span>{schoolName}</p>
                    <p className='text-md font-normal my-[5px] text-primary-marine-blue '><span className='pr-4 font-bold'>School Number :</span>{schoolContact}</p>
                    <p className='text-md font-normal my-[5px] text-primary-marine-blue '><span className='pr-4 font-bold'>School Address :</span>{schoolAddress} , {schoolCity}</p>
                    </div>)
                }
               
               
            </div>
        </div>
        
      </div>
    </>
  )
}
