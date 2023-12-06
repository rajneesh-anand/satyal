import { siteSettings } from "@settings/site-settings";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Image from "@components/ui/image";
import Router from "next/router";
import useWindowSize from "@utils/use-window-size";
import { Plan, StudentInfo, UserServiceConfiguration } from "AppTypes";

type Props = {
  plan: Plan;
  studentData: StudentInfo;
};

const Payment: React.FC<Props> = ({ plan, studentData }) => {
  const { width } = useWindowSize();
  const options = siteSettings.paymentOptions;
  const [status, setStatus] = useState("");

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

  const paymentHandler = async (
    event: React.MouseEvent<HTMLButtonElement>,
    paymentName: string
  ) => {
    event.preventDefault();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/payment/khalti`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            userData: studentData,
            userType: "Student",
            payment: plan,
          }),
        }
      );
      const result = await res.json();
      console.log(result);
      if (res.status >= 400 && res.status < 600) {
        throw new Error(result.message);
      } else {
        Router.push(result.payment_url);
      }
    } catch (error: any) {
      setStatus(error.message);
      console.log(error.message);
    }
  };

  return (
    <div className="w-full md:w-[1108px] mx-auto p-5 px-0 sm:p-8  rounded-sm ">
      <div className="text-center pb-8">
        <h4 className="uppercase font-semibold font-body">
          Pick Your Payment Option
        </h4>
      </div>
      <div className="flex justify-center items-center flex-wrap xl:flex-nowrap ">
        {options?.map((item, index) => (
          <button
            key={index}
            onClick={(e) => paymentHandler(e, item.name)}
            className="inline-block mx-3 my-2 xl:my-0 md:mx-4  px-2 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-dark-footer hover:shadow-lg focus:bg-dark-footer focus:shadow-lg focus:outline-none focus:ring-0 active:bg-dark-footer active:shadow-lg transition duration-150 ease-in-out w-[100px] h-[100px]"
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
  );
};

export default Payment;

//
// objectFit="fill"
