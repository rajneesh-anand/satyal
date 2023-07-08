import React from 'react';
import { useRouter } from 'next/router';
import StudentDashboardLayout from '@components/layout-dashboard-student';

export default function Book() {
  const router = useRouter();
  const { books } = router.query;

  // Parse the books query parameter back into an array
  const parsedBook = decodeURIComponent(books as string);

  console.log('Yo books ho hai Read button thichera:', parsedBook);

  return (
    <StudentDashboardLayout>
      <h1 className="text-3xl">Student Read Book</h1>
      <div>
        <p>Book: {parsedBook}</p>
      </div>
    </StudentDashboardLayout>
  );
}
