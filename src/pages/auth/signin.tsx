import Layout from "@components/layout";
import Container from "@components/ui/container";
import Seo from "@components/seo/seo";
import Alert from "@components/ui/alert";
import Button from "@components/ui/button";
import Input from "@components/ui/input";
import Link from "@components/ui/link";
import PasswordInput from "@components/ui/form/password-input";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Logo from "@components/ui/logo";
import { GetServerSideProps } from "next";
import { signIn, getCsrfToken, getSession } from "next-auth/react";
import { QueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  const csrfToken = await getCsrfToken(context);
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      csrfToken: csrfToken,
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      ...(await serverSideTranslations(context.locale!, [
        "common",
        "forms",
        "menu",
        "footer",
      ])),
    },
  };
};

type FormValues = {
  email: string;
  password?: string;
};

export default function LoginPage({ csrfToken }: any) {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState<string | undefined>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    const result = await signIn<"credentials">("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
      callbackUrl: "http://localhost:3000",
    });

    if (result?.error) {
      setErrorMsg(result?.error);
    }
    if (result?.url) router.push(result.url);
  };

  return (
    <>
      <Seo
        title="Sign In"
        description="Online Education Institute"
        path="/auth/signin"
      />

      <div className="max-w-screen-xl px-8 grid gap-8 grid-cols-1 md:grid-cols-2 md:px-12 lg:px-16 xl:px-32 py-16 mx-auto bg-gray-100 text-gray-900 rounded-lg shadow-lg">
        <div className="text-center pt-4">
          <div>
            <h2 className="text-xl lg:text-3xl font-bold leading-tight">
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
              className="mb-4"
              forgotPassHelpText="Forgot Password"
              forgotPageLink="/user/forgot-password"
              {...register("password", {
                required: "You must provide your password !",
              })}
              error={errors?.password?.message!}
            />
            <div className="text-center mb-2">
              <button className="bg-green-500 hover:bg-green-700 text-white text-center py-2 px-5 rounded-full">
                Login
              </button>
            </div>

            {/* <div className="flex flex-col items-center justify-center relative text-sm text-heading mt-3 sm:mt-4 mb-3 sm:mb-4">
                <hr className="w-full" />
              </div> */}

            <div className="text-sm sm:text-base text-body text-center">
              Don't have an account ?
              <Link
                href="/auth/register"
                className="ms-1 underline text-accent font-semibold transition-colors duration-200 focus:outline-none hover:text-accent-hover focus:text-accent-700 hover:no-underline focus:no-underline"
              >
                Register
              </Link>
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
    </>
  );
}

LoginPage.Layout = Layout;
