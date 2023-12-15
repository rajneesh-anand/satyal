import { siteSettings } from "@settings/site-settings";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Image from "@components/ui/image";
import Router from "next/router";
import useWindowSize from "@utils/use-window-size";
import { Plan, StudentInfo, UserServiceConfiguration } from "AppTypes";
import axios from "axios";

type Props = {
  plan: Plan;
  studentData: StudentInfo;
};

const Payment: React.FC<Props> = ({ plan, studentData }) => {
  const { width } = useWindowSize();
  const options = siteSettings.paymentOptions;
  const [status, setStatus] = useState("");

  // console.log(studentData);
  // console.log(plan);
  // useEffect(() => {
  //   if (status !== "") {
  //     toast.error(`${status}`, {
  //       progressClassName: "fancy-progress-bar",
  //       position: width! > 768 ? "bottom-right" : "top-right",
  //       autoClose: 1500,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //     });
  //   }
  // }, [status]);

  const paymentHandler = async (
    event: React.MouseEvent<HTMLButtonElement>,
    paymentName: string
  ) => {
    event.preventDefault();
    const planDetails = {
      id: plan?.id,
      plan_name: plan?.plan_name,
      plan_fee: plan?.plan_fee,
      with_out_vat: plan?.with_out_vat,
      plan_discounted_fee: plan?.plan_discounted_fee,
    };

    try {
      const userRegisterResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/v1/user/register`,
        {
          userData: studentData,
          paymentMethod: paymentName,
          selectedPlan: planDetails,
          userType: "Student",
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      // const res = await fetch(
      //   `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/payment/khalti`,
      //   {
      //     headers: {
      //       Accept: "application/json",
      //       "Content-Type": "application/json",
      //     },
      //     method: "POST",
      //     body: JSON.stringify({
      //       userData: studentData,
      //       userType: "Student",
      //       payment: plan,
      //     }),
      //   }
      // );
      // const result = await res.json();
      // console.log(result);
      if (
        userRegisterResponse.status >= 400 &&
        userRegisterResponse.status < 600
      ) {
        // throw new Error(userRegisterResponse?.error);
        console.log("error in user register");
      } else {
        Router.push(userRegisterResponse?.data?.payment_url);
      }
    } catch (error: any) {
      setStatus(error.message);
      console.log(error.message);
    }
  };
  // if(typeof studentData?.studentClass!=="string"){
  //   const studentlevel=studentData?.studentClass?.label
  // }
  return (
    <div className="w-full md:w-[1108px] mx-auto p-5 px-0 sm:p-8 rounded-sm flex">
      <div
        className="flex-1 relative"
        style={{
          backgroundImage: 'url("/images/WebImg.svg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "10px",
        }}
      >
        <div className="flex-1 pr-8">
          {/* Card content goes here */}
          <div className="bg-white p-4 rounded-md shadow-md">
            {/* Display Student Details */}
            <div>
              <h4 className="text-lg font-semibold mb-2">Student Details:</h4>
              <p>
                <strong>Name:</strong> {studentData.firstName}
                {studentData.middleName} {studentData.lastName}
              </p>
              <p>
                <strong>Email:</strong> {studentData.email}
              </p>
              <p>
                <strong>Class:</strong>{" "}
                {typeof studentData?.studentClass !== "string"
                  ? studentData?.studentClass?.label
                  : ""}
              </p>
              <p>
                <strong>City:</strong> {studentData.city}
              </p>
              <p>
                <strong>ParentName:</strong> {studentData.parentName}
              </p>
              <p>
                <strong>ParentContact:</strong>{" "}
                {studentData.parentContactNumber}
              </p>
            </div>

            {/* Display Payment Details */}
            <div className="mt-4">
              <h4 className="text-lg font-semibold mb-2">Payment Details:</h4>
              <p>
                <strong>Plan Name:</strong> {plan?.plan_name}
              </p>
              <p>
                <strong>Amount:</strong> RS{plan?.plan_discounted_fee}
              </p>
              {/* Add more payment details as needed */}
            </div>
          </div>
        </div>
      </div>

      <div className="text-left pb-4">
        {/* {" "} */}
        {/* Updated styling */}
        <h4 className="uppercase font-semibold font-body text-dark-footer">
          Select Payment Options
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {options?.map((item, index) => (
            <button
              key={index}
              onClick={(e) => paymentHandler(e, item.name)}
              className="inline-block mx-3 my-2 xl:my-0 md:mx-4  px-2 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-dark-footer hover:shadow-lg focus:bg-dark-footer focus:shadow-lg focus:outline-none focus:ring-0 active:bg-dark-footer active:shadow-lg transition duration-150 ease-in-out w-full h-[100px] md:w-[100px]"
            >
              <Image
                src={item.iconSrc}
                alt={item.name}
                width={100}
                height={100}
                quality={100}
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Payment;
//
// objectFit="fill"
