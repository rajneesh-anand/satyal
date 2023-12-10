import HeroBannerCard from "@components/hero/hero-banner-card";
import Carousel from "@components/ui/carousel/carousel";
import { SwiperSlide } from "@components/ui/carousel/slider";
import Container from "@components/ui/container";
import Link from "@components/ui/link";
import { FaFacebook, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { YouTubeIcon } from "@components/icons/youtube";
import { HeartOutlineIcon } from "@components/icons/heart-outline";
import { useSession } from "next-auth/react";

interface Props {
  heroBanner?: any;
  className?: string;
  contentClassName?: string;
}

const HeroSliderBlock: React.FC<Props> = ({
  heroBanner,
  className,
  contentClassName = "py-24",
}) => {
  const { data: session, status } = useSession();

  return (
    <div>
      {/* {heroBanner?.map((banner: any) => (
          <SwiperSlide key={`banner--key${banner.id}`}>
            <HeroBannerCard
              banner={banner}
              variant="slider"
              className={contentClassName}
            />
          </SwiperSlide>
        ))} */}
      <SwiperSlide>
        <Container>
          <div className="grid md:grid-cols-12 grid-cols-1 items-center mt-4 mb-8 gap-[30px] ">
            <div className="md:col-span-6 md:text-left text-center mt-4 lg:mt-24">
              <div className="md:ml-8">
                <h4 className="font-bold font-nunito lg:leading-normal leading-normal text-4xl lg:text-5xl mb-5  text-dark-footer">
                  Learn with{" "}
                  <span className="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-dark-footer relative inline-block">
                    <span className="relative  text-white">Experts</span>
                  </span>{" "}
                  Anytime &amp; Anywhere
                </h4>

                <p className="text-slate-400 text-lg max-w-xl">
                  “Learning with our experts will be much convenient now!
                  Enhance your grade with our all-new feature of “Online
                  Tuition”. Just select the teacher, pay and study! Learning has
                  never been that easy! But we made it!
                </p>
                <div className="text-center mt-8">
                  {/* {session ? null : ( */}
                  <Link
                    href="/auth/register"
                    // className="inline-block px-6 py-2.5 bg-blue-800 text-white font-medium text-xs leading-tight uppercase rounded shadow-lg hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    <button
                      className="bg-blue-500 hover:bg-#690f00-600 text-white font-bold py-2 px-4 rounded"
                      style={{ backgroundColor: "#690f00" }}
                    >
                      Get Started
                    </button>
                  </Link>
                  {/* )} */}
                </div>
              </div>
            </div>

            <div className="md:col-span-6 mt-4">
              <div className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-5">
                  <div className="grid grid-cols-1 gap-4">
                    <img
                      src="/images/hero/2.png"
                      className="shadow rounded-lg"
                      alt="photo1"
                    />
                  </div>
                </div>

                <div className="col-span-7">
                  <div className="grid grid-cols-1 gap-4">
                    <img
                      src="/images/hero/1.jpg"
                      className="shadow rounded-lg"
                      alt="photo-2"
                      height={450}
                      width={250}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </SwiperSlide>
    </div>
  );
};

export default HeroSliderBlock;
