import React, { useEffect, useState } from "react";
// import StudentDashboardLayout from "@components/layout-dashboard-student";
import Questions from "@components/teacher/question-page";
import TeacherDashboardLayout from "@components/layout-dashboard-teacher";
import { paperType } from "@data/constant";

function Question() {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState();
  const [className, setClassName] = useState();
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTrue, setIsTrue] = useState(false);

  const [data, setData] = useState([]);

  function handleQuestionChange(value) {
    const a = selectedQuestions.some(
      (item) => JSON.stringify(item) === JSON.stringify(value)
    );
    if (Boolean(a)) {
      const result = selectedQuestions.filter(
        (el) => JSON.stringify(value) !== JSON.stringify(el)
      );

      setSelectedQuestions(result);
    } else {
      setSelectedQuestions([...selectedQuestions, value]);
    }
  }

  function handleClassChange(value) {
    setClassName(value.value);
    setSubjects(value.subject);
  }

  function handleSubjectChange(value) {
    setSelectedSubject(value.value);
    setSelectedQuestions([]);
  }

  function handleSubmit() {
    if (selectedSubject && className) {
      getQuestions();
    } else {
      alert("Please select a subject, class, and question before submitting.");
    }
  }

  async function getQuestions() {
    setIsLoading(true);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/questions/${className}/${selectedSubject}`
    );

    if (res) {
      const { questions } = await res.json();
      setData(questions);
      setIsLoading(false);
      setIsTrue(true);
      // setClassName(null);
      // setSelectedSubject(null);
    }
  }

  return (
    <TeacherDashboardLayout>
      <Questions
        isTrue={isTrue}
        handleSubmit={handleSubmit}
        handleClassChange={handleClassChange}
        subjects={subjects}
        handleSubjectChange={handleSubjectChange}
        isLoading={isLoading}
        data={data}
        handleQuestionChange={handleQuestionChange}
        selectedQuestions={selectedQuestions}
        selectedSubject={selectedSubject}
      />
    </TeacherDashboardLayout>
  );
}

export default Question;
