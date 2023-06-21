import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Input from "@components/ui/input";
import PasswordInput from "@components/ui/form/password-input";
import Link from "@components/ui/link";
import Alert from "@components/ui/alert";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

interface FormValues {
  email: string;
  password: string;
}

function SignInForm({ csrfToken }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [errorMsg, setErrorMsg] = useState<string | undefined>();
  const [status, setStatus] = useState<string | undefined>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  useEffect(() => {
    if (status === "success") {
      router.push(
        session?.user?.userType === "Teacher"
          ? `${process.env.NEXT_PUBLIC_SITE_URL}/teacher/dashboard`
          : `${process.env.NEXT_PUBLIC_SITE_URL}/student/dashboard`
      );
    }
  }, [status]);

  const onSubmit = async (data: FormValues) => {
    const result = await signIn<"credentials">("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (result?.error) {
      setErrorMsg(result?.error);
    }

    if (result?.status === 200) {
      setStatus("success");
    }

    // if (result?.url) router.push(result.url);
  };

  return (
    <div className="max-w-screen-xl px-8 grid gap-8 grid-cols-1 md:grid-cols-2 md:px-12 lg:px-16 xl:px-32 py-16 mx-auto bg-gray-100 text-gray-900 rounded-lg shadow-lg mt-6">
      <div className="text-center pt-4">
        <div>
          <h2 className="text-xl lg:text-2xl font-semibold leading-tight">
            Sign In to Satyal Digital Learning
          </h2>
          <div className="text-gray-700 mt-4">
            Refer 5 friends &amp; Get 50% Discount on Tuitionn Fee
          </div>
        </div>
        <div className="mt-1 lg:mt-[56px] ">{/* <HeroIcon /> */}</div>
      </div>
      <div className="flex justify-center items-center">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full md:px-16">
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <Input
            label="Email"
            type="email"
            variant="outline"
            className="mb-4"
            {...register("email", {
              required: "You must provide your email address !",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Invalid email address !",
              },
            })}
            error={errors.email?.message}
          />
          <PasswordInput
            label="Password"
            variant="outline"
            className="mb-2"
            // forgotPassHelpText="Forgot Password"
            // forgotPageLink="/auth/forgot-password"
            {...register("password", {
              required: "You must provide your password !",
            })}
            error={errors?.password?.message!}
          />
          <div className="text-end">
            <Link
              href="/auth/forgot-password"
              className="text-[14px] text-red-900 font-semibold font-nunito "
            >
              Forgot Your Password ?
            </Link>
          </div>
          <div className="text-center mt-8 mb-8">
            <button className="inline-block px-6 py-2.5 bg-brown text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-brown/70 hover:shadow-lg  focus:shadow-lg focus:outline-none focus:ring-0  active:shadow-lg transition duration-150 ease-in-out">
              Sign In
            </button>
          </div>

          <div className="text-[12px] text-brown text-center">
            Don't have an account ?
            <Link
              href="/auth/register"
              className="ml-1 underline text-accent font-semibold transition-colors duration-200 focus:outline-none hover:text-accent-hover focus:text-accent-700 hover:no-underline focus:no-underline"
            >
              Register
            </Link>
          </div>

          {errorMsg && (
            <Alert
              message={errorMsg}
              variant="error"
              closeable={true}
              className="mt-5"
              onClose={() => setErrorMsg("")}
            />
          )}
        </form>
      </div>
    </div>
  );
}

export default SignInForm;
