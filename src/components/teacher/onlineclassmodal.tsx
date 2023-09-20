import React, { useState, useEffect } from "react";
import Select from "@components/ui/select/select";
import { subject_inClass } from "@data/constant";
import Heading from "@components/ui/heading";
import { HeadingType } from "../../../enums/tittle";
import Input from "@components/ui/input";
import { Button } from "@components/ui/button/dashboard-button";
import { ButtonSize, ButtonType } from "../../../enums/buttons";
import { useSession } from "next-auth/react";

function OnlineClassModal(props) {
  const { data: session } = useSession();
  const [isSaveEnabled, setIsSaveEnabled] = useState(false);
  console.log(session);

  useEffect(() => {
    // Check if all required fields are filled out
    if (props.className && props.selectedSubject && props.section) {
      setIsSaveEnabled(true);
    } else {
      setIsSaveEnabled(false);
    }
  }, [props.className, props.selectedSubject, props.section]);

  const handleSave = () => {
    // Check if all three fields are filled out
    if (props.className && props.selectedSubject && props.section) {
      const dataToSend = {
        onlineClassName: props.className,
        onlineClassGrade: props.selectedSubject,
        onlineClassSection: props.section,
        teacherEmail: session.user.email,
        teacherName: session.user.name,
      };

      fetch(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/onlineClass/create`, {
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
            options={subject_inClass}
            placeholder="Please Select Class"
            onChange={props.handleClassChange}
          />
        </div>
        <div className="my-2 sm:my-3 w-full">
          <p className="text-md font-semibold text-dark-footer">
            Select Subject For Online-Class
          </p>
          <Select
            options={props.subjects}
            placeholder="Subject"
            isDisabled={!Boolean(props.subjects?.length)}
            onChange={props.handleSubjectChange}
          />
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
              onChange={props.handleInputChange}
            />
          </div>
        </div>
        <div className="w-full my-5 sm:my-6 flex justify-end">
          <Button
            type={ButtonType.Primary}
            size={ButtonSize.Medium}
            onClick={handleSave}
            // disabled={!isSaveEnabled}
          >
            SAVE
          </Button>
        </div>
      </div>
    </div>
  );
}

export default OnlineClassModal;
