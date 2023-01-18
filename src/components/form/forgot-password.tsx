import { Fragment, useState, useEffect } from "react";
import Input from "@components/ui/input";
import { useForm, Controller } from "react-hook-form";
import Alert from "@components/ui/alert";
import { IoCheckmarkCircle } from "react-icons/io5";

interface FormValues {
  email: string;
}

export default function ForgotPassword() {
  const [status, setStatus] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | undefined>("");
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  async function onSubmit(data: FormValues) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/auth/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: data.email }),
        }
      );

      const result = await res.json();
      if (res.status >= 400 && res.status < 600) {
        throw new Error(result.message);
      } else {
        setStatus("success");
      }
    } catch (error: any) {
      console.log(error);
      console.log(error.message);
      setStatus("failed");
      setErrorMsg(error.message);
    }
  }

  return (
    <>
      {status === "success" ? (
        <div className="flex items-center justify-center h-[400px] text-green-700 ">
          <span className="w-10 h-10 me-3 lg:me-4 rounded-full bg-skin-primary bg-opacity-20 flex items-center justify-center flex-shrink-0">
            <IoCheckmarkCircle className="w-5 h-5 text-skin-primary" />
          </span>
          We have sent a password reset link at you email address. The Link is
          valid for 10 minutes only.
        </div>
      ) : (
        <div className="flex h-full justify-center items-center h-[300px]">
          <div className="w-[400px]">
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="w-full"
            >
              <div className="w-full mb-3 ">
                <Input
                  type="email"
                  variant="outline"
                  label="What is your email address ? "
                  placeholder="What is you email address !"
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
              <div className="text-center mt-8 mb-8">
                <button className="px-6 py-2 text-sm text-blue-100 transition-colors duration-300 bg-blue-500 rounded-full shadow-xl hover:bg-blue-600 shadow-blue-400/30">
                  Send Password Reset Link
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
      )}
    </>
  );
}
