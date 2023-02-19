import React, { useState, useEffect } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import classNames from "classnames";

export default function Pricing() {
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

  return (
    <div className="mx-auto max-w-7xl bg-white py-24 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col justify-center items-center">
        <h4 className="font-nunito font-bold lg:leading-normal leading-normal text-2xl lg:text-4xl mb-5 text-black dark:text-white">
          We have very affordable{" "}
          <span className="text-dark-footer">Pricing Plans</span>
        </h4>
        <p className="mt-1  text-md  text-gray-500">
          Choose an affordable plan that's packed with the best features for
          engaging your audience, creating customer loyalty, and driving sales.
        </p>
      </div>

      <div className="mt-32 space-y-12 lg:grid lg:grid-cols-4 lg:gap-x-2 lg:space-y-0">
        {pricingData?.map((item) => (
          <div
            key={item.plan_name}
            className="relative flex flex-col rounded-2xl border border-gray-200 bg-white p-8 shadow-sm"
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

              <ul role="list" className="mt-6 space-y-6">
                {item.features.map((feature) => (
                  <li key={feature} className="flex">
                    <AiOutlineCheck
                      className="h-6 w-6 flex-shrink-0 text-indigo-500"
                      aria-hidden="true"
                    />
                    <span className="ml-3 text-gray-500">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              className={classNames(
                item.most_popular
                  ? "bg-dark-footer text-white hover:bg-red-700"
                  : "bg-dark-footer  opacity-50 text-white hover:bg-red-500",
                "mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium"
              )}
            >
              Pay Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
