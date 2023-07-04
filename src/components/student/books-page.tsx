import Container from "@components/ui/container";
import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";

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
      <div className="grid grid-cols-12 gap-4 py-4">
        {books &&
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
          ))}
      </div>
    </Container>
  );
}
