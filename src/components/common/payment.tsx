import Button from "@components/ui/button";
import { useForm } from "react-hook-form";
import { useModalState } from "@components/common/modal/modal.context";
import { siteSettings } from "@settings/site-settings";
import Image from "@components/ui/image";
import Router from "next/router";

const PaymentPopup: React.FC = () => {
  const options = siteSettings.paymentOptions;

  const paymentHandler = async (paymentName: string) => {
    console.log(paymentName);
    try {
      const res = await fetch(
        "https://a.khalti.com/api/v2/epayment/initiate/",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Key fd0bbb0969ca474ca644b9d75e3a0452",
          },
          method: "POST",
          body: JSON.stringify({
            return_url: "http://localhost:3000/payment/status",
            website_url: "http://localhost:3000",
            amount: 1300,
            purchase_order_id: "test15022023",
            purchase_order_name: "test_order_name",
            customer_info: {
              name: "Ashim Upadhaya",
              email: "example@gmail.com",
              phone: "9811496763",
            },
            amount_breakdown: [
              {
                label: "Mark Price",
                amount: 1000,
              },
              {
                label: "VAT",
                amount: 300,
              },
            ],
            product_details: [
              {
                identity: "1234567890",
                name: "Khalti logo",
                total_price: 1300,
                quantity: 1,
                unit_price: 1300,
              },
            ],
          }),
        }
      );

      const result = await res.json();
      if (res.status >= 400 && res.status < 600) {
        throw new Error(result.message);
      } else {
        Router.push(result.payment_url);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <div className="w-full md:w-[508px] mx-auto p-5 sm:p-8 bg-slate-100 rounded-sm">
      <div className="text-center pb-8">
        <h4 className="uppercase font-semibold font-body">
          Pick Your Payment Option
        </h4>
      </div>
      <div className="flex justify-center items-center">
        {options?.map((item, index) => (
          <button
            key={index}
            onClick={(e) => paymentHandler(item.name)}
            className="inline-block mx-4 px-2 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-dark-footer hover:shadow-lg focus:bg-dark-footer focus:shadow-lg focus:outline-none focus:ring-0 active:bg-dark-footer active:shadow-lg transition duration-150 ease-in-out"
          >
            <Image
              src={item.iconSrc}
              alt={item.name}
              quality={100}
              width={80}
              height={80}
              objectFit="fill"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default PaymentPopup;
