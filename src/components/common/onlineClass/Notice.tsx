import React from 'react'

export default function Notice() {
  return (
    <>
      <section className='w-full py-2 px-0 border-b border-solid border-mid-footer flex flex-col sm:flex-row'>
        <div className='sm:w-[100px] lg:w-[150px] '>
        <span className='text-lg font-bold text-dark-footer'>today :</span>
        </div>
        <p className='text-md font-normal text-dark-footer'>Utilities for controlling the width of an element's borders.</p>
      </section>
    </>
  )
}
