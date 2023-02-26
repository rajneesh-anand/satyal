import React, { useState, useEffect } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { Plan } from "AppTypes";
import Card from "@components/common/card";
import cn from "classnames";

const activeClasses =
  "border border-primary-purplish-blue bg-neutral-magnolia falopa";

interface SelectPlanProps {
  selectedPlan: Plan | null;
  updateSelectedPlan: (selectedPlan: Plan) => void;
}

export const SelectPlan = ({
  selectedPlan,
  updateSelectedPlan,
}: SelectPlanProps) => {
  const [pricingData, setPricingData] = useState<Plan[]>([]);
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
    <section className="flex flex-col gap-4 w-full">
      <h2>Select Your Plan</h2>
      <p>We have very affordable pricing plans</p>
      <ul className="flex flex-col gap-2 lg:flex-row mt-2">
        {pricingData?.map((item, index) => (
          <li key={index} className="lg:w-full">
            <Card
              className={cn(
                "relative py-4 px-3 flex gap-4 transition-all w-full lg:flex-col lg:gap-8 hover:border-primary-purplish-blue hover:bg-neutral-magnolia cursor-pointer",
                item.plan_name === selectedPlan?.plan_name
                  ? activeClasses
                  : "border border-neutral-light-gray"
              )}
              onClick={() => updateSelectedPlan(item)}
            >
              <div className="flex-1">
                <h3 className="text-sm text-center font-semibold mt-1 text-gray-900 uppercase">
                  {item.plan_name}
                </h3>
                {item.most_popular ? (
                  <p className="absolute top-0 -translate-y-1/2 transform rounded-full bg-red-500 py-1.5 px-4 text-sm font-semibold text-white">
                    Most popular
                  </p>
                ) : null}

                {item.plan_discounted_fee > 0 ? (
                  <p className="my-2 flex justify-center items-baseline text-gray-900">
                    <span className=" text-sm font-normal line-through">
                      {item.plan_fee}
                    </span>
                    <span className="ml-1 text-xl font-semibold tracking-tight">
                      {item.plan_discounted_fee} NPR
                    </span>
                  </p>
                ) : (
                  <p className="mt-4 flex justify-center text-xl items-baseline text-gray-900">
                    {item.plan_fee} NPR
                  </p>
                )}
                <p className="mt-2 text-gray-500">{item.plan_description}</p>

                <ul role="list" className="mt-6 space-y-1.5">
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
            </Card>
          </li>
        ))}
      </ul>
    </section>
  );
};
