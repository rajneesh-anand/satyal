import React from "react";
import StudentDashboardLayout from "@components/layout-dashboard-student";
import Questions from "@components/teacher/question-page";

function Question() {
  return (
    <StudentDashboardLayout>
      <Questions />
    </StudentDashboardLayout>
  );
}

export default Question;
