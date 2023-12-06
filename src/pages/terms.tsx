import Layout from "@components/layout";
import Container from "@components/ui/container";
import PageHeroSection from "@components/ui/page-hero-section";
import { termsAndServices } from "@settings/terms-settings";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { GetStaticProps } from "next";
import DownloadApps from "@components/common/download-apps";
import Heading from "@components/ui/heading";
import Seo from "@components/seo/seo";
import { Link, Element } from "react-scroll";

function makeTitleToDOMId(title: string) {
  return title.toLowerCase().split(" ").join("_");
}

export default function TermsPage() {
  const { t } = useTranslation("terms");
  return (
    <>
      <Seo
        title="Terms & conditions"
        description="Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        path="terms"
      />
      <PageHeroSection
        heroTitle="text-page-terms-condition"
        coverImg="/images/hero/tandc.svg"
      />
      <div className=" pb-24 bg-main-background ">
        <Container>
          <div className="flex flex-col md:flex-row ">
            {/* <div className="w-full xl:max-w-[1200px] mx-auto"> */}
            <nav className="hidden sm:block md:w-72 xl:w-3/12 mb-8 2xl:mb-0 lg:-mt-2 ">
              <ol className="sticky md:top-16 lg:top-20 z-10">
                {termsAndServices?.term.map((item, index) => (
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
            <div className="md:w-9/12 md:ps-8 ">
              <p className="text-md md:text-lg font-md text-justify text-black">
                {termsAndServices.main_description}
              </p>
              {termsAndServices?.term.map((item) => (
                // @ts-ignore
                <Element
                  key={item.id}
                  id={makeTitleToDOMId(t(item.title))}
                  className="mb-8 my-4 lg:my-12 last:mb-0 order-list-enable "
                >
                  <Heading
                    className="mb-4 lg:mb-6 font-body text-dark-footer"
                    variant="title"
                  >
                    <span>{item?.id} .</span> {t(item.title)}
                  </Heading>
                  <div className="">
                    <p className="text-justify text-black">
                      {t(item?.sub_description)}
                    </p>
                    <div className="">
                      {item?.points &&
                        item?.points.map((subitem) => {
                          return (
                            <p className="text-justify text-black">
                              <span className="pl-2 text-lg  text-black">
                                {subitem?.point_id} .
                              </span>{" "}
                              {t(subitem?.point_description)}
                            </p>
                          );
                        })}
                    </div>
                  </div>
                </Element>
              ))}
            </div>
          </div>
        </Container>
      </div>
      {/* <DownloadApps /> */}
    </>
  );
}

TermsPage.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        "common",
        "forms",
        "menu",
        "terms",
        "footer",
      ])),
    },
  };
};
