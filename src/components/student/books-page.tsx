import Container from '@components/ui/container';
import { useSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react';
import Link from '@components/ui/link';

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-4">
        {books &&
          books.map((item, idx) => (
            <div key={idx} className="group relative rounded-lg overflow-hidden">
              <img
                src={`/images/test/colorful.jpg`}
                className="w-full h-64 object-cover"
                alt="Book cover"
              />
              <div className="absolute inset-0 bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-60"></div>
              <div className="absolute inset-0 flex flex-col justify-center items-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <h4 className="text-brown text-2xl font-lg">Science</h4>
                <p className="text-brown text-md font-lg">for class XI</p>
                <div className="mt-4">
                  <Link href={`/student/book/colorful`}>
                    <button className="py-2 px-8 uppercase bg-brown opacity-100 hover:bg-brown-mid text-white text-md font-md rounded-md hover:text-white-dark">
                      Read
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>
    </Container>
  );
}
