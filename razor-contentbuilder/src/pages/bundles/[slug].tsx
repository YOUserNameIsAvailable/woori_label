import Container from '@components/ui/container';
import Layout from '@components/layout/layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';
import ProductBundleGrid from '@components/product/product-bundle-grid';
import BundleHeroSection from '@components/bundle/bundle-hero-section';


export default function Bundles() {
  return (
    <>
      <BundleHeroSection />
      <Container>
        <ProductBundleGrid
            className="mt-7 md:mt-8 xl:mt-10 pb-20"
        />
      </Container>
    </>
  );
}

Bundles.Layout = Layout;

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
