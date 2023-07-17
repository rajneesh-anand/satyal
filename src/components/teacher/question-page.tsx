import Select from "@components/ui/select/select";
import { subject_inClass } from "@data/constant";
import { useState, useEffect } from "react";

function Questions() {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState();
  const [className, setClassName] = useState();

  const [data, setData] = useState([]);
  console.log(data);

  function handleClassChange(value) {
    setClassName(value.value);
    setSubjects(value.subject);
  }

  function handleSubjectChange(value) {
    setSelectedSubject(value.value);
  }

  async function getQuestions() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/questions/${className}/${selectedSubject}`

      // "http://localhost:8080/api/questions/grade-nursery/English Volume - 3"
    );

    fetch;
    const { questions } = await res.json();
    console.log(questions);
    setData(questions);
  }

  useEffect(() => {
    selectedSubject && getQuestions();
  }, [selectedSubject]);

  return (
    <div>
      <div className="flex gap-2">
        <Select
          options={subject_inClass}
          placeholder="class"
          onChange={handleClassChange}
        />
        <Select
          options={subjects}
          placeholder="subject"
          isDisabled={!Boolean(subjects?.length)}
          onChange={handleSubjectChange}
        />
      </div>
      <ul>
        {data?.map((el) => (
          <li>{el.Question}</li>
        ))}
      </ul>
    </div>
  );
}

export default Questions;
