import React, { useState } from "react";
import Select from "@components/ui/select/select";
import { subject_inClass } from "@data/constant";

function onlineclassmodal(props) {
  const [sectionName, setSectionName] = useState("");

  const handleSave = () => {
    const setSelectedSubject = props.setSelectedSubject;
    const setClassName = props.setClassName;

    const dataToSend = {
      setClassName,
      setSelectedSubject,
      sectionName,
    };

    fetch("/your-api-endpoint", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("API response:", data);
      })
      .catch((error) => {
        console.error("API error:", error);
      });
  };
  return (
    <div className="w-[200px] h-[200px] sm:h-[400px] sm:w-[400px] bg-secondary-background opacity-100 rounded-lg">
      <div className="w-full h-full pt-[25px] sm:pt-[25px] flex flex-col items-center px-[20px]">
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
        <div>
          Enter Section Name:
          <div>
            <input
              type="text"
              placeholder="Add section"
              className="border border-gray-300 rounded p-2"
              onChange={props.handleInputChange}
            />
          </div>
        </div>
        <button
          className="mt-[40px] sm:mt-[50px] py-2 px-4 bg-dark-footer rounded-md text-white text-md font-bold hover:bg-mid-footer"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default onlineclassmodal;
