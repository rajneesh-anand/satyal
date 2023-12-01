import Layout from "@components/layout";
import Container from "@components/ui/container";
import Heading from "@components/ui/heading";
import PageHeroSection from "@components/ui/page-hero-section";
import { privacyPolicy } from "@settings/privacy-settings";
import { Link, Element } from "react-scroll";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { GetStaticProps } from "next";
import DownloadApps from "@components/common/download-apps";
import Seo from "@components/seo/seo";

function makeTitleToDOMId(title: string) {
  return title.toLowerCase().split(" ").join("_");
}

export default function PrivacyPage() {
  const { t } = useTranslation("privacy");
  return (
    <>
      <Seo
        title="Privacy"
        description="Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        path="privacy"
      />
      <PageHeroSection
        heroTitle="text-page-privacy-policy"
        coverImg="/images/hero/pp.svg"
      />
      <div className=" md:py-4  xl:px-16 2xl:px-24 3xl:px-36 ">
        <Container>
          <div className="flex flex-col md:flex-row ">
            <nav className="hidden sm:block md:w-72 xl:w-3/12 mb-8 2xl:mb-0 lg:-mt-2 ">
              <ol className="sticky md:top-16 lg:top-20 z-10">
                {privacyPolicy?.privacy?.map((item, index) => (
                  <li key={index}>
                    <Link
                      spy={true}
                      offset={-120}
                      smooth={true}
                      duration={200}
                      to={makeTitleToDOMId(t(item.title))}
                      activeClass="text-skin-primary font-medium borderColor relative ps-3"
                      className="block transition-all cursor-pointer py-3 text-sm lg:text-15px text-skin-base font-medium"
                    >
                      {t(item.title)}
                    </Link>
                  </li>
                ))}
              </ol>
            </nav>
            {/* End of section scroll spy menu */}

            <div className="md:w-9/12 md:ps-8 ">
              {
                <p className="text-md md:text-lg font-md text-justify text-black ">
                  {t(privacyPolicy.main_description)}
                </p>
              }
              {privacyPolicy?.privacy?.map((item) => (
                // @ts-ignore
                <Element
                  key={item.id}
                  id={makeTitleToDOMId(t(item.title))}
                  className="mb-8 my-4 lg:my-12 last:mb-0 order-list-enable "
                >
                  <Heading
                    className="mb-4 lg:mb-6 font-body text-dark-footer  "
                    variant="title"
                  >
                    <span className=" mr-1 md:mr-3">{item.id}.</span>{" "}
                    {t(item.title)}
                  </Heading>
                  <div
                    className="text-justify text-black text-md lg:text-15px leading-6 md:leading-7  "
                    dangerouslySetInnerHTML={{
                      __html: item?.sub_description,
                    }}
                  />
                  {item.points &&
                    item.points.map((sub_item, index) => {
                      return (
                        <div key={sub_item?.point_id}>
                          <h3 className="text-md md:text-md xl:text-md my-4 md:my-6 text-black font-semibold">
                            <span className=" mx-1 md:mx-2 ">
                              {sub_item?.point_id}.
                            </span>{" "}
                            {t(sub_item?.point_title)}
                          </h3>
                          <div
                            className="text-black text-md md:text-md leading-7 space-y-5 text-justify"
                            key={sub_item?.point_id}
                            dangerouslySetInnerHTML={{
                              __html: sub_item?.point_description,
                            }}
                          />
                          {sub_item?.sub_points &&
                            sub_item?.sub_points?.map((sub_point, index) => {
                              return (
                                <p
                                  key={index}
                                  className="text-md text-black leading-7 my-4 mb-2 ml-1 md:ml-3"
                                >
                                  <span className="text-xl font-bold text-black mr-2">
                                    .
                                  </span>
                                  {sub_point?.sub_points_description}
                                </p>
                              );
                            })}
                        </div>
                      );
                    })}
                </Element>
              ))}
            </div>
            {/* End of content */}
          </div>
        </Container>
      </div>
      {/* <DownloadApps /> */}
    </>
  );
}

PrivacyPage.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        "common",
        "forms",
        "menu",
        "privacy",
        "footer",
      ])),
    },
  };
};
