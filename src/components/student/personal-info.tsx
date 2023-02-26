import React, { useState, FormEvent } from "react";
import { Input } from "./input";
import { StudentInfo } from "AppTypes";
import Select from "@components/ui/form/select/select";
import { statesOptions, classOptions, ValueType } from "@data/constant";
import Link from "@components/ui/link";

interface PersonalInfoProps {
  studentInfo: StudentInfo;
  updateStudentInfo: (studentInfo: StudentInfo) => void;
  showRequired: boolean;
}

export const PersonalInfo = ({
  studentInfo,
  updateStudentInfo,
  showRequired,
}: PersonalInfoProps) => {
  const [selectedClass, setSelectedClass] = useState(classOptions[0]);
  const [selectedState, setSelectedState] = useState(statesOptions[0]);
  const handlePersonalInfo = (
    event: FormEvent<HTMLInputElement>,
    key: keyof StudentInfo
  ) => {
    const updatedStudentInfo = { ...studentInfo };
    updatedStudentInfo[key] = event.currentTarget.value;
    updateStudentInfo(updatedStudentInfo);
  };

  return (
    <section>
      <h2>Personal Info</h2>
      <p>Please provide your personal information.</p>

      <div className="flex flex-col md:flex-row mt-4">
        <div className="w-full md:w-[320px] mb-3">
          <Input
            label="First Name"
            placeholder="Write your first name"
            showRequired={showRequired && !studentInfo.fname}
            value={studentInfo.fname}
            onChange={(e: FormEvent<HTMLInputElement>) =>
              handlePersonalInfo(e, "fname")
            }
          />
        </div>
        <div className="w-full md:w-[320px]  mb-3 md:ml-[8px]">
          <Input
            label="Last Name"
            placeholder="Write your last name"
            showRequired={showRequired && !studentInfo.lname}
            value={studentInfo.lname}
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
              (!studentInfo.email || !studentInfo.email.includes("@"))
            }
            value={studentInfo.email}
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
            showRequired={showRequired && !studentInfo.password}
            value={studentInfo.password}
            onChange={(e: FormEvent<HTMLInputElement>) =>
              handlePersonalInfo(e, "password")
            }
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row ">
        <div className="w-full  md:w-[648px] mb-3 ">
          <Input
            label="Parent's/Guardian's Name"
            placeholder="Write full name of your parent"
            showRequired={showRequired && !studentInfo.address}
            value={studentInfo.parent}
            onChange={(e: FormEvent<HTMLInputElement>) =>
              handlePersonalInfo(e, "parent")
            }
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-[320px]  mb-3 ">
          <div className="flex flex-col font-medium">
            <span className="inline-flex justify-between">
              <label
                htmlFor="class"
                className="text-sm text-primary-marine-blue "
              >
                Class
              </label>
            </span>
            <Select
              id="class"
              defaultValue={selectedClass}
              options={classOptions}
              isSearchable={false}
              onChange={(value: ValueType) => (studentInfo.class = value)}
            />
          </div>
        </div>
        <div className="w-full md:w-[320px] mb-3 md:ml-[8px]">
          <Input
            label="Contact Number"
            placeholder="Your Mobile Number "
            showRequired={showRequired && !studentInfo.mobile}
            value={studentInfo.mobile}
            onChange={(e: FormEvent<HTMLInputElement>) =>
              handlePersonalInfo(e, "mobile")
            }
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row">
        <div className="w-full  md:w-[648px] mb-3 ">
          <Input
            label="Address"
            placeholder="Write your complete address"
            showRequired={showRequired && !studentInfo.address}
            value={studentInfo.address}
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
            showRequired={showRequired && !studentInfo.city}
            value={studentInfo.city}
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
              onChange={(value: ValueType) => (studentInfo.state = value)}
            />
          </div>
        </div>
      </div>
      <div className="text-center">
        <span className="text-red-700 font-semibold">
          By registering to Satyal online learning, You agree with our{" "}
        </span>
        <Link href="/terms" className="text-indigo-700 font-semibold">
          Terms{" "}
        </Link>
        <span className="text-red-700 font-semibold"> &amp; </span>

        <Link href="/pricay" className="text-indigo-700 font-semibold">
          Privacy
        </Link>
      </div>
    </section>
  );
};
