import React from "react";
// import StudentDashboardLayout from "@components/layout-dashboard-student";
import Questions from "@components/teacher/question-page";
import TeacherDashboardLayout from "@components/layout-dashboard-teacher";

function Question() {
  return (
    <TeacherDashboardLayout>
      <Questions />
    </TeacherDashboardLayout>
  );
}

export default Question;
