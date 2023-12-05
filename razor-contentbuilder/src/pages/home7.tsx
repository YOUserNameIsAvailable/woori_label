import Seo from '@components/seo/seo';
import FeatureCarousel from "@components/common/featured-carousel-four";
import Layout from '@components/layout/layout-seven';
import Container from '@components/ui/container';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {
    homeSevenHeroSlider as heroSlider,
    homeFourGridHero as bannerGrid,
    bannerDiscount as brandCarousel,
    homeFourGridHero2 as bannerGrid2,
    homeSevenHeroCarousel as bannerHeroCarousel,
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
import ListingTabsElectronicFeed from "@components/product/feeds/listingtabs-electronic-v2";
import ListingTabsPhonesFeed from "@components/product/feeds/listingtabs-phones-v2";
import ListingTabsComputerFeed from "@components/product/feeds/listingtabs-computer-v2";
import ListingTabsClothFeed from "@components/product/feeds/listingtabs-cloth-v2";
import SuppercategoryPopular from "@components/product/feeds/suppercategory-popular";

import CategoryGridBlock from "@components/common/category-grid-block";
import BannerAllCarousel from "@components/common/banner-all-carousel";
import NewProductFeed from "@components/product/feeds/new-product-feed";
import BestSellerProductFeed from "@components/product/feeds/best-seller-top-product";

export default function Home() {
    return (
        <>
            <Seo
                title="Electronics Store Store React Template"
                description="Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
                path="home7"
            />

            {/*<Container className={"sm:max-w-[1730px]"}>*/}
            {/*    <div className="grid grid-cols-1 lg:grid-cols-2">*/}
            {/*        <HeroSliderBlock*/}
            {/*            heroBanner={heroSlider}*/}
            {/*            heroContent={false}*/}
            {/*            className={`lg:mb-7 mt-6 border border-black/10 border-r-0 rounded-l overflow-hidden`}*/}
            {/*            contentClassName="p-7 sm:pb-24 xl:pb-32 sm:pt-16 xl:pt-24 min-h-[260px] md:min-h-[260px] xl:min-h-[342px] 2xl:min-h-[421px]"*/}
            {/*        />*/}
            {/*        <BannerGrid*/}
            {/*            data={bannerHeroCarousel}*/}
            {/*            grid={2}*/}
            {/*            className="mb-7 mt-6 md:mt-6 staticBanner--slider"*/}
            {/*            girdClassName={"gap-px 2xl:gap-px border border-black/5 bg-black/5"}*/}
            {/*        />*/}
            {/*    </div>*/}
            {/*    /!*<FeatureCarousel className={"home4-featuredCarousel"} classNameCarousel={"bg-white"}/>*!/*/}

            {/*    <ListingTabsPhonesFeed showBanner={'left'} />*/}
            {/*    <ListingTabsComputerFeed showBanner={'right'} />*/}

            {/*    <BannerGrid*/}
            {/*        data={bannerGrid2}*/}
            {/*        grid={3}*/}
            {/*        className="mb-8 lg:mb-12"*/}
            {/*    />*/}

            {/*    <ListingTabsElectronicFeed showBanner={'left'}/>*/}
            {/*    <ListingTabsClothFeed showBanner={'right'}/>*/}

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
