import React, { useState, useEffect } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import classNames from "classnames";
import Router from "next/router";
import { useModalAction } from "@components/common/modal/modal.context";

export default function Pricing() {
  const { closeModal, openModal } = useModalAction();

  function handlePayment() {
    return openModal("PAYMENT");
  }
  const [pricingData, setPricingData] = useState<
    {
      plan_name: string;
      plan_description: string;
      plan_fee: number;
      plan_discounted_fee: number;
      most_popular: boolean;
      features: string[];
    }[]
  >([]);

  useEffect(() => {
    const fetchPricingData = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/pricing`
      );
      const result = await res.json();
      setPricingData(result);
    };
    fetchPricingData();
  }, []);

  // const handlePayment = async () => {
  //   try {
  //     const res = await fetch(
  //       "https://a.khalti.com/api/v2/epayment/initiate/",
  //       {
  //         headers: {
  //           Accept: "application/json",
  //           "Content-Type": "application/json",
  //           Authorization: "Key fd0bbb0969ca474ca644b9d75e3a0452",
  //         },
  //         method: "POST",
  //         body: JSON.stringify({
  //           return_url: "http://localhost:3000/auth/signin",
  //           website_url: "http://localhost:3000",
  //           amount: 1300,
  //           purchase_order_id: "test15022023",
  //           purchase_order_name: "test_order_name",
  //           customer_info: {
  //             name: "Ashim Upadhaya",
  //             email: "example@gmail.com",
  //             phone: "9811496763",
  //           },
  //           amount_breakdown: [
  //             {
  //               label: "Mark Price",
  //               amount: 1000,
  //             },
  //             {
  //               label: "VAT",
  //               amount: 300,
  //             },
  //           ],
  //           product_details: [
  //             {
  //               identity: "1234567890",
  //               name: "Khalti logo",
  //               total_price: 1300,
  //               quantity: 1,
  //               unit_price: 1300,
  //             },
  //           ],
  //         }),
  //       }
  //     );

  //     const result = await res.json();
  //     if (res.status >= 400 && res.status < 600) {
  //       throw new Error(result.message);
  //     } else {
  //       Router.push(result.payment_url);
  //     }
  //   } catch (error: any) {
  //     console.log(error.message);
  //     setStatus("failed");
  //   }
  // };

  return (
    <div className="mx-auto max-w-7xl bg-white ">
      {/* <div className="flex flex-col justify-center items-center">
        <h4 className="font-nunito font-bold lg:leading-normal leading-normal text-2xl lg:text-4xl mb-5 text-black dark:text-white">
          We have very affordable{" "}
          <span className="text-indigo-600">Pricing Plans</span>
        </h4>
        <p className="mt-1  text-md  text-gray-500">
          Choose an affordable plan that's packed with the best features for
          engaging your audience, creating customer loyalty, and driving sales.
        </p>
      </div> */}

      <div className="mt-16 space-y-12 lg:grid lg:grid-cols-4 lg:gap-x-2 lg:space-y-0">
        {pricingData?.map((item, index) => (
          <div
            key={index}
            className="relative flex flex-col rounded-md border border-gray-200 bg-white p-8 shadow-sm"
          >
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 uppercase">
                {item.plan_name}
              </h3>
              {item.most_popular ? (
                <p className="absolute top-0 -translate-y-1/2 transform rounded-full bg-red-500 py-1.5 px-4 text-sm font-semibold text-white">
                  Most popular
                </p>
              ) : null}
              <p className="mt-4 flex items-baseline text-gray-900">
                <span className=" text-xl font-normal line-through">
                  {item.plan_fee}
                </span>
                <span className="ml-1 text-3xl font-semibold tracking-tight">
                  {item.plan_discounted_fee} NPR
                </span>
              </p>
              <p className="mt-6 text-gray-500">{item.plan_description}</p>

              <ul role="list" className="mt-6 space-y-3">
                {item.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <AiOutlineCheck
                      className="h-4 w-4 flex-shrink-0 text-indigo-500"
                      aria-hidden="true"
                    />
                    <span className="ml-2 text-gray-500">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              // onClick={handlePayment}
              className="bg-indigo-500 text-white mt-8 block w-full py-2 px-4 border border-transparent rounded-md text-center font-medium focus:bg-dark-footer focus:shadow-lg focus:outline-none focus:ring-0 active:bg-dark-footer active:shadow-lg transition duration-150 ease-in-out"
            >
              Select Plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
