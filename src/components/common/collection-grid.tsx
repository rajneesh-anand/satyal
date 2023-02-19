import CollectionCard from "@components/cards/collection-card";
import SectionHeader from "@components/common/section-header";
import Container from "@components/ui/container";
import useWindowSize from "@utils/use-window-size";
import Carousel from "@components/ui/carousel/carousel";
import { SwiperSlide } from "@components/ui/carousel/slider";
import { ROUTES } from "@utils/routes";

const data = [
  {
    id: 1,
    slug: "feel-the-thirsty-in-summer-anytime",
    image: "/assets/images/collection/1.png",
    title: "collection-title-one",
    description: "collection-description-one",
  },
  {
    id: 2,
    slug: "most-popular-item-for-Fast-food",
    image: "/assets/images/collection/2.png",
    title: "collection-title-two",
    description: "collection-description-two",
  },
  {
    id: 3,
    slug: "authentic-japanese-food-in-real-taste",
    image: "/assets/images/collection/3.png",
    title: "collection-title-three",
    description: "collection-description-three",
  },
  {
    id: 4,
    slug: "explore-our-family-of-freshest®-foods",
    image: "/assets/images/collection/4.png",
    title: "collection-title-four",
    description: "collection-description-four",
  },
];

interface Props {
  className?: string;
  headingPosition?: "left" | "center";
}

const breakpoints = {
  "1024": {
    slidesPerView: 3,
  },
  "768": {
    slidesPerView: 3,
  },
  "540": {
    slidesPerView: 2,
  },
  "0": {
    slidesPerView: 1,
  },
};

