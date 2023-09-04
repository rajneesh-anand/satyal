import Select from '@components/ui/select/select'
import React from 'react'
import { statesOptions, classOptions, ValueType } from "@data/constant";
import {Ibookclassmodal} from '../../../types/props'
export default function bookclassmodal({setBookOfClass,fetchBookApi}:Ibookclassmodal) {

  return (
    <>
      {/* <section className='w-full h-full flex justify-center items-center fixed z-50 bg-black opacity-75'
    > */}
        <div className='w-11/12 h-[350px] sm:h-[450px] sm:w-[600px] bg-secondary-background opacity-100 rounded-lg'>
            <div className='w-full h-full pt-[25px] sm:pt-[25px] flex flex-col items-center px-[20px]'>
                <h2 className='mx-auto text-xl  sm:text-2xl font-bold text-dark-footer'>Please select Class</h2>
                  <div className='my-[30px] mb-[50px] w-full lg:w-[340px]   md:ml-[30px]'>
                    <Select 
                    id='class'
                    options={classOptions}
                    onChange={(value: ValueType) => setBookOfClass(value)}/> 
                  </div>
                  <button className='mt-[40px] sm:mt-[50px] py-2 px-4 bg-dark-footer rounded-md text-white text-md font-bold hover:bg-mid-footer'
                  onClick={fetchBookApi}>Submit</button>
            </div>
        </div>
      {/* </section> */}
    </>
  )
}
