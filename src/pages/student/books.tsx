import React from 'react';
import StudentDashboardLayout from '@components/layout-dashboard-student';
import StudentBooks from '@components/student/books-page';

export default function BooksPage() {
  return (
    <StudentDashboardLayout>
      <StudentBooks />
    </StudentDashboardLayout>
  );
}
