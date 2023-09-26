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
    <section >
      <h2>Personal Info</h2>
      <p>Please provide your personal information.</p>

     <div className="flex flex-col md:flex-row mt-4 md:my-2 md:mt-6">
        <div className="w-full lg:w-[340px] mb-3 ">
          <Input
            label="First Name"
            placeholder="Your First Name"
            showRequired={showRequired && !studentInfo.firstName}
            value={studentInfo.firstName}
            onChange={(e: FormEvent<HTMLInputElement>) =>
              handlePersonalInfo(e, "firstName")
            }
          />
        </div>
        <div className="w-full lg:w-[340px]  mb-3 md:ml-[30px]">
          <Input
            label="Middle Name"
            placeholder="Your Middle Name"
            value={studentInfo.middleName}
            onChange={(e: FormEvent<HTMLInputElement>) =>
              handlePersonalInfo(e, "middleName")
            }
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:my-2">
        <div className="w-full lg:w-[340px]  mb-3 ">
          <Input
            label="Last Name"
            placeholder="Your Last Name"
            showRequired={showRequired && !studentInfo.lastName}
            value={studentInfo.lastName}
            onChange={(e: FormEvent<HTMLInputElement>) =>
              handlePersonalInfo(e, "lastName")
            }
          />
        </div>
        <div className="w-full lg:w-[340px] mb-3 md:ml-[30px]">
          <Input
            label="Contact Number"
            placeholder="Your Mobile Number "
            showRequired={showRequired && !studentInfo.userContactNumber}
            value={studentInfo.userContactNumber}
            onChange={(e: FormEvent<HTMLInputElement>) =>
             handlePersonalInfo(e, "userContactNumber")
            }
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:my-2">
        <div className="w-full lg:w-[340px] mb-3">
          <Input
            label="Email"
            type="email"
            placeholder="Your Email Address"
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
        <div className="w-full lg:w-[340px]  mb-3 md:ml-[30px]">
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
      <div className="flex flex-col md:flex-row md:my-2">
        <div className="w-full lg:w-[340px]  mb-3 ">
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
              defaultValue={studentInfo.studentClass}
              
              options={classOptions}
              isSearchable={false}
              onChange={(value: ValueType) => (studentInfo.studentClass = value)}
            />
          </div>
        </div>
        <div className="w-full  lg:w-[340px] mb-3 md:ml-[30px]">
          <Input
            label="Address"
            placeholder="Your Address"
            showRequired={showRequired && !studentInfo.address}
            value={studentInfo.address}
            onChange={(e: FormEvent<HTMLInputElement>) =>
              handlePersonalInfo(e, "address")
            }
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:my-2">
        <div className="w-full lg:w-[340px]  mb-3 ">
          <Input
            label="City/Town"
            placeholder="Your City"
            showRequired={showRequired && !studentInfo.city}
            value={studentInfo.city}
            onChange={(e: FormEvent<HTMLInputElement>) =>
              handlePersonalInfo(e, "city")
            }
          />
        </div>
        <div className="w-full lg:w-[340px]  mb-3 md:ml-[30px] ">
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
              defaultValue={studentInfo.state}
              options={statesOptions}
              isSearchable={false}
              onChange={(value: ValueType) => (studentInfo.state = value)}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:my-2">
        <div className="w-full  md:w-[340px] mb-3 ">
          <Input
            label="Parent's/Guardian's Name"
            placeholder="Your Parent's Name"
            showRequired={showRequired && !studentInfo.parentName}
            value={studentInfo.parentName}
            onChange={(e: FormEvent<HTMLInputElement>) =>
              handlePersonalInfo(e, "parentName")
            }
          />
        </div>
        <div className="w-full  lg:w-[340px] mb-3 md:ml-[30px] ">
          <Input
            label="Parent's/Guardian's Number"
            placeholder="Your Parent's Contact Number"
            showRequired={showRequired && !studentInfo.parentContactNumber}
            value={studentInfo.parentContactNumber}
            onChange={(e: FormEvent<HTMLInputElement>) =>
              handlePersonalInfo(e, "parentContactNumber")
            }
          />
        </div>
      </div>
    </section>
  );
};
