import Seo from '@components/seo/seo';
import FeatureCarousel from "@components/common/featured-carousel-four";
import Layout from '@components/layout/layout-four';
import Container from '@components/ui/container';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {
    homeFourHeroCarousel as bannerHeroCarousel,
    homeFourHeroSlider as heroSlider,
    homeFourGridHero as bannerGrid,
    bannerDiscount as brandCarousel,
    homeFourGridHero2 as bannerGrid2,
} from '@framework/static/banner';
import {GetStaticProps} from 'next';
import {QueryClient} from 'react-query';
import {dehydrate} from 'react-query/hydration';
import {API_ENDPOINTS} from '@framework/utils/api-endpoints';
import LatestblogCarousel from "@components/common/latestblog-four";
import {fetchBestSellerProducts} from '@framework/product/get-all-best-seller-products';
import {LIMITS} from '@framework/utils/limits';
import HeroSliderBlock from "@components/hero/hero-slider-block";
import BannerGrid from "@components/common/banner-grid";
import CategoryGridBlock from "@components/common/category-grid-block";
import BannerAllCarousel from "@components/common/banner-all-carousel";
import NewProductFeed from "@components/product/feeds/new-product-feed";
import SuppercategoryPopular from "@components/product/feeds/suppercategory-popular";
import BestSellerProductFeed from "@components/product/feeds/best-seller-top-product";

export default function Home() {
    return (
        <>
            <Seo
                title="Electronics Store Store React Template"
                description="Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
                path="home4"
            />
            {/*<Container className={"sm:max-w-[1730px]"}>*/}
            {/*    <div className="grid gap-4 grid-cols-1 xl:gap-5 lg:grid-cols-[minmax(70%,_1fr)_1fr] 2xl:grid-cols-[minmax(73%,_1fr)_1fr]">*/}
            {/*        <HeroSliderBlock*/}
            {/*            heroBanner={heroSlider}*/}
            {/*            heroContent={false}*/}
            {/*            className={`lg:mb-7 mt-6`}*/}
            {/*            contentClassName="p-7 sm:pb-24 xl:pb-32 sm:pt-16 xl:pt-24 md:min-h-[360px] xl:min-h-[410px] 2xl:min-h-[450px]"*/}
            {/*        />*/}
            {/*        <BannerGrid*/}
            {/*            data={bannerHeroCarousel}*/}
            {/*            grid={1}*/}
            {/*            className="mb-7 mt-0 lg:mt-6 staticBanner--slider"*/}
            {/*            girdClassName={"xl:gap-5"}*/}
            {/*        />*/}
            {/*    </div>*/}
            {/*    /!*<FeatureCarousel className={"home4-featuredCarousel"} classNameCarousel={"bg-white"}/>*!/*/}
            {/*    <BannerGrid*/}
            {/*        data={bannerGrid}*/}
            {/*        grid={3}*/}
            {/*        className="mb-8 lg:mb-12"*/}
            {/*    />*/}
            {/*    <CategoryGridBlock  className="mb-8 lg:mb-12" />*/}
            {/*    <SuppercategoryPopular className="mb-8 lg:mb-12"/>*/}
            {/*    <BestSellerProductFeed  />*/}
            {/*    <BannerGrid*/}
            {/*        data={bannerGrid2}*/}
            {/*        grid={3}*/}
            {/*        className="mb-8 lg:mb-12"*/}
            {/*    />*/}

            {/*    <NewProductFeed className="mb-8 lg:mb-12"/>*/}
            {/*    <LatestblogCarousel className="mb-8 lg:mb-12"/>*/}
            {/*    <BannerAllCarousel*/}
            {/*        data={brandCarousel}*/}
            {/*        className="mb-8 lg:mb-12"*/}
            {/*        layout={"home4"}*/}
            {/*    />*/}
            {/*</Container>*/}
        </>
    );
}

Home.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({locale}) => {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery(
        [
            API_ENDPOINTS.BEST_SELLER_PRODUCTS,
            {limit: LIMITS.BEST_SELLER_PRODUCTS_LIMITS},
        ],
        fetchBestSellerProducts
    );

    return {
        props: {
            dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
            ...(await serverSideTranslations(locale!, [
                'common',
                'forms',
                'menu',
                'footer',
            ])),
        },
        revalidate: 60,
    };
};
