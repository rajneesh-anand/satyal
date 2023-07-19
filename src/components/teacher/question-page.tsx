import Select from "@components/ui/select/select";
import { subject_inClass } from "@data/constant";
import { useState, useEffect } from "react";
import QuestionHeader from "./header";

function Questions() {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState();
  const [className, setClassName] = useState();
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  console.log(isLoading);

  const [data, setData] = useState([]);
  // console.log(selectedQuestions);

  function handleQuestionChange(value) {
    const a = selectedQuestions.some(
      (item) => JSON.stringify(item) === JSON.stringify(value)
    );
    console.log(a);
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

  async function getQuestions() {
    setIsLoading(true);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/questions/${className}/${selectedSubject}`
    );

    if (res) {
      const { questions } = await res.json();
      setData(questions);
      setIsLoading(false);
    }
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

      {!isLoading ? (
        !Boolean(data.length) ? (
          <div className=" flex justify-center mt-16">
            <h3>Sorry! Data are not available</h3>
          </div>
        ) : (
          <div className="flex">
            <ul className="border border-2 mt-1 w-2/5">
              {data.map((el) => (
                <li className=" border-b-2 m-2">
                  <input
                    type="checkbox"
                    className="mr-1 mb-1"
                    onChange={() => handleQuestionChange(el)}
                  />
                  <span>{el.Question}</span>

                  <img
                    src={el.Image_Minio_Link}
                    className="w-34 object-cover"
                    alt={el.Image_Link}
                  />
                </li>
              ))}
            </ul>

            <div className="w-2/3 border border-2 mt-1 ml-1">
              {selectedQuestions.length ? (
                <div>
                  <QuestionHeader />
                  <ul className="p-2">
                    {selectedQuestions.map(
                      (el) =>
                        el && (
                          <li className=" border-b-2 m-2 list-decimal ">
                            <span>{el.Question}</span>

                            <img
                              src={el.Image_Minio_Link}
                              className="w-34 object-cover"
                              alt={el.Image_Link}
                            />
                          </li>
                        )
                    )}
                  </ul>
                </div>
              ) : (
                <div>
                  <h3>Select Questions to view them here.</h3>
                </div>
              )}
            </div>
          </div>
        )
      ) : (
        <div className=" flex justify-center mt-16">
          <h1>Loading....</h1>
        </div>
      )}
    </div>
  );
}

export default Questions;
