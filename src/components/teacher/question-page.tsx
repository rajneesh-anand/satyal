import Select from '@components/ui/select/select';
import Pdf from 'react-to-pdf';
import { paperType, subject_inClass } from '@data/constant';
import { useState, useEffect, useRef } from 'react';
import QuestionHeader from './header';
import { Button } from '@components/ui/button/button';

function Questions(props) {
  const [schoolname, setSchoolName] = useState('Satyal Online Learning Platrform');
  const [location, setLocation] = useState('Add Location');
  const [logo, setLogo] = useState<any>();
  const [paperName, setpaperName] = useState();
  const [showpaper, setShowPaper] = useState(false);
  const ref = useRef(null);

  async function handleImageChange(e) {
    let file = e.target.files[0];
    let res = await blobToURL(file);
    setLogo(res);
  }

  function blobToURL(blob: any) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = function () {
        const base64data = reader.result;
        resolve(base64data);
      };
    });
  }

  return (
    <div>
      <div>
        {!props.isTrue && (
          <div>
            <div className="justify-center sm:flex gap-6 mt-40">
              <div className="mt-2">
                <Select
                  options={subject_inClass}
                  placeholder="Class"
                  onChange={props.handleClassChange}
                />
              </div>
              <div className="mt-2">
                <Select
                  options={props.subjects}
                  placeholder="Subject"
                  isDisabled={!Boolean(props.subjects?.length)}
                  onChange={props.handleSubjectChange}
                />
              </div>
              <div className="mt-2">
                <Select
                  options={paperType}
                  placeholder="Paper type"
                  onChange={(e: any) => setpaperName(e.value)}
                />
              </div>
            </div>

            <div className="flex justify-center mt-10 ">
              <button
                className="bg-blue-500 hover:bg-#690f00-600 text-white font-bold py-2 px-4 rounded"
                style={{ backgroundColor: '#690f00' }}
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
          <div className="flex bg-white ">
            <div className="sm:w-2/5 w-full">
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
              <div className="sm:hidden">
                {!showpaper && (
                  <button
                    className="px-4 py-2 text-sm font-semibold bg-dark-footer hover:bg-mid-footer text-white rounded-md"
                    onClick={() => setShowPaper(true)}
                  >
                    View Question
                  </button>
                )}
              </div>

              {/* TODO: Binit - refacotr this code */}
              {showpaper && (
                <div className="h-10 w-full sm:hidden block">
                  <div className=" mt-1 ml-1 overflow-y-auto">
                    {props.selectedQuestions.length ? (
                      <div ref={ref} className="content-center ">
                        <QuestionHeader
                          schoolname={schoolname}
                          location={location}
                          subject={props.selectedSubject}
                          logo={logo}
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
                                    {paperName === 'Exam Paper' && (
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
                  <div className="w-full h-[54px] px-4 flex justify-between items-center ">
                    {/* <button className="px-4 py-2 text-sm font-semibold bg-indigo-950 hover:bg-indigo-800 text-white rounded-md">
                  Save
                </button>

                <button className="px-4 py-2 text-sm font-semibold bg-dark-footer hover:bg-mid-footer text-white rounded-md">
                  Share Questions
                </button> */}
                    <Pdf targetRef={ref} filename="document.pdf">
                      {({ toPdf }) => (
                        <button
                          onClick={toPdf}
                          className="px-4 py-2 text-sm font-semibold bg-gray-900 hover:bg-gray-700 text-white rounded-md"
                        >
                          Download PDF
                        </button>
                      )}
                    </Pdf>
                  </div>
                  <button
                    className="px-4 py-2 text-sm font-semibold bg-dark-footer hover:bg-mid-footer text-white rounded-md"
                    onClick={() => setShowPaper(false)}
                  >
                    Close
                  </button>
                </div>
              )}

              {/* <div className="border border-2 mt-1 overflow-y-auto max-h-80"> */}
              <ul
                className={`border border-2 mt-1 sm:block  overflow-y-auto max-h-[460px] ${
                  showpaper ? 'hidden' : 'block'
                }`}
              >
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

            <div className="w-2/3 hidden sm:block  ">
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
                  id="logo-upload"
                  accept="image/*"
                  onChange={handleImageChange}
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
              <div className=" mt-1 ml-1 overflow-y-auto max-h-[460px]">
                {props.selectedQuestions.length ? (
                  <div ref={ref} className="content-center ">
                    <QuestionHeader
                      schoolname={schoolname}
                      location={location}
                      subject={props.selectedSubject}
                      logo={logo}
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
                                {paperName === 'Exam Paper' && (
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
              <div className="w-full h-[54px] px-4 flex justify-between items-center ">
                {/* <button className="px-4 py-2 text-sm font-semibold bg-indigo-950 hover:bg-indigo-800 text-white rounded-md">
                  Save
                </button>

                <button className="px-4 py-2 text-sm font-semibold bg-dark-footer hover:bg-mid-footer text-white rounded-md">
                  Share Questions
                </button> */}
                <Pdf targetRef={ref} filename="document.pdf">
                  {({ toPdf }) => (
                    <button
                      onClick={toPdf}
                      className="px-4 py-2 text-sm font-semibold bg-gray-900 hover:bg-gray-700 text-white rounded-md"
                    >
                      Download PDF
                    </button>
                  )}
                </Pdf>
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
