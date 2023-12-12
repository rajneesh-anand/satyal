import { useState, useEffect } from "react";
import { Plan, StudentInfo, UserServiceConfiguration } from "AppTypes";
import { Button } from "@components/ui/button/button";
import { PersonalInfo } from "@components/form/student/personal-info";
import { SelectPlan } from "@components/form/student/select-plan";
import { Sidebar } from "@components/form/student/sidebar";
import Payment from "@components/form/student/payment";
import { toast } from "react-toastify";
import useWindowSize from "@utils/use-window-size";
function RegisterStudentForm() {
  const [step, setStep] = useState(1);
  const [showRequired, setShowRequiredFields] = useState(false);
  const [status, setStatus] = useState("");
  const { width } = useWindowSize();
  const [userServiceConfiguration, setUserServiceConfiguration] =
    useState<UserServiceConfiguration>({
      studentInfo: {
        firstName: "",
        middleName: "",
        lastName: "",
        email: "",
        password: "",
        studentClass: {
          label: "CLASS Nursery",
          value: "CLASS Nursery",
        },
        parentName: "",
        parentContactNumber: "",
        address: "",
        city: "",
        state: {
          value: "State 3 [ Bagmati Province ]",
          label: "State 3 [ Bagmati Province ]",
        },
        userContactNumber: "",
      },
      selectedPlan: null,
    });

  const updateStudentInfo = (studentInfo: StudentInfo) => {
    setUserServiceConfiguration({ ...userServiceConfiguration, studentInfo });
  };

  const updateSelectedPlan = (plan: Plan) => {
    setUserServiceConfiguration({
      ...userServiceConfiguration,
      selectedPlan: plan,
    });
  };

  const nextStep = (onGoingStep?: number) => {
    if (step === 4) return;
    if (step === 1 || (onGoingStep && onGoingStep !== 1 && step === 1)) {
      if (
        !userServiceConfiguration.studentInfo.firstName ||
        !userServiceConfiguration.studentInfo.lastName ||
        !userServiceConfiguration.studentInfo.email ||
        !userServiceConfiguration.studentInfo.email.includes("@") ||
        !userServiceConfiguration.studentInfo.password ||
        !userServiceConfiguration.studentInfo.userContactNumber ||
        !userServiceConfiguration.studentInfo.parentName ||
        !userServiceConfiguration.studentInfo.city ||
        !userServiceConfiguration.studentInfo.address ||
        !userServiceConfiguration.studentInfo.parentContactNumber
      ) {
        setShowRequiredFields(true);
        return;
      }
    }
    if (step === 2 || (onGoingStep && onGoingStep !== 2 && step === 2)) {
      if (!userServiceConfiguration.selectedPlan) {
        setStatus("Please select a plan");
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
    setTimeout(() => {
      setStatus("");
    }, 500);
  }, [status]);

  console.log(userServiceConfiguration?.studentInfo);

  return (
    <main className="h-full flex flex-col text-neutral-cool-gray w-full lg:mx-auto  lg:mt-4 lg:mb-12  grow lg:p-4 lg:rounded-lg lg:bg-white lg:h-[56.75rem] lg:shadow">
      <Sidebar currentStep={step} handleNextStep={nextStep} />
      <div className="px-4 relative bg-neutral-magnolia  lg:bg-transparent lg:flex lg:flex-col lg:w-full ">
        <form className="bg-neutral-alabaster px-6 py-9 rounded-[0.625rem] -translate-y-[4.5rem] flex justify-center w-full grow [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-primary-marine-blue [&_h3]:font-medium [&_h3]:text-primary-marine-blue lg:bg-transparent lg:translate-y-0 ">
          {step === 1 && (
            <PersonalInfo
              studentInfo={userServiceConfiguration.studentInfo}
              updateStudentInfo={updateStudentInfo}
              showRequired={showRequired}
            />
          )}
          {step === 2 && (
            <SelectPlan
              selectedPlan={userServiceConfiguration.selectedPlan}
              updateSelectedPlan={updateSelectedPlan}
              studentClass={userServiceConfiguration.studentInfo.studentClass}
            />
          )}
          {step === 3 && (
            <Payment
              plan={userServiceConfiguration.selectedPlan}
              studentData={userServiceConfiguration.studentInfo}
            />
          )}
        </form>
        {step === 1 && (
          <ul className="flex justify-center">
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
              <Button onClick={() => nextStep()} type="primary">
                Next Step
              </Button>
            </li>
          </ul>
        )}
        {step === 3 && (
          <ul className="flex justify-between p-4 mt-auto">
            <li>
              <Button type="ghost" onClick={goBack}>
                Go Back
              </Button>
            </li>
          </ul>
        )}
      </div>
    </main>
  );
}

export default RegisterStudentForm;
