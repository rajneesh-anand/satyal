import Layout from "@components/layout";
import Container from "@components/ui/container";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { homeTwoHeroBanner as heroBanner } from "@framework/static/banner";
import HeroSliderBlock from "@components/hero/hero-slider-block";
import { GetStaticProps } from "next";
import Seo from "@components/seo/seo";
import CollectionGrid from "@components/common/collection-grid";
import Pricing from "@components/pricing";
import { SelectPlan } from "@components/form/student/select-plan";
import { Plan } from "AppTypes";

export default function Home() {
  return (
    <>
      <Seo
        title="Satyal Online Learning"
        description='Satyal Publication has been in the educational publishing industry for more than 30 years. We started from a book shop 42 years ago in Biratnagar which transformed into the largest and one of the leading educational publishing house in the later days. Today, we are here as a new firm to change the way we educate our loved ones. This change, we are seeking to digitalize the education sector. "Lets Change The Way We Educate Our Loved Ones!"'
        path="/"
      />
      <HeroSliderBlock
        // heroBanner={heroBanner}
        contentClassName="pb-24 xl:pb-32 pt-16 xl:pt-24"
      />

      <Container>
        <section className="relative md:py-24 py-16 overflow-hidden ">
          <div className="container">
            <div className="grid grid-cols-1 pb-8 text-center ">
              <h4 className="font-nunito font-bold lg:leading-normal leading-normal text-3xl lg:text-4xl mb-5 text-black ">
                Why Choose{" "}
                <span className="text-dark-footer ">Satyal Learning ?</span>
              </h4>

              {/* <p className="text-slate-400 max-w-xl mx-auto">
              “Best Online Guidance” 
        
              </p> */}
            </div>

            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-8 gap-[30px] ">
              <div className="group relative lg:px-10 lg:py-2 transition-all duration-500 ease-in-out rounded-xl bg-white border  overflow-hidden text-center">
                <div className="relative overflow-hidden text-transparent lg:my-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-hexagon h-32 w-32 fill-indigo-600/5 mx-auto"
                  >
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  </svg>

                  <div className="absolute top-2/4 -translate-y-2/4 left-0 right-0 mx-auto text-red-700 rounded-xl transition-all duration-500 ease-in-out text-4xl flex align-middle justify-center items-center">
                    {/* <i className="icofont-live-support"></i> */}
                    <img
                      src="/images/Online Guidance.svg"
                      className=" rounded-lg"
                      alt="photo-2"
                      height={30}
                      width={30}
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <a
                    href="#"
                    className="font-body text-xl font-medium transition-all duration-500 ease-in-out text-dark-footer hover:text-red-800"
                  >
                    Best Online Guidance
                  </a>
                  {/* <p className="text-slate-400 transition-all duration-500 ease-in-out mt-3">
                    If the distribution of letters and 'words' is random, the
                    reader will not be distracted from making.
                  </p> */}
                </div>
              </div>

              <div className="group relative lg:px-10 lg:py-2 transition-all duration-500 ease-in-out rounded-xl bg-white border  overflow-hidden text-center">
                <div className="relative overflow-hidden text-transparent lg:py-4 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-hexagon h-32 w-32 fill-indigo-600/5 mx-auto"
                  >
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  </svg>
                  <div className="absolute top-2/4 -translate-y-2/4 left-0 right-0 mx-auto text-red-800 rounded-xl transition-all duration-500 ease-in-out text-4xl flex align-middle justify-center items-center">
                    <i className="icofont-wallet"></i>
                  </div>
                </div>

                <div className="mt-2">
                  <a
                    href="#"
                    className=" font-body text-xl font-medium transition-all duration-500 ease-in-out text-dark-footer hover:text-red-800"
                  >
                    “Cost Efficient! The Affordable Online Education in Nepal”
                  </a>
                  {/* <p className="text-slate-400 transition-all duration-500 ease-in-out mt-3">
                    If the distribution of letters and 'words' is random, the
                    reader will not be distracted from making.
                  </p> */}
                </div>
              </div>

              <div className="group relative lg:px-10 lg:py-2 transition-all duration-500 ease-in-out rounded-xl bg-white border  overflow-hidden text-center">
                <div className="relative overflow-hidden text-transparent lg:py-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-hexagon h-32 w-32 fill-indigo-600/5 mx-auto"
                  >
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  </svg>
                  <div className="absolute top-2/4 -translate-y-2/4 left-0 right-0 mx-auto text-red-800 rounded-xl transition-all duration-500 ease-in-out text-4xl flex align-middle justify-center items-center">
                    {/* <i className="icofont-users-alt-5"></i> */}
                    <img
                      src="/images/Books 1-10.svg"
                      className=" rounded-lg"
                      alt="photo-2"
                      height={60}
                      width={60}
                    />
                  </div>
                </div>

                <div className="mt-2">
                  <a
                    href="#"
                    className="font-body text-xl font-medium transition-all duration-500 ease-in-out text-dark-footer hover:text-red-800"
                  >
                    “Books For All Classes”
                  </a>
                  {/* <p className="text-slate-400 transition-all duration-500 ease-in-out mt-3">
                    If the distribution of letters and 'words' is random, the
                    reader will not be distracted from making.
                  </p> */}
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-8 gap-[30px] ">
              <div className="group relative lg:px-10 lg:py-2 transition-all duration-500 ease-in-out rounded-xl bg-white border  overflow-hidden text-center">
                <div className="relative overflow-hidden text-transparent lg:py-4 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-hexagon h-32 w-32 fill-indigo-600/5 mx-auto"
                  >
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  </svg>
                  <div className="absolute top-2/4 -translate-y-2/4 left-0 right-0 mx-auto text-red-800 rounded-xl transition-all duration-500 ease-in-out text-4xl flex align-middle justify-center items-center">
                    {/* <i className="icofont-wallet"></i> */}
                    <img
                      src="/images/35 Years Satyal.svg"
                      className=" rounded-lg"
                      alt="photo-2"
                      height={60}
                      width={70}
                    />
                  </div>
                </div>

                <div className="mt-2">
                  <a
                    href="#"
                    className=" font-body text-xl font-medium transition-all duration-500 ease-in-out text-dark-footer hover:text-red-800"
                  >
                    “Trusted Publishing Brand For 35 Years”
                  </a>
                  {/* <p className="text-slate-400 transition-all duration-500 ease-in-out mt-3">
                    If the distribution of letters and 'words' is random, the
                    reader will not be distracted from making.
                  </p> */}
                </div>
              </div>

              <div className="group relative lg:px-10 lg:py-2 transition-all duration-500 ease-in-out rounded-xl bg-white border  overflow-hidden text-center">
                <div className="relative overflow-hidden text-transparent lg:py-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-hexagon h-32 w-32 fill-indigo-600/5 mx-auto"
                  >
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  </svg>
                  <div className="absolute top-2/4 -translate-y-2/4 left-0 right-0 mx-auto text-red-800 rounded-xl transition-all duration-500 ease-in-out text-4xl flex align-middle justify-center items-center">
                    {/* <i className="icofont-users-alt-5"></i> */}
                    <img
                      src="/images/Tuition.svg"
                      className=" rounded-lg"
                      alt="photo-2"
                      height={50}
                      width={50}
                    />
                  </div>
                </div>

                <div className="mt-2">
                  <a
                    href="#"
                    className="font-body text-xl font-medium transition-all duration-500 ease-in-out text-dark-footer hover:text-red-800"
                  >
                    “Learn Anywhere & Anytime! Need Support? Get Our Online
                    Tuition Too!”
                  </a>
                  {/* <p className="text-slate-400 transition-all duration-500 ease-in-out mt-3">
                    If the distribution of letters and 'words' is random, the
                    reader will not be distracted from making.
                  </p> */}
                </div>
              </div>

              <div className="group relative lg:px-10 lg:py-2 transition-all duration-500 ease-in-out rounded-xl bg-white border  overflow-hidden text-center">
                <div className="relative overflow-hidden text-transparent lg:my-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-hexagon h-32 w-32 fill-indigo-600/5 mx-auto"
                  >
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  </svg>

                  <div className="absolute top-2/4 -translate-y-2/4 left-0 right-0 mx-auto text-dark-footer rounded-xl transition-all duration-500 ease-in-out text-4xl flex align-middle justify-center items-center">
                    <i className="icofont-live-support"></i>
                  </div>
                </div>

                <div className="mt-6">
                  <a
                    href="#"
                    className="font-body text-xl font-medium transition-all duration-500 ease-in-out text-dark-footer hover:text-red-800"
                  >
                    24/7 Support &amp; Help
                  </a>
                  {/* <p className="text-slate-400 transition-all duration-500 ease-in-out mt-3">
                    If the distribution of letters and 'words' is random, the
                    reader will not be distracted from making.
                  </p> */}
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-8 gap-[30px] justify-center">
              <div className="group relative lg:px-10 lg:py-2 transition-all duration-500 ease-in-out rounded-xl bg-white border  overflow-hidden text-center">
                <div className="relative overflow-hidden text-transparent lg:py-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-hexagon h-32 w-32 fill-indigo-600/5 mx-auto"
                  >
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  </svg>
                  <div className="absolute top-2/4 -translate-y-2/4 left-0 right-0 mx-auto text-red-800 rounded-xl transition-all duration-500 ease-in-out text-4xl flex align-middle justify-center items-center">
                    {/* <i className="icofont-users-alt-5"></i> */}
                    <img
                      src="/images/Hybrid Class.svg"
                      className=" rounded-lg"
                      alt="photo-2"
                      height={50}
                      width={50}
                    />
                  </div>
                </div>

                <div className="mt-2">
                  <a
                    href="#"
                    className="font-body text-xl font-medium transition-all duration-500 ease-in-out text-dark-footer hover:text-red-800"
                  >
                    “ Best Hybrid Class & Test -Absent or missing any classes?
                    Well, try our hybrid class and test system! ”
                  </a>
                  {/* <p className="text-slate-400 transition-all duration-500 ease-in-out mt-3">
                    If the distribution of letters and 'words' is random, the
                    reader will not be distracted from making.
                  </p> */}
                </div>
              </div>

              <div className="group relative lg:px-10 lg:py-2 transition-all duration-500 ease-in-out rounded-xl bg-white border  overflow-hidden text-center">
                <div className="relative overflow-hidden text-transparent lg:py-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-hexagon h-32 w-32 fill-indigo-600/5 mx-auto"
                  >
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  </svg>
                  <div className="absolute top-2/4 -translate-y-2/4 left-0 right-0 mx-auto text-red-800 rounded-xl transition-all duration-500 ease-in-out text-4xl flex align-middle justify-center items-center">
                    <i className="icofont-users-alt-5"></i>
                  </div>
                </div>

                <div className="mt-2">
                  <a
                    href="#"
                    className="font-body text-xl font-medium transition-all duration-500 ease-in-out text-dark-footer hover:text-red-800"
                  >
                    “Highly Skilled Teachers”
                  </a>
                  {/* <p className="text-slate-400 transition-all duration-500 ease-in-out mt-3">
                    If the distribution of letters and 'words' is random, the
                    reader will not be distracted from making.
                  </p> */}
                </div>
              </div>
              <div className="group relative lg:px-10 lg:py-2 transition-all duration-500 ease-in-out rounded-xl bg-white border  overflow-hidden text-center">
                <div className="relative overflow-hidden text-transparent lg:py-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-hexagon h-32 w-32 fill-indigo-600/5 mx-auto"
                  >
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  </svg>
                  <div className="absolute top-2/4 -translate-y-2/4 left-0 right-0 mx-auto text-red-800 rounded-xl transition-all duration-500 ease-in-out text-4xl flex align-middle justify-center items-center">
                    {/* <i className="icofont-users-alt-5"></i> */}
                    <img
                      src="/images/Set Questions.svg"
                      className=" rounded-lg"
                      alt="photo-2"
                      height={50}
                      width={50}
                    />
                  </div>
                </div>

                <div className="mt-2">
                  <a
                    href="#"
                    className="font-body text-xl font-medium transition-all duration-500 ease-in-out text-dark-footer hover:text-red-800"
                  >
                    “ 1000+ Set Questions Are exams nearby? Prepare for your
                    exam with our 1000+ prepaid set question! ”
                  </a>
                  {/* <p className="text-slate-400 transition-all duration-500 ease-in-out mt-3">
                    If the distribution of letters and 'words' is random, the
                    reader will not be distracted from making.
                  </p> */}
                </div>
              </div>
            </div>
          </div>

          <div className="container md:mt-24 mt-16 ">
            <div className="grid md:grid-cols-12 grid-cols-1 items-center gap-[30px]">
              <div className="lg:col-span-5 md:col-span-6 md:ml-8">
                <div className="grid grid-cols-12 gap-6 items-center relative">
                  {/* <div className="col-span-6">
                    <div className="grid grid-cols-1 gap-6">
                      <img
                        src="/images/about/ab03.jpg"
                        className="shadow rounded-md"
                        alt=""
                      />
                      <img
                        src="/images/about/ab02.jpg"
                        className="shadow rounded-md"
                        alt=""
                      />
                    </div>
                  </div>

                  <div className="col-span-6">
                    <div className="grid grid-cols-1 gap-6">
                      <img
                        src="/images/about/ab01.jpg"
                        className="shadow rounded-md"
                        alt=""
                      />
                    </div>
                  </div> */}

                  <div className="overflow-hidden after:content-[''] after:absolute after:h-[512px] after:w-[512px] after:bg-indigo-600/5 after:top-0 after:-right-5 after:-z-1 after:rounded-full"></div>
                </div>
                <a href="#">
                  <img
                    src="/images/Interactive Videos.svg"
                    className=" rounded-lg mt-12 pt-8 lg:ml-8"
                    alt="photo-2"
                    height={500}
                    width={800}
                  />
                </a>
              </div>

              <div className="lg:col-span-7 md:col-span-6">
                <div className="lg:ml-5">
                  <h4 className="font-nunito font-bold lg:leading-normal leading-normal text-2xl lg:text-4xl mb-5 text-black ">
                    Interactive &amp; Fun{" "}
                    <span className="text-dark-footer">Video Courses</span>
                  </h4>

                  <p className="text-slate-400 max-w-xl">
                    Our interactive smart class videos are from class Nursery to
                    10 and are compatible with smart boards, tablets, and other
                    digital devices that are designed to adapt to various
                    classroom setups, ensuring a hassle-free as well as non-stop
                    learning and teaching for students and teachers
                    simultaneously.
                  </p>

                  {/* <div className="mt-6">
                    <a
                      href=""
                      className="btn btn-link font-semibold text-dark-footer after:bg-dark-footer duration-500 ease-in-out border-dark-footer hover:text-white hover:bg-dark-footer"
                    >
                      Learn more <i className="zmdi zmdi-arrow-right"></i>
                    </a>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </section>

        <Pricing />
        <SelectPlan
          selectedPlan={undefined}
          updateSelectedPlan={function (selectedPlan: Plan): void {
            throw new Error("Function not implemented.");
          }}
          studentClass={""}
        />
      </Container>
      {/* <CollectionGrid
        headingPosition="center"
        className="mb-12 pb-1 lg:pb-0 lg:mb-14 xl:mb-16 2xl:pt-4"
      /> */}
      {/* <div className="container md:py-24 py-16 ">
        <div className="grid grid-cols-1 lg:grid-cols-2  gap-[30px]">
          <div className="pb-10 col-span-full md:col-span-1 mb-4 mt-16">
            <div className="flex justify-start items-center mx-4 md:mx-32">
              <div className="w-20 h-20 bg-indigo-600/5 text-indigo-600 rounded-xl text-4xl flex align-middle justify-center items-center shadow-sm dark:shadow-gray-800">
                <i className="icofont-phone-circle "></i>
              </div>

              <div className="ml-4 ">
                <a
                  href="tel:+152534-468-854"
                  className="font-body text-dark hover:text-gray-400 after:bg-indigo-600 duration-500 ease-in-out"
                >
                  +152 534-468-854
                </a>
              </div>
            </div>

            <div className="flex justify-start items-center mx-4 md:mx-32 mt-4">
              <div className="w-20 h-20 bg-indigo-600/5 text-indigo-600 rounded-xl text-3xl flex align-middle justify-center items-center shadow-sm dark:shadow-gray-800">
                <i className="icofont-email"></i>
              </div>

              <div className="ml-4">
                <a
                  href="mailto:help@satyallearning.com"
                  className="font-body text-dark hover:text-gray-400 after:bg-indigo-600 duration-500 ease-in-out"
                >
                  help@satyallearning.com
                </a>
              </div>
            </div>
            <div className="flex justify-start items-center mx-4 md:mx-32 mt-4">
              <div className="w-20 h-20 bg-indigo-600/5 text-indigo-600 rounded-xl text-4xl flex align-middle justify-center items-center shadow-sm dark:shadow-gray-800">
                <i className="icofont-location-pin"></i>
              </div>

              <div className="ml-4">
                <a
                  href="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d39206.002432144705!2d-95.4973981212445!3d29.709510002925988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640c16de81f3ca5%3A0xf43e0b60ae539ac9!2sGerald+D.+Hines+Waterwall+Park!5e0!3m2!1sen!2sin!4v1566305861440!5m2!1sen!2sin"
                  data-type="iframe"
                  className="font-body text-dark hover:text-gray-400 after:bg-indigo-600 duration-500 ease-in-out"
                >
                  View on Google map
                </a>
              </div>
            </div>
          </div>

          <div className="pb-10 col-span-full md:col-span-1 mb-4 flex justify-center">
            <div className="max-w-[480px] w-full bg-white dark:bg-slate-900 rounded-md shadow-xl dark:shadow-gray-800 px-6 py-8">
              <h3 className="my-6 text-2xl leading-normal font-medium text-center">
                Get in touch !
              </h3>

              <form method="post" name="myForm" id="myForm">
                <p className="mb-0" id="error-msg"></p>
                <div id="simple-msg"></div>

                <div className="grid grid-cols-1">
                  <div className="lg:col-span-full mb-3">
                    <div className="ltr:text-left rtl:text-right">
                      <label htmlFor="name" className="font-semibold">
                        Your Name:
                      </label>
                      <div className="form-icon relative mt-2">
                        <i className="icofont-ui-user w-4 h-4 absolute top-3 left-4"></i>
                        <input
                          name="name"
                          id="name"
                          type="text"
                          className="form-input w-full ltr:pl-11 rtl:pr-11"
                          placeholder="Name :"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mb-5">
                    <div className="ltr:text-left rtl:text-right">
                      <label htmlFor="email" className="font-semibold">
                        Your Email:
                      </label>
                      <div className="form-icon relative mt-2">
                        <i className=" icofont-ui-email w-4 h-4 absolute top-3 left-4"></i>
                        <input
                          name="email"
                          id="email"
                          type="email"
                          className="form-input w-full ltr:pl-11 rtl:pr-11"
                          placeholder="Email :"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-5">
                    <div className="ltr:text-left rtl:text-right">
                      <label htmlFor="subject" className="font-semibold">
                        Your Question:
                      </label>
                      <div className="form-icon relative mt-2">
                        <i className="icofont-question-circle w-4 h-4 absolute top-3 left-4"></i>
                        <input
                          name="subject"
                          id="subject"
                          className="form-input w-full ltr:pl-11 rtl:pr-11"
                          placeholder="Subject :"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-5">
                    <div className="ltr:text-left rtl:text-right">
                      <label htmlFor="comments" className="font-semibold">
                        Your Comment:
                      </label>
                      <div className="form-icon relative mt-2">
                        <i className=" icofont-ui-message w-4 h-4 absolute top-3 left-4"></i>
                        <textarea
                          name="comments"
                          id="comments"
                          className="form-input w-full ltr:pl-11 rtl:pr-11 h-28"
                          placeholder="Message :"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  id="submit"
                  name="send"
                  className="btn bg-indigo-600 hover:bg-indigo-700 border-indigo-600 hover:border-indigo-700 text-white rounded-md w-full justify-center flex items-center"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
}

Home.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }: any) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        "common",
        "forms",
        "menu",
        "footer",
      ])),
    },
  };
};
