import Select from "@components/ui/select/select";
import { subject_inClass } from "@data/constant";
import { useState, useEffect } from "react";

function Questions() {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState();
  const [className, setClassName] = useState();

  const [data, setData] = useState([]);

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

  console.log(data);
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
      <div className="flex">
        <ul className="border border-2 mt-1 w-2/5">
          {data?.map((el) => (
            <li className=" border-y-2 m-2">
              <input type="checkbox" className="mr-1 mb-1" />
              <span>{el.Question}</span>

              <img
                src={el.Image_Minio_Link}
                className="w-34 object-cover"
                // alt="Book cover"
              />
            </li>
          ))}
        </ul>
        <div className="w-2/3 border border-2 mt-1 ml-1">asdfghj</div>
      </div>
    </div>
  );
}

export default Questions;
