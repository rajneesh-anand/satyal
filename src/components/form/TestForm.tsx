import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Input from "@components/ui/input";
import PasswordInput from "@components/ui/form/password-input";
import { toast } from "react-toastify";
import Alert from "@components/ui/alert";
import Select from "@components/ui/form/select/select";
import { documentOptions } from "@data/constant";
import useWindowSize from "@utils/use-window-size";
import { useRouter } from "next/router";

interface FormValues {
  docNumber: string;
  docType: string;
}

function TestForm() {
  const { width } = useWindowSize();
  const router = useRouter();
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
    if (status === "success") {
      toast.success("Document submitted successfully !", {
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
        `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/test/upload/5`,
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
          label="Choose File (.docx / .pdf )"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setDocument(event.target.files[0])
          }
        />

        <div className="text-center mt-8 mb-32">
          <button className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
            {processing ? "Submitting ... " : "Submit"}
          </button>
        </div>
        {errorMsg ? (
          <Alert
            message={errorMsg}
            variant="error"
            closeable={true}
            className="mt-5"
            onClose={() => setErrorMsg("")}
          />
        ) : null}
      </form>
    </div>
  );
}

export default TestForm;
