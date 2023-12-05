import Testimonial from '@components/common/testimonial';
import Seo from '@components/seo/seo';
import FeatureGrid from '@components/common/featured-grid';
import FeatureCarousel from "@components/common/featured-carousel";
import Layout from '@components/layout/layout-two';
import Container from '@components/ui/container';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import BannerGridTwo from '@components/common/banner-grid-two';
import {
    homeTwoGridHero2 as bannerGridHero2,
    homeTwoGridHero as bannerGridHero,
    homeTwoHeroCarousel as bannerHeroCarousel,
    homeTwoHeroSlider as heroBanner,
    homeTwoSidebar as heroSidebar, bannerDiscount,
} from '@framework/static/banner';
import {GetStaticProps} from 'next';
import {QueryClient} from 'react-query';
import {dehydrate} from 'react-query/hydration';
import {API_ENDPOINTS} from '@framework/utils/api-endpoints';
import {fetchBestSellerProducts} from '@framework/product/get-all-best-seller-products';
import {LIMITS} from '@framework/utils/limits';
import HeroSliderBlock from "@components/hero/hero-slider-block";
import BannerGrid from "@components/common/banner-grid";
import BestSellerSidebarProductFeed from "@components/product/feeds/best-seller-sidebar-product-feed";
import NewSidebarProductFeed from "@components/product/feeds/new-sidebar-product-feed";
import Latestblog from "@components/common/latestblog";
import ListingTabsElectronicFeed from "@components/product/feeds/listingtabs-electronic-feed";
import CategoryGridListBlock from "@components/common/category-grid-list-block";
import BannerAllCarousel from "@components/common/banner-all-carousel";
import ListingTabsClothFeed from "@components/product/feeds/listingtabs-cloth-feed";
import ProductWithBestDeals from "@components/product/product-with-best-deals";
import {useRouter} from "next/router";
import {getDirection} from "@utils/get-direction";
import {ExampleButton} from "@components/exampleButton";

export default function Home() {
    const { locale } = useRouter();
    const dir = getDirection(locale);
    return (
        <>
            <Seo
                title="Electronics Store Store React Template"
                description="Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
                path="home2"
            />
            <ExampleButton/>
            {/*<Container>*/}
            {/*    <div className={` grid gap-4 grid-cols-1 xl:gap-6 lg:grid-cols-[minmax(72%,_1fr)_1fr] xl:grid-cols-[minmax(72%,_1fr)_1fr] ${dir == 'rtl' ? '2xl:mr-[18.4rem]': '2xl:ml-[18.4rem]'}`}>*/}
            {/*        <HeroSliderBlock*/}
            {/*            heroBanner={heroBanner}*/}
            {/*            heroContent={false}*/}
            {/*            className={`lg:mb-7 mt-6`}*/}
            {/*            contentClassName="p-5 sm:pb-24 xl:pb-32 sm:pt-16 xl:pt-24 md:min-h-[380px]  xl:min-h-[490px] 2xl:min-h-[550px]"*/}
            {/*        />*/}
            {/*        <BannerGrid*/}
            {/*            data={bannerHeroCarousel}*/}
            {/*            grid={1}*/}
            {/*            className="mb-7 mt-3 lg:mt-6 staticBanner--slider"*/}
            {/*            girdClassName={"xl:gap-6"}*/}
            {/*        />*/}
            {/*    </div>*/}
            {/*    /!*<FeatureCarousel/>*!/*/}
            {/*</Container>*/}
            {/*<Container>*/}
            {/*    <div className="grid grid-cols-12 gap-4 grid-cols-1 xl:gap-8">*/}
            {/*        <div className="maincontent-left col-span-12 lg:col-span-3 2xl:col-span-2">*/}
            {/*            <BannerGrid*/}
            {/*                data={heroSidebar}*/}
            {/*                grid={1}*/}
            {/*                className="relative mb-8"*/}
            {/*            />*/}
            {/*            <BestSellerSidebarProductFeed />*/}
            {/*            <Latestblog className="mb-8"/>*/}
            {/*            <NewSidebarProductFeed />*/}
            {/*            <Testimonial className="mb-8"/>*/}

            {/*        </div>*/}
            {/*        <div className="maincontent-right col-span-12  lg:col-span-9 2xl:col-span-10">*/}
            {/*            <ProductWithBestDeals />*/}
            {/*            <ListingTabsElectronicFeed />*/}
            {/*            <BannerGridTwo*/}
            {/*                data={bannerGridHero}*/}
            {/*                className="mb-8 lg:mb-12"*/}
            {/*                girdClassName="xl:gap-6 "*/}
            {/*            />*/}
            {/*           <ListingTabsClothFeed />*/}
            {/*            <BannerGridTwo*/}
            {/*                data={bannerGridHero2}*/}
            {/*                className="mb-8 lg:mb-12"*/}
            {/*                girdClassName="xl:gap-6 xl:grid-cols-[minmax(654px,_1fr)_1fr] 2xl:grid-cols-[minmax(954px,_1fr)_1fr] "*/}
            {/*            />*/}
            {/*            <CategoryGridListBlock  className="mb-6 lg:mb-8" />*/}
            {/*            <BannerAllCarousel*/}
            {/*                data={bannerDiscount}*/}
            {/*                className="mb-8 lg:mb-12"*/}
            {/*            />*/}
            {/*        </div>*/}
            {/*    </div>*/}
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
