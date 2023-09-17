import Heading from '@components/ui/heading'
import React from 'react'
import {HeadingType} from '../../../../enums/tittle'

export default function ViewNotice() {
  return (
    <>
      <section className='w-[350px] sm:w-[800px] h-[600px] sm:h-[600px] bg-secondary-background rounded-lg px-3 sm:px-4 py-2'>
       <div className='w-full flex justify-center border-b border-solid border-mid-footer'>
        <Heading variant={HeadingType.MediumHeading}>ALL NOTICE</Heading>
       </div>
      </section>
    </>
  )
}
