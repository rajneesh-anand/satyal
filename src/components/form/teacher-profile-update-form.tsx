import Input from "@components/ui/input";
import { useForm } from "react-hook-form";
import Button from "@components/ui/button";
import Card from "@components/common/card";
import React, { useState, useEffect } from "react";
import { useUserContext } from "@contexts/user/user.context";

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

export default function TeacherProfileUpdateForm() {
  const [processing, setProcessing] = useState(false);
  const { user } = useUserContext();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      fname: user.firstName,
      lname: user.lastName,
    },
  });

  async function onSubmit(data: FormValues) {}

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
        <Card className="mb-5 w-full sm:w-8/12 md:w-2/3">
          <Input
            label="Name"
            type="text"
            {...register("fname", {
              required: "You must provide your first name !",
            })}
            error={errors.fname?.message}
            className="mb-5"
          />

          <Input
            variant="outline"
            type="text"
            label="Surname"
            {...register("lname", {
              required: "You must provide your last name !",
            })}
            error={errors.lname?.message}
          />
        </Card>

        <div className="text-end w-full">
          <Button>{processing ? "Updating ... " : "Update"}</Button>
        </div>
      </div>
    </form>
  );
}
