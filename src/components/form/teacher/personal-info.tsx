import React, { useState, FormEvent } from "react";
import { Input } from "./input";
import { TeacherInfo } from "AppTypes";
import Select from "@components/ui/form/select/select";
import { statesOptions, classOptions, ValueType } from "@data/constant";
import Link from "@components/ui/link";
import NextLink from "next/link";

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
          <div className="w-full lg:w-[340px] mb-3">
            <Input
              label="First Name"
              placeholder="Your First Name"
              showRequired={showRequired && !teacherInfo.firstName}
              value={teacherInfo.firstName}
              onChange={(e: FormEvent<HTMLInputElement>) =>
                handlePersonalInfo(e, "firstName")
              }
            />
          </div>
          <div className="w-full lg:w-[340px]  mb-3 md:ml-[30px]">
            <Input
              label="Middle Name"
              placeholder="Your Middle Name"
              value={teacherInfo.middleName}
              onChange={(e: FormEvent<HTMLInputElement>) =>
                handlePersonalInfo(e, "middleName")
              }
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row">
          <div className="w-full lg:w-[340px]  mb-3">
            <Input
              label="Last Name"
              placeholder="Your Last Name"
              showRequired={showRequired && !teacherInfo.lastName}
              value={teacherInfo.lastName}
              onChange={(e: FormEvent<HTMLInputElement>) =>
                handlePersonalInfo(e, "lastName")
              }
            />
          </div>
          <div className="w-full lg:w-[340px] mb-3 md:ml-[30px]">
            <Input
              label="Contact Number"
              placeholder="Your Mobile Number "
              showRequired={showRequired && !teacherInfo.userContactNumber}
              value={teacherInfo.userContactNumber}
              onChange={(e: FormEvent<HTMLInputElement>) =>
                handlePersonalInfo(e, "userContactNumber")
              }
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row">
          <div className="w-full lg:w-[340px] mb-3">
            <Input
              label="Email"
              type="email"
              placeholder="Your Email Address"
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
          <div className="w-full lg:w-[340px]  mb-3 md:ml-[30px]">
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
          <div className="w-full  md:w-full mb-3 ">
            <Input
              label="Address"
              placeholder="Your Address"
              showRequired={showRequired && !teacherInfo.address}
              value={teacherInfo.address}
              onChange={(e: FormEvent<HTMLInputElement>) =>
                handlePersonalInfo(e, "address")
              }
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row ">
          <div className="w-full lg:w-[340px]  mb-3 ">
            <Input
              label="City"
              placeholder="Your City"
              showRequired={showRequired && !teacherInfo.city}
              value={teacherInfo.city}
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
                defaultValue={selectedState}
                options={statesOptions}
                isSearchable={false}
                onChange={(value: ValueType) => (teacherInfo.state = value)}
              />
            </div>
          </div>
        </div>
        <div className="my-2 ">
          <h2 className="">School Info:</h2>
          <p>Please provide your school information.</p>
        </div>
        <div className="flex flex-col md:flex-row mt-4">
          <div className="w-full lg:w-[340px] mb-3">
            <Input
              label="School's Name"
              placeholder="School's Name"
              showRequired={showRequired && !teacherInfo.schoolName}
              value={teacherInfo.schoolName}
              onChange={(e: FormEvent<HTMLInputElement>) =>
                handlePersonalInfo(e, "schoolName")
              }
            />
          </div>
          <div className="w-full lg:w-[340px]  mb-3 md:ml-[30px]">
            <Input
              label="Contact Number"
              placeholder="School's Contact Number"
              value={teacherInfo.schoolContact}
              showRequired={showRequired && !teacherInfo.schoolContact}
              onChange={(e: FormEvent<HTMLInputElement>) =>
                handlePersonalInfo(e, "schoolContact")
              }
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row">
          <div className="w-full  md:w-full mb-3 ">
            <Input
              label="Address"
              placeholder="School's Address"
              showRequired={showRequired && !teacherInfo.schoolAddress}
              value={teacherInfo.schoolAddress}
              onChange={(e: FormEvent<HTMLInputElement>) =>
                handlePersonalInfo(e, "schoolAddress")
              }
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row ">
          <div className="w-full lg:w-[340px]  mb-3 ">
            <Input
              label="City"
              placeholder="City"
              showRequired={showRequired && !teacherInfo.schoolCity}
              value={teacherInfo.schoolCity}
              onChange={(e: FormEvent<HTMLInputElement>) =>
                handlePersonalInfo(e, "schoolCity")
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
                defaultValue={selectedState}
                options={statesOptions}
                isSearchable={false}
                onChange={(value: ValueType) =>
                  (teacherInfo.schoolState = value)
                }
              />
            </div>
          </div>
        </div>
        <div className="text-center mt-4 text-sm md:text-md">
          <span className="text-black font-semibold">
            By registering to Satyal online learning, You agree with our{" "}
          </span>
          <NextLink href="/terms">
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-700 font-semibold "
            >
              Terms and Services{" "}
            </a>
          </NextLink>
          <span className="text-black font-semibold"> &amp; </span>

          <NextLink href="/privacy">
            <a target="_blank" className="text-red-700 font-semibold ">
              {" "}
              Privacy Policy
            </a>
          </NextLink>
        </div>
      </section>
    </div>
  );
};
