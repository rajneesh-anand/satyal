import Heading from "@components/ui/heading";

import React, { FormEvent } from "react";
import { HeadingType } from "../../../../enums/tittle";
import { hour, minutes } from "@data/constant";
import { Input } from "@components/form/teacher/input";
import Select from "@components/ui/form/select/select";

export default function createonlinetestmodal({
  testState,
  handelTestState,
  showRequire,
}) {
  return (
    <>
      <section className="w-[370px] h-[500px] sm:w-[800px] lg:w-[1100px] lg:h-[650px] py-1 sm:py-2 lg:py-4 px-2 sm:px-6">
        <div className="w-full text-center border-b border-solid border-mid-footer py-1">
          <Heading variant={HeadingType.MediumHeading}>HOST ONLINE</Heading>
        </div>
        <div className="px-2 sm:px-6">
          <div className="w-full py-0 sm:py-0 flex flex-col sm:flex-row sm:justify-between border border-solid border-black">
            <div className="sm:my-0 w-full sm:w-2/5">
              <Input
                label="Test Name :"
                showRequired={showRequire && !testState.testName}
                value={testState.testName}
                onChange={(e: FormEvent<HTMLInputElement>) =>
                  handelTestState(e, "testName")
                }
                className="text-dark-footer text-lg"
              />
            </div>
            <div className="sm:my-0 w-full sm:w-2/5">
              <Heading>Test Duration :</Heading>
              <div className="flex my-1">
                <div className="w-1/2 mr-2">
                  <Select
                    id="durationHour"
                    placeholder="Hour"
                    isSearchable={false}
                    options={hour}
                    className="text-dark-footer"
                    // onChange={(e) => handelTestState(e, "durationHour")}
                  />
                </div>
                <div className="w-1/2 ml-2">
                  <Select
                    id="durationMinutes"
                    placeholder="Minutes"
                    isSearchable={false}
                    options={minutes}
                    className="text-dark-footer"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <Heading>Due Time</Heading>
            <div className="">
              
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
