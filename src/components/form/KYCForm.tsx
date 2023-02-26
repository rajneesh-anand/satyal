import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Input from "@components/ui/input";
import { toast } from "react-toastify";
import Select from "@components/ui/form/select/select";
import { documentOptions } from "@data/constant";
import useWindowSize from "@utils/use-window-size";
import { IoCheckmarkCircle } from "react-icons/io5";

import { useSession } from "next-auth/react";

interface FormValues {
  docNumber: string;
  docType: string;
}

function KYCForm() {
  const { width } = useWindowSize();

  const { data: session } = useSession();
  const [processing, setProcessing] = useState(false);
  const [status, setStatus] = useState<string | undefined>("");
  const [selectedDoc, setSelectedDoc] = useState(documentOptions[0]);
  const [document, setDocument] = useState<File | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | undefined>("");

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
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

  function handleDocChange(value: any) {
    setSelectedDoc(value);
  }

  async function onSubmit(data: FormValues) {
    setProcessing(true);
    const formData = new FormData();
    formData.append("docType", data.docType ? data.docType : selectedDoc.value);
    formData.append("document", document);

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
      setErrorMsg(error?.message);
      setProcessing(false);
    }
  }

  return (
    <div className="flex justify-center items-center my-16">
      {status === "success" ? (
        <div className="p-6 bg-slate-100 max-w-sm text-center">
          <IoCheckmarkCircle className="w-12 h-12 text-green-700" />

          <h2 className="font-semibold text-lg r text-gray-800 mt-2">
            KYC document submitted successfully !
          </h2>

          <p className="mt-2 text-gray-600 ">
            Your KYC Document is under verification ! <br />
            The verification process takes few days.
            <br /> We will send you the verification result through email
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="w-6/12">
          <div className=" mb-3 ">
            <label
              htmlFor="doc"
              className="block mb-3 text-sm font-semibold leading-none text-body-dark"
            >
              Select KYC Document Type
            </label>
            <Select
              id="docType"
              defaultValue={selectedDoc}
              options={documentOptions}
              isSearchable={false}
              onChange={handleDocChange}
            />
          </div>

          <Input
            variant="outline"
            type="file"
            name="docFile"
            accept="image/*,.pdf"
            label="Choose File / Photo"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setDocument(event.target.files[0])
            }
          />

          <div className="text-center mt-8 mb-32">
            <button className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
              {processing ? "Submitting ... " : "Submit"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default KYCForm;
