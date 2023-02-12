import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { IoCheckmarkCircle } from "react-icons/io5";
import Input from "@components/ui/input";
import PasswordInput from "@components/ui/form/password-input";
import Link from "@components/ui/link";
import { toast } from "react-toastify";
import Alert from "@components/ui/alert";
import Select from "@components/ui/form/select/select";
import { statesOptions, classOptions, mediumOptions } from "@data/student";
import useWindowSize from "@utils/use-window-size";
import { useRouter } from "next/router";

interface FormValues {
  fname: string;
  lname: string;
  email: string;
  password: string;
  address: string;
  city: string;
  state: string;
  mobile: string;
}

function TeacherRegistrationForm() {
  const { width } = useWindowSize();
  const router = useRouter();
  const [processing, setProcessing] = useState(false);
  const [status, setStatus] = useState("");
  const [selectedState, setSelectedState] = useState(statesOptions[0]);
  const [errorMsg, setErrorMsg] = useState<string | undefined>("");

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  useEffect(() => {
    if (status === "failed") {
      toast.error(" Oops something went wrong !", {
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

  function stateChange(value: any) {
    setSelectedState(value);
  }

  async function onSubmit(data: FormValues) {
    setProcessing(true);
    const formData = new FormData();
    formData.append("fname", data.fname);
    formData.append("lname", data.lname);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("address", data.address);
    formData.append("city", data.city);
    formData.append("province", data.state ? data.state : selectedState.value);
    formData.append("mobile", data.mobile);
    formData.append("userType", "Teacher");
    try {
      const res = await fetch(`${process.env.API_URL}/auth/register`, {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (res.status >= 400 && res.status < 600) {
        throw new Error(result.message);
      } else {
        setStatus("success");
        setProcessing(false);
        router.push("/auth/signin");
      }
    } catch (error: any) {
      console.log(error.message);
      setStatus("failed");
      setErrorMsg(error?.message);
      setProcessing(false);
    }
  }

  return (
    <div className="md:grid md:grid-cols-2 md:gap-6 mt-4">
      <div className="md:col-span-1 mx-8 my-8">
        <h1 className="text-xl lg:text-3xl font-bold leading-tight">
          Satyal Digital Registration
        </h1>
        <p className="text-gray-700 mt-4">
          Refer 5 friends &amp; Get 50% Discount on Tuitionn Fee
        </p>
      </div>

      <div className="mt-5 md:col-span-1 md:mt-0">
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="w-full">
          <div className="flex flex-col lg:flex-row">
            <div className="w-full md:w-1/2  mb-3">
              <Input
                variant="outline"
                type="text"
                label="First Name"
                {...register("fname", {
                  required: "You must provide your first name !",
                })}
                error={errors.fname?.message}
              />
            </div>
            <div className="w-full md:w-1/2  mb-3 md:ml-[4px]">
              <Input
                variant="outline"
                type="text"
                label="Last Name"
                {...register("lname", {
                  required: "You must provide your last name !",
                })}
                error={errors.lname?.message}
              />
            </div>
          </div>
          <div className="w-full mb-3 ">
            <Input
              type="email"
              variant="outline"
              label="Email Address "
              placeholder="Enter your email address"
              {...register("email", {
                required: "You must provide your email address !",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Invalid email address !",
                },
              })}
              error={errors.email?.message}
            />
          </div>
          <div className="w-full mb-3 ">
            <PasswordInput
              label="Password"
              variant="outline"
              placeholder="Set Password"
              {...register("password", {
                required: "You must set password !",
                pattern: {
                  value: /^(?=.*).{8,}$/,
                  message: "Invalid Password  !",
                },
              })}
              error={errors?.password?.message!}
            />
          </div>

          <div className="w-full mb-3 ">
            <Input
              type="text"
              variant="outline"
              label="Address"
              placeholder="Enter Your Address"
              {...register("address", {
                required: "You must provide your address !",
              })}
              error={errors.address?.message}
            />
          </div>

          <div className="flex flex-col lg:flex-row">
            <div className="w-full md:w-1/2  mb-3 ">
              <Input
                type="text"
                variant="outline"
                label="City"
                placeholder="Your City/Town Name"
                {...register("city")}
                error={errors.city?.message}
              />
            </div>

            <div className="w-full md:w-1/2  mb-3 lg:ml-[4px]">
              <label
                htmlFor="state"
                className="block mb-3 text-sm font-semibold leading-none text-body-dark"
              >
                State
              </label>
              <Select
                id="state"
                defaultValue={selectedState}
                options={statesOptions}
                isSearchable={false}
                onChange={stateChange}
              />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row">
            <div className="w-full lg:w-1/2  mb-3 ">
              <Input
                type="text"
                variant="outline"
                label="Contact Number "
                placeholder="Mobile Number"
                {...register("mobile", {
                  required: "You must provide your mobile number !",
                  pattern: {
                    value: /^((\+91?)|\+)?[7-9][0-9]{9}$/,
                    message: "Invalid Mobile Number !",
                  },
                })}
                error={errors.mobile?.message}
              />
            </div>
          </div>

          <div className="text-center mt-8 mb-8">
            <button className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
              {processing ? "Submitting Form ... " : "Register"}
            </button>
          </div>
          {errorMsg ? (
            <Alert
              message={errorMsg}
              variant="error"
              closeable={true}
              className="mt-5"
              onClose={() => setErrorMsg("")}
            />
          ) : null}
        </form>
      </div>
    </div>
  );
}

export default TeacherRegistrationForm;
