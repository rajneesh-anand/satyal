import React, { useState, FormEvent } from "react";
import { Input } from "./input";
import { TeacherInfo } from "AppTypes";
import Select from "@components/ui/form/select/select";
import { statesOptions, classOptions, ValueType } from "@data/constant";
import Link from "@components/ui/link";

interface PersonalInfoProps {
  teacherInfo: TeacherInfo;
  updateTeacherInfo: (teacherInfo: TeacherInfo) => void;
  showRequired: boolean;
}

export const PersonalInfo = ({
  teacherInfo,
  updateTeacherInfo,
  showRequired,
}: PersonalInfoProps) => {
  const [selectedState, setSelectedState] = useState(statesOptions[0]);
  const handlePersonalInfo = (
    event: FormEvent<HTMLInputElement>,
    key: keyof TeacherInfo
  ) => {
    console.log(key);
    const updatedTeacherInfo = { ...teacherInfo };
    updatedTeacherInfo[key] = event.currentTarget.value;
    updateTeacherInfo(updatedTeacherInfo);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <section>
        <h2>Personal Info</h2>
        <p>Please provide your personal information.</p>

        <div className="flex flex-col md:flex-row mt-4">
          <div className="w-full md:w-[320px] mb-3">
            <Input
              label="First Name"
              placeholder="Write your first name"
              showRequired={showRequired && !teacherInfo.fname}
              value={teacherInfo.fname}
              onChange={(e: FormEvent<HTMLInputElement>) =>
                handlePersonalInfo(e, "fname")
              }
            />
          </div>
          <div className="w-full md:w-[320px]  mb-3 md:ml-[8px]">
            <Input
              label="Last Name"
              placeholder="Write your last name"
              showRequired={showRequired && !teacherInfo.lname}
              value={teacherInfo.lname}
              onChange={(e: FormEvent<HTMLInputElement>) =>
                handlePersonalInfo(e, "lname")
              }
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-[320px] mb-3">
            <Input
              label="Email"
              type="email"
              placeholder="Write your email address"
              showRequired={
                showRequired &&
                (!teacherInfo.email || !teacherInfo.email.includes("@"))
              }
              value={teacherInfo.email}
              onChange={(e: FormEvent<HTMLInputElement>) =>
                handlePersonalInfo(e, "email")
              }
            />
          </div>
          <div className="w-full md:w-[320px]  mb-3 md:ml-[8px]">
            <Input
              label="Password"
              type="password"
              placeholder="Password"
              showRequired={showRequired && !teacherInfo.password}
              value={teacherInfo.password}
              onChange={(e: FormEvent<HTMLInputElement>) =>
                handlePersonalInfo(e, "password")
              }
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-[320px] mb-3 ">
            <Input
              label="Contact Number"
              placeholder="Your Mobile Number "
              showRequired={showRequired && !teacherInfo.mobile}
              value={teacherInfo.mobile}
              onChange={(e: FormEvent<HTMLInputElement>) =>
                handlePersonalInfo(e, "mobile")
              }
            />
          </div>
          <div className="w-full  md:w-[320px] mb-3 md:ml-[8px]">
            <Input
              label="Address"
              placeholder="Write your complete address"
              showRequired={showRequired && !teacherInfo.address}
              value={teacherInfo.address}
              onChange={(e: FormEvent<HTMLInputElement>) =>
                handlePersonalInfo(e, "address")
              }
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row ">
          <div className="w-full md:w-[320px]  mb-3 ">
            <Input
              label="City"
              placeholder="Write your city"
              showRequired={showRequired && !teacherInfo.city}
              value={teacherInfo.city}
              onChange={(e: FormEvent<HTMLInputElement>) =>
                handlePersonalInfo(e, "city")
              }
            />
          </div>
          <div className="w-full md:w-[320px]  mb-3 md:ml-[8px] ">
            <div className="flex flex-col font-medium">
              <span className="inline-flex justify-between">
                <label
                  htmlFor="province"
                  className="text-sm text-primary-marine-blue "
                >
                  State
                </label>
              </span>

              <Select
                id="province"
                defaultValue={selectedState}
                options={statesOptions}
                isSearchable={false}
                onChange={(value: ValueType) => (teacherInfo.state = value)}
              />
            </div>
          </div>
        </div>
        <div className="text-center">
          <span className="text-red-700 font-semibold">
            By registering to Satyal online learning, You agree with our{" "}
          </span>
          <Link href="/terms" className="text-indigo-700 font-semibold">
            Terms and Services{" "}
          </Link>
          <span className="text-red-700 font-semibold"> &amp; </span>

          <Link href="/pricay" className="text-indigo-700 font-semibold">
            Privacy
          </Link>
        </div>
      </section>
    </div>
  );
};
