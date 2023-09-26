import React from "react";
import { Button } from "@components/ui/button/dashboard-button";
import { ButtonSize, ButtonType } from "../../../enums/buttons";

function OnlineClassModal() {
  return (
    <div className="py-3 px-3 w-[350px] sm:w-[500px] opacity-100 rounded-lg">
      <div className="w-full">
        <p className="text-md font-semibold text-dark-footer">
          Enter Section Name:
        </p>

        <div className="w-full h-[45px] sm:h-[54px]">
          <input
            type="text"
            placeholder="Add section"
            className="border border-gray-300 rounded p-2 w-full h-[52px]"
            //   onChange={props.handleInputChange}
          />
        </div>

        <div className="w-full my-5 sm:my-6 flex justify-end">
          <Button
            type={ButtonType.Primary}
            size={ButtonSize.Medium}
            //   onClick={handleSave}
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
