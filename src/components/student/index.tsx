import { useState } from "react";
import { Plan, StudentInfo, UserServiceConfiguration } from "AppTypes";
import { Button } from "@components/ui/button/button";
import { PersonalInfo } from "@components/student/personal-info";
import { SelectPlan } from "@components/student/select-plan";
import { Sidebar } from "@components/student/sidebar";
import Payment from "@components/student/payment";

function RegisterStudentForm() {
  const [step, setStep] = useState(1);
  const [showRequired, setShowRequiredFields] = useState(false);

  const [userServiceConfiguration, setUserServiceConfiguration] =
    useState<UserServiceConfiguration>({
      studentInfo: {
        fname: "",
        lname: "",
        email: "",
        password: "",
        class: "",
        parent: "",
        address: "",
        city: "",
        state: "",
        mobile: "",
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
        !userServiceConfiguration.studentInfo.fname ||
        !userServiceConfiguration.studentInfo.lname ||
        !userServiceConfiguration.studentInfo.email ||
        !userServiceConfiguration.studentInfo.email.includes("@") ||
        !userServiceConfiguration.studentInfo.password ||
        !userServiceConfiguration.studentInfo.mobile ||
        !userServiceConfiguration.studentInfo.parent ||
        !userServiceConfiguration.studentInfo.city ||
        !userServiceConfiguration.studentInfo.address
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

  return (
    <main className="h-full flex flex-col text-neutral-cool-gray w-full lg:mx-auto  lg:mt-4 lg:mb-12  grow lg:p-4 lg:rounded-lg lg:bg-white md:h-[56.75rem] lg:shadow">
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
