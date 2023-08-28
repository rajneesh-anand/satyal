import Image from 'next/image'
import React from 'react'

export default function kycdetails({kycinfo}) {
    let  {accountName,accountNumber,bankBranch,bankName,subjectList,bachelorDegree,citizenPhotoFirstPage,citizenPhotoLastPage,masterDegree,schoolIdentityCard}=kycinfo.teacherkycs[0];
    let subjects=JSON.parse(subjectList)
  
    
  return (
    <>
       <div className='w-full my-[20px] sm:my-[40px]'>
        <div className='w-full mx-auto lg:w-5/6 py-4 px-4 sm:px-[40px] bg-secondary-background rounded-md'>
        <div className='flex flex-col sm:flex-row sm:justify-between'>
            <div className=''>
            <h2 className='text-lg font-bold text-primary-marine-blue my-[15px] sm:my[20px]'>Your Banking Account Information</h2>
            <p className='text-md font-normal my-[5px] text-primary-marine-blue '><span className='pr-4 font-semibold'>Selected Subjects :</span>
            {subjects.map((item)=>{
                return(
                    <span className='px-1'>{item.value},</span>
                )})}</p>
            <p className='text-md font-normal my-[5px] text-primary-marine-blue '><span className='pr-4 font-semibold'>Bank Name :</span>{bankName}</p>
            <p className='text-md font-normal my-[5px] text-primary-marine-blue '><span className='pr-4 font-semibold'>Bank Branch :</span>{bankBranch}</p>
            <p className='text-md font-normal my-[5px] text-primary-marine-blue '><span className='pr-4 font-semibold'>Account Holder Name :</span>{accountName}</p>
            <p className='text-md font-normal my-[5px] text-primary-marine-blue '><span className='pr-4 font-semibold'>Account Number :</span>{accountNumber}</p>
            
            </div>
            <div className=''>
                <h2 className='text-lg font-bold text-primary-marine-blue my-[15px] sm:my[20px]'>KYC Information</h2>
                <div className='my-[10px] py-[10px]'>
                    <p>citizenship First Page</p>
                    <figure className='w-[200px] h-[100px] relative border border-solid border-black'>
                    <img 
                    src={citizenPhotoFirstPage}
                    alt='citizenship First Page'
                    // width={200}
                    // height={100}
                    />
                    </figure>
                
                </div>
                <div className='my-[10px] py-[10px]'>
                    <p>citizenship Last Page</p>
                    <figure className='w-[200px] h-[100px] relative border border-solid border-black'>
                    <img 
                    src={citizenPhotoLastPage}
                    alt='citizenship First Page'
                    // width={200}
                    // height={100}
                    />
                    </figure>
                
                </div>
                <div className='my-[10px] py-[10px]'>
                    <p>School Indentity Cart</p>
                    <figure className='w-[200px] h-[100px] relative border border-solid border-black'>
                    <img 
                    src={schoolIdentityCard}
                    alt='School Indentity Cart'
                    width={200}
                    height={100}
                    />
                    </figure>
                
                </div>
                <div className='my-[10px] py-[10px]'>
                    <p>Bachlor Degree </p>
                    <figure className='w-[200px] h-[100px] relative border border-solid border-black'>
                    <img 
                    src={bachelorDegree}
                    alt='Bachlor Degree'
                    // width={200}
                    // height={100}
                    />
                    </figure>
                
                </div>
                <div className='my-[10px] py-[10px]'>
                    <p>Master Degree</p>
                    <figure className='w-[200px] h-[100px] relative border border-solid border-black'>
                    <img 
                    src={masterDegree}
                    alt='Master Degree'
                    // width={200}
                    // height={100}
                    />
                    </figure>
                
                </div>
            </div>
        </div>
        </div>
     
      </div>
    </>
  )
}
