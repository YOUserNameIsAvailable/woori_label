import Testimonial from '@components/common/testimonial';
import Seo from '@components/seo/seo';
import FeatureCarousel from "@components/common/featured-carousel";
import Layout from '@components/layout/layout-three';
import Container from '@components/ui/container';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import BannerGridTwo from '@components/common/banner-grid-two';
import {
    homeTwoGridHero2 as bannerGridHero2,
    homeTwoGridHero as bannerGridHero,
    homeThreeHeroCarousel as bannerHeroCarousel,
    homeThreeHeroSlider as heroSlider,
    bannersGridHero as bannerTwo, bannerDiscount, bannersGridHero2 as bannerTwo2,
} from '@framework/static/banner';
import {GetStaticProps} from 'next';
import {QueryClient} from 'react-query';
import {dehydrate} from 'react-query/hydration';
import {API_ENDPOINTS} from '@framework/utils/api-endpoints';
import {fetchBestSellerProducts} from '@framework/product/get-all-best-seller-products';
import {LIMITS} from '@framework/utils/limits';
import HeroSliderBlock from "@components/hero/hero-slider-block";
import BannerGrid from "@components/common/banner-grid";
import ListingTabsElectronicFeed from "@components/product/feeds/listingtabs-electronic-feed";
import CategoryGridListBlock from "@components/common/category-grid-list-block";
import BannerAllCarousel from "@components/common/banner-all-carousel";
import ListingTabsClothFeed from "@components/product/feeds/listingtabs-cloth-feed";
import BestSellerProductFeed from "@components/product/feeds/best-seller-product-feed";

export default function Home() {
    return (
        <>
            <Seo
                title="Electronics Store Store React Template"
                description="Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
                path="home2"
            />
            {/*<Container>*/}
            {/*    <div className="grid gap-4 grid-cols-1 xl:gap-5 lg:grid-cols-[minmax(65%,_1fr)_1fr] 2xl:grid-cols-[minmax(68%,_1fr)_1fr]">*/}
            {/*        <HeroSliderBlock*/}
            {/*            heroBanner={heroSlider}*/}
            {/*            heroContent={false}*/}
            {/*            className={`lg:mb-7 mt-6`}*/}
            {/*            contentClassName="p-7 sm:pb-24 xl:pb-32 sm:pt-16 xl:pt-24 md:min-h-[320px] xl:min-h-[360px] 2xl:min-h-[448px]"*/}
            {/*        />*/}
            {/*        <BannerGrid*/}
            {/*            data={bannerHeroCarousel}*/}
            {/*            grid={1}*/}
            {/*            className="mb-7 mt-3 lg:mt-6 staticBanner--slider"*/}
            {/*            girdClassName={"xl:gap-6"}*/}
            {/*        />*/}
            {/*    </div>*/}
            {/*    /!*<FeatureCarousel/>*!/*/}
            {/*    <BestSellerProductFeed/>*/}
            {/*    <BannerGridTwo*/}
            {/*        data={bannerTwo}*/}
            {/*        className="mb-8 lg:mb-12"*/}
            {/*        girdClassName="xl:gap-5 "*/}
            {/*    />*/}
            {/*    {*/}
            {/*        // @ts-ignore*/}
            {/*        <ListingTabsElectronicFeed colSiderbar={false} borderCarousel={true}/>*/}
            {/*    }*/}
            {/*    <BannerGridTwo*/}
            {/*        data={bannerTwo2}*/}
            {/*        className="mb-8 lg:mb-12"*/}
            {/*        girdClassName="xl:gap-5 2xl:grid-cols-[minmax(1130px,_1fr)_1fr] "*/}
            {/*    />*/}
            {/*    <ListingTabsClothFeed colSiderbar={false}/>*/}
            {/*    <CategoryGridListBlock  className="mb-6 lg:mb-8" />*/}
            {/*    <BannerAllCarousel*/}
            {/*        data={bannerDiscount}*/}
            {/*        className="mb-8 lg:mb-12"*/}
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