const CollectionGrid: React.FC<Props> = ({
  className = "mb-12 lg:mb-14 xl:mb-16 2xl:mb-20 pb-1 lg:pb-0 3xl:pb-2.5",
  headingPosition = "left",
}) => {
  const { width } = useWindowSize();
  return (
    <div className={className}>
      <Container>
        <div className="text-center">
          <h4 className="font-nunito font-bold lg:leading-normal leading-normal text-2xl lg:text-4xl mb-5 text-black dark:text-white">
            What our proud students think about{" "}
            <span className="text-dark-footer">Satyal Learning</span>
          </h4>
        </div>
        {width! < 1536 ? (
          <Carousel
            breakpoints={breakpoints}
            autoplay={{ delay: 4000 }}
            prevButtonClassName="-start-2.5 -top-14"
            nextButtonClassName="-end-2.5 -top-14"
            className="-mx-1.5 md:-mx-2 xl:-mx-2.5 -my-4"
            prevActivateId="collection-carousel-button-prev"
            nextActivateId="collection-carousel-button-next"
          >
            <SwiperSlide className="px-1.5 md:px-2 xl:px-2.5 py-4">
              <div className="customer-testi">
                <div className="content relative rounded shadow dark:shadow-gray-800 m-2 p-6 bg-white dark:bg-slate-900">
                  <i className="icofont-quote-left text-3xl  text-indigo-600"></i>
                  <p className="text-slate-400">
                    " There is now an abundance of readable dummy texts. These
                    are usually used when a text is required. "
                  </p>
                  <ul className="list-none mb-0 text-amber-400 mt-3">
                    <li className="inline">
                      <i className="icofont-star"></i>
                    </li>
                    <li className="inline">
                      <i className="icofont-star"></i>
                    </li>
                    <li className="inline">
                      <i className="icofont-star"></i>
                    </li>
                    <li className="inline">
                      <i className="icofont-star"></i>
                    </li>
                    <li className="inline">
                      <i className="icofont-star"></i>
                    </li>
                  </ul>
                </div>

                <div className="text-center mt-5">
                  <img
                    src="/images/about/ab02.jpg"
                    className="h-14 w-14 rounded-full shadow-md mx-auto"
                    alt="photo-1"
                  />
                  <h6 className="mt-2 font-semibold">Steve Jobs</h6>
                  <span className="text-slate-400 text-sm">Manager</span>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className="px-1.5 md:px-2 xl:px-2.5 py-4">
              <div className="customer-testi">
                <div className="content relative rounded shadow dark:shadow-gray-800 m-2 p-6 bg-white dark:bg-slate-900">
                  <i className="icofont-quote-left text-3xl text-indigo-600"></i>
                  <p className="text-slate-400">
                    " There is now an abundance of readable dummy texts. These
                    are usually used when a text is required. "
                  </p>
                  <ul className="list-none mb-0 text-amber-400 mt-3">
                    <li className="inline">
                      <i className="icofont-star"></i>
                    </li>
                    <li className="inline">
                      <i className="icofont-star"></i>
                    </li>
                    <li className="inline">
                      <i className="icofont-star"></i>
                    </li>
                    <li className="inline">
                      <i className="icofont-star"></i>
                    </li>
                    <li className="inline">
                      <i className="icofont-star"></i>
                    </li>
                  </ul>
                </div>

                <div className="text-center mt-5">
                  <img
                    src="/images/about/ab03.jpg"
                    className="h-14 w-14 rounded-full shadow-md mx-auto"
                    alt="photo-2"
                  />
                  <h6 className="mt-2 font-semibold">Cristino Murfi</h6>
                  <span className="text-slate-400 text-sm">Manager</span>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className="px-1.5 md:px-2 xl:px-2.5 py-4">
              <div className="customer-testi">
                <div className="content relative rounded shadow dark:shadow-gray-800 m-2 p-6 bg-white dark:bg-slate-900">
                  <i className="icofont-quote-left text-3xl text-indigo-600"></i>
                  <p className="text-slate-400">
                    " There is now an abundance of readable dummy texts. These
                    are usually used when a text is required. "
                  </p>
                  <ul className="list-none mb-0 text-amber-400 mt-3">
                    <li className="inline">
                      <i className="icofont-star"></i>
                    </li>
                    <li className="inline">
                      <i className="icofont-star"></i>
                    </li>
                    <li className="inline">
                      <i className="icofont-star"></i>
                    </li>
                    <li className="inline">
                      <i className="icofont-star"></i>
                    </li>
                    <li className="inline">
                      <i className="icofont-star"></i>
                    </li>
                  </ul>
                </div>

                <div className="text-center mt-5">
                  <img
                    src="/images/about/ab01.jpg"
                    className="h-14 w-14 rounded-full shadow-md mx-auto"
                    alt="photo-3"
                  />
                  <h6 className="mt-2 font-semibold">Cristino Murfi</h6>
                  <span className="text-slate-400 text-sm">Manager</span>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className="px-1.5 md:px-2 xl:px-2.5 py-4">
              <div className="customer-testi">
                <div className="content relative rounded shadow dark:shadow-gray-800 m-2 p-6 bg-white dark:bg-slate-900">
                  <i className="icofont-quote-left text-3xl  text-indigo-600"></i>
                  <p className="text-slate-400">
                    " There is now an abundance of readable dummy texts. These
                    are usually used when a text is required. "
                  </p>
                  <ul className="list-none mb-0 text-amber-400 mt-3">
                    <li className="inline">
                      <i className="icofont-star"></i>
                    </li>
                    <li className="inline">
                      <i className="icofont-star"></i>
                    </li>
                    <li className="inline">
                      <i className="icofont-star"></i>
                    </li>
                    <li className="inline">
                      <i className="icofont-star"></i>
                    </li>
                    <li className="inline">
                      <i className="icofont-star"></i>
                    </li>
                  </ul>
                </div>

                <div className="text-center mt-5">
                  <img
                    src="/images/about/ab01.jpg"
                    className="h-14 w-14 rounded-full shadow-md mx-auto"
                    alt="photo-4"
                  />
                  <h6 className="mt-2 font-semibold">Cristino Murfi</h6>
                  <span className="text-slate-400 text-sm">Manager</span>
                </div>
              </div>
            </SwiperSlide>
          </Carousel>
        ) : (
          <div className="2xl:grid 2xl:grid-cols-4 gap-5 3xl:gap-7">
            {data?.map((item) => (
              <CollectionCard
                key={item.id}
                collection={item}
                href={`${ROUTES.BUNDLE}/${item.slug}`}
              />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
};

export default CollectionGrid;
