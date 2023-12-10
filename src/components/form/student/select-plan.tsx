import React, { useState, useEffect } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { Plan } from "AppTypes";
import Card from "@components/common/card";
import { ValueType } from "AppTypes";
import cn from "classnames";

interface pricing_plans {
  id: number;
  plan_name: string;
  plan_description: string;
  most_popular: boolean;
  plan_fee: String;
  plan_discounted_fee: string;
  with_out_vat: string;
  plan_Classes: string[];
  features: string[];
}
// const activeClasses =
//   "border border-primary-purplish-blue bg-neutral-magnolia falopa";
const activeClasses = "bg-dark-footer";

interface SelectPlanProps {
  selectedPlan: Plan | null;
  updateSelectedPlan: (selectedPlan: Plan) => void;
  studentClass: string | ValueType;
}

export const SelectPlan = ({
  selectedPlan,
  updateSelectedPlan,
  studentClass,
}: SelectPlanProps) => {
  const [pricingData, setPricingData] = useState<Plan[]>([]);

  // fetching pricing of  package plan
  useEffect(() => {
    const fetchPricingData = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/pricing`
      );
      const result = await res.json();
      if (typeof studentClass === "string") return;
      let filter_pricings = result.filter((item: pricing_plans) =>
        item?.plan_Classes.includes(studentClass?.value)
      );
      setPricingData(filter_pricings);
    };
    fetchPricingData();
  }, []);

  return (
    <section className="flex flex-col gap-4 w-full">
      <h2>Select Your Plan</h2>
      <p>We have very affordable pricing plans</p>
      <ul className="flex flex-col gap-2 lg:flex-row mt-2 ">
        {pricingData?.map((item, index) => (
          <li key={index} className="lg:w-full my-2 md:my-0 ">
            <Card
              className={cn(
                "group relative py-2 md:py-4 px-3 flex gap-4 transition-all w-full lg:flex-col lg:gap-8  hover:bg-dark-footer cursor-pointer",
                item.plan_name === selectedPlan?.plan_name
                  ? activeClasses
                  : "border border-neutral-light-gray"
              )}
              onClick={() => updateSelectedPlan(item)}
            >
              <div className="flex-1">
                <h3
                  className={cn(
                    "text-sm md:text-md text-center font-semibold mt-1 uppercase group-hover:text-white",
                    item.plan_name === selectedPlan?.plan_name
                      ? "text-white"
                      : "text-gray-900"
                  )}
                >
                  <span
                    className={cn(
                      "text-md text-center font-semibold mt-1 uppercase group-hover:text-white",
                      item.plan_name === selectedPlan?.plan_name
                        ? "text-white"
                        : "text-gray-900"
                    )}
                  >
                    {item.plan_name}
                  </span>
                </h3>
                {item.most_popular ? (
                  <p className="absolute top-0 -translate-y-1/2 transform rounded-full bg-red-500 py-1.5 px-4 text-sm font-semibold text-white">
                    Most popular
                  </p>
                ) : null}

                {item.plan_discounted_fee > 0 ? (
                  <p
                    className={cn(
                      "my-1 md:my-2 flex justify-center items-baseline group-hover:text-white",
                      item.plan_name === selectedPlan?.plan_name
                        ? "text-white"
                        : "text-gray-900"
                    )}
                  >
                    {/* <span className=" text-sm font-normal line-through">
                      {item.plan_fee}
                    </span> */}
                    <span className="ml-1 text-xl md:text-2xl font-bold tracking-tight">
                      {item.plan_discounted_fee} NPR
                    </span>
                  </p>
                ) : (
                  <p
                    className={cn(
                      "my-1 md:my-2 flex justify-center items-baseline group-hover:text-white",
                      item.plan_name === selectedPlan?.plan_name
                        ? "text-white"
                        : "text-gray-900"
                    )}
                  >
                    <span className="ml-1 text-xl md:text-2xl font-bold tracking-tight">
                      {item.plan_fee} NPR
                    </span>
                  </p>
                )}
                <p
                  className={cn(
                    "mt-1 md:mt-2 group-hover:text-white",
                    item.plan_name === selectedPlan?.plan_name
                      ? "text-white"
                      : "text-gray-500"
                  )}
                >
                  {item.plan_description}
                </p>

                <ul role="list" className="mt-6 space-y-1.5">
                  {item.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <AiOutlineCheck
                        className={cn(
                          "h-4 w-4 flex-shrink-0  group-hover:text-white",
                          item.plan_name === selectedPlan?.plan_name
                            ? "text-white"
                            : "text-indigo-500"
                        )}
                        aria-hidden="true"
                      />
                      <span
                        className={cn(
                          "ml-2 text-sm md:text-md group-hover:text-white",
                          item.plan_name === selectedPlan?.plan_name
                            ? "text-white"
                            : "text-gray-500"
                        )}
                      >
                        {feature}
                      </span>
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
