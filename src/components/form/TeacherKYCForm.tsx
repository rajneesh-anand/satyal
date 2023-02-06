import React, { useState, useEffect } from "react";
import Input from "@components/ui/input";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import Card from "@components/common/card";
import FileInput from "@components/ui/file-input";
import { getFormattedImage } from "@utils/get-formatted-image";
import Description from "@components/ui/description";
import { classOptions, subjectsOptions } from "@data/student";
import SelectInput from "@components/ui/select/select";
import { useDropzone } from "react-dropzone";
import { UploadIcon } from "@components/icons/upload-icon";
import Dropzone from "react-dropzone";
import { toast } from "react-toastify";
import Alert from "@components/ui/alert";
import useWindowSize from "@utils/use-window-size";
import { useSession } from "next-auth/react";
import { IoCheckmarkCircle } from "react-icons/io5";

interface FormValues {
  branch?: string;
  name?: string;
  number?: string;
  bank?: string;
  citizen_image_first: any;
  citizen_image_last: any;
  school_identity_card: any;
  degree_bachelor: any;
  degree_master: any;
}

const TeacherKYCForm = ({ initialValues }: { initialValues?: any }) => {
  const { width } = useWindowSize();
  const { data: session } = useSession();
  const [status, setStatus] = useState<string | undefined>("");
  const [selectedClass, setSelectedClass] = useState(classOptions[0]);
  const [selectedSubjects, setSelectedSubjects] = useState(subjectsOptions[0]);
  const [citizenPhotoFirst, setCitizenPhotoFirst] = useState<File | null>(null);
  const [citizenPhotoSecond, setCitizenPhotoSecond] = useState<File | null>(
    null
  );
  const [schoolCard, setSchoolCard] = useState<File | null>(null);
  const [degreeBachelor, setDegreeBachelor] = useState<File | null>(null);
  const [degreeMaster, setDegreeMaster] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    control,
  } = useForm<FormValues>();

  useEffect(() => {
    if (status === "failed") {
      toast.error("Oops ! Something went wrong ", {
        progressClassName: "fancy-progress-bar",
        position: width! > 768 ? "bottom-right" : "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }, [status]);

  function handleClassChange(value: any) {
    console.log(value);
    setSelectedClass(value);
  }

  function handleSubjectChange(value: any) {
    console.log(value);
    setSelectedSubjects(value);
  }

  async function onSubmit(data: FormValues) {
    setProcessing(true);
    const formData = new FormData();
    formData.append("citizenFirst", citizenPhotoFirst);
    formData.append("citizenLast", citizenPhotoSecond);
    formData.append("schoolIdentity", schoolCard);
    formData.append("degreeBachelor", degreeBachelor);
    formData.append("degreeMaster", degreeMaster);
    formData.append("class", JSON.stringify(selectedClass));
    formData.append("subjects", JSON.stringify(selectedSubjects));
    formData.append("bankName", data.bank);
    formData.append("accountNumber", data.number);
    formData.append("name", data.name);
    formData.append("branch", data.branch);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/teacher/kyc/${session?.user?.id}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await res.json();

      if (res.status >= 400 && res.status < 600) {
        throw new Error(result.message);
      } else {
        setStatus("success");
        setProcessing(false);
      }
    } catch (error: any) {
      console.log(error.message);
      setStatus("failed");
      setProcessing(false);
    }
  }

  return (
    <div className="flex justify-center">
      {status === "success" ? (
        <Card className=" w-full md:w-8/12 mt-8 text-center">
          <div className="text-center bg-slate-100 py-4">
            <h4 className="font-nunito font-semibold text-red-900">
              KYC STATUS
            </h4>
          </div>
          <div className="p-6 bg-slate-100  mt-2 text-center">
            <IoCheckmarkCircle className="w-12 h-12 text-green-700 text-center" />

            <h2 className="font-semibold text-lg r text-gray-800 mt-2">
              KYC document submitted successfully !
            </h2>

            <p className="mt-2 text-gray-600 ">
              Your KYC Document is under verification ! <br />
              The verification process takes few days.
              <br /> We will send you the verification result through email
            </p>
          </div>
        </Card>
      ) : (
        <Card className=" w-full md:w-8/12 mt-4">
          <div className="text-center bg-slate-100 py-4">
            <h4 className="font-nunito font-semibold text-red-900">
              KYC REQUIREMENTS
            </h4>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="my-5 flex flex-col md:flex-row justify-between border-b border-dashed border-border-base pb-8 sm:my-8">
              <Description
                title="CITIZEN FIRST PAGE*"
                details="Upload the photo of first page of your citizenship document"
                className="sm:pr-4 md:pr-5 w-full px-0 pb-5 sm:w-4/12 sm:py-8 md:w-1/3"
              />

              <Dropzone
                onDrop={(acceptedFiles) =>
                  setCitizenPhotoFirst(acceptedFiles[0])
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
                    citizenPhotoFirst
                      ? URL.createObjectURL(citizenPhotoFirst)
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
                  setCitizenPhotoSecond(acceptedFiles[0])
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
                    citizenPhotoSecond
                      ? URL.createObjectURL(citizenPhotoSecond)
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
                onDrop={(acceptedFiles) => setSchoolCard(acceptedFiles[0])}
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
                    schoolCard
                      ? URL.createObjectURL(schoolCard)
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
                onDrop={(acceptedFiles) => setDegreeBachelor(acceptedFiles[0])}
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
                    degreeBachelor
                      ? URL.createObjectURL(degreeBachelor)
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
                onDrop={(acceptedFiles) => setDegreeMaster(acceptedFiles[0])}
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
                    degreeMaster
                      ? URL.createObjectURL(degreeMaster)
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
                  onChange={handleClassChange}
                  isMulti={true}
                  isSearchable={false}
                />
              </div>
            </div>

            <div className="my-5 flex flex-wrap  items-center border-b border-dashed border-border-base pb-8 sm:my-4">
              <Description
                title="SELECT CLASS"
                details="Pick your subjects"
                className="sm:pr-4 md:pr-5 w-full px-0 pb-5 sm:w-4/12 sm:py-8 md:w-1/3"
              />
              <div className="w-full sm:w-8/12 md:w-2/3">
                <SelectInput
                  name="subject-select"
                  isSearchable={false}
                  options={subjectsOptions}
                  isClearable={true}
                  defaultValue={selectedSubjects}
                  onChange={handleSubjectChange}
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

              <Card className="w-full sm:w-8/12 md:w-2/3">
                <Input
                  label="Account Holder Name"
                  {...register("name", {
                    required: "You must provide bank account holder name !",
                  })}
                  variant="outline"
                  className="mb-5"
                  error={errors.name?.message!}
                />
                <Input
                  label="Bank Account Number"
                  {...register("number", {
                    required: "You must provide bank account number !",
                  })}
                  variant="outline"
                  className="mb-5"
                  error={errors.number?.message!}
                />
                <Input
                  label="Bank Name"
                  {...register("bank", {
                    required: "You must provide bank name !",
                  })}
                  variant="outline"
                  className="mb-5"
                  error={errors.bank?.message!}
                />

                <Input
                  label="Bank Branch Name"
                  {...register("branch", {
                    required: "You must provide bank branch code or name !",
                  })}
                  variant="outline"
                  className="mb-5"
                  error={errors.branch?.message!}
                />
              </Card>
            </div>

            <div className="text-end mt-8 mb-8">
              <button className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                {processing ? "Submitting ... " : "Submit"}
              </button>
            </div>
          </form>
        </Card>
      )}
    </div>
  );
};

export default TeacherKYCForm;
