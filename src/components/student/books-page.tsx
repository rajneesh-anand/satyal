import Container from '@components/ui/container';
import { useSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react';
import Link from '@components/ui/link';

export default function StudentBooks() {
  const { data: session, status } = useSession();
  const [books, setBooks] = useState<string[]>();
  const [bookCovers, setBookCovers] = useState<string[]>();
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchStudentBooks = async () => {
      if (session) {
        const studentClass = JSON.parse(session?.user?.className).value;
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/test/book/${studentClass}`
        );
        const { data } = await res.json();
        console.log('Yo books ho hai:', data.books[0]);
        console.log('Yo books ko images ho hai:', data.images);
        setBooks(data.books);
        setBookCovers(data.images);
      }
    };
    fetchStudentBooks();
  }, [session]);

  const getImageDetails = (bookCovers) => {
    const bookNames = bookCovers.map((item) => {
      // Get the file name from the URL
      const url = item.substring(item.lastIndexOf('/') + 1);

      // Extract the desired part without the extension
      const bookName = url.substring(0, url.lastIndexOf('.')).replace(/-/g, ' ');

      return bookName;
    });
    return bookNames;
  };

  // // Function to fetch the authenticated image URL
  // const getImageUrl = async (item) => {
  //   useEffect(() => {
  //     const fetchImageUrl = async () => {
  //       try {
  //         const response = await fetch(
  //           `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/test/image/${item}`
  //         );
  //         const { authenticatedUrl } = await response.json();
  //         setImageUrl(authenticatedUrl);
  //       } catch (error) {
  //         console.error('Error fetching image URL:', error);
  //         // Handle the error or set a default URL as per your requirements
  //       }
  //     };

  //     fetchImageUrl();
  //   }, [item]);
  // };

  return (
    <Container>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-4">
        {bookCovers &&
          bookCovers.map((item, idx) => (
            <div
              key={idx}
              className="group relative rounded-lg overflow-hidden shadow-xl"
            >
              <img
                // src={'/images/test/colorful.jpg'}
                src={item}
                className="w-full h-64 object-cover"
                alt="Book cover"
              />
              <h1>{idx}</h1>
              <div className="absolute inset-0 bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-60"></div>
              <div className="absolute inset-0 flex flex-col justify-center items-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <h4 className="text-brown text-2xl font-lg text-center whitespace-normal">
                  {getImageDetails(bookCovers)[idx]}
                </h4>
                <p className="text-brown text-md font-lg">
                  for {JSON.parse(session?.user?.className).value}
                </p>
                <div className="mt-4">
                  <Link
                    href={`/student/book/${
                      JSON.parse(session?.user?.className).value
                    }?books=${encodeURIComponent(books[idx])}`}
                  >
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
