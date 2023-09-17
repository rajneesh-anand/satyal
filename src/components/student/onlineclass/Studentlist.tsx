import Heading from '@components/ui/heading'
import React from 'react'
import {HeadingType} from '../../../../enums/tittle'

export default function Studentlist() {
  return (
    <>
      <section className='w-[350px] sm:w-[600px] lg:w-[1100px] h-[500px] sm:h-[700px] bg-secondary-background rounded-lg px-3 sm:px-4 py-3'>
        <div className='w-full flex justify-center border-b border-solid border-mid-footer'>
            <Heading variant={HeadingType.LargeTitle}>Student's List</Heading>
        </div>
      </section>
    </>
  )
}
