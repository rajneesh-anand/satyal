import React, { useState, useEffect } from "react";
import Select from "@components/ui/select/select";
import { subject_inClass } from "@data/constant";
import Heading from "@components/ui/heading";
import { HeadingType } from "../../../enums/tittle";
import Input from "@components/ui/input";
import { Button } from "@components/ui/button/dashboard-button";
import { ButtonSize, ButtonType } from "../../../enums/buttons";
import { useSession } from "next-auth/react";
import Loader from "@components/ui/loader";

function OnlineClassModal({ handelModalState, setResponseClass }) {
  const { data: session } = useSession();
  const [section, setSection] = useState("");
  const [className, setClassName] = useState();
  const [selectedSubject, setSelectedSubject] = useState();
  const [subjects, setSubjects] = useState([]);
  const [saveLoader, setSaveLoader] = useState(false);
  const [error, setError] = useState("");

  //  function for changing class value in modal
  function handleClassChange(value) {
    setClassName(value.value);
    setSubjects(value.subject);
  }
  // handeler function  for select subject in modal
  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
  };
  // handeler funtion for section input
  const handleInputChange = (e) => {
    setSection(e.target.value);
  };

  // useEffect(() => {
  //   // Check if all required fields are filled out
  //   if (props.className && props.selectedSubject && props.section) {
  //     setIsSaveEnabled(true);
  //   } else {
  //     setIsSaveEnabled(false);
  //   }
  // }, [props.className, props.selectedSubject, props.section]);

  const handleSave = async () => {
    // Check if all three fields are filled out
    if (className && selectedSubject && section) {
      const dataToSend = {
        onlineClassName: selectedSubject,
        onlineClassGrade: className,
        onlineClassSection: section,
        teacherEmail: session.user.email,
        teacherName: session.user.name,
      };
      try {
        setSaveLoader(true);
        let response = await fetch(
          `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/onlineClassTeacher/create`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(dataToSend),
          }
        );
        setResponseClass(response);
        setSaveLoader(false);
        if (response?.status === 201) {
          handelModalState();
        }
      } catch (err) {
        console.log(err);
      }

      // fetch(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/onlineClassTeacher/create`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(dataToSend),
      // })
      //   .then((response) => {
      //     if (!response.ok) {
      //       throw new Error("Network response was not ok");
      //     }
      //     return response.json();
      //   })
      //   .then((data) => {
      //     console.log("API response:", data);
      //   })
      //   .catch((error) => {
      //     console.error("API error:", error);
      //   });
    } else {
      setError("Please fill all the input box");
    }
  };

  return (
    <div className="py-3 px-3 w-[350px] sm:w-[500px] opacity-100 rounded-lg">
      <div className="w-full text-center flex justify-center py-1 sm:py-3">
        <Heading variant={HeadingType.MediumHeading}>
          YOU CAN CREATE ONLINE CLASS HERE
        </Heading>
      </div>
      <div className="w-full h-full items-center px-[20px]">
        <div className="w-full my-2 sm:my-3">
          <p className="text-md font-semibold text-dark-footer">
            Select Class For Online-Class
          </p>
          <Select
            id="class"
            options={subject_inClass}
            placeholder="Please Select Class"
            onChange={handleClassChange}
          />
        </div>
        {/* <div className="my-2 sm:my-3 w-full">
          <p className="text-md font-semibold text-dark-footer">
            Select Subject For Online-Class
          </p>
          <Select
            options={subjects}
            placeholder="Subject"
            isDisabled={!Boolean(subjects?.length)}
            onChange={handleSubjectChange}
          />
        </div> */}
        <div className="w-full">
          <p className="text-md font-semibold text-dark-footer">
            Enter Subject Name:
          </p>
          <div className="w-full h-[45px] sm:h-[54px]">
            <input
              type="text"
              placeholder="Add Subject Name"
              className="border border-gray-300 rounded p-2 w-full h-[52px]"
              onChange={handleSubjectChange}
              value={selectedSubject}
            />
          </div>
        </div>
        <div className="w-full">
          <p className="text-md font-semibold text-dark-footer">
            Enter Section Name:
          </p>
          <div className="w-full h-[45px] sm:h-[54px]">
            <input
              type="text"
              placeholder="Add section"
              className="border border-gray-300 rounded p-2 w-full h-[52px]"
              onChange={handleInputChange}
              value={section}
            />
          </div>
        </div>
        <div className="w-full my-5 sm:my-6 flex justify-between">
          <div className="w-4/6">
            {error ? <p className="text-red-950 text-md ">{error}</p> : null}
          </div>

          <Button
            type={ButtonType.Primary}
            size={ButtonSize.Medium}
            onClick={handleSave}
            // disabled={!isSaveEnabled}
          >
            {saveLoader ? <span>Saving...</span> : <span>SAVE</span>}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default OnlineClassModal;
