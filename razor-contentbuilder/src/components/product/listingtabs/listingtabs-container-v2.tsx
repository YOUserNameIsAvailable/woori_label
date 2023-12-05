import {ROUTES} from '@utils/routes';
import ProductsCarousel from '@components/product/products-carousel-v2';
import {categoryPlaceholder, productPlaceholder} from "@assets/placeholders";
import Image from "@components/ui/image";
import Link from "next/link";

interface Props {
    data: any;
    category: any;
    isLoading: any;
    error?: any;
    banner_url?: string;
    showBanner?: string;
}
const ListingTabsContainer: React.FC<Props> = ({data,category, isLoading, error, showBanner= false,banner_url}) => {
    let breakpoints = {};
    if(showBanner){
         breakpoints = {
            '1536': {
                slidesPerView: 5,
            },
            '1280': {
                slidesPerView: 4,
            },
            '1024': {
                slidesPerView: 3,
            },
            '640': {
                slidesPerView: 3,
            },
            '360': {
                slidesPerView: 2,
            },
            '0': {
                slidesPerView: 1,
            },
        };
    }else{
         breakpoints = {
             '1536': {
                 slidesPerView: 6,
             },
             '1280': {
                 slidesPerView: 4,
             },
             '1024': {
                 slidesPerView: 3,
             },
             '640': {
                 slidesPerView: 3,
             },
             '360': {
                 slidesPerView: 2,
             },
             '0': {
                 slidesPerView: 1,
             },
        };
    }

    return (
        <div className={`xl:flex border border-black/10 rounded bg-white w-full ${showBanner == 'right' && 'flex-row-reverse' }`} >
            {showBanner && (
                <div className={`hidden xl:flex xl:w-[246px]`}>
                    <Link
                        href={{
                            pathname: ROUTES.SEARCH,
                            query: { category: category?.slug },
                        }} title={category?.name} >
                            <div className="card-img-container flex overflow-hidden relative">
                                <Image
                                    src={banner_url ?? categoryPlaceholder}
                                    alt={category?.name}
                                    width={247}
                                    height={365}
                                    quality={100}
                                />
                            </div>
                    </Link>
                </div>
            )}
            <div className={`${showBanner?'banner-main-content':'popular-main-content'} p-2.5 grow`} >
                <ProductsCarousel
                    sectionHeading=""
                    categorySlug={ROUTES.PRODUCTS}
                    products={data}
                    loading={isLoading}
                    error={error?.message}
                    uniqueKey="electronic"
                    carouselBreakpoint={breakpoints}
                    className={""}
                />
            </div>

        </div>

    );
};
export default ListingTabsContainer;
