import Select from "@components/ui/select/select";
import { paperType, subject_inClass } from "@data/constant";
import { useState, useEffect } from "react";
import QuestionHeader from "./header";

function Questions(props) {
  const [schoolname, setSchoolName] = useState("Add School Name here");
  const [location, setLocation] = useState("Add Location");
  const [paperName, setpaperName] = useState();

  return (
    <div>
      <div>
        {!props.isTrue && (
          <div>
            <div className="justify-center flex gap-6 mt-40">
              <Select
                options={subject_inClass}
                placeholder="Class"
                onChange={props.handleClassChange}
              />
              <Select
                options={props.subjects}
                placeholder="Subject"
                isDisabled={!Boolean(props.subjects?.length)}
                onChange={props.handleSubjectChange}
              />
              <Select
                options={paperType}
                placeholder="Paper type"
                onChange={(e: any) => setpaperName(e.value)}
              />
            </div>
            <div className="flex justify-center mt-10 ">
              <button
                className="bg-blue-500 hover:bg-#690f00-600 text-white font-bold py-2 px-4 rounded"
                style={{ backgroundColor: "#690f00" }}
                onClick={props.handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </div>

      {!props.isLoading ? (
        !Boolean(props.data.length) ? (
          <div className=" flex justify-center mt-16"></div>
        ) : (
          <div className="flex bg-white">
            <div className="w-2/5">
              <div className="flex gap-2">
                <Select
                  options={[]}
                  placeholder="Chapter"
                  // onChange={props.handleClassChange}
                />
                <Select
                  options={[]}
                  placeholder="Question type"
                  // onChange={props.handleClassChange}
                />
              </div>
              {/* <div className="border border-2 mt-1 overflow-y-auto max-h-80"> */}
              <ul className="border border-2 mt-1  overflow-y-auto max-h-[460px]">
                {props.data.map((el) => (
                  <li className=" border-b-2 m-2">
                    <input
                      type="checkbox"
                      className="mr-1 mb-1"
                      onChange={() => props.handleQuestionChange(el)}
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
              {/* </div> */}
            </div>
            <div className="w-2/3 ">
              <div className="flex gap-2">
                <input
                  type="text"
                  // value={value}
                  onChange={(e: any) => setSchoolName(e.target.value)}
                  placeholder="School name here"
                  className="border border-gray-300 rounded p-2"
                />
                <input
                  type="file"
                  // id="logo-upload"
                  accept="image/*"
                  // value="Add school logo"
                  // onChange={handleFileChange}
                  className="border border-gray-300 rounded p-2"
                />
                <input
                  type="text"
                  // value={value}
                  onChange={(e: any) => setLocation(e.target.value)}
                  placeholder="Location"
                  className="border border-gray-300 rounded p-2"
                />
              </div>
              <div className="border border-2 mt-1 ml-1 overflow-y-auto max-h-[460px]">
                {props.selectedQuestions.length ? (
                  <div>
                    <QuestionHeader
                      schoolname={schoolname}
                      location={location}
                      subject={props.selectedSubject}
                    />
                    <ul className="p-2">
                      {props.selectedQuestions.map(
                        (el) =>
                          el && (
                            <li className=" border-b-2 m-2 list-decimal flex justify-between ">
                              <div>
                                <span>{el.Question}</span>
                                <img
                                  src={el.Image_Minio_Link}
                                  className="w-34 object-cover"
                                  alt={el.Image_Link}
                                />
                              </div>
                              <div>
                                {paperName === "Exam Paper" && (
                                  <input className="w-14" type="text" />
                                )}
                              </div>
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
