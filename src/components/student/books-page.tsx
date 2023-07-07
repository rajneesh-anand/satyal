import Container from '@components/ui/container';
import { useSession } from 'next-auth/react';
import Link from "@components/ui/link";
import React, { useState, useEffect } from 'react';


export default function StudentBooks() {
  const { data: session, status } = useSession();
  const [books, setBooks] = useState<string[]>();

  useEffect(() => {
    const fetchStudentBooks = async () => {
      if (session) {
        const studentClass = JSON.parse(session?.user?.className).value;
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/test/book/${studentClass}`
        );
        const { data } = await res.json();
        console.log(data);
        setBooks(data);
      }
    };
    fetchStudentBooks();
  }, [session]);

  return (
    <Container>
      <div className="grid grid-cols-12 gap-4 py-4 ">
        {/* {books &&
          books.map((item, idx) => (
            <div
              key={idx}
              className="col-span-12 lg:col-span-3 text-center bg-slate-200 rounded-lg relative shadow-sm hover:bg-slate-300 "
            >
              <div className="mt-6 w-fit mx-auto">
                <img
                  src="/images/avatar.svg"
                  className="rounded-full w-28 "
                  alt="profile picture"
                />
              </div>

              <button>Read</button>
            </div>
          ))} */}
          <div className='group w-[250px] h-[300px] shadow-card rounded-lg overflow-hidden  hover:cursor-pointer hover:shadow-cardHover'>
            <div className='w-full h-full  relative z-0'>
              <img src='/images/test/math11.jpg' className='w-full h-full object-cover'/>
              <div className='absolute w-full h-full inset-0 bg-black-500 flex flex-col justify-end '>
                <div className='w-full h-[130px]  text-center'>
                  <h4 className='text-2xl font-lg text-white opacity-100'>Mathmatics</h4>
                  <p className='text-md font-lg text-white'>for class XI</p>
                   <div className='my-4 '>
                   <Link  href={`/student/book/math11`} 
                    className='py-2 px-6  bg-blue-800 text-md font-md text-white rounded-md hover:bg-blue-900'>Read</Link>
                   </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    </Container>
  );
}
