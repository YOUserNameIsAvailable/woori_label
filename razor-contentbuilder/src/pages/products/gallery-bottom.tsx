import Container from '@components/ui/container';
import Layout from '@components/layout/layout';
import ProductSingleDetails from '@components/product/product-gallery-bottom';
import ElectronicProductFeed from '@components/product/feeds/electronic-product-feed';
import RelatedProductFeed from '@components/product/feeds/related-product-feed';
import Breadcrumb from '@components/ui/breadcrumb';
import { useUI } from '@contexts/ui.context';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';
import Divider from '@components/ui/divider';

export default function ProductPage() {
  return (
    <>
      <Divider />
      <div className="pt-6 lg:pt-7 pb-10">
        <Container>
            <Breadcrumb />
            <ProductSingleDetails />
            <RelatedProductFeed uniqueKey="related-products" className="mb-8 lg:mb-12" />
            <ElectronicProductFeed  />
        </Container>
      </div>


    </>
  );
}

ProductPage.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        'common',
        'forms',
        'menu',
        'footer',
      ])),
    },
  };
};
