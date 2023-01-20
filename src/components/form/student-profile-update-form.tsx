import Input from "@components/ui/input";
import { useForm } from "react-hook-form";
import React, { useState, useEffect } from "react";
import { useUserContext } from "@contexts/user/user.context";
import { toast } from "react-toastify";
import Select from "@components/ui/form/select/select";
import Card from "@components/common/card";
import FileInput from "@components/ui/file-input";
import {
  statesOptions,
  classOptions,
  StateValue,
  ClassValue,
} from "@data/student";
import useWindowSize from "@utils/use-window-size";

type FormValues = {
  fname: string;
  lname: string;
  email: string;
  password: string;
  class: string;
  address: string;
  city: string;
  state: string;
  mobile: string;
};

type SelectType = {
  label: string;
  value: string;
};

export default function StudentProfileUpdateForm() {
  const { user } = useUserContext();
  const { width } = useWindowSize();
  const [status, setStatus] = useState<string | undefined>();
  const [selectedState, setSelectedState] = useState<StateValue>();
  const [selectedClass, setSelectedClass] = useState<ClassValue>();
  const [processing, setProcessing] = useState(false);
  const defaultClass: SelectType = {
    label: user.class,
    value: user.class,
  };
  const defaultState: SelectType = {
    label: user.province,
    value: user.province,
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      fname: user.firstName,
      lname: user.lastName,
      email: user.email,
      mobile: user.mobile,
      address: user.address,
      city: user.city,
      state: user.province,
    },
  });

  useEffect(() => {
    if (status === "success") {
      toast.success("Profile Information Updated !", {
        progressClassName: "fancy-progress-bar",
        position: width! > 768 ? "bottom-right" : "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }, [status]);

  function classChange(value: any) {
    setSelectedClass(value);
  }
  function stateChange(value: any) {
    setSelectedState(value);
  }

  async function onSubmit(data: FormValues) {
    setProcessing(true);
    setStatus("");
    const formData = new FormData();
    formData.append("fname", data.fname);
    formData.append("lname", data.lname);
    formData.append("address", data.address);
    formData.append("city", data.city);
    formData.append(
      "province",
      selectedState ? selectedState.value : user.province
    );
    formData.append("class", selectedClass ? selectedClass.value : user.class);
    formData.append("mobile", data.mobile);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/student/${user.id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      const result = await res.json();

      if (res.status >= 400 && res.status < 600) {
        throw new Error(result.message);
      } else {
        setStatus("success");
        setProcessing(false);
      }
    } catch (error: any) {
      setStatus("failed");
      setProcessing(false);
    }
  }

  return (
    <Card>
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
            {...register("email")}
            readOnly
          />
        </div>

        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/2  mb-3 ">
            <label
              htmlFor="class"
              className="block mb-3 text-sm font-semibold leading-none text-body-dark"
            >
              Class
            </label>
            <Select
              id="class"
              defaultValue={defaultClass}
              options={classOptions}
              isSearchable={false}
              onChange={classChange}
            />
          </div>
          <div className="w-full lg:w-1/2  mb-3 md:ml-[4px] ">
            <Input
              type="text"
              variant="outline"
              label="Contact Number "
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

        <div className="w-full mb-3 ">
          <Input
            type="text"
            variant="outline"
            label="Address"
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
              defaultValue={defaultState}
              options={statesOptions}
              isSearchable={false}
              onChange={stateChange}
            />
          </div>
        </div>

        <div className="text-right mt-8 mb-8">
          <button className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
            {processing ? "Updating ... " : "Update"}
          </button>
        </div>
      </form>
    </Card>
  );
}
