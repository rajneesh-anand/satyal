import React, { useState, useEffect } from "react";
import { Button } from "@components/ui/button/dashboard-button";
import { ButtonSize, ButtonType } from "../../../enums/buttons";
import { useSession } from "next-auth/react";
import { clippingParents } from "@popperjs/core";

function OnlineClassModal({ handelModalState, setResponseClass }) {
  const [enrollCode, setEnrollCode] = useState();
  const { data: session } = useSession();
  const [saveLoader, setSaveLoader] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setEnrollCode(e.target.value);
  };

  const handleSave = async () => {
    if (enrollCode) {
      const dataToSend = {
        enrollCode: enrollCode,
        studentEmail: session.user.email,
      };
      try {
        setSaveLoader(true);
        let response = await fetch(
          `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/onlineClassStudent/enroll`,
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
    } else {
      setError("Please fill  the input box");
    }
  };

  return (
    <div className="py-3 px-3 w-[350px] sm:w-[500px] opacity-100 rounded-lg">
      <div className="w-full">
        <p className="text-md font-semibold text-dark-footer">
          Enter Class Code :
        </p>

        <div className="w-full h-[45px] sm:h-[54px]">
          <input
            type="text"
            placeholder="Please Enter your class code"
            className="border border-gray-300 rounded p-2 w-full h-[52px]"
            onChange={handleInputChange}
          />
        </div>

        <div className="w-full my-5 sm:my-6 flex justify-end">
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
