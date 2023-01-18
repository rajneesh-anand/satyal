import Container from "@components/ui/container";
import Layout from "@components/layout";
import ProductSingleDetails from "@components/product/product";
import DownloadApps from "@components/common/download-apps";
import PopcornJerkyProductFeed from "@components/product/feeds/popcorn-jerky-product-feed";
import RelatedProductFeed from "@components/product/feeds/related-product-feed";
import Breadcrumb from "@components/ui/breadcrumb";
import { useUI } from "@contexts/ui.context";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps } from "next";
import Divider from "@components/ui/divider";
import Seo from "@components/seo/seo";
import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import axios from "axios";

export default function ProductPage({ data }: any) {
  return (
    <>
      <Seo
        title={data.name}
        description={data.description}
        path={`/products/${data.slug}`}
      />
      <Divider />
      <div className="pt-6 lg:pt-7">
        <Container>
          <Breadcrumb />
          <ProductSingleDetails />
        </Container>
      </div>

      <RelatedProductFeed uniqueKey="related-products" />
      <PopcornJerkyProductFeed />
      <DownloadApps />
    </>
  );
}

ProductPage.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async ({
  params,
  locale,
}) => {
  // const { slug }: any = params;

  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/${API_ENDPOINTS.PRODUCT}`
  );
  console.log(data);
  return {
    props: {
      data,
      ...(await serverSideTranslations(locale!, [
        "common",
        "forms",
        "menu",
        "footer",
      ])),
    },
  };
};
