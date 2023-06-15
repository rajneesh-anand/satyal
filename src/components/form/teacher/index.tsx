import { useState, useEffect } from "react";
import {
  TeacherInfo,
  TeacherKYCInfo,
  UserServiceConfiguration,
} from "AppTypes";
import { Button } from "@components/ui/button/button";
import { PersonalInfo } from "@components/form/teacher/personal-info";
import { TeacherKYCForm } from "@components/form/teacher/kyc";
import { Sidebar } from "@components/form/teacher/sidebar";
import useWindowSize from "@utils/use-window-size";
import { toast } from "react-toastify";
import Router from "next/router";

function RegisterTeacherForm() {
  const { width } = useWindowSize();
  const [step, setStep] = useState(1);
  const [showRequired, setShowRequiredFields] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [status, setStatus] = useState("");

  const [userServiceConfiguration, setUserServiceConfiguration] =
    useState<UserServiceConfiguration>({
      teacherInfo: {
        fname: "",
        lname: "",
        email: "",
        password: "",
        address: "",
        city: "",
        state: "",
        mobile: "",
      },
      teacherKYCInfo: {
        branch: "",
        name: "",
        number: "",
        bank: "",
        subjects: "",
        class: "",
        citizen_image_first: null,
        citizen_image_last: null,
        school_identity_card: null,
        degree_bachelor: null,
        degree_master: null,
      },
    });

  const updateTeacherInfo = (teacherInfo: TeacherInfo) => {
    setUserServiceConfiguration({ ...userServiceConfiguration, teacherInfo });
  };

  const updateTeacherKYCInfo = (teacherKYCInfo: TeacherKYCInfo) => {
    setUserServiceConfiguration({
      ...userServiceConfiguration,
      teacherKYCInfo,
    });
  };

  const nextStep = (onGoingStep?: number) => {
    if (step === 3) return;
    if (step === 1 || (onGoingStep && onGoingStep !== 1 && step === 1)) {
      if (
        !userServiceConfiguration.teacherInfo.fname ||
        !userServiceConfiguration.teacherInfo.lname ||
        !userServiceConfiguration.teacherInfo.email ||
        !userServiceConfiguration.teacherInfo.email.includes("@") ||
        !userServiceConfiguration.teacherInfo.password ||
        !userServiceConfiguration.teacherInfo.mobile ||
        !userServiceConfiguration.teacherInfo.city ||
        !userServiceConfiguration.teacherInfo.address
      ) {
        setShowRequiredFields(true);
        return;
      }
    }

    if (step === 2 || (onGoingStep && onGoingStep !== 2 && step === 2)) {
      if (
        !userServiceConfiguration.teacherKYCInfo.name ||
        !userServiceConfiguration.teacherKYCInfo.number ||
        !userServiceConfiguration.teacherKYCInfo.bank ||
        !userServiceConfiguration.teacherKYCInfo.branch ||
        !userServiceConfiguration.teacherKYCInfo.class ||
        !userServiceConfiguration.teacherKYCInfo.subjects
      ) {
        setShowRequiredFields(true);
        return;
      }
    }

    setStep((step) => {
      if (onGoingStep) return onGoingStep;
      return step + 1;
    });
  };

  const goBack = () => {
    if (step === 1) return;
    setStep((step) => step - 1);
  };

  useEffect(() => {
    if (status !== "") {
      toast.error(`${status}`, {
        progressClassName: "fancy-progress-bar",
        position: width! > 768 ? "bottom-right" : "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }, [status]);

  const handleFormSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (
      !userServiceConfiguration.teacherKYCInfo.name ||
      !userServiceConfiguration.teacherKYCInfo.number ||
      !userServiceConfiguration.teacherKYCInfo.bank ||
      !userServiceConfiguration.teacherKYCInfo.branch ||
      !userServiceConfiguration.teacherKYCInfo.class ||
      !userServiceConfiguration.teacherKYCInfo.subjects
    ) {
      setShowRequiredFields(true);
      return;
    }

    const formData = new FormData();
    formData.append(
      "citizenFirst",
      userServiceConfiguration.teacherKYCInfo.citizen_image_first
    );
    formData.append(
      "citizenLast",
      userServiceConfiguration.teacherKYCInfo.citizen_image_last
    );
    formData.append(
      "schoolIdentity",
      userServiceConfiguration.teacherKYCInfo.school_identity_card
    );
    formData.append(
      "degreeBachelor",
      userServiceConfiguration.teacherKYCInfo.degree_bachelor
    );
    formData.append(
      "degreeMaster",
      userServiceConfiguration.teacherKYCInfo.degree_master
    );
    formData.append(
      "class",
      JSON.stringify(userServiceConfiguration.teacherKYCInfo.class)
    );
    formData.append(
      "subjects",
      JSON.stringify(userServiceConfiguration.teacherKYCInfo.subjects)
    );
    formData.append("bankName", userServiceConfiguration.teacherKYCInfo.bank);
    formData.append(
      "accountNumber",
      userServiceConfiguration.teacherKYCInfo.number
    );
    formData.append("name", userServiceConfiguration.teacherKYCInfo.name);
    formData.append("branch", userServiceConfiguration.teacherKYCInfo.branch);
    formData.append("fname", userServiceConfiguration.teacherInfo.fname);
    formData.append("lname", userServiceConfiguration.teacherInfo.lname);
    formData.append("email", userServiceConfiguration.teacherInfo.email);
    formData.append("password", userServiceConfiguration.teacherInfo.password);
    formData.append("address", userServiceConfiguration.teacherInfo.address);
    formData.append("city", userServiceConfiguration.teacherInfo.city);
    formData.append(
      "province",
      JSON.stringify(userServiceConfiguration.teacherInfo.state)
    );
    formData.append("mobile", userServiceConfiguration.teacherInfo.mobile);
    formData.append("userType", "Teacher");
    try {
      setProcessing(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/teacher/register`,
        {
          method: "POST",
          body: formData,
        }
      );
      const result = await res.json();
      console.log(result);
      if (res.status >= 400 && res.status < 600) {
        throw new Error(result.message);
      } else {
        Router.push("/auth/signin");
      }
    } catch (error: any) {
      setProcessing(false);
      setStatus(error.message);
      console.log(error.message);
    }
  };

  return (
    <main className="h-full flex flex-col text-neutral-cool-gray w-full lg:mx-auto lg:mb-12  grow lg:p-4 lg:rounded-lg lg:bg-white lg:shadow">
      <Sidebar currentStep={step} handleNextStep={nextStep} />
      <div className="px-4 relative bg-neutral-magnolia  lg:bg-transparent lg:flex lg:flex-col lg:w-full ">
        <form className="bg-neutral-alabaster px-6 py-9  rounded-[0.625rem] -translate-y-[4.5rem]  w-full grow [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-primary-marine-blue [&_h3]:font-medium [&_h3]:text-primary-marine-blue lg:bg-transparent lg:translate-y-0 ">
          {step === 1 && (
            <PersonalInfo
              teacherInfo={userServiceConfiguration.teacherInfo}
              updateTeacherInfo={updateTeacherInfo}
              showRequired={showRequired}
            />
          )}
          {step === 2 && (
            <TeacherKYCForm
              teacherKYCInfo={userServiceConfiguration.teacherKYCInfo}
              updateKYCInfo={updateTeacherKYCInfo}
              showRequired={showRequired}
            />
          )}
        </form>
        {step === 1 && (
          <ul className="flex justify-center p-4 mt-auto">
            <li>
              <Button onClick={() => nextStep()} type="primary">
                Next Step
              </Button>
            </li>
          </ul>
        )}
        {step === 2 && (
          <ul className="flex justify-between p-4 mt-auto">
            <li>
              <Button type="ghost" onClick={goBack}>
                Go Back
              </Button>
            </li>
            <li>
              <button onClick={handleFormSubmit}>
                {processing ? "Submitting ... " : "Submit"}
              </button>
            </li>
          </ul>
        )}
      </div>
    </main>
  );
}

export default RegisterTeacherForm;
