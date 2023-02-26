import React, { useState, FormEvent } from "react";
import { Input } from "@components/teacher/input";
import Description from "@components/ui/description";
import { classOptions, subjectsOptions } from "@data/constant";
import SelectInput from "@components/ui/select/select";
import { UploadIcon } from "@components/icons/upload-icon";
import Dropzone from "react-dropzone";
import { TeacherKYCInfo } from "AppTypes";

interface KycInfoProps {
  teacherKYCInfo: TeacherKYCInfo;
  updateKYCInfo: (teacherKYCInfo: TeacherKYCInfo) => void;
  showRequired: boolean;
}

export const TeacherKYCForm = ({
  teacherKYCInfo,
  updateKYCInfo,
  showRequired,
}: KycInfoProps) => {
  const handlePersonalInfo = (
    event: FormEvent<HTMLInputElement>,
    key: keyof TeacherKYCInfo
  ) => {
    const updatedKYCInfo = { ...teacherKYCInfo };
    updatedKYCInfo[key] = event.currentTarget.value;
    updateKYCInfo(updatedKYCInfo);
  };

  const handleKYCFile = (file: File, key: keyof TeacherKYCInfo) => {
    const updatedKYCInfo = { ...teacherKYCInfo };
    updatedKYCInfo[key] = file;
    updateKYCInfo(updatedKYCInfo);
  };

  const [selectedClass, setSelectedClass] = useState(classOptions[0]);
  const [selectedSubjects, setSelectedSubjects] = useState(subjectsOptions[0]);

  return (
    <>
      <div className="text-center bg-slate-100 py-4">
        <h4 className="font-nunito font-semibold text-red-900">
          KYC REQUIREMENTS
        </h4>
      </div>

      <div className="my-5 flex flex-col md:flex-row justify-between border-b border-dashed border-border-base pb-8 sm:my-8">
        <Description
          title="CITIZEN FIRST PAGE*"
          details="Upload the photo of first page of your citizenship document"
          className="sm:pr-4 md:pr-5 w-full px-0 pb-5 sm:w-4/12 sm:py-8 md:w-1/3"
        />

        <Dropzone
          onDrop={(acceptedFiles) =>
            handleKYCFile(acceptedFiles[0], "citizen_image_first")
          }
        >
          {({ getRootProps, getInputProps }) => (
            <section>
              <div
                {...getRootProps({
                  className:
                    "border-dashed border-2 border-border-base h-36 px-4 rounded flex flex-col justify-center items-center cursor-pointer focus:border-accent-400 focus:outline-none",
                })}
              >
                <input {...getInputProps()} />
                <UploadIcon className="text-slate-400" />
                <p className="mt-4 text-center text-sm ">
                  <span className="font-semibold text-blue-700">
                    Click here to upload an image
                  </span>{" "}
                  or Drag and Drop here <br /> <span>( PNG / JPG ) </span>
                </p>
              </div>
            </section>
          )}
        </Dropzone>

        <div className="text-center mt-1">
          <img
            className="inline object-cover w-28 h-28  rounded overflow-hidden"
            src={
              teacherKYCInfo.citizen_image_first
                ? URL.createObjectURL(teacherKYCInfo.citizen_image_first)
                : "/images/about/document.png"
            }
            alt="citizenPhotoFirst"
          />
        </div>
      </div>

      <div className="my-5 flex flex-col md:flex-row justify-between border-b border-dashed border-border-base pb-8 sm:my-8">
        <Description
          title="CITIZEN LAST PAGE*"
          details="Upload the photo of last page of your citizenship document"
          className="sm:pe-4 md:pe-5 w-full px-0 pb-5 sm:w-4/12 sm:py-8 md:w-1/3"
        />

        <Dropzone
          onDrop={(acceptedFiles) =>
            handleKYCFile(acceptedFiles[0], "citizen_image_last")
          }
        >
          {({ getRootProps, getInputProps }) => (
            <section>
              <div
                {...getRootProps({
                  className:
                    "border-dashed border-2 border-border-base h-36  px-4 rounded flex flex-col justify-center items-center cursor-pointer focus:border-accent-400 focus:outline-none",
                })}
              >
                <input {...getInputProps()} />
                <UploadIcon className="text-slate-400" />
                <p className="mt-4 text-center text-sm ">
                  <span className="font-semibold text-blue-700">
                    Click here to upload an image
                  </span>{" "}
                  or Drag and Drop here <br /> <span>( PNG / JPG ) </span>
                </p>
              </div>
            </section>
          )}
        </Dropzone>

        <div className="text-center mt-1">
          <img
            className="inline object-cover w-28 h-28  rounded overflow-hidden"
            src={
              teacherKYCInfo.citizen_image_last
                ? URL.createObjectURL(teacherKYCInfo.citizen_image_last)
                : "/images/about/document.png"
            }
            alt="citizenPhotoSecond"
          />
        </div>
      </div>
      <div className="my-5 flex flex-col md:flex-row justify-between border-b border-dashed border-border-base pb-8 sm:my-8">
        <Description
          title="SCHOOL IDENTITY CARD*"
          details="Upload the photo of your school identity card"
          className="sm:pe-4 md:pe-5 w-full px-0 pb-5 sm:w-4/12 sm:py-8 md:w-1/3"
        />

        <Dropzone
          onDrop={(acceptedFiles) =>
            handleKYCFile(acceptedFiles[0], "school_identity_card")
          }
        >
          {({ getRootProps, getInputProps }) => (
            <section>
              <div
                {...getRootProps({
                  className:
                    "border-dashed border-2 border-border-base h-36  px-4 rounded flex flex-col justify-center items-center cursor-pointer focus:border-accent-400 focus:outline-none",
                })}
              >
                <input {...getInputProps()} />
                <UploadIcon className="text-slate-400" />
                <p className="mt-4 text-center text-sm ">
                  <span className="font-semibold text-blue-700">
                    Click here to upload an image
                  </span>{" "}
                  or Drag and Drop here <br /> <span>( PNG / JPG ) </span>
                </p>
              </div>
            </section>
          )}
        </Dropzone>

        <div className="text-center mt-1">
          <img
            className="inline object-cover w-28 h-28  rounded overflow-hidden"
            src={
              teacherKYCInfo.school_identity_card
                ? URL.createObjectURL(teacherKYCInfo.school_identity_card)
                : "/images/about/document.png"
            }
            alt="schoolCard"
          />
        </div>
      </div>
      <div className="my-5 flex flex-col md:flex-row justify-between border-b border-dashed border-border-base pb-8 sm:my-8">
        <Description
          title="BACHELOR'S DEGREE*"
          details="Upload the photo of Bachelor's degree certificate"
          className="sm:pe-4 md:pe-5 w-full px-0 pb-5 sm:w-4/12 sm:py-8 md:w-1/3"
        />

        <Dropzone
          onDrop={(acceptedFiles) =>
            handleKYCFile(acceptedFiles[0], "degree_bachelor")
          }
        >
          {({ getRootProps, getInputProps }) => (
            <section>
              <div
                {...getRootProps({
                  className:
                    "border-dashed border-2 border-border-base h-36  px-4 rounded flex flex-col justify-center items-center cursor-pointer focus:border-accent-400 focus:outline-none",
                })}
              >
                <input {...getInputProps()} />
                <UploadIcon className="text-slate-400" />
                <p className="mt-4 text-center text-sm ">
                  <span className="font-semibold text-blue-700">
                    Click here to upload an image
                  </span>{" "}
                  or Drag and Drop here <br /> <span>( PNG / JPG ) </span>
                </p>
              </div>
            </section>
          )}
        </Dropzone>

        <div className="text-center mt-1">
          <img
            className="inline object-cover w-28 h-28  rounded overflow-hidden"
            src={
              teacherKYCInfo.degree_bachelor
                ? URL.createObjectURL(teacherKYCInfo.degree_bachelor)
                : "/images/about/document.png"
            }
            alt="degreeBachelor"
          />
        </div>
      </div>

      <div className="my-5 flex flex-col md:flex-row justify-between border-b border-dashed border-border-base pb-8 sm:my-8">
        <Description
          title="MASTER'S DEGREE"
          details="Upload the photo of Master's degree certificate"
          className="sm:pe-4 md:pe-5 w-full px-0 pb-5 sm:w-4/12 sm:py-8 md:w-1/3"
        />

        <Dropzone
          onDrop={(acceptedFiles) =>
            handleKYCFile(acceptedFiles[0], "degree_master")
          }
        >
          {({ getRootProps, getInputProps }) => (
            <section>
              <div
                {...getRootProps({
                  className:
                    "border-dashed border-2 border-border-base h-36  px-4 rounded flex flex-col justify-center items-center cursor-pointer focus:border-accent-400 focus:outline-none",
                })}
              >
                <input {...getInputProps()} />
                <UploadIcon className="text-slate-400" />
                <p className="mt-4 text-center text-sm ">
                  <span className="font-semibold text-blue-700">
                    Click here to upload an image
                  </span>{" "}
                  or Drag and Drop here <br /> <span>( PNG / JPG ) </span>
                </p>
              </div>
            </section>
          )}
        </Dropzone>

        <div className="text-center mt-1">
          <img
            className="inline object-cover w-28 h-28  rounded overflow-hidden"
            src={
              teacherKYCInfo.degree_master
                ? URL.createObjectURL(teacherKYCInfo.degree_master)
                : "/images/about/document.png"
            }
            alt="degreeMaster"
          />
        </div>
      </div>

      <div className="my-5 flex flex-wrap items-center border-b border-dashed border-border-base pb-8 sm:my-8">
        <Description
          title="SELECT SUBJECTS"
          details="Pick your subjects"
          className="sm:pr-4 md:pr-5 w-full px-0 pb-5 sm:w-4/12 sm:py-8 md:w-1/3"
        />
        <div className="w-full sm:w-8/12 md:w-2/3">
          <SelectInput
            name="class-select"
            options={classOptions}
            isClearable={true}
            defaultValue={selectedClass}
            onChange={(value) => (teacherKYCInfo.class = value)}
            isMulti={true}
            isSearchable={false}
          />
        </div>
      </div>

      <div className="my-5 flex flex-wrap  items-center border-b border-dashed border-border-base pb-8 sm:my-4">
        <Description
          title="SELECT CLASS"
          details="Pick your class"
          className="sm:pr-4 md:pr-5 w-full px-0 pb-5 sm:w-4/12 sm:py-8 md:w-1/3"
        />
        <div className="w-full sm:w-8/12 md:w-2/3">
          <SelectInput
            name="subject-select"
            isSearchable={false}
            options={subjectsOptions}
            isClearable={true}
            defaultValue={selectedSubjects}
            onChange={(value) => (teacherKYCInfo.subjects = value)}
            isMulti={true}
          />
        </div>
      </div>
      <div className="my-5 flex flex-wrap border-b border-dashed border-gray-300 pb-8 sm:my-8">
        <Description
          title="PAYMENT INFORMATION"
          details="Fill your bank information details"
          className="sm:pr-4 md:pr-5 w-full px-0 pb-5 sm:w-4/12 sm:py-8 md:w-1/3"
        />

        <div className="w-full sm:w-8/12 md:w-2/3">
          <Input
            label="Account Holder Name"
            showRequired={showRequired && !teacherKYCInfo.name}
            value={teacherKYCInfo.name}
            onChange={(e: FormEvent<HTMLInputElement>) =>
              handlePersonalInfo(e, "name")
            }
          />

          <Input
            label="Bank Account Number"
            showRequired={showRequired && !teacherKYCInfo.number}
            value={teacherKYCInfo.number}
            onChange={(e: FormEvent<HTMLInputElement>) =>
              handlePersonalInfo(e, "number")
            }
          />

          <Input
            label="Bank Name"
            showRequired={showRequired && !teacherKYCInfo.bank}
            value={teacherKYCInfo.bank}
            onChange={(e: FormEvent<HTMLInputElement>) =>
              handlePersonalInfo(e, "bank")
            }
          />

          <Input
            label="Branch Code"
            showRequired={showRequired && !teacherKYCInfo.branch}
            value={teacherKYCInfo.branch}
            onChange={(e: FormEvent<HTMLInputElement>) =>
              handlePersonalInfo(e, "branch")
            }
          />
        </div>
      </div>
    </>
  );
};
